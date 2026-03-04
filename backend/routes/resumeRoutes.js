const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

const googleApiKey = process.env.GOOGLE_AI_KEY?.trim() || "";
const hasUsableGoogleKey =
  Boolean(googleApiKey) &&
  googleApiKey !== "your_google_ai_key_here" &&
  googleApiKey.toLowerCase() !== "changeme";
const geminiModelId = process.env.GEMINI_MODEL?.trim() || "gemini-1.5-flash";
const visionModel = hasUsableGoogleKey
  ? new GoogleGenerativeAI(googleApiKey).getGenerativeModel({ model: geminiModelId })
  : null;

const skillKeywords = {
  python: ["python", "django", "flask", "pandas", "numpy", "scikit", "tensorflow", "pytorch", "keras"],
  javascript: ["javascript", "react", "node", "express", "vue", "angular", "typescript", "next.js"],
  java: ["java", "spring", "maven", "gradle", "hibernate", "junit", "kotlin", "android"],
  sql: ["sql", "mysql", "postgresql", "database", "mongodb", "nosql", "oracle", "sqlite"],
  machine_learning: ["machine learning", "deep learning", "neural network", "nlp", "computer vision", "ai"],
  web: ["html", "css", "bootstrap", "tailwind", "frontend", "backend", "fullstack", "rest api"],
  cloud: ["aws", "azure", "gcp", "cloud", "docker", "kubernetes", "devops", "ci/cd", "terraform"],
  security: ["security", "cybersecurity", "ethical hacking", "penetration", "kali", "encryption"],
  design: ["figma", "adobe", "photoshop", "illustrator", "ui", "ux", "design", "wireframe"],
  data_analysis: ["data analysis", "tableau", "power bi", "excel", "visualization", "statistics", "analytics"],
  c_cpp: ["c++", "c programming", "embedded", "systems programming", "pointers"],
  mobile: ["flutter", "react native", "ios", "swift", "android studio", "mobile app"]
};

const careerSuggestions = {
  python: ["AI/ML Engineer", "Data Scientist", "Backend Developer", "Data Analyst"],
  javascript: ["Full Stack Developer", "Frontend Developer", "React Developer", "Node.js Developer"],
  java: ["Backend Java Developer", "Android Developer", "Enterprise Software Engineer"],
  sql: ["Database Administrator", "Data Analyst", "Data Engineer", "BI Developer"],
  machine_learning: ["AI Engineer", "ML Engineer", "Data Scientist", "AI Research Scientist"],
  web: ["Web Developer", "Full Stack Developer", "Frontend Developer"],
  cloud: ["Cloud Engineer", "DevOps Engineer", "Site Reliability Engineer", "Cloud Architect"],
  security: ["Cybersecurity Analyst", "Ethical Hacker", "Security Engineer", "Penetration Tester"],
  design: ["UI/UX Designer", "Product Designer", "Graphic Designer"],
  data_analysis: ["Data Analyst", "Business Analyst", "BI Developer"],
  c_cpp: ["Systems Engineer", "Embedded Systems Developer", "Firmware Engineer"],
  mobile: ["Mobile App Developer", "Flutter Developer", "Android/iOS Developer"]
};

function addUnique(list, value) {
  if (!value || list.includes(value)) {
    return;
  }
  list.push(value);
}

