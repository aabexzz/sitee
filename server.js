const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar armazenamento
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

// Servir arquivos estáticos da raiz
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Upload dos arquivos
app.post('/upload', upload.fields([{ name: 'imagem' }, { name: 'audio' }]), (req, res) => {
  const texto = req.body.texto;
  const imagem = '/uploads/' + req.files['imagem'][0].filename;
  const audio = '/uploads/' + req.files['audio'][0].filename;

  const dados = { imagem, audio, texto };

  let uploads = [];
  if (fs.existsSync('./uploads/dados.json')) {
    uploads = JSON.parse(fs.readFileSync('./uploads/dados.json'));
  }

  uploads.unshift(dados);
  fs.writeFileSync('./uploads/dados.json', JSON.stringify(uploads, null, 2));

  res.redirect('/');
});

// Fornecer dados JSON para a galeria
app.get('/uploads', (req, res) => {
  if (fs.existsSync('./uploads/dados.json')) {
    const dados = JSON.parse(fs.readFileSync('./uploads/dados.json'));
    res.json(dados);
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});