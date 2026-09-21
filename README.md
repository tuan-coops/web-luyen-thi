# HỆ THỐNG LUYỆN TẬP & QUẢN TRỊ HỌC LIỆU TOÁN THPT (LỚP 10 - 11 - 12)

Hệ thống web học tập, luyện thi và quản trị học liệu môn Toán THPT chuẩn chương trình Giáo dục phổ thông (GDPT) 2018 và cấu trúc đề thi định dạng mới nhất của Bộ Giáo dục & Đào tạo. Ứng dụng hoạt động thuần Web (HTML5, CSS3, Vanilla JS), không phụ thuộc backend hay cài đặt thư viện phức tạp (Zero-dependency), sẵn sàng triển khai toàn cầu trên Vercel.

---

## 🌐 HỆ THỐNG ĐIỀU HƯỚNG URL ĐA CẤP (HIERARCHICAL URL ROUTING)

Hệ thống được thiết kế với kiến trúc **Client-Side Router chuẩn RESTful / Hierarchical Deep Linking**, hỗ trợ lịch sử trình duyệt tự nhiên (Nút Back ⬅️ và Forward ➡️) và cho phép người dùng chia sẻ trực tiếp liên kết bài học hoặc phòng thi:

| Cấp độ URL | Đường dẫn mẫu | Ý nghĩa & Chức năng |
| :--- | :--- | :--- |
| **Cấp 1: Cửa ngõ** | `/login` | Màn hình Đăng nhập / Đăng ký tài khoản (Học sinh & Giáo viên) |
| | `/` hoặc `/chon-lop` | Màn hình chính chọn khối lớp (Lớp 10, Lớp 11, Lớp 12) |
| **Cấp 2: Khối lớp** | `/lop-10`, `/lop-11`, `/lop-12` | Màn hình chọn hình thức học: Ôn chuyên đề hay Luyện thi |
| **Cấp 3: Chuyên đề** | `/lop-12/chuyen-de` | Không gian chuyên đề mặc định của Lớp 12 |
| | `/lop-12/chuyen-de/don-dieu-cuc-tri` | Vào thẳng chuyên đề **Tính đơn điệu & Cực trị hàm số** |
| | `/lop-12/chuyen-de/gtln-gtnn` | Vào thẳng chuyên đề **Giá trị lớn nhất & nhỏ nhất** |
| | `/lop-12/chuyen-de/tiem-can` | Vào thẳng chuyên đề **Đường tiệm cận của đồ thị hàm số** |
| | `/lop-12/chuyen-de/khao-sat-ve-do-thi` | Vào thẳng chuyên đề **Khảo sát sự biến thiên & Vẽ đồ thị** |
| | `/lop-12/chuyen-de/ung-dung-thuc-te` | Vào thẳng chuyên đề **Ứng dụng đạo hàm giải toán thực tế** |
| **Bộ lọc Tab bài tập** | `?tab=mcq` | Mở trực tiếp tab Trắc nghiệm 4 lựa chọn |
| | `?tab=tf` | Mở trực tiếp tab Trắc nghiệm Đúng / Sai |
| | `?tab=short` | Mở trực tiếp tab Trả lời ngắn (Điền số) |
| | `?tab=essay` | Mở trực tiếp tab Tự luận chuyên sâu & Bài toán thực tế |
| | `?tab=exam` | Mở trực tiếp tab Thi thử nhanh 15 phút |
| **Cấp 3: Luyện thi** | `/lop-12/luyen-thi` | Danh mục toàn bộ các kỳ thi của Lớp 12 |
| | `/lop-12/luyen-thi/giua-hk1` | Danh sách 7 đề thi chuẩn Giữa Học kỳ 1 |
| | `/lop-12/luyen-thi/giua-hk1/de-6` | Phòng thi trực tuyến **Đề Số 6** (90 phút chuẩn 2025) |
| | `/lop-12/luyen-thi/giua-hk1/de-7` | Phòng thi trực tuyến **Đề Số 7** (Bài toán hải đăng & metan) |
| | `/lop-12/luyen-thi/giua-hk1/de-8` | Phòng thi trực tuyến **Đề Số 8** (Bài toán lon sữa bò) |
| | `/lop-12/luyen-thi/giua-hk1/de-9` | Phòng thi trực tuyến **Đề Số 9** (Mô hình quần thể cá) |
| | `/lop-12/luyen-thi/giua-hk1/de-10` | Phòng thi trực tuyến **Đề Số 10** (Lợi nhuận áo sơ mi & hợp lực) |
| | `/lop-12/luyen-thi/giua-hk1/de-11` | Phòng thi trực tuyến **Đề Số 11** (Vận tốc máy bay 3D) |
| | `/lop-12/luyen-thi/giua-hk1/de-12` | Phòng thi trực tuyến **Đề Số 12** (Hình trụ nội tiếp hình nón) |

