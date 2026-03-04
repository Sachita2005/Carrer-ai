function computeApiUrl() {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  if (typeof window !== "undefined") {
    if (window.location.port === "5173") {
      return "http://localhost:5001/api";
    }
    return `${window.location.origin}/api`;
  }

  return "http://localhost:5001/api";
}

export const API_URL = computeApiUrl().replace(/\/$/, "");
