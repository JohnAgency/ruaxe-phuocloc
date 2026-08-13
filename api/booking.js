function clean(value, max = 500) {
  return String(value ?? '').trim().slice(0, max);
}

function escapeHtml(value) {
  return clean(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatVnd(value) {
  return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
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

  const orderType = clean(body.orderType, 40) || 'booking';
  const name = clean(body.name, 120);
  const phone = clean(body.phone, 50);
  const car = clean(body.car, 120) || 'Chưa cung cấp';
  const service = clean(body.service, 120) || 'Chưa chọn';
  const note = clean(body.note, 500) || 'Không có';
  if (!name || !phone) return res.status(400).json({ ok: false, error: 'Name and phone are required' });

  const forwardedFor = req.headers['x-forwarded-for'];
  const rawIp = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : String(forwardedFor || req.headers['x-real-ip'] || '').split(',')[0].trim();
  const clientIp = clean(rawIp, 100) || 'Không xác định';

  const submittedAt = new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date());

  let message;
  if (orderType === 'product_order') {
    const address = clean(body.address, 300);
    const product = clean(body.product, 180);
    const quantity = Math.max(1, Math.min(99, Number.parseInt(body.quantity, 10) || 1));
    const unitPrice = Math.max(0, Math.min(100000000, Number.parseInt(body.unitPrice, 10) || 0));
    if (!address || !product || !unitPrice) {
      return res.status(400).json({ ok: false, error: 'Product, address and unit price are required' });
    }
    const total = quantity * unitPrice;
    message = [
      '<b>ĐƠN MUA NHỚT MỚI – PHƯỚC LỘC</b>', '',
      `<b>Thời gian:</b> ${escapeHtml(submittedAt)}`,
      `<b>IP khách:</b> ${escapeHtml(clientIp)}`,
      `<b>Họ tên:</b> ${escapeHtml(name)}`,
      `<b>Số điện thoại:</b> ${escapeHtml(phone)}`,
      `<b>Địa chỉ nhận hàng:</b> ${escapeHtml(address)}`,
      `<b>Sản phẩm:</b> ${escapeHtml(product)}`,
      `<b>Đơn giá:</b> ${escapeHtml(formatVnd(unitPrice))}`,
      `<b>Số lượng:</b> ${quantity}`,
      `<b>Tiền hàng:</b> ${escapeHtml(formatVnd(total))}`,
      '<b>Phí vận chuyển:</b> Báo riêng sau khi xác nhận đơn',
      `<b>Ghi chú:</b> ${escapeHtml(note)}`,
    ].join('\n');
  } else {
    message = [
      '<b>ĐẶT LỊCH MỚI – PHƯỚC LỘC</b>', '',
      `<b>Thời gian:</b> ${escapeHtml(submittedAt)}`,
      `<b>IP khách:</b> ${escapeHtml(clientIp)}`,
      `<b>Họ tên:</b> ${escapeHtml(name)}`,
      `<b>Số điện thoại:</b> ${escapeHtml(phone)}`,
      `<b>Dòng xe:</b> ${escapeHtml(car)}`,
      `<b>Dịch vụ:</b> ${escapeHtml(service)}`,
      `<b>Ghi chú:</b> ${escapeHtml(note)}`,
    ].join('\n');
  }

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
