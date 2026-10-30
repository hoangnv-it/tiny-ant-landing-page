# Nhận đăng ký dùng thử bằng Google Apps Script

Form "Đăng ký dùng thử" trên tinyant.app gửi tới một web app Apps Script. Web app này làm 4 việc: kiểm tra Turnstile, ghi một dòng vào sheet `Leads` và gửi email báo về it.hoang.nv@gmail.com và vanhoang06t3@gmail.com (biến `NOTIFY_DEFAULT` trong `Code.gs`), rồi trả về `{ "ok": true }`.

## 1. Tạo widget Turnstile

1. Vào Cloudflare Dashboard → Turnstile → **Add widget**.
2. Thêm hostname `tinyant.app`. Thêm `localhost` nếu muốn thử ở máy.
3. Ở mục Widget mode, chọn **Managed**. Giao diện tự ẩn (`interaction-only`) đã được bật trong code của trang.
4. Ghi lại **Site key** (dùng công khai) và **Secret key** (giữ bí mật).

## 2. Tạo sheet và script

1. Tạo một Google Sheet mới bằng tài khoản của Tiny Ant.
2. Mở **Extensions → Apps Script**, xoá code mẫu, dán nội dung file `Code.gs` vào.
3. Mở **Project Settings → Script Properties** và thêm:
   - `TURNSTILE_SECRET`: Secret key ở bước 1 (bắt buộc).
   - `ALLOWED_HOSTNAMES`: `tinyant.app` (nên có, để chặn token phát hành cho domain khác).
   - `NOTIFY_EMAIL`: chỉ thêm khi muốn đổi người nhận email báo mà không sửa code. Nhiều địa chỉ thì cách nhau bằng dấu phẩy. Nếu đã đặt biến này từ trước, nó sẽ thay cho danh sách mặc định.

Không cần tạo trước sheet `Leads`. Script sẽ tự tạo sheet này kèm dòng tiêu đề ở lần nhận đăng ký đầu tiên.

## 3. Deploy

1. Bấm **Deploy → New deployment → Web app**.
2. Đặt **Execute as**: *Me*, **Who has access**: *Anyone*.
3. Cấp quyền khi được hỏi. Script cần quyền Sheets, gửi mail và gọi URL bên ngoài.
4. Chép **Web app URL** (dạng `https://script.google.com/macros/s/…/exec`).
5. Mở URL đó bằng trình duyệt. Nếu thấy `{"ok":true,"service":"tinyant-leads"}` là web app đã chạy.

## 4. Nối với trang

Trong Cloudflare Pages, vào **Settings → Environment variables** (Production) và đặt:

| Biến | Giá trị |
|---|---|
| `VITE_LEAD_ENDPOINT` | Web app URL ở bước 3 |
| `VITE_TURNSTILE_SITE_KEY` | Site key ở bước 1 |

Hai biến này được nhúng vào trang lúc build, nên đổi giá trị xong phải build lại. Thử ở máy thì chép `.env.example` thành `.env.local` rồi điền giá trị.

## Lưu ý

- Mỗi lần sửa `Code.gs`, vào **Deploy → Manage deployments → Edit → Version: New version** để URL cũ chạy code mới. Nếu tạo deployment mới thì URL sẽ đổi.
- Tài khoản Gmail thường chỉ gửi được khoảng 100 email mỗi ngày qua MailApp. Khi hết hạn mức, đăng ký vẫn được ghi vào sheet, chỉ thiếu email báo.
- Secret của Turnstile chỉ nằm trong Script Properties, không bao giờ đưa vào repo.
- Muốn thử nhanh với Turnstile, dùng cặp khoá thử của Cloudflare: site key `1x00000000000000000000AA` và secret `1x0000000000000000000000000000000AA`. Cặp này luôn cho qua. Khi dùng khoá thử, để trống `ALLOWED_HOSTNAMES`, vì token thử không mang hostname thật.
