const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/pwa/open', async (req, res) => {
  const { pwaId } = req.body;
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const referrer = req.headers['referer'] || null;

  try {
    await prisma.pwaStatistic.create({
      data: {
        pwaId,
        userAgent,
        ip,
        referrer,
      },
    });
    res.status(200).json({ message: 'PWA open recorded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record' });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
  const crypto = require('crypto');

const TELEGRAM_BOT_TOKEN = '7625071117:AAGPPjZ9nzeGiSsO9GckxFRlherX4EPXVBE';

app.get('/api/telegram-auth', async function (req, res) {
    const data = req.query;
    const checkHash = data.hash;

    const secret = crypto.createHash('sha256').update(TELEGRAM_BOT_TOKEN).digest();
    const dataCheckString = Object.keys(data)
      .filter(k => k !== 'hash')
      .sort()
      .map(k => `${k}=${data[k]}`)
      .join('\n');

    const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');

    if (hmac !== checkHash) {
      return res.status(403).send('❌ Ошибка авторизации');
    }

    console.log('✅ Авторизован через Telegram:', data);

    res.send('Успешная авторизация! Можно редиректить или показывать профиль.');
  });

});

