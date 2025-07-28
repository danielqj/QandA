async function askQuestion() {
  const question = document.getElementById("question").value;
  const responseElement = document.getElementById("answer");

  const apiKey = "AIzaSyCAYPvLPC518tX3krwwweG91lZ9oP7DSo8";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: question }] }]
    })
  });

  const data = await response.json();
  const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No answer found.";
  responseElement.innerText = answer;
}
