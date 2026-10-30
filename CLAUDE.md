# Tiny Ant — Landing page

## Mục tiêu

Landing page marketing cho Tiny Ant tại tinyant.app. Đối tượng chính: trung tâm và giáo viên dạy thêm. Trang thật phải GIỐNG ảnh thiết kế `design/landing page - design.png`.

## Stack

React 18 + Vite + TypeScript + Tailwind, prerender bằng vite-react-ssg. Deploy Cloudflare Pages. Không thêm thư viện UI hay animation lớn.

Viết code bằng React API như bình thường. Riêng bundle production cho trình duyệt được alias sang preact/compat (xem vite.config.ts) để giữ JS < 80 KB; prerender và `npm run dev` vẫn chạy React thật. Hệ quả:
- Sau khi build, chạy `npm run check:hydrate` — HTML prerender và DOM sau hydrate phải khớp, không lỗi console.
- Tránh API chỉ React mới có (useId, useSyncExternalStore, Suspense/lazy khi SSR, server components). `useEffect` trong Preact chạy trễ hơn một nhịp — xử lý phím/sự kiện bằng handler trên phần tử thay vì gắn listener trong effect khi cần phản hồi ngay.
- Hiện chỉ có một trang (`/`). Chính sách bảo mật là pop-up (`PrivacyModal`, link `#chinh-sach-bao-mat`); URL cũ `/chinh-sach-bao-mat` chuyển hướng qua `public/_redirects`. Nếu thêm trang con: xuất dạng phẳng (`ten-trang.html`), URL không có "/" cuối.

## Luật nội dung (bắt buộc)

- Mọi chữ hiển thị nằm trong src/content/vi.ts. Không viết chữ cứng trong component.
- Không bịa tính năng, số liệu, giá, tên khách hàng, lời chứng thực. Chỗ chưa chắc ghi "[CẦN XÁC NHẬN: ...]".
- Tiếng Việt tự nhiên, thân thiện, câu ngắn. Xưng "thầy cô", "anh/chị". Tránh từ sáo rỗng: "đột phá", "cách mạng", "hàng đầu".
- Liên hệ: SĐT 0906490974 (cũng là Zalo: nút `ZaloButton`), email contact@tinyant.app. Phản hồi đăng ký dùng thử trong 1 ngày làm việc. Email báo đăng ký mới gửi qua Apps Script (`NOTIFY_DEFAULT` trong apps-script/Code.gs).
- Thuật ngữ: Lớp học thêm, Buổi học, Điểm danh, Bài tập về nhà, Phụ huynh, Thư viện bài.

## Luật thiết kế

- Màu và khoảng cách lấy từ token trong src/styles/tokens.css (Tailwind v4 `@theme`, không có tailwind.config). Không dùng mã màu rời rạc.
- Tiêu đề: Bitter. Chữ thường: Hanken Grotesk. Icon: SVG nội tuyến hoặc Material Symbols Outlined.
- Chữ luôn là HTML, không nằm trong ảnh.
- Mobile-first. Kiểm tra ở 375, 768, 1280, 1440px.

## Luật kỹ thuật

- Mỗi trang có đúng một <h1>. Section dùng <h2>.
- Ảnh: dùng component <Img> chung (src/components/Img.tsx — AVIF/WebP, srcset, width/height, lazy trừ ảnh hero). Ảnh trang trí alt="".
- Nội dung trong tab và FAQ phải có trong HTML lúc prerender (ẩn bằng CSS/thuộc tính, không render có điều kiện).
- Tab theo chuẩn ARIA, dùng được bằng bàn phím. FAQ dùng <details>/<summary>.
- Ngân sách: JS < 80 KB nén. Lighthouse mobile ≥ 90 cho cả 4 mục.
- Không đưa khoá bí mật vào repo. Biến môi trường: VITE_TURNSTILE_SITE_KEY, VITE_LEAD_ENDPOINT (mẫu trong .env.example).
- Đăng ký dùng thử: mọi nút "Đăng ký dùng thử miễn phí" là link `#dang-ky` (có `data-position`). `LeadModal` (trong Layout) bắt click và mở pop-up `<dialog>`; tắt JS thì link cuộn tới khối CTA có cách liên hệ trực tiếp. Muốn mở pop-up từ code: `openLeadModal()` trong src/lib/leadModal.ts.

## Quy trình

- Sau khi làm xong một section: chạy `npm run shots`, đọc ảnh chụp trong shots/, so với `design/landing page - design.png`, tự sửa chỗ lệch rồi mới báo xong.
- Báo cáo ngắn: đã làm gì, còn lệch gì so với thiết kế, chỗ nào [CẦN XÁC NHẬN].
