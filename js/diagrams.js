/**
 * DIAGRAMS.JS
 * Tạo hình vẽ toán học SVG minh họa trực quan cho các bài toán hình học, đồ thị và thực tế
 */

const MathDiagrams = {
  // 1. Đồ thị hàm phân thức y = (x^2 + 2x - 2)/(x - 1) với tiệm cận đứng x=1 và tiệm cận xiên y=x+3
  renderFractionGraph: function(containerId) {
    const width = 500, height = 360;
    const svg = `
      <svg viewBox="0 0 ${width} ${height}" class="math-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--border-color)" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="var(--border-color)" stop-opacity="0.05"/>
          </linearGradient>
        </defs>
        <!-- Background grid -->
        <rect width="${width}" height="${height}" fill="var(--bg-card)" rx="10"/>

        <!-- Axes -->
        <!-- O(220, 240) Scale: 1 unit = 28px -->
        <!-- x-axis -->
        <line x1="20" y1="240" x2="480" y2="240" stroke="var(--text-secondary)" stroke-width="1.5"/>
        <polygon points="480,236 490,240 480,244" fill="var(--text-secondary)"/>
        <text x="475" y="260" fill="var(--text-secondary)" font-size="13" font-family="Lexend, sans-serif">x</text>

        <!-- y-axis -->
        <line x1="220" y1="340" x2="220" y2="20" stroke="var(--text-secondary)" stroke-width="1.5"/>
        <polygon points="216,20 220,10 224,20" fill="var(--text-secondary)"/>
        <text x="235" y="24" fill="var(--text-secondary)" font-size="13" font-family="Lexend, sans-serif">y</text>
        <text x="205" y="255" fill="var(--text-secondary)" font-size="12">O</text>

        <!-- Tiệm cận đứng x = 1 (x_px = 220 + 28 = 248) -->
        <line x1="248" y1="15" x2="248" y2="340" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,4"/>
        <text x="253" y="45" fill="#ef4444" font-size="12" font-weight="600">TCĐ: x = 1</text>

        <!-- Tiệm cận xiên y = x + 3 -->
        <!-- x = -4 => y = -1 (px: 220-112=108, 240+28=268) -->
        <!-- x = 4 => y = 7 (px: 220+112=332, 240-196=44) -->
        <line x1="80" y1="296" x2="360" y2="16" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="5,4"/>
        <text x="310" y="35" fill="#8b5cf6" font-size="12" font-weight="600">TCX: y = x + 3</text>

        <!-- Tâm đối xứng I(1; 4) -> px(248, 240 - 112 = 128) -->
        <circle cx="248" cy="128" r="4.5" fill="#ef4444"/>
        <text x="256" y="125" fill="#ef4444" font-size="12" font-weight="bold">I(1; 4)</text>

        <!-- Nhánh trái x < 1: Cực đại (0; 2) -> px(220, 240 - 56 = 184) -->
        <path d="M 50,295 Q 150,230 200,195 Q 220,184 235,270 L 237,340" fill="none" stroke="#2563eb" stroke-width="2.5"/>
        <circle cx="220" cy="184" r="3.5" fill="#2563eb"/>
        <text x="175" y="180" fill="#2563eb" font-size="11" font-weight="600">CĐ(0; 2)</text>

        <!-- Nhánh phải x > 1: Cực tiểu (2; 6) -> px(276, 240 - 168 = 72) -->
        <path d="M 259,10 Q 262,90 276,72 Q 310,80 430,175" fill="none" stroke="#2563eb" stroke-width="2.5"/>
        <circle cx="276" cy="72" r="3.5" fill="#2563eb"/>
        <text x="282" y="68" fill="#2563eb" font-size="11" font-weight="600">CT(2; 6)</text>
      </svg>
    `;
    return svg;
  },

  // 2. Tấm tôn gập thành hộp
  renderFoldBox: function() {
    const svg = `
      <svg viewBox="0 0 460 260" class="math-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="460" height="260" fill="var(--bg-card)" rx="10"/>
        <!-- Sheet 80 x 50 -->
        <g transform="translate(40, 30)">
          <!-- Main outline -->
          <rect x="0" y="0" width="220" height="150" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>

          <!-- 4 cut corners size x = 30 -->
          <rect x="0" y="0" width="35" height="35" fill="var(--bg-card)" stroke="#dc2626" stroke-dasharray="3,3"/>
          <rect x="185" y="0" width="35" height="35" fill="var(--bg-card)" stroke="#dc2626" stroke-dasharray="3,3"/>
          <rect x="0" y="115" width="35" height="35" fill="var(--bg-card)" stroke="#dc2626" stroke-dasharray="3,3"/>
          <rect x="185" y="115" width="35" height="35" fill="var(--bg-card)" stroke="#dc2626" stroke-dasharray="3,3"/>

          <!-- Fold lines -->
          <line x1="35" y1="35" x2="185" y2="35" stroke="#0369a1" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line x1="35" y1="115" x2="185" y2="115" stroke="#0369a1" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line x1="35" y1="35" x2="35" y2="115" stroke="#0369a1" stroke-width="1.5" stroke-dasharray="4,3"/>
          <line x1="185" y1="35" x2="185" y2="115" stroke="#0369a1" stroke-width="1.5" stroke-dasharray="4,3"/>

          <!-- Dimension labels -->
          <text x="110" y="-8" text-anchor="middle" font-size="12" fill="var(--text-primary)" font-weight="600">80 cm</text>
          <text x="-15" y="80" text-anchor="middle" font-size="12" fill="var(--text-primary)" font-weight="600" transform="rotate(-90, -15, 80)">50 cm</text>
          <text x="16" y="22" font-size="11" fill="#dc2626" font-weight="bold">x</text>
          <text x="110" y="80" text-anchor="middle" font-size="12" fill="#0369a1" font-weight="600">Đáy hộp: (80-2x) × (50-2x)</text>
        </g>

        <!-- 3D Box preview on right side -->
        <g transform="translate(290, 45)">
          <polygon points="30,80 120,80 140,50 50,50" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
          <polygon points="30,80 120,80 120,120 30,120" fill="#7dd3fc" stroke="#0284c7" stroke-width="1.5"/>
          <polygon points="120,80 140,50 140,90 120,120" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
          <text x="75" y="145" text-anchor="middle" font-size="12" fill="var(--text-primary)" font-weight="bold">Thùng hộp (V max = 18L)</text>
          <text x="75" y="105" text-anchor="middle" font-size="11" fill="#0369a1">chiều cao: x = 10cm</text>
        </g>
      </svg>
    `;
    return svg;
  },

  // 3. Quy tắc hình hộp Vectơ
  renderBoxVector: function() {
    const svg = `
      <svg viewBox="0 0 460 260" class="math-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="460" height="260" fill="var(--bg-card)" rx="10"/>
        <defs>
          <marker id="arrRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444"/>
          </marker>
          <marker id="arrBlue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb"/>
          </marker>
        </defs>
        <g transform="translate(50, 30)">
          <!-- Bottom face ABCD: A(60, 150), B(200, 150), C(250, 110), D(110, 110) -->
          <!-- Top face A'B'C'D': A'(60, 50), B'(200, 50), C'(250, 10), D'(110, 10) -->

          <!-- Hidden dashed edges -->
          <line x1="60" y1="150" x2="110" y2="110" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
          <line x1="110" y1="110" x2="250" y2="110" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
          <line x1="110" y1="110" x2="110" y2="10" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>

          <!-- Visible solid edges -->
          <line x1="60" y1="150" x2="200" y2="150" stroke="#334155" stroke-width="1.5"/>
          <line x1="200" y1="150" x2="250" y2="110" stroke="#334155" stroke-width="1.5"/>
          <line x1="60" y1="50" x2="200" y2="50" stroke="#334155" stroke-width="1.5"/>
          <line x1="200" y1="50" x2="250" y2="10" stroke="#334155" stroke-width="1.5"/>
          <line x1="250" y1="10" x2="110" y2="10" stroke="#334155" stroke-width="1.5"/>
          <line x1="110" y1="10" x2="60" y2="50" stroke="#334155" stroke-width="1.5"/>

          <line x1="60" y1="150" x2="60" y2="50" stroke="#334155" stroke-width="1.5"/>
          <line x1="200" y1="150" x2="200" y2="50" stroke="#334155" stroke-width="1.5"/>
          <line x1="250" y1="110" x2="250" y2="10" stroke="#334155" stroke-width="1.5"/>

          <!-- Vector AB (Blue) -->
          <line x1="60" y1="150" x2="195" y2="150" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrBlue)"/>
          <!-- Vector AD (Blue) -->
          <line x1="60" y1="150" x2="105" y2="114" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrBlue)"/>
          <!-- Vector AA' (Blue) -->
          <line x1="60" y1="150" x2="60" y2="55" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrBlue)"/>

          <!-- Diagonal Vector AC' (Red) -->
          <line x1="60" y1="150" x2="245" y2="15" stroke="#ef4444" stroke-width="3" stroke-dasharray="6,3" marker-end="url(#arrRed)"/>

          <!-- Vertex Labels -->
          <text x="45" y="165" font-weight="bold" fill="var(--text-primary)">A</text>
          <text x="210" y="165" font-weight="bold" fill="var(--text-primary)">B</text>
          <text x="260" y="115" font-weight="bold" fill="var(--text-primary)">C</text>
          <text x="105" y="105" font-weight="bold" fill="var(--text-primary)">D</text>

          <text x="45" y="45" font-weight="bold" fill="var(--text-primary)">A'</text>
          <text x="210" y="45" font-weight="bold" fill="var(--text-primary)">B'</text>
          <text x="255" y="8" font-weight="bold" fill="var(--text-primary)">C'</text>
          <text x="105" y="8" font-weight="bold" fill="var(--text-primary)">D'</text>

          <!-- Formula Label -->
          <rect x="230" y="150" width="160" height="40" fill="#fef2f2" stroke="#ef4444" rx="6"/>
          <text x="240" y="175" font-size="12" font-weight="bold" fill="#b91c1c">AC' = AB + AD + AA'</text>
        </g>
      </svg>
    `;
    return svg;
  },

  // 4. Cổng vòm Parabol 10m x 6m
  renderParabolArch: function() {
    const svg = `
      <svg viewBox="0 0 460 260" class="math-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="460" height="260" fill="var(--bg-card)" rx="10"/>
        <g transform="translate(40, 20)">
          <!-- Ground line -->
          <line x1="20" y1="200" x2="360" y2="200" stroke="var(--text-secondary)" stroke-width="2"/>
          <line x1="190" y1="220" x2="190" y2="10" stroke="var(--text-secondary)" stroke-width="1" stroke-dasharray="4,4"/>

          <!-- Parabol curve: Center x=190, y_ground=200, height=160 (6m), half_width=135 (5m) -->
          <!-- y = -160/135^2 * x^2 + 160 => at x=0 y=40, at x=±135 y=200 -->
          <path d="M 55,200 Q 190,-10 325,200" fill="#eff6ff" stroke="#2563eb" stroke-width="3"/>

          <!-- Optimum Billboard (width ~ 5.77m, height = 4m -> px: half_w = 78, h = 107) -->
          <rect x="112" y="93" width="156" height="107" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>

          <text x="190" y="145" text-anchor="middle" font-size="12" font-weight="bold" fill="#b45309">Pano quảng cáo</text>
          <text x="190" y="165" text-anchor="middle" font-size="11" fill="#b45309">S max ≈ 23.09 m²</text>

          <!-- Dimensions -->
          <text x="190" y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563eb">Đỉnh h = 6m</text>
          <text x="190" y="218" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-primary)">Chân cổng L = 10m</text>
          <circle cx="55" cy="200" r="4" fill="#2563eb"/>
          <circle cx="325" cy="200" r="4" fill="#2563eb"/>
          <circle cx="190" cy="40" r="4" fill="#2563eb"/>
        </g>
      </svg>
    `;
    return svg;
  },

  // 5. Cân bằng lực đèn chùm 3D
  renderCeilingLamp: function() {
    const svg = `
      <svg viewBox="0 0 460 260" class="math-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="460" height="260" fill="var(--bg-card)" rx="10"/>
        <g transform="translate(50, 10)">
          <!-- Ceiling triangle ABC -->
          <polygon points="180,40 100,100 260,100" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/>
          <text x="180" y="32" font-weight="bold" text-anchor="middle" fill="var(--text-primary)">A</text>
          <text x="85" y="105" font-weight="bold" fill="var(--text-primary)">B</text>
          <text x="270" y="105" font-weight="bold" fill="var(--text-primary)">C</text>
          <text x="180" y="85" font-size="11" fill="#64748b" text-anchor="middle">Trần nhà (tam giác đều cạnh 1.2m)</text>

          <!-- Lamp hanging point O(180, 200) -->
          <!-- Cable lines OA, OB, OC -->
          <line x1="180" y1="40" x2="180" y2="200" stroke="#0284c7" stroke-width="2"/>
          <line x1="100" y1="100" x2="180" y2="200" stroke="#0284c7" stroke-width="2"/>
          <line x1="260" y1="100" x2="180" y2="200" stroke="#0284c7" stroke-width="2"/>

          <!-- Height line OH -->
          <line x1="180" y1="80" x2="180" y2="200" stroke="#94a3b8" stroke-dasharray="3,3"/>
          <text x="195" y="150" font-size="11" fill="#0369a1" font-weight="600">h = 0.8m</text>

          <!-- Lamp body -->
          <circle cx="180" cy="200" r="10" fill="#f59e0b"/>
          <!-- Gravity P -->
          <line x1="180" y1="200" x2="180" y2="245" stroke="#ef4444" stroke-width="2.5" marker-end="url(#arrRed)"/>
          <text x="190" y="240" font-size="12" font-weight="bold" fill="#ef4444">P = 120N</text>

          <text x="260" y="195" font-size="12" font-weight="bold" fill="#0284c7">T ≈ 52.9 N</text>
        </g>
      </svg>
    `;
    return svg;
  }
};