*Ghi chú kỹ thuật:*
* Khi chạy trên máy chủ (Vercel / Localhost): Sử dụng chuẩn **HTML5 History Pathname** (`/lop-12/...`).
* Khi mở trực tiếp file nội bộ (`file:///.../index.html`): Tự động fallback sang **Hash Routing** (`#/lop-12/...`) giúp trang chạy mượt mà ngay cả khi không có môi trường web server.

---

## 🔐 TÍNH NĂNG ĐĂNG NHẬP & PHÂN QUYỀN TÀI KHOẢN (AUTHENTICATION)

Trang web sở hữu hệ thống xác thực người dùng hoàn chỉnh với giao diện Glassmorphism hiện đại:

### 1. Nút Đăng nhập Nhanh 1 Cú Nhấp Chuột (1-Click Demo Accounts)
Trên màn hình `/login`, người dùng có thể nhấp ngay vào một trong 2 tài khoản mẫu đã tạo sẵn để trải nghiệm ngay lập tức:
* **👨‍🎓 Học sinh mẫu:**
  - Tài khoản: `hocsinh`
  - Mật khẩu: `123`
  - Trải nghiệm: Giao diện học tập tập trung, sạch sẽ, làm bài thi, lưu điểm cá nhân.
* **👨‍🏫 Giáo viên mẫu:**
  - Tài khoản: `giaovien`
  - Mật khẩu: `123`
  - Trải nghiệm: Mở khóa thanh công cụ giáo viên, quyền thêm đề, sửa lý thuyết, thêm/sửa/xóa câu hỏi, xuất/nhập tệp JSON.

### 2. Đăng ký & Đăng nhập bằng Tài khoản & Mật khẩu
- Không cần email phức tạp: Người dùng chỉ cần đăng ký bằng **Tên tài khoản** và **Mật khẩu** (tối thiểu 3 ký tự).
- Hỗ trợ chọn vai trò: **👨‍🎓 Học sinh** hoặc **👨‍🏫 Giáo viên**.
- Mọi tài khoản và phiên đăng nhập được lưu trữ an toàn trong `localStorage` của trình duyệt.

### 3. Widget Người dùng trên Header
Trên thanh điều hướng của tất cả các màn hình:
* **Khi đã đăng nhập:** Hiển thị Avatar emoji, Tên tài khoản, Huy hiệu vai trò (`Học sinh` / `Giáo viên`) và Nút **Đăng xuất 🚪**.
* **Khi chưa đăng nhập:** Hiển thị nút **🔑 Đăng nhập / Đăng ký** dẫn trực tiếp đến `/login`.

---

## 🚀 HƯỚNG DẪN TRIỂN KHAI LÊN VERCEL (VERCEL DEPLOYMENT)

Hệ thống đã được cấu hình sẵn tệp `vercel.json` hỗ trợ Single Page Application (SPA Rewrites) và caching tối ưu. Bạn có thể deploy theo 2 cách cực kỳ đơn giản:

### Cách 1: Triển khai bằng Vercel CLI (Nhanh nhất - 30 giây)

1. **Cài đặt Vercel CLI (nếu chưa có):**
   ```bash
   npm install -g vercel
   ```
2. **Di chuyển vào thư mục dự án:**
   ```bash
   cd "C:\Users\admin\Desktop\Gia sư\web"
   ```
3. **Đăng nhập Vercel (nếu chạy lần đầu):**
   ```bash
   vercel login
   ```
4. **Triển khai lên môi trường thử nghiệm (Preview):**
   ```bash
   vercel
   ```
   *(Bấm Enter chấp nhận các thiết lập mặc định)*
5. **Triển khai chính thức lên Production (Tên miền chính thức):**
   ```bash
   vercel --prod
   ```
   *Vercel sẽ cấp ngay cho bạn một liên kết dạng `https://toan-thpt.vercel.app` tốc độ cao với chứng chỉ SSL HTTPS miễn phí.*

---

### Cách 2: Triển khai qua GitHub (Tự động cập nhật mỗi khi commit)

1. Khởi tạo Git repository và đẩy code lên GitHub:
   ```bash
   cd "C:\Users\admin\Desktop\Gia sư\web"
   git init
   git add .
   git commit -m "Deploy Math Web App with URL routing and Auth"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-cua-ban>/toan-thpt-web.git
   git push -u origin main
   ```
2. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
3. Nhấp **"Add New..."** ➜ **"Project"**.
4. Chọn kho lưu trữ `toan-thpt-web` vừa tạo và bấm **"Deploy"**.
5. Trang web sẽ được tự động build và cấp phát tên miền `.vercel.app` ngay lập tức.

---

### Cấu hình `vercel.json` đã tích hợp:
```json
{
  "version": 2,
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    {
      "source": "/((?!css|js|favicon).*)$",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    },
    {
      "source": "/(css|js)/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=3600, must-revalidate" }
      ]
    }
  ]
}
```

---

## 🌟 TÍNH NĂNG NỔI BẬT

### 1. Phân quyền Người Dùng: Học Sinh & Giáo Viên (Role-Based Access)
Hệ thống tích hợp bộ chuyển đổi vai trò linh hoạt ngay trên thanh điều hướng của cả 3 màn hình:

* **👨‍🎓 Chế độ Học sinh (Student Mode - Mặc định):**
  - Giao diện luyện tập tập trung, sạch sẽ, không có các nút chỉnh sửa gây xao nhãng.
  - Tự do ôn luyện theo từng chuyên đề hoặc bước vào phòng thi thử trực tuyến 90 phút có đồng hồ đếm ngược.
  - Phản hồi kết quả tức thì, âm thanh sinh động, hiển thị lời giải chi tiết từng bước bằng KaTeX chuẩn mực.
  - Tự động thống kê số câu đã làm, số câu đúng và tỉ lệ chính xác.

* **👨‍🏫 Chế độ Giáo viên (Teacher / Admin Mode):**
  - Xuất hiện **Thanh điều khiển quản trị chuyên biệt (Teacher Control Toolbar)** ngay đầu Workspace với các tác vụ nhanh:
    + ➕ **Thêm câu hỏi mới:** Bổ sung câu hỏi vào bất kỳ chuyên đề nào hoặc thêm vào các phần của đề thi.
    + 📖 **Sửa lý thuyết:** Tùy biến nội dung lý thuyết trọng tâm của từng chuyên đề.
    + 📝 **Thêm đề thi mới:** Tạo đề thi mới với tiêu đề, thời gian làm bài và huy hiệu tùy chỉnh.
    + ⚙️ **Sửa thông tin đề:** Cập nhật tên đề, ghi chú thời gian thi.
    + 💾 **Xuất JSON:** Tải toàn bộ ngân hàng câu hỏi tùy chỉnh về máy tính dưới dạng file `.json`.
    + 📂 **Nhập JSON:** Nạp tài liệu từ file JSON vào hệ thống chỉ bằng 1 cú click.
    + 🔄 **Khôi phục gốc:** Khôi phục nhanh về bộ học liệu mặc định ban đầu của Bộ GD&ĐT.
  - **Thao tác trực tiếp trên từng câu hỏi (In-Place Card Actions):** Mọi câu hỏi (Trắc nghiệm, Đúng/Sai, Điền số, Tự luận) đều hiển thị nút `✏️ Sửa` và `🗑️ Xóa`.
  - **Bộ soạn thảo Toán học trực quan (Interactive Math Modal):**
    + Thanh công cụ chèn nhanh ký hiệu LaTeX: $\frac{a}{b}$, $\sqrt{x}$, $x^2$, $\vec{u}$, $\lim$, $\in$, $\mathbb{R}$, $+\infty$, $\Delta$, $\int$...
    + Khung **Xem trước KaTeX trực tiếp (Live Preview)** theo thời gian thực giúp giáo viên kiểm tra ngay hiển thị công thức trước khi lưu.
  - **Lưu trữ bền vững:** Mọi dữ liệu chỉnh sửa, thêm mới, xóa bỏ được lưu tự động trên `localStorage`, không mất khi tải lại trang web.

---

### 2. Luồng Điều Hướng 3 Bước Chuẩn Mực & Trực Quan

1. **Bước 1 (Màn hình Chọn Khối lớp):** Giao diện đầu tiên chào đón người dùng là Màn hình chọn khối lớp (**Lớp 10, 11, 12**) với các thẻ trực quan, tóm tắt chương trình GDPT 2018.
2. **Bước 2 (Màn hình Chọn Hình thức):** Sau khi chọn lớp (ví dụ Lớp 12), chuyển sang màn hình trung tâm với 2 lựa chọn lớn:
   - **📚 Ôn theo chuyên đề:** Danh sách 5 chuyên đề trọng tâm kèm bài tập phân loại.
   - **🏆 Luyện thi (Phòng thi trực tuyến):** Danh mục các kỳ thi quan trọng (Giữa HK1, Cuối HK1, Giữa HK2, Cuối HK2, Thi THPT & ĐGNL).
