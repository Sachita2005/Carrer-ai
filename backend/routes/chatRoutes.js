const express = require("express");
const https = require("https");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

const googleApiKey = process.env.GOOGLE_AI_KEY?.trim() || "";
const huggingFaceToken = process.env.HUGGINGFACE_API_TOKEN?.trim() || "";
const huggingFaceModel = process.env.HUGGINGFACE_MODEL?.trim() || "HuggingFaceH4/zephyr-7b-beta";
const groqApiKey = process.env.GROQ_API_KEY?.trim() || "";
const groqModel = process.env.GROQ_MODEL?.trim() || "llama-3-groq-8b-tool-use";
const groqBase = process.env.GROQ_BASE_URL?.trim() || "https://api.groq.com";

let model = null;

const geminiModelId = process.env.GEMINI_MODEL?.trim() || "gemini-1.5-flash";

if (googleApiKey) {
  console.log(`AI Chatbot: Google Gemini API key detected (model: ${geminiModelId}).`);
  const genAI = new GoogleGenerativeAI(googleApiKey);
  model = genAI.getGenerativeModel({ model: geminiModelId });
} else {
  console.log("AI Chatbot: GOOGLE_AI_KEY missing. Gemini disabled.");
}

if (groqApiKey) {
  console.log(`AI Chatbot: Groq API key detected (model: ${groqModel}).`);
} else {
  console.log("AI Chatbot: GROQ_API_KEY missing. Groq disabled.");
}

if (huggingFaceToken) {
  console.log(`AI Chatbot: Hugging Face token detected (model: ${huggingFaceModel}).`);
} else {
  console.log("AI Chatbot: HUGGINGFACE_API_TOKEN missing. Hugging Face disabled.");
}

const careerKnowledge = {
  "ai engineer":
    "**AI Engineer Career Path:**\n- Learn Python, ML, and Deep Learning\n- Tools: TensorFlow, PyTorch\n- Target: Google, Meta, OpenAI\n- Salary: $120K-$180K",
  "full stack":
    "**Full Stack Developer Path:**\n- Build React, Node.js, and Databases\n- Tools: Git, GitHub, Docker\n- Salary: $90K-$140K",
  embedded:
    "**Embedded Systems Role:**\n- Master C/C++ and microcontrollers\n- Learn RTOS, Arduino, Raspberry Pi, and ESP32\n- Understand I2C, SPI, UART\n- Best for robotics, IoT, automotive, and electronics",
  cloud:
    "**Cloud Engineer:**\n- Learn AWS, Azure, or GCP\n- Master Linux, Docker, and Kubernetes\n- Certification: AWS Solutions Architect",
  devops:
    "**DevOps Engineer:**\n- CI/CD (GitHub Actions, Jenkins)\n- Infrastructure as Code (Terraform, Ansible)\n- Monitoring and automation",
  "data science":
    "**Data Scientist:**\n- Learn Python, SQL, and statistics\n- Master visualization tools (Tableau, Power BI)",
  resume:
    "**Resume Tips:** Keep it one page, use ATS-friendly keywords, and link your GitHub profile.",
  interview:
    "**Interview Prep:** Practice DSA problems and use STAR format for behavioral rounds."
};

function getRuleBasedReply(message) {
  const msgLower = message.toLowerCase();

  if (msgLower.includes("embedded")) {
    return careerKnowledge.embedded;
  }

  for (const [key, reply] of Object.entries(careerKnowledge)) {
    if (msgLower.includes(key)) {
      return reply;
    }
  }

  return (
    "I'm your AI Career Advisor. I can help with embedded systems, web development, AI, cloud, resumes, and interviews.\n\n" +
    'Try asking: "Tell me about embedded roles" or "How do I learn full stack?"'
  );
}

function postJson(url, payload, token) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const requestUrl = new URL(url);

    const req = https.request(
      {
        protocol: requestUrl.protocol,
        hostname: requestUrl.hostname,
        path: requestUrl.pathname + requestUrl.search,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body)
        }
      },
      (res) => {
        let raw = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          raw += chunk;
        });
        res.on("end", () => {
          resolve({ statusCode: res.statusCode || 500, raw });
        });
      }
    );

    req.on("error", (err) => reject(err));
    req.write(body);
    req.end();
  });
}