function analyzeResume(resumeText) {
  const text = resumeText.toLowerCase();
  const suggestions = [];
  const foundSkills = [];
  const missingSkills = [];
  const matchedCareers = [];

  for (const [category, keywords] of Object.entries(skillKeywords)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      addUnique(foundSkills, category);
      (careerSuggestions[category] || []).forEach((career) => addUnique(matchedCareers, career));
    }
  }

  const hasProjects = text.includes("project") || text.includes("portfolio") || text.includes("github");
  const hasCertifications = text.includes("certif") || text.includes("certified") || text.includes("certification");
  const hasLinkedIn = text.includes("linkedin");
  const hasExperience = text.includes("experience") || text.includes("intern");

  if (foundSkills.includes("python") && foundSkills.includes("machine_learning")) {
    addUnique(suggestions, "Good for AI / Data roles");
    addUnique(suggestions, "Add real-world machine learning projects with measurable outcomes");
    addUnique(suggestions, "Include model deployment experience using FastAPI or Docker");
    addUnique(missingSkills, "MLOps basics");
    addUnique(missingSkills, "Cloud ML deployment");
  }

  if (foundSkills.includes("javascript") || foundSkills.includes("web")) {
    addUnique(suggestions, "Good fit for Frontend / Full Stack roles");
    addUnique(suggestions, "Add live project demo links with GitHub repositories");
    if (!foundSkills.includes("sql")) addUnique(missingSkills, "Database skills (SQL or MongoDB)");
    if (!foundSkills.includes("cloud")) addUnique(missingSkills, "Deployment skills (AWS, Vercel, Netlify)");
  }

  if (foundSkills.includes("sql") || foundSkills.includes("data_analysis")) {
    addUnique(suggestions, "Strong base for Data Analyst / BI roles");
    addUnique(suggestions, "Show dashboard work and quantified business impact");
    if (!foundSkills.includes("python")) addUnique(missingSkills, "Python for analytics (Pandas, NumPy)");
    if (!foundSkills.includes("machine_learning")) addUnique(missingSkills, "Machine learning fundamentals");
  }

  if (foundSkills.includes("java")) {
    addUnique(suggestions, "Good for Backend Java and Android tracks");
    addUnique(suggestions, "Show Spring Boot REST API and testing experience");
    if (!foundSkills.includes("sql")) addUnique(missingSkills, "Database integration (JPA, Hibernate)");
    if (!foundSkills.includes("cloud")) addUnique(missingSkills, "Cloud-native deployment");
  }

  if (foundSkills.includes("design")) {
    addUnique(suggestions, "Good for UI/UX and product design roles");
    addUnique(suggestions, "Add case studies with research, wireframes, and final outcomes");
    addUnique(missingSkills, "Accessibility standards (WCAG)");
    addUnique(missingSkills, "User research and usability testing");
  }

  if (foundSkills.includes("cloud") || foundSkills.includes("security")) {
    addUnique(suggestions, "Good for Cloud / DevOps / Security roles");
    addUnique(suggestions, "List certifications and hands-on infrastructure projects");
  }

  addUnique(suggestions, "Make the resume ATS-friendly with clean headings and standard fonts");
  addUnique(suggestions, 'Quantify achievements, for example: "Reduced API latency by 35%"');
  addUnique(suggestions, "Keep GitHub, LinkedIn, and portfolio links visible at the top");

  if (!hasProjects) {
    addUnique(suggestions, "Add a projects section with 2 to 3 real implementations");
    addUnique(missingSkills, "Project portfolio evidence");
  }
  if (!hasCertifications) {
    addUnique(suggestions, "Add a certifications section to strengthen credibility");
  }
  if (!hasLinkedIn) {
    addUnique(suggestions, "Add your LinkedIn profile URL");
    addUnique(missingSkills, "Professional profile links");
  }
  if (!hasExperience) {
    addUnique(suggestions, "Include internships, freelance work, or practical training experience");
  }

  if (foundSkills.length === 0) {
    addUnique(suggestions, "No clear technical profile detected; add a dedicated skills section");
    addUnique(suggestions, "Learn Machine Learning");
    addUnique(missingSkills, "Core programming skills");
    addUnique(missingSkills, "Projects with technology stack");
    addUnique(missingSkills, "Certifications");
  }

  const score = Math.min(
    100,
    foundSkills.length * 12 +
      (hasProjects ? 16 : 0) +
      (hasCertifications ? 12 : 0) +
      (hasLinkedIn ? 8 : 0) +
      (hasExperience ? 10 : 0)
  );

  return {
    foundSkills: foundSkills.map((s) => s.replace("_", " ")),
    suggestions: suggestions.slice(0, 10),
    missingSkills: missingSkills.slice(0, 6),
    suggestedCareers: matchedCareers.slice(0, 5),
    score
  };
}

function parseImagePayload(imageBase64 = "") {
  if (!imageBase64 || typeof imageBase64 !== "string") {
    return null;
  }

  const full = imageBase64.trim();
  const dataUriMatch = full.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (dataUriMatch) {
    return { mimeType: dataUriMatch[1], data: dataUriMatch[2] };
  }

  return { mimeType: "image/png", data: full };
}

async function extractTextFromImage(imageBase64) {
  if (!visionModel) {
    throw new Error(
      "Image OCR is unavailable. Set a valid GOOGLE_AI_KEY in backend/.env, then restart backend. " +
        "You can still paste resume text and analyze."
    );
  }

  const parsed = parseImagePayload(imageBase64);
  if (!parsed) {
    throw new Error("Invalid image payload.");
  }

  const result = await visionModel.generateContent([
    "Extract resume text from this image. Return plain text only. Keep section headings and bullet content.",
    { inlineData: { mimeType: parsed.mimeType, data: parsed.data } }
  ]);
  const response = await result.response;
  return response.text().trim();
}

router.post("/analyze", async (req, res) => {
  try {
    let { resumeText, imageBase64 } = req.body;

    if ((!resumeText || !String(resumeText).trim()) && imageBase64) {
      resumeText = await extractTextFromImage(imageBase64);
    }

    if (!resumeText || !String(resumeText).trim()) {
      return res.status(400).json({
        error: "Please provide resumeText (or imageBase64) to analyze."
      });
    }

    const analysis = analyzeResume(String(resumeText));
    return res.json({
      message: "Resume analyzed successfully",
      suggestions: analysis.suggestions,
      score: analysis.score,
      foundSkills: analysis.foundSkills,
      missingSkills: analysis.missingSkills,
      suggestedCareers: analysis.suggestedCareers
    });
  } catch (error) {
    console.error("Resume analysis error:", error.message);
    return res.status(500).json({
      error: error.message || "Failed to analyze resume image/text."
    });
  }
});

module.exports = router;
