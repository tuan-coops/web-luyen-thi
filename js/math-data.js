/**
 * MATH-DATA.JS
 * Ngân hàng dữ liệu kiến thức, bài tập và TOÀN BỘ ĐỀ THI GIỮA HỌC KỲ 1 MÔN TOÁN 12
 * Bám sát ma trận đề thi chuẩn Bộ GD&ĐT (Chương trình GDPT 2018)
 */

const MATH_DATABASE = {
  grades: [
    {
      id: "12",
      name: "Toán 12",
      subtitle: "Chương trình GDPT 2018 & Luyện thi Tốt nghiệp THPT / ĐGNL",
      status: "active",
      badge: "Đầy đủ 100%",
      topics: [
        {
          id: "12-1",
          title: "Chủ đề 1: Tính đơn điệu & Cực trị hàm số",
          desc: "Xét tính đồng biến, nghịch biến, điểm cực đại, cực tiểu, cực trị và bài toán chứa tham số m.",
          icon: "📈",
          color: "#3b82f6",
          theory: {
            summary: "Định lí mở rộng về dấu đạo hàm & Dấu hiệu cực trị",
            content: `
              <h4>1. Tính đơn điệu của hàm số</h4>
              <p>Cho hàm số $y = f(x)$ có đạo hàm trên khoảng $K$.</p>
              <ul>
                <li>Nếu $f'(x) \\ge 0, \\forall x \\in K$ và $f'(x) = 0$ chỉ tại hữu hạn điểm $\\Rightarrow$ Hàm số <strong>đồng biến</strong> trên $K$.</li>
                <li>Nếu $f'(x) \\le 0, \\forall x \\in K$ và $f'(x) = 0$ chỉ tại hữu hạn điểm $\\Rightarrow$ Hàm số <strong>nghịch biến</strong> trên $K$.</li>
                <li><strong>Hàm phân thức bậc nhất $y = \\frac{ax+b}{cx+d}$ ($ad-bc \\ne 0$):</strong> $y' = \\frac{ad-bc}{(cx+d)^2}$. Hàm số đồng biến trên từng khoảng xác định khi $ad-bc > 0$; nghịch biến khi $ad-bc < 0$. <br><em>Lưu ý: Không dùng kí hiệu $\\cup$ hay $\\backslash$ để kết luận khoảng đơn điệu!</em></li>
              </ul>
              <h4>2. Cực trị của hàm số</h4>
              <ul>
                <li><strong>Dấu hiệu 1:</strong> Nếu $f'(x)$ đổi dấu từ <em>dương sang âm</em> khi qua $x_0$ theo chiều tăng thì $x_0$ là <strong>điểm cực đại</strong>. Nếu đổi dấu từ <em>âm sang dương</em> thì $x_0$ là <strong>điểm cực tiểu</strong>.</li>
                <li><strong>Quy ước gọi tên:</strong>
                  <ul>
                    <li>$x_0$: Điểm cực trị của hàm số.</li>
                    <li>$y_0 = f(x_0)$: Giá trị cực trị (cực đại/cực tiểu) của hàm số.</li>
                    <li>$M(x_0; y_0)$: Điểm cực trị của đồ thị hàm số.</li>
                  </ul>
                </li>
              </ul>
            `
          },
          exercises: {
            mcq: [
              {
                id: "12-1-m1",
                question: "Cho hàm số $y = f(x)$ có bảng biến thiên như sau:\n$$\\begin{array}{c|ccccccc} x & -\\infty & & -1 & & 0 & & 1 & & +\\infty \\\\ \\hline f'(x) & & - & 0 & + & 0 & - & 0 & + \\\\ \\hline f(x) & +\\infty & \\searrow & -2 & \\nearrow & -1 & \\searrow & -2 & \\nearrow & +\\infty \\end{array}$$\nHàm số đã cho đồng biến trên khoảng nào dưới đây?",
                options: ["A. $(-1; 0)$", "B. $(0; 1)$", "C. $(-\\infty; -1)$", "D. $(-1; 1)$"],
                answer: 0,
                explain: "Dựa vào bảng biến thiên, đạo hàm $f'(x) > 0$ trên $(-1; 0)$ và $(1; +\\infty)$. Do đó hàm số đồng biến trên $(-1; 0)$ và $(1; +\\infty)$.",
                level: "Nhận biết"
              },
              {
                id: "12-1-m2",
                question: "Hàm số $y = x^3 - 3x^2 + 2$ nghịch biến trên khoảng nào dưới đây?",
                options: ["A. $(0; 2)$", "B. $(-\\infty; 0)$", "C. $(2; +\\infty)$", "D. $(0; +\\infty)$"],
                answer: 0,
                explain: "Ta có $y' = 3x^2 - 6x = 3x(x - 2)$. Cho $y' = 0 \\Leftrightarrow x = 0$ hoặc $x = 2$. Bảng xét dấu: $y' < 0 \\Leftrightarrow x \\in (0; 2)$.",
                level: "Thông hiểu"
              },
              {
                id: "12-1-m3",
                question: "Cho hàm số $y = \\frac{2x - 1}{x + 1}$. Mệnh đề nào sau đây là ĐÚNG?",
                options: [
                  "A. Hàm số đồng biến trên $\\mathbb{R} \\setminus \\{-1\\}$.",
                  "B. Hàm số đồng biến trên từng khoảng $(-\\infty; -1)$ và $(-1; +\\infty)$.",
                  "C. Hàm số nghịch biến trên từng khoảng $(-\\infty; -1)$ và $(-1; +\\infty)$.",
                  "D. Hàm số đồng biến trên khoảng $(-\\infty; +\\infty)$."
                ],
                answer: 1,
                explain: "Tập xác định $D = \\mathbb{R} \\setminus \\{-1\\}$. Đạo hàm $y' = \\frac{3}{(x+1)^2} > 0, \\forall x \\ne -1$. Do đó hàm số đồng biến trên từng khoảng $(-\\infty; -1)$ và $(-1; +\\infty)$.",
                level: "Nhận biết"
              },
              {
                id: "12-1-m4",
                question: "Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ và có đạo hàm $f'(x) = x(x - 1)^2(x + 2)$. Số điểm cực trị của hàm số đã cho là:",
                options: ["A. 2", "B. 1", "C. 3", "D. 0"],
                answer: 0,
                explain: "Nghiệm của $f'(x) = 0$ là $x = 0, x = 1$ (nghiệm kép), $x = -2$. Đạo hàm chỉ đổi dấu khi qua 2 nghiệm đơn $x = 0$ và $x = -2$. Do đó hàm số có 2 điểm cực trị.",
                level: "Thông hiểu"
              },
              {
                id: "12-1-m5",
                question: "Giá trị cực tiểu $y_{CT}$ của hàm số $y = x^3 - 3x + 4$ là:",
                options: ["A. $y_{CT} = 1$", "B. $y_{CT} = 2$", "C. $y_{CT} = 6$", "D. $y_{CT} = -1$"],
                answer: 1,
                explain: "Đạo hàm $y' = 3x^2 - 3 = 0 \\Leftrightarrow x = \\pm 1$. Tại $x = 1$ hàm số đạt cực tiểu, giá trị cực tiểu là $y(1) = 1^3 - 3(1) + 4 = 2$.",
                level: "Thông hiểu"
              }
            ],
            tf: [
              {
                id: "12-1-tf1",
                context: "Cho hàm số bậc ba $y = f(x) = x^3 - 3x^2 + 2$ có đồ thị $(C)$.",
                items: [
                  { text: "a) Hàm số đồng biến trên khoảng $(0; 2)$.", answer: false, explain: "Sai. Ta có $y' = 3x^2 - 6x < 0$ khi $x \\in (0; 2)$, nên hàm số nghịch biến trên khoảng này." },
                  { text: "b) Điểm cực đại của đồ thị hàm số là $A(0; 2)$ và điểm cực tiểu là $B(2; -2)$.", answer: true, explain: "Đúng. $x = 0 \\Rightarrow y = 2$ (cực đại); $x = 2 \\Rightarrow y = -2$ (cực tiểu)." },
                  { text: "c) Khoảng cách giữa hai điểm cực trị của đồ thị hàm số bằng $2\\sqrt{5}$.", answer: true, explain: "Đúng. $AB = \\sqrt{(2-0)^2 + (-2-2)^2} = \\sqrt{4 + 16} = 2\\sqrt{5}$." },
                  { text: "d) Phương trình đường thẳng đi qua hai điểm cực trị của $(C)$ là $y = -2x + 2$.", answer: true, explain: "Đúng. Thay $A(0; 2)$ và $B(2; -2)$ vào $y = -2x + 2$ đều thỏa mãn." }
                ]
              }
            ],
            shortAnswer: [
              {
                id: "12-1-sa1",
                question: "Tìm tất cả các giá trị của tham số $m$ để hàm số $y = \\frac{x - m}{x + 1}$ đồng biến trên từng khoảng xác định của nó. Điền điều kiện của $m$ (Ví dụ: m > -1):",
                answer: "m > -1",
                acceptAnswers: ["m > -1", "m>-1", "> -1", ">-1", "-1 < m"],
                explain: "Đạo hàm $y' = \\frac{1 + m}{(x+1)^2}$. Hàm số đồng biến trên từng khoảng xác định khi và chỉ khi $y' > 0 \\Leftrightarrow 1 + m > 0 \\Leftrightarrow m > -1$."
              }
            ],
            essay: [
              {
                id: "12-1-es1",
                title: "Bài toán tham số m về tính đơn điệu & cực trị",
                question: "Cho hàm số $y = \\frac{1}{3}x^3 - mx^2 + (m^2 - 4)x + 3$ ($m$ là tham số thực).\n1) Tìm $m$ để hàm số đồng biến trên $\\mathbb{R}$.\n2) Tìm $m$ để hàm số đạt cực đại tại điểm $x = 1$.",
                solution: `
                  <p><strong>1) Xét tính đồng biến trên $\\mathbb{R}$:</strong></p>
                  <p>Tập xác định $D = \\mathbb{R}$. Đạo hàm $y' = x^2 - 2mx + (m^2 - 4)$.</p>
                  <p>Hàm số đồng biến trên $\\mathbb{R} \\Leftrightarrow y' \\ge 0, \\forall x \\in \\mathbb{R} \\Leftrightarrow \\Delta' \\le 0$.</p>
                  <p>Ta có $\\Delta' = (-m)^2 - 1(m^2 - 4) = 4 > 0, \\forall m$. Vì $\\Delta' > 0$ nên $y'$ luôn đổi dấu khi qua hai nghiệm phân biệt. Do đó <strong>không có giá trị nào của $m$</strong> để hàm số đồng biến trên $\\mathbb{R}$.</p>
                  <p><strong>2) Hàm số đạt cực đại tại $x = 1$:</strong></p>
                  <p>Điều kiện cần: $y'(1) = 0 \\Leftrightarrow 1 - 2m + m^2 - 4 = 0 \\Leftrightarrow m^2 - 2m - 3 = 0 \\Leftrightarrow m = -1$ hoặc $m = 3$.</p>
                  <p>Đạo hàm cấp hai: $y'' = 2x - 2m$.</p>
                  <ul>
                    <li>Với $m = -1$: $y''(1) = 2(1) - 2(-1) = 4 > 0 \\Rightarrow$ điểm cực tiểu (loại).</li>
                    <li>Với $m = 3$: $y''(1) = 2(1) - 2(3) = -4 < 0 \\Rightarrow$ điểm cực đại (nhận).</li>
                  </ul>
                  <p>Vậy $m = 3$.</p>
                `
              }
            ]
          }
        },
        {
          id: "12-2",
          title: "Chủ đề 2: Giá trị lớn nhất & nhỏ nhất (GTLN - GTNN)",
          desc: "Tìm max - min trên đoạn [a; b], khoảng mở và ứng dụng thực tế tối ưu hóa dung tích, chi phí.",
          icon: "📊",
          color: "#10b981",
          theory: {
            summary: "Quy tắc tìm GTLN - GTNN & Ứng dụng thực tế",
            content: `
              <h4>1. Quy tắc tìm Max - Min trên đoạn $[a; b]$</h4>
              <ol>
                <li>Tính đạo hàm $f'(x)$. Tìm các nghiệm $x_i \\in (a; b)$ làm $f'(x) = 0$ hoặc không xác định.</li>
                <li>Tính các giá trị $f(a), f(b), f(x_i)$.</li>
                <li>Số lớn nhất trong các giá trị trên là $\\max_{[a; b]} f(x)$, số nhỏ nhất là $\\min_{[a; b]} f(x)$.</li>
              </ol>
            `
          },
          exercises: {
            mcq: [
              {
                id: "12-2-m1",
                question: "Giá trị lớn nhất của hàm số $f(x) = x^4 - 2x^2 + 3$ trên đoạn $[0; 2]$ bằng:",
                options: ["A. 11", "B. 2", "C. 3", "D. 19"],
                answer: 0,
                explain: "Đạo hàm $f'(x) = 4x(x^2 - 1) = 0 \\Leftrightarrow x = 0, x = 1$ trên $[0; 2]$. Ta có $f(0) = 3, f(1) = 2, f(2) = 11$. Vậy $\\max = 11$.",
                level: "Thông hiểu"
              },
              {
                id: "12-2-m2",
                question: "Tìm giá trị nhỏ nhất của hàm số $y = x + \\frac{4}{x}$ trên khoảng $(0; +\\infty)$.",
                options: ["A. $\\min y = 4$", "B. $\\min y = 2$", "C. $\\min y = 5$", "D. $\\min y = 0$"],
                answer: 0,
                explain: "Theo BĐT Cô-si: $x + \\frac{4}{x} \\ge 2\\sqrt{x \\cdot \\frac{4}{x}} = 4$. Dấu '=' khi $x = 2$. Vậy $\\min = 4$.",
                level: "Nhận biết"
              }
            ],
            tf: [
              {
                id: "12-2-tf1",
                context: "Một người nông dân muốn rào một mảnh đất hình chữ nhật tiếp giáp bờ sông thẳng với 120 mét lưới thép gai có sẵn (bờ sông không cần rào).",
                items: [
                  { text: "a) Gọi x (m) là chiều rộng thì chiều dài song song bờ sông là 120 - 2x.", answer: true, explain: "Đúng vì tổng chiều dài 3 cạnh cần rào là 2x + chiều dài = 120." },
                  { text: "b) Diện tích mảnh vườn là S(x) = 120x - 2x².", answer: true, explain: "Đúng: S(x) = x(120 - 2x) = 120x - 2x²." },
                  { text: "c) Để diện tích lớn nhất thì chiều rộng cần rào là x = 40 mét.", answer: false, explain: "Sai. S'(x) = 120 - 4x = 0 <=> x = 30 mét." },
                  { text: "d) Diện tích lớn nhất rào được là 1 800 m².", answer: true, explain: "Đúng. Với x = 30 thì S(30) = 30 * 60 = 1 800 m²." }
                ]
              }
            ],
            shortAnswer: [
              {
                id: "12-2-sa1",
                question: "Một chiếc hộp kim loại hình trụ không nắp có thể tích $V = 54\\pi\\text{ cm}^3$. Bán kính đáy $r$ (cm) để diện tích toàn phần không nắp đạt GTNN bằng:",
                answer: "3",
                acceptAnswers: ["3", "r=3", "r = 3"],
                explain: "$V = \\pi r^2 h = 54\\pi \\Rightarrow h = 54/r^2$. Diện tích $S(r) = \\pi r^2 + 2\\pi rh = \\pi r^2 + 108\\pi / r$. $S'(r) = 2\\pi r - 108\\pi / r^2 = 0 \\Leftrightarrow r^3 = 54 \\Rightarrow r = 3\\text{ cm}$."
              }
            ],
            essay: [
              {
                id: "12-2-es1",
                title: "Bài toán gập hộp tôn cực đại dung tích",
                question: "Từ tấm tôn kích thước $50\\text{ cm} \\times 80\\text{ cm}$, cắt bỏ 4 hình vuông cạnh $x$ (cm) ở 4 góc để gập thành hộp không nắp.\na) Tìm điều kiện của $x$ và viết hàm thể tích $V(x)$.\nb) Tìm $x$ để thể tích lớn nhất.",
                diagram: "fig2_gap_hop_ton.png",
                solution: `
                  <p>a) Điều kiện: $2x < 50 \\Rightarrow 0 < x < 25\\text{ (cm)}$. Thể tích $V(x) = x(80 - 2x)(50 - 2x) = 4x^3 - 260x^2 + 4000x$.</p>
                  <p>b) $V'(x) = 12x^2 - 520x + 4000 = 0 \\Leftrightarrow x = 10\\text{ cm}$ (thỏa mãn) hoặc $x = 100/3$ (loại).</p>
                  <p>Vậy $x = 10\\text{ cm}$, thể tích cực đại đạt $18\\,000\\text{ cm}^3 = 18\\text{ lít}$.</p>
                `
              }
            ]
          }
        },
        {
          id: "12-3",
          title: "Chủ đề 3: Đường tiệm cận của đồ thị hàm số",
          desc: "Tiệm cận đứng, tiệm cận ngang và tiệm cận xiên (Điểm mới CT 2018), tâm đối xứng của đồ thị.",
          icon: "📐",
          color: "#8b5cf6",
          theory: {
            summary: "Định nghĩa & phương pháp xác định tiệm cận (Đứng, Ngang, Xiên)",
            content: `
              <h4>1. Tiệm cận đứng (TCĐ):</h4>
              <p>$x = x_0$ nếu $\\lim_{x \\to x_0^\\pm} f(x) = \\pm \\infty$.</p>
              <h4>2. Tiệm cận ngang (TCN):</h4>
              <p>$y = y_0$ nếu $\\lim_{x \\to \\pm \\infty} f(x) = y_0$.</p>
              <h4>3. Tiệm cận xiên (TCX):</h4>
              <p>$y = ax + b$ ($a \\ne 0$) nếu $\\lim_{x \\to \\pm \\infty} [f(x) - (ax + b)] = 0$. Với hàm phân thức bậc 2/bậc 1: Chia tử cho mẫu $f(x) = ax + b + \\frac{r}{cx + d}$.</p>
            `
          },
          exercises: {
            mcq: [
              {
                id: "12-3-m1",
                question: "Tiệm cận ngang của đồ thị hàm số $y = \\frac{3x - 1}{x + 2}$ là đường thẳng:",
                options: ["A. $y = 3$", "B. $x = -2$", "C. $y = -1/2$", "D. $x = 3$"],
                answer: 0,
                explain: "Ta có $\\lim_{x \\to \\pm\\infty} \\frac{3x - 1}{x + 2} = 3 \\Rightarrow y = 3$ là TCN.",
                level: "Nhận biết"
              },
              {
                id: "12-3-m2",
                question: "Tiệm cận xiên của đồ thị hàm số $y = \\frac{x^2 + 2x - 3}{x - 1}$ khi $x \\ne 1$ có dạng:",
                options: ["A. $y = x + 3$", "B. $y = x - 3$", "C. $y = x + 1$", "D. $y = 2x + 1$"],
                answer: 0,
                explain: "Chia đa thức: $x^2 + 2x - 3 = (x - 1)(x + 3) \\Rightarrow$ Đường tiệm cận xiên là $y = x + 3$.",
                level: "Thông hiểu"
              }
            ],
            tf: [
              {
                id: "12-3-tf1",
                context: "Cho hàm số $y = f(x) = \\frac{2x^2 - 3x + 2}{x - 1}$.",
                items: [
                  { text: "a) Tập xác định là D = ℝ \\ {1}.", answer: true, explain: "Đúng vì mẫu $x - 1 \\ne 0$." },
                  { text: "b) Đạo hàm là f'(x) = (2x² - 4x + 1) / (x - 1)².", answer: true, explain: "Đúng." },
                  { text: "c) Đồ thị có TCĐ x = 1 và TCX y = 2x - 1.", answer: true, explain: "Đúng. Chia tử cho mẫu được $y = 2x - 1 + 1/(x - 1)$." },
                  { text: "d) Hàm số đạt cực tiểu tại x = 1 - √2/2.", answer: false, explain: "Sai. Điểm cực tiểu là nghiệm lớn hơn $x = 1 + \\sqrt{2}/2$." }
                ]
              }
            ],
            shortAnswer: [
              {
                id: "12-3-sa1",
                question: "Cho hàm số $y = \\frac{2x^2 - 3x + 5}{x - 2}$. Giao điểm $I(x_0; y_0)$ của đường TCĐ và TCX có tổng $x_0 + y_0$ bằng:",
                answer: "7",
                acceptAnswers: ["7"],
                explain: "TCĐ: $x = 2 \\Rightarrow x_0 = 2$. Chia đa thức: $y = 2x + 1 + 7/(x - 2) \\Rightarrow$ TCX là $y = 2x + 1$. Tại $x = 2$, $y_0 = 2(2) + 1 = 5$. Tổng $x_0 + y_0 = 2 + 5 = 7$."
              }
            ],
            essay: [
              {
                id: "12-3-es1",
                title: "Khảo sát và chứng minh tâm đối xứng của hàm phân thức",
                question: "Cho hàm số $y = \\frac{x^2 + 2x - 2}{x - 1}$. Xác định TCĐ, TCX và chứng minh giao điểm $I$ của hai tiệm cận là tâm đối xứng.",
                diagram: "fig1_dths_phan_thuc_tcx.png",
                solution: `
                  <p>TCĐ: $x = 1$. TCX: $y = x + 3 + \\frac{1}{x - 1} \\Rightarrow y = x + 3$.</p>
                  <p>Giao điểm $I(1; 4)$. Tịnh tiến tọa độ sang $I(1; 4)$ ta có $Y = X + 1/X$ là hàm lẻ nên nhận $I(1; 4)$ làm tâm đối xứng.</p>
                `
              }
            ]
          }
        },
        {
          id: "12-4",
          title: "Chủ đề 4: Ứng dụng đạo hàm giải toán thực tế & Vòm Parabol",
          desc: "10 bài toán mô hình hóa hình học, cực trị tối ưu vòm parabol, máng xối, hầm elip, vòm Norman.",
          icon: "🌉",
          color: "#f59e0b",
          theory: {
            summary: "Quy trình giải bài toán tối ưu hóa hình học parabol",
            content: `
              <p>1. Chọn hệ trục Oxy (thường Oy là trục đối xứng, Ox trên mặt đất).<br>
                 2. Lập phương trình Parabol: $y = ax^2 + h$ với $a = -4h/L^2$.<br>
                 3. Thiết lập hàm diện tích $S(x) = 2x \\cdot y(x)$.<br>
                 4. Lấy đạo hàm $S'(x) = 0$ tìm cực trị.<br>
                 5. Kết luận kích thước và diện tích tối ưu.</p>
            `
          },
          exercises: {
            mcq: [
              {
                id: "12-4-m1",
                question: "Một cổng chào hình parabol có chiều rộng chân cổng $L = 10\\text{ m}$ và chiều cao đỉnh $h = 6\\text{ m}$. Diện tích lớn nhất của tấm biển quảng cáo hình chữ nhật đặt bên trong cổng là:",
                options: ["A. $20\\sqrt{3}\\text{ m}^2$", "B. $30\\text{ m}^2$", "C. $25\\text{ m}^2$", "D. $40\\text{ m}^2$"],
                answer: 0,
                explain: "Parabol: $y = -\\frac{6}{25}x^2 + 6$. $S(x) = 2x(-\\frac{6}{25}x^2 + 6) = -\\frac{12}{25}x^3 + 12x$. $S'(x) = 0 \\Leftrightarrow x = 5/\\sqrt{3} \\Rightarrow S_{\\max} = 20\\sqrt{3}\\text{ m}^2$.",
                level: "Vận dụng cao"
              }
            ],
            tf: [
              {
                id: "12-4-tf1",
                context: "Cửa sổ vòm Norman gồm một hình chữ nhật phía dưới và nửa hình tròn phía trên với chu vi khung cửa cố định $P = 4\\text{ m}$.",
                items: [
                  { text: "a) Chiều rộng phần hình chữ nhật bằng 2r (r là bán kính nửa hình tròn).", answer: true, explain: "Đúng." },
                  { text: "b) Chu vi khung cửa là P = 2h + 2r + πr.", answer: true, explain: "Đúng." },
                  { text: "c) Để diện tích lấy sáng lớn nhất thì bán kính r = 4 / (4 + π).", answer: true, explain: "Đúng." },
                  { text: "d) Chiều cao h của hình chữ nhật gấp đôi bán kính r.", answer: false, explain: "Sai. Khi tối ưu thì h = r." }
                ]
              }
            ],
            shortAnswer: [
              {
                id: "12-4-sa1",
                question: "Hầm đường bộ parabol rộng 8m, cao 6m. Chiều cao tối đa (mét) của xe tải rộng 4m đi qua chính giữa hầm là:",
                answer: "4.5",
                acceptAnswers: ["4.5", "9/2", "4,5"],
                explain: "Phương trình: $y = -3/8 x^2 + 6$. Xe rộng 4m $\\Rightarrow x = 2$. Chiều cao tối đa $y(2) = -3/8(4) + 6 = 4.5\\text{ m}$."
              }
            ],
            essay: [
              {
                id: "12-4-es1",
                title: "Mô hình cổng Parabol 10m x 6m",
                question: "Cổng chào parabol rộng 10m, cao 6m. Tìm kích thước khung chữ nhật diện tích lớn nhất bên trong cổng.",
                diagram: "fig1_cong_parabol_10m_6m.png",
                solution: `<p>Phương trình $y = -\\frac{6}{25}x^2 + 6$. Kích thước tối ưu: chiều rộng $2x = \\frac{10\\sqrt{3}}{3} \\approx 5.77\\text{ m}$, chiều cao $y = 4\\text{ m}$. Diện tích lớn nhất $S_{\\max} \\approx 23.09\\text{ m}^2$.</p>`
              }
            ]
          }
        },
        {
          id: "12-5",
          title: "Chủ đề 5: Vectơ trong không gian & Hệ trục tọa độ Oxyz",
          desc: "Quy tắc hình hộp, quy tắc 3 điểm, trọng tâm tứ diện, tích vô hướng, góc và bài toán cân bằng lực 3D.",
          icon: "🧭",
          color: "#06b6d4",
          theory: {
            summary: "Quy tắc hình hộp & Cân bằng lực không gian",
            content: `
              <p>1. Quy tắc hình hộp: $\\vec{AC'} = \\vec{AB} + \\vec{AD} + \\vec{AA'}$.<br>
                 2. Trọng tâm tứ diện $G$: $\\vec{GA} + \\vec{GB} + \\vec{GC} + \\vec{GD} = \\vec{0}$.<br>
                 3. Cân bằng lực: $\\vec{F}_1 + \\vec{F}_2 + \\dots + \\vec{F}_n = \\vec{0}$.</p>
            `
          },
          exercises: {
            mcq: [
              {
                id: "12-5-m1",
                question: "Cho hình hộp $ABCD.A'B'C'D'$. Tổng vectơ $\\vec{AB} + \\vec{AD} + \\vec{AA'}$ bằng:",
                options: ["A. $\\vec{AC'}$", "B. $\\vec{CA'}$", "C. $\\vec{BD'}$", "D. $\\vec{A'C}$"],
                answer: 0,
                explain: "Theo quy tắc hình hộp, tổng 3 vectơ cạnh xuất phát từ A bằng vectơ đường chéo $\\vec{AC'}$.",
                level: "Nhận biết"
              },
              {
                id: "12-5-m2",
                question: "Cho tứ diện đều $ABCD$ cạnh $a$. Tích vô hướng $\\vec{AB} \\cdot \\vec{AC}$ bằng:",
                options: ["A. $\\frac{a^2}{2}$", "B. $-\\frac{a^2}{2}$", "C. $\\frac{a^2\\sqrt{3}}{2}$", "D. 0"],
                answer: 0,
                explain: "Tam giác ABC đều $\\Rightarrow \\widehat{BAC} = 60^\\circ$. $\\vec{AB} \\cdot \\vec{AC} = a \\cdot a \\cdot \\cos 60^\\circ = a^2/2$.",
                level: "Thông hiểu"
              }
            ],
            tf: [
              {
                id: "12-5-tf1",
                context: "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có $AB = 3, AD = 4, AA' = 5$.",
                items: [
                  { text: "a) Vectơ AC' = AB + AD + AA'.", answer: true, explain: "Đúng theo quy tắc hình hộp." },
                  { text: "b) Độ dài đường chéo AC' = 5√2.", answer: true, explain: "Đúng. AC' = √(3² + 4² + 5²) = √50 = 5√2." },
                  { text: "c) Tích vô hướng vectơ AB . vectơ A'D = 0.", answer: true, explain: "Đúng vì AB ⊥ (ADD'A') nên AB ⊥ A'D." },
                  { text: "d) Cosin của góc giữa AC' và BD bằng 7 / (50√2).", answer: false, explain: "Sai. Kết quả đúng là 7 / (25√2)." }
                ]
              }
            ],
            shortAnswer: [
              {
                id: "12-5-sa1",
                question: "Ba lực $\\vec{F}_1, \\vec{F}_2, \\vec{F}_3$ cùng tác dụng vào điểm $O$ cân bằng. Biết $|\\vec{F}_1| = 30\\text{ N}, |\\vec{F}_2| = 40\\text{ N}, \\vec{F}_1 \\perp \\vec{F}_2$. Độ lớn của lực $\\vec{F}_3$ (Newton) là:",
                answer: "50",
                acceptAnswers: ["50", "50 N", "50N"],
                explain: "$|\\vec{F}_3| = \\sqrt{30^2 + 40^2} = 50\\text{ N}$."
              }
            ],
            essay: [
              {
                id: "12-5-es1",
                title: "Bài toán cân bằng lực treo đèn chùm",
                question: "Đèn chùm nặng 120 N treo bởi 3 dây cáp OA, OB, OC vào 3 đỉnh tam giác đều cạnh 1.2m trên trần nhà, chiều cao h = 0.8m. Tính lực căng dây cáp.",
                diagram: "fig4_can_bang_luc_den_chum.png",
                solution: `<p>Bán kính $R = 0.4\\sqrt{3}\\text{ m}$. Dây cáp $l = \\sqrt{0.8^2 + (0.4\\sqrt{3})^2} = \\sqrt{1.12}\\text{ m}$. Cân bằng lực theo phương đứng: $3 T \\cos \\alpha = P \\Rightarrow T \\approx 52.92\\text{ N}$.</p>`
              }
            ]
          }
        }
      ]
    },
    {
      id: "11",
      name: "Toán 11",
      subtitle: "Hàm số lượng giác, Dãy số, Giới hạn, Đạo hàm & Hình học không gian",
      status: "preview",
      badge: "Sắp ra mắt",
      topics: [
        { id: "11-1", title: "Chủ đề 1: Hàm số lượng giác & Phương trình lượng giác", desc: "Tập xác định, chu kì, đồ thị.", icon: "〰️", color: "#ec4899" },
        { id: "11-2", title: "Chủ đề 2: Dãy số, Cấp số cộng & Cấp số nhân", desc: "Số hạng tổng quát, tính tổng n số hạng.", icon: "🔢", color: "#8b5cf6" },
        { id: "11-3", title: "Chủ đề 3: Giới hạn & Hàm số liên tục", desc: "Giới hạn dãy số, giới hạn hàm số.", icon: "♾️", color: "#14b8a6" },
        { id: "11-4", title: "Chủ đề 4: Đạo hàm & Tiếp tuyến", desc: "Quy tắc tính đạo hàm và tiếp tuyến.", icon: "📐", color: "#f97316" }
      ]
    },
    {
      id: "10",
      name: "Toán 10",
      subtitle: "Mệnh đề, Tập hợp, Bất phương trình, Hàm số bậc 2 & Vectơ",
      status: "preview",
      badge: "Sắp ra mắt",
      topics: [
        { id: "10-1", title: "Chủ đề 1: Mệnh đề & Tập hợp", desc: "Mệnh đề, tập hợp số thực.", icon: "🎯", color: "#6366f1" },
        { id: "10-2", title: "Chủ đề 2: Bất phương trình & Hệ BPT bậc nhất hai ẩn", desc: "Miền nghiệm, quy hoạch tuyến tính.", icon: "📊", color: "#10b981" },
        { id: "10-3", title: "Chủ đề 3: Hàm số bậc hai & Tam thức bậc hai", desc: "Khảo sát parabol, xét dấu tam thức.", icon: "📉", color: "#eab308" }
      ]
    }
  ],

  // ==============================================================================
  // CÁC KỲ THI TRONG PHÂN HỆ LUYỆN THI
  // ==============================================================================
  examCategories: [
    {
      id: "gk1",
      name: "Thi Giữa Học Kỳ 1",
      shortName: "Giữa HK1",
      grade: "12",
      desc: "Chuyên sâu Khảo sát hàm số, GTLN-GTNN, Tiệm cận xiên, Toán thực tế Parabol & Vectơ Oxyz",
      icon: "📑",
      badge: "7 Đề Chuẩn 2025",
      status: "active",
      examsKey: "midtermExams"
    },
    {
      id: "ck1",
      name: "Thi Cuối Học Kỳ 1",
      shortName: "Cuối HK1",
      grade: "12",
      desc: "Toàn bộ kiến thức Học kỳ 1: Khảo sát hàm số, Vectơ và Hệ trục tọa độ không gian Oxyz",
      icon: "📋",
      badge: "Sắp ra mắt",
      status: "preview",
      examsKey: null
    },
    {
      id: "gk2",
      name: "Thi Giữa Học Kỳ 2",
      shortName: "Giữa HK2",
      grade: "12",
      desc: "Nguyên hàm, Tích phân và Ứng dụng, Phương pháp tọa độ trong không gian Oxyz",
      icon: "📝",
      badge: "Sắp ra mắt",
      status: "preview",
      examsKey: null
    },
    {
      id: "ck2",
      name: "Thi Cuối Học Kỳ 2",
      shortName: "Cuối HK2",
      grade: "12",
      desc: "Tổng hợp toàn diện kiến thức Toán 12 theo cấu trúc ma trận chuẩn",
      icon: "📊",
      badge: "Sắp ra mắt",
      status: "preview",
      examsKey: null
    },
    {
      id: "thpt",
      name: "Thi Tốt Nghiệp THPT & ĐGNL",
      shortName: "Thi THPT & ĐGNL",
      grade: "12",
      desc: "Đề thi thử Tốt nghiệp THPT 2025, Đánh giá năng lực ĐHQG Hà Nội (HSA), ĐHQG TP.HCM (V-SAT), ĐHBK (TSA)",
      icon: "🎓",
      badge: "VIP 2025",
      status: "preview",
      examsKey: null
    }
  ],

  // ==============================================================================
  // TOÀN BỘ BỘ ĐỀ THI ÔN TẬP & KIỂM TRA GIỮA HỌC KỲ I - TOÁN 12
  // 7 Đề thi chính thức từ Đề gk1.pdf (Đề số 6 đến Đề số 12)
  // ==============================================================================
  midtermExams: (window.EXAMS_PART1 || []).concat(window.EXAMS_PART2 || [])
};
