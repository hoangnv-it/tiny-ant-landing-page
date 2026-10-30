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

export const nav = {
  label: 'Điều hướng chính',
  links: [
    { href: '/#trung-tam', label: 'Trung tâm' },
    { href: '/#nha-truong', label: 'Nhà trường' },
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
        { href: '/#trung-tam', label: 'Trung tâm' },
        { href: '/#nha-truong', label: 'Nhà trường' },
        { href: '/#hoc-sinh', label: 'Học sinh' },
        { href: '/#phu-huynh', label: 'Phụ huynh' },
      ],
    },
    {
      title: 'Tìm hiểu',
      links: [
        { href: '/#bat-dau', label: 'Bắt đầu trong 3 bước' },
        { href: '/#thu-vien', label: 'Thư viện bài' },
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
    // ~60 / ~155 ký tự
    title: 'Tiny Ant – Phần mềm quản lý lớp học thêm, quản lý trung tâm',
    description:
      'Tiny Ant là phần mềm quản lý lớp học thêm và quản lý trung tâm: điểm danh, giao bài, báo phụ huynh, theo dõi học phí trên điện thoại. Dùng thử miễn phí.',
  },
  hero: {
    // 3 dòng trên máy tính; dòng cuối màu đỏ
    titleLines: ['Điểm danh, giao bài, thu học phí,', 'báo phụ huynh —'],
    titleAccent: 'một app cho lớp học thêm.',
    lead: 'Tiny Ant giúp trung tâm và giáo viên dạy thêm quản lý học sinh, buổi học và học phí ngay trên điện thoại. Phụ huynh thấy con học thế nào mỗi ngày, thầy cô bớt hẳn việc nhắn tin từng nhà.',
    primaryCta: 'Đăng ký dùng thử miễn phí',
    secondaryCta: 'Xem cách hoạt động',
    videoClose: 'Đóng video',
    // Đã xác nhận: mọi người dùng qua trình duyệt, chưa có app di động
    note: 'Dùng trên điện thoại và máy tính, không cần cài đặt.',
    attendanceAlt:
      'Màn hình trang chủ của học sinh trong app Tiny Ant: nhiệm vụ hôm nay và bài cần làm trước',
    parentAlt: 'Màn hình hôm nay dành cho phụ huynh trong app Tiny Ant',
  },

  problems: {
    lesson: 'Vấn đề gặp phải',
    title: 'Quen thuộc với thầy cô không?',
    listLabel: 'Bốn nỗi lo quen thuộc',
    items: [
      {
        image: 'problem-center',
        title: 'Trung tâm, giáo viên dạy thêm',
        text: 'Điểm danh bằng sổ. Danh sách học sinh nằm rải rác trong Zalo và Excel. Cuối tháng phải ngồi dò xem ai đã đóng học phí, ai chưa làm bài về nhà.',
      },
      {
        image: 'problem-teacher',
        title: 'Giáo viên trường',
        text: 'Mất nhiều giờ soạn, giao, thu và chấm bài. Khó biết em nào chưa làm.',
      },
      {
        image: 'problem-student',
        title: 'Học sinh',
        text: 'Ngại làm bài trên giấy, ngại gõ chữ trên điện thoại. Ôn tập không đúng chỗ yếu.',
      },
      {
        image: 'problem-parent',
        title: 'Phụ huynh',
        text: 'Không biết con có bài gì, điểm ra sao. Thường chỉ biết khi họp phụ huynh.',
      },
    ],
    conclusion: 'Tiny Ant gom tất cả vào một nơi — mỗi người có đúng màn hình mình cần.',
  },

  audiences: {
    lesson: 'Giải pháp của Tiny Ant',
    title: 'Mỗi người một màn hình, chung một dữ liệu',
    tabsLabel: 'Chọn đối tượng',
    nextPrefix: 'Xem tiếp:',
    // `anchor`: id neo trên trang; link tới /#<anchor> sẽ cuộn tới đây và mở đúng tab
    tabs: [
      {
        anchor: 'trung-tam',
        icon: 'center',
        label: 'Trung tâm',
        image: 'tab-center',
        title: 'Lớp học thêm chạy gọn, không cần sổ sách',
        points: [
          {
            lead: 'Danh sách học sinh một chỗ.',
            text: 'Xếp học sinh theo lớp, tạo tài khoản hàng loạt từ danh sách, in phiếu đăng nhập có mã QR.',
          },
          {
            lead: 'Mỗi buổi học vài lần chạm.',
            text: 'Điểm danh, giao bài tập về nhà, chấm điểm và nhận xét ngay trong buổi.',
          },
          {
            lead: 'Học phí rõ ràng.',
            text: 'Học phí tính theo tháng; mở ra là biết em nào đã đóng, em nào còn thiếu.',
          },
          {
            lead: 'Phụ huynh tự cập nhật.',
            text: 'Phụ huynh nhận thông báo khi con vắng và báo cáo học tập mỗi tuần —',
            strong: 'thầy cô không phải nhắn từng nhà.',
          },
        ],
      },
      {
        anchor: 'nha-truong',
        icon: 'school',
        label: 'Nhà trường',
        image: 'tab-school',
        title: 'Giao bài, thu bài, chấm bài trong một chỗ',
        points: [
          {
            lead: 'Giao bài một lần.',
            text: 'Cả lớp nhận bài ngay trên điện thoại hoặc máy tính.',
          },
          {
            lead: 'Biết ngay em nào chưa làm.',
            text: 'Không phải dò từng tập vở.',
          },
          {
            lead: 'Có tính giờ, chấm tự động.',
            text: 'Bài trắc nghiệm và bài tự luận nhập đáp án là số được chấm ngay.',
          },
          {
            lead: 'Thư viện bài dùng chung.',
            text: 'Soạn một lần, cả tổ dùng chung.',
          },
        ],
      },
      {
        anchor: 'hoc-sinh',
        icon: 'student',
        label: 'Học sinh',
        image: 'tab-student',
        title: 'Biết hôm nay cần làm gì',
        points: [
          {
            lead: 'Việc sắp tới ở ngay màn hình đầu.',
            text: 'Bài tập về nhà, lịch thi và hạn nộp.',
          },
          {
            lead: 'Làm bài ngay trên điện thoại.',
            text: 'Không cần giấy.',
          },
          {
            lead: 'Xem điểm và nhận xét.',
            text: 'Thầy cô chấm xong là thấy.',
          },
          {
            lead: 'Ôn đúng chỗ còn yếu.',
            text: 'Tiny Ant gợi ý bài ôn theo đúng chỗ em còn yếu.',
          },
        ],
      },
      {
        anchor: 'phu-huynh',
        icon: 'parent',
        label: 'Phụ huynh',
        image: 'tab-parent',
        title: 'Biết con học thế nào, không cần hỏi thầy cô',
        points: [
          {
            lead: 'Báo khi con vắng.',
            text: 'Nhận thông báo ngay khi con vắng buổi học.',
          },
          {
            lead: 'Báo cáo học tập mỗi tuần.',
            text: 'Ngày học, bài đã nộp, điểm và buổi vắng trong một màn hình.',
          },
          {
            lead: 'Bài tập về nhà của con.',
            text: 'Biết con có bài gì và hạn nộp khi nào.',
          },
          {
            lead: 'Học phí từng tháng.',
            text: 'Biết đã đóng hay còn thiếu.',
          },
        ],
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

  why: {
    lesson: 'Điểm mạnh',
    title: 'Vì sao thầy cô chọn Tiny Ant',
    items: [
      { title: 'Giao diện đơn giản, dễ dùng', text: 'Không mất thời gian làm quen.' },
      { title: 'Tiết kiệm thời gian', text: 'Giảm việc lặp lại, tăng thời gian dạy.' },
      { title: 'Minh bạch, rõ ràng', text: 'Phụ huynh luôn cập nhật tình hình học tập.' },
      {
        title: 'Phản hồi trong 1 ngày làm việc',
        text: `Gọi ${contact.phoneDisplay} hoặc email ${contact.email}.`,
      },
    ],
  },

  library: {
    lesson: 'Tài liệu có sẵn',
    title: 'Thư viện bài dùng chung, có sẵn để dạy ngay',
    points: [
      'Bài học, bài tập, đề kiểm tra theo từng môn, từng khối.',
      'Có tính giờ, chấm tự động.',
      'Dễ dàng chỉnh sửa, tùy biến.',
    ],
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
        a: 'Không cần. Phụ huynh, học sinh và thầy cô đều dùng Tiny Ant ngay trên trình duyệt của điện thoại hoặc máy tính. Hiện Tiny Ant chưa có app di động.',
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
