
async function askQuestion() {
  const question = document.getElementById("question").value;
  const responseElement = document.getElementById("answer");
  const apiKey = "AIzaSyAyzQvFzWoEd8ZhzrqCwVcGsxNgpJgdCvQ";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Answer the following question in both English and Simplified Chinese:\n\nQuestion: ${question}`
          }]
        }]
      })
    });

    const data = await response.json();
    console.log("Full API response:", JSON.stringify(data, null, 2));
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No answer found.";
    responseElement.innerText = answer;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    responseElement.innerText = "Error connecting to Gemini API.";
  }
}

// Enable Enter key to submit question
document.getElementById("question").addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    askQuestion();
  }
});
