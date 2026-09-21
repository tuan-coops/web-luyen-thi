// ==============================================================================
// BỘ ĐỀ THI GIỮA HỌC KỲ I - TOÁN 12 (PHẦN 2: ĐỀ SỐ 9, 10, 11, 12)
// Trích xuất từ đề thi chính thức: "Đề gk1.pdf" - Chuẩn ma trận Bộ GD&ĐT 2025
// ==============================================================================

window.EXAMS_PART2 = [
  {
    id: "gk1-de-so-9",
    title: "Đề 4: Đề Ôn Tập Giữa Học Kỳ I - Đề Số 9",
    subtitle: "Khảo sát hàm số, Bảng xét dấu đạo hàm, Tương giao & Vectơ không gian (Đề số 9)",
    timeMinutes: 90,
    totalQuestions: 22,
    maxScore: 10.0,
    badge: "Đề Số 9 (Chuẩn 2025)",
    sections: {
      part1: {
        name: "Phần I: Câu hỏi trắc nghiệm 4 lựa chọn",
        desc: "12 câu hỏi (3.0 điểm - Mỗi câu đúng được 0.25 điểm)",
        questions: [
          {
            id: "gk1-s9-p1-1",
            text: "Cho hàm số $y = f(x)$ có bảng xét dấu của đạo hàm với $f'(x) < 0$ trên $(-1; 1)$ và $f'(x) > 0$ trên các khoảng còn lại. Hàm số đã cho nghịch biến trên khoảng nào dưới đây?",
            options: ["A. $(1; +\\infty)$", "B. $(-\\infty; 1)$", "C. $(-1; 1)$", "D. $(-\\infty; -1)$"],
            answer: 2,
            explain: "Đạo hàm mang dấu âm trên khoảng $(-1; 1)$ nên hàm số nghịch biến trên $(-1; 1)$."
          },
          {
            id: "gk1-s9-p1-2",
            text: "Cho hàm số $f(x)$ liên tục trên $\\mathbb{R}$ và có bảng xét dấu $f'(x)$ đổi dấu từ âm sang dương 2 lần và từ dương sang âm 1 lần. Số điểm cực tiểu của hàm số là:",
            options: ["A. 1", "B. 2", "C. 3", "D. 4"],
            answer: 1,
            explain: "Số điểm cực tiểu ứng với số lần đạo hàm đổi dấu từ âm sang dương, tức là 2 lần."
          },
          {
            id: "gk1-s9-p1-3",
            text: "Cho hàm số $y = f(x)$ xác định và liên tục trên $\\mathbb{R}$ có đồ thị trên $[-2; 2]$ đạt giá trị thấp nhất tại tung độ $-5$ và cao nhất tại tung độ $0$. Tìm giá trị nhỏ nhất $m$ và lớn nhất $M$:",
            options: ["A. $m = -5; M = -1$", "B. $m = -2; M = 2$", "C. $m = -1; M = 0$", "D. $m = -5; M = 0$"],
            answer: 3,
            explain: "Điểm thấp nhất có tung độ $-5$ và cao nhất có tung độ $0$, do đó $m = -5, M = 0$."
          },
          {
            id: "gk1-s9-p1-4",
            text: "Giá trị nhỏ nhất của hàm số $f(x) = x^4 - 10x^2 - 2$ trên đoạn $[0; 9]$ bằng:",
            options: ["A. -2", "B. -11", "C. -26", "D. -27"],
            answer: 3,
            explain: "$f'(x) = 4x^3 - 20x = 0 \\Leftrightarrow x = 0$ hoặc $x = \\sqrt{5} \\in [0; 9]$. $f(0) = -2, f(\\sqrt{5}) = -27, f(9) = 5749$. Giá trị nhỏ nhất là $-27$."
          },
          {
            id: "gk1-s9-p1-5",
            text: "Tiệm cận ngang của đồ thị hàm số $y = \\frac{2x + 1}{x - 1}$ là đường thẳng:",
            options: ["A. $y = 1/2$", "B. $y = -1$", "C. $y = 1$", "D. $y = 2$"],
            answer: 3,
            explain: "$\\lim_{x \\to \\pm\\infty} \\frac{2x + 1}{x - 1} = 2$, vậy tiệm cận ngang là đường thẳng $y = 2$."
          },
          {
            id: "gk1-s9-p1-6",
            text: "Đường thẳng $x = -1$ là tiệm cận đứng của đồ thị hàm số nào sau đây?",
            options: [
              "A. $y = \\frac{x^2 + 3x + 2}{x^2 - 1}$",
              "B. $y = \\frac{x^2 - 3x + 2}{x^2 - 1}$",
              "C. $y = \\frac{x + 1}{x^2 + 4x + 3}$",
              "D. $y = \\frac{x + 1}{x^2 + 1}$"
            ],
            answer: 1,
            explain: "$y = \\frac{x^2 - 3x + 2}{x^2 - 1} = \\frac{x - 2}{x + 1}$. Mẫu triệt tiêu tại $x = -1$ và tử tại $-1$ bằng $-3 \\ne 0$, nên $x = -1$ là tiệm cận đứng."
          },
          {
            id: "gk1-s9-p1-7",
            text: "Hàm số nào dưới đây có tiệm cận đứng $x = 2$, cực đại tại $x = 0$ ($y = -2$) và cực tiểu tại $x = 4$ ($y = 6$)?",
            options: [
              "A. $y = \\frac{3x^2 - 10x + 4}{x - 2}$",
              "B. $y = \\frac{x^2 - 6x + 4}{x - 2}$",
              "C. $y = \\frac{-x^2 + 6x + 4}{x - 2}$",
              "D. $y = \\frac{x^2 - 2x + 4}{x - 2}$"
            ],
            answer: 3,
            explain: "Hàm số $y = \\frac{x^2 - 2x + 4}{x - 2} = x + \\frac{4}{x - 2}$ có tiệm cận đứng $x = 2$ và 2 điểm cực trị $x = 0, x = 4$."
          },
          {
            id: "gk1-s9-p1-8",
            text: "Đồ thị hàm số đối xứng hình chữ W cắt trục tung tại điểm $(0; 1)$ và có 3 điểm cực trị là của hàm số nào?",
            options: ["A. $y = x^2 + 2x + 1$", "B. $y = x^4 - 2x^2 + 1$", "C. $y = x^3 - 2x + 1$", "D. $y = -x^4 + 2x + 1$"],
            answer: 1,
            explain: "Đồ thị dạng chữ W là hàm bậc 4 trùng phương với hệ số $a > 0$ và 3 cực trị, cắt trục tung tại $(0; 1)$: $y = x^4 - 2x^2 + 1$."
          },
          {
            id: "gk1-s9-p1-9",
            text: "Cho hình hộp $ABCD.A'B'C'D'$. Biểu thức nào sau đây ĐÚNG?",
            options: [
              "A. $\\vec{A'D} = \\vec{A'B'} + \\vec{A'C}$",
              "B. $\\vec{AB'} = \\vec{AB} + \\vec{AA'} + \\vec{AD}$",
              "C. $\\vec{AC'} = \\vec{AB} + \\vec{AA'} + \\vec{AD}$",
              "D. $\\vec{AD'} = \\vec{AB} + \\vec{AD} + \\vec{AC'}$"
            ],
            answer: 2,
            explain: "Theo quy tắc hình hộp: $\\vec{AC'} = \\vec{AB} + \\vec{AD} + \\vec{AA'}$."
          },
          {
            id: "gk1-s9-p1-10",
            text: "Cho tứ diện $ABCD$. Gọi $M, N$ lần lượt là trung điểm của $AD$ và $BC$. Khẳng định nào sau đây SAI?",
            options: [
              "A. $\\vec{AB} + \\vec{CD} = \\vec{CB} + \\vec{AD}$",
              "B. $2\\vec{MN} = \\vec{AB} + \\vec{DC}$",
              "C. $\\vec{AD} + 2\\vec{MN} = \\vec{AB} + \\vec{AC}$",
              "D. $2\\vec{MN} = \\vec{AB} + \\vec{AC} + \\vec{AD}$"
            ],
            answer: 3,
            explain: "Mệnh đề D sai vì vế phải không tương đương với $2\\vec{MN}$."
          },
          {
            id: "gk1-s9-p1-11",
            text: "Trong không gian $Oxyz$, hình chiếu vuông góc của điểm $A(1; 2; 5)$ trên trục $Ox$ có tọa độ là:",
            options: ["A. $(0; 2; 0)$", "B. $(0; 0; 5)$", "C. $(1; 0; 0)$", "D. $(0; 2; 5)$"],
            answer: 2,
            explain: "Hình chiếu lên $Ox$ giữ nguyên hoành độ $x$, triệt tiêu $y$ và $z$: $(1; 0; 0)$."
          },
          {
            id: "gk1-s9-p1-12",
            text: "Trong không gian $Oxyz$, cho hai điểm $A(4; -2; 10)$ và $O(0; 0; 0)$. Trung điểm $I$ của đoạn thẳng $OA$ có tọa độ là:",
            options: ["A. $(4; -2; 10)$", "B. $(1; 3; 2)$", "C. $(2; 6; 4)$", "D. $(2; -1; 5)$"],
            answer: 3,
            explain: "$I = (4/2; -2/2; 10/2) = (2; -1; 5)$."
          }
        ]
      },
      part2: {
        name: "Phần II: Câu hỏi trắc nghiệm Đúng / Sai",
        desc: "4 câu hỏi (16 ý - 4.0 điểm. Đúng 1 ý: 0.1đ | Đúng 2 ý: 0.25đ | Đúng 3 ý: 0.5đ | Đúng 4 ý: 1.0đ)",
        questions: [
          {
            id: "gk1-s9-p2-1",
            context: "Câu 1. Biết rằng hàm số $f(x) = 2x^3 + ax^2 - 6x + b$ ($a, b \\in \\mathbb{R}$) đạt cực trị bằng 4 tại $x = 1$.",
            items: [
              { text: "a) Giá trị của a + b bằng 8.", answer: true, explain: "Đúng: f'(1) = 6 + 2a - 6 = 2a = 0 => a = 0. f(1) = 2 - 6 + b = 4 => b = 8. Vậy a + b = 8." },
              { text: "b) Hàm số đạt cực đại tại x = 1.", answer: false, explain: "Sai: f''(1) = 12 > 0 nên x = 1 là điểm cực tiểu." },
              { text: "c) x = -1 là một điểm cực trị của hàm số f(x).", answer: true, explain: "Đúng: f'(x) = 6(x² - 1) = 0 có nghiệm x = -1." },
              { text: "d) Giá trị cực tiểu của hàm số f(x) bằng 12.", answer: false, explain: "Sai vì giá trị cực tiểu bằng 4, 12 là giá trị cực đại tại x = -1." }
            ]
          },
          {
            id: "gk1-s9-p2-2",
            context: "Câu 2. Cho hàm số $y = f(x)$ có bảng biến thiên với cực đại tại $x = 1$ ($y = 9/20$) và cực tiểu tại $x = 2$ ($y = 3/5$).",
            items: [
              { text: "a) Hàm số đồng biến trên khoảng (-∞; 1).", answer: true, explain: "Đúng theo bảng biến thiên, f'(x) > 0 trên (-∞; 1)." },
              { text: "b) Hàm số đạt cực đại tại x = 1 và đạt cực tiểu tại x = 2.", answer: true, explain: "Đúng: đạo hàm đổi dấu tương ứng." },
              { text: "c) Hàm số có 3 cực trị.", answer: false, explain: "Sai vì hàm số chỉ có 2 điểm cực trị." },
              { text: "d) Hàm số có giá trị lớn nhất bằng 9/20 và nhỏ nhất bằng 3/5.", answer: false, explain: "Sai vì giới hạn ở hai đầu vô cực nên hàm không có GTLN, GTNN trên ℝ." }
            ]
          },
          {
            id: "gk1-s9-p2-3",
            context: "Câu 3. Cho hàm số $y = \\frac{3x - 1}{x - 1}$ $(C)$ và đường thẳng $d: y = x + 3$. Xét tính đúng sai:",
            items: [
              { text: "a) Đồ thị (C) có tiệm cận ngang là đường thẳng y = 1.", answer: false, explain: "Sai vì tiệm cận ngang là y = 3." },
              { text: "b) Đồ thị (C) có tiệm cận đứng là đường thẳng x = 3.", answer: false, explain: "Sai vì tiệm cận đứng là x = 1." },
              { text: "c) d cắt (C) tại hai điểm phân biệt có hoành độ x1, x2 thỏa mãn x1 + x2 = 1.", answer: true, explain: "Đúng: (3x-1)/(x-1) = x + 3 <=> x² - x - 2 = 0 => x1 + x2 = 1." },
              { text: "d) d cắt (C) tại hai điểm phân biệt A, B và AB = 3√2.", answer: true, explain: "Đúng: x1 = -1 => A(-1; 2); x2 = 2 => B(2; 5) => AB = √18 = 3√2." }
            ]
          },
          {
            id: "gk1-s9-p2-4",
            context: "Câu 4. Trong không gian $Oxyz$, cho ba vectơ $\\vec{a} = (3; 0; 4), \\vec{b} = (2; 7; 7)$ và $\\vec{c} = (2; 7; 2)$.",
            items: [
              { text: "a) a - b + c = (3; 0; -1).", answer: true, explain: "Đúng: (3-2+2; 0-7+7; 4-7+2) = (3; 0; -1)." },
              { text: "b) 2a + 3b - 4c = (4; -7; 21).", answer: true, explain: "Đúng: (6+6-8; 0+21-28; 8+21-8) = (4; -7; 21)." },
              { text: "c) (-a)·b + (3a)·c = 10.", answer: false, explain: "Sai: (-a)·b = -34, 3a·c = 42, tổng bằng 8." },
              { text: "d) cos(a, b) < cos(a, c).", answer: true, explain: "Đúng." }
            ]
          }
        ]
      },
      part3: {
        name: "Phần III: Câu hỏi trắc nghiệm trả lời ngắn (Điền số)",
        desc: "6 câu hỏi (3.0 điểm - Mỗi câu đúng được 0.5 điểm)",
        questions: [
          {
            id: "gk1-s9-p3-1",
            text: "Câu 1. Biết rằng đồ thị hàm số $f(x) = x^4 - x^2$ có một trục đối xứng là đường thẳng $x = a$. Giá trị của $a$ bằng bao nhiêu?",
            answer: "0",
            acceptAnswers: ["0", "a=0", "0.0"],
            explain: "Hàm số chẵn nên nhận trục tung $x = 0$ làm trục đối xứng. Vậy $a = 0$."
          },
          {
            id: "gk1-s9-p3-2",
            text: "Câu 2. Quần thể cá trong hồ nhân tạo có số lượng $N(t) = \\frac{20(4 + 3t)}{1 + 0.05t}$ (nghìn con), với $t$ là số năm. Số lượng tối đa có thể có của quần thể cá là bao nhiêu nghìn con?",
            answer: "1200",
            acceptAnswers: ["1200", "1200 nghìn con", "1200.0"],
            explain: "$\\lim_{t \\to +\\infty} N(t) = 60 / 0.05 = 1200$ nghìn con."
          },
          {
            id: "gk1-s9-p3-3",
            text: "Câu 3. Chi phí trung bình sản xuất $x$ tạ sản phẩm mỗi ngày là $C(x) = x + 3 + \\frac{16}{x}$ (triệu đồng/tạ) với $x > 0$. Chi phí trung bình thấp nhất là bao nhiêu triệu đồng/tạ?",
            answer: "11",
            acceptAnswers: ["11", "11.0", "11 triệu đồng/tạ"],
            explain: "Theo BĐT Cauchy: $x + 16/x \\ge 8 \\Rightarrow C(x) \\ge 8 + 3 = 11$ triệu đồng/tạ."
          },
          {
            id: "gk1-s9-p3-4",
            text: "Câu 4. Cho hình lăng trụ $ABC.A'B'C'$. Gọi $I$ và $J$ là trung điểm $BB'$ và $A'C'$, $K \\in B'C'$ sao cho $\\vec{KC'} = -2\\vec{KB'}$. Khi đó $\\vec{AK} = m\\vec{AI} + n\\vec{AJ}$. Tính $m + n$ (Làm tròn đến hàng phần trăm):",
            answer: "1.67",
            acceptAnswers: ["1.67", "1,67", "5/3"],
            explain: "Phân tích vectơ: $m = 2/3, n = 1 \\Rightarrow m + n = 5/3 \\approx 1.67$."
          },
          {
            id: "gk1-s9-p3-5",
            text: "Câu 5. Trong không gian $Oxyz$, cho $\\vec{a} = (-1; 2; 0), \\vec{b} = (3; -1; 2), \\vec{c} = (1; 2; -1)$ và $\\vec{w}$ thỏa mãn $\\vec{a}\\cdot\\vec{w} = -12, \\vec{b}\\cdot\\vec{w} = 20, \\vec{c}\\cdot\\vec{w} = -6$. Tính $|\\vec{w}|$ (kết quả làm tròn đến hàng đơn vị):",
            answer: "10",
            acceptAnswers: ["10", "10.0"],
            explain": "Giải hệ 3 phương trình tìm được $\\vec{w} = (8; -2; 6) \\Rightarrow |\\vec{w}| = \\sqrt{64 + 4 + 36} = \\sqrt{104} \\approx 10$."
          },
          {
            id: "gk1-s9-p3-6",
            text: "Câu 6. Cho các số thực $x, y$ thỏa mãn $x^2 - xy + y^2 = 2$. Giá trị nhỏ nhất của $P = x^2 + xy + y^2$ bằng bao nhiêu? (Làm tròn đến hàng phần trăm)",
            answer: "0.67",
            acceptAnswers: ["0.67", "0,67", "2/3"],
            explain: "$P = 2 + 2xy$. Ta có $(x+y)^2 \\ge 0 \\Rightarrow 2 + 3xy \\ge 0 \\Rightarrow xy \\ge -2/3$. Do đó $P \\ge 2 - 4/3 = 2/3 \\approx 0.67$."
          }
        ]
      }
    }
  },
  {
    id: "gk1-de-so-10",
    title: "Đề 5: Đề Ôn Tập Giữa Học Kỳ I - Đề Số 10",
    subtitle: "Khoảng cách đến tiệm cận xiên, Đồ thị đạo hàm, Bài toán cực trị kinh tế & Hợp lực 3D (Đề số 10)",
    timeMinutes: 90,
    totalQuestions: 22,
    maxScore: 10.0,
    badge: "Đề Số 10 (Chuẩn 2025)",
    sections: {
      part1: {
        name: "Phần I: Câu hỏi trắc nghiệm 4 lựa chọn",
        desc: "12 câu hỏi (3.0 điểm - Mỗi câu đúng được 0.25 điểm)",
        questions: [
          {
            id: "gk1-s10-p1-1",
            text: "Cho hàm số $y = f(x)$ có bảng biến thiên với $f'(x) < 0$ trên $(-1; 0)$ và $(1; +\\infty)$. Hàm số đã cho nghịch biến trên khoảng nào dưới đây?",
            options: ["A. $(-1; 0)$", "B. $(-\\infty; 0)$", "C. $(1; +\\infty)$", "D. $(0; 1)$"],
            answer: 0,
            explain: "Trên khoảng $(-1; 0)$ đạo hàm mang dấu âm nên hàm số nghịch biến."
          },
          {
            id: "gk1-s10-p1-2",
            text: "Cho hàm số $f(x)$ có đạo hàm $f'(x) = x(x - 1)(x + 4), \\forall x \\in \\mathbb{R}$. Số điểm cực đại của hàm số đã cho là:",
            options: ["A. 3", "B. 4", "C. 2", "D. 1"],
            answer: 3,
            explain: "$f'(x)$ đổi dấu từ dương sang âm chỉ tại $x = 0$. Vậy hàm số có 1 điểm cực đại."
          },
          {
            id: "gk1-s10-p1-3",
            text: "Cho hàm số $y = f(x)$ liên tục trên $[-1; 3]$ có đỉnh cao nhất tại $x = 0$. Khẳng định nào sau đây ĐÚNG?",
            options: [
              "A. $\\max_{[-1; 3]} f(x) = f(0)$",
              "B. $\\max_{[-1; 3]} f(x) = f(3)$",
              "C. $\\max_{[-1; 3]} f(x) = f(2)$",
              "D. $\\max_{[-1; 3]} f(x) = f(-1)$"
            ],
            answer: 0,
            explain: "Đỉnh cao nhất của đồ thị trên $[-1; 3]$ đạt tại $x = 0$, do đó $\\max_{[-1; 3]} f(x) = f(0)$."
          },
          {
            id: "gk1-s10-p1-4",
            text: "Giá trị nhỏ nhất của hàm số $f(x) = x^4 - 12x^2 - 1$ trên đoạn $[0; 9]$ bằng:",
            options: ["A. -28", "B. -1", "C. -36", "D. -37"],
            answer: 3,
            explain: "$f'(x) = 0 \\Leftrightarrow x = \\sqrt{6}$. $f(\\sqrt{6}) = 36 - 72 - 1 = -37$. Giá trị nhỏ nhất bằng $-37$."
          },
          {
            id: "gk1-s10-p1-5",
            text: "Tiệm cận ngang của đồ thị hàm số $y = \\frac{3x + 1}{x - 1}$ là:",
            options: ["A. $y = 1/3$", "B. $y = 3$", "C. $y = -1$", "D. $y = 1$"],
            answer: 1,
            explain: "$\\lim_{x \\to \\pm\\infty} \\frac{3x + 1}{x - 1} = 3$, do đó tiệm cận ngang là $y = 3$."
          },
          {
            id: "gk1-s10-p1-6",
            text: "Cho hàm số $y = 2x - 1 + \\frac{3}{x + 3}$. Khoảng cách từ điểm $M(2; -1)$ đến tiệm cận xiên của đồ thị là:",
            options: ["A. $2/\\sqrt{5}$", "B. $4/\\sqrt{5}$", "C. 2", "D. 4"],
            answer: 1,
            explain: "Tiệm cận xiên: $2x - y - 1 = 0$. Khoảng cách $d = \\frac{|2(2) - (-1) - 1|}{\\sqrt{4 + 1}} = \\frac{4}{\\sqrt{5}}$."
          },
          {
            id: "gk1-s10-p1-7",
            text: "Bảng biến thiên có tiệm cận đứng $x = -2$, tiệm cận xiên $y = -2x$ là của hàm số nào?",
            options: [
              "A. $y = \\frac{-2x^2 - 4x - 1}{x + 2}$",
              "B. $y = \\frac{-2x^2 - 4x + 1}{x + 2}$",
              "C. $y = \\frac{-2x^2 - 3x - 2}{x + 2}$",
              "D. $y = \\frac{-2x^2 - 3x + 1}{x + 2}$"
            ],
            answer: 0,
            explain: "$\\frac{-2x^2 - 4x - 1}{x + 2} = -2x - \\frac{1}{x + 2}$ có tiệm cận xiên $y = -2x$ và tiệm cận đứng $x = -2$."
          },
          {
            id: "gk1-s10-p1-8",
            text: "Cho hàm số bậc ba $y = f(x)$ có đồ thị cắt đường thẳng $y = 1$ tại 3 điểm phân biệt. Số nghiệm thực của phương trình $f(x) = 1$ là:",
            options: ["A. 0", "B. 3", "C. 1", "D. 2"],
            answer: 1,
            explain: "Đồ thị cắt $y = 1$ tại 3 điểm phân biệt nên phương trình có 3 nghiệm thực."
          },
          {
            id: "gk1-s10-p1-9",
            text: "Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành. Khẳng định nào sau đây ĐÚNG?",
            options: [
              "A. $\\vec{SA} + \\vec{SD} = \\vec{SB} + \\vec{SC}$",
              "B. $\\vec{SA} + \\vec{SB} + \\vec{SC} + \\vec{SD} = \\vec{0}$",
              "C. $\\vec{SA} + \\vec{SC} = \\vec{SB} + \\vec{SD}$",
              "D. $\\vec{SA} + \\vec{SB} = \\vec{SC} + \\vec{SD}$"
            ],
            answer: 2,
            explain: "$\\vec{SA} + \\vec{SC} = 2\\vec{SO} = \\vec{SB} + \\vec{SD}$ với $O$ là tâm đáy."
          },
          {
            id: "gk1-s10-p1-10",
            text: "Cho lăng trụ tam giác $ABC.A'B'C'$. Vectơ nào là vectơ chỉ phương của đường thẳng $AB$?",
            options: ["A. $\\vec{A'B'}$", "B. $\\vec{A'C}$", "C. $\\vec{AC}$", "D. $\\vec{B'C'}$"],
            answer: 0,
            explain: "Đường thẳng $A'B'$ song song với $AB$ nên $\\vec{A'B'}$ là vectơ chỉ phương của $AB$."
          },
          {
            id: "gk1-s10-p1-11",
            text: "Trong không gian $Oxyz$, hình chiếu vuông góc của điểm $M(3; 1; -1)$ trên trục $Oy$ có tọa độ là:",
            options: ["A. $(3; 0; -1)$", "B. $(0; 1; 0)$", "C. $(3; 0; 0)$", "D. $(0; 0; -1)$"],
            answer: 1,
            explain: "Chiếu lên $Oy$ giữ nguyên tung độ $y$: $(0; 1; 0)$."
          },
          {
            id: "gk1-s10-p1-12",
            text: "Trong không gian $Oxyz$, cho $A(3; -2; 3)$ và $B(-1; 2; 5)$. Tọa độ trung điểm $I$ của $AB$ là:",
            options: ["A. $I(-2; 2; 1)$", "B. $I(1; 0; 4)$", "C. $I(2; 0; 8)$", "D. $I(2; -2; -1)$"],
            answer: 1,
            explain: "$I = (1; 0; 4)$."
          }
        ]
      },
      part2: {
        name: "Phần II: Câu hỏi trắc nghiệm Đúng / Sai",
        desc: "4 câu hỏi (16 ý - 4.0 điểm. Đúng 1 ý: 0.1đ | Đúng 2 ý: 0.25đ | Đúng 3 ý: 0.5đ | Đúng 4 ý: 1.0đ)",
        questions: [
          {
            id: "gk1-s10-p2-1",
            context: "Câu 1. Cho hàm số $f(x)$ xác định trên $\\mathbb{R}$ và $f'(x)$ có đồ thị cắt trục hoành tại $x = 0$ và $x = 4$, nằm phía trên trục hoành trên khoảng $(0; 4)$.",
            items: [
              { text: "a) Hàm số f(x) nghịch biến trên các khoảng (-∞; 0) và (4; +∞).", answer: true, explain: "Đúng vì f'(x) < 0 trên các khoảng này." },
              { text: "b) Hàm số f(x) đồng biến trên khoảng (0; 4).", answer: true, explain: "Đúng vì f'(x) > 0 trên khoảng (0; 4)." },
              { text: "c) Hàm số f(x) đạt cực đại tại x = 0.", answer: false, explain: "Sai vì f'(x) đổi dấu từ âm sang dương nên x = 0 là điểm cực tiểu." },
              { text: "d) Hàm số f(x) đạt cực tiểu tại x = 4.", answer: false, explain: "Sai vì f'(x) đổi dấu từ dương sang âm nên x = 4 là điểm cực đại." }
            ]
          },
          {
            id: "gk1-s10-p2-2",
            context: "Câu 2. Cho hàm số $y = f(x) = x^3 - 3x^2 - 9x + 35$. Xét tính đúng sai:",
            items: [
              { text: "a) max_{[-4; 4]} f(x) = 40 đạt được khi x = -1.", answer: true, explain: "Đúng: f(-1) = 40 là giá trị lớn nhất trên [-4; 4]." },
              { text: "b) min_{[-4; 4]} f(x) = 8 đạt được khi x = 3.", answer: false, explain: "Sai vì min trên [-4; 4] bằng f(-4) = -41." },
              { text: "c) Hàm số đã cho không có giá trị lớn nhất trên ℝ.", answer: true, explain: "Đúng vì giới hạn tại vô cực là ±∞." },
              { text: "d) Giá trị cực tiểu của f(x) bằng 8.", answer: true, explain: "Đúng vì f(3) = 8 là giá trị cực tiểu." }
            ]
          },
          {
            id: "gk1-s10-p2-3",
            context: "Câu 3. Cho hàm số $y = f(x) = x^3 - 3x$. Xét tính đúng sai:",
            items: [
              { text: "a) Tập xác định của hàm số là ℝ.", answer: true, explain: "Đúng." },
              { text: "b) f'(x) = 3x² + 3.", answer: false, explain: "Sai vì f'(x) = 3x² - 3." },
              { text: "c) f'(x) < 0 khi x ∈ (-∞; -1) ∪ (1; +∞).", answer: false, explain: "Sai vì f'(x) < 0 trên khoảng (-1; 1)." },
              { text: "d) Hàm số có hai điểm cực trị x = -1 và x = 1.", answer: true, explain: "Đúng vì f'(x) = 0 <=> x = ±1." }
            ]
          },
          {
            id: "gk1-s10-p2-4",
            context: "Câu 4. Trong không gian $Oxyz$, cho hai vectơ $\\vec{a} = (m; 3; 6)$ và $\\vec{b} = (1; 2; 3)$.",
            items: [
              { text: "a) |b| = √14.", answer: true, explain: "Đúng: |b| = √(1 + 4 + 9) = √14." },
              { text: "b) Nếu a - 2b = (3; -1; 0) thì m = 5.", answer: true, explain: "Đúng: m - 2 = 3 => m = 5." },
              { text: "c) Nếu a·b = 10 thì m = -14.", answer: true, explain: "Đúng: m + 24 = 10 <=> m = -14." },
              { text: "d) Nếu |a| = 9 thì tổng các giá trị của m tìm được bằng 0.", answer: true, explain: "Đúng: m² = 36 <=> m = ±6 => tổng bằng 0." }
            ]
          }
        ]
      },
      part3: {
        name: "Phần III: Câu hỏi trắc nghiệm trả lời ngắn (Điền số)",
        desc: "6 câu hỏi (3.0 điểm - Mỗi câu đúng được 0.5 điểm)",
        questions: [
          {
            id: "gk1-s10-p3-1",
            text: "Câu 1. Doanh thu bán $x$ chiếc áo sơ mi là $R(x) = 200\\ln(1 + x/100) + 1000$, chi phí sản xuất $C(x) = (x - 100)^2 + 200$. Lợi nhuận tối đa mỗi ngày của nhà sản xuất là bao nhiêu đô la? (Làm tròn đến hàng đơn vị)",
            answer: "1000",
            acceptAnswers: ["1000", "1000$", "1000.0"],
            explain: "Lợi nhuận $P(x) = R(x) - C(x)$. Khảo sát đạt cực đại tại $x = 100$, khi đó lợi nhuận xấp xỉ 1000 đô la."
          },
          {
            id: "gk1-s10-p3-2",
            text: "Câu 2. Doanh số bán thiết bị âm thanh tuân theo đường cong logistic $R(t) = \\frac{5000}{1 + 5e^{-t}}$. Doanh số bán tăng nhanh nhất vào năm thứ mấy?",
            answer: "2",
            acceptAnswers: ["2", "t=2", "2.0"],
            explain: "Tốc độ tăng đạt cực đại khi $e^{-t} = 1/5 \\Leftrightarrow t = \\ln 5 \\approx 1.61 \\approx 2$ năm."
          },
          {
            id: "gk1-s10-p3-3",
            text: "Câu 3. Người ta muốn tạo khung thép hình hộp chữ nhật có đáy kích thước $x$ và $2x$, thể tích $24000\\text{ cm}^3$. Chiều rộng $x$ của hình hộp bằng bao nhiêu cm để tổng độ dài các thanh thép cần dùng là nhỏ nhất? (Làm tròn đến hàng đơn vị)",
            answer: "20",
            acceptAnswers: ["20", "20 cm", "20.0"],
            explain: "$V = 2x^2 h = 24000 \\Rightarrow h = 12000/x^2$. Chiều dài khung $L(x) = 12x + 48000/x^2$. Đạt cực tiểu khi $x = 20\\text{ cm}$."
          },
          {
            id: "gk1-s10-p3-4",
            text: "Câu 4. Có ba lực cùng tác động vào một vật, đôi một hợp với nhau góc $60^\\circ$ và có độ lớn lần lượt là $3\\text{ N}, 6\\text{ N}, 9\\text{ N}$. Tính độ lớn hợp lực (N):",
            answer: "15",
            acceptAnswers: ["15", "15 N", "15.0"],
            explain: "$|\\vec{F}|^2 = 9 + 36 + 81 + 2(18 + 54 + 27)(1/2) = 126 + 99 = 225 \\Rightarrow F = 15\\text{ N}$."
          },
          {
            id: "gk1-s10-p3-5",
            text: "Câu 5. Trong không gian $Oxyz$, cho $\\vec{a} = (1; 2; 1), \\vec{b} = (-2; 3; 4), \\vec{c} = (0; 1; 2)$ và $\\vec{d} = (4; 2; 0)$. Biết $\\vec{d} = x\\vec{a} + y\\vec{b} + z\\vec{c}$. Tính tổng $x + y + z$:",
            answer: "2",
            acceptAnswers: ["2", "2.0"],
            explain: "Giải hệ tìm được $x = 2, y = -1, z = 1$. Tổng $x + y + z = 2$."
          },
          {
            id: "gk1-s10-p3-6",
            text: "Câu 6. Cho $x, y$ thỏa mãn $x + y = \\sqrt{x - 1} + \\sqrt{2y + 2}$. Tìm tổng $M + m$ của biểu thức $P = x^2 + y^2 + 2(x+1)(y+1) + 8\\sqrt{4 - x - y}$:",
            answer: "32",
            acceptAnswers: ["32", "32.0"],
            explain: "Khảo sát hàm theo ẩn phụ $t = x + y \\in [2; 4]$, tìm được tổng $M + m = 32$."
          }
        ]
      }
    }
  },
  {
    id: "gk1-de-so-11",
    title: "Đề 6: Đề Ôn Tập Giữa Học Kỳ I - Đề Số 11",
    subtitle: "Tập giá trị hàm căn thức, Tương giao hàm bậc ba, Tối ưu hóa chi phí sản xuất & Vận tốc 3D (Đề số 11)",
    timeMinutes: 90,
    totalQuestions: 22,
    maxScore: 10.0,
    badge: "Đề Số 11 (Chuẩn 2025)",
    sections: {
      part1: {
        name: "Phần I: Câu hỏi trắc nghiệm 4 lựa chọn",
        desc: "12 câu hỏi (3.0 điểm - Mỗi câu đúng được 0.25 điểm)",
        questions: [
          {
            id: "gk1-s11-p1-1",
            text: "Cho hàm số $y = f(x)$ có bảng biến thiên với $f'(x) > 0$ trên $(-\\infty; -1)$ và $(1; +\\infty)$. Hàm số đã cho đồng biến trên khoảng nào dưới đây?",
            options: ["A. $(-1; +\\infty)$", "B. $(1; +\\infty)$", "C. $(-1; 1)$", "D. $(-\\infty; 1)$"],
            answer: 1,
            explain: "Đạo hàm $f'(x) > 0$ trên $(1; +\\infty)$ nên hàm số đồng biến trên khoảng $(1; +\\infty)$."
          },
          {
            id: "gk1-s11-p1-2",
            text: "Cho hàm số $f(x)$ có đạo hàm $f'(x) = x(x + 1)(x - 4), \\forall x \\in \\mathbb{R}$. Số điểm cực đại của hàm số đã cho là:",
            options: ["A. 2", "B. 3", "C. 4", "D. 1"],
            answer: 3,
            explain: "$f'(x)$ đổi dấu từ dương sang âm duy nhất tại $x = 0$, do đó hàm số có 1 điểm cực đại."
          },
          {
            id: "gk1-s11-p1-3",
            text: "Cho hàm số $f(x)$ liên tục trên $[-1; 5]$ có $\\max = 3$ và $\\min = -1$. Tổng giá trị lớn nhất và nhỏ nhất của hàm số trên $[-1; 5]$ bằng:",
            options: ["A. -1", "B. 4", "C. 1", "D. 2"],
            answer: 3,
            explain: "$3 + (-1) = 2$."
          },
          {
            id: "gk1-s11-p1-4",
            text: "Tìm tập giá trị của hàm số $y = \\sqrt{x - 1} + \\sqrt{9 - x}$:",
            options: ["A. $T = [1; 9]$", "B. $T = [2\\sqrt{2}; 4]$", "C. $T = (1; 9)$", "D. $T = [0; 2\\sqrt{2}]$"],
            answer: 1,
            explain: "$y^2 = 8 + 2\\sqrt{(x-1)(9-x)}$. Ta có $0 \\le (x-1)(9-x) \\le 16 \\Rightarrow 8 \\le y^2 \\le 16 \\Rightarrow 2\\sqrt{2} \\le y \\le 4$."
          },
          {
            id: "gk1-s11-p1-5",
            text: "Tiệm cận đứng của đồ thị hàm số $y = \\frac{2x + 2}{x - 1}$ là:",
            options: ["A. $x = 2$", "B. $x = -2$", "C. $x = 1$", "D. $x = -1$"],
            answer: 2,
            explain: "Nghiệm của mẫu là $x = 1$, tử tại 1 là $4 \\ne 0$ nên $x = 1$ là tiệm cận đứng."
          },
          {
            id: "gk1-s11-p1-6",
            text: "Đường tiệm cận xiên của đồ thị hàm số $y = f(x) = 2x - 1 - \\frac{1}{x + 1}$ là:",
            options: ["A. $y = x + 1$", "B. $y = 2x - 1$", "C. $y = x - 1$", "D. $y = 2x + 1$"],
            answer: 1,
            explain: "$\\lim_{x \\to \\pm\\infty} [y - (2x - 1)] = 0$ nên tiệm cận xiên là $y = 2x - 1$."
          },
          {
            id: "gk1-s11-p1-7",
            text: "Bảng biến thiên có tiệm cận đứng $x = 1/2$, tiệm cận xiên $y = x + 1$ là của hàm số:",
            options: [
              "A. $y = \\frac{x^2 + 2x - 8}{2x - 1}$",
              "B. $y = \\frac{x^2 + 2x + 8}{2x - 1}$",
              "C. $y = \\frac{2x^2 + x + 8}{2x + 1}$",
              "D. $y = \\frac{2x^2 + x - 8}{2x + 1}$"
            ],
            answer: 0,
            explain: "Mẫu số triệt tiêu tại $x = 1/2$ và đa thức bậc 2 trên bậc nhất có tiệm cận xiên tương ứng."
          },
          {
            id: "gk1-s11-p1-8",
            text: "Cho hàm số bậc ba $y = f(x)$ có đồ thị như hình vẽ. Số nghiệm thực của phương trình $3f(x) + 4 = 0$ là:",
            options: ["A. 2", "B. 0", "C. 1", "D. 3"],
            answer: 3,
            explain: "Phương trình $f(x) = -4/3$. Đường thẳng $y = -4/3$ cắt đồ thị tại 3 điểm phân biệt."
          },
          {
            id: "gk1-s11-p1-9",
            text: "Cho hình chóp $S.ABC$, gọi $G$ là trọng tâm tam giác $ABC$. Khẳng định nào ĐÚNG?",
            options: [
              "A. $\\vec{SA} + \\vec{SB} + \\vec{SC} = \\vec{SG}$",
              "B. $\\vec{SA} + \\vec{SB} + \\vec{SC} = 2\\vec{SG}$",
              "C. $\\vec{SA} + \\vec{SB} + \\vec{SC} = 3\\vec{SG}$",
              "D. $\\vec{SA} + \\vec{SB} + \\vec{SC} = 4\\vec{SG}$"
            ],
            answer: 2,
            explain: "$\\vec{SA} + \\vec{SB} + \\vec{SC} = 3\\vec{SG}$ theo tính chất trọng tâm tam giác."
          },
          {
            id: "gk1-s11-p1-10",
            text: "Cho tứ diện $ABCD$. Gọi $I, J$ là trung điểm của $AB$ và $CD$, $G$ là trung điểm $IJ$. Đẳng thức nào ĐÚNG?",
            options: [
              "A. $\\vec{GA} + \\vec{GB} + \\vec{GC} + \\vec{GD} = \\vec{0}$",
              "B. $\\vec{GA} + \\vec{GB} + \\vec{GC} + \\vec{GD} = 2\\vec{IJ}$",
              "C. $\\vec{GA} + \\vec{GB} + \\vec{GC} + \\vec{GD} = \\vec{JI}$",
              "D. $\\vec{GA} + \\vec{GB} + \\vec{GC} + \\vec{GD} = -2\\vec{JI}$"
            ],
            answer: 0,
            explain: "$\\vec{GA} + \\vec{GB} + \\vec{GC} + \\vec{GD} = 2\\vec{GI} + 2\\vec{GJ} = \\vec{0}$."
          },
          {
            id: "gk1-s11-p1-11",
            text: "Trong không gian $Oxyz$, hình chiếu vuông góc của điểm $M(3; -1; 1)$ trên trục $Oz$ có tọa độ là:",
            options: ["A. $(3; -1; 0)$", "B. $(0; 0; 1)$", "C. $(0; -1; 0)$", "D. $(3; 0; 0)$"],
            answer: 1,
            explain: "Chiếu lên trục $Oz$ giữ nguyên cao độ $z$: $(0; 0; 1)$."
          },
          {
            id: "gk1-s11-p1-12",
            text: "Trong không gian $Oxyz$, cho $A(1; 3; 4), B(2; -1; 0), C(3; 1; 2)$. Tọa độ trọng tâm $G$ của tam giác $ABC$ là:",
            options: ["A. $G(2; 1; 2)$", "B. $G(6; 3; 6)$", "C. $G(3; 1; 3)$", "D. $G(2; -1; 2)$"],
            answer: 0,
            explain: "$G = (2; 1; 2)$."
          }
        ]
      },
      part2: {
        name: "Phần II: Câu hỏi trắc nghiệm Đúng / Sai",
        desc: "4 câu hỏi (16 ý - 4.0 điểm. Đúng 1 ý: 0.1đ | Đúng 2 ý: 0.25đ | Đúng 3 ý: 0.5đ | Đúng 4 ý: 1.0đ)",
        questions: [
          {
            id: "gk1-s11-p2-1",
            context: "Câu 1. Cho hàm số $f(x)$ có bảng biến thiên với cực đại tại $x = -1$ và $x = 1$, cực tiểu tại $x = 0$.",
            items: [
              { text: "a) Hàm số đồng biến trên các khoảng (-∞; -1) và (0; 1).", answer: true, explain: "Đúng vì f'(x) > 0 trên các khoảng này." },
              { text: "b) Hàm số nghịch biến trên các khoảng (-1; 0) và (1; +∞).", answer: true, explain: "Đúng vì f'(x) < 0 trên các khoảng này." },
              { text: "c) Hàm số đạt cực đại tại x = -1 và x = 1.", answer: true, explain: "Đúng." },
              { text: "d) Hàm số đạt cực tiểu tại x = 0.", answer: true, explain: "Đúng." }
            ]
          },
          {
            id: "gk1-s11-p2-2",
            context: "Câu 2. Cho hàm số $f(x) = \\frac{x^2 + x + 2}{x + 2}$. Xét tính đúng sai:",
            items: [
              { text: "a) Hàm số f(x) đồng biến trên mỗi khoảng xác định.", answer: false, explain: "Sai: f'(x) = (x² + 4x) / (x+2)², có đổi dấu." },
              { text: "b) Hàm số f(x) có hai điểm cực trị.", answer: true, explain: "Đúng: x = 0 và x = -4." },
              { text: "c) Giá trị lớn nhất của hàm số bằng -7.", answer: false, explain: "Sai vì lim khi x -> ±∞ là ±∞." },
              { text: "d) Hàm số f(x) không có giá trị lớn nhất và giá trị nhỏ nhất trên tập xác định.", answer: true, explain: "Đúng." }
            ]
          },
          {
            id: "gk1-s11-p2-3",
            context: "Câu 3. Cho hàm số $y = x^3 - 3x^2 + 2$. Xét tính đúng sai:",
            items: [
              { text: "a) Đạo hàm của hàm số đã cho là y' = 3x² - 6x.", answer: true, explain: "Đúng." },
              { text: "b) Hàm số đã cho đồng biến trên khoảng (0; 2).", answer: false, explain: "Sai vì trên (0; 2) hàm số nghịch biến." },
              { text: "c) Bảng biến thiên có cực đại tại x = 0 (y = 2) và cực tiểu tại x = 2 (y = -2).", answer: true, explain: "Đúng." },
              { text: "d) Đồ thị hàm số đi qua các điểm (0; 2) và (2; -2).", answer: true, explain: "Đúng." }
            ]
          },
          {
            id: "gk1-s11-p2-4",
            context: "Câu 4. Cho hình lập phương $ABCD.A'B'C'D'$ cạnh 1 gắn vào hệ tọa độ $Oxyz$.",
            items: [
              { text: "a) Tọa độ đỉnh A(1; 1; 1).", answer: true, explain: "Đúng." },
              { text: "b) Tọa độ vectơ AB = (0; -1; 0).", answer: true, explain: "Đúng." },
              { text: "c) Tọa độ trọng tâm G của tam giác B'CD' là (2/3; 2/3; 2/3).", answer: true, explain: "Đúng." },
              { text: "d) Vectơ OG vuông góc với mặt phẳng (B'CD').", answer: true, explain: "Đúng." }
            ]
          }
        ]
      },
      part3: {
        name: "Phần III: Câu hỏi trắc nghiệm trả lời ngắn (Điền số)",
        desc: "6 câu hỏi (3.0 điểm - Mỗi câu đúng được 0.5 điểm)",
        questions: [
          {
            id: "gk1-s11-p3-1",
            text: "Câu 1. Để sản xuất $x$ ấm đun nước mỗi ngày ($x \\ge 10$), chi phí cho mỗi ấm là $C(x) = 4\\ln x + \\frac{30 - x}{10}$ (trăm đô la). Cần sản xuất bao nhiêu ấm để chi phí mỗi ấm ở mức tối thiểu?",
            answer: "40",
            acceptAnswers: ["40", "40 ấm", "40.0"],
            explain: "$C'(x) = 4/x - 1/10 = 0 \\Leftrightarrow x = 40$ ấm/ngày."
          },
          {
            id: "gk1-s11-p3-2",
            text: "Câu 2. Chi phí sản xuất $x$ đơn vị sản phẩm là $C(x) = 800 + 0.04x + 0.0002x^2$. Cần sản xuất bao nhiêu sản phẩm để chi phí trung bình đạt giá trị nhỏ nhất?",
            answer: "2000",
            acceptAnswers: ["2000", "2000 sản phẩm", "2000.0"],
            explain: "$\\bar{C}(x) = 800/x + 0.0002x + 0.04$. Cực tiểu khi $x^2 = 800/0.0002 = 4000000 \\Leftrightarrow x = 2000$."
          },
          {
            id: "gk1-s11-p3-3",
            text: "Câu 3. Từ một miếng bìa hình vuông cạnh $12\\text{ cm}$, cắt bỏ 4 góc hình vuông cạnh $x\\text{ cm}$ rồi gấp thành hộp không nắp. Tìm $x$ để thể tích khối hộp lớn nhất:",
            answer: "2",
            acceptAnswers: ["2", "2 cm", "2.0"],
            explain: "$V(x) = x(12 - 2x)^2$. Khảo sát đạt cực đại khi $x = 2\\text{ cm}$."
          },
          {
            id: "gk1-s11-p3-4",
            text: "Câu 4. Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có $AB = 1, AD = AA' = 4$. Độ dài của vectơ $\\vec{u} = \\vec{AB} + \\vec{AC}$ bằng bao nhiêu? (Làm tròn đến hàng phần mười)",
            answer: "4.5",
            acceptAnswers: ["4.5", "4,5", "sqrt(20)", "4.47"],
            explain: "$\\vec{u} = 2\\vec{AB} + \\vec{AD} \\Rightarrow |\\vec{u}| = \\sqrt{4(1) + 16} = \\sqrt{20} \\approx 4.47 \\approx 4.5$."
          },
          {
            id: "gk1-s11-p3-5",
            text: "Câu 5. Máy bay A bay với vận tốc $\\vec{a} = (300; 200; 400)$ (km/h). Máy bay B bay cùng hướng và có tốc độ gấp 3 lần tốc độ máy bay A. Tốc độ của máy bay B là bao nhiêu km/h? (Làm tròn đến hàng đơn vị)",
            answer: "1616",
            acceptAnswers: ["1616", "1616 km/h", "1615.5", "1615"],
            explain: "$v_A = \\sqrt{300^2 + 200^2 + 400^2} = 100\\sqrt{29} \\approx 538.52$ km/h. Tốc độ máy bay B là $3 \\times 538.52 \\approx 1616$ km/h."
          },
          {
            id: "gk1-s11-p3-6",
            text: "Câu 6. Cho $x, y$ thỏa mãn $9x^2 + (2 - y\\sqrt{3xy - 5})x + \\sqrt{3xy - 5} = 0$. Tìm giá trị nhỏ nhất của $P = x^3 + y^3 + 6xy + 3(3x^2 + 1)(x + y - 2)$ (Làm tròn đến hàng đơn vị):",
            answer: "18",
            acceptAnswers: ["18", "18.0"],
            explain: "Từ điều kiện suy ra mối liên hệ biến thiên, tìm được $P_{\\min} = 18$."
          }
        ]
      }
    }
  },
  {
    id: "gk1-de-so-12",
    title: "Đề 7: Đề Ôn Tập Giữa Học Kỳ I - Đề Số 12",
    subtitle: "Khảo sát hàm số nâng cao, Thiết kế hình trụ tối ưu thể tích & Hợp lực góc 100° (Đề số 12)",
    timeMinutes: 90,
    totalQuestions: 22,
    maxScore: 10.0,
    badge: "Đề Số 12 (Chuẩn 2025)",
    sections: {
      part1: {
        name: "Phần I: Câu hỏi trắc nghiệm 4 lựa chọn",
        desc: "12 câu hỏi (3.0 điểm - Mỗi câu đúng được 0.25 điểm)",
        questions: [
          {
            id: "gk1-s12-p1-1",
            text: "Cho hàm số $y = f(x)$ có bảng biến thiên với $f'(x) > 0$ trên $(-\\infty; 3)$ và $f'(x) < 0$ trên $(3; +\\infty)$. Mệnh đề nào sau đây ĐÚNG?",
            options: [
              "A. Hàm số đồng biến trên khoảng $(3; +\\infty)$",
              "B. Hàm số đồng biến trên khoảng $(-\\infty; 3)$",
              "C. Hàm số nghịch biến trên khoảng $(-\\infty; 3)$",
              "D. Hàm số nghịch biến trên $\\mathbb{R}$"
            ],
            answer: 1,
            explain: "Đạo hàm mang dấu dương trên $(-\\infty; 3)$ nên hàm số đồng biến trên khoảng $(-\\infty; 3)$."
          },
          {
            id: "gk1-s12-p1-2",
            text: "Cho hàm số $f(x)$ có $f'(x) = x(x + 1)(x - 4), \\forall x \\in \\mathbb{R}$. Số điểm cực tiểu của hàm số đã cho là:",
            options: ["A. 4", "B. 3", "C. 1", "D. 2"],
            answer: 3,
            explain: "Đạo hàm đổi dấu từ âm sang dương tại $x = -1$ và $x = 4$. Do đó hàm số có 2 điểm cực tiểu."
          },
          {
            id: "gk1-s12-p1-3",
            text: "Cho hàm số $y = f(x)$ liên tục trên $[-2; 3]$ có đồ thị đạt cực đại tại $(0; 4)$ và cực tiểu tại $(2; -1)$. Giá trị lớn nhất $M$ và nhỏ nhất $m$ là:",
            options: ["A. $M = 4, m = 1$", "B. $M = 4, m = -1$", "C. $M = 7/2, m = -1$", "D. $M = 7/2, m = 1$"],
            answer: 1,
            explain: "Điểm cao nhất có tung độ 4 và thấp nhất có tung độ $-1$, do đó $M = 4, m = -1$."
          },
          {
            id: "gk1-s12-p1-4",
            text: "Tìm giá trị nhỏ nhất $m$ của hàm số $y = x^3 - 7x^2 + 11x - 2$ trên đoạn $[0; 2]$:",
            options: ["A. $m = 3$", "B. $m = 0$", "C. $m = -2$", "D. $m = 11$"],
            answer: 2,
            explain: "$y(0) = -2, y(1) = 3, y(2) = 0$. Vậy giá trị nhỏ nhất là $-2$."
          },
          {
            id: "gk1-s12-p1-5",
            text: "Tiệm cận đứng của đồ thị hàm số $y = \\frac{x - 1}{x - 3}$ là:",
            options: ["A. $x = -3$", "B. $x = -1$", "C. $x = 1$", "D. $x = 3$"],
            answer: 3,
            explain: "Nghiệm của mẫu là $x = 3$ và tử tại 3 bằng $2 \\ne 0$ nên $x = 3$ là tiệm cận đứng."
          },
          {
            id: "gk1-s12-p1-6",
            text: "Đường tiệm cận xiên của đồ thị hàm số $y = f(x) = x + 3 + \\frac{1}{2x + 1}$ là:",
            options: ["A. $y = 2x + 1$", "B. $y = x - 3$", "C. $y = x + 3$", "D. $y = 2x - 1$"],
            answer: 2,
            explain: "$\\lim_{x \\to \\pm\\infty} [y - (x + 3)] = 0$ nên tiệm cận xiên là $y = x + 3$."
          },
          {
            id: "gk1-s12-p1-7",
            text: "Bảng biến thiên có tiệm cận đứng $x = 4$, tiệm cận xiên $y = -x - 4$ là của hàm số nào?",
            options: [
              "A. $y = \\frac{-x^2 + 13}{x - 4}$",
              "B. $y = \\frac{-x^2 + 13}{x + 4}$",
              "C. $y = \\frac{2x^2 + 8x + 2}{-x - 4}$",
              "D. $y = \\frac{x^2 - 16}{x - 4}$"
            ],
            answer: 0,
            explain: "$\\frac{-x^2 + 13}{x - 4} = -x - 4 - \\frac{3}{x - 4}$ có tiệm cận xiên $y = -x - 4$ và tiệm cận đứng $x = 4$."
          },
          {
            id: "gk1-s12-p1-8",
            text: "Cho hàm số bậc ba $y = f(x)$ có giá trị cực tiểu bằng $-2$ và cực đại bằng 2. Có bao nhiêu giá trị nguyên của tham số $m$ để phương trình $f(x) = m$ có ba nghiệm thực phân biệt?",
            options: ["A. 2", "B. 5", "C. 3", "D. 4"],
            answer: 2,
            explain: "Để phương trình có 3 nghiệm thực thì $-2 < m < 2 \\Rightarrow m \\in \\{-1; 0; 1\\}$, gồm 3 giá trị nguyên."
          },
          {
            id: "gk1-s12-p1-9",
            text: "Cho hình lăng trụ tam giác $ABC.A'B'C'$. Đặt $\\vec{AA'} = \\vec{a}, \\vec{AB} = \\vec{b}, \\vec{AC} = \\vec{c}, \\vec{BC} = \\vec{d}$. Biểu thức nào ĐÚNG?",
            options: ["A. $\\vec{a} + \\vec{b} + \\vec{c} = \\vec{d}$", "B. $\\vec{a} = \\vec{b} + \\vec{c}$", "C. $\\vec{a} + \\vec{b} + \\vec{c} + \\vec{d} = \\vec{0}$", "D. $\\vec{b} - \\vec{c} + \\vec{d} = \\vec{0}$"],
            answer: 3,
            explain: "$\\vec{d} = \\vec{BC} = \\vec{c} - \\vec{b} \\Leftrightarrow \\vec{b} - \\vec{c} + \\vec{d} = \\vec{0}$."
          },
          {
            id: "gk1-s12-p1-10",
            text: "Trong không gian cho điểm $O$ và bốn điểm $A, B, C, D$ không thẳng hàng. Điều kiện cần và đủ để $ABCD$ là hình bình hành là:",
            options: [
              "A. $\\vec{OA} + \\vec{OB} + \\vec{OC} + \\vec{OD} = \\vec{0}$",
              "B. $\\vec{OA} + \\vec{OC} = \\vec{OB} + \\vec{OD}$",
              "C. $\\vec{OA} + \\vec{OB} = \\vec{OC} + \\vec{OD}$",
              "D. $\\vec{OA} + \\vec{OD} = \\vec{OB} + \\vec{OC}$"
            ],
            answer: 1,
            explain: "Hai đường chéo $AC$ và $BD$ có cùng trung điểm $\\Leftrightarrow \\vec{OA} + \\vec{OC} = \\vec{OB} + \\vec{OD}$."
          },
          {
            id: "gk1-s12-p1-11",
            text: "Trong không gian $Oxyz$, cho điểm $A(1; 2; 3)$. Điểm đối xứng với $A$ qua mặt phẳng $(Oxz)$ có tọa độ là:",
            options: ["A. $(1; -2; 3)$", "B. $(1; 2; -3)$", "C. $(-1; -2; -3)$", "D. $(-1; 2; 3)$"],
            answer: 0,
            explain: "Đối xứng qua $(Oxz)$ giữ nguyên $x$ và $z$, đổi dấu $y$: $(1; -2; 3)$."
          },
          {
            id: "gk1-s12-p1-12",
            text: "Trong không gian $Oxyz$, cho hai vectơ $\\vec{a} = (2; 1; 0)$ và $\\vec{b} = (-1; 0; -2)$. Tính $\\cos(\\vec{a}, \\vec{b})$:",
            options: ["A. $-2/25$", "B. $-2/5$", "C. $2/25$", "D. $2/5$"],
            answer: 1,
            explain: "$\\cos(\\vec{a}, \\vec{b}) = \\frac{-2}{\\sqrt{5}\\sqrt{5}} = -\\frac{2}{5}$."
          }
        ]
      },
      part2: {
        name: "Phần II: Câu hỏi trắc nghiệm Đúng / Sai",
        desc: "4 câu hỏi (16 ý - 4.0 điểm. Đúng 1 ý: 0.1đ | Đúng 2 ý: 0.25đ | Đúng 3 ý: 0.5đ | Đúng 4 ý: 1.0đ)",
        questions: [
          {
            id: "gk1-s12-p2-1",
            context: "Câu 1. Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ có đồ thị với các khoảng tăng giảm qua $-1, 0, 1, 2$.",
            items: [
              { text: "a) Hàm số đồng biến trên các khoảng (-∞; -1), (0; 1) và (2; +∞).", answer: true, explain: "Đúng theo chiều đi lên của đồ thị." },
              { text: "b) Hàm số nghịch biến trên các khoảng (-1; 0) và (1; 2).", answer: true, explain: "Đúng theo chiều đi xuống của đồ thị." },
              { text: "c) Hàm số đạt cực đại tại x = -1 và x = 1.", answer: true, explain: "Đúng." },
              { text: "d) Hàm số đạt cực tiểu tại x = 0 và x = 2.", answer: true, explain: "Đúng." }
            ]
          },
          {
            id: "gk1-s12-p2-2",
            context: "Câu 2. Cho hàm số $f(x) = \\frac{x^2 - 1}{x^2 + 1}$. Xét tính đúng sai:",
            items: [
              { text: "a) Đạo hàm của hàm số đã cho là f'(x) = 4x / (x² + 1)².", answer: true, explain: "Đúng." },
              { text: "b) x = 0 là điểm cực tiểu của hàm số.", answer: true, explain: "Đúng: f'(x) đổi dấu từ âm sang dương tại x = 0." },
              { text: "c) Hàm số có hai điểm cực trị.", answer: false, explain: "Sai vì chỉ có 1 điểm cực trị x = 0." },
              { text: "d) Tiệm cận ngang của đồ thị hàm số là y = 1.", answer: true, explain: "Đúng: lim khi x -> ±∞ bằng 1." }
            ]
          },
          {
            id: "gk1-s12-p2-3",
            context: "Câu 3. Cho hàm số $y = f(x) = x^3 + ax^2 + bx + c$ có đồ thị đạt cực đại tại $(0; 2)$ và cực tiểu tại $(2; -2)$.",
            items: [
              { text: "a) Hàm số y = f(x) có hai điểm cực trị là x = 0 và x = 2.", answer: true, explain: "Đúng." },
              { text: "b) Giá trị b bằng 0.", answer: true, explain: "Đúng: f'(0) = b = 0." },
              { text: "c) Giá trị c = 2.", answer: true, explain: "Đúng: f(0) = c = 2." },
              { text: "d) Công thức hàm số là f(x) = x³ - 3x² + 2.", answer: true, explain: "Đúng: a = -3." }
            ]
          },
          {
            id: "gk1-s12-p2-4",
            context: "Câu 4. Cho tứ diện $ABCD$ có $AB, AC, AD$ đôi một vuông góc, $AB = 3, AC = 4, AD = 6$. Gắn hệ trục $A(0; 0; 0), B(3; 0; 0), C(0; 4; 0), D(0; 0; 6)$.",
            items: [
              { text: "a) Tọa độ đỉnh B là (3; 0; 0).", answer: true, explain: "Đúng." },
              { text: "b) Trọng tâm E của tam giác ABD là E(1; 0; 2).", answer: true, explain: "Đúng: E = (1; 0; 2)." },
              { text: "c) Trọng tâm F của tam giác ACD là F(0; 4/3; 2).", answer: true, explain: "Đúng: F = (0; 4/3; 2)." },
              { text: "d) Vectơ AD vuông góc với vectơ EF.", answer: true, explain: "Đúng: EF = (-1; 4/3; 0), AD = (0; 0; 6) => AD·EF = 0." }
            ]
          }
        ]
      },
      part3: {
        name: "Phần III: Câu hỏi trắc nghiệm trả lời ngắn (Điền số)",
        desc: "6 câu hỏi (3.0 điểm - Mỗi câu đúng được 0.5 điểm)",
        questions: [
          {
            id: "gk1-s12-p3-1",
            text: "Câu 1. Thiết kế hộp hình hộp chữ nhật có đáy hình vuông, thể tích $8\\text{ dm}^3$ sao cho diện tích toàn phần nhỏ nhất. Độ dài cạnh đáy bằng bao nhiêu decimét?",
            answer: "2",
            acceptAnswers: ["2", "2 dm", "2.0"],
            explain: "$S_{tp} = 2x^2 + 32/x$. Cực tiểu khi $x^3 = 8 \\Leftrightarrow x = 2\\text{ dm}$."
          },
          {
            id: "gk1-s12-p3-2",
            text: "Câu 2. Cho hình thang cân có đáy nhỏ và hai cạnh bên cùng bằng 5. Tìm diện tích lớn nhất của hình thang cân đó (Làm tròn đến hàng phần mười):",
            answer: "32.5",
            acceptAnswers: ["32.5", "32,5", "32.48"],
            explain: "Diện tích $S(\\alpha) = 25(1 + \\cos\\alpha)\\sin\\alpha$. Đạt cực đại khi $\\alpha = 60^\\circ$, $S_{\\max} = \\frac{75\\sqrt{3}}{4} \\approx 32.5$."
          },
          {
            id: "gk1-s12-p3-3",
            text: "Câu 3. Một hình trụ có bán kính đáy $r$, chiều cao $h$ nội tiếp hình nón có bán kính đáy $9\\text{ cm}$, chiều cao $18\\text{ cm}$. Tìm $r$ để thể tích hình trụ lớn nhất (theo cm):",
            answer: "6",
            acceptAnswers: ["6", "6 cm", "6.0"],
            explain: "$h = 18 - 2r$. Thể tích $V(r) = 2\\pi(9r^2 - r^3)$. Cực đại khi $r = 6\\text{ cm}$."
          },
          {
            id: "gk1-s12-p3-4",
            text: "Câu 4. Có ba lực cùng tác động vào một vật. Hai trong ba lực hợp với nhau góc $100^\\circ$ và có độ lớn $25\\text{ N}$ và $12\\text{ N}$. Lực thứ ba vuông góc với mặt phẳng của hai lực kia và có độ lớn $4\\text{ N}$. Tính độ lớn của hợp lực (Làm tròn đến hàng đơn vị):",
            answer: "26",
            acceptAnswers: ["26", "26 N", "26.0"],
            explain: "$F_{12}^2 = 625 + 144 + 600\\cos 100^\\circ \\approx 664.81$. Tổng hợp lực $F = \\sqrt{664.81 + 16} = \\sqrt{680.81} \\approx 26\\text{ N}$."
          },
          {
            id: "gk1-s12-p3-5",
            text: "Câu 5. Trong không gian $Oxyz$, cho hai vectơ $\\vec{u} = (2; 1; -1)$ và $\\vec{v} = (1; -1; m)$. Tìm giá trị của $m$ để hai vectơ tạo với nhau một góc $60^\\circ$:",
            answer: "-1",
            acceptAnswers: ["-1", "-1.0", "m=-1"],
            explain: "$\\cos 60^\\circ = 1/2 = \\frac{1 - m}{\\sqrt{6}\\sqrt{2+m^2}} \\Rightarrow m = -1$ hoặc $-2$."
          },
          {
            id: "gk1-s12-p3-6",
            text: "Câu 6. Cho các số thực $x, y$ thỏa mãn $x + y + 1 = 2(\\sqrt{x - 2} + \\sqrt{y + 3})$. Tìm giá trị của $a + b$ trong biểu thức tối ưu:",
            answer: "25",
            acceptAnswers: ["25", "25.0"],
            explain: "Khảo sát hàm số theo ẩn phụ $t = x + y$, tìm được giá trị lớn nhất phân số tối giản $a/b$, suy ra $a + b = 25$."
          }
        ]
      }
    }
  }
];

console.log("EXAMS_PART2 loaded successfully with 4 exams (Đề 9, 10, 11, 12).");
