export interface ProjectConcept {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  accentColor: string;
  tags: string[];
  prompt: string;
  friction: string;
  idea: string;
  experience: string;
  system: { layer: string; description: string }[];
  nextProjectId: string;
}

export const PROJECTS: ProjectConcept[] = [
  {
    id: "banana-class",
    number: "01",
    title: "Banana Class",
    category: "Giáo dục số",
    description:
      "Một concept về không gian học tập nơi bài giảng, bài tập và trao đổi cùng nằm trong một mạch trải nghiệm.",
    accentColor: "#c9872a",
    tags: ["Học tập", "Lớp học", "Tiến độ"],
    prompt: "Làm sao để việc học trực tuyến bớt rời rạc?",
    friction:
      "Bài học, bài tập và trao đổi thường bị chia ra nhiều nơi. Người học phải tự nối các mảnh thông tin lại với nhau.",
    idea:
      "Đặt nội dung học tập và bước tiếp theo cạnh nhau, để người học luôn biết mình đang ở đâu và có thể làm gì tiếp.",
    experience:
      "Một dòng học tập liền mạch: chọn bài, tương tác với nội dung, ghi nhận tiến độ rồi quay lại đúng chỗ đã dừng.",
    system: [
      { layer: "Nội dung", description: "Bài học được chia thành những chặng rõ ràng." },
      { layer: "Tương tác", description: "Câu hỏi và ghi chú gắn trực tiếp với bài học." },
      { layer: "Tiến độ", description: "Trạng thái học tập hiện ra ngay trong hành trình." },
    ],
    nextProjectId: "banana-coach",
  },
  {
    id: "banana-coach",
    number: "02",
    title: "BananaCoach",
    category: "Sức khỏe cá nhân",
    description:
      "Một concept đồng hành cùng thói quen ăn uống, ưu tiên sự rõ ràng và đối thoại thay vì nhập liệu kéo dài.",
    accentColor: "#2a9960",
    tags: ["Dinh dưỡng", "Thói quen", "Trợ lý số"],
    prompt: "Có thể biến việc ghi lại bữa ăn thành một thói quen nhẹ nhàng hơn không?",
    friction:
      "Ghi chép quá nhiều bước dễ khiến người dùng bỏ dở. Lời khuyên cũng khó hữu ích nếu thiếu bối cảnh cá nhân.",
    idea:
      "Bắt đầu bằng một mô tả ngắn về bữa ăn, sau đó để người dùng xem lại và tự điều chỉnh thông tin trước khi lưu.",
    experience:
      "Một nhật ký thân thiện, nơi mỗi ghi nhận có ngữ cảnh và gợi ý luôn để người dùng cân nhắc — không thay thế chuyên gia.",
    system: [
      { layer: "Ghi nhận", description: "Thêm bữa ăn bằng cách phù hợp với từng người." },
      { layer: "Ngữ cảnh", description: "Lưu ý mục tiêu và thói quen do người dùng cung cấp." },
      { layer: "Phản hồi", description: "Trình bày gợi ý rõ ràng để người dùng chủ động quyết định." },
    ],
    nextProjectId: "class-document",
  },
  {
    id: "class-document",
    number: "03",
    title: "Class Document Manager",
    category: "Quản lý tài liệu",
    description:
      "Một concept sắp xếp tài liệu lớp học thành hệ thống dễ tìm, dễ hiểu và có cấu trúc.",
    accentColor: "#5576a8",
    tags: ["Tài liệu", "Tìm kiếm", "Tổ chức"],
    prompt: "Làm sao để tìm lại đúng tài liệu mà không phải nhớ nó nằm ở đâu?",
    friction:
      "Tài liệu thường được đặt tên và lưu trữ theo nhiều cách khác nhau, khiến việc tìm kiếm phụ thuộc vào trí nhớ.",
    idea:
      "Tổ chức tài liệu theo lớp học, chủ đề và thời điểm; giữ các thao tác thường dùng ở ngay nơi người dùng cần.",
    experience:
      "Một thư viện có cấu trúc rõ, bộ lọc dễ hiểu và trạng thái tài liệu nhất quán trên các màn hình.",
    system: [
      { layer: "Phân loại", description: "Nhóm tài liệu theo lớp và chủ đề." },
      { layer: "Khám phá", description: "Kết hợp tìm kiếm với các bộ lọc dễ nhận biết." },
      { layer: "Thao tác", description: "Đưa xem, tải và quản lý về cùng một điểm chạm." },
    ],
    nextProjectId: "banana-class",
  },
];

