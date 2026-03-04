import React, { useState } from "react";
import { API_URL } from "../config/api";

const sampleResume = `John Doe
Email: john@example.com | LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

EDUCATION
B.E. Computer Science, XYZ Engineering College (2024)

SKILLS
Languages: Python, JavaScript, SQL
Libraries: React, NumPy, Pandas
Tools: Git, VS Code, Jupyter Notebook

PROJECTS
1. Machine Learning Image Classifier - Built CNN using TensorFlow, achieved 94% accuracy
2. E-commerce Website - React frontend with Node.js backend
3. Data Analysis Dashboard - Used Power BI and Python for sales analysis

CERTIFICATIONS
- Python for Data Science (Coursera)
- Web Development Bootcamp (Udemy)

EXPERIENCE
Intern - XYZ Tech Company (Jun 2023 - Aug 2023)
- Developed REST APIs using Node.js and Express
- Worked on React frontend features`;

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const loadSample = () => {
    setResumeText(sampleResume);
    setResult(null);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError("Paste resume text first.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/resume/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Resume analysis failed.");
      }

      setResult(data);
    } catch (requestError) {
      setError(
        requestError.message ||
          "Failed to connect to the backend. Check server status and API URL configuration."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <div className="grid-2">
        <div>
          <div className="card mb-20">
            <div className="section-header">
              <h2>
                <div className="section-icon">CV</div>
                Resume Input
              </h2>
              <button className="btn btn-secondary btn-sm" onClick={loadSample} id="btn-load-sample">
                Load Sample
              </button>
            </div>
            <p className="text-secondary mb-16" style={{ fontSize: 13, lineHeight: 1.6 }}>
              Paste your resume text below and run analysis to get skill gaps, suggestions, and suitable
              career directions.
            </p>

            <textarea
              id="resume-textarea"
              className="form-textarea"
              placeholder="Paste resume content here (optional when using image upload)..."
              value={resumeText}
              onChange={(event) => setResumeText(event.target.value)}
              style={{ minHeight: 220 }}
            />

            {error && (
              <div
                style={{
                  background: "rgba(255, 107, 157, 0.1)",
                  border: "1px solid rgba(255, 107, 157, 0.3)",
                  color: "#FF6B9D",
                  padding: "12px 16px",
                  borderRadius: 10,
                  fontSize: 13,
                  marginBottom: 16
                }}
              >
                {error}
              </div>
            )}

            <button
              id="btn-analyze-resume"
              className="btn btn-primary btn-full"
              onClick={handleAnalyze}
              disabled={loading || !resumeText.trim()}
            >
              {loading ? "Analyzing resume..." : "Analyze Resume"}
            </button>
          </div>
        </div>

        <div>
          {!result && !loading && (
            <div className="card" style={{ height: "100%" }}>
              <div className="empty-state">
                <div className="empty-icon">CV</div>
                <h3>Analysis Results</h3>
                <p>Run analysis to see suggestions, missing skills, career fit, and score.</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="card" style={{ height: "100%" }}>
              <div className="empty-state">
                <h3>Analyzing resume...</h3>
                <p>Processing your text/image and generating rule-based suggestions.</p>
                <div className="loading-dots" style={{ justifyContent: "center", marginTop: 16 }}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}

          {result && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="result-panel">
                <h3 style={{ fontFamily: "Space Grotesk", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
                  Resume Score
                </h3>
                <div style={{ fontSize: 44, fontWeight: 700, color: "var(--primary)" }}>{result.score || 0}</div>
              </div>

              {result.foundSkills?.length > 0 && (
                <div className="card">
                  <h3 style={{ fontFamily: "Space Grotesk", fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                    Detected Skills
                  </h3>
                  <div className="skills-container">
                    {result.foundSkills.map((skill, index) => (
                      <span key={index} className="skill-tag found">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.suggestedCareers?.length > 0 && (
                <div className="card">
                  <h3 style={{ fontFamily: "Space Grotesk", fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                    Suitable Careers
                  </h3>
                  <div className="skills-container">
                    {result.suggestedCareers.map((career, index) => (
                      <span
                        key={index}
                        className="skill-tag"
                        style={{
                          background: "rgba(255,159,67,0.12)",
                          borderColor: "rgba(255,159,67,0.3)",
                          color: "var(--accent-orange)"
                        }}
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="card">
                <h3 style={{ fontFamily: "Space Grotesk", fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                  Suggestions
                </h3>
                <ul className="suggestions-list">
                  {(result.suggestions || []).map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>

              {result.missingSkills?.length > 0 && (
                <div className="card">
                  <h3 style={{ fontFamily: "Space Grotesk", fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                    Missing Skills
                  </h3>
                  <div className="skills-container">
                    {result.missingSkills.map((skill, index) => (
                      <span key={index} className="skill-tag missing">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
