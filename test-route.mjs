async function test() {
  const res = await fetch('http://localhost:3000/api/ai-teshis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        { role: "model", content: "Merhaba" },
        { role: "user", content: "Köpeğim hasta" },
        { role: "model", content: "Geçmiş olsun, neyi var?" }
      ],
      finalRequest: true
    })
  });
  console.log(res.status);
  console.log(await res.text());
}
test();
