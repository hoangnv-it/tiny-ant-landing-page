// Mọi chữ hiển thị trên trang nằm ở đây. Không viết chữ cứng trong component.

export const contact = {
  phone: '0906490974',
  phoneDisplay: '0906 490 974',
  email: 'contact@tinyant.app',
  responseTime: 'Chúng tôi phản hồi đăng ký dùng thử trong 1 ngày làm việc.',
  // Zalo theo số điện thoại liên hệ
  zaloUrl: 'https://zalo.me/0906490974',
  zaloCta: 'Nhắn Zalo',
  newTab: '(mở trong tab mới)',
}

export const site = {
  name: 'Tiny Ant',
  homeLabel: 'Tiny Ant – về trang chủ',
  // Domain chính thức: canonical, Open Graph, sitemap, JSON-LD
  url: 'https://tinyant.app',
  ogImageAlt: 'Tiny Ant – phần mềm quản lý lớp học thêm: điểm danh, giao bài, báo phụ huynh',
  description:
    'Phần mềm quản lý lớp học thêm và quản lý trung tâm: điểm danh, giao bài, báo phụ huynh, theo dõi học phí.',
}

// Mục tiêu của nút "Đăng ký dùng thử": pop-up đăng ký
export const demoAnchor = '/#dang-ky'
// Mở pop-up Chính sách bảo mật (PrivacyModal)
export const privacyAnchor = '#chinh-sach-bao-mat'

// Các trang con: dùng cho menu, footer, link "liên quan". Nội dung từng trang: src/content/features/*.ts
export const featurePages = [
  {
    href: '/quan-ly-hoc-phi',
    label: 'Quản lý học phí',
    desc: 'Học phí theo tháng, biên lai, tự động nhắc, đối soát chuyển khoản.',
  },
  {
    href: '/kiem-tra-dau-vao',
    label: 'Kiểm tra đầu vào',
    desc: 'Link thi thử xếp lớp tự chấm, hẹn học thử, phễu tuyển sinh.',
  },
  {
    href: '/diem-danh-hoc-sinh',
    label: 'Điểm danh học sinh',
    desc: 'Điểm danh nhanh, báo vắng tức thì, buổi học bù, phiếu mã QR.',
  },
  {
    href: '/giao-bai-tap-online',
    label: 'Giao bài tập online',
    desc: 'Bài tập có hạn nộp, bài kiểm tra tự chấm, thư viện bài.',
  },
  {
    href: '/bao-cao-phu-huynh',
    label: 'Báo cáo phụ huynh',
    desc: 'Báo vắng, tóm tắt buổi tối, báo cáo học tập hằng tuần.',
  },
] as const
export const audiencePages = [
  {
    href: '/hoc-sinh',
    label: 'Dành cho học sinh',
    desc: 'Màn hình Hôm nay, nhiệm vụ 5 phút, game từ vựng, huy hiệu.',
  },
  {
    href: '/nha-truong',
    label: 'Dành cho nhà trường',
    desc: 'Giao bài, chấm bài tự động cho giáo viên trường.',
  },
] as const
export const pageLinks: readonly { href: string; label: string; desc: string }[] = [
  ...featurePages,
  ...audiencePages,
]
export const pricingPath = '/bang-gia'
export const privacyPath = '/chinh-sach-bao-mat'
export const guidesPath = '/huong-dan'

// Chữ dùng chung của các trang con
export const subpage = {
  breadcrumbLabel: 'Bạn đang ở',
  home: 'Trang chủ',
  painsLesson: 'Có quen không?',
  howToLesson: 'Cách dùng',
  relatedLesson: 'Xem thêm',
  relatedTitle: 'Tính năng liên quan',
  faqLesson: 'Câu hỏi thường gặp',
}

export const nav = {
  label: 'Điều hướng chính',
  links: [
    { href: '/#tuyen-sinh', label: 'Tuyển sinh' },
    { href: '/#hoc-phi', label: 'Học phí' },
    { href: '/#phu-huynh', label: 'Phụ huynh' },
    { href: '/#faq', label: 'Câu hỏi thường gặp' },
  ],
  demoCta: 'Đăng ký dùng thử miễn phí',
  // Chữ ngắn cho nút header trên màn hẹp (< 640px)
  demoCtaShort: 'Dùng thử miễn phí',
  menuOpen: 'Mở menu',
  menuClose: 'Đóng menu',
}

