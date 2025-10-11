import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './Chatbot.css';

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Waiting To Generate....");

  const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  async function askBot() {
    try {
        console.log("Getting Responces...")
      setAnswer("Loading...");

      // 1️⃣ Get a model instance first
      const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

      // 2️⃣ Call generateContent on the model instance
      const response = await model.generateContent([`Answer this question concisely for a student in class 1-10: ${question}`]); // array of strings

      const text_ans = response.response.text();
      setAnswer(text_ans);
      console.log("Got the Responces...")
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setAnswer("Error fetching response.");
    }
  }

  return (
  <div className="chatbot-container">
    <h1>🤖 chintu.</h1>
    <input
      type="text"
      value={question}
      placeholder="Ask something..."
      onChange={(e) => setQuestion(e.target.value)}
    />
    <button onClick={askBot}>Ask</button>
    <p className={answer === "Loading..." ? "loading" : answer.startsWith("Error") ? "error" : ""}>💡: {answer}</p>
  </div>
);

}

export default Chatbot;
