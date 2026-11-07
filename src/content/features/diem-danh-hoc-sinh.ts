import type { FeatureContent } from '../types'

const page: FeatureContent = {
  path: '/diem-danh-hoc-sinh',
  meta: {
    title: 'App điểm danh học sinh cho lớp học thêm | Tiny Ant',
    description:
      'Điểm danh lớp học thêm trên điện thoại: phụ huynh nhận báo vắng tức thì và tự báo con nghỉ, có buổi học bù, phiếu đăng nhập mã QR. Dùng thử miễn phí.',
  },
  crumb: 'Điểm danh học sinh',
  hero: {
    lesson: 'Điểm danh',
    title: 'App điểm danh học sinh cho lớp học thêm',
    lead: 'Đầu buổi học, thầy cô gọi tên từng em, đánh dấu vào sổ. Em nào vắng thì nhắn phụ huynh. Cuối tháng lại ngồi cộng xem mỗi em đi được bao nhiêu buổi. Với Tiny Ant, điểm danh chỉ cần vài lần chạm trên điện thoại, phụ huynh nhận báo vắng ngay lập tức.',
    media: { kind: 'illustration', name: 'tab-school' },
  },
  pains: {
    title: 'Điểm danh bằng sổ: quen nhưng mệt',
    items: [
      'Sổ điểm danh giấy dễ thất lạc, khó tra lại.',
      'Học sinh vắng phải gọi hoặc nhắn từng phụ huynh.',
      'Phụ huynh xin nghỉ cho con qua Zalo, tin nhắn trôi mất.',
      'Cuối tháng cộng tay số buổi học, dễ sai.',
    ],
  },
  sections: [
    {
      id: 'lop-va-buoi-hoc',
      title: 'Lớp, thời khoá biểu và buổi học rõ ràng',
      text: [
        'Mỗi lớp có thời khoá biểu và danh sách buổi học. Mở điện thoại là biết hôm nay có buổi nào, lớp nào.',
        'Một lớp có thể có nhiều giáo viên. Mỗi giáo viên, kể cả giáo viên part-time, có tài khoản riêng, không phải dùng chung mật khẩu.',
      ],
      points: [
        'Thời khoá biểu và buổi học cho từng lớp.',
        'Lớp có nhiều giáo viên, mỗi người tài khoản riêng.',
      ],
    },
    {
      id: 'diem-danh-nhanh',
      title: 'Điểm danh nhanh ngay trong buổi học',
      text: [
        'Mở buổi học trên điện thoại, chạm để điểm danh từng em. Không cần sổ, không cần nhớ để ghi lại sau giờ học.',
        'Cuối buổi, giáo viên nhận xét nhanh cho cả lớp. Phụ huynh xem được nhận xét, thầy cô không phải nhắn riêng từng nhà.',
      ],
      points: ['Điểm danh vài lần chạm.', 'Nhận xét nhanh cả lớp sau buổi học.'],
      media: { kind: 'todo', label: '[[TODO: ảnh chụp màn hình điểm danh buổi học]]' },
    },
    {
      id: 'bao-vang',
      title: 'Báo vắng tức thì, phụ huynh cũng tự báo con nghỉ',
      text: [
        'Khi con vắng buổi học, phụ huynh nhận báo vắng tức thì. Không còn chuyện tới cuối tháng mới biết con nghỉ mấy buổi.',
        'Ngược lại, khi con ốm hay có việc bận, phụ huynh chủ động báo con vắng ngay trong Tiny Ant thay vì nhắn Zalo cho thầy cô. Thông tin nằm đúng chỗ, không trôi mất giữa các tin nhắn khác.',
      ],
      points: ['Phụ huynh nhận báo vắng tức thì.', 'Phụ huynh chủ động báo con vắng.'],
      media: { kind: 'illustration', name: 'problem-parent' },
    },
    {
      id: 'hoc-bu',
      title: 'Buổi học bù cho em nghỉ',
      text: [
        'Em nào nghỉ, trung tâm tạo buổi học bù cho em đó. Buổi học bù được theo dõi ngay trong Tiny Ant, không phải ghi nhớ hay ghi chú riêng.',
      ],
    },
    {
      id: 'tai-khoan-qr',
      title: 'Tạo tài khoản hàng loạt, phiếu đăng nhập bằng mã QR',
      text: [
        'Trung tâm nhập danh sách học viên, Tiny Ant tạo tài khoản hàng loạt cho cả lớp. Sau đó in phiếu đăng nhập có mã QR phát cho từng em.',
        'Học sinh nhỏ tuổi đăng nhập bằng mã QR trên phiếu, đỡ lúng túng ở buổi học đầu tiên.',
      ],
    },
  ],
  howTo: {
    title: 'Bắt đầu điểm danh với Tiny Ant',
    steps: [
      {
        title: 'Nhập danh sách học viên',
        text: 'Tạo tài khoản hàng loạt, in phiếu đăng nhập mã QR.',
      },
      {
        title: 'Tạo lớp và thời khoá biểu',
        text: 'Thêm giáo viên vào lớp, đặt lịch các buổi học.',
      },
      { title: 'Điểm danh mỗi buổi', text: 'Chạm để điểm danh, phụ huynh nhận báo vắng tức thì.' },
      {
        title: 'Xếp buổi học bù',
        text: 'Tạo buổi học bù cho em nghỉ, theo dõi ngay trong Tiny Ant.',
      },
    ],
  },
  faq: {
    title: 'Hỏi đáp về điểm danh',
    items: [
      {
        q: 'Phụ huynh có biết ngay khi con vắng không?',
        a: 'Có. Phụ huynh nhận báo vắng tức thì khi con vắng buổi học.',
      },
      {
        q: 'Phụ huynh muốn xin nghỉ cho con thì làm thế nào?',
        a: 'Phụ huynh chủ động báo con vắng ngay trong Tiny Ant, không cần nhắn Zalo cho thầy cô.',
      },
      {
        q: 'Lớp có nhiều giáo viên thì sao?',
        a: 'Một lớp có thể có nhiều giáo viên, mỗi người có tài khoản riêng.',
      },
      {
        q: 'Học sinh nhỏ tuổi đăng nhập có khó không?',
        a: 'Không khó. Trung tâm in phiếu đăng nhập có mã QR cho từng em.',
      },
    ],
  },
  related: ['/bao-cao-phu-huynh', '/giao-bai-tap-online'],
}

export default page
