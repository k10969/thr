const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // Threads APIへのリクエスト用

const app = express();
app.use(bodyParser.json());

// スケジュール投稿処理をバックグラウンドで実行
app.post('/background-process', async (req, res) => {
  const { mediaUrl, postText, accessToken } = req.body;

  try {
    // ここで非同期で投稿処理を行います（例えば、メディアの投稿）
    const postResponse = await axios.post('https://graph.threads.net/v1.0/{user_id}/threads', {
      text: postText,
      media: mediaUrl,
      access_token: accessToken
    });
    
    if (postResponse.data.id) {
      res.status(200).json({ success: true, postId: postResponse.data.id });
    } else {
      res.status(500).json({ error: '投稿に失敗しました' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ワーカーをバックグラウンドで起動
app.listen(3001, () => {
  console.log('バックグラウンドワーカーが実行中...');
});
