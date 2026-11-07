import type { ArticleContent } from '../types'

const article: ArticleContent = {
  lead: 'Với trung tâm học thêm vừa và nhỏ, học phí là nguồn sống. Nhưng cũng chính học phí lại là việc nhiều chủ trung tâm ngại nhất: nhắc thì sợ mất lòng, không nhắc thì thiếu tiền, cuối tháng lại ngồi dò sổ và sao kê đến khuya. Bài này chia sẻ một quy trình đơn giản để theo dõi, nhắc và đối soát học phí, dùng được ngay với sổ tay hay Excel, và cách nhận biết khi nào nên chuyển sang phần mềm.',
  body: [
    { h2: 'Vì sao học phí hay “rối” ở trung tâm nhỏ' },
    {
      p: 'Ở trung tâm nhỏ, một người thường làm nhiều việc: vừa dạy, vừa tuyển sinh, vừa thu tiền. Học phí được ghi ở nhiều nơi: sổ tay, file Excel, tin nhắn Zalo, ghi chú trên điện thoại. Khi phụ huynh hỏi “con đã đóng tháng này chưa?”, chủ trung tâm phải tìm ở ba bốn chỗ mới trả lời được.',
    },
    {
      p: 'Rối thường không đến từ số tiền lớn, mà từ những trường hợp lẻ: em học muộn nửa tháng, hai anh em cùng học được giảm, em nghỉ ốm cả tuần, phụ huynh chuyển khoản gộp hai tháng. Mỗi trường hợp lẻ được nhớ trong đầu thay vì ghi lại, nên cuối tháng rất dễ sót.',
    },
    { h2: 'Bước 1: Thống nhất một cách tính học phí' },
    {
      p: 'Trước khi nghĩ đến công cụ, hãy viết ra cách tính học phí của trung tâm thành vài dòng rõ ràng. Phụ huynh nào hỏi cũng nhận được cùng một câu trả lời.',
    },
    {
      ul: [
        'Tính theo tháng, theo khoá hay theo buổi? Với lớp học thêm học đều mỗi tuần, tính theo tháng thường dễ theo dõi nhất.',
        'Một mức chung cho cả trung tâm, và những lớp nào có mức riêng (lớp ôn thi, lớp kèm nhóm nhỏ).',
        'Học sinh vào giữa tháng thì tính thế nào.',
        'Nghỉ học có được trừ tiền hay được học bù.',
        'Có giảm học phí cho anh chị em cùng học không, giảm bao nhiêu.',
        'Hạn đóng học phí là ngày nào trong tháng.',
      ],
    },
    {
      note: 'Gửi bản quy định này cho phụ huynh ngay khi con ghi danh. Khi có thắc mắc, thầy cô chỉ cần gửi lại đúng đoạn đó, không phải giải thích lại từ đầu.',
    },
    { h2: 'Bước 2: Chỉ giữ một bảng theo dõi duy nhất' },
    {
      p: 'Dù dùng sổ, Excel hay phần mềm, nguyên tắc quan trọng nhất là chỉ có một nơi ghi học phí. Nếu dùng Excel, mỗi dòng là một học sinh trong một tháng, với các cột:',
    },
    {
      ul: [
        'Học sinh và lớp.',
        'Tháng.',
        'Số tiền phải đóng (đã tính giảm trừ nếu có).',
        'Số tiền đã đóng và ngày đóng.',
        'Hình thức: tiền mặt hay chuyển khoản.',
        'Ghi chú: các trường hợp lẻ, ví dụ “đóng gộp tháng 9 và 10”.',
      ],
    },
    {
      p: 'Thêm một cột “Còn thiếu” bằng công thức trừ đơn giản. Lọc theo cột này là có ngay danh sách cần nhắc. Đừng tách mỗi lớp một file: khi trung tâm có thêm lớp, việc tổng hợp sẽ rất mất công.',
    },
    { h2: 'Bước 3: Nhắc học phí khéo léo, đúng lúc' },
    {
      p: 'Phần lớn phụ huynh không cố tình đóng muộn, họ chỉ quên. Một lời nhắc đúng lúc, đúng giọng sẽ giải quyết hầu hết trường hợp mà không làm ai khó chịu.',
    },
    {
      ol: [
        'Báo trước lịch đóng học phí ngay đầu tháng, gửi chung cho cả lớp.',
        'Nhắc lần một vài ngày trước hạn, giọng thông báo, không trách móc.',
        'Đến hạn mà chưa đóng thì nhắn riêng, ngắn gọn, ghi rõ số tiền và cách chuyển khoản.',
        'Quá hạn một tuần thì gọi điện hoặc nói chuyện trực tiếp khi phụ huynh đưa đón con. Có thể gia đình đang có khó khăn và cần được linh động.',
      ],
    },
    {
      p: 'Mẫu tin nhắn tham khảo: “Chào chị Lan, trung tâm gửi chị học phí tháng 10 của bé Minh lớp Toán 7A là 800.000 đồng. Chị chuyển khoản giúp trung tâm với nội dung: Minh 7A T10. Cảm ơn chị đã đồng hành cùng con!” (số tiền trong mẫu chỉ để minh hoạ). Câu ngắn, có đủ thông tin, phụ huynh không phải hỏi lại.',
    },
    { h2: 'Bước 4: Đối soát chuyển khoản mỗi tuần' },
    {
      p: 'Khi phần lớn phụ huynh chuyển khoản, việc khó nhất là biết khoản tiền nào của ai. Một vài thói quen nhỏ giúp đối soát nhẹ hơn rất nhiều:',
    },
    {
      ol: [
        'Đề nghị một mẫu nội dung chuyển khoản cố định, ví dụ: Tên con – Lớp – Tháng.',
        'Tải sao kê ngân hàng mỗi tuần một lần, đừng dồn đến cuối tháng.',
        'Khớp từng khoản tiền vào bảng theo dõi, đánh dấu ngay những dòng đã khớp.',
        'Khoản nào không rõ của ai thì ghi lại và hỏi phụ huynh ngay trong tuần, khi họ còn nhớ.',
        'Cuối tháng chỉ còn việc kiểm tra lại cột “Còn thiếu” và chốt sổ.',
      ],
    },
    { h2: 'Bước 5: Biên lai và sự minh bạch' },
    {
      p: 'Gửi biên lai hoặc xác nhận cho mỗi lần thu tiền, kể cả tiền mặt. Biên lai giúp phụ huynh yên tâm, và giúp trung tâm tránh tranh cãi khi có nhầm lẫn. Nếu phụ huynh tự xem được tình trạng học phí của con bất cứ lúc nào, số tin nhắn hỏi “đã đóng chưa” sẽ giảm hẳn.',
    },
    { h2: 'Excel hay phần mềm quản lý học phí?' },
    {
      table: {
        caption: 'So sánh quản lý học phí bằng Excel và bằng phần mềm',
        head: ['Tiêu chí', 'Excel', 'Phần mềm quản lý học phí'],
        rows: [
          ['Chi phí', 'Gần như miễn phí', 'Có phí theo gói'],
          [
            'Bắt đầu',
            'Tự thiết kế bảng, tự viết công thức',
            'Có sẵn, chỉ cần nhập học sinh và mức học phí',
          ],
          ['Nhắc học phí', 'Tự lọc danh sách rồi nhắn tay', 'Có thể nhắc tự động'],
          ['Đối soát chuyển khoản', 'Dò sao kê bằng mắt', 'Có công cụ đối soát (tuỳ phần mềm)'],
          ['Phụ huynh tự xem', 'Không, phải nhắn hỏi', 'Có, nếu phần mềm có tài khoản phụ huynh'],
          ['Khi trung tâm lớn lên', 'File nặng, dễ sai công thức', 'Không phải đổi cách làm'],
        ],
      },
    },
    {
      p: 'Excel hợp với lớp nhỏ, một người quản lý, phần lớn phụ huynh đóng tiền mặt. Khi trung tâm có nhiều lớp, nhiều giáo viên, phần lớn phụ huynh chuyển khoản và thầy cô bắt đầu mất vài buổi tối mỗi tháng chỉ để dò sổ, đó là lúc nên cân nhắc phần mềm.',
    },
    { h2: 'Những lỗi hay gặp' },
    {
      ul: [
        'Ghi học phí ở nhiều nơi, mỗi giáo viên giữ một bản.',
        'Nhớ các trường hợp lẻ trong đầu thay vì ghi chú.',
        'Dồn đối soát đến cuối tháng.',
        'Chỉ nhắc khi đã quá hạn lâu, khiến cuộc nói chuyện trở nên nặng nề.',
        'Không có biên lai, đến khi nhầm lẫn thì không có gì để đối chiếu.',
      ],
    },
  ],
  outro: {
    title: 'Tiny Ant giúp gì cho việc thu học phí',
    text: 'Tiny Ant là phần mềm quản lý trung tâm học thêm. Phần học phí có học phí theo tháng (một mức chung, sửa riêng từng lớp), biên lai thu tiền, tự động nhắc học phí, đối soát sao kê chuyển khoản với học phí, và tab Học phí để phụ huynh tự xem tình trạng đóng tiền của con.',
    links: ['/quan-ly-hoc-phi', '/bao-cao-phu-huynh'],
  },
}

export default article
