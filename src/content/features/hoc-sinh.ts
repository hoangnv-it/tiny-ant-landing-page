import type { FeatureContent } from '../types'

const page: FeatureContent = {
  path: '/hoc-sinh',
  meta: {
    title: 'App học tập cho học sinh lớp học thêm | Tiny Ant',
    description:
      'Tiny Ant giúp học sinh lớp học thêm học đều mỗi ngày: màn hình Hôm nay, nhiệm vụ 5 phút, chuỗi ngày học, huy hiệu, luyện câu sai, game từ vựng có phát âm.',
  },
  crumb: 'Dành cho học sinh',
  hero: {
    lesson: 'Học sinh',
    title: 'App học tập giúp học sinh lớp học thêm học đều mỗi ngày',
    lead: 'Học thêm chỉ hiệu quả khi con ôn bài đều giữa các buổi học. Nhưng nhiều em không biết hôm nay cần làm gì, ngại làm bài trên giấy, ôn không đúng chỗ còn yếu. Tiny Ant cho học sinh một màn hình “Hôm nay” rõ ràng, những nhiệm vụ ngắn và trò chơi nhỏ để việc học mỗi ngày nhẹ nhàng hơn.',
    media: {
      kind: 'screen',
      name: 'app-attendance',
      alt: 'Màn hình Hôm nay của học sinh trong app Tiny Ant: nhiệm vụ hôm nay và bài cần làm trước',
    },
  },
  pains: {
    title: 'Ôn bài ở nhà: con hay gặp khó ở đâu?',
    items: [
      'Không biết hôm nay có bài gì, hạn nộp khi nào.',
      'Ngại làm bài trên giấy, làm xong để quên trong cặp.',
      'Ôn lại cả bài thay vì ôn đúng những câu còn sai.',
      'Học một mình nên nhanh chán, khó giữ đều mỗi ngày.',
    ],
  },
  sections: [
    {
      id: 'man-hinh-hom-nay',
      title: 'Màn hình “Hôm nay”: biết ngay cần làm gì',
      text: [
        'Mở Tiny Ant là thấy màn hình “Hôm nay”: bài nào cần làm trước, hạn nộp khi nào. Mỗi ngày có nhiệm vụ 5 phút, đủ ngắn để con làm ngay mà không thấy nặng nề.',
        'Bài tập về nhà thầy cô giao hiện ngay ở đây, con không phải lục lại nhóm Zalo của lớp. Thêm Tiny Ant vào màn hình chính là dùng như app, có thông báo khi giáo viên nhắc làm bài.',
      ],
      points: ['Bài cần làm và hạn nộp.', 'Nhiệm vụ 5 phút mỗi ngày.'],
    },
    {
      id: 'chuoi-ngay-huy-hieu',
      title: 'Chuỗi ngày học, huy hiệu và bảng xếp hạng cùng lớp',
      text: [
        'Học đều mỗi ngày thì chuỗi ngày học tăng lên. Làm tốt thì có huy hiệu và được khen thưởng. Học sinh đặt biệt danh của mình, xem bảng xếp hạng cùng lớp và ghi nhật ký học tập.',
        'Khi bố mẹ gửi lời khen, lời khen hiện thành banner động trên màn hình của con.',
      ],
      points: [
        'Chuỗi ngày học và huy hiệu.',
        'Biệt danh, bảng xếp hạng cùng lớp.',
        'Nhật ký học tập, khen thưởng khi làm tốt.',
      ],
      media: { kind: 'illustration', name: 'hero-kids' },
    },
    {
      id: 'luyen-cau-sai',
      title: 'Luyện lại câu sai, ôn từ vựng 5 phút',
      text: [
        'Câu nào làm sai được gom lại theo từng môn để luyện lại, thay vì ôn cả bài từ đầu. Với môn có từ vựng, học sinh ôn từ vựng 5 phút mỗi ngày.',
        'Học sinh cũng xem lại từng lần làm bài của mình. Nếu giáo viên cho phép, con được làm lại và xem đáp án.',
      ],
    },
    {
      id: 'game-tu-vung',
      title: 'Game từ vựng và thẻ phản xạ có phát âm',
      text: [
        'Ôn từ vựng bằng game: ghép chữ, bắn bóng bay, “Bắt người ngoài hành tinh”. Thẻ phản xạ có phát âm giúp con vừa nhớ nghĩa vừa nghe đúng cách đọc.',
      ],
      points: [
        'Ghép chữ.',
        'Bắn bóng bay.',
        '“Bắt người ngoài hành tinh”.',
        'Thẻ phản xạ có phát âm.',
      ],
      media: { kind: 'todo', label: '[[TODO: ảnh chụp màn hình game từ vựng]]' },
    },
  ],
  howTo: {
    title: 'Học sinh bắt đầu thế nào',
    steps: [
      { title: 'Đăng nhập', text: 'Đăng nhập bằng mã QR trên phiếu trung tâm phát.' },
      { title: 'Mở “Hôm nay”', text: 'Xem bài cần làm và hạn nộp.' },
      { title: 'Làm nhiệm vụ 5 phút', text: 'Giữ chuỗi ngày học, nhận huy hiệu.' },
      { title: 'Luyện câu sai', text: 'Ôn lại đúng những câu còn sai theo từng môn.' },
    ],
  },
  faq: {
    title: 'Hỏi đáp dành cho học sinh',
    items: [
      {
        q: 'Học sinh dùng trên điện thoại của bố mẹ được không?',
        a: 'Được. Phụ huynh và con dùng chung một điện thoại, chuyển tài khoản bằng mã PIN.',
      },
      {
        q: 'Tiny Ant có game học tập không?',
        a: 'Có game từ vựng: ghép chữ, bắn bóng bay, “Bắt người ngoài hành tinh”, và thẻ phản xạ có phát âm.',
      },
      {
        q: 'Học sinh có biết mình làm sai ở đâu không?',
        a: 'Có. Học sinh xem lại từng lần làm bài và luyện lại câu sai theo từng môn. Giáo viên quyết định có cho xem đáp án hay không.',
      },
      {
        q: 'Bảng xếp hạng so với ai?',
        a: 'Bảng xếp hạng chỉ gồm các bạn cùng lớp.',
      },
    ],
  },
  related: ['/giao-bai-tap-online', '/bao-cao-phu-huynh'],
}

export default page