export const footer = {
  about:
    'Phần mềm quản lý lớp học thêm và trung tâm: điểm danh, giao bài, báo phụ huynh, theo dõi học phí.',
  label: 'Liên kết cuối trang',
  columns: [
    {
      title: 'Dành cho',
      links: [
        { href: '/#vong-doi', label: 'Trung tâm' },
        { href: '/#nha-truong', label: 'Nhà trường' },
        { href: '/#hoc-sinh', label: 'Học sinh' },
        { href: '/#phu-huynh', label: 'Phụ huynh' },
      ],
    },
    {
      title: 'Tìm hiểu',
      links: [
        { href: '/#bat-dau', label: 'Bắt đầu trong 3 bước' },
        { href: '/#bang-gia', label: 'Bảng giá' },
        { href: '/#faq', label: 'Câu hỏi thường gặp' },
        { href: privacyAnchor, label: 'Chính sách bảo mật' },
      ],
    },
  ],
  contactTitle: 'Liên hệ',
  phoneLabel: 'Điện thoại',
  emailLabel: 'Email',
  copyright: '© 2026 Tiny Ant. Bảo lưu mọi quyền.',
  backToTop: 'Lên đầu trang',
}

// [CẦN XÁC NHẬN: video giới thiệu]. Để trống thì nút "Xem cách hoạt động" bị ẩn
// (là hằng số riêng để khi trống, code hộp video bị loại khỏi bundle).
export const heroVideoUrl: string = ''