3. **Bước 3 (Không gian Học tập & Phòng thi Workspace):**
   - **Khi ôn theo chuyên đề:** Hiển thị Sidebar chuyên đề, thanh Breadcrumbs điều hướng, và 6 tab làm bài: Lý thuyết, Trắc nghiệm 4 lựa chọn, Đúng/Sai, Điền số, Tự luận thực tế, Thi thử.
   - **Khi vào Luyện thi:** Thanh điều hướng kỳ thi (Pills bar) cho phép chuyển đổi giữa **Thi Giữa HK1** (7 đề chuẩn), **Thi Cuối HK1**, **Thi Giữa HK2**, **Thi Cuối HK2**, **Thi THPT & ĐGNL**.
   - Luôn có nút **"🔙 Đổi lớp"**, **"🎯 Đổi hình thức"**, và thanh Breadcrumbs hỗ trợ quay lại bất kỳ lúc nào.

---

### 3. Bộ 7 Đề Thi Giữa Học Kỳ 1 Lớp 12 Chuẩn Ma Trận Bộ GD&ĐT 2025

Được trích xuất và số hóa chuẩn xác từ tài liệu gốc `Đề gk1.pdf`:
- **Đề Số 6 (Trang 1-3 PDF):** Khảo sát hàm số, đơn điệu, cực trị, GTLN-GTNN, TCĐ, TCX, quy tắc hình hộp, đối xứng trục $Oy$, mô hình tối ưu quần thể ong logistic $P(t) = \frac{20000}{1 + 1000e^{-0.8t}}$, hộp chữ nhật $V = 10\text{ dm}^3$.
- **Đề Số 7 (Trang 4-6 PDF):** Đồ thị đạo hàm $f'(x)$, giao điểm tiệm cận, trọng tâm tứ diện, góc vectơ, bài toán ngọn hải đăng chèo thuyền tối ưu thời gian ($AM = 5\text{ km}$), nồng độ thuốc $C(t) = \frac{0.15t}{t^2 + 1}$, góc liên kết phân tử metan $\text{CH}_4$ ($109^\circ$).
- **Đề Số 8 (Trang 7-9 PDF):** Bảng biến thiên đoạn $[-5; 7)$, tiệm cận xiên, tích vô hướng $\vec{u} \cdot \vec{v}$, vỏ lon sữa bò $V = 250\pi\text{ cm}^3$ ($r = 5\text{ cm}$), nồng độ hóa chất $C(t) = \frac{3t}{27 + t^3}$, hình chữ nhật nội tiếp parabol $y = 9 - x^2$.
- **Đề Số 9 (Trang 10-12 PDF):** Bảng xét dấu đạo hàm $f'(x)$, tương giao đồ thị, hình chiếu lên $Ox$, quần thể cá $N(t) = \frac{20(4+3t)}{1+0.05t}$ ($N_{\max} = 1200$ nghìn con), chi phí trung bình $C(x) = x + 3 + 16/x$ ($C_{\min} = 11$).
- **Đề Số 10 (Trang 13-15 PDF):** Khoảng cách từ điểm đến tiệm cận xiên ($4/\sqrt{5}$), lợi nhuận bán áo sơ mi $R(x) - C(x)$ ($1000\$$), khung thép hộp chữ nhật $V = 24000\text{ cm}^3$ ($x = 20\text{ cm}$), hợp lực 3 lực $3\text{ N}, 6\text{ N}, 9\text{ N}$ góc $60^\circ$ ($F = 15\text{ N}$).
- **Đề Số 11 (Trang 16-19 PDF):** Tập giá trị hàm căn thức $[2\sqrt{2}; 4]$, số nghiệm phương trình $3f(x) + 4 = 0$, chi phí sản xuất ấm điện $C(x) = 4\ln x + \frac{30-x}{10}$ ($x = 40$), gập hộp không nắp từ tấm tôn vuông $12\text{ cm}$ ($x = 2\text{ cm}$), vận tốc máy bay 3D ($1616\text{ km/h}$).
- **Đề Số 12 (Trang 20-23 PDF):** Khảo sát hàm số nâng cao, hình trụ nội tiếp hình nón $r = 9, h = 18$ ($r = 6\text{ cm}$), hình thang cân diện tích lớn nhất ($S = 32.5$), hợp lực ba lực không gian với góc $100^\circ$ và phương vuông góc ($F = 26\text{ N}$).

