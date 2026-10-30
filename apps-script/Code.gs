/**
 * Tiny Ant — nhận đăng ký dùng thử từ tinyant.app.
 *
 * Web app (Deploy > Web app, Execute as: Me, Who has access: Anyone).
 * Script Properties:
 *   TURNSTILE_SECRET   (bắt buộc) secret key của widget Turnstile
 *   ALLOWED_HOSTNAMES  (tuỳ chọn) ví dụ "tinyant.app,www.tinyant.app" — chặn token từ domain khác
 *   NOTIFY_EMAIL       (tuỳ chọn) ghi đè danh sách người nhận email báo, cách nhau bằng dấu phẩy.
 *                      Mặc định: NOTIFY_DEFAULT bên dưới.
 *
 * Trang gửi POST Content-Type text/plain (body là JSON) để tránh preflight CORS.
 */

var SHEET_NAME = 'Leads';
// Người nhận email báo mỗi khi có đăng ký mới (khi chưa đặt Script Property NOTIFY_EMAIL)
var NOTIFY_DEFAULT = 'it.hoang.nv@gmail.com,vanhoang06t3@gmail.com';
var HEADERS = [
  'Nhận lúc', 'SĐT', 'Họ tên', 'Trung tâm', 'Vị trí nút', 'Trang',
  'utm_source', 'utm_medium', 'utm_campaign', 'Gửi lúc (trình duyệt)'
];
var PHONE_RE = /^0[35789]\d{8}$/;

function doPost(e) {
  var body;
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_({ ok: false, error: 'bad_json' });
  }

  // Honeypot có dữ liệu: bot. Trả ok để bot không thử cách khác, nhưng không ghi gì.
  if (str_(body.website)) return json_({ ok: true });

  var phone = str_(body.phone);
  if (!PHONE_RE.test(phone)) return json_({ ok: false, error: 'invalid_phone' });

  if (!verifyTurnstile_(str_(body.turnstileToken))) {
    return json_({ ok: false, error: 'turnstile' });
  }

  var source = body.source || {};
  var row = [
    new Date(),
    "'" + phone, // giữ số 0 đầu
    safe_(body.name, 120),
    safe_(body.center, 160),
    safe_(body.position, 20),
    safe_(body.page, 200),
    safe_(source.utm_source, 200),
    safe_(source.utm_medium, 200),
    safe_(source.utm_campaign, 200),
    safe_(body.createdAt, 40)
  ];

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet_().appendRow(row);
  } finally {
    lock.releaseLock();
  }

  try {
    notify_(phone, row);
  } catch (err) {
    // Đã ghi sheet thành công; lỗi email (vd. hết hạn mức) không làm hỏng đăng ký
    console.error('notify failed', err);
  }

  return json_({ ok: true });
}

/** Kiểm tra sức sống khi mở URL web app bằng trình duyệt. */
function doGet() {
  return json_({ ok: true, service: 'tinyant-leads' });
}

function verifyTurnstile_(token) {
  if (!token) return false;
  var props = PropertiesService.getScriptProperties();
  var secret = props.getProperty('TURNSTILE_SECRET');
  if (!secret) throw new Error('Thiếu Script Property TURNSTILE_SECRET');

  var res = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'post',
    payload: { secret: secret, response: token },
    muteHttpExceptions: true
  });
  var data = JSON.parse(res.getContentText() || '{}');
  if (!data.success) return false;

  var allowed = (props.getProperty('ALLOWED_HOSTNAMES') || '')
    .split(',').map(function (h) { return h.trim(); }).filter(String);
  return !allowed.length || allowed.indexOf(data.hostname) !== -1;
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function notify_(phone, row) {
  var to = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL') || NOTIFY_DEFAULT;
  var lines = HEADERS.map(function (h, i) {
    var v = i === 1 ? phone : row[i];
    return h + ': ' + (v === '' || v == null ? '—' : v);
  });
  MailApp.sendEmail({
    to: to,
    subject: 'Đăng ký dùng thử mới: ' + phone + (row[3] ? ' — ' + row[3] : ''),
    body: lines.join('\n') + '\n\nSheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl()
  });
}

function str_(v) {
  return v == null ? '' : String(v).trim();
}

/** Cắt độ dài và chặn công thức (=, +, -, @) bị Sheets thực thi. */
function safe_(v, max) {
  var s = str_(v).slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
