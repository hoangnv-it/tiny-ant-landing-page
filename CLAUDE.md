# Tiny Ant — Landing page

## Mục tiêu

Website marketing cho Tiny Ant tại tinyant.app. Khách hàng chính: chủ trung tâm học thêm vừa và nhỏ (khoảng 1–200 học sinh); nhà trường là nhóm phụ. Giao diện theo ảnh thiết kế `design/landing page - design.png` (phong cách sách giáo khoa cũ, tranh màu nước).

## Stack

React 18 + Vite + TypeScript + Tailwind, prerender bằng vite-react-ssg. Deploy Cloudflare Workers (file tĩnh, `wrangler.jsonc`). Không thêm thư viện UI hay animation lớn.

Viết code bằng React API như bình thường. Riêng bundle production cho trình duyệt được alias sang preact/compat (xem vite.config.ts) để giữ JS < 80 KB; prerender và `npm run dev` vẫn chạy React thật. Hệ quả:
- Sau khi build, chạy `npm run check:hydrate` — HTML prerender và DOM sau hydrate phải khớp, không lỗi console.
- Tránh API chỉ React mới có (useId, useSyncExternalStore, Suspense/lazy khi SSR, server components). `useEffect` trong Preact chạy trễ hơn một nhịp — xử lý phím/sự kiện bằng handler trên phần tử thay vì gắn listener trong effect khi cần phản hồi ngay.
- Nhiều trang (src/routes.tsx), mỗi trang con là route `lazy` (một chunk riêng; vite-react-ssg nạp chunk trước khi hydrate nên HTML prerender vẫn đủ nội dung). Xuất phẳng (`ten-trang.html`, `huong-dan/ten-bai.html`), URL không có "/" cuối. Trang 404 là route `*` -> `dist/404.html`.
- Thêm trang tính năng: tạo `src/content/features/<duong-dan>.ts` (kiểu `FeatureContent`), tự có route. Thêm bài hướng dẫn: thêm vào `guides` trong vi.ts và tạo `src/content/guides/<ten-bai>.ts`. Thêm vào `featurePages`/`audiencePages` và footer nếu cần link.
- Sitemap sinh tự động lúc build từ các file HTML trong dist (bỏ 404). Đường dẫn cũ chuyển hướng trong `public/_redirects`; không link tới đường dẫn đã chuyển hướng.

## Luật nội dung (bắt buộc)

- Mọi chữ hiển thị nằm trong src/content/ (vi.ts, features/*.ts, guides/*.ts). Không viết chữ cứng trong component.
- Không bịa tính năng, số liệu, giá, tên khách hàng, lời chứng thực, chứng nhận. Chỉ quảng bá tính năng đã xác minh (không có app trên App Store/CH Play, không có AI, không tích hợp cổng thanh toán). Chỗ thiếu dữ liệu thật ghi "[[TODO: ...]]".
- Cảm nhận khách hàng chỉ bật (`SHOW_TESTIMONIALS` trong src/sections/Testimonials.tsx) khi đã có cảm nhận thật, có sự đồng ý. Giá: điền `pricingTiers[].price` trong vi.ts; khi mọi gói có giá, schema tự thêm `offers`.
- Tiếng Việt có dấu, tự nhiên, thân thiện, câu ngắn, tránh thuật ngữ IT. Xưng "thầy cô", "anh/chị". Tránh từ sáo rỗng: "đột phá", "cách mạng", "hàng đầu".
- Liên hệ: SĐT 0906490974 (cũng là Zalo: nút `ZaloButton`), email contact@tinyant.app. Phản hồi đăng ký dùng thử trong 1 ngày làm việc. Email báo đăng ký mới gửi qua Apps Script (`NOTIFY_DEFAULT` trong apps-script/Code.gs).
- Thuật ngữ: Lớp học thêm, Buổi học, Điểm danh, Bài tập về nhà, Phụ huynh, Thư viện bài.

## Luật thiết kế

- Màu và khoảng cách lấy từ token trong src/styles/tokens.css (Tailwind v4 `@theme`, không có tailwind.config). Không dùng mã màu rời rạc.
- Tiêu đề: Bitter. Chữ thường: Hanken Grotesk. Icon: SVG nội tuyến hoặc Material Symbols Outlined.
- Chữ luôn là HTML, không nằm trong ảnh.
- Mobile-first. Kiểm tra ở 375, 768, 1280, 1440px.

## Luật kỹ thuật

- Mỗi trang có đúng một <h1>, heading không nhảy cóc. Title/description riêng từng trang (Seo.tsx), canonical tuyệt đối. JSON-LD: trang chủ Organization + SoftwareApplication + FAQPage; trang con WebPage + BreadcrumbList (+ FAQPage nếu có FAQ, Article với bài hướng dẫn). FAQPage phải khớp FAQ hiển thị. Không dùng aggregateRating/Review.
- Ảnh: dùng component <Img> chung (src/components/Img.tsx — AVIF/WebP, srcset, width/height, lazy trừ ảnh hero). Ảnh trang trí alt="".
- Nội dung menu và FAQ phải có trong HTML lúc prerender (ẩn bằng CSS/thuộc tính, không render có điều kiện). Link nội bộ là thẻ `<a href>` thật.
- Menu "Tính năng" (header) dùng được bằng bàn phím, Esc đóng. FAQ dùng <details>/<summary>.
- Ngân sách: JS < 80 KB nén cho mỗi trang. Lighthouse mobile ≥ 90 cho cả 4 mục.
- Không đưa khoá bí mật vào repo. Biến môi trường: VITE_TURNSTILE_SITE_KEY, VITE_LEAD_ENDPOINT (mẫu trong .env.example).
- Chính sách bảo mật là trang riêng `/chinh-sach-bao-mat` (link cũ `/#chinh-sach-bao-mat` được chuyển sang bằng script trong index.html).
- Đăng ký dùng thử: mọi nút "Đăng ký dùng thử miễn phí" là link `/#dang-ky` (có `data-position`). Khi kiểm thử không gửi form với dữ liệu hợp lệ (tạo lead thật trong Google Sheets). `LeadModal` (trong Layout) bắt click và mở pop-up `<dialog>`; tắt JS thì link cuộn tới khối CTA có cách liên hệ trực tiếp. Muốn mở pop-up từ code: `openLeadModal()` trong src/lib/leadModal.ts.

## Quy trình

- Sau khi làm xong một section: chạy `npm run shots`, đọc ảnh chụp trong shots/, so với `design/landing page - design.png`, tự sửa chỗ lệch rồi mới báo xong.
- Trước khi báo xong: `npm run build`, rồi `check:seo`, `check:links`, `check:hydrate`, `check:a11y`, `lint`. Lighthouse: `npm run check:lighthouse -- --path=/trang`.
- Báo cáo ngắn: đã làm gì, còn lệch gì so với thiết kế, chỗ nào [[TODO]].
