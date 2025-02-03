const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Multer設定: 画像や動画の保存先
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // 'uploads'ディレクトリに保存
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // ファイル名にタイムスタンプを追加
  }
});

const upload = multer({ storage: storage });

// アップロードされた画像の保存
app.post('/uploadImage', upload.single('file'), (req, res) => {
  console.log('Image uploaded:', req.file);
  res.send({ success: true, filePath: req.file.path });
});

// アップロードされた動画の保存
app.post('/uploadVideo', upload.single('file'), (req, res) => {
  console.log('Video uploaded:', req.file);
  res.send({ success: true, filePath: req.file.path });
});

// サーバー起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
