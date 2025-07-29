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
            text: `Answer the following question in both English and Simplified Chinese. Do not include any pinyin transliteration.:\n\nQuestion: ${question}`
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

// Ensure Enter key works and removes focus from input
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("question");
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
      input.blur(); // Remove focus to stop cursor blinking
    }
  });
});