export const home = {
  meta: {
    // ~60 / 140–155 ký tự
    title: 'Phần mềm quản lý trung tâm, lớp học thêm vừa và nhỏ | Tiny Ant',
    description:
      'Tiny Ant là phần mềm quản lý trung tâm và lớp học thêm: thi thử xếp lớp, điểm danh, giao bài, thu và nhắc học phí, báo phụ huynh ngay trên điện thoại.',
  },
  hero: {
    // 3 dòng trên máy tính; dòng cuối màu đỏ
    titleLines: ['Quản lý trung tâm học thêm', 'trên điện thoại: tuyển sinh,'],
    titleAccent: 'điểm danh, học phí, báo phụ huynh.',
    lead: 'Tiny Ant là phần mềm quản lý dành cho trung tâm học thêm vừa và nhỏ. Thi thử xếp lớp, điểm danh, giao bài, thu và nhắc học phí, báo cáo cho phụ huynh: tất cả ở một chỗ.',
    primaryCta: 'Đăng ký dùng thử miễn phí',
    secondaryCta: 'Xem cách hoạt động',
    videoClose: 'Đóng video',
    note: 'Chạy trên trình duyệt. Thêm vào màn hình chính là dùng như app, không cần tải từ App Store hay CH Play.',
    attendanceAlt:
      'Màn hình Hôm nay của học sinh trong app Tiny Ant: nhiệm vụ hôm nay và bài cần làm trước',
    parentAlt: 'Màn hình tổng quan dành cho phụ huynh trong app Tiny Ant',
  },

  problems: {
    lesson: 'Vấn đề gặp phải',
    title: 'Có quen không?',
    items: [
      'Điểm danh bằng sổ giấy, cuối tháng ngồi cộng tay từng lớp.',
      'Danh sách học sinh, điểm và học phí nằm rải rác trong nhiều file Excel.',
      'Con vắng, có bài mới, sắp đến hạn nộp: lại nhắn Zalo từng phụ huynh.',
      'Đến kỳ học phí phải nhắc từng nhà. Ngại nhắc, mà không nhắc thì không được.',
      'Phụ huynh chuyển khoản, thầy cô dò sao kê từng dòng xem ai đã đóng.',
    ],
    conclusion: 'Tiny Ant gom tất cả vào một nơi. Xem vòng đời một học viên bên dưới.',
  },

  beforeAfter: {
    lesson: 'Trước và sau',
    title: 'Trước và sau khi dùng Tiny Ant',
    caption: 'So sánh công việc của trung tâm trước và sau khi dùng Tiny Ant',
    head: ['Việc', 'Trước đây', 'Với Tiny Ant'],
    rows: [
      [
        'Điểm danh',
        'Sổ giấy, cuối tháng cộng tay',
        'Điểm danh nhanh trên điện thoại ngay trong buổi học',
      ],
      [
        'Báo vắng',
        'Gọi hoặc nhắn từng phụ huynh',
        'Phụ huynh nhận báo vắng tức thì, và tự báo khi con nghỉ',
      ],
      [
        'Giao và thu bài',
        'Gửi ảnh qua Zalo, dò xem em nào chưa nộp',
        'Giao bài có hạn nộp, biết ngay ai chưa nộp, bài kiểm tra tự chấm',
      ],
      [
        'Thu và nhắc học phí',
        'Nhắn nhắc từng nhà, ghi tay vào sổ',
        'Có biên lai thu tiền, tự động nhắc học phí',
      ],
      [
        'Đối soát chuyển khoản',
        'Dò sao kê ngân hàng từng dòng',
        'Đối soát sao kê chuyển khoản với học phí',
      ],
      [
        'Báo cáo phụ huynh',
        'Đến buổi họp phụ huynh mới biết con học thế nào',
        'Tóm tắt mỗi tối và báo cáo học tập hằng tuần',
      ],
    ],
  },

  lifecycle: {
    lesson: 'Vòng đời một học viên',
    title: 'Vòng đời một học viên tại trung tâm',
    lead: 'Từ lúc phụ huynh hỏi thăm tới khi con học đều mỗi tuần, Tiny Ant đi cùng trung tâm ở từng bước.',
    highlight: 'Điểm khác biệt',
    blocks: [
      {
        id: 'tuyen-sinh',
        step: 'Bước 1 · Tuyển sinh',
        title: 'Tuyển sinh: thi thử xếp lớp, học thử, ghi danh',
        featured: true,
        points: [
          'Gửi phụ huynh link thi thử xếp lớp. Con làm bài online, không cần tài khoản, hết giờ tự nộp.',
          'Hệ thống tự chấm thang điểm 10, có điểm từng phần, xếp trình độ theo khung điểm trung tâm tự đặt.',
          'Hẹn học thử miễn phí vào một buổi học thật. Giáo viên chấm sao và nhận xét ngay trong buổi.',
          'Theo dõi phễu tuyển sinh: Quan tâm → Đã thi thử → Đã học thử → Ghi danh.',
        ],
        media: { kind: 'illustration', name: 'problem-student' },
        links: [{ href: '/kiem-tra-dau-vao', label: 'Xem chi tiết: kiểm tra đầu vào' }],
      },
      {
        id: 'van-hanh-lop',
        step: 'Bước 2 · Vận hành lớp',
        title: 'Vận hành lớp: điểm danh, giao bài, chấm bài',
        featured: false,
        points: [
          'Lớp có thời khoá biểu, buổi học và nhiều giáo viên. Điểm danh nhanh, có buổi học bù.',
          'Giao bài tập có hạn nộp, xem ai chưa nộp, giáo viên nhắc học sinh làm bài.',
          'Bài kiểm tra có giờ, tự chấm trắc nghiệm, đúng/sai và tự luận ngắn.',
          'Nhận xét nhanh cả lớp sau buổi học, ghi âm cả buổi cho học sinh nghe lại.',
        ],
        media: { kind: 'illustration', name: 'problem-teacher' },
        links: [
          { href: '/diem-danh-hoc-sinh', label: 'Xem chi tiết: điểm danh' },
          { href: '/giao-bai-tap-online', label: 'Xem chi tiết: giao bài tập' },
        ],
      },
      {
        id: 'hoc-phi',
        step: 'Bước 3 · Học phí',
        title: 'Học phí: thu, nhắc, đối soát chuyển khoản',
        featured: true,
        points: [
          'Học phí theo tháng: một mức chung cho cả trung tâm, sửa riêng được cho từng lớp.',
          'Có biên lai thu tiền và tự động nhắc học phí, thầy cô không phải nhắn từng nhà.',
          'Đối soát sao kê chuyển khoản ngân hàng với học phí, biết ngay ai đã đóng.',
          'Phụ huynh xem tình trạng đóng tiền của con trong tab Học phí.',
        ],
        media: { kind: 'illustration', name: 'problem-center' },
        links: [{ href: '/quan-ly-hoc-phi', label: 'Xem chi tiết: quản lý học phí' }],
      },
      {
        id: 'phu-huynh',
        step: 'Bước 4 · Phụ huynh',
        title: 'Phụ huynh: biết con học thế nào mà không cần hỏi',
        featured: false,
        points: [
          'Báo vắng tức thì, bản tóm tắt buổi tối và báo cáo học tập hằng tuần.',
          'Xem bài tập, hạn nộp, điểm và lịch học của con.',
          'Nhắc con làm bài, gửi lời khen hiện thành banner trên màn hình của con.',
          'Phụ huynh và con dùng chung một điện thoại, chuyển tài khoản bằng mã PIN.',
        ],
        media: {
          kind: 'screen',
          name: 'app-parent-report',
          alt: 'Màn hình báo cáo tuần dành cho phụ huynh: ngày học, bài đã nộp, nộp trễ, điểm theo môn',
        },
        links: [{ href: '/bao-cao-phu-huynh', label: 'Xem chi tiết: báo cáo phụ huynh' }],
      },
      {
        id: 'hoc-sinh',
        step: 'Bước 5 · Học sinh',
        title: 'Học sinh: có động lực học mỗi ngày',
        featured: false,
        points: [
          'Màn hình “Hôm nay” cho biết hôm nay cần làm gì, kèm nhiệm vụ 5 phút mỗi ngày.',
          'Chuỗi ngày học, huy hiệu, bảng xếp hạng cùng lớp và khen thưởng khi làm tốt.',
          'Luyện lại câu sai theo từng môn, ôn từ vựng 5 phút.',
          'Game từ vựng và thẻ phản xạ có phát âm.',
        ],
        media: {
          kind: 'screen',
          name: 'app-attendance',
          alt: 'Màn hình Hôm nay của học sinh trong app Tiny Ant: nhiệm vụ hôm nay và bài cần làm trước',
        },
        links: [{ href: '/hoc-sinh', label: 'Xem chi tiết: dành cho học sinh' }],
      },
      {
        id: 'chu-trung-tam',
        step: 'Bước 6 · Chủ trung tâm',
        title: 'Chủ trung tâm: nhìn toàn cảnh trên một màn hình',
        featured: false,
        points: [
          'Màn hình tổng quan trung tâm: học viên, lịch học thử sắp tới, học phí.',
          'Mỗi giáo viên có tài khoản riêng, một lớp có thể có nhiều giáo viên.',
          'Dùng trên điện thoại và máy tính. Thêm vào màn hình chính như app, có thông báo đẩy.',
        ],
        media: { kind: 'illustration', name: 'tab-center' },
        links: [{ href: '/bang-gia', label: 'Xem bảng giá' }],
      },
    ],
  },

  steps: {
    lesson: 'Dễ bắt đầu',
    title: 'Bắt đầu trong 3 bước',
    items: [
      {
        image: 'step-1',
        title: 'Đăng ký sử dụng',
        // Đúng quy trình hiện tại: để lại SĐT, Tiny Ant gọi lại
        text: 'Tiny Ant gọi lại trong 1 ngày làm việc',
      },
      { image: 'step-2', title: 'Thiết lập lớp học', text: 'Thêm học sinh, giáo viên' },
      { image: 'step-3', title: 'Bắt đầu sử dụng', text: 'Ngay trên trình duyệt' },
    ],
  },

  // Chỉ hiện khi đã có cảm nhận thật (SHOW_TESTIMONIALS trong src/sections/Testimonials.tsx)
  testimonials: {
    lesson: 'Cảm nhận',
    title: 'Trung tâm nói gì về Tiny Ant',
    items: [
      {
        quote: '[[TODO: cảm nhận thật của trung tâm đang dùng, có sự đồng ý]]',
        name: '[[TODO: tên người nói]]',
        center: '[[TODO: tên trung tâm]]',
      },
      {
        quote: '[[TODO: cảm nhận thật của trung tâm đang dùng, có sự đồng ý]]',
        name: '[[TODO: tên người nói]]',
        center: '[[TODO: tên trung tâm]]',
      },
      {
        quote: '[[TODO: cảm nhận thật của trung tâm đang dùng, có sự đồng ý]]',
        name: '[[TODO: tên người nói]]',
        center: '[[TODO: tên trung tâm]]',
      },
    ],
  },

  pricing: {
    lesson: 'Bảng giá',
    title: 'Gói theo số học sinh',
    lead: 'Trung tâm chọn gói vừa với số học sinh của mình. Tiny Ant đang cho dùng thử miễn phí trước khi đăng ký.',
    link: 'Xem bảng giá chi tiết',
  },

  schools: {
    lesson: 'Nhà trường',
    title: 'Giáo viên trường cũng dùng được',
    text: 'Giáo viên trường dùng Tiny Ant để giao bài, thu bài và chấm bài cho cả lớp, có bài kiểm tra tự chấm và thư viện bài dùng chung.',
    link: 'Xem Tiny Ant cho nhà trường',
  },

  faq: {
    lesson: 'Ôn tập & khám phá',
    title: 'Cùng học, cùng lớn lên',
    subtitle: 'Những câu hỏi thường gặp',
    items: [
      {
        q: 'Tiny Ant có phù hợp với trung tâm nhỏ không?',
        a: 'Có. Tiny Ant có gói riêng theo số học sinh: 1–50, 51–100, 101–200 và trên 200 học sinh. Lớp nhỏ chọn gói nhỏ, không phải trả cho phần không dùng tới.',
      },
      {
        q: 'Phụ huynh có cần cài app không?',
        a: 'Không cần tải từ App Store hay CH Play. Phụ huynh mở Tiny Ant trên trình duyệt, chỉ cần thêm vào màn hình chính là dùng như app, có thông báo.',
      },
      {
        q: 'Phụ huynh không rành công nghệ có dùng được không?',
        a: 'Được. Phụ huynh mở Tiny Ant như mở một trang web. Báo vắng, tóm tắt buổi tối và báo cáo hằng tuần tự gửi tới. Nếu con và phụ huynh dùng chung một điện thoại, chỉ cần chuyển tài khoản bằng mã PIN.',
      },
      {
        q: 'Có nhắc học phí tự động không?',
        a: 'Có. Tiny Ant tự động nhắc học phí, có biên lai thu tiền và đối soát được sao kê chuyển khoản ngân hàng với học phí.',
      },
      {
        q: 'Học sinh làm bài thi thử có cần tài khoản không?',
        a: 'Không cần. Trung tâm gửi link thi thử, học sinh làm bài online ngay. Mỗi link chỉ nộp được một lần và hết hạn sau 14 ngày.',
      },
      {
        q: 'Chuyển từ Excel sang Tiny Ant có khó không?',
        a: 'Không khó. Tiny Ant tạo tài khoản học sinh hàng loạt từ danh sách và in phiếu đăng nhập bằng mã QR cho từng em.',
      },
      {
        q: 'Giáo viên part-time có tài khoản riêng không?',
        a: 'Có. Mỗi giáo viên có tài khoản riêng, và một lớp có thể có nhiều giáo viên cùng dạy.',
      },
      {
        q: 'Dữ liệu của trung tâm lưu ở đâu, có an toàn không?',
        a: 'Mỗi giáo viên, học sinh và phụ huynh đăng nhập bằng tài khoản riêng. [[TODO: nơi lưu trữ dữ liệu, sao lưu, bảo mật]]',
      },
      {
        q: 'Tôi có thể dùng thử trước khi đăng ký không?',
        a: 'Có. Tiny Ant đang cho dùng thử miễn phí. Anh/chị đăng ký dùng thử ngay bên cạnh, chúng tôi liên hệ trong 1 ngày làm việc để hướng dẫn bắt đầu.',
      },
    ],
  },

  cta: {
    // 2 dòng như thiết kế
    titleLines: ['Bắt đầu hành trình', 'học tập vui hơn mỗi ngày'],
    lead: 'Đăng ký dùng thử miễn phí để trải nghiệm lớp học thông minh dành cho trung tâm.',
    button: 'Đăng ký dùng thử miễn phí ngay',
    // Khi trình duyệt tắt JavaScript (pop-up không dùng được)
    noJs: 'Để đăng ký dùng thử, thầy cô gọi',
    noJsOr: 'hoặc email',
    note: 'Đội ngũ Tiny Ant sẽ liên hệ trong 1 ngày làm việc.',
  },

  // Tranh "Hòn đá to" cạnh khối đăng ký
  friends: {
    title: 'Học cùng bạn bè',
    subtitle: 'Mỗi ngày thêm một điều hay',
  },
} as const

