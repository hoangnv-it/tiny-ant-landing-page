# Hướng dẫn tạo ảnh minh hoạ kiểu sách giáo khoa 1990s

Ảnh scan sách thật của NXB Giáo dục chỉ dùng làm **mẫu phong cách**, không đưa lên trang (bản quyền tranh, logo NXB, thông tin cá nhân trên nhãn vở). Hãy tạo ảnh mới theo các đặc điểm dưới đây.

## Đặc điểm chung (thêm vào mọi prompt)

> Vietnamese primary school textbook illustration from the early 1990s, hand-drawn with black ink outlines, flat gouache colors printed in offset (slightly misregistered colors, visible paper grain), limited palette of red, sky blue, leaf green and yellow ochre on off-white aged paper, simple backgrounds, children with round faces and rosy cheeks, white shirts with red scarves. No text, no logo, no watermark.

Biến thể đơn sắc (giống tranh xanh lam): thay phần màu bằng
> printed in a single blue ink plus black, halftone shading.

## Từng vị trí

| Tên file đặt vào `src/assets/illustrations/` | Tỉ lệ | Nội dung gợi ý |
|---|---|---|
| `hero-kids.webp` | 6:5, nền trong suốt | Hai học sinh khăn quàng đỏ ôm sách, nhìn lên |
| `problem-center.webp` | 4:3 | Cô giáo ngồi bàn, chồng sổ điểm danh cao |
| `problem-teacher.webp` | 4:3 | Thầy giáo chấm bài dưới đèn bàn |
| `problem-student.webp` | 4:3 | Học sinh chống cằm trước vở bài tập |
| `problem-parent.webp` | 4:3 | Bố mẹ ngồi bên con, nhìn quyển vở |
| `tab-center.webp` … `tab-parent.webp` | 4:5 | Một nhân vật chính cho từng tab |
| `step-1/2/3.webp` | 4:3, nền trong suốt | Cô giáo cầm điện thoại / hai tay cầm điện thoại / cô và trò |
| `library-books.webp` | 15:8, nền trong suốt | Chồng 4 sách, **gáy để trống** (tên môn đặt bằng HTML) |
| `cta-school-gate.webp` | 3:4 | Cổng trường cấp 1, cây phượng |
| `flowers-corner.webp` | 3:5, nền trong suốt | Cành hoa phượng / hoa giấy |
| `form-cover.webp` | 3:4 | Học sinh ngồi viết bài, cạnh lọ mực |

Đặt đúng tên file thì ảnh tự thay, không cần sửa code (riêng ảnh đang gán tên khác, báo để gỡ dòng `file` trong `src/components/illustrations.ts`).
Riêng `library-books`: đổi ảnh thì đo lại vị trí 4 gáy trong `src/sections/Library.tsx` (mảng `SPINES`).
