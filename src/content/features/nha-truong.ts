import type { FeatureContent } from '../types'

const page: FeatureContent = {
  path: '/nha-truong',
  meta: {
    title: 'Phần mềm giao bài, chấm bài cho giáo viên trường | Tiny Ant',
    description:
      'Giáo viên trường dùng Tiny Ant để giao bài tập online, biết em nào chưa nộp, cho làm bài kiểm tra có giờ tự chấm, dùng thư viện bài theo môn và khối.',
  },
  crumb: 'Dành cho nhà trường',
  hero: {
    lesson: 'Nhà trường',
    title: 'Phần mềm giao bài, chấm bài cho giáo viên trường',
    lead: 'Một giáo viên trường dạy nhiều lớp, mỗi lớp vài chục em. Soạn, giao, thu và chấm bài chiếm rất nhiều giờ, mà vẫn khó biết em nào chưa làm. Tiny Ant giúp giáo viên giao bài một lần cho cả lớp, biết ngay ai chưa nộp, và để bài kiểm tra tự chấm.',
    media: { kind: 'illustration', name: 'hero-school' },
  },
  pains: {
    title: 'Giao bài cho nhiều lớp: quen nhưng mệt',
    items: [
      'Mất nhiều giờ soạn, giao, thu và chấm bài cho từng lớp.',
      'Khó biết em nào chưa làm nếu không dò từng tập vở.',
      'Học sinh ngại làm bài trên giấy.',
    ],
  },
  sections: [
    {
      id: 'giao-bai-mot-lan',
      title: 'Giao bài một lần, cả lớp nhận trên điện thoại hoặc máy tính',
      text: [
        'Giáo viên giao bài tập có hạn nộp cho cả lớp. Học sinh nhận bài ngay trên điện thoại hoặc máy tính, ở nhà hay ở trường đều làm được.',
        'Tạo tài khoản cho cả lớp cũng nhanh: Tiny Ant tạo tài khoản học sinh hàng loạt và in phiếu đăng nhập có mã QR.',
      ],
    },
    {
      id: 'ai-chua-nop',
      title: 'Biết ngay em nào chưa nộp',
      text: [
        'Không phải dò từng tập vở. Giáo viên xem danh sách em nào chưa nộp và nhắc học sinh làm bài.',
      ],
    },
    {
      id: 'kiem-tra-tu-cham',
      title: 'Bài kiểm tra có giờ, chấm tự động',
      text: [
        'Bài kiểm tra có đồng hồ tính giờ, chấm tự động với câu trắc nghiệm, đúng/sai và tự luận ngắn. Đoạn văn dùng chung được giữ nguyên trên màn hình khi học sinh làm bài đọc hiểu.',
        'Học sinh xem lại từng lần làm. Giáo viên bật hoặc tắt việc cho làm lại và cho xem đáp án.',
      ],
      points: [
        'Trắc nghiệm, đúng/sai, tự luận ngắn.',
        'Đoạn văn dùng chung giữ nguyên trên màn hình.',
        'Giáo viên bật/tắt làm lại và xem đáp án.',
      ],
      media: { kind: 'illustration', name: 'problem-teacher' },
    },
    {
      id: 'thu-vien-bai',
      title: 'Thư viện bài dùng chung theo môn và khối',
      text: [
        'Thư viện có bài học, bài tập và đề kiểm tra theo từng môn, từng khối. Giáo viên sửa lại cho hợp với lớp mình, đính kèm file Google Drive khi cần.',
      ],
      media: { kind: 'illustration', name: 'library-books' },
    },
  ],
  howTo: {
    title: 'Bắt đầu với một lớp',
    steps: [
      {
        title: 'Tạo tài khoản cho lớp',
        text: 'Tạo tài khoản hàng loạt, in phiếu đăng nhập mã QR.',
      },
      { title: 'Giao bài', text: 'Chọn bài từ thư viện hoặc soạn mới, đặt hạn nộp.' },
      { title: 'Theo dõi', text: 'Xem em nào chưa nộp, nhắc học sinh làm bài.' },
      { title: 'Xem kết quả', text: 'Bài kiểm tra được chấm tự động.' },
    ],
  },
  faq: {
    title: 'Hỏi đáp dành cho giáo viên trường',
    items: [
      {
        q: 'Học sinh làm bài trên thiết bị nào?',
        a: 'Trên trình duyệt của điện thoại hoặc máy tính, không cần tải từ App Store hay CH Play.',
      },
      {
        q: 'Bài kiểm tra chấm tự động được những dạng câu nào?',
        a: 'Trắc nghiệm, đúng/sai và tự luận ngắn.',
      },
      {
        q: 'Tạo tài khoản cho cả lớp có mất công không?',
        a: 'Không. Tiny Ant tạo tài khoản học sinh hàng loạt và in phiếu đăng nhập có mã QR.',
      },
    ],
  },
  related: ['/giao-bai-tap-online', '/hoc-sinh'],
}

export default page
