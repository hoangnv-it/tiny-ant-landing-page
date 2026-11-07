import type { ArticleContent } from '../types'

const article: ArticleContent = {
  lead: 'Bài kiểm tra đầu vào là lần đầu phụ huynh “thử” trung tâm. Một bài thi xếp lớp tốt giúp con vào đúng lớp, giúp giáo viên biết em cần gì, và cho phụ huynh thấy trung tâm làm việc bài bản. Bài này hướng dẫn cách thiết kế đề, đặt khung điểm xếp trình độ và tổ chức quy trình thi thử → học thử → ghi danh cho trung tâm học thêm.',
  body: [
    { h2: 'Bài kiểm tra đầu vào để làm gì?' },
    {
      p: 'Mục tiêu chính không phải là “chấm điểm” học sinh, mà là xếp con vào lớp phù hợp. Xếp lớp quá dễ thì con chán, quá khó thì con nản và phụ huynh nghĩ trung tâm dạy không hiệu quả. Bài kiểm tra đầu vào còn cho giáo viên biết trước những phần con còn yếu để chuẩn bị.',
    },
    {
      p: 'Với phụ huynh, kết quả rõ ràng kèm lời khuyên cụ thể là lý do lớn để tin trung tâm. Vì vậy, hãy coi bài thi xếp lớp là một phần của việc tuyển sinh, không chỉ là thủ tục.',
    },
    { h2: 'Bước 1: Xác định trung tâm cần đo điều gì' },
    {
      p: 'Liệt kê các lớp hoặc trình độ trung tâm đang có, và với mỗi trình độ, học sinh cần biết gì trước khi vào học. Ví dụ với môn Toán lớp 6: nắm chắc phép tính với số tự nhiên, phân số cơ bản, giải bài toán có lời văn đơn giản. Những kiến thức “cần có” này chính là nội dung của đề.',
    },
    {
      note: 'Đừng cố đo mọi thứ. Một bài kiểm tra đầu vào chỉ cần đủ để phân biệt các trình độ của trung tâm.',
    },
    { h2: 'Bước 2: Cấu trúc đề theo từng phần' },
    {
      p: 'Chia đề thành vài phần, mỗi phần ứng với một nhóm kiến thức hoặc kỹ năng. Với môn ngoại ngữ, có thể là từ vựng, ngữ pháp, đọc hiểu. Với môn Toán, có thể là tính toán, hình học, bài toán có lời văn. Điểm từng phần quan trọng không kém điểm tổng: hai em cùng 6 điểm có thể yếu ở hai phần rất khác nhau.',
    },
    {
      ul: [
        'Sắp xếp câu hỏi từ dễ đến khó trong mỗi phần, để em yếu vẫn làm được phần đầu và không bị mất tinh thần.',
        'Giữ độ dài vừa phải. Bài quá dài khiến học sinh mệt, nhất là khi làm ở nhà trên điện thoại.',
        'Đặt thời gian làm bài cụ thể và báo trước cho phụ huynh.',
        'Với bài đọc hiểu, giữ đoạn văn hiển thị trong lúc học sinh trả lời các câu hỏi liên quan.',
      ],
    },
    { h2: 'Bước 3: Chọn dạng câu hỏi dễ chấm' },
    {
      p: 'Trắc nghiệm, đúng/sai và tự luận ngắn (điền một từ, một con số) vừa đo được kiến thức, vừa chấm nhanh và khách quan. Bài viết dài hay nói tiếng Anh thì để giáo viên đánh giá trong buổi học thử, nơi giáo viên quan sát được trực tiếp.',
    },
    {
      p: 'Nên chuẩn bị đề sao cho dùng lại được cho nhiều học sinh. Đừng phát đề kèm đáp án, và đổi một phần câu hỏi sau mỗi kỳ tuyển sinh nếu thấy cần.',
    },
    { h2: 'Bước 4: Đặt khung điểm xếp trình độ' },
    {
      p: 'Khung điểm là bảng quy đổi từ điểm số sang trình độ hoặc lớp. Viết khung điểm trước khi cho học sinh làm bài, để kết quả công bằng giữa các em. Ví dụ minh hoạ cho thang điểm 10 (mỗi trung tâm tự điều chỉnh theo đề và lớp của mình):',
    },
    {
      table: {
        caption: 'Ví dụ khung điểm xếp trình độ theo thang điểm 10',
        head: ['Điểm', 'Trình độ', 'Gợi ý cho phụ huynh'],
        rows: [
          ['Dưới 5', 'Lớp nền tảng', 'Củng cố lại kiến thức lớp dưới trước khi học nâng cao.'],
          ['Từ 5 đến dưới 8', 'Lớp cơ bản', 'Học theo chương trình, luyện thêm phần còn yếu.'],
          ['Từ 8 trở lên', 'Lớp nâng cao', 'Có thể học nhanh hơn, làm thêm bài khó.'],
        ],
      },
    },
    {
      p: 'Kèm theo mỗi trình độ, viết sẵn một câu gợi ý ngắn cho phụ huynh. Kết quả “6,5 điểm” rất khó hiểu với phụ huynh, nhưng “con vững phần tính toán, cần luyện thêm bài toán có lời văn, phù hợp với lớp cơ bản” thì phụ huynh hiểu ngay.',
    },
    { h2: 'Bước 5: Quy trình thi thử → học thử → ghi danh' },
    {
      ol: [
        'Phụ huynh liên hệ: ghi lại tên, số điện thoại, lớp của con và môn quan tâm.',
        'Gửi bài thi thử: cho con làm ở trung tâm hoặc làm online ở nhà, có thời gian rõ ràng.',
        'Trả kết quả trong ngày: điểm tổng, điểm từng phần, trình độ và gợi ý.',
        'Mời học thử một buổi học thật của lớp phù hợp, không phải buổi học “trình diễn”.',
        'Sau buổi học thử, giáo viên nhận xét ngắn: con tham gia thế nào, theo kịp không.',
        'Gọi lại phụ huynh để tư vấn và ghi danh.',
      ],
    },
    {
      p: 'Buổi học thử thường là lúc phụ huynh quyết định. Hãy để giáo viên dạy như bình thường, rồi gửi nhận xét cụ thể ngay sau buổi học.',
    },
    { h2: 'Theo dõi phễu tuyển sinh' },
    {
      p: 'Mỗi phụ huynh quan tâm nên được ghi vào một danh sách với trạng thái: Quan tâm, Đã thi thử, Đã học thử, Ghi danh. Nhìn danh sách là biết ai cần gọi lại. Cuối mỗi đợt tuyển sinh, xem lại số lượng ở từng bước để biết trung tâm hay “rơi” khách ở đâu: không gửi bài thi thử kịp, hay học thử xong không ai gọi lại.',
    },
    { h2: 'Những lỗi hay gặp' },
    {
      ul: [
        'Đề quá dài hoặc quá khó, học sinh bỏ dở giữa chừng.',
        'Chỉ báo điểm tổng, không có điểm từng phần và lời khuyên.',
        'Đặt khung điểm sau khi đã chấm, dẫn tới xếp lớp thiếu nhất quán.',
        'Trả kết quả chậm vài ngày, phụ huynh đã tìm trung tâm khác.',
        'Không ghi lại phụ huynh đã liên hệ, nên quên gọi lại.',
      ],
    },
  ],
  outro: {
    title: 'Tiny Ant giúp gì cho việc tuyển sinh',
    text: 'Với Tiny Ant, trung tâm gửi phụ huynh link thi thử xếp lớp: học sinh làm online không cần tài khoản, có đồng hồ và tự nộp khi hết giờ. Hệ thống tự chấm thang điểm 10, có điểm từng phần, xếp trình độ theo khung điểm trung tâm đặt kèm gợi ý. Sau đó trung tâm hẹn học thử vào buổi học thật và theo dõi phễu tuyển sinh từ Quan tâm đến Ghi danh.',
    links: ['/kiem-tra-dau-vao', '/diem-danh-hoc-sinh'],
  },
}

export default article
