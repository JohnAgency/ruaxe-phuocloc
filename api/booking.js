function clean(value, max = 500) {
  return String(value ?? '').trim().slice(0, max);
}

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'Telegram environment variables are not configured' });
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ ok: false, error: 'Invalid JSON' }); }
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 50);
  const car = clean(body.car, 120) || 'Chưa cung cấp';
  const service = clean(body.service, 120) || 'Chưa chọn';
  const note = clean(body.note, 500) || 'Không có';
  if (!name || !phone) return res.status(400).json({ ok: false, error: 'Name and phone are required' });

  const message = [
    '<b>ĐẶT LỊCH MỚI – PHƯỚC LỘC</b>', '',
    `<b>Họ tên:</b> ${escapeHtml(name)}`,
    `<b>Số điện thoại:</b> ${escapeHtml(phone)}`,
    `<b>Dòng xe:</b> ${escapeHtml(car)}`,
    `<b>Dịch vụ:</b> ${escapeHtml(service)}`,
    `<b>Ghi chú:</b> ${escapeHtml(note)}`,
  ].join('\n');

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
  });
  const telegramResult = await telegramResponse.json();
  if (!telegramResponse.ok || !telegramResult.ok) {
    console.error('Telegram API error', telegramResult);
    return res.status(502).json({ ok: false, error: 'Telegram notification failed' });
  }
  return res.status(200).json({ ok: true });
}
