function calcularAmor() {
  const nome1 = document.getElementById("nome1").value.trim();
  const nome2 = document.getElementById("nome2").value.trim();
  const resultado = document.getElementById("resultado");
  const emoji = document.getElementById("emoji");

  if (!nome1 || !nome2) {
    resultado.textContent = "Por favor, preencha os dois nomes!";
    emoji.style.display = "none";
    return;
  }

  const amor = Math.floor(Math.random() * 51) + 50; // 50 a 100

  // Cria uma string segura, sem usar template string diretamente no innerText/textContent
  const texto = nome1 + " ❤ " + nome2 + " = " + amor + "% de amor!";
  resultado.textContent = texto;

  if (amor >= 90) emoji.textContent = "💖";
  else if (amor >= 75) emoji.textContent = "😍";
  else if (amor >= 60) emoji.textContent = "😊";
  else emoji.textContent = "💔";

  emoji.style.display = "block";
}

window.calcularAmor = calcularAmor;