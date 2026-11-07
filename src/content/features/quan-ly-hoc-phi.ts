import type { FeatureContent } from '../types'

const page: FeatureContent = {
  path: '/quan-ly-hoc-phi',
  meta: {
    title: 'Phần mềm quản lý học phí trung tâm học thêm | Tiny Ant',
    description:
      'Thu học phí trung tâm học thêm nhẹ nhàng hơn: học phí theo tháng, biên lai thu tiền, tự động nhắc học phí, đối soát sao kê chuyển khoản ngân hàng.',
  },
  crumb: 'Quản lý học phí',
  hero: {
    lesson: 'Học phí',
    title: 'Phần mềm quản lý học phí cho trung tâm học thêm',
    lead: 'Thu học phí là việc chủ trung tâm nào cũng ngại. Nhắc thì sợ phụ huynh phật lòng, không nhắc thì cuối tháng thiếu tiền. Phụ huynh chuyển khoản thì lại phải dò sao kê từng dòng mới biết em nào đã đóng. Tiny Ant gom việc thu, nhắc và đối soát học phí vào một chỗ, làm ngay trên điện thoại.',
    media: { kind: 'illustration', name: 'problem-center' },
  },
  pains: {
    title: 'Thu học phí bằng sổ và tin nhắn: quen nhưng mệt',
    items: [
      'Mỗi lớp một mức học phí, ghi rải rác trong sổ và nhiều file Excel.',
      'Đến kỳ đóng tiền phải nhắn nhắc từng nhà, có nhà nhắc hai ba lần.',
      'Phụ huynh chuyển khoản, cuối tháng ngồi dò sao kê ngân hàng từng dòng.',
      'Phụ huynh hỏi “con đã đóng tháng này chưa?” lại phải lật sổ tìm.',
    ],
  },
  sections: [
    {
      id: 'muc-hoc-phi',
      title: 'Học phí theo tháng: một mức chung, sửa riêng từng lớp',
      text: [
        'Trung tâm đặt một mức học phí mặc định cho cả trung tâm. Lớp nào có mức khác, ví dụ lớp ôn thi hay lớp kèm nhóm nhỏ, thì sửa riêng cho lớp đó. Không phải nhập lại học phí cho từng em ở từng lớp.',
        'Học phí tính theo tháng. Mỗi tháng mở ra là thấy em nào đã đóng, em nào còn thiếu, không cần cộng trừ trong sổ.',
      ],
      points: [
        'Một mức mặc định cho cả trung tâm.',
        'Sửa riêng mức học phí cho từng lớp khi cần.',
        'Xem tình trạng đóng tiền theo tháng của từng học sinh.',
      ],
    },
    {
      id: 'bien-lai-nhac-hoc-phi',
      title: 'Biên lai thu tiền và tự động nhắc học phí',
      text: [
        'Mỗi lần thu tiền, trung tâm có biên lai thu tiền cho phụ huynh, không phải viết tay hay chụp ảnh sổ gửi qua Zalo.',
        'Đến kỳ đóng học phí, Tiny Ant tự động nhắc học phí. Thầy cô không phải soạn tin nhắn cho từng nhà, cũng bớt những cuộc trò chuyện khó nói về tiền. Phụ huynh nhận lời nhắc rõ ràng, đúng lúc.',
      ],
      points: ['Biên lai cho mỗi lần thu tiền.', 'Tự động nhắc học phí, không cần nhắn tay.'],
      media: { kind: 'todo', label: '[[TODO: ảnh chụp màn hình biên lai thu tiền]]' },
    },
    {
      id: 'doi-soat-chuyen-khoan',
      title: 'Đối soát sao kê chuyển khoản với học phí',
      text: [
        'Bây giờ phần lớn phụ huynh chuyển khoản. Mỗi người ghi nội dung chuyển khoản một kiểu: tên con, tên mẹ, có khi chỉ ghi “học phí”. Dò sao kê bằng mắt rất mất thời gian và dễ sót.',
        'Với Tiny Ant, trung tâm đối soát sao kê chuyển khoản ngân hàng với học phí ngay trong ứng dụng, để biết khoản tiền nào đã khớp với học phí của học sinh nào. Cuối tháng chốt sổ nhanh hơn, ít nhầm hơn.',
      ],
      points: [
        'Không còn dò sao kê bằng mắt từng dòng.',
        'Biết khoản chuyển khoản nào đã khớp với học phí.',
      ],
      media: { kind: 'todo', label: '[[TODO: ảnh chụp màn hình đối soát sao kê]]' },
    },
    {
      id: 'phu-huynh-xem-hoc-phi',
      title: 'Phụ huynh tự xem học phí của con',
      text: [
        'Phụ huynh có tài khoản riêng, trong đó có tab Học phí. Mở ra là thấy tình trạng đóng tiền của con, không cần nhắn hỏi trung tâm.',
        'Thầy cô bớt được một loại tin nhắn, phụ huynh thấy mọi thứ minh bạch. Cả hai bên đều nhẹ nhõm hơn mỗi kỳ đóng học phí.',
      ],
      media: { kind: 'illustration', name: 'tab-parent' },
    },
  ],
  howTo: {
    title: 'Thu học phí với Tiny Ant trong 4 bước',
    steps: [
      {
        title: 'Đặt mức học phí',
        text: 'Đặt một mức mặc định cho cả trung tâm, rồi sửa riêng cho lớp nào có mức khác.',
      },
      {
        title: 'Thu tiền, có biên lai',
        text: 'Phụ huynh đóng tiền mặt hay chuyển khoản, trung tâm ghi nhận và có biên lai thu tiền.',
      },
      {
        title: 'Để Tiny Ant nhắc',
        text: 'Đến kỳ đóng học phí, Tiny Ant tự động nhắc học phí thay thầy cô.',
      },
      {
        title: 'Đối soát cuối tháng',
        text: 'Đối soát sao kê chuyển khoản với học phí để chốt danh sách đã đóng, còn thiếu.',
      },
    ],
  },
  faq: {
    title: 'Hỏi đáp về quản lý học phí',
    items: [
      {
        q: 'Mỗi lớp một mức học phí thì có được không?',
        a: 'Được. Trung tâm đặt một mức mặc định cho cả trung tâm, rồi sửa riêng cho từng lớp có mức khác.',
      },
      {
        q: 'Tiny Ant có tự nhắc phụ huynh đóng học phí không?',
        a: 'Có. Tiny Ant tự động nhắc học phí, thầy cô không phải nhắn tay từng nhà.',
      },
      {
        q: 'Phụ huynh chuyển khoản thì đối chiếu thế nào?',
        a: 'Trung tâm đối soát sao kê chuyển khoản ngân hàng với học phí ngay trong Tiny Ant, không phải dò sao kê từng dòng.',
      },
      {
        q: 'Tiny Ant có thu tiền hộ trung tâm không?',
        a: 'Không. Phụ huynh vẫn đóng tiền cho trung tâm như hiện nay, bằng tiền mặt hoặc chuyển khoản. Tiny Ant giúp ghi nhận, nhắc và đối soát học phí.',
      },
    ],
  },
  related: ['/kiem-tra-dau-vao', '/bao-cao-phu-huynh'],
}

export default page