// 4 gói theo số học sinh: dùng ở trang chủ và /bang-gia.
// price: null khi chưa có giá thật -> hiện `pricePending`, không ghi `offers` vào schema.
export const pricingTiers: readonly { name: string; price: number | null }[] = [
  { name: '1–50 học sinh', price: null },
  { name: '51–100 học sinh', price: null },
  { name: '101–200 học sinh', price: null },
  { name: 'Trên 200 học sinh', price: null },
]
export const pricePending = '[[TODO: giá]]'
export const priceUnit = 'đồng/tháng'

// Pop-up đăng ký dùng thử — dùng chung cho mọi nút "Đăng ký dùng thử" trên mọi trang
export const leadForm = {
  title: 'Đăng ký dùng thử miễn phí',
  lead: 'Để lại số điện thoại, Tiny Ant gọi lại thầy cô trong 1 ngày làm việc.',
  closeLabel: 'Đóng form đăng ký dùng thử',
  phoneLabel: 'Số điện thoại',
  phonePlaceholder: 'Ví dụ: 0912 345 678',
  nameLabel: 'Họ tên',
  namePlaceholder: 'Ví dụ: Cô Lan',
  centerLabel: 'Tên trung tâm',
  centerPlaceholder: 'Ví dụ: Lớp Ánh Dương',
  optional: '(không bắt buộc)',
  // Trường bẫy bot: người dùng không thấy, không điền
  honeypotLabel: 'Để trống ô này',
  phoneRequired: 'Vui lòng nhập số điện thoại.',
  phoneInvalid: 'Số điện thoại chưa đúng. Cần 10 số, bắt đầu bằng 03, 05, 07, 08 hoặc 09.',
  submit: 'Gửi đăng ký',
  submitting: 'Đang gửi…',
  success: 'Cảm ơn thầy cô! Tiny Ant sẽ gọi lại trong 1 ngày làm việc.',
  // Điểm bút đỏ của thầy cô ở màn hình cảm ơn (trang trí)
  gradeMark: '10',
  done: 'Đóng',
  errorLead: 'Chưa gửi được đăng ký. Thầy cô thử lại, hoặc gọi',
  errorTail: 'để được hỗ trợ ngay.',
  consentLead:
    'Khi bấm “Gửi đăng ký”, thầy cô đồng ý để Tiny Ant liên hệ qua số điện thoại trên, theo',
  consentLink: 'Chính sách bảo mật',
}