---

### 4. Đầy Đủ 4 Định Dạng Câu Hỏi Mới Của Bộ GD&ĐT

- **Phần I: Trắc nghiệm 4 lựa chọn (MCQ):** 12 câu, mỗi câu 0.25 điểm (tổng 3.0 điểm).
- **Phần II: Trắc nghiệm Đúng / Sai:** 4 câu (16 ý a, b, c, d) với thang chấm điểm quy chuẩn:
  * Đúng 1 ý: 0.1 điểm
  * Đúng 2 ý: 0.25 điểm
  * Đúng 3 ý: 0.5 điểm
  * Đúng cả 4 ý: 1.0 điểm (tổng 4.0 điểm).
- **Phần III: Trả lời ngắn (Điền số):** 6 câu, mỗi câu 0.5 điểm (tổng 3.0 điểm), hỗ trợ nhận diện nhiều định dạng số thập phân, phân số hoặc dấu phẩy/chấm.
- **Phần IV: Tự luận chuyên sâu & Toán thực tế:** Lời giải từng bước chi tiết kèm hình vẽ minh họa đồ thị và mô hình không gian sắc nét bằng SVG.

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY

### Cách 1: Mở trực tiếp bằng trình duyệt (Khuyến nghị)
Nhấp đúp chuột vào file:
`C:\Users\admin\Desktop\Gia sư\web\index.html`
để mở ngay trên trình duyệt (Chrome, Edge, Cốc Cốc, Firefox, Safari...).

### Cách 2: Chạy qua máy chủ nội bộ (Python hoặc Node.js)
Mở terminal tại thư mục `web` và gõ:
```bash
python -m http.server 8080
```
Sau đó truy cập: `http://localhost:8080` trên trình duyệt.

---

## 👨‍🏫 HƯỚNG DẪN DÀNH CHO GIÁO VIÊN

1. **Chuyển vai trò:** Nhấp vào nút **"👨‍🏫 Giáo viên"** ở góc trên bên phải màn hình.
2. **Thêm câu hỏi mới:**
   - Nhấp nút `➕ Thêm câu hỏi` trên thanh công cụ vàng hoặc nhấp nút `➕ Thêm câu hỏi mới...` ở cuối danh sách câu hỏi.
   - Chọn định dạng: Trắc nghiệm 4 lựa chọn, Đúng/Sai, Điền số hoặc Tự luận.
   - Nhập nội dung, dùng các nút toán học nhanh để chèn ký hiệu LaTeX và xem trước công thức trực tiếp ở khung preview bên dưới.
   - Nhấp `💾 Lưu câu hỏi`.
3. **Sửa câu hỏi:** Nhấp nút `✏️ Sửa` ở góc trên bên phải của thẻ câu hỏi cần sửa, chỉnh sửa nội dung rồi nhấp `💾 Lưu cập nhật`.
4. **Xóa câu hỏi:** Nhấp nút `🗑️ Xóa` trên thẻ câu hỏi, xác nhận để loại bỏ câu hỏi khỏi đề hoặc chuyên đề.
5. **Sao lưu & Chia sẻ học liệu:**
   - Nhấp `💾 Xuất JSON` để tải tệp dữ liệu về máy.
   - Để chuyển tài liệu sang máy khác, chỉ cần nhấp `📂 Nhập JSON` và chọn tệp đã xuất.

---

## 📂 CẤU TRÚC THƯ MỤC

```
web/
├── index.html           # Khung giao diện HTML 3 màn hình & Modal giáo viên
├── css/
│   └── style.css        # Hệ thống giao diện, Theme Sáng/Tối, CSS Quản trị & Responsive
├── js/
│   ├── exams-6-8.js     # Đề thi chính thức Đề 6, Đề 7, Đề 8 từ Đề gk1.pdf
│   ├── exams-9-12.js    # Đề thi chính thức Đề 9, Đề 10, Đề 11, Đề 12 từ Đề gk1.pdf
│   ├── math-data.js     # Dữ liệu kiến thức, lý thuyết, chuyên đề & ghép bộ đề
│   ├── diagrams.js      # Module vẽ hình toán học SVG (đồ thị, khối hình học, đèn chùm 3D)
│   └── app.js           # Xử lý phân quyền Giáo viên/Học sinh, CRUD học liệu, chấm điểm
└── README.md            # Tài liệu hướng dẫn sử dụng chi tiết
```
