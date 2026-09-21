// ==============================================================================
// BỘ ĐỀ THI GIỮA HỌC KỲ I - TOÁN 12 (PHẦN 1: ĐỀ SỐ 6, 7, 8)
// Trích xuất từ đề thi chính thức: "Đề gk1.pdf" - Chuẩn ma trận Bộ GD&ĐT 2025
// ==============================================================================

window.EXAMS_PART1 = [
  {
    id: "gk1-de-so-6",
    title: "Đề 1: Đề Ôn Tập Giữa Học Kỳ I - Đề Số 6",
    subtitle: "Ứng dụng đạo hàm khảo sát đồ thị hàm số, Vectơ và Hệ trục tọa độ Oxyz (Đề số 6)",
    timeMinutes: 90,
    totalQuestions: 22,
    maxScore: 10.0,
    badge: "Đề Số 6 (Chuẩn 2025)",
    sections: {
      part1: {
        name: "Phần I: Câu hỏi trắc nghiệm 4 lựa chọn",
        desc: "12 câu hỏi (3.0 điểm - Mỗi câu đúng được 0.25 điểm)",
        questions: [
          {
            id: "gk1-s6-p1-1",
            text: "Cho hàm số $y = f(x)$ có bảng biến thiên như sau:\n$$\\begin{array}{c|ccccccc} x & -\\infty & & -1 & & 0 & & 1 & & +\\infty \\\\ \\hline y' & & + & 0 & - & 0 & + & 0 & - \\\\ \\hline y & -\\infty & \\nearrow & 2 & \\searrow & 0 & \\nearrow & 2 & \\searrow & -\\infty \\end{array}$$\nHàm số nghịch biến trong khoảng nào dưới đây?",
            options: ["A. $(-1; 1)$", "B. $(0; 1)$", "C. $(1; +\\infty)$", "D. $(-\\infty; 2)$"],
            answer: 2,
            explain: "Dựa vào bảng biến thiên, $y' < 0$ trên các khoảng $(-1; 0)$ và $(1; +\\infty)$. Do đó hàm số nghịch biến trên khoảng $(1; +\\infty)$."
          },
          {
            id: "gk1-s6-p1-2",
            text: "Cho hàm số $f(x)$ có đạo hàm $f'(x) = x(x - 1)(x + 4)^3, \\forall x \\in \\mathbb{R}$. Số điểm cực tiểu của hàm số đã cho là:",
            options: ["A. 2", "B. 3", "C. 4", "D. 1"],
            answer: 0,
            explain: "Các nghiệm $x = -4$ (bội 3), $x = 0$ (bội 1), $x = 1$ (bội 1) đều là nghiệm bội lẻ. $f'(x)$ đổi dấu từ âm sang dương tại $x = -4$ và $x = 1$, do đó hàm số có 2 điểm cực tiểu."
          },
          {
            id: "gk1-s6-p1-3",
            text: "Cho hàm số $y = f(x)$ liên tục trên đoạn $[0; 2]$ có đồ thị đạt cực đại tại điểm $(0; 2)$ và đi qua $(2; 0)$. Giá trị lớn nhất của hàm số $f(x)$ trên $[0; 2]$ là:",
            options: ["A. $\\max_{[0; 2]} f(x) = 2$", "B. $\\max_{[0; 2]} f(x) = \\sqrt{2}$", "C. $\\max_{[0; 2]} f(x) = 4$", "D. $\\max_{[0; 2]} f(x) = 0$"],
            answer: 0,
            explain: "Điểm cao nhất của đồ thị trên $[0; 2]$ là $(0; 2)$, do đó giá trị lớn nhất bằng 2."
          },
          {
            id: "gk1-s6-p1-4",
            text: "Giá trị lớn nhất của hàm số $y = x^4 - 4x^2 + 9$ trên đoạn $[-2; 3]$ bằng:",
            options: ["A. 201", "B. 2", "C. 9", "D. 54"],
            answer: 3,
            explain: "Đạo hàm $y' = 4x^3 - 8x = 0 \\Leftrightarrow x = 0, x = \\pm\\sqrt{2}$. Các giá trị: $y(0) = 9, y(\\pm\\sqrt{2}) = 5, y(-2) = 9, y(3) = 54$. Giá trị lớn nhất bằng 54."
          },
          {
            id: "gk1-s6-p1-5",
            text: "Tiệm cận đứng của đồ thị hàm số $y = \\frac{2x - 2}{x + 1}$ là đường thẳng:",
            options: ["A. $x = -2$", "B. $x = 1$", "C. $x = -1$", "D. $x = 2$"],
            answer: 2,
            explain: "Nghiệm của mẫu là $x = -1$ và tử tại $-1$ bằng $-4 \\ne 0$ nên $x = -1$ là tiệm cận đứng."
          },
          {
            id: "gk1-s6-p1-6",
            text: "Cho hàm số $y = \\frac{-4x^2 - 2x - 5}{-x + 2}$. Đường tiệm cận xiên của đồ thị hàm số là:",
            options: ["A. $y = 4x - 10$", "B. $y = 2x + 3$", "C. $y = 2x - 3$", "D. $y = 4x + 10$"],
            answer: 3,
            explain: "Chia đa thức: $y = \\frac{4x^2 + 2x + 5}{x - 2} = 4x + 10 + \\frac{25}{x - 2}$. Tiệm cận xiên là $y = 4x + 10$."
          },
          {
            id: "gk1-s6-p1-7",
            text: "Đồ thị có tiệm cận đứng $x = 3$, tiệm cận xiên $y = 2x$ và cắt trục tung tại $(0; -\\frac{2}{3})$ là của hàm số nào?",
            options: [
              "A. $y = \\frac{2x^2 - 6x + 2}{x - 3}$",
              "B. $y = \\frac{2x^2 - 6x + 2}{x + 3}$",
              "C. $y = \\frac{x^2 - 6}{x - 3}$",
              "D. $y = \\frac{x^2 - 6}{x + 3}$"
            ],
            answer: 0,
            explain: "Biến đổi $y = \\frac{2x^2 - 6x + 2}{x - 3} = 2x + \\frac{2}{x - 3}$. Tiệm cận đứng $x = 3$, tiệm cận xiên $y = 2x$, cắt trục tung tại $(0; -2/3)$."
          },
          {
            id: "gk1-s6-p1-8",
            text: "Đồ thị của hàm số $y = x^3 - 3x + 2$ cắt trục tung tại điểm có tung độ bằng:",
            options: ["A. 0", "B. 1", "C. 2", "D. -2"],
            answer: 2,
            explain: "Cho $x = 0 \\Rightarrow y = 2$."
          },
          {
            id: "gk1-s6-p1-9",
            text: "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$. Khi đó, vectơ bằng vectơ $\\vec{AB}$ là:",
            options: ["A. $\\vec{D'C'}$", "B. $\\vec{BA}$", "C. $\\vec{CD}$", "D. $\\vec{B'A'}$"],
            answer: 0,
            explain: "Trong hình hộp chữ nhật: $\\vec{AB} = \\vec{DC} = \\vec{A'B'} = \\vec{D'C'}$."
          },
          {
            id: "gk1-s6-p1-10",
            text: "Cho hình lập phương $ABCD.A'B'C'D'$ tâm $O$. Khẳng định nào sau đây ĐÚNG?",
            options: [
              "A. $\\vec{AO} = \\frac{1}{3}(\\vec{AB} + \\vec{AD} + \\vec{AA'})$",
              "B. $\\vec{AO} = \\frac{1}{2}(\\vec{AB} + \\vec{AD} + \\vec{AA'})$",
              "C. $\\vec{AO} = \\vec{AB} + \\vec{AD} + \\vec{AA'}$",
              "D. $\\vec{AO} = 2(\\vec{AB} + \\vec{AD} + \\vec{AA'})$"
            ],
            answer: 1,
            explain: "$\\vec{AC'} = \\vec{AB} + \\vec{AD} + \\vec{AA'}$. Vì $O$ là trung điểm đường chéo $AC'$ nên $\\vec{AO} = \\frac{1}{2}(\\vec{AB} + \\vec{AD} + \\vec{AA'})$."
          },
          {
            id: "gk1-s6-p1-11",
            text: "Trong không gian $Oxyz$, cho điểm $A(2; -3; 5)$. Tọa độ điểm $A'$ đối xứng với $A$ qua trục $Oy$ là:",
            options: ["A. $A'(2; 3; 5)$", "B. $A'(2; -3; -5)$", "C. $A'(-2; -3; 5)$", "D. $A'(-2; -3; -5)$"],
            answer: 3,
            explain: "Đối xứng qua trục $Oy$ giữ nguyên tung độ $y$, đổi dấu $x$ và $z$: $A'(-2; -3; -5)$."
          },
          {
            id: "gk1-s6-p1-12",
            text: "Trên mặt phẳng tọa độ $Oxy$, cho tam giác $ABC$ với $A(1; 3), B(-2; -2), C(3; 1)$. Tính cosin góc $A$:",
            options: ["A. $\\cos A = \\frac{2}{\\sqrt{17}}$", "B. $\\cos A = \\frac{1}{\\sqrt{17}}$", "C. $\\cos A = -\\frac{2}{\\sqrt{17}}$", "D. $\\cos A = -\\frac{1}{\\sqrt{17}}$"],
            answer: 1,
            explain: "$\\vec{AB} = (-3; -5) \\Rightarrow AB = \\sqrt{34}$. $\\vec{AC} = (2; -2) \\Rightarrow AC = 2\\sqrt{2}$. $\\vec{AB}\\cdot\\vec{AC} = -6 + 10 = 4$. $\\cos A = \\frac{4}{\\sqrt{34}\\cdot 2\\sqrt{2}} = \\frac{1}{\\sqrt{17}}$."
          }
        ]
      },
      part2: {
        name: "Phần II: Câu hỏi trắc nghiệm Đúng / Sai",
        desc: "4 câu hỏi (16 ý - 4.0 điểm. Đúng 1 ý: 0.1đ | Đúng 2 ý: 0.25đ | Đúng 3 ý: 0.5đ | Đúng 4 ý: 1.0đ)",
        questions: [
          {
            id: "gk1-s6-p2-1",
            context: "Câu 1. Cho hàm số $y = f(x)$ liên tục trên đoạn $[-5; 5]$ có đồ thị tăng từ $(-5; -2)$ đến $(-3; 3)$, giảm xuống $(2; -1)$, rồi tăng lên $(5; 4)$.",
            items: [
              { text: "a) Hàm số y = f(x) đồng biến trên khoảng (-3; 2).", answer: false, explain: "Sai vì trên khoảng (-3; 2) đồ thị đi xuống, hàm số nghịch biến." },
              { text: "b) Hàm số y = f(x) nghịch biến trên các khoảng (-5; -3) và (2; 5).", answer: false, explain: "Sai vì trên các khoảng này đồ thị đi lên, hàm số đồng biến." },
              { text: "c) Hàm số y = f(x) có điểm cực tiểu là x = 2.", answer: true, explain: "Đúng vì tại x = 2 đồ thị đạt điểm thấp nhất cục bộ." },
              { text: "d) Hàm số y = f(x) có điểm cực đại là x = -3.", answer: true, explain: "Đúng vì tại x = -3 đồ thị đạt đỉnh cao cục bộ." }
            ]
          },
          {
            id: "gk1-s6-p2-2",
            context: "Câu 2. Cho hàm số $f(x) = \\frac{2x - 3}{5x^2 - 15x + 10}$. Xét tính đúng sai của các mệnh đề sau:",
            items: [
              { text: "a) Đồ thị hàm số f(x) có ba đường tiệm cận.", answer: true, explain: "Đúng: Mẫu 5(x - 1)(x - 2) = 0 cho 2 TCĐ x = 1, x = 2; bậc tử nhỏ hơn mẫu cho 1 TCN y = 0. Tổng 3 tiệm cận." },
              { text: "b) Đường thẳng x = 1, x = 2 là hai đường tiệm cận đứng của đồ thị hàm số.", answer: true, explain: "Đúng vì tại x = 1 và 2 tử số không triệt tiêu." },
              { text: "c) Đường thẳng x = 0 là tiệm cận ngang của đồ thị hàm số.", answer: false, explain: "Sai vì tiệm cận ngang phải có dạng y = 0, không phải x = 0." },
              { text: "d) Hàm số đã cho có hai điểm cực trị.", answer: false, explain: "Sai vì hàm số không có cực trị trên tập xác định." }
            ]
          },
          {
            id: "gk1-s6-p2-3",
            context: "Câu 3. Cho hàm số $y = \\frac{ax + b}{cx + d}$ ($ad - bc \\ne 0, c \\ne 0$) có đồ thị cắt $Ox$ tại điểm có hoành độ dương, cắt $Oy$ tại điểm có tung độ âm, tiệm cận đứng $x > 0$ và tiệm cận ngang $y > 0$. Giả sử $c = 1$.",
            items: [
              { text: "a) Hệ số d < 0.", answer: true, explain: "Đúng vì tiệm cận đứng x = -d > 0 => d < 0." },
              { text: "b) Hệ số a > 0.", answer: true, explain: "Đúng vì tiệm cận ngang y = a > 0 => a > 0." },
              { text: "c) Giao điểm với trục tung có tung độ y = b/d < 0.", answer: true, explain: "Đúng vì đồ thị cắt trục tung tại điểm có tung độ âm." },
              { text: "d) Hệ số b < 0.", answer: false, explain: "Sai vì b/d < 0 mà d < 0 nên b > 0." }
            ]
          },
          {
            id: "gk1-s6-p2-4",
            context: "Câu 4. Trong không gian $Oxyz$, cho hình hộp $ABCD.A'B'C'D'$ có $A(4; 6; -5), B(5; 7; -4), C(5; 6; -4), D'(2; 0; 2)$.",
            items: [
              { text: "a) Ta có: vectơ AB = (1; 1; 1).", answer: true, explain: "Đúng: AB = (5-4; 7-6; -4-(-5)) = (1; 1; 1)." },
              { text: "b) Tọa độ của điểm D là (4; 5; -5).", answer: true, explain: "Đúng: D = C - AB = (4; 5; -5)." },
              { text: "c) Độ dài các cạnh bên AA' = BB' = CC' = DD'.", answer: true, explain: "Đúng theo tính chất các cạnh bên song song và bằng nhau của hình hộp." },
              { text: "d) Tọa độ của điểm C' là (1; 3; 1).", answer: false, explain: "Sai: DD' = (-2; -5; 7) => C' = C + DD' = (3; 1; 3)." }
            ]
          }
        ]
      },
      part3: {
        name: "Phần III: Câu hỏi trắc nghiệm trả lời ngắn (Điền số)",
        desc: "6 câu hỏi (3.0 điểm - Mỗi câu đúng được 0.5 điểm)",
        questions: [
          {
            id: "gk1-s6-p3-1",
            text: "Câu 1. Cho bất phương trình $x^2 - (m + 1)x - m + 2 \\ge 0$, với $m$ là tham số thực. Tìm giá trị lớn nhất của $m$ sao cho bất phương trình đã cho nghiệm đúng với mọi $x \\in [0; 4]$.",
            answer: "1",
            acceptAnswers: ["1", "m=1", "m = 1", "1.0"],
            explain: "$m \\le g(x) = \\frac{x^2 - x + 2}{x + 1}, \\forall x \\in [0; 4]$. Ta có $\\min_{[0; 4]} g(x) = g(1) = 1 \\Rightarrow m_{\\max} = 1$."
          },
          {
            id: "gk1-s6-p3-2",
            text: "Câu 2. Người ta muốn làm một chiếc hộp hình hộp chữ nhật có đáy hình vuông và thể tích $V = 10\\text{ dm}^3$. Diện tích toàn phần nhỏ nhất của hộp là bao nhiêu $\\text{dm}^2$? (Làm tròn kết quả đến hàng phần mười)",
            answer: "27.8",
            acceptAnswers: ["27.8", "27,8", "28"],
            explain: "$S(x) = 2x^2 + 40/x$. Khảo sát đạt giá trị nhỏ nhất khi $x = \\sqrt[3]{10}$, $S_{\\min} = 6 \\cdot 10^{2/3} \\approx 27.85 \\approx 27.8\\text{ dm}^2$."
          },
          {
            id: "gk1-s6-p3-3",
            text: "Câu 3. Số lượng ong trong một đàn sau $t$ tuần được mô hình hóa bởi $P(t) = \\frac{20000}{1 + 1000e^{-0.8t}}$ ($0 \\le t \\le 20$). Tại thời điểm nào thì số lượng ong trong đàn tăng nhanh nhất? (Làm tròn kết quả đến hàng đơn vị của tuần)",
            answer: "9",
            acceptAnswers: ["9", "t=9", "t = 9", "9 tuần"],
            explain: "Tốc độ tăng $P'(t)$ đạt cực đại tại điểm uốn $P(t) = 10000 \\Leftrightarrow e^{0.8t} = 1000 \\Rightarrow t = \\frac{\\ln 1000}{0.8} \\approx 8.63 \\approx 9$ tuần."
          },
          {
            id: "gk1-s6-p3-4",
            text: "Câu 4. Cho hình hộp $ABCD.A'B'C'D'$ có tất cả các cạnh bằng $2\\sqrt{6}$, các góc $\\widehat{BAA'} = \\widehat{BAD} = \\widehat{DAA'} = 60^\\circ$. Tính độ dài đường chéo $AC'$:",
            answer: "12",
            acceptAnswers: ["12", "AC'=12", "12.0"],
            explain: "$|\\vec{AC'}|^2 = |\\vec{a}+\\vec{b}+\\vec{c}|^2 = 3(24) + 6(24 \\cos 60^\\circ) = 72 + 72 = 144 \\Rightarrow AC' = 12$."
          },
          {
            id: "gk1-s6-p3-5",
            text: "Câu 5. Trong không gian với hệ tọa độ $Oxyz$, cho $\\vec{a} = (1; x + 1; 1), \\vec{b} = (2; 1; -1), \\vec{c} = (1; 3; -3)$. Giá trị nhỏ nhất của $P = |\\vec{a} + \\vec{b}| + |\\vec{a} - \\vec{c}|$ xấp xỉ bằng bao nhiêu? (Làm tròn đến hàng đơn vị)",
            answer: "8",
            acceptAnswers: ["8", "8.0", "sqrt(65)"],
            explain: "$P = \\sqrt{9 + (x+2)^2} + \\sqrt{16 + (x-2)^2} \\ge \\sqrt{(3+4)^2 + (x+2+2-x)^2} = \\sqrt{65} \\approx 8.06 \\approx 8$."
          },
          {
            id: "gk1-s6-p3-6",
            text: "Câu 6. Cho các số thực dương $x, y, z$ thỏa mãn $x + y + z = 4$ và $xy + yz + zx = 5$. Tìm giá trị nhỏ nhất của biểu thức $P = x^3 + y^3 + z^3$:",
            answer: "16",
            acceptAnswers: ["16", "16.0"],
            explain: "$P = 4 + 3xyz$. Điều kiện để đa thức có 3 nghiệm thực dương cho $xyz \\ge 4$, suy ra $P_{\\min} = 4 + 3(4) = 16$."
          }
        ]
      }
    }
  },
  {
    id: "gk1-de-so-7",
    title: "Đề 2: Đề Ôn Tập Giữa Học Kỳ I - Đề Số 7",
    subtitle: "Tính đơn điệu, GTLN-GTNN, Tiệm cận, Tọa độ vectơ Oxyz & Mô hình toán thực tế (Đề số 7)",
    timeMinutes: 90,
    totalQuestions: 22,
    maxScore: 10.0,
    badge: "Đề Số 7 (Chuẩn 2025)",
    sections: {
      part1: {
        name: "Phần I: Câu hỏi trắc nghiệm 4 lựa chọn",
        desc: "12 câu hỏi (3.0 điểm - Mỗi câu đúng được 0.25 điểm)",
        questions: [
          {
            id: "gk1-s7-p1-1",
            text: "Cho hàm số $y = f(x)$ có đồ thị như hình vẽ bên (đạt cực tiểu tại $x = -1$ và cực đại tại $x = 1$). Hàm số đã cho đồng biến trên khoảng nào dưới đây?",
            options: ["A. $(-\\infty; -1)$", "B. $(-1; 1)$", "C. $(-1; 0)$", "D. $(0; 1)$"],
            answer: 1,
            explain: "Đồ thị đi lên từ trái sang phải trên khoảng $(-1; 1)$, do đó hàm số đồng biến trên khoảng $(-1; 1)$."
          },
          {
            id: "gk1-s7-p1-2",
            text: "Cho hàm số $y = f(x)$ có đạo hàm $f'(x) = (x + 2)^2(x - 1), \\forall x \\in \\mathbb{R}$. Số điểm cực trị của hàm số đã cho là:",
            options: ["A. 2", "B. 0", "C. 3", "D. 1"],
            answer: 3,
            explain: "Phương trình $f'(x) = 0$ có nghiệm bội chẵn $x = -2$ (không đổi dấu) và nghiệm đơn $x = 1$ (có đổi dấu). Do đó hàm số chỉ có 1 điểm cực trị."
          },
          {
            id: "gk1-s7-p1-3",
            text: "Cho hàm số $y = f(x)$ liên tục trên đoạn $[-1; 3]$ có $\\max_{[-1; 3]} f(x) = M = 3$ và $\\min_{[-1; 3]} f(x) = m = -5$. Giá trị của $M + m$ là:",
            options: ["A. 2", "B. -6", "C. -5", "D. -2"],
            answer: 3,
            explain: "$M + m = 3 + (-5) = -2$."
          },
          {
            id: "gk1-s7-p1-4",
            text: "Giá trị lớn nhất của hàm số $f(x) = x^4 - 4x^2 + 5$ trên đoạn $[-2; 3]$ bằng:",
            options: ["A. 122", "B. 50", "C. 5", "D. 1"],
            answer: 1,
            explain: "$f'(x) = 4x^3 - 8x = 0 \\Leftrightarrow x = 0, x = \\pm\\sqrt{2}$. Các giá trị: $f(0) = 5, f(\\pm\\sqrt{2}) = 1, f(-2) = 5, f(3) = 50$. Giá trị lớn nhất bằng 50."
          },
          {
            id: "gk1-s7-p1-5",
            text: "Tiệm cận đứng của đồ thị hàm số $y = \\frac{x + 1}{x + 3}$ là đường thẳng:",
            options: ["A. $x = -1$", "B. $x = 1$", "C. $x = -3$", "D. $x = 3$"],
            answer: 2,
            explain: "Nghiệm của mẫu là $x = -3$, giới hạn tiến ra vô cực nên $x = -3$ là tiệm cận đứng."
          },
          {
            id: "gk1-s7-p1-6",
            text: "Giao điểm của đường tiệm cận đứng và tiệm cận xiên của đồ thị hàm số $y = \\frac{2x^2 - 3x + 2}{x - 1}$ là:",
            options: ["A. $(1; 2)$", "B. $(1; 1)$", "C. $(1; -1)$", "D. $(1; 0)$"],
            answer: 1,
            explain: "Tiệm cận đứng $x = 1$, tiệm cận xiên $y = 2x - 1$. Giao điểm là $(1; 1)$."
          },
          {
            id: "gk1-s7-p1-7",
            text: "Đồ thị có tiệm cận đứng $x = -1$, tiệm cận xiên $y = 2x + 1$ và cắt trục tung tại $(0; 1)$ là của hàm số:",
            options: [
              "A. $y = \\frac{2x^2 + 3x + 1}{x + 1}$",
              "B. $y = \\frac{x^2 + x + 4}{x + 1}$",
              "C. $y = \\frac{-x^2 - 3x + 10}{x + 1}$",
              "D. $y = \\frac{3x^2 + 5x - 2}{x + 1}$"
            ],
            answer: 0,
            explain: "Hàm $y = \\frac{2x^2 + 3x + 1}{x + 1}$ có dạng tiệm cận xiên $y = 2x + 1$ và cắt trục tung tại $(0; 1)$."
          },
          {
            id: "gk1-s7-p1-8",
            text: "Đồ thị hàm số $y = -x^3 + 2x^2 - 1$ cắt trục tung tại điểm có tung độ bằng:",
            options: ["A. 3", "B. 1", "C. -1", "D. 0"],
            answer: 2,
            explain: "Cho $x = 0 \\Rightarrow y = -1$."
          },
          {
            id: "gk1-s7-p1-9",
            text: "Cho tứ diện $ABCD$. Gọi $G$ là trọng tâm tam giác $ABC$. Tìm giá trị $k$ thỏa mãn $\\vec{DA} + \\vec{DB} + \\vec{DC} = k\\vec{DG}$:",
            options: ["A. $k = 2$", "B. $k = 3$", "C. $k = 1/2$", "D. $k = 1/3$"],
            answer: 1,
            explain: "$\\vec{DA} + \\vec{DB} + \\vec{DC} = 3\\vec{DG} \\Rightarrow k = 3$."
          },
          {
            id: "gk1-s7-p1-10",
            text: "Cho hình hộp $ABCD.A'B'C'D'$ với tâm $O$. Chọn khẳng định SAI:",
            options: [
              "A. $\\vec{AB} + \\vec{AA'} = \\vec{AD} + \\vec{DD'}$",
              "B. $\\vec{AC'} = \\vec{AB} + \\vec{AD} + \\vec{AA'}$",
              "C. $\\vec{AB} + \\vec{BC'} + \\vec{CD} + \\vec{D'A} = \\vec{0}$",
              "D. $\\vec{AB} + \\vec{BC} + \\vec{CC'} = \\vec{AD'} + \\vec{D'O} + \\vec{OC'}$"
            ],
            answer: 0,
            explain: "Mệnh đề A sai vì $\\vec{AB} + \\vec{AA'} = \\vec{AB'} \\ne \\vec{AD'} = \\vec{AD} + \\vec{DD'}$."
          },
          {
            id: "gk1-s7-p1-11",
            text: "Trong không gian $Oxyz$, cho hai điểm $A(1; 1; -2)$ và $B(2; 2; 1)$. Vectơ $\\vec{AB}$ có tọa độ là:",
            options: ["A. $(-1; -1; -3)$", "B. $(3; 1; 1)$", "C. $(1; 1; 3)$", "D. $(3; 3; -1)$"],
            answer: 2,
            explain: "$\\vec{AB} = (2-1; 2-1; 1-(-2)) = (1; 1; 3)$."
          },
          {
            id: "gk1-s7-p1-12",
            text: "Trong không gian $Oxyz$, góc giữa hai vectơ $\\vec{i} = (1; 0; 0)$ và $\\vec{u} = (-\\sqrt{3}; 0; 1)$ là:",
            options: ["A. $120^\\circ$", "B. $60^\\circ$", "C. $150^\\circ$", "D. $30^\\circ$"],
            answer: 2,
            explain: "$\\cos(\\vec{i}, \\vec{u}) = -\\sqrt{3}/2 \\Rightarrow$ góc giữa hai vectơ là $150^\\circ$."
          }
        ]
      },
      part2: {
        name: "Phần II: Câu hỏi trắc nghiệm Đúng / Sai",
        desc: "4 câu hỏi (16 ý - 4.0 điểm. Đúng 1 ý: 0.1đ | Đúng 2 ý: 0.25đ | Đúng 3 ý: 0.5đ | Đúng 4 ý: 1.0đ)",
        questions: [
          {
            id: "gk1-s7-p2-1",
            context: "Câu 1. Cho hàm số $y = f(x)$ có đồ thị đạo hàm $y = f'(x)$ cắt trục hoành tại $x = -3, x = 0, x = 2$.",
            items: [
              { text: "a) Hàm số y = f(x) đồng biến trên khoảng (0; 2).", answer: true, explain: "Đúng vì f'(x) > 0 trên khoảng (0; 2)." },
              { text: "b) Hàm số y = f(x) nghịch biến trên khoảng (-3; 2).", answer: false, explain: "Sai vì f'(x) đổi dấu trên khoảng này." },
              { text: "c) Hàm số đạt cực đại tại x = -3.", answer: false, explain: "Sai vì f'(x) đổi dấu từ âm sang dương nên x = -3 là cực tiểu." },
              { text: "d) Hàm số đạt cực tiểu tại x = 2.", answer: false, explain: "Sai vì f'(x) đổi dấu từ dương sang âm nên x = 2 là cực đại." }
            ]
          },
          {
            id: "gk1-s7-p2-2",
            context: "Câu 2. Cho hàm số $y = f(x)$ có bảng biến thiên với tiệm cận đứng $x = -2$, tiệm cận ngang $y = 0$, điểm cực đại $(0; 1)$.",
            items: [
              { text: "a) Đồ thị hàm số đã cho có hai đường tiệm cận đứng.", answer: false, explain: "Sai vì chỉ có 1 đường tiệm cận đứng x = -2." },
              { text: "b) Đường thẳng y = 0 là tiệm cận ngang của đồ thị hàm số đã cho.", answer: true, explain: "Đúng theo giới hạn vô cực." },
              { text: "c) Hàm số đã cho có 2 điểm cực trị.", answer: false, explain: "Sai vì chỉ có 1 điểm cực trị x = 0." },
              { text: "d) Giá trị cực đại của hàm số đã cho bằng 1.", answer: true, explain: "Đúng: y_CĐ = f(0) = 1." }
            ]
          },
          {
            id: "gk1-s7-p2-3",
            context: "Câu 3. Cho hàm số $y = f(x) = \\frac{ax^2 + bx + c}{mx + n}$ ($a, m \\ne 0$) có đồ thị là đường cong phân thức bậc 2 trên bậc 1.",
            items: [
              { text: "a) Hàm số đồng biến trên (-∞; -3) và (-1; +∞), nghịch biến trên (-3; -2) và (-2; -1).", answer: true, explain: "Đúng theo chiều biến thiên của đồ thị." },
              { text: "b) Đồ thị hàm số có tiệm cận đứng x = -2, tiệm cận xiên y = x + 1.", answer: true, explain: "Đúng theo hình vẽ." },
              { text: "c) Phương trình f(x) = 3 có ba nghiệm phân biệt.", answer: false, explain: "Sai vì hàm phân thức bậc 2 trên bậc 1 cắt đường nằm ngang tối đa tại 2 điểm." },
              { text: "d) Khi m = 1 thì đồ thị hàm số đi qua điểm A(1; 7/3).", answer: true, explain: "Đúng." }
            ]
          },
          {
            id: "gk1-s7-p2-4",
            context: "Câu 4. Trong không gian $Oxyz$, cho hình hộp $ABCD.A'B'C'D'$ có $A'(1; 0; 1), B'(2; 1; 2), D'(1; -1; 1), C(4; 5; -5)$.",
            items: [
              { text: "a) Tọa độ của vectơ A'D' là (0; -1; 0).", answer: true, explain: "Đúng: A'D' = (0; -1; 0)." },
              { text: "b) Gọi tọa độ điểm B là (xB; yB; zB), ta có vectơ BC = (4 - xB; 5 - yB; -5 - zB).", answer: true, explain: "Đúng theo công thức tọa độ vectơ." },
              { text: "c) Trong hình hộp ABCD.A'B'C'D', ta có: vectơ BC = vectơ A'D'.", answer: true, explain: "Đúng theo tính chất các cạnh đối diện hình hộp." },
              { text: "d) Tọa độ điểm B là (4; 4; -5).", answer: false, explain: "Sai: BC = A'D' = (0; -1; 0) => B = (4; 6; -5)." }
            ]
          }
        ]
      },
      part3: {
        name: "Phần III: Câu hỏi trắc nghiệm trả lời ngắn (Điền số)",
        desc: "6 câu hỏi (3.0 điểm - Mỗi câu đúng được 0.5 điểm)",
        questions: [
          {
            id: "gk1-s7-p3-1",
            text: "Câu 1. Một ngọn hải đăng ở vị trí $A$ cách bờ biển $AB = 4\\text{ km}$. Kho ở $C$ cách $B$ là $7\\text{ km}$. Người canh chèo đò từ $A$ đến $M$ với vận tốc $6\\text{ km/h}$, rồi đi xe đạp từ $M$ đến $C$ với vận tốc $10\\text{ km/h}$. Người đó nên chèo thuyền bao nhiêu km để đến nơi nhanh nhất?",
            answer: "5",
            acceptAnswers: ["5", "5 km", "5km", "5.0"],
            explain: "Đặt $BM = x$. Thời gian $T(x) = \\frac{\\sqrt{16+x^2}}{6} + \\frac{7-x}{10}$. Giải $T'(x) = 0 \\Leftrightarrow x = 3\\text{ km}$. Khoảng cách chèo thuyền $AM = \\sqrt{4^2 + 3^2} = 5\\text{ km}$."
          },
          {
            id: "gk1-s7-p3-2",
            text: "Câu 2. Nồng độ thuốc trong máu sau khi tiêm được tính bởi $C(t) = \\frac{0.15t}{t^2 + 1}$ (mg/cm³) với $t \\ge 0$ (giờ). Nồng độ thuốc lớn nhất là bao nhiêu mg/cm³? (Làm tròn đến hàng phần trăm)",
            answer: "0.08",
            acceptAnswers: ["0.08", "0,08", "0.075"],
            explain: "Theo BĐT Cauchy: $t^2 + 1 \\ge 2t \\Rightarrow C(t) \\le 0.075$. Làm tròn đến hàng phần trăm là 0.08."
          },
          {
            id: "gk1-s7-p3-3",
            text: "Câu 3. Người ta muốn làm một chiếc hộp kim loại hình hộp chữ nhật có thể tích $72\\text{ cm}^3$ và đáy có chiều dài gấp đôi chiều rộng. Tính diện tích toàn phần nhỏ nhất của chiếc hộp (theo cm²):",
            answer: "108",
            acceptAnswers: ["108", "108 cm2", "108.0"],
            explain: "$S = 4x^2 + 216/x \\ge 3\\sqrt[3]{4x^2 \\cdot (108/x)^2} = 108\\text{ cm}^2$."
          },
          {
            id: "gk1-s7-p3-4",
            text: "Câu 4. Trong phân tử metan $\\text{CH}_4$, bốn nguyên tử H ở 4 đỉnh của tứ diện đều và C ở trọng tâm. Tính số đo góc liên kết $\\widehat{\\text{H-C-H}}$ (Làm tròn đến hàng đơn vị của độ):",
            answer: "109",
            acceptAnswers: ["109", "109°", "109 độ", "109.5"],
            explain: "$\\cos \\alpha = -1/3 \\Rightarrow \\alpha \\approx 109.47^\\circ \\approx 109^\\circ$."
          },
          {
            id: "gk1-s7-p3-5",
            text: "Câu 5. Con chim bay thẳng đều từ $A(20; 40; 30)$ đến $B(40; 50; 50)$ trong 4 phút. Tiếp tục bay thêm 2 phút nữa đến $C(a; b; c)$. Tính tổng $a + b + c$:",
            answer: "165",
            acceptAnswers: ["165", "165.0"],
            explain: "Vận tốc $\\vec{v} = \\vec{AB}/4 = (5; 2.5; 5)$. Sau 2 phút nữa $C = B + 2\\vec{v} = (50; 55; 60)$. Tổng $a + b + c = 165$."
          },
          {
            id: "gk1-s7-p3-6",
            text: "Câu 6. Cho các số thực $x, y$ thỏa mãn $x + y = 2(\\sqrt{x - 3} + \\sqrt{y + 3})$. Tìm giá trị nhỏ nhất của biểu thức $P = 4(x^2 + y^2) + 15xy$:",
            answer: "0",
            acceptAnswers: ["0", "-12", "0.0"],
            explain: "Đánh giá biến thiên của $x+y$ từ điều kiện $x \\ge 3, y \\ge -3$ tìm được giá trị nhỏ nhất của biểu thức $P$."
          }
        ]
      }
    }
  },
  {
    id: "gk1-de-so-8",
    title: "Đề 3: Đề Ôn Tập Giữa Học Kỳ I - Đề Số 8",
    subtitle: "Đạo hàm khảo sát đồ thị hàm số, Tích vô hướng & Tọa độ không gian (Đề số 8)",
    timeMinutes: 90,
    totalQuestions: 22,
    maxScore: 10.0,
    badge: "Đề Số 8 (Chuẩn 2025)",
    sections: {
      part1: {
        name: "Phần I: Câu hỏi trắc nghiệm 4 lựa chọn",
        desc: "12 câu hỏi (3.0 điểm - Mỗi câu đúng được 0.25 điểm)",
        questions: [
          {
            id: "gk1-s8-p1-1",
            text: "Cho hàm số $y = f(x)$ có đồ thị là đường cong bậc 4 trùng phương hình chữ W. Hàm số đã cho nghịch biến trên khoảng nào dưới đây?",
            options: ["A. $(-1; 0)$", "B. $(-\\infty; -1)$", "C. $(0; 1)$", "D. $(0; +\\infty)$"],
            answer: 1,
            explain: "Đồ thị đi xuống từ trái sang phải trên $(-\\infty; -1)$ và $(0; 1)$, do đó hàm số nghịch biến trên khoảng $(-\\infty; -1)$."
          },
          {
            id: "gk1-s8-p1-2",
            text: "Cho hàm số $f(x)$ có đạo hàm $f'(x) = (x - 1)(x - 2)^2(x - 3)^3(x - 4)^4, \\forall x \\in \\mathbb{R}$. Số điểm cực trị của hàm số đã cho là:",
            options: ["A. 3", "B. 5", "C. 2", "D. 4"],
            answer: 2,
            explain: "Chỉ các nghiệm bội lẻ mới làm đổi dấu đạo hàm: $x = 1$ (bậc 1) và $x = 3$ (bậc 3). Các nghiệm $x = 2, 4$ có số mũ chẵn. Vậy có 2 điểm cực trị."
          },
          {
            id: "gk1-s8-p1-3",
            text: "Cho hàm số $y = f(x)$ có bảng biến thiên trên $[-5; 7)$ với giá trị nhỏ nhất tại $x = 2, y = 2$ và cực đại tại $x = -1, y = 9$. Mệnh đề nào dưới đây ĐÚNG?",
            options: ["A. $\\min_{[-5; 7)} f(x) = 6$", "B. $\\min_{[-5; 7)} f(x) = 2$", "C. $\\max_{[-5; 7)} f(x) = 9$", "D. $\\max_{[-5; 7)} f(x) = 6$"],
            answer: 1,
            explain: "Dựa vào bảng biến thiên, giá trị nhỏ nhất của hàm số trên $[-5; 7)$ là $f(2) = 2$."
          },
          {
            id: "gk1-s8-p1-4",
            text: "Tìm giá trị nhỏ nhất $m$ của hàm số $y = x^4 - x^2 + 13$ trên đoạn $[-2; 3]$:",
            options: ["A. $m = 13$", "B. $m = 51/4$", "C. $m = 51/2$", "D. $m = 49/4$"],
            answer: 1,
            explain: "$y = (x^2 - 1/2)^2 + 51/4 \\ge 51/4$. Đạt được khi $x = \\pm 1/\\sqrt{2} \\in [-2; 3]$."
          },
          {
            id: "gk1-s8-p1-5",
            text: "Cho hàm số $y = f(x)$ có bảng biến thiên với $\\lim_{x \\to -2^-} f(x) = -\\infty$ và $\\lim_{x \\to -2^+} f(x) = +\\infty$. Tiệm cận đứng của đồ thị hàm số là:",
            options: ["A. $x = -1$", "B. $y = -1$", "C. $y = -2$", "D. $x = -2$"],
            answer: 3,
            explain: "Giới hạn tại $-2$ bằng vô cực nên $x = -2$ là tiệm cận đứng."
          },
          {
            id: "gk1-s8-p1-6",
            text: "Cho hàm số $y = \\frac{3x^2 + 5x - 4}{-5x + 4}$. Đường tiệm cận xiên của hàm số là:",
            options: ["A. $y = -\\frac{3}{5}x - \\frac{37}{25}$", "B. $y = -\\frac{3}{5}x + \\frac{37}{25}$", "C. $y = \\frac{3}{5}x - \\frac{37}{25}$", "D. $y = -\\frac{3}{5}x$"],
            answer: 0,
            explain: "Chia tử cho mẫu: $y = -\\frac{3}{5}x - \\frac{37}{25} + \\frac{48/25}{-5x + 4}$."
          },
          {
            id: "gk1-s8-p1-7",
            text: "Đồ thị có tiệm cận đứng $x = 2$, tiệm cận xiên $y = -2x + 5$ và cắt trục tung tại $(0; 5)$ là của hàm số:",
            options: [
              "A. $y = \\frac{2x^2 - 9x + 10}{-x + 2}$",
              "B. $y = \\frac{2x^2 - 9x + 10}{x + 2}$",
              "C. $y = \\frac{x^2 - 5x + 7}{x + 2}$",
              "D. $y = \\frac{x^2 - 5x + 7}{-x + 2}$"
            ],
            answer: 0,
            explain: "Hàm $y = \\frac{2x^2 - 9x + 10}{-x + 2}$ có mẫu triệt tiêu tại $x = 2$, tiệm cận xiên $y = -2x + 5$ và cắt trục tung tại $(0; 5)$."
          },
          {
            id: "gk1-s8-p1-8",
            text: "Đồ thị của hàm số $y = -2x^3 + 3x^2 - 5$ cắt trục tung tại điểm có tung độ bằng:",
            options: ["A. -5", "B. 0", "C. -1", "D. 2"],
            answer: 0,
            explain: "Cho $x = 0 \\Rightarrow y = -5$."
          },
          {
            id: "gk1-s8-p1-9",
            text: "Cho hình chóp $S.ABCD$ đáy là hình bình hành. Đặt $\\vec{SA} = \\vec{a}, \\vec{SB} = \\vec{b}, \\vec{SC} = \\vec{c}, \\vec{SD} = \\vec{d}$. Khẳng định nào ĐÚNG?",
            options: ["A. $\\vec{a} + \\vec{b} + \\vec{c} + \\vec{d} = \\vec{0}$", "B. $\\vec{a} + \\vec{b} = \\vec{c} + \\vec{d}$", "C. $\\vec{a} + \\vec{d} = \\vec{b} + \\vec{c}$", "D. $\\vec{a} + \\vec{c} = \\vec{b} + \\vec{d}$"],
            answer: 3,
            explain: "$\\vec{SA} + \\vec{SC} = 2\\vec{SO} = \\vec{SB} + \\vec{SD} \\Rightarrow \\vec{a} + \\vec{c} = \\vec{b} + \\vec{d}$."
          },
          {
            id: "gk1-s8-p1-10",
            text: "Cho tứ diện $ABCD$. Gọi $P, Q$ lần lượt là trung điểm của $AB$ và $CD$. Chọn khẳng định ĐÚNG:",
            options: [
              "A. $\\vec{PQ} = \\frac{1}{2}(\\vec{BC} + \\vec{AD})$",
              "B. $\\vec{PQ} = \\frac{1}{2}(\\vec{BC} - \\vec{AD})$",
              "C. $\\vec{PQ} = \\vec{BC} + \\vec{AD}$",
              "D. $\\vec{PQ} = \\frac{1}{4}(\\vec{BC} + \\vec{AD})$"
            ],
            answer: 0,
            explain: "$\\vec{PQ} = \\frac{1}{2}(\\vec{AD} + \\vec{BC})$."
          },
          {
            id: "gk1-s8-p1-11",
            text: "Trong không gian $Oxyz$, cho hai điểm $A(1; 1; -1)$ và $B(2; 3; 2)$. Vectơ $\\vec{AB}$ có tọa độ là:",
            options: ["A. $(1; 2; 3)$", "B. $(-1; -2; -3)$", "C. $(3; 5; 1)$", "D. $(3; 4; 1)$"],
            answer: 0,
            explain: "$\\vec{AB} = (2-1; 3-1; 2-(-1)) = (1; 2; 3)$."
          },
          {
            id: "gk1-s8-p1-12",
            text: "Trong không gian với hệ tọa độ $Oxyz$, cho vectơ $\\vec{u} = (3; 0; 1)$ và $\\vec{v} = (2; 1; 0)$. Tính tích vô hướng $\\vec{u} \\cdot \\vec{v}$:",
            options: ["A. 8", "B. 6", "C. 0", "D. -6"],
            answer: 1,
            explain: "$\\vec{u} \\cdot \\vec{v} = 3(2) + 0(1) + 1(0) = 6$."
          }
        ]
      },
      part2: {
        name: "Phần II: Câu hỏi trắc nghiệm Đúng / Sai",
        desc: "4 câu hỏi (16 ý - 4.0 điểm. Đúng 1 ý: 0.1đ | Đúng 2 ý: 0.25đ | Đúng 3 ý: 0.5đ | Đúng 4 ý: 1.0đ)",
        questions: [
          {
            id: "gk1-s8-p2-1",
            context: "Câu 1. Cho hàm số $y = f(x) = ax^3 + bx^2 + cx + d$ ($a \\ne 0$) có đồ thị đạo hàm $f'(x)$ là parabol có đỉnh $(-1; -3)$ và cắt trục hoành tại $x = -2$ và $x = 1$.",
            items: [
              { text: "a) Điểm cực tiểu của hàm số y = f(x) là x_CT = 1.", answer: true, explain: "Đúng vì f'(x) đổi dấu từ âm sang dương qua x = 1." },
              { text: "b) Điểm cực đại của hàm số y = f(x) là x_CĐ = -2.", answer: true, explain: "Đúng vì f'(x) đổi dấu từ dương sang âm qua x = -2." },
              { text: "c) Hàm số y = f(x) đồng biến trên khoảng (0; 1).", answer: false, explain: "Sai vì trên (0; 1) đồ thị f'(x) nằm dưới trục hoành nên f'(x) < 0, hàm số nghịch biến." },
              { text: "d) Hàm số y = f(x) nghịch biến trên (2025; 2026).", answer: false, explain: "Sai vì với x > 1 thì f'(x) > 0 nên hàm số đồng biến." }
            ]
          },
          {
            id: "gk1-s8-p2-2",
            context: "Câu 2. Cho hàm số $y = \\frac{3x - 2}{2x - 3}$. Xét tính đúng sai của các mệnh đề sau:",
            items: [
              { text: "a) Hàm số đã cho đồng biến trên mỗi khoảng xác định.", answer: false, explain: "Sai vì y' = -5 / (2x - 3)² < 0, hàm số nghịch biến trên từng khoảng xác định." },
              { text: "b) Tiệm cận đứng của đồ thị hàm số là đường thẳng x = 3/2.", answer: true, explain: "Đúng vì mẫu số triệt tiêu tại x = 3/2." },
              { text: "c) Hàm số đã cho có một điểm cực trị.", answer: false, explain: "Sai vì hàm phân thức bậc nhất trên bậc nhất không có cực trị." },
              { text: "d) Tiệm cận ngang của đồ thị hàm số là đường thẳng y = 3/2.", answer: true, explain: "Đúng vì giới hạn khi x tiến ra vô cực là 3/2." }
            ]
          },
          {
            id: "gk1-s8-p2-3",
            context: "Câu 3. Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R} \\setminus \\{-2\\}$ có bảng biến thiên với cực đại tại $(0; 2)$ và tiệm cận đứng $x = -2$.",
            items: [
              { text: "a) Hàm số có giá trị cực tiểu bằng 2.", answer: false, explain: "Sai vì 2 là giá trị cực đại." },
              { text: "b) Đường thẳng x = -2 là đường tiệm cận đứng của đồ thị hàm số.", answer: true, explain: "Đúng theo bảng biến thiên." },
              { text: "c) Đồ thị hàm số có một đường tiệm cận ngang.", answer: true, explain: "Đúng." },
              { text: "d) Hàm số đồng biến trên khoảng (-2; 0).", answer: true, explain: "Đúng vì f'(x) > 0 trên khoảng (-2; 0)." }
            ]
          },
          {
            id: "gk1-s8-p2-4",
            context: "Câu 4. Trong không gian với hệ tọa độ $Oxyz$, cho $\\vec{a} = (-1; 2; 3), \\vec{b} = (3; 1; -2), \\vec{c} = (4; 2; -3)$.",
            items: [
              { text: "a) 2 vectơ a = (-2; 4; 6).", answer: true, explain: "Đúng: 2(-1; 2; 3) = (-2; 4; 6)." },
              { text: "b) Vectơ u = 2a + b - 3c = (-11; -1; 13).", answer: true, explain: "Đúng: u = (-2+3-12; 4+1-6; 6-2+9) = (-11; -1; 13)." },
              { text: "c) Vectơ a + c = (3; 4; 0).", answer: true, explain: "Đúng: (-1+4; 2+2; 3-3) = (3; 4; 0)." },
              { text: "d) Tọa độ vectơ v sao cho v + 2b = a + c là (-3; 2; 4).", answer: true, explain: "Đúng: v = (a+c) - 2b = (3-6; 4-2; 0-(-4)) = (-3; 2; 4)." }
            ]
          }
        ]
      },
      part3: {
        name: "Phần III: Câu hỏi trắc nghiệm trả lời ngắn (Điền số)",
        desc: "6 câu hỏi (3.0 điểm - Mỗi câu đúng được 0.5 điểm)",
        questions: [
          {
            id: "gk1-s8-p3-1",
            text: "Câu 1. Sản xuất vỏ lon sữa bò hình trụ có thể tích $V = 250\\pi\\text{ cm}^3$. Bán kính đáy hình trụ bằng bao nhiêu cm để diện tích toàn phần là nhỏ nhất?",
            answer: "5",
            acceptAnswers: ["5", "5 cm", "5km", "5.0"],
            explain: "$S_{tp} = 2\\pi r^2 + \\frac{500\\pi}{r}$. Đạt cực tiểu khi $r^3 = 125 \\Leftrightarrow r = 5\\text{ cm}$."
          },
          {
            id: "gk1-s8-p3-2",
            text: "Câu 2. Nồng độ hóa chất trong máu sau $t$ giờ tiêm là $C(t) = \\frac{3t}{27 + t^3}$ ($t \\ge 0$). Sau bao nhiêu giờ thì nồng độ hóa chất trong máu đạt cao nhất? (Làm tròn đến hàng phần trăm)",
            answer: "2.38",
            acceptAnswers: ["2.38", "2,38", "2.4"],
            explain: "$C'(t) = 0 \\Leftrightarrow t^3 = 13.5 \\Rightarrow t = \\sqrt[3]{13.5} \\approx 2.38$ giờ."
          },
          {
            id: "gk1-s8-p3-3",
            text: "Câu 3. Cho hình chữ nhật có hai đỉnh di động trên parabol $y = 9 - x^2$ với $x \\in (0; 3)$, hai đỉnh còn lại nằm trên trục hoành. Tìm diện tích lớn nhất của hình chữ nhật (Làm tròn đến hàng phần mười):",
            answer: "20.8",
            acceptAnswers: ["20.8", "20,8", "12*sqrt(3)", "20.78"],
            explain: "$S(x) = 2x(9 - x^2)$. $S_{\\max} = 12\\sqrt{3} \\approx 20.8$ khi $x = \\sqrt{3}$."
          },
          {
            id: "gk1-s8-p3-4",
            text: "Câu 4. Cho hình lập phương cạnh 1. Tính khoảng cách giữa hai điểm phân tích vectơ (Làm tròn đến 1 chữ số thập phân):",
            answer: "1.4",
            acceptAnswers: ["1.4", "1,4", "sqrt(2)"],
            explain: "Độ dài đoạn thẳng bằng $\\sqrt{2} \\approx 1.4$."
          },
          {
            id: "gk1-s8-p3-5",
            text: "Câu 5. Trong không gian $Oxyz$, cho $A(1; 3; -1), B(3; -1; 5), C(0; 5; 0)$. Tìm tọa độ điểm tối ưu hình học thỏa mãn tổng khoảng cách đạt giá trị nhỏ nhất:",
            answer: "3",
            acceptAnswers: ["3", "3.0"],
            explain: "Sử dụng tâm tỉ cự và hình chiếu hình học tìm được tọa độ điểm tối ưu."
          },
          {
            id: "gk1-s8-p3-6",
            text: "Câu 6. Cho các số thực dương $x, y$ thỏa mãn $2x + y = 5/4$. Tìm giá trị nhỏ nhất của biểu thức $P = \\frac{2}{x} + \\frac{1}{4y}$:",
            answer: "5",
            acceptAnswers: ["5", "5.0"],
            explain: "$P = \\frac{4}{2x} + \\frac{1/4}{y} \\ge \\frac{(2 + 1/2)^2}{2x + y} = \\frac{25/4}{5/4} = 5$."
          }
        ]
      }
    }
  }
];

console.log("EXAMS_PART1 loaded successfully with 3 exams (Đề 6, 7, 8).");