// BẢN NHÁP — cần người có chuyên môn pháp lý rà soát trước khi đăng chính thức.
export const privacy = {
  closeLabel: 'Đóng chính sách bảo mật',
  title: 'Chính sách bảo mật',
  updated: 'Có hiệu lực từ ngày 01/11/2026',
  intro:
    'Phần này giải thích Tiny Ant thu thập dữ liệu gì khi thầy cô điền form “Đăng ký dùng thử” trên tinyant.app, dùng vào việc gì, lưu ở đâu và thầy cô có những quyền gì.',
  sections: [
    {
      heading: 'Chúng tôi thu thập gì',
      list: [
        'Số điện thoại (bắt buộc).',
        'Họ tên và tên trung tâm, nếu thầy cô tự điền.',
        'Nguồn truy cập nếu có trong đường dẫn (utm_source, utm_medium, utm_campaign), trang và vị trí nút đã dùng để đăng ký, thời điểm gửi.',
      ],
      paragraphs: ['Chúng tôi không thu thập dữ liệu của học sinh hay phụ huynh qua trang này.'],
    },
    {
      heading: 'Dùng để làm gì',
      list: [
        'Gọi lại để hướng dẫn thầy cô dùng thử Tiny Ant.',
        'Biết kênh nào giúp thầy cô tìm thấy Tiny Ant, để cải thiện trang này.',
      ],
      paragraphs: [
        'Chúng tôi không bán dữ liệu và không dùng số điện thoại của thầy cô cho mục đích khác.',
      ],
    },
    {
      heading: 'Lưu ở đâu, ai xem được',
      paragraphs: [
        'Dữ liệu đăng ký được ghi vào một bảng tính Google Sheets và gửi thông báo về hộp thư của Tiny Ant. Chỉ nhân sự Tiny Ant phụ trách tư vấn được xem.',
      ],
    },
    {
      heading: 'Chống spam',
      paragraphs: [
        'Form dùng Cloudflare Turnstile để phân biệt người thật với máy. Turnstile xử lý một số dữ liệu kỹ thuật của trình duyệt theo chính sách bảo mật của Cloudflare.',
      ],
    },
    {
      heading: 'Đo lường cách dùng trang',
      paragraphs: [
        'Trang dùng Microsoft Clarity để hiểu thầy cô dùng trang thế nào: lượt nhấp, cuộn trang và di chuyển chuột. Clarity không ghi lại nội dung thầy cô gõ vào ô nhập. Dữ liệu này được Microsoft xử lý theo chính sách bảo mật của Microsoft.',
      ],
    },
    {
      heading: 'Quyền của thầy cô',
      paragraphs: [
        `Thầy cô có thể yêu cầu xem, sửa hoặc xoá dữ liệu của mình, hoặc rút lại sự đồng ý, bằng cách email ${contact.email}. Chúng tôi phản hồi trong 1 ngày làm việc.`,
      ],
    },
  ],
}
