async function generateFuture() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const interests = document.getElementById("interests").value;

  const res = await fetch("/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, age, interests })
  });

  const data = await res.json();

  document.getElementById("output").innerText = data.result;
}
