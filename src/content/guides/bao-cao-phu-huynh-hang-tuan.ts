import type { ArticleContent } from '../types'

const article: ArticleContent = {
  lead: 'Phụ huynh gửi con đến lớp học thêm luôn muốn biết con học thế nào. Nếu trung tâm không chủ động báo, phụ huynh sẽ hỏi, và tin nhắn Zalo cứ thế dồn về giáo viên mỗi tối. Một bản báo cáo học tập hằng tuần, đều đặn và đủ ý, giải quyết cả hai việc: phụ huynh yên tâm, giáo viên bớt tin nhắn. Bài này gợi ý nên báo gì, báo khi nào và viết nhận xét thế nào.',
  body: [
    { h2: 'Vì sao nên báo cáo hằng tuần' },
    {
      p: 'Một tuần đủ dài để có điều đáng nói, và đủ ngắn để phụ huynh kịp nhắc con trước khi vấn đề lớn dần. Đợi đến buổi họp phụ huynh hay cuối khoá mới báo thì thường đã muộn: con đã nghỉ nhiều buổi, nợ nhiều bài.',
    },
    {
      p: 'Báo cáo đều đặn còn tạo thói quen. Khi phụ huynh biết thứ Bảy nào cũng có báo cáo, họ sẽ chờ báo cáo thay vì nhắn hỏi lẻ tẻ trong tuần.',
    },
    { h2: 'Báo cáo tuần nên có những gì' },
    {
      ul: [
        'Chuyên cần: số buổi đi học trong tuần, buổi nào vắng, có báo trước không.',
        'Bài tập về nhà: số bài được giao, số bài đã nộp, bài nào nộp trễ hoặc chưa nộp.',
        'Điểm: điểm các bài kiểm tra trong tuần, so với tuần trước nếu có.',
        'Nhận xét của giáo viên: hai ba câu ngắn, cụ thể.',
        'Việc tuần tới: lịch kiểm tra, bài cần ôn, điều phụ huynh có thể giúp con.',
      ],
    },
    {
      note: 'Giữ cùng một bố cục mỗi tuần. Phụ huynh quen bố cục thì đọc rất nhanh và dễ thấy điều bất thường.',
    },
    { h2: 'Tần suất: báo gì ngay, báo gì cuối tuần' },
    {
      p: 'Không phải thông tin nào cũng nên dồn vào báo cáo tuần. Có việc cần báo ngay, có việc để cuối tuần tổng hợp:',
    },
    {
      table: {
        caption: 'Gợi ý tần suất báo tin cho phụ huynh',
        head: ['Loại tin', 'Khi nào báo', 'Ví dụ'],
        rows: [
          ['Con vắng học', 'Ngay trong buổi học', 'Con chưa đến lớp, phụ huynh chưa báo nghỉ'],
          [
            'Tóm tắt trong ngày',
            'Buổi tối (nếu trung tâm làm được)',
            'Hôm nay con học gì, có bài gì cần làm',
          ],
          [
            'Báo cáo học tập',
            'Mỗi tuần một lần, cùng một ngày',
            'Chuyên cần, bài tập, điểm, nhận xét',
          ],
          [
            'Trao đổi sâu',
            'Mỗi tháng hoặc mỗi khoá',
            'Gọi điện hay gặp trực tiếp về tiến bộ của con',
          ],
        ],
      },
    },
    { h2: 'Mẫu báo cáo tuần để tham khảo' },
    {
      p: 'Dưới đây là một mẫu ngắn, thầy cô có thể chép lại và điền cho từng học sinh (tên và số liệu chỉ để minh hoạ):',
    },
    {
      ol: [
        'Học sinh: Minh – Lớp Toán 7A – Tuần 3 tháng 10.',
        'Chuyên cần: đi học 2/2 buổi.',
        'Bài tập về nhà: nộp 3/4 bài, còn thiếu bài luyện tập hình học.',
        'Điểm kiểm tra 15 phút: 8 điểm, tiến bộ so với tuần trước.',
        'Nhận xét: Minh làm bài tính toán cẩn thận hơn. Phần hình học con còn vẽ hình vội, dễ sai.',
        'Tuần tới: kiểm tra chương 2 vào thứ Năm. Phụ huynh nhắc con hoàn thành bài hình còn thiếu trước thứ Ba.',
      ],
    },
    { h2: 'Cách viết nhận xét phụ huynh muốn đọc' },
    {
      ul: [
        'Cụ thể, tránh câu chung chung như “con học tốt” hay “con cần cố gắng hơn”.',
        'Bắt đầu bằng một điều con làm tốt, kể cả việc nhỏ.',
        'Chỉ nêu một hoặc hai việc cần cải thiện, đừng liệt kê hết khuyết điểm.',
        'Gợi ý điều phụ huynh có thể làm ở nhà: nhắc con làm bài, kiểm tra vở, khen con.',
        'Giữ giọng tôn trọng, thân thiện. Phụ huynh sẽ đọc to báo cáo cho con nghe.',
      ],
    },
    { h2: 'Cách giảm tin nhắn Zalo cho giáo viên' },
    {
      p: 'Báo cáo tuần là bước đầu. Để giáo viên thật sự bớt tin nhắn, trung tâm cần thống nhất vài quy tắc với phụ huynh ngay từ khi ghi danh:',
    },
    {
      ol: [
        'Thông tin cố định đặt ở một chỗ: lịch học, quy định học phí, cách xin nghỉ. Phụ huynh hỏi thì gửi lại đúng chỗ đó.',
        'Nhóm Zalo lớp chỉ dùng cho thông báo chung, tránh trao đổi riêng về từng em trong nhóm.',
        'Có một cách xin nghỉ rõ ràng, thay vì mỗi phụ huynh nhắn một kiểu, một giờ khác nhau.',
        'Báo trước khung giờ giáo viên trả lời tin nhắn, ví dụ trong giờ hành chính.',
        'Những tin lặp lại đều đặn như báo vắng, nhắc bài, báo cáo tuần thì tự động hoá nếu có công cụ.',
      ],
    },
    { h2: 'Khi phụ huynh lo lắng hoặc không hài lòng' },
    {
      p: 'Báo cáo trung thực đôi khi sẽ khiến phụ huynh lo, ví dụ khi điểm con đi xuống. Hãy gọi điện thay vì nhắn tin cho những chuyện cần trao đổi sâu, lắng nghe trước khi giải thích, và cùng phụ huynh thống nhất một việc cụ thể cho tuần tới. Phụ huynh thường đánh giá cao trung tâm báo sớm, ngay cả khi tin không vui.',
    },
  ],
  outro: {
    title: 'Tiny Ant giúp gì cho việc báo cáo phụ huynh',
    text: 'Với Tiny Ant, phụ huynh có tài khoản riêng: nhận báo vắng tức thì, bản tóm tắt buổi tối lúc 19:30 và báo cáo học tập hằng tuần với ngày học, bài đã nộp, nộp trễ và điểm theo môn. Phụ huynh cũng tự báo con vắng, xem bài tập, hạn nộp, lịch học, học phí, nhắc con làm bài và gửi lời khen.',
    links: ['/bao-cao-phu-huynh', '/diem-danh-hoc-sinh'],
  },
}

export default article