export const SERVICES = [
  {
    number: "01",
    accentColor: "#d4af37",
    title: "Website",
    description:
      "Một điểm chạm số có cá tính riêng, được thiết kế quanh câu chuyện và nhu cầu thực tế của bạn.",
    detail: "Từ cấu trúc nội dung đến giao diện và tương tác.",
    code: "Trang web / Nội dung / Tương tác",
    icon: "monitor",
  },
  {
    number: "02",
    accentColor: "#9d82c4",
    title: "Sản phẩm số",
    description:
      "Biến một ý tưởng thành trải nghiệm mà người dùng có thể hiểu, thử và sử dụng mỗi ngày.",
    detail: "Luồng người dùng, giao diện và nền tảng sản phẩm.",
    code: "Nhu cầu / Luồng / Sản phẩm",
    icon: "layout-grid",
  },
  {
    number: "03",
    accentColor: "#c9872a",
    title: "Thương mại điện tử",
    description:
      "Sắp xếp hành trình mua hàng để việc khám phá, chọn lựa và thanh toán diễn ra tự nhiên.",
    detail: "Danh mục, trang sản phẩm và quy trình đặt hàng.",
    code: "Khám phá / Lựa chọn / Đặt hàng",
    icon: "shopping-bag",
  },
  {
    number: "04",
    accentColor: "#62a995",
    title: "Trí tuệ nhân tạo",
    description:
      "Đưa AI vào đúng công đoạn cần hỗ trợ, với con người vẫn giữ quyền kiểm soát.",
    detail: "Tích hợp theo bài toán và dữ liệu thực tế.",
    code: "Đầu vào / Xử lý / Xác nhận",
    icon: "brain",
  },
  {
    number: "05",
    accentColor: "#6689b7",
    title: "Hệ thống nội bộ",
    description:
      "Thay những quy trình rời rạc bằng công cụ vừa với cách đội ngũ đang làm việc.",
    detail: "Bảng điều khiển, công cụ vận hành và luồng dữ liệu.",
    code: "Quy trình / Công cụ / Đội ngũ",
    icon: "settings",
  },
  {
    number: "06",
    accentColor: "#bf786d",
    title: "Phát triển tiếp",
    description:
      "Tiếp tục hoàn thiện sản phẩm sau khi ra mắt, dựa trên nhu cầu mới và phản hồi thực tế.",
    detail: "Bảo trì, cải tiến và mở rộng theo từng giai đoạn.",
    code: "Quan sát / Điều chỉnh / Tiến hóa",
    icon: "trending-up",
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Lắng nghe",
    description: "Tìm hiểu mục tiêu, người dùng và những điều đang cản trở trải nghiệm.",
  },
  {
    number: "02",
    title: "Định hình",
    description: "Thống nhất vấn đề cần giải quyết, phạm vi và hướng đi trước khi bắt tay làm.",
  },
  {
    number: "03",
    title: "Thiết kế",
    description: "Thử nghiệm cấu trúc và giao diện để ý tưởng trở nên dễ hiểu, dễ dùng.",
  },
  {
    number: "04",
    title: "Xây dựng",
    description: "Phát triển sản phẩm theo từng phần rõ ràng, có thể cùng xem và góp ý.",
  },
  {
    number: "05",
    title: "Hoàn thiện",
    description: "Rà soát các luồng chính, sửa những điểm vướng và chuẩn bị đưa sản phẩm lên.",
  },
  {
    number: "06",
    title: "Tiếp tục",
    description: "Quan sát cách sản phẩm được dùng rồi chọn điều đáng cải thiện tiếp theo.",
  },
];

export const PRICING_TIERS = [
  {
    tier: "01",
    name: "Website thương hiệu",
    tagline: "Cho thương hiệu cần một diện mạo số có chủ đích và dễ ghi nhớ.",
    scope: "Theo phạm vi",
    deliverables: ["Định hướng nội dung", "Thiết kế giao diện", "Phát triển responsive"],
    highlight: false,
    cta: "Trao đổi về website",
  },
  {
    tier: "02",
    name: "Sản phẩm số",
    tagline: "Cho ý tưởng cần được định hình thành một sản phẩm có thể sử dụng.",
    scope: "Theo bài toán",
    deliverables: ["Làm rõ nhu cầu", "Thiết kế luồng và giao diện", "Phát triển tính năng"],
    highlight: true,
    badge: "Sản phẩm",
    cta: "Kể về ý tưởng",
  },
  {
    tier: "03",
    name: "Hệ thống riêng",
    tagline: "Cho quy trình đặc thù cần một công cụ được xây dựng vừa vặn.",
    scope: "Cùng xác định",
    deliverables: ["Khảo sát quy trình", "Đề xuất cấu trúc hệ thống", "Lộ trình triển khai"],
    highlight: false,
    cta: "Bàn về hệ thống",
  },
];

export const TECH_STACK = {
  Frontend: ["Next.js", "React", "TypeScript"],
  Styling: ["Tailwind CSS"],
  Motion: ["Framer Motion"],
  Icons: ["Lucide"],
};

export const WHY_US = [
  {
    title: "Thiết kế có lý do",
    description: "Mỗi lựa chọn thị giác đều giúp người dùng hiểu hoặc làm được điều gì đó.",
  },
  {
    title: "Ưu tiên điều cần thiết",
    description: "Bắt đầu từ vấn đề thật, không thêm tính năng chỉ để làm sản phẩm trông phức tạp.",
  },
  {
    title: "Nghĩ từ màn hình nhỏ",
    description: "Thiết kế cho cách mọi người thực sự truy cập và tương tác với sản phẩm.",
  },
  {
    title: "Dùng công nghệ đúng chỗ",
    description: "Chọn công cụ theo bài toán; AI chỉ xuất hiện khi nó giúp ích rõ ràng.",
  },
  {
    title: "Để sản phẩm tiếp tục lớn lên",
    description: "Cấu trúc gọn gàng giúp việc bảo trì và mở rộng bớt nặng nề.",
  },
  {
    title: "Cùng làm, cùng hiểu",
    description: "Trao đổi thẳng thắn để mọi người luôn nắm được quyết định và hướng đi.",
  },
];
