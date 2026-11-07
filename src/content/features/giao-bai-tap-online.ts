import type { FeatureContent } from '../types'

const page: FeatureContent = {
  path: '/giao-bai-tap-online',
  meta: {
    title: 'Giao bài tập online, bài kiểm tra tự chấm | Tiny Ant',
    description:
      'Giao bài tập online có hạn nộp, biết em nào chưa nộp, bài kiểm tra có giờ tự chấm, thư viện bài dùng chung và ghi âm buổi học cho học sinh nghe lại.',
  },
  crumb: 'Giao bài tập online',
  hero: {
    lesson: 'Bài tập & kiểm tra',
    title: 'Giao bài tập online và bài kiểm tra tự chấm',
    lead: 'Chụp đề gửi Zalo, học sinh chụp bài làm gửi lại, thầy cô ngồi phóng to từng ảnh để chấm. Em nào chưa nộp lại phải dò cả nhóm. Với Tiny Ant, thầy cô giao bài một lần, biết ngay ai chưa nộp, bài kiểm tra được chấm tự động.',
    media: { kind: 'illustration', name: 'problem-teacher' },
  },
  pains: {
    title: 'Giao bài qua Zalo: quen nhưng mệt',
    items: [
      'Đề và bài làm lẫn trong hàng trăm tin nhắn nhóm lớp.',
      'Không biết em nào chưa nộp nếu không dò từng em.',
      'Chấm tay bài trắc nghiệm mất cả buổi tối.',
      'Tài liệu soạn rồi nằm rải rác trong máy, khó tìm lại để dùng.',
    ],
  },
  sections: [
    {
      id: 'giao-bai',
      title: 'Giao bài tập có hạn nộp, biết ngay ai chưa nộp',
      text: [
        'Thầy cô giao bài tập cho cả lớp, đặt hạn nộp rõ ràng. Học sinh thấy bài cần làm ngay trên điện thoại hoặc máy tính.',
        'Đến gần hạn, thầy cô xem danh sách em nào chưa nộp và nhắc học sinh làm bài. Không phải dò từng tập vở hay lướt lại tin nhắn.',
      ],
      points: ['Bài tập có hạn nộp.', 'Xem ai chưa nộp.', 'Giáo viên nhắc học sinh làm bài.'],
    },
    {
      id: 'bai-kiem-tra-tu-cham',
      title: 'Bài kiểm tra có giờ, tự chấm',
      text: [
        'Bài kiểm tra có đồng hồ tính giờ và được chấm tự động với các dạng câu trắc nghiệm, đúng/sai và tự luận ngắn.',
        'Với bài đọc hiểu, đoạn văn dùng chung được giữ nguyên trên màn hình trong lúc học sinh làm các câu hỏi, không phải cuộn lên cuộn xuống.',
      ],
      points: [
        'Trắc nghiệm, đúng/sai, tự luận ngắn: chấm tự động.',
        'Đoạn văn dùng chung giữ nguyên trên màn hình khi làm bài.',
      ],
      media: { kind: 'todo', label: '[[TODO: ảnh chụp màn hình bài kiểm tra có đồng hồ]]' },
    },
    {
      id: 'xem-lai-lam-lai',
      title: 'Xem lại từng lần làm, giáo viên quyết định cho làm lại',
      text: [
        'Học sinh xem lại từng lần làm bài của mình để biết sai ở đâu. Giáo viên bật hoặc tắt việc cho làm lại, và bật hoặc tắt việc cho xem đáp án, tuỳ mục đích của bài.',
      ],
    },
    {
      id: 'thu-vien-bai',
      title: 'Thư viện bài dùng chung',
      text: [
        'Thư viện có sẵn bài học, bài tập và đề kiểm tra theo từng môn, từng khối. Thầy cô sửa lại cho hợp với lớp mình rồi giao ngay.',
        'Tài liệu sẵn có trên Google Drive được đính kèm vào bài, không phải tải lên lại.',
      ],
      points: [
        'Bài học, bài tập, đề kiểm tra theo môn và khối.',
        'Sửa được cho hợp với lớp.',
        'Đính kèm file Google Drive.',
      ],
      media: { kind: 'illustration', name: 'library-books' },
    },
    {
      id: 'nhan-xet-ghi-am',
      title: 'Nhận xét nhanh và ghi âm cả buổi học',
      text: [
        'Sau buổi học, giáo viên nhận xét nhanh cho cả lớp. Buổi học được ghi âm cả buổi để học sinh trong lớp nghe lại khi ôn bài, hoặc khi lỡ một đoạn chưa hiểu.',
      ],
    },
  ],
  howTo: {
    title: 'Giao và chấm bài với Tiny Ant',
    steps: [
      { title: 'Chọn hoặc soạn bài', text: 'Lấy bài từ thư viện và sửa lại, hoặc soạn bài mới.' },
      { title: 'Giao cho lớp', text: 'Giao bài cho cả lớp, đặt hạn nộp.' },
      { title: 'Theo dõi và nhắc', text: 'Xem em nào chưa nộp, nhắc học sinh làm bài.' },
      {
        title: 'Xem kết quả',
        text: 'Bài kiểm tra được chấm tự động; bật làm lại hoặc cho xem đáp án nếu muốn.',
      },
    ],
  },
  faq: {
    title: 'Hỏi đáp về bài tập và kiểm tra',
    items: [
      {
        q: 'Bài kiểm tra tự chấm được những dạng câu nào?',
        a: 'Trắc nghiệm, đúng/sai và tự luận ngắn.',
      },
      {
        q: 'Học sinh có được làm lại bài không?',
        a: 'Tuỳ giáo viên. Giáo viên bật hoặc tắt việc cho làm lại và cho xem đáp án.',
      },
      {
        q: 'Tài liệu có sẵn trên Google Drive thì sao?',
        a: 'Bài trong thư viện đính kèm được file Google Drive.',
      },
      {
        q: 'Học sinh lỡ một đoạn bài giảng thì nghe lại được không?',
        a: 'Được. Buổi học được ghi âm cả buổi để học sinh trong lớp nghe lại.',
      },
    ],
  },
  related: ['/diem-danh-hoc-sinh', '/hoc-sinh'],
}

export default page
