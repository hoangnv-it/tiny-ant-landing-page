import type { FeatureContent } from '../types'

const page: FeatureContent = {
  path: '/kiem-tra-dau-vao',
  meta: {
    title: 'Bài kiểm tra đầu vào, thi thử xếp lớp online | Tiny Ant',
    description:
      'Gửi phụ huynh link thi thử xếp lớp: học sinh làm online không cần tài khoản, hệ thống tự chấm, xếp trình độ. Hẹn học thử và theo dõi phễu tuyển sinh.',
  },
  crumb: 'Kiểm tra đầu vào',
  hero: {
    lesson: 'Tuyển sinh',
    title: 'Bài kiểm tra đầu vào và thi thử xếp lớp online',
    lead: 'Phụ huynh nhắn hỏi: “Con nhà chị nên học lớp nào?”. Trước đây trung tâm phải hẹn con đến làm bài trên giấy, chấm tay rồi gọi lại báo kết quả. Với Tiny Ant, trung tâm gửi một link thi thử. Con làm bài ở nhà, hệ thống tự chấm và xếp trình độ, trung tâm hẹn học thử ngay sau đó.',
    media: { kind: 'illustration', name: 'problem-student' },
  },
  pains: {
    title: 'Tuyển sinh bằng đề giấy và tin nhắn',
    items: [
      'Phải hẹn từng học sinh đến trung tâm làm bài kiểm tra đầu vào.',
      'Chấm tay từng bài, rồi gọi lại báo phụ huynh.',
      'Không nhớ phụ huynh nào đã hỏi, em nào đã làm bài, em nào đã học thử.',
      'Đề giấy phát ra rồi, dùng lại cho người sau không yên tâm.',
    ],
  },
  sections: [
    {
      id: 'link-thi-thu',
      title: 'Gửi link thi thử, học sinh làm online không cần tài khoản',
      text: [
        'Trung tâm gửi cho phụ huynh một link thi thử xếp lớp qua Zalo hay tin nhắn. Học sinh mở link là làm bài, không cần tạo tài khoản, không cần cài gì.',
        'Bài có đồng hồ đếm giờ, hết giờ tự nộp. Lỡ tải lại trang giữa chừng vẫn làm tiếp được, không mất bài. Mỗi link chỉ nộp được một lần và hết hạn sau 14 ngày, nên kết quả đáng tin.',
      ],
      points: [
        'Không cần tài khoản, mở link là làm.',
        'Có đồng hồ, hết giờ tự nộp.',
        'Tải lại trang vẫn làm tiếp được.',
        'Mỗi link nộp một lần, hết hạn sau 14 ngày.',
      ],
      media: { kind: 'todo', label: '[[TODO: ảnh chụp màn hình bài thi thử trên điện thoại]]' },
    },
    {
      id: 'tu-cham-xep-trinh-do',
      title: 'Tự chấm và xếp trình độ theo khung điểm của trung tâm',
      text: [
        'Học sinh nộp bài là hệ thống tự chấm. Kết quả có điểm thang 10 và điểm từng phần, để biết con vững phần nào, còn yếu phần nào.',
        'Trung tâm tự đặt khung điểm cho từng trình độ. Tiny Ant xếp trình độ theo đúng khung đó và kèm gợi ý của trung tâm, nên phụ huynh hiểu vì sao con được xếp vào lớp này.',
      ],
      points: [
        'Điểm thang 10 và điểm từng phần.',
        'Xếp trình độ theo khung điểm trung tâm đặt.',
        'Kèm gợi ý của trung tâm cho từng trình độ.',
      ],
    },
    {
      id: 'de-dung-lai',
      title: 'Soạn một đề tốt, dùng lại cho nhiều học sinh',
      text: [
        'Đề gửi cho học sinh không kèm đáp án. Vì vậy trung tâm chỉ cần soạn một đề kiểm tra đầu vào thật tốt rồi dùng lại cho nhiều học sinh, mỗi em một link riêng.',
      ],
    },
    {
      id: 'hoc-thu',
      title: 'Hẹn học thử miễn phí vào một buổi học thật',
      text: [
        'Sau khi thi thử, trung tâm hẹn học thử miễn phí vào một buổi học thật của lớp phù hợp. Học sinh được học cùng các bạn, không phải buổi học “trình diễn”.',
        'Trong buổi học thử, giáo viên điểm danh, chấm sao từ 1 đến 5 và nhận xét ngay trong buổi. Phụ huynh xem lịch học thử và nhận xét của giáo viên qua đúng link thi thử lúc trước.',
      ],
      media: { kind: 'illustration', name: 'tab-student' },
    },
    {
      id: 'pheu-tuyen-sinh',
      title: 'Phễu tuyển sinh: biết mỗi phụ huynh đang ở bước nào',
      text: [
        'Mỗi phụ huynh quan tâm được theo dõi qua bốn bước: Quan tâm → Đã thi thử → Đã học thử → Ghi danh. Nhìn vào là biết ai cần gọi lại, ai sắp ghi danh, không còn sót phụ huynh nào vì quên.',
        'Lịch học thử sắp tới cũng hiện trên màn hình tổng quan của chủ trung tâm.',
      ],
    },
  ],
  howTo: {
    title: 'Quy trình tuyển sinh với Tiny Ant',
    steps: [
      {
        title: 'Soạn đề và đặt khung điểm',
        text: 'Soạn đề kiểm tra đầu vào, đặt khung điểm cho từng trình độ.',
      },
      { title: 'Gửi link thi thử', text: 'Gửi link cho phụ huynh, con làm bài online ở nhà.' },
      { title: 'Xem kết quả', text: 'Hệ thống tự chấm, xếp trình độ, kèm gợi ý của trung tâm.' },
      { title: 'Hẹn học thử', text: 'Hẹn học thử miễn phí vào buổi học thật của lớp phù hợp.' },
      {
        title: 'Ghi danh',
        text: 'Phụ huynh đồng ý thì chuyển sang Ghi danh trong phễu tuyển sinh.',
      },
    ],
  },
  faq: {
    title: 'Hỏi đáp về thi thử xếp lớp',
    items: [
      {
        q: 'Học sinh làm bài thi thử có cần tài khoản không?',
        a: 'Không cần. Học sinh mở link trung tâm gửi là làm bài online ngay.',
      },
      {
        q: 'Link thi thử dùng được bao lâu?',
        a: 'Mỗi link chỉ nộp được một lần và hết hạn sau 14 ngày.',
      },
      {
        q: 'Đang làm bài mà lỡ tải lại trang thì sao?',
        a: 'Học sinh vẫn làm tiếp được, bài đang làm không bị mất. Hết giờ thì bài tự nộp.',
      },
      {
        q: 'Phụ huynh xem kết quả học thử ở đâu?',
        a: 'Phụ huynh xem lịch học thử và nhận xét của giáo viên qua đúng link thi thử đã nhận.',
      },
    ],
  },
  related: ['/diem-danh-hoc-sinh', '/quan-ly-hoc-phi'],
}

export default page