async function getHuggingFaceReply(message) {
  const hfBase = process.env.HUGGINGFACE_BASE_URL?.trim() || "https://router.huggingface.co";
  const prompt = [
    "You are an expert AI Career Guidance Counselor for students.",
    "Provide concise, professional advice about careers, skills, certifications, salary ranges, and interview tips.",
    "If the question is unrelated to careers, politely steer back to career guidance.",
    "",
    `User: ${message}`,
    "Assistant:"
  ].join("\n");

  const payload = {
    inputs: prompt,
    parameters: {
      max_new_tokens: 280,
      temperature: 0.7,
      return_full_text: false
    },
    options: {
      wait_for_model: true,
      use_cache: false
    }
  };

  const endpoint = `${hfBase}/models/${huggingFaceModel}`;
  const { statusCode, raw } = await postJson(endpoint, payload, huggingFaceToken);

  if (!raw || !raw.trim()) {
    throw new Error("Empty response from Hugging Face API.");
  }

  let data = {};
  try {
    data = JSON.parse(raw);
  } catch (error) {
    // If parsing fails but we got plain text, return it as the reply
    const text = raw.trim();
    if (text.length > 0) {
      return text;
    }
    throw new Error("Invalid JSON from Hugging Face API.");
  }

  if (statusCode < 200 || statusCode >= 300) {
    // Router sometimes returns text/html when a model is cold; pass through if it contains content
    if (typeof data === "string" && data.trim().length > 0) {
      return data.trim();
    }
    throw new Error(data.error || `Hugging Face API error (${statusCode}).`);
  }

  if (Array.isArray(data) && typeof data[0]?.generated_text === "string") {
    return data[0].generated_text.trim();
  }

  if (typeof data.generated_text === "string") {
    return data.generated_text.trim();
  }

  throw new Error("Unexpected response format from Hugging Face API.");
}

async function getGroqReply(message) {
  const system = [
    "You are an expert AI Career Guidance Counselor for students.",
    "Provide concise, professional, and encouraging advice.",
    "Focus on career paths, skills, certifications, salaries, and interview tips in the tech industry.",
    "If the question is unrelated to careers, politely bring it back to career guidance."
  ].join(" ");

  const payload = {
    model: groqModel,
    temperature: 0.6,
    max_tokens: 320,
    messages: [
      { role: "system", content: system },
      { role: "user", content: message }
    ],
    stream: false
  };

  const endpoint = `${groqBase}/openai/v1/chat/completions`;
  const { statusCode, raw } = await postJson(endpoint, payload, groqApiKey);

  if (!raw || !raw.trim()) {
    throw new Error("Empty response from Groq API.");
  }

  let data = {};
  try {
    data = JSON.parse(raw);
  } catch (error) {
    throw new Error("Invalid JSON from Groq API.");
  }

  if (statusCode < 200 || statusCode >= 300) {
    throw new Error(data.error?.message || `Groq API error (${statusCode}).`);
  }

  const choice = data.choices?.[0]?.message?.content;
  if (choice) return String(choice).trim();

  throw new Error("Unexpected response format from Groq API.");
}

router.post("/", async (req, res) => {
  const { message } = req.body;
  const hasCloudProvider = Boolean(model || groqApiKey || huggingFaceToken);

  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: "Please provide a message." });
  }

  if (model) {
    try {
      const systemPrompt = [
        "You are an expert AI Career Guidance Counselor for students.",
        "Provide concise, professional, and encouraging advice.",
        "Focus on career paths, skills, certifications, salaries, and interview tips in the tech industry.",
        "Use bullets when useful for readability.",
        "If the question is unrelated to careers, politely bring it back to career guidance."
      ].join(" ");

      const result = await model.generateContent([systemPrompt, message]);
      const response = await result.response;
      const text = response.text();
      return res.json({ reply: text });
    } catch (error) {
      console.error("Gemini AI error:", error);
    }
  }

  if (groqApiKey) {
    try {
      const text = await getGroqReply(message);
      return res.json({ reply: text });
    } catch (error) {
      console.error("Groq AI error:", error);
    }
  }

  if (huggingFaceToken) {
    try {
      const text = await getHuggingFaceReply(message);
      return res.json({ reply: text });
    } catch (error) {
      console.error("Hugging Face AI error:", error);
    }
  }

  const reply = getRuleBasedReply(message);
  return res.json({ reply: hasCloudProvider ? `(Local AI) ${reply}` : reply });
});

module.exports = router;
