import type { FeatureContent } from '../types'

const page: FeatureContent = {
  path: '/bao-cao-phu-huynh',
  meta: {
    title: 'Báo cáo học tập cho phụ huynh, sổ liên lạc điện tử | Tiny Ant',
    description:
      'Sổ liên lạc điện tử cho lớp học thêm: phụ huynh nhận báo vắng tức thì, tóm tắt buổi tối, báo cáo học tập hằng tuần, xem bài tập, điểm và lịch học của con.',
  },
  crumb: 'Báo cáo phụ huynh',
  hero: {
    lesson: 'Phụ huynh',
    title: 'Báo cáo học tập cho phụ huynh, như sổ liên lạc điện tử',
    lead: 'Phụ huynh nào cũng muốn biết con học thế nào. Nhưng nếu thầy cô phải nhắn từng nhà sau mỗi buổi học thì không đủ thời gian. Tiny Ant gửi thông tin tới phụ huynh đúng lúc: báo vắng tức thì, tóm tắt buổi tối và báo cáo học tập mỗi tuần. Thầy cô dạy, Tiny Ant lo phần báo tin.',
    media: {
      kind: 'screen',
      name: 'app-parent-today',
      alt: 'Màn hình tổng quan dành cho phụ huynh trong app Tiny Ant',
    },
  },
  pains: {
    title: 'Báo tin cho phụ huynh bằng Zalo: quen nhưng mệt',
    items: [
      'Mỗi tối nhắn từng phụ huynh về bài tập, điểm số của con.',
      'Phụ huynh hỏi lại những điều đã nhắn trong nhóm lớp từ hôm trước.',
      'Đến buổi họp phụ huynh mới biết con nghỉ nhiều, nộp bài trễ.',
      'Bố mẹ bận, không biết con có bài gì, hạn nộp khi nào.',
    ],
  },
  sections: [
    {
      id: 'bao-vang-tom-tat',
      title: 'Báo vắng tức thì và tóm tắt buổi tối',
      text: [
        'Khi con vắng buổi học, phụ huynh nhận báo vắng tức thì. Mỗi tối, phụ huynh nhận bản tóm tắt qua thông báo đẩy lúc 19:30: hôm nay con học gì, có bài gì cần làm.',
        'Thông báo đến như một app trên điện thoại, nếu phụ huynh thêm Tiny Ant vào màn hình chính.',
      ],
      points: ['Báo vắng tức thì.', 'Tóm tắt buổi tối lúc 19:30.'],
    },
    {
      id: 'bao-cao-hang-tuan',
      title: 'Báo cáo học tập hằng tuần',
      text: [
        'Mỗi tuần, phụ huynh có báo cáo học tập của con: số ngày học, số bài đã được giao và đã nộp, bài nộp trễ, điểm theo từng môn.',
        'Nhìn một màn hình là biết tuần này con học đều hay chưa, môn nào đang tiến bộ, mà không cần nhắn hỏi thầy cô.',
      ],
      media: {
        kind: 'screen',
        name: 'app-parent-report',
        alt: 'Màn hình báo cáo tuần dành cho phụ huynh: ngày học, bài đã nộp, nộp trễ, điểm theo môn',
      },
    },
    {
      id: 'theo-doi-cua-con',
      title: 'Xem bài tập, hạn nộp, điểm và lịch học của con',
      text: [
        'Phụ huynh có tài khoản riêng. Trong đó có bài tập và hạn nộp của con, điểm số, lịch học, và tab Học phí để xem tình trạng đóng tiền.',
      ],
      points: ['Bài tập và hạn nộp.', 'Điểm và lịch học.', 'Tình trạng học phí của con.'],
    },
    {
      id: 'dong-hanh-cung-con',
      title: 'Nhắc con làm bài, gửi lời khen',
      text: [
        'Phụ huynh nhắc con làm bài ngay trong Tiny Ant. Khi con làm tốt, phụ huynh gửi lời khen, hiện thành banner động trên màn hình của con.',
        'Tiny Ant cũng gợi ý tài liệu mới theo khối của con, để phụ huynh biết con có thể ôn thêm gì.',
      ],
      media: { kind: 'illustration', name: 'tab-parent' },
    },
    {
      id: 'dung-chung-dien-thoai',
      title: 'Bố mẹ và con dùng chung một điện thoại',
      text: [
        'Nhiều nhà chỉ có một điện thoại cho con học. Phụ huynh và con dùng chung máy, chuyển tài khoản bằng mã PIN, mỗi người vẫn thấy đúng phần của mình.',
      ],
    },
  ],
  howTo: {
    title: 'Phụ huynh bắt đầu thế nào',
    steps: [
      {
        title: 'Mở Tiny Ant trên điện thoại',
        text: 'Đăng nhập tài khoản phụ huynh trên trình duyệt, không cần tải từ App Store hay CH Play.',
      },
      {
        title: 'Thêm vào màn hình chính',
        text: 'Thêm Tiny Ant vào màn hình chính để dùng như app và nhận thông báo.',
      },
      {
        title: 'Nhận tin về con',
        text: 'Báo vắng, tóm tắt 19:30 và báo cáo hằng tuần tự gửi tới.',
      },
      {
        title: 'Đồng hành cùng con',
        text: 'Nhắc con làm bài, gửi lời khen khi con làm tốt.',
      },
    ],
  },
  faq: {
    title: 'Hỏi đáp dành cho phụ huynh',
    items: [
      {
        q: 'Phụ huynh có cần cài app không?',
        a: 'Không cần tải từ App Store hay CH Play. Chỉ cần thêm Tiny Ant vào màn hình chính là dùng như app, có thông báo.',
      },
      {
        q: 'Bao giờ phụ huynh nhận bản tóm tắt?',
        a: 'Bản tóm tắt buổi tối được gửi lúc 19:30 qua thông báo đẩy. Báo cáo học tập được gửi mỗi tuần.',
      },
      {
        q: 'Con và bố mẹ dùng chung một điện thoại thì sao?',
        a: 'Hai người chuyển tài khoản bằng mã PIN, mỗi người thấy đúng phần của mình.',
      },
      {
        q: 'Phụ huynh có xem được học phí của con không?',
        a: 'Có. Phụ huynh có tab Học phí để xem tình trạng đóng tiền của con.',
      },
    ],
  },
  related: ['/diem-danh-hoc-sinh', '/quan-ly-hoc-phi'],
}

export default page
