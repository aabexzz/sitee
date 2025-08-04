const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

// Servir a pasta raiz (onde está seu index.html da calculadora)
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});