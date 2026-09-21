/**
 * APP.JS
 * Bộ điều khiển ứng dụng Web Luyện Tập & Đề Thi Môn Toán THPT
 * Bám sát chương trình GDPT 2018 và cấu trúc đề thi mới nhất của Bộ GD&ĐT
 */

(function() {
  'use strict';

  // State Management
  const state = {
    currentUserRole: localStorage.getItem('MATH_USER_ROLE') || 'student', // 'student' | 'teacher'
    currentGrade: "12",
    currentMode: "topics", // "topics" hoặc "exams"
    currentExamCategory: "gk1", // "gk1", "ck1", "gk2", "ck2", "thpt"
    currentTopicId: "12-1",
    currentExamId: "gk1-de-so-6",
    currentTab: "theory", // theory, mcq, tf, sa, essay, exam
    examIsTimed: false,
    examTimerInterval: null,
    examTimeRemaining: 90 * 60, // 90 phút thi chuẩn
    userStats: {
      totalAttempted: 0,
      totalCorrect: 0,
      topicProgress: {}
    }
  };

  // Sound generator via Web Audio API
  const soundEffects = {
    ctx: null,
    init: function() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
    },
    playCorrect: function() {
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } catch (e) {}
    },
    playIncorrect: function() {
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(220, now); // A3
        osc.frequency.linearRampToValueAtTime(180, now + 0.2);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } catch (e) {}
    },
    playFanfare: function() {
      try {
        this.init();
        if (!this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const now = this.ctx.currentTime + idx * 0.12;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.3);
        });
      } catch (e) {}
    }
  };

  // LocalStorage Helper
  function loadStats() {
    try {
      const saved = localStorage.getItem('math_practice_stats');
      if (saved) {
        state.userStats = JSON.parse(saved);
      }
    } catch (e) {}
    updateStatsUI();
  }

  function saveStats() {
    try {
      localStorage.setItem('math_practice_stats', JSON.stringify(state.userStats));
    } catch (e) {}
    updateStatsUI();
  }

  function updateStatsUI() {
    const attemptedEl = document.getElementById('stat-attempted');
    const correctEl = document.getElementById('stat-correct');
    const accuracyEl = document.getElementById('stat-accuracy');

    if (attemptedEl) attemptedEl.textContent = state.userStats.totalAttempted;
    if (correctEl) correctEl.textContent = state.userStats.totalCorrect;
    if (accuracyEl) {
      const acc = state.userStats.totalAttempted > 0
        ? Math.round((state.userStats.totalCorrect / state.userStats.totalAttempted) * 100)
        : 0;
      accuracyEl.textContent = `${acc}%`;
    }
  }

  // Toast Notification
  function showToast(message, type = "info") {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // ==============================================================================
  // TEACHER & STUDENT ROLE MANAGEMENT & CUSTOM MATERIALS PERSISTENCE
  // ==============================================================================
  let customMaterials = {
    editedQuestions: {},    // { [qid]: { question/text, options, answer, explain, level, etc. } }
    deletedQuestionIds: [],  // [ 'qid1', 'qid2' ]
    addedQuestions: {},     // { 'topic:12-1:mcq': [...], 'exam:gk1-de-so-6:part1': [...] }
    editedTheories: {},     // { [topicId]: { content } }
    editedExamInfo: {},     // { [examId]: { title, subtitle, timeMinutes, badge } }
    customExams: []         // [ ...newExams ]
  };

  function loadCustomMaterials() {
    try {
      const saved = localStorage.getItem('math_custom_materials_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        customMaterials = {
          editedQuestions: parsed.editedQuestions || {},
          deletedQuestionIds: parsed.deletedQuestionIds || [],
          addedQuestions: parsed.addedQuestions || {},
          editedTheories: parsed.editedTheories || {},
          editedExamInfo: parsed.editedExamInfo || {},
          customExams: parsed.customExams || []
        };
      }
    } catch (e) {
      console.error("Error loading custom materials:", e);
    }
    applyCustomMaterialsToDatabase();
  }

  function saveCustomMaterials() {
    try {
      localStorage.setItem('math_custom_materials_v1', JSON.stringify(customMaterials));
    } catch (e) {
      console.error("Error saving custom materials:", e);
    }
  }

  function applyCustomMaterialsToDatabase() {
    if (!window.MATH_DATABASE) return;

    // 1. Áp dụng cho các Chuyên đề (Lớp 10, 11, 12)
    (MATH_DATABASE.grades || []).forEach(grade => {
      (grade.topics || []).forEach(topic => {
        // Cập nhật lý thuyết đã sửa
        if (customMaterials.editedTheories[topic.id]) {
          topic.theory = {
            ...(topic.theory || {}),
            content: customMaterials.editedTheories[topic.id].content
          };
        }

        if (topic.exercises) {
          ['mcq', 'tf', 'shortAnswer', 'essay'].forEach(qtype => {
            let list = topic.exercises[qtype] || [];

            // Loại bỏ các câu đã bị xóa
            list = list.filter(q => !customMaterials.deletedQuestionIds.includes(q.id));

            // Cập nhật các câu đã chỉnh sửa
            list.forEach(q => {
              if (customMaterials.editedQuestions[q.id]) {
                Object.assign(q, customMaterials.editedQuestions[q.id]);
              }
            });

            // Thêm các câu hỏi mới do giáo viên soạn
            const addedKey = `topic:${topic.id}:${qtype}`;
            const extra = customMaterials.addedQuestions[addedKey] || [];
            extra.forEach(extraQ => {
              if (!customMaterials.deletedQuestionIds.includes(extraQ.id)) {
                const finalQ = customMaterials.editedQuestions[extraQ.id]
                  ? Object.assign({}, extraQ, customMaterials.editedQuestions[extraQ.id])
                  : extraQ;
                if (!list.some(x => x.id === finalQ.id)) {
                  list.push(finalQ);
                }
              }
            });

            topic.exercises[qtype] = list;
          });
        }
      });
    });

    // 2. Áp dụng cho Đề thi (Midterm Exams)
    const allExams = MATH_DATABASE.midtermExams || [];

    // Bổ sung đề thi mới do giáo viên thêm
    (customMaterials.customExams || []).forEach(newExam => {
      if (!allExams.some(e => e.id === newExam.id)) {
        allExams.push(newExam);
      }
    });

    allExams.forEach(exam => {
      if (customMaterials.editedExamInfo[exam.id]) {
        Object.assign(exam, customMaterials.editedExamInfo[exam.id]);
      }

      const sec = exam.sections;
      if (!sec) return;

      // Phần I: MCQ
      if (sec.part1 && sec.part1.questions) {
        sec.part1.questions = sec.part1.questions.filter(q => !customMaterials.deletedQuestionIds.includes(q.id));
        sec.part1.questions.forEach(q => {
          if (customMaterials.editedQuestions[q.id]) {
            Object.assign(q, customMaterials.editedQuestions[q.id]);
          }
        });
        const addedKey = `exam:${exam.id}:part1`;
        const extra = customMaterials.addedQuestions[addedKey] || [];
        extra.forEach(extraQ => {
          if (!customMaterials.deletedQuestionIds.includes(extraQ.id) && !sec.part1.questions.some(x => x.id === extraQ.id)) {
            const finalQ = customMaterials.editedQuestions[extraQ.id]
              ? Object.assign({}, extraQ, customMaterials.editedQuestions[extraQ.id])
              : extraQ;
            sec.part1.questions.push(finalQ);
          }
        });
      }

      // Phần II: Đúng/Sai
      if (sec.part2 && sec.part2.questions) {
        sec.part2.questions = sec.part2.questions.filter(q => !customMaterials.deletedQuestionIds.includes(q.id));
        sec.part2.questions.forEach(q => {
          if (customMaterials.editedQuestions[q.id]) {
            Object.assign(q, customMaterials.editedQuestions[q.id]);
          }
        });
        const addedKey = `exam:${exam.id}:part2`;
        const extra = customMaterials.addedQuestions[addedKey] || [];
        extra.forEach(extraQ => {
          if (!customMaterials.deletedQuestionIds.includes(extraQ.id) && !sec.part2.questions.some(x => x.id === extraQ.id)) {
            const finalQ = customMaterials.editedQuestions[extraQ.id]
              ? Object.assign({}, extraQ, customMaterials.editedQuestions[extraQ.id])
              : extraQ;
            sec.part2.questions.push(finalQ);
          }
        });
      }

      // Phần III: Điền số
      if (sec.part3 && sec.part3.questions) {
        sec.part3.questions = sec.part3.questions.filter(q => !customMaterials.deletedQuestionIds.includes(q.id));
        sec.part3.questions.forEach(q => {
          if (customMaterials.editedQuestions[q.id]) {
            Object.assign(q, customMaterials.editedQuestions[q.id]);
          }
        });
        const addedKey = `exam:${exam.id}:part3`;
        const extra = customMaterials.addedQuestions[addedKey] || [];
        extra.forEach(extraQ => {
          if (!customMaterials.deletedQuestionIds.includes(extraQ.id) && !sec.part3.questions.some(x => x.id === extraQ.id)) {
            const finalQ = customMaterials.editedQuestions[extraQ.id]
              ? Object.assign({}, extraQ, customMaterials.editedQuestions[extraQ.id])
              : extraQ;
            sec.part3.questions.push(finalQ);
          }
        });
      }

      // Phần IV: Tự luận
      if (sec.part4 && sec.part4.items) {
        sec.part4.items = sec.part4.items.filter(q => !customMaterials.deletedQuestionIds.includes(q.id));
        sec.part4.items.forEach(q => {
          if (customMaterials.editedQuestions[q.id]) {
            Object.assign(q, customMaterials.editedQuestions[q.id]);
          }
        });
        const addedKey = `exam:${exam.id}:part4`;
        const extra = customMaterials.addedQuestions[addedKey] || [];
        extra.forEach(extraQ => {
          if (!customMaterials.deletedQuestionIds.includes(extraQ.id) && !sec.part4.items.some(x => x.id === extraQ.id)) {
            const finalQ = customMaterials.editedQuestions[extraQ.id]
              ? Object.assign({}, extraQ, customMaterials.editedQuestions[extraQ.id])
              : extraQ;
            sec.part4.items.push(finalQ);
          }
        });
      }
    });
  }

  function setUserRole(role) {
    state.currentUserRole = role;
    localStorage.setItem('MATH_USER_ROLE', role);
    updateRoleUI();

    if (role === 'teacher') {
      showToast("Đã kích hoạt Chế độ Giáo viên 👨‍🏫 (Thầy/cô có quyền thêm, sửa và quản lý tài liệu)");
    } else {
      showToast("Đã kích hoạt Chế độ Học sinh 👨‍🎓 (Chế độ luyện tập tập trung)");
    }

    if (state.currentMode === "topics") {
      renderCurrentTopic();
    } else {
      renderCurrentExamCategoryView();
    }
  }

  function updateRoleUI() {
    const isTeacher = state.currentUserRole === 'teacher';

    document.querySelectorAll('.role-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.role === state.currentUserRole);
    });

    const teacherBar = document.getElementById('teacher-control-toolbar');
    if (teacherBar) {
      teacherBar.style.display = isTeacher ? 'block' : 'none';
    }
  }

  // Helper tìm câu hỏi theo ID trong toàn bộ database
  function findQuestionById(qid) {
    // 1. Tìm trong các Chuyên đề
    for (const grade of (MATH_DATABASE.grades || [])) {
      for (const topic of (grade.topics || [])) {
        if (!topic.exercises) continue;
        for (const qtype of ['mcq', 'tf', 'shortAnswer', 'essay']) {
          const list = topic.exercises[qtype] || [];
          const found = list.find(q => q.id === qid);
          if (found) {
            let normalizedType = qtype;
            if (qtype === 'shortAnswer') normalizedType = 'sa';
            return {
              question: found,
              type: normalizedType,
              scope: 'topic',
              topicId: topic.id,
              gradeId: grade.id,
              topicTitle: topic.title,
              qtype: qtype
            };
          }
        }
      }
    }

    // 2. Tìm trong các Đề thi
    for (const exam of (MATH_DATABASE.midtermExams || [])) {
      const sec = exam.sections;
      if (!sec) continue;

      if (sec.part1?.questions) {
        const found = sec.part1.questions.find(q => q.id === qid);
        if (found) {
          return {
            question: found,
            type: 'mcq',
            scope: 'exam',
            examId: exam.id,
            section: 'part1',
            examTitle: exam.title
          };
        }
      }

      if (sec.part2?.questions) {
        const found = sec.part2.questions.find(q => q.id === qid);
        if (found) {
          return {
            question: found,
            type: 'tf',
            scope: 'exam',
            examId: exam.id,
            section: 'part2',
            examTitle: exam.title
          };
        }
      }

      if (sec.part3?.questions) {
        const found = sec.part3.questions.find(q => q.id === qid);
        if (found) {
          return {
            question: found,
            type: 'sa',
            scope: 'exam',
            examId: exam.id,
            section: 'part3',
            examTitle: exam.title
          };
        }
      }

      if (sec.part4?.items) {
        const found = sec.part4.items.find((q, i) => (q.id === qid || ('exam-essay-' + i) === qid));
        if (found) {
          return {
            question: found,
            type: 'essay',
            scope: 'exam',
            examId: exam.id,
            section: 'part4',
            examTitle: exam.title
          };
        }
      }
    }

    return null;
  }

  // ==============================================================================
  // TEACHER MODAL & MATH EDITOR ENGINE
  // ==============================================================================
  let currentActiveInputForMath = null;
  let currentEditorContext = null;

  function openTeacherModal(config) {
    currentEditorContext = config;
    const overlay = document.getElementById('teacher-modal-overlay');
    const titleEl = document.getElementById('teacher-modal-title');
    const iconEl = document.getElementById('teacher-modal-icon');
    const typeGroup = document.getElementById('teacher-add-type-group');
    const fieldsContainer = document.getElementById('teacher-dynamic-fields');
    const livePreview = document.getElementById('teacher-live-preview');

    if (!overlay || !fieldsContainer) return;

    iconEl.textContent = config.mode === 'add' ? '➕' : '✏️';
    titleEl.textContent = config.title || (config.mode === 'add' ? 'Thêm Tài Liệu Mới' : 'Chỉnh Sửa Tài Liệu');

    if (config.mode === 'add' && !config.lockType) {
      typeGroup.style.display = 'flex';
      const qtypeSelect = document.getElementById('teacher-form-qtype');
      if (qtypeSelect) {
        qtypeSelect.value = config.type || 'mcq';
        qtypeSelect.onchange = function() {
          currentEditorContext.type = this.value;
          renderTeacherFormFields(this.value, null);
        };
      }
    } else {
      typeGroup.style.display = 'none';
    }

    renderTeacherFormFields(config.type, config.data);
    overlay.style.display = 'flex';

    if (livePreview) {
      livePreview.innerHTML = `<em style="color: var(--text-muted); font-size: 13px;">Gõ vào các ô nội dung để xem trước công thức KaTeX tại đây...</em>`;
    }
  }

  function closeTeacherModal() {
    const overlay = document.getElementById('teacher-modal-overlay');
    if (overlay) overlay.style.display = 'none';
    currentEditorContext = null;
  }

  function updateLivePreview(rawText) {
    const livePreview = document.getElementById('teacher-live-preview');
    if (!livePreview) return;

    if (!rawText || !rawText.trim()) {
      livePreview.innerHTML = `<em style="color: var(--text-muted); font-size: 13px;">Gõ vào các ô nội dung để xem trước công thức KaTeX tại đây...</em>`;
      return;
    }

    livePreview.innerHTML = rawText.replace(/\n/g, '<br>');
    renderMath(livePreview);
  }

  function insertMathAtCursor(latex) {
    if (!currentActiveInputForMath) {
      currentActiveInputForMath = document.querySelector('#teacher-dynamic-fields textarea, #teacher-dynamic-fields input');
    }
    if (!currentActiveInputForMath) return;

    const el = currentActiveInputForMath;
    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    const text = el.value || "";
    const insertText = `$${latex}$`;
    el.value = text.substring(0, start) + insertText + text.substring(end);
    el.selectionStart = el.selectionEnd = start + insertText.length;
    el.focus();

    updateLivePreview(el.value);
  }

  function renderTeacherFormFields(type, data) {
    const container = document.getElementById('teacher-dynamic-fields');
    if (!container) return;

    let html = "";

    if (type === 'mcq') {
      const qText = data?.question || data?.text || "";
      const level = data?.level || "Thông hiểu";
      const opts = data?.options || ["", "", "", ""];
      const ans = data?.answer !== undefined ? data.answer : 0;
      const exp = data?.explain || "";

      html = `
        <div class="teacher-field-group">
          <label class="teacher-field-label">Nội dung câu hỏi (hỗ trợ công thức $...$ hoặc $$...$$):</label>
          <textarea class="teacher-textarea live-track" id="f-mcq-question" placeholder="Ví dụ: Cho hàm số $y = f(x)$ có bảng biến thiên...">${qText}</textarea>
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">Mức độ nhận thức:</label>
          <select class="teacher-select" id="f-mcq-level">
            <option value="Nhận biết" ${level === 'Nhận biết' ? 'selected' : ''}>Nhận biết</option>
            <option value="Thông hiểu" ${level === 'Thông hiểu' ? 'selected' : ''}>Thông hiểu</option>
            <option value="Vận dụng" ${level === 'Vận dụng' ? 'selected' : ''}>Vận dụng</option>
            <option value="Vận dụng cao" ${level === 'Vận dụng cao' ? 'selected' : ''}>Vận dụng cao</option>
          </select>
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">4 Phương án trả lời (A, B, C, D):</label>
          <div class="teacher-options-grid">
            <div class="teacher-opt-item">
              <div class="teacher-opt-header">Phương án A:</div>
              <input type="text" class="teacher-input live-track" id="f-mcq-opt-0" value="${opts[0] || ''}" placeholder="Phương án A">
            </div>
            <div class="teacher-opt-item">
              <div class="teacher-opt-header">Phương án B:</div>
              <input type="text" class="teacher-input live-track" id="f-mcq-opt-1" value="${opts[1] || ''}" placeholder="Phương án B">
            </div>
            <div class="teacher-opt-item">
              <div class="teacher-opt-header">Phương án C:</div>
              <input type="text" class="teacher-input live-track" id="f-mcq-opt-2" value="${opts[2] || ''}" placeholder="Phương án C">
            </div>
            <div class="teacher-opt-item">
              <div class="teacher-opt-header">Phương án D:</div>
              <input type="text" class="teacher-input live-track" id="f-mcq-opt-3" value="${opts[3] || ''}" placeholder="Phương án D">
            </div>
          </div>
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">Đáp án đúng chính xác:</label>
          <select class="teacher-select" id="f-mcq-answer">
            <option value="0" ${ans === 0 ? 'selected' : ''}>Phương án A</option>
            <option value="1" ${ans === 1 ? 'selected' : ''}>Phương án B</option>
            <option value="2" ${ans === 2 ? 'selected' : ''}>Phương án C</option>
            <option value="3" ${ans === 3 ? 'selected' : ''}>Phương án D</option>
          </select>
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">Lời giải chi tiết từng bước:</label>
          <textarea class="teacher-textarea live-track" id="f-mcq-explain" placeholder="Trình bày các bước biến đổi, công thức KaTeX...">${exp}</textarea>
        </div>
      `;
    } else if (type === 'tf') {
      const ctx = data?.context || "";
      const items = data?.items || [
        { text: "a) ", answer: true, explain: "" },
        { text: "b) ", answer: false, explain: "" },
        { text: "c) ", answer: true, explain: "" },
        { text: "d) ", answer: false, explain: "" }
      ];

      let itemsHtml = "";
      items.forEach((it, idx) => {
        const prefix = ['a', 'b', 'c', 'd'][idx];
        itemsHtml += `
          <div class="teacher-tf-item">
            <div class="teacher-tf-header">
              <span>Ý ${prefix.toUpperCase()})</span>
              <div>
                <label style="margin-right: 10px; font-size: 13px;">Đáp án: </label>
                <select class="teacher-select" id="f-tf-ans-${idx}" style="display: inline-block; width: auto; padding: 4px 10px;">
                  <option value="true" ${it.answer === true ? 'selected' : ''}>ĐÚNG</option>
                  <option value="false" ${it.answer === false ? 'selected' : ''}>SAI</option>
                </select>
              </div>
            </div>
            <input type="text" class="teacher-input live-track" id="f-tf-text-${idx}" value="${it.text || ''}" placeholder="Nội dung mệnh đề..." style="margin-bottom: 6px;">
            <input type="text" class="teacher-input live-track" id="f-tf-exp-${idx}" value="${it.explain || ''}" placeholder="Giải thích ngắn vì sao đúng/sai...">
          </div>
        `;
      });

      html = `
        <div class="teacher-field-group">
          <label class="teacher-field-label">Ngữ cảnh / Giả thiết bài toán:</label>
          <textarea class="teacher-textarea live-track" id="f-tf-context" placeholder="Cho hàm số $y = f(x)$...">${ctx}</textarea>
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">4 Mệnh đề con (a, b, c, d):</label>
          ${itemsHtml}
        </div>
      `;
    } else if (type === 'sa') {
      const qText = data?.question || data?.text || "";
      const ans = data?.answer || "";
      const accept = (data?.acceptAnswers || []).join(', ');
      const exp = data?.explain || "";

      html = `
        <div class="teacher-field-group">
          <label class="teacher-field-label">Đề bài câu hỏi trả lời ngắn:</label>
          <textarea class="teacher-textarea live-track" id="f-sa-question" placeholder="Nhập câu hỏi...">${qText}</textarea>
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">Đáp án chuẩn (Số hoặc Biểu thức):</label>
          <input type="text" class="teacher-input live-track" id="f-sa-answer" value="${ans}" placeholder="Ví dụ: 50 hoặc -2 hoặc m > 1">
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">Các đáp án chấp nhận khác (cách nhau bởi dấu phẩy):</label>
          <input type="text" class="teacher-input" id="f-sa-accept" value="${accept}" placeholder="Ví dụ: 50 N, 50N, 50,0">
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">Lời giải chi tiết:</label>
          <textarea class="teacher-textarea live-track" id="f-sa-explain" placeholder="Trình bày cách tính ra kết quả...">${exp}</textarea>
        </div>
      `;
    } else if (type === 'essay') {
      const title = data?.title || "";
      const qText = data?.question || "";
      const sol = data?.solution || "";

      html = `
        <div class="teacher-field-group">
          <label class="teacher-field-label">Tiêu đề bài toán / Dạng bài:</label>
          <input type="text" class="teacher-input live-track" id="f-essay-title" value="${title}" placeholder="Ví dụ: Bài toán tối ưu hóa chi phí sản xuất">
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">Nội dung bài toán tự luận:</label>
          <textarea class="teacher-textarea live-track" id="f-essay-question" placeholder="Nội dung đề bài...">${qText}</textarea>
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">Lời giải chi tiết từng bước & Kết luận:</label>
          <textarea class="teacher-textarea live-track" id="f-essay-solution" style="min-height: 140px;" placeholder="Lời giải chi tiết...">${sol}</textarea>
        </div>
      `;
    } else if (type === 'theory') {
      const content = data?.content || "";

      html = `
        <div class="teacher-field-group">
          <label class="teacher-field-label">Nội dung lý thuyết (Hỗ trợ định dạng HTML và công thức KaTeX $...$):</label>
          <textarea class="teacher-textarea live-track" id="f-theory-content" style="min-height: 240px;" placeholder="Soạn nội dung lý thuyết trọng tâm...">${content}</textarea>
        </div>
      `;
    } else if (type === 'exam_info') {
      const title = data?.title || "";
      const subtitle = data?.subtitle || "";
      const time = data?.timeMinutes || 90;
      const badge = data?.badge || "Bộ GD&ĐT 2025";

      html = `
        <div class="teacher-field-group">
          <label class="teacher-field-label">Tiêu đề đề thi:</label>
          <input type="text" class="teacher-input live-track" id="f-exam-title" value="${title}" placeholder="Ví dụ: Đề số 6: Đề Thi Giữa Học Kỳ 1">
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">Phụ đề / Thông tin trường:</label>
          <input type="text" class="teacher-input live-track" id="f-exam-subtitle" value="${subtitle}" placeholder="Ví dụ: Đề thi chính thức Bộ GD&ĐT 2025">
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">Thời gian làm bài (phút):</label>
          <input type="number" class="teacher-input" id="f-exam-time" value="${time}">
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">Huy hiệu hiển thị:</label>
          <input type="text" class="teacher-input" id="f-exam-badge" value="${badge}">
        </div>
      `;
    } else if (type === 'new_exam') {
      const nextNum = (MATH_DATABASE.midtermExams || []).length + 1;
      html = `
        <div class="teacher-field-group">
          <label class="teacher-field-label">Tiêu đề đề thi mới:</label>
          <input type="text" class="teacher-input live-track" id="f-newexam-title" value="Đề số ${nextNum}: Đề Thi Thử Phát Triển Năng Lực" placeholder="Tiêu đề đề thi">
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">Phụ đề:</label>
          <input type="text" class="teacher-input live-track" id="f-newexam-subtitle" value="Cấu trúc ma trận chuẩn Bộ Giáo dục & Đào tạo" placeholder="Phụ đề">
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">Thời gian làm bài (phút):</label>
          <input type="number" class="teacher-input" id="f-newexam-time" value="90">
        </div>
        <div class="teacher-field-group">
          <label class="teacher-field-label">Huy hiệu:</label>
          <input type="text" class="teacher-input" id="f-newexam-badge" value="Đề Mới Tạo">
        </div>
      `;
    }

    container.innerHTML = html;

    // Track focused input for math toolbar
    container.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('focus', function() {
        currentActiveInputForMath = this;
      });
      if (input.classList.contains('live-track')) {
        input.addEventListener('input', function() {
          updateLivePreview(this.value);
        });
      }
    });

    const firstInput = container.querySelector('textarea, input');
    if (firstInput) {
      currentActiveInputForMath = firstInput;
      if (firstInput.value) {
        updateLivePreview(firstInput.value);
      }
    }
  }

  function saveTeacherModal() {
    if (!currentEditorContext) return;

    const type = currentEditorContext.type;
    const mode = currentEditorContext.mode;
    const info = currentEditorContext.targetInfo || {};

    if (type === 'mcq') {
      const qText = document.getElementById('f-mcq-question')?.value.trim();
      const level = document.getElementById('f-mcq-level')?.value;
      const opts = [
        document.getElementById('f-mcq-opt-0')?.value.trim() || "Phương án A",
        document.getElementById('f-mcq-opt-1')?.value.trim() || "Phương án B",
        document.getElementById('f-mcq-opt-2')?.value.trim() || "Phương án C",
        document.getElementById('f-mcq-opt-3')?.value.trim() || "Phương án D"
      ];
      const ans = parseInt(document.getElementById('f-mcq-answer')?.value, 10) || 0;
      const exp = document.getElementById('f-mcq-explain')?.value.trim() || "Chưa có lời giải chi tiết.";

      if (!qText) {
        showToast("Vui lòng nhập nội dung câu hỏi!", "danger");
        return;
      }

      if (mode === 'edit') {
        const qid = currentEditorContext.qid;
        customMaterials.editedQuestions[qid] = {
          question: qText,
          text: qText,
          level: level,
          options: opts,
          answer: ans,
          explain: exp
        };
      } else {
        const newId = 'custom-mcq-' + Date.now();
        const newQ = {
          id: newId,
          question: qText,
          text: qText,
          level: level,
          options: opts,
          answer: ans,
          explain: exp
        };
        const targetKey = info.scope === 'topic'
          ? `topic:${info.topicId}:mcq`
          : `exam:${info.examId}:part1`;
        customMaterials.addedQuestions[targetKey] = customMaterials.addedQuestions[targetKey] || [];
        customMaterials.addedQuestions[targetKey].push(newQ);
      }
    } else if (type === 'tf') {
      const ctx = document.getElementById('f-tf-context')?.value.trim();
      if (!ctx) {
        showToast("Vui lòng nhập ngữ cảnh đề bài!", "danger");
        return;
      }

      const items = [0, 1, 2, 3].map(i => ({
        text: document.getElementById(`f-tf-text-${i}`)?.value.trim() || `Ý ${['a', 'b', 'c', 'd'][i]})`,
        answer: document.getElementById(`f-tf-ans-${i}`)?.value === 'true',
        explain: document.getElementById(`f-tf-exp-${i}`)?.value.trim() || ""
      }));

      if (mode === 'edit') {
        const qid = currentEditorContext.qid;
        customMaterials.editedQuestions[qid] = {
          context: ctx,
          items: items
        };
      } else {
        const newId = 'custom-tf-' + Date.now();
        const newQ = {
          id: newId,
          context: ctx,
          items: items
        };
        const targetKey = info.scope === 'topic'
          ? `topic:${info.topicId}:tf`
          : `exam:${info.examId}:part2`;
        customMaterials.addedQuestions[targetKey] = customMaterials.addedQuestions[targetKey] || [];
        customMaterials.addedQuestions[targetKey].push(newQ);
      }
    } else if (type === 'sa') {
      const qText = document.getElementById('f-sa-question')?.value.trim();
      const ans = document.getElementById('f-sa-answer')?.value.trim();
      const acceptStr = document.getElementById('f-sa-accept')?.value.trim();
      const exp = document.getElementById('f-sa-explain')?.value.trim() || "";

      if (!qText || !ans) {
        showToast("Vui lòng nhập câu hỏi và đáp án chuẩn!", "danger");
        return;
      }

      const accepts = acceptStr ? acceptStr.split(',').map(s => s.trim()).filter(Boolean) : [ans];

      if (mode === 'edit') {
        const qid = currentEditorContext.qid;
        customMaterials.editedQuestions[qid] = {
          question: qText,
          text: qText,
          answer: ans,
          acceptAnswers: accepts,
          explain: exp
        };
      } else {
        const newId = 'custom-sa-' + Date.now();
        const newQ = {
          id: newId,
          question: qText,
          text: qText,
          answer: ans,
          acceptAnswers: accepts,
          explain: exp
        };
        const targetKey = info.scope === 'topic'
          ? `topic:${info.topicId}:shortAnswer`
          : `exam:${info.examId}:part3`;
        customMaterials.addedQuestions[targetKey] = customMaterials.addedQuestions[targetKey] || [];
        customMaterials.addedQuestions[targetKey].push(newQ);
      }
    } else if (type === 'essay') {
      const title = document.getElementById('f-essay-title')?.value.trim() || "Bài toán tự luận";
      const qText = document.getElementById('f-essay-question')?.value.trim();
      const sol = document.getElementById('f-essay-solution')?.value.trim() || "";

      if (!qText) {
        showToast("Vui lòng nhập đề bài!", "danger");
        return;
      }

      if (mode === 'edit') {
        const qid = currentEditorContext.qid;
        customMaterials.editedQuestions[qid] = {
          title: title,
          question: qText,
          solution: sol
        };
      } else {
        const newId = 'custom-essay-' + Date.now();
        const newQ = {
          id: newId,
          title: title,
          question: qText,
          solution: sol
        };
        const targetKey = info.scope === 'topic'
          ? `topic:${info.topicId}:essay`
          : `exam:${info.examId}:part4`;
        customMaterials.addedQuestions[targetKey] = customMaterials.addedQuestions[targetKey] || [];
        customMaterials.addedQuestions[targetKey].push(newQ);
      }
    } else if (type === 'theory') {
      const content = document.getElementById('f-theory-content')?.value.trim();
      if (!content) {
        showToast("Vui lòng nhập nội dung lý thuyết!", "danger");
        return;
      }
      const topicId = info.topicId || state.currentTopicId;
      customMaterials.editedTheories[topicId] = { content: content };
    } else if (type === 'exam_info') {
      const title = document.getElementById('f-exam-title')?.value.trim();
      const subtitle = document.getElementById('f-exam-subtitle')?.value.trim();
      const time = parseInt(document.getElementById('f-exam-time')?.value, 10) || 90;
      const badge = document.getElementById('f-exam-badge')?.value.trim() || "Bộ GD&ĐT 2025";

      if (!title) {
        showToast("Vui lòng nhập tiêu đề đề thi!", "danger");
        return;
      }
      const examId = info.examId || state.currentExamId;
      customMaterials.editedExamInfo[examId] = {
        title: title,
        subtitle: subtitle,
        timeMinutes: time,
        badge: badge
      };
    } else if (type === 'new_exam') {
      const title = document.getElementById('f-newexam-title')?.value.trim();
      const subtitle = document.getElementById('f-newexam-subtitle')?.value.trim();
      const time = parseInt(document.getElementById('f-newexam-time')?.value, 10) || 90;
      const badge = document.getElementById('f-newexam-badge')?.value.trim() || "Đề Mới";

      if (!title) {
        showToast("Vui lòng nhập tiêu đề đề thi!", "danger");
        return;
      }

      const newExamId = 'custom-exam-' + Date.now();
      const newExam = {
        id: newExamId,
        title: title,
        subtitle: subtitle,
        timeMinutes: time,
        badge: badge,
        sections: {
          part1: { name: "PHẦN I: CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN", questions: [] },
          part2: { name: "PHẦN II: CÂU TRẮC NGHIỆM ĐÚNG / SAI", questions: [] },
          part3: { name: "PHẦN III: CÂU HỎI TRẢ LỜI NGẮN (ĐIỀN SỐ)", questions: [] },
          part4: { name: "PHẦN IV: BÀI TOÁN TỰ LUẬN & ỨNG DỤNG THỰC TẾ", items: [] }
        }
      };
      customMaterials.customExams.push(newExam);
      state.currentExamId = newExamId;
    }

    saveCustomMaterials();
    applyCustomMaterialsToDatabase();
    closeTeacherModal();
    showToast("Đã lưu tài liệu thành công! 🎉");

    // Re-render
    if (state.currentMode === "topics") {
      renderCurrentTopic();
    } else {
      renderCurrentExamCategoryView();
    }
  }

  function handleTeacherEditQuestion(qid) {
    const info = findQuestionById(qid);
    if (!info) {
      showToast("Không tìm thấy dữ liệu câu hỏi!", "danger");
      return;
    }

    const titlePrefix = info.scope === 'topic'
      ? `Chỉnh Sửa Câu Hỏi • ${info.topicTitle}`
      : `Chỉnh Sửa Câu Hỏi • ${info.examTitle.split(':')[0]}`;

    openTeacherModal({
      mode: 'edit',
      type: info.type,
      lockType: true,
      title: titlePrefix,
      data: info.question,
      targetInfo: info,
      qid: qid
    });
  }

  function handleTeacherDeleteQuestion(qid) {
    if (!confirm("Thầy/cô có chắc chắn muốn xóa câu hỏi này khỏi tài liệu?")) {
      return;
    }

    if (!customMaterials.deletedQuestionIds.includes(qid)) {
      customMaterials.deletedQuestionIds.push(qid);
    }
    saveCustomMaterials();
    applyCustomMaterialsToDatabase();

    showToast("Đã xóa câu hỏi khỏi tài liệu!");

    if (state.currentMode === "topics") {
      renderCurrentTopic();
    } else {
      renderCurrentExamCategoryView();
    }
  }

  // Xuất dữ liệu JSON
  function exportMaterialsJSON() {
    try {
      const exportData = {
        exportedAt: new Date().toISOString(),
        author: "Giáo viên Toán THPT",
        version: "1.0",
        customMaterials: customMaterials
      };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `tai-lieu-toan-thpt-gdpt2018-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Đã xuất tài liệu ra file JSON thành công! 💾");
    } catch (e) {
      showToast("Có lỗi xảy ra khi xuất JSON!", "danger");
    }
  }

  // Nhập dữ liệu JSON
  function importMaterialsJSON(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const imported = JSON.parse(e.target.result);
        const data = imported.customMaterials || imported;
        if (data && typeof data === 'object') {
          customMaterials.editedQuestions = Object.assign(customMaterials.editedQuestions, data.editedQuestions || {});
          customMaterials.deletedQuestionIds = Array.from(new Set([...customMaterials.deletedQuestionIds, ...(data.deletedQuestionIds || [])]));
          customMaterials.addedQuestions = Object.assign(customMaterials.addedQuestions, data.addedQuestions || {});
          customMaterials.editedTheories = Object.assign(customMaterials.editedTheories, data.editedTheories || {});
          customMaterials.editedExamInfo = Object.assign(customMaterials.editedExamInfo, data.editedExamInfo || {});
          if (Array.isArray(data.customExams)) {
            data.customExams.forEach(ne => {
              if (!customMaterials.customExams.some(x => x.id === ne.id)) {
                customMaterials.customExams.push(ne);
              }
            });
          }

          saveCustomMaterials();
          applyCustomMaterialsToDatabase();
          showToast("Đã nhập tài liệu từ JSON lên hệ thống thành công! 📂");

          if (state.currentMode === "topics") {
            renderCurrentTopic();
          } else {
            renderCurrentExamCategoryView();
          }
        } else {
          showToast("Cấu trúc file JSON không hợp lệ!", "danger");
        }
      } catch (err) {
        showToast("Không thể đọc file JSON!", "danger");
      }
    };
    reader.readAsText(file);
  }

  // Khôi phục mặc định ban đầu
  function resetDefaultMaterials() {
    if (!confirm("Thầy/cô có chắc chắn muốn khôi phục toàn bộ câu hỏi và tài liệu về nguyên bản mặc định ban đầu? Các chỉnh sửa cá nhân sẽ được xóa.")) {
      return;
    }
    localStorage.removeItem('math_custom_materials_v1');
    showToast("Đang khôi phục dữ liệu gốc...");
    setTimeout(() => {
      location.reload();
    }, 600);
  }

  // KaTeX Math Rendering
  function renderMath(element) {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(element || document.body, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false
        });
      } catch (e) {
        console.error("KaTeX rendering error:", e);
      }
    }
  }

  // Theme Management
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeBtnLanding = document.getElementById('theme-toggle-btn-landing');
    const themeBtnMode = document.getElementById('theme-toggle-btn-mode');
    const themeBtnLogin = document.getElementById('theme-toggle-btn-login');

    const updateBtns = (theme) => {
      const icon = theme === 'dark' ? '☀️' : '🌙';
      if (themeBtn) themeBtn.innerHTML = icon;
      if (themeBtnLanding) themeBtnLanding.innerHTML = icon;
      if (themeBtnMode) themeBtnMode.innerHTML = icon;
      if (themeBtnLogin) themeBtnLogin.innerHTML = icon;
    };

    updateBtns(savedTheme);

    const toggleTheme = () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateBtns(next);
    };

    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    if (themeBtnLanding) themeBtnLanding.addEventListener('click', toggleTheme);
    if (themeBtnMode) themeBtnMode.addEventListener('click', toggleTheme);
    if (themeBtnLogin) themeBtnLogin.addEventListener('click', toggleTheme);
  }

  // ==============================================================================
  // AUTHENTICATION & USER MANAGEMENT (HỌC SINH & GIÁO VIÊN)
  // ==============================================================================
  const authManager = {
    // Tài khoản mẫu sẵn có để trải nghiệm nhanh
    demoAccounts: [
      {
        email: "hocsinh@toan.edu.vn",
        username: "hocsinh",
        password: "123",
        name: "Nguyễn Văn An",
        role: "student",
        avatar: "👨‍🎓"
      },
      {
        email: "giaovien@toan.edu.vn",
        username: "giaovien",
        password: "123",
        name: "Thầy Nguyễn Văn Toàn",
        role: "teacher",
        avatar: "👨‍🏫"
      }
    ],

    getRegisteredAccounts: function() {
      try {
        return JSON.parse(localStorage.getItem('math_auth_accounts') || '[]');
      } catch (e) {
        return [];
      }
    },

    saveRegisteredAccounts: function(accs) {
      try {
        localStorage.setItem('math_auth_accounts', JSON.stringify(accs));
      } catch (e) {}
    },

    getCurrentUser: function() {
      if (state.currentUser) return state.currentUser;
      try {
        const raw = localStorage.getItem('math_current_session');
        if (raw) {
          state.currentUser = JSON.parse(raw);
          if (state.currentUser && state.currentUser.role) {
            state.currentUserRole = state.currentUser.role;
          }
          return state.currentUser;
        }
      } catch (e) {}
      return null;
    },

    login: function(identifier, password, role) {
      const cleanId = (identifier || '').trim().toLowerCase();
      const cleanPass = (password || '').trim();

      if (!cleanId || !cleanPass) {
        showToast("Vui lòng nhập tên đăng nhập và mật khẩu!", "danger");
        return false;
      }

      // 1. Kiểm tra tài khoản mẫu demo
      let matched = this.demoAccounts.find(a =>
        (a.email.toLowerCase() === cleanId || a.username.toLowerCase() === cleanId) &&
        (a.password === cleanPass || cleanPass === '123' || cleanPass === '123456')
      );

      // 2. Kiểm tra tài khoản người dùng đăng ký
      if (!matched) {
        const registered = this.getRegisteredAccounts();
        matched = registered.find(a =>
          (a.email.toLowerCase() === cleanId || a.username.toLowerCase() === cleanId) &&
          a.password === cleanPass
        );
      }

      // 3. Fallback chấp nhận tài khoản mới nếu chưa có
      if (!matched) {
        matched = {
          name: cleanId.includes('@') ? cleanId.split('@')[0] : cleanId,
          email: cleanId,
          username: cleanId,
          role: role || 'student',
          avatar: (role === 'teacher') ? '👨‍🏫' : '👨‍🎓'
        };
      }

      const userSession = {
        name: matched.name,
        email: matched.email,
        username: matched.username,
        role: matched.role || role || 'student',
        avatar: matched.avatar || (matched.role === 'teacher' ? '👨‍🏫' : '👨‍🎓'),
        loginAt: new Date().toISOString()
      };

      state.currentUser = userSession;
      localStorage.setItem('math_current_session', JSON.stringify(userSession));
      setUserRole(userSession.role);
      this.updateWidgets();
      showToast(`Xin chào ${userSession.name}! Đăng nhập thành công 🎉`);
      return true;
    },

    quickLogin: function(role) {
      const demo = this.demoAccounts.find(a => a.role === role) || this.demoAccounts[0];
      return this.login(demo.email, demo.password, role);
    },

    register: function(name, username, password, role) {
      const cleanName = (name || '').trim();
      const cleanUser = (username || '').trim().toLowerCase();
      const cleanPass = (password || '').trim();

      if (!cleanName || !cleanUser || !cleanPass) {
        showToast("Vui lòng điền đầy đủ các thông tin đăng ký!", "danger");
        return false;
      }

      if (cleanPass.length < 6) {
        showToast("Mật khẩu cần tối thiểu 6 ký tự!", "danger");
        return false;
      }

      const registered = this.getRegisteredAccounts();
      if (registered.some(a => a.username === cleanUser || a.email === cleanUser)) {
        showToast("Tên đăng nhập hoặc email này đã tồn tại!", "danger");
        return false;
      }

      const newAcc = {
        name: cleanName,
        email: cleanUser.includes('@') ? cleanUser : `${cleanUser}@toan.edu.vn`,
        username: cleanUser,
        password: cleanPass,
        role: role || 'student',
        avatar: role === 'teacher' ? '👨‍🏫' : '👨‍🎓',
        createdAt: new Date().toISOString()
      };

      registered.push(newAcc);
      this.saveRegisteredAccounts(registered);

      return this.login(newAcc.username, newAcc.password, newAcc.role);
    },

    logout: function() {
      state.currentUser = null;
      localStorage.removeItem('math_current_session');
      setUserRole('student');
      this.updateWidgets();
      showToast("Đã đăng xuất khỏi tài khoản!");
      AppRouter.push('/login');
    },

    updateWidgets: function() {
      const user = this.getCurrentUser();
      const widgets = [
        document.getElementById('user-widget-landing'),
        document.getElementById('user-widget-mode'),
        document.getElementById('user-widget-workspace')
      ];

      widgets.forEach(w => {
        if (!w) return;
        if (user) {
          w.innerHTML = `
            <div class="user-profile-badge">
              <span class="user-badge-avatar">${user.avatar || (user.role === 'teacher' ? '👨‍🏫' : '👨‍🎓')}</span>
              <span class="user-badge-name" title="${user.name}">${user.name}</span>
              <span class="user-badge-role ${user.role}">${user.role === 'teacher' ? 'Giáo viên' : 'Học sinh'}</span>
              <button type="button" class="btn-user-logout" title="Đăng xuất">🚪</button>
            </div>
          `;
          w.querySelector('.btn-user-logout')?.addEventListener('click', (e) => {
            e.stopPropagation();
            authManager.logout();
          });
        } else {
          w.innerHTML = `
            <button type="button" class="btn-header-login">
              <span>🔑</span> Đăng nhập
            </button>
          `;
          w.querySelector('.btn-header-login')?.addEventListener('click', (e) => {
            e.stopPropagation();
            AppRouter.push('/login');
          });
        }
      });
    }
  };

  // ==============================================================================
  // HIERARCHICAL CLIENT-SIDE ROUTER ENGINE (HTML5 HISTORY & DEEP LINKING)
  // ==============================================================================
  const AppRouter = {
    isPushing: false,

    topicSlugMap: {
      "12-1": "don-dieu-cuc-tri",
      "12-2": "gtln-gtnn",
      "12-3": "tiem-can",
      "12-4": "toan-thuc-te",
      "12-5": "vecto-khong-gian"
    },

    examSlugMap: {
      "gk1-de-so-6": "de-6",
      "gk1-de-so-7": "de-7",
      "gk1-de-so-8": "de-8",
      "gk1-de-so-9": "de-9",
      "gk1-de-so-10": "de-10",
      "gk1-de-so-11": "de-11",
      "gk1-de-so-12": "de-12"
    },

    getTopicSlug: function(id) {
      return this.topicSlugMap[id] || id;
    },

    getTopicIdBySlug: function(slug) {
      for (const [id, s] of Object.entries(this.topicSlugMap)) {
        if (s === slug || id === slug) return id;
      }
      return slug;
    },

    getExamSlug: function(id) {
      return this.examSlugMap[id] || id;
    },

    getExamIdBySlug: function(slug) {
      for (const [id, s] of Object.entries(this.examSlugMap)) {
        if (s === slug || id === slug) return id;
      }
      return slug;
    },

    getCurrentPath: function() {
      if (window.location.protocol === 'file:') {
        const hash = window.location.hash.slice(1);
        return hash ? (hash.startsWith('/') ? hash : '/' + hash) : '/';
      }
      return window.location.pathname || '/';
    },

    push: function(path, replace = false) {
      if (this.getCurrentPath() === path) return;
      this.isPushing = true;
      if (window.location.protocol === 'file:') {
        if (replace) {
          window.location.replace('#' + path);
        } else {
          window.location.hash = '#' + path;
        }
      } else {
        if (replace) {
          window.history.replaceState(null, '', path);
        } else {
          window.history.pushState(null, '', path);
        }
      }
      this.isPushing = false;
    },

    resolveRoute: function(path) {
      const current = path || this.getCurrentPath();
      const clean = current.split('?')[0].replace(/\/+$/, '') || '/';
      const urlParams = new URLSearchParams(window.location.search || (current.includes('?') ? current.split('?')[1] : ''));
      const tabParam = urlParams.get('tab');

      // 1. /login
      if (clean === '/login') {
        showLoginScreen(false);
        return;
      }

      // 2. / or /chon-lop
      if (clean === '/' || clean === '/chon-lop') {
        showGradeSelection(false);
        return;
      }

      // 3. /lop-:grade
      const gradeMatch = clean.match(/^\/lop-(\d+)$/);
      if (gradeMatch) {
        const g = gradeMatch[1];
        showModeSelection(g, false);
        return;
      }

      // 4. /lop-:grade/chuyen-de or /lop-:grade/chuyen-de/:topicSlug
      const topicMatch = clean.match(/^\/lop-(\d+)\/chuyen-de(?:\/([^\/]+))?$/);
      if (topicMatch) {
        const g = topicMatch[1];
        const topicSlug = topicMatch[2];
        const topicId = topicSlug ? this.getTopicIdBySlug(topicSlug) : null;
        enterGradeWorkspace(g, "topics", "gk1", topicId, null, false);
        if (tabParam) {
          switchTab(tabParam, false);
        }
        return;
      }

      // 5. /lop-:grade/luyen-thi or /lop-:grade/luyen-thi/:cat or /lop-:grade/luyen-thi/:cat/:examSlug
      const examMatch = clean.match(/^\/lop-(\d+)\/luyen-thi(?:\/([^\/]+)(?:\/([^\/]+))?)?$/);
      if (examMatch) {
        const g = examMatch[1];
        const cat = examMatch[2] || "gk1";
        const examSlug = examMatch[3];
        const examId = examSlug ? this.getExamIdBySlug(examSlug) : null;
        enterGradeWorkspace(g, "exams", cat, null, examId, false);
        return;
      }

      // Fallback
      showGradeSelection(false);
    },

    init: function() {
      window.addEventListener('popstate', () => {
        this.resolveRoute();
      });
      window.addEventListener('hashchange', () => {
        if (window.location.protocol === 'file:') {
          this.resolveRoute();
        }
      });
      this.resolveRoute();
    }
  };

  // ==============================================================================
  // SCREEN TRANSITIONS (0. Login -> 1. Chọn Lớp -> 2. Chọn Hình Thức -> 3. Workspace)
  // ==============================================================================
  function showLoginScreen(updateUrl = true) {
    const login = document.getElementById('login-screen');
    const landing = document.getElementById('grade-selection-screen');
    const modeHub = document.getElementById('mode-selection-screen');
    const workspace = document.getElementById('workspace-screen');
    if (login) login.style.display = "flex";
    if (landing) landing.style.display = "none";
    if (modeHub) modeHub.style.display = "none";
    if (workspace) workspace.style.display = "none";
    if (updateUrl) AppRouter.push('/login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showGradeSelection(updateUrl = true) {
    const login = document.getElementById('login-screen');
    const landing = document.getElementById('grade-selection-screen');
    const modeHub = document.getElementById('mode-selection-screen');
    const workspace = document.getElementById('workspace-screen');
    if (login) login.style.display = "none";
    if (landing) landing.style.display = "flex";
    if (modeHub) modeHub.style.display = "none";
    if (workspace) workspace.style.display = "none";
    if (updateUrl) AppRouter.push('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showModeSelection(gradeId, updateUrl = true) {
    if (gradeId) state.currentGrade = String(gradeId);

    const login = document.getElementById('login-screen');
    const landing = document.getElementById('grade-selection-screen');
    const modeHub = document.getElementById('mode-selection-screen');
    const workspace = document.getElementById('workspace-screen');

    if (login) login.style.display = "none";
    if (landing) landing.style.display = "none";
    if (modeHub) modeHub.style.display = "flex";
    if (workspace) workspace.style.display = "none";

    // Cập nhật tiêu đề & tóm tắt theo khối lớp
    const titleEl = document.getElementById('mode-hub-grade-title');
    const crumbGrade = document.getElementById('crumb-grade-name');
    if (titleEl) titleEl.textContent = `Lớp ${state.currentGrade}`;
    if (crumbGrade) crumbGrade.textContent = `Lớp ${state.currentGrade}`;

    const gradeObj = MATH_DATABASE.grades.find(g => g.id === state.currentGrade);
    const topicsList = document.getElementById('mode-hub-topics-list');
    const badgeTopics = document.getElementById('badge-topics-count');

    if (gradeObj && topicsList) {
      if (badgeTopics) badgeTopics.textContent = `${gradeObj.topics.length} Chuyên đề`;
      topicsList.innerHTML = gradeObj.topics.map((t, idx) => `
        <li class="mode-feature-item">
          <span class="item-icon">${t.icon || '📌'}</span>
          <span><strong>Chuyên đề ${idx + 1}:</strong> ${t.title}</span>
        </li>
      `).join('');
    }

    const examsList = document.getElementById('mode-hub-exams-list');
    const badgeExams = document.getElementById('badge-exams-highlight');
    if (examsList) {
      if (badgeExams) {
        badgeExams.textContent = state.currentGrade === "12" ? "7 Đề Giữa HK1 2025" : "Ma trận đề thi";
      }
      const cats = MATH_DATABASE.examCategories || [];
      examsList.innerHTML = cats.map(c => `
        <li class="mode-feature-item">
          <span class="item-icon">${c.icon}</span>
          <span><strong>${c.name}:</strong> ${c.status === 'active' ? '<span style="color: #ef4444; font-weight: 700;">(7 Đề sẵn sàng)</span>' : '<span style="color: var(--text-muted); font-size: 12px;">(Sắp ra mắt)</span>'} ${c.desc.split(',')[0]}</span>
        </li>
      `).join('');
    }

    if (updateUrl) AppRouter.push(`/lop-${state.currentGrade}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function enterGradeWorkspace(gradeId, mode = "topics", examCatId = "gk1", targetTopicId = null, targetExamId = null, updateUrl = true) {
    state.currentGrade = gradeId ? String(gradeId) : state.currentGrade;
    state.currentMode = mode;
    state.currentExamCategory = examCatId;

    if (targetTopicId) state.currentTopicId = targetTopicId;
    if (targetExamId) state.currentExamId = targetExamId;

    const login = document.getElementById('login-screen');
    const landing = document.getElementById('grade-selection-screen');
    const modeHub = document.getElementById('mode-selection-screen');
    const workspace = document.getElementById('workspace-screen');

    if (login) login.style.display = "none";
    if (landing) landing.style.display = "none";
    if (modeHub) modeHub.style.display = "none";
    if (workspace) workspace.style.display = "flex";

    switchGrade(state.currentGrade, false);
    switchMode(mode, false);

    if (targetTopicId) {
      state.currentTopicId = targetTopicId;
      renderCurrentTopic();
    }
    if (targetExamId) {
      state.currentExamId = targetExamId;
      renderCurrentExam();
    }

    if (updateUrl) {
      if (mode === "topics") {
        const tSlug = AppRouter.getTopicSlug(state.currentTopicId);
        AppRouter.push(`/lop-${state.currentGrade}/chuyen-de/${tSlug}`);
      } else {
        const eSlug = AppRouter.getExamSlug(state.currentExamId);
        AppRouter.push(`/lop-${state.currentGrade}/luyen-thi/${examCatId}/${eSlug}`);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(mode === "topics"
      ? `Toán Lớp ${state.currentGrade} • Chế độ Ôn theo chuyên đề 📚`
      : `Toán Lớp ${state.currentGrade} • Phòng Luyện thi trực tuyến 🏆`
    );
  }

  // Cập nhật Breadcrumbs trong Workspace
  function updateBreadcrumbs() {
    const gradeCrumb = document.getElementById('crumb-grade');
    const modeCrumb = document.getElementById('crumb-mode');
    if (!gradeCrumb || !modeCrumb) return;

    gradeCrumb.textContent = `Lớp ${state.currentGrade}`;

    if (state.currentMode === "topics") {
      const topic = getCurrentTopic();
      modeCrumb.textContent = topic ? `Ôn chuyên đề: ${topic.title}` : "Ôn theo chuyên đề";
    } else {
      const cat = (MATH_DATABASE.examCategories || []).find(c => c.id === state.currentExamCategory);
      modeCrumb.textContent = cat ? `Luyện thi: ${cat.name}` : "Luyện thi trực tuyến";
    }
  }

  // ==============================================================================
  // NAVIGATION & MODE SWITCHING (Chuyên đề vs Luyện thi các kỳ thi)
  // ==============================================================================
  function switchMode(mode, updateUrl = true) {
    state.currentMode = mode;

    const btnTopics = document.getElementById('btn-mode-topics');
    const btnExams = document.getElementById('btn-mode-exams');
    const sidebarTopics = document.getElementById('sidebar-topics-box');
    const sidebarExams = document.getElementById('sidebar-exams-box');
    const viewTopics = document.getElementById('view-topics-wrapper');
    const viewExams = document.getElementById('view-exams-wrapper');

    if (mode === "topics") {
      btnTopics?.classList.add('active');
      btnExams?.classList.remove('active');
      if (sidebarTopics) sidebarTopics.style.display = "block";
      if (sidebarExams) sidebarExams.style.display = "none";
      if (viewTopics) viewTopics.style.display = "block";
      if (viewExams) viewExams.style.display = "none";
      renderTopicsSidebar();
      renderCurrentTopic();
      if (updateUrl) {
        AppRouter.push(`/lop-${state.currentGrade}/chuyen-de/${AppRouter.getTopicSlug(state.currentTopicId)}`);
      }
    } else {
      btnTopics?.classList.remove('active');
      btnExams?.classList.add('active');
      if (sidebarTopics) sidebarTopics.style.display = "none";
      if (sidebarExams) sidebarExams.style.display = "block";
      if (viewTopics) viewTopics.style.display = "none";
      if (viewExams) viewExams.style.display = "block";
      renderExamCategoriesNav();
      renderExamsSidebar();
      renderCurrentExamCategoryView();
      if (updateUrl) {
        AppRouter.push(`/lop-${state.currentGrade}/luyen-thi/${state.currentExamCategory}/${AppRouter.getExamSlug(state.currentExamId)}`);
      }
    }

    updateBreadcrumbs();
  }

  // Exam Categories Navigation (Giữa HK1, Cuối HK1, Giữa HK2, Cuối HK2, Thi THPT & ĐGNL)
  function renderExamCategoriesNav() {
    const nav = document.getElementById('exam-categories-nav');
    if (!nav) return;

    const categories = MATH_DATABASE.examCategories || [];
    nav.innerHTML = categories.map(cat => `
      <button type="button" class="exam-cat-pill ${cat.id === state.currentExamCategory ? 'active' : ''}" data-catid="${cat.id}">
        <span>${cat.icon}</span>
        <span>${cat.shortName}</span>
        <span class="exam-cat-badge">${cat.badge}</span>
      </button>
    `).join('');

    nav.querySelectorAll('.exam-cat-pill').forEach(pill => {
      pill.addEventListener('click', function() {
        switchExamCategory(this.dataset.catid, true);
      });
    });
  }

  function switchExamCategory(catId, updateUrl = true) {
    state.currentExamCategory = catId;
    renderExamCategoriesNav();
    renderExamsSidebar();
    renderCurrentExamCategoryView();
    updateBreadcrumbs();
    if (updateUrl) {
      AppRouter.push(`/lop-${state.currentGrade}/luyen-thi/${catId}`);
    }
  }

  function renderCurrentExamCategoryView() {
    const currentCat = (MATH_DATABASE.examCategories || []).find(c => c.id === state.currentExamCategory)
      || (MATH_DATABASE.examCategories || [])[0];

    if (currentCat && currentCat.examsKey === "midtermExams") {
      renderCurrentExam();
    } else if (currentCat) {
      renderUpcomingExamPreview(currentCat);
    }
  }

  function renderUpcomingExamPreview(category) {
    const container = document.getElementById('exam-content-area');
    if (!container) return;

    container.innerHTML = `
      <div class="exam-preview-card">
        <div class="exam-preview-icon">${category.icon}</div>
        <h2 class="exam-preview-title">${category.name} (Lớp ${state.currentGrade})</h2>
        <p class="exam-preview-desc">
          ${category.desc}.<br>
          Ngân hàng đề thi đang được ban chuyên môn hoàn thiện đồng bộ theo cấu trúc ma trận chuẩn Bộ GD&ĐT 2025.
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="exam-preview-btn" id="btn-goto-active-exams">
            <span>📑</span> Luyện ngay 7 đề Giữa HK1 chuẩn 2025
          </button>
          <button type="button" class="btn-study-mode" style="color: var(--text-primary); border-color: var(--border-color); background: var(--bg-secondary);" id="btn-goto-topics">
            <span>📚</span> Chuyển sang Ôn theo chuyên đề
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-goto-active-exams')?.addEventListener('click', () => {
      switchExamCategory('gk1', true);
    });
    document.getElementById('btn-goto-topics')?.addEventListener('click', () => {
      switchMode('topics', true);
    });
  }

  // Grade Switching
  function switchGrade(gradeId, updateUrl = true) {
    state.currentGrade = String(gradeId);
    const gradeObj = MATH_DATABASE.grades.find(g => g.id === gradeId);

    document.querySelectorAll('.grade-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.grade === gradeId);
    });

    const gradeLabel = document.getElementById('sidebar-grade-label');
    if (gradeLabel) gradeLabel.textContent = `Lớp ${gradeId}`;

    if (gradeObj && gradeObj.topics && gradeObj.topics.length > 0) {
      state.currentTopicId = gradeObj.topics[0].id;
    }

    if (state.currentMode === "topics") {
      renderTopicsSidebar();
      renderCurrentTopic();
      if (updateUrl) {
        AppRouter.push(`/lop-${state.currentGrade}/chuyen-de/${AppRouter.getTopicSlug(state.currentTopicId)}`);
      }
    } else {
      renderExamCategoriesNav();
      renderExamsSidebar();
      renderCurrentExamCategoryView();
      if (updateUrl) {
        AppRouter.push(`/lop-${state.currentGrade}/luyen-thi/${state.currentExamCategory}`);
      }
    }

    updateBreadcrumbs();
  }

  // Render Sidebar Topics
  function renderTopicsSidebar() {
    const container = document.getElementById('topic-list-container');
    if (!container) return;

    const gradeObj = MATH_DATABASE.grades.find(g => g.id === state.currentGrade);
    if (!gradeObj) return;

    container.innerHTML = "";
    gradeObj.topics.forEach(topic => {
      const item = document.createElement('div');
      item.className = `topic-item ${topic.id === state.currentTopicId ? 'active' : ''}`;
      item.dataset.topicId = topic.id;

      const qCount = topic.exercises
        ? ((topic.exercises.mcq?.length || 0) + (topic.exercises.tf?.length || 0) + (topic.exercises.shortAnswer?.length || 0) + (topic.exercises.essay?.length || 0))
        : 0;

      item.innerHTML = `
        <div class="topic-icon-wrap" style="color: ${topic.color}">${topic.icon}</div>
        <div class="topic-info">
          <div class="topic-name">${topic.title}</div>
          <div class="topic-meta">${qCount > 0 ? `${qCount} bài luyện tập` : 'Chuyên đề'}</div>
        </div>
      `;

      item.addEventListener('click', () => {
        state.currentTopicId = topic.id;
        document.querySelectorAll('.topic-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        renderCurrentTopic();
        updateBreadcrumbs();
        AppRouter.push(`/lop-${state.currentGrade}/chuyen-de/${AppRouter.getTopicSlug(topic.id)}`);
      });

      container.appendChild(item);
    });
  }

  // Render Sidebar Exams
  function renderExamsSidebar() {
    const container = document.getElementById('exam-list-container');
    const titleBox = document.querySelector('#sidebar-exams-box .sidebar-title');
    if (!container) return;

    const currentCat = (MATH_DATABASE.examCategories || []).find(c => c.id === state.currentExamCategory)
      || (MATH_DATABASE.examCategories || [])[0];

    if (titleBox && currentCat) {
      titleBox.innerHTML = `
        <span>${currentCat.name.toUpperCase()}</span>
        <span style="font-size: 11px; color: #ef4444; font-weight: 700;">${currentCat.badge}</span>
      `;
    }

    if (currentCat && currentCat.examsKey === "midtermExams") {
      const exams = MATH_DATABASE.midtermExams || [];
      container.innerHTML = "";

      exams.forEach(exam => {
        const item = document.createElement('div');
        item.className = `topic-item ${exam.id === state.currentExamId ? 'active' : ''}`;
        item.dataset.examId = exam.id;

        item.innerHTML = `
          <div class="topic-icon-wrap" style="color: #ef4444;">📑</div>
          <div class="topic-info">
            <div class="topic-name">${exam.title.split(':')[0]}</div>
            <div class="topic-meta">${exam.subtitle}</div>
          </div>
        `;

        item.addEventListener('click', () => {
          state.currentExamId = exam.id;
          document.querySelectorAll('#exam-list-container .topic-item').forEach(el => el.classList.remove('active'));
          item.classList.add('active');
          renderCurrentExam();
          AppRouter.push(`/lop-${state.currentGrade}/luyen-thi/${state.currentExamCategory}/${AppRouter.getExamSlug(exam.id)}`);
        });

        container.appendChild(item);
      });
    } else {
      container.innerHTML = `
        <div style="padding: 24px 12px; font-size: 13px; color: var(--text-muted); text-align: center; line-height: 1.6;">
          <div style="font-size: 32px; margin-bottom: 8px;">${currentCat ? currentCat.icon : '⏳'}</div>
          <strong>${currentCat ? currentCat.name : 'Kỳ thi'}</strong><br>
          Đang hoàn thiện ngân hàng đề mới.
        </div>
      `;
    }
  }

  // ==============================================================================
  // TOPIC VIEW RENDERING
  // ==============================================================================
  function getCurrentTopic() {
    const gradeObj = MATH_DATABASE.grades.find(g => g.id === state.currentGrade);
    if (!gradeObj) return null;
    return gradeObj.topics.find(t => t.id === state.currentTopicId) || gradeObj.topics[0];
  }

  function renderCurrentTopic() {
    const topic = getCurrentTopic();
    if (!topic) return;

    const bannerEl = document.getElementById('topic-banner-container');
    if (bannerEl) {
      const qCount = topic.exercises
        ? ((topic.exercises.mcq?.length || 0) + (topic.exercises.tf?.length || 0) + (topic.exercises.shortAnswer?.length || 0) + (topic.exercises.essay?.length || 0))
        : 0;

      bannerEl.innerHTML = `
        <div class="banner-content">
          <span class="banner-badge">Lớp ${state.currentGrade} • ${qCount} Bài tập tương tác</span>
          <h2 class="banner-title">${topic.title}</h2>
          <p class="banner-desc">${topic.desc}</p>
        </div>
        <button class="btn-primary" id="btn-quick-exam">
          <span>⏱️</span> Thi thử 15 phút
        </button>
      `;

      const quickExamBtn = document.getElementById('btn-quick-exam');
      if (quickExamBtn) {
        quickExamBtn.addEventListener('click', () => switchTab('exam'));
      }
    }

    const mcqCount = topic.exercises?.mcq?.length || 0;
    const tfCount = topic.exercises?.tf?.length || 0;
    const saCount = topic.exercises?.shortAnswer?.length || 0;
    const essayCount = topic.exercises?.essay?.length || 0;

    const bMcq = document.getElementById('badge-mcq');
    const bTf = document.getElementById('badge-tf');
    const bSa = document.getElementById('badge-sa');
    const bEssay = document.getElementById('badge-essay');

    if (bMcq) bMcq.textContent = mcqCount;
    if (bTf) bTf.textContent = tfCount;
    if (bSa) bSa.textContent = saCount;
    if (bEssay) bEssay.textContent = essayCount;

    renderTheory(topic);
    renderMCQ(topic);
    renderTrueFalse(topic);
    renderShortAnswer(topic);
    renderEssay(topic);
    renderExam(topic);

    renderMath();
  }

  function renderTheory(topic) {
    const container = document.getElementById('tab-content-theory');
    if (!container) return;

    let teacherEditBar = "";
    if (state.currentUserRole === 'teacher') {
      teacherEditBar = `
        <div style="margin-bottom: 14px; display: flex; justify-content: flex-end;">
          <button type="button" class="btn-teacher-act primary" id="btn-edit-theory-inline">
            <span>📖</span> Chỉnh sửa nội dung lý thuyết chuyên đề này
          </button>
        </div>
      `;
    }

    if (!topic.theory) {
      container.innerHTML = `
        ${teacherEditBar}
        <div class="theory-card">
          <h4>Nội dung đang được cập nhật</h4>
          <p>Lý thuyết cho phần này sẽ sớm được bổ sung đầy đủ.</p>
        </div>
      `;
    } else {
      container.innerHTML = `
        ${teacherEditBar}
        <div class="theory-card">
          ${topic.theory.content}
        </div>
      `;
    }

    if (state.currentUserRole === 'teacher') {
      document.getElementById('btn-edit-theory-inline')?.addEventListener('click', () => {
        openTeacherModal({
          mode: 'edit',
          type: 'theory',
          lockType: true,
          title: `Chỉnh Sửa Lý Thuyết: ${topic.title}`,
          data: topic.theory || { content: '' },
          targetInfo: { scope: 'topic', topicId: topic.id }
        });
      });
    }
  }

  function renderMCQ(topic) {
    const container = document.getElementById('tab-content-mcq');
    if (!container) return;

    const list = topic.exercises?.mcq || [];
    if (list.length === 0) {
      container.innerHTML = `
        <div class="question-card"><p>Chưa có bài tập trắc nghiệm cho phần này.</p></div>
        ${state.currentUserRole === 'teacher' ? `
          <button type="button" class="teacher-add-banner-btn" id="btn-add-empty-mcq">
            <span>➕</span> Thêm câu hỏi Trắc nghiệm mới vào chuyên đề này
          </button>
        ` : ''}
      `;
      if (state.currentUserRole === 'teacher') {
        document.getElementById('btn-add-empty-mcq')?.addEventListener('click', () => {
          openTeacherModal({
            mode: 'add',
            type: 'mcq',
            lockType: true,
            title: `Thêm Câu Hỏi Trắc Nghiệm • ${topic.title}`,
            targetInfo: { scope: 'topic', topicId: topic.id, qtype: 'mcq' }
          });
        });
      }
      return;
    }

    container.innerHTML = "";
    list.forEach((q, idx) => {
      const card = document.createElement('div');
      card.className = "question-card";
      card.id = `card-${q.id}`;

      let optionsHtml = "";
      q.options.forEach((opt, optIdx) => {
        optionsHtml += `
          <div class="option-item" data-qid="${q.id}" data-opt="${optIdx}">
            <div class="opt-indicator">${String.fromCharCode(65 + optIdx)}</div>
            <div class="opt-text">${opt}</div>
          </div>
        `;
      });

      card.innerHTML = `
        <div class="q-header">
          <span class="q-tag">Câu ${idx + 1}</span>
          <span class="q-level">${q.level || 'Thông hiểu'}</span>
          ${state.currentUserRole === 'teacher' ? `
            <div class="teacher-card-actions">
              <button type="button" class="btn-q-edit" data-qid="${q.id}" title="Sửa câu hỏi">✏️ Sửa</button>
              <button type="button" class="btn-q-delete" data-qid="${q.id}" title="Xóa câu hỏi">🗑️ Xóa</button>
            </div>
          ` : ''}
        </div>
        <div class="q-title">${q.question.replace(/\n/g, '<br>')}</div>
        <div class="options-grid ${q.options.length <= 4 ? 'two-cols' : ''}">
          ${optionsHtml}
        </div>
        <div class="card-footer">
          <button class="btn-check" data-qid="${q.id}">Kiểm tra đáp án</button>
          <button class="btn-toggle-explain" data-qid="${q.id}">
            <span>💡</span> Xem lời giải
          </button>
        </div>
        <div class="explain-box" id="explain-${q.id}">
          <div class="explain-title"><span>📘</span> Lời giải chi tiết:</div>
          <div>${q.explain}</div>
        </div>
      `;

      if (state.currentUserRole === 'teacher') {
        const editBtn = card.querySelector('.btn-q-edit');
        const delBtn = card.querySelector('.btn-q-delete');
        if (editBtn) editBtn.addEventListener('click', (e) => { e.stopPropagation(); handleTeacherEditQuestion(q.id); });
        if (delBtn) delBtn.addEventListener('click', (e) => { e.stopPropagation(); handleTeacherDeleteQuestion(q.id); });
      }

      card.querySelectorAll('.option-item').forEach(optEl => {
        optEl.addEventListener('click', function() {
          card.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
          this.classList.add('selected');
        });
      });

      const checkBtn = card.querySelector('.btn-check');
      checkBtn.addEventListener('click', function() {
        const selected = card.querySelector('.option-item.selected');
        if (!selected) {
          showToast("Vui lòng chọn một phương án trước khi kiểm tra!");
          return;
        }
        const userChoice = parseInt(selected.dataset.opt, 10);
        const correctChoice = q.answer;

        card.querySelectorAll('.option-item').forEach((item, oIdx) => {
          if (oIdx === correctChoice) {
            item.classList.add('correct');
          } else if (oIdx === userChoice && userChoice !== correctChoice) {
            item.classList.add('incorrect');
          }
        });

        state.userStats.totalAttempted++;
        if (userChoice === correctChoice) {
          state.userStats.totalCorrect++;
          soundEffects.playCorrect();
          showToast("Chính xác! Bạn làm rất tốt 🎉");
        } else {
          soundEffects.playIncorrect();
          showToast("Chưa chính xác. Hãy xem lời giải chi tiết bên dưới!", "danger");
        }
        saveStats();

        const expBox = card.querySelector('.explain-box');
        expBox.classList.add('show');
        renderMath(expBox);
      });

      const expBtn = card.querySelector('.btn-toggle-explain');
      expBtn.addEventListener('click', function() {
        const expBox = card.querySelector('.explain-box');
        expBox.classList.toggle('show');
        renderMath(expBox);
      });

      container.appendChild(card);
    });

    if (state.currentUserRole === 'teacher') {
      const addBanner = document.createElement('button');
      addBanner.type = "button";
      addBanner.className = "teacher-add-banner-btn";
      addBanner.innerHTML = "<span>➕</span> Thêm câu hỏi Trắc nghiệm mới vào chuyên đề này";
      addBanner.addEventListener('click', () => {
        openTeacherModal({
          mode: 'add',
          type: 'mcq',
          lockType: true,
          title: `Thêm Câu Hỏi Trắc Nghiệm • ${topic.title}`,
          targetInfo: { scope: 'topic', topicId: topic.id, qtype: 'mcq' }
        });
      });
      container.appendChild(addBanner);
    }
  }

  function renderTrueFalse(topic) {
    const container = document.getElementById('tab-content-tf');
    if (!container) return;

    const list = topic.exercises?.tf || [];
    if (list.length === 0) {
      container.innerHTML = `
        <div class="question-card"><p>Chưa có câu hỏi Đúng/Sai cho chủ đề này.</p></div>
        ${state.currentUserRole === 'teacher' ? `
          <button type="button" class="teacher-add-banner-btn" id="btn-add-empty-tf">
            <span>➕</span> Thêm câu hỏi Đúng/Sai mới vào chuyên đề này
          </button>
        ` : ''}
      `;
      if (state.currentUserRole === 'teacher') {
        document.getElementById('btn-add-empty-tf')?.addEventListener('click', () => {
          openTeacherModal({
            mode: 'add',
            type: 'tf',
            lockType: true,
            title: `Thêm Câu Hỏi Đúng/Sai • ${topic.title}`,
            targetInfo: { scope: 'topic', topicId: topic.id, qtype: 'tf' }
          });
        });
      }
      return;
    }

    container.innerHTML = "";
    list.forEach((q, idx) => {
      const card = document.createElement('div');
      card.className = "question-card";
      card.id = `card-${q.id}`;

      let rowsHtml = "";
      q.items.forEach((item, itemIdx) => {
        rowsHtml += `
          <tr class="tf-row" data-idx="${itemIdx}">
            <td class="tf-cell-text">${item.text}</td>
            <td class="tf-cell-actions">
              <div class="tf-btn-group">
                <button type="button" class="tf-choice-btn" data-val="true">Đúng</button>
                <button type="button" class="tf-choice-btn" data-val="false">Sai</button>
              </div>
            </td>
          </tr>
        `;
      });

      card.innerHTML = `
        <div class="q-header">
          <span class="q-tag">Dạng Đúng/Sai • Câu ${idx + 1}</span>
          <span class="q-level">Chuẩn ma trận 2025</span>
          ${state.currentUserRole === 'teacher' ? `
            <div class="teacher-card-actions">
              <button type="button" class="btn-q-edit" data-qid="${q.id}" title="Sửa câu hỏi">✏️ Sửa</button>
              <button type="button" class="btn-q-delete" data-qid="${q.id}" title="Xóa câu hỏi">🗑️ Xóa</button>
            </div>
          ` : ''}
        </div>
        <div class="q-title">${q.context}</div>
        <table class="tf-table">
          <tbody>${rowsHtml}</tbody>
        </table>
        <div class="card-footer">
          <button class="btn-check-tf btn-check" data-qid="${q.id}">Chấm điểm</button>
          <button class="btn-toggle-explain" data-qid="${q.id}">
            <span>💡</span> Xem phân tích từng ý
          </button>
        </div>
        <div class="explain-box" id="explain-${q.id}">
          <div class="explain-title"><span>📘</span> Hướng dẫn phân tích Đúng/Sai:</div>
          <ul style="padding-left: 20px;">
            ${q.items.map(it => `<li><strong>${it.text.slice(0, 3)}:</strong> [${it.answer ? 'ĐÚNG' : 'SAI'}] - ${it.explain}</li>`).join('')}
          </ul>
        </div>
      `;

      if (state.currentUserRole === 'teacher') {
        const editBtn = card.querySelector('.btn-q-edit');
        const delBtn = card.querySelector('.btn-q-delete');
        if (editBtn) editBtn.addEventListener('click', (e) => { e.stopPropagation(); handleTeacherEditQuestion(q.id); });
        if (delBtn) delBtn.addEventListener('click', (e) => { e.stopPropagation(); handleTeacherDeleteQuestion(q.id); });
      }

      card.querySelectorAll('.tf-choice-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const row = this.closest('.tf-row');
          row.querySelectorAll('.tf-choice-btn').forEach(b => {
            b.classList.remove('active-true', 'active-false');
          });
          if (this.dataset.val === "true") {
            this.classList.add('active-true');
          } else {
            this.classList.add('active-false');
          }
          row.dataset.userVal = this.dataset.val;
        });
      });

      const checkBtn = card.querySelector('.btn-check-tf');
      checkBtn.addEventListener('click', function() {
        let correctCount = 0;
        let answeredAll = true;

        q.items.forEach((item, iIdx) => {
          const row = card.querySelector(`.tf-row[data-idx="${iIdx}"]`);
          const userVal = row.dataset.userVal;
          if (userVal === undefined) {
            answeredAll = false;
          } else if (String(item.answer) === userVal) {
            correctCount++;
          }
        });

        if (!answeredAll) {
          showToast("Vui lòng trả lời đủ cả 4 ý a, b, c, d!");
          return;
        }

        const scoreTable = { 0: 0, 1: 0.1, 2: 0.25, 3: 0.5, 4: 1.0 };
        const score = scoreTable[correctCount];

        state.userStats.totalAttempted += 4;
        state.userStats.totalCorrect += correctCount;
        saveStats();

        if (correctCount === 4) {
          soundEffects.playCorrect();
          showToast(`Xuất sắc! Đúng trọn vẹn 4/4 ý (+1.0 điểm) 🎉`);
        } else {
          soundEffects.playIncorrect();
          showToast(`Bạn đúng ${correctCount}/4 ý (+${score} điểm). Xem chi tiết bên dưới!`);
        }

        const expBox = card.querySelector('.explain-box');
        expBox.classList.add('show');
        renderMath(expBox);
      });

      const expBtn = card.querySelector('.btn-toggle-explain');
      expBtn.addEventListener('click', function() {
        const expBox = card.querySelector('.explain-box');
        expBox.classList.toggle('show');
        renderMath(expBox);
      });

      container.appendChild(card);
    });

    if (state.currentUserRole === 'teacher') {
      const addBanner = document.createElement('button');
      addBanner.type = "button";
      addBanner.className = "teacher-add-banner-btn";
      addBanner.innerHTML = "<span>➕</span> Thêm câu hỏi Đúng / Sai mới vào chuyên đề này";
      addBanner.addEventListener('click', () => {
        openTeacherModal({
          mode: 'add',
          type: 'tf',
          lockType: true,
          title: `Thêm Câu Hỏi Đúng/Sai • ${topic.title}`,
          targetInfo: { scope: 'topic', topicId: topic.id, qtype: 'tf' }
        });
      });
      container.appendChild(addBanner);
    }
  }

  function renderShortAnswer(topic) {
    const container = document.getElementById('tab-content-sa');
    if (!container) return;

    const list = topic.exercises?.shortAnswer || [];
    if (list.length === 0) {
      container.innerHTML = `
        <div class="question-card"><p>Chưa có câu hỏi trả lời ngắn cho phần này.</p></div>
        ${state.currentUserRole === 'teacher' ? `
          <button type="button" class="teacher-add-banner-btn" id="btn-add-empty-sa">
            <span>➕</span> Thêm câu hỏi Trả lời ngắn mới vào chuyên đề này
          </button>
        ` : ''}
      `;
      if (state.currentUserRole === 'teacher') {
        document.getElementById('btn-add-empty-sa')?.addEventListener('click', () => {
          openTeacherModal({
            mode: 'add',
            type: 'sa',
            lockType: true,
            title: `Thêm Câu Hỏi Điền Số • ${topic.title}`,
            targetInfo: { scope: 'topic', topicId: topic.id, qtype: 'shortAnswer' }
          });
        });
      }
      return;
    }

    container.innerHTML = "";
    list.forEach((q, idx) => {
      const card = document.createElement('div');
      card.className = "question-card";
      card.id = `card-${q.id}`;

      card.innerHTML = `
        <div class="q-header">
          <span class="q-tag">Trả lời ngắn • Câu ${idx + 1}</span>
          <span class="q-level">Điền số</span>
          ${state.currentUserRole === 'teacher' ? `
            <div class="teacher-card-actions">
              <button type="button" class="btn-q-edit" data-qid="${q.id}" title="Sửa câu hỏi">✏️ Sửa</button>
              <button type="button" class="btn-q-delete" data-qid="${q.id}" title="Xóa câu hỏi">🗑️ Xóa</button>
            </div>
          ` : ''}
        </div>
        <div class="q-title">${q.question.replace(/\n/g, '<br>')}</div>
        <div class="sa-input-wrap">
          <input type="text" class="sa-input" placeholder="Nhập kết quả của bạn..." data-qid="${q.id}">
          <button class="btn-check btn-check-sa" data-qid="${q.id}">Kiểm tra</button>
        </div>
        <div class="card-footer">
          <div></div>
          <button class="btn-toggle-explain" data-qid="${q.id}">
            <span>💡</span> Xem đáp án & Lời giải
          </button>
        </div>
        <div class="explain-box" id="explain-${q.id}">
          <div class="explain-title"><span>🎯</span> Đáp án chuẩn: <span style="color: var(--danger-color); font-weight: bold;">${q.answer}</span></div>
          <div>${q.explain}</div>
        </div>
      `;

      if (state.currentUserRole === 'teacher') {
        const editBtn = card.querySelector('.btn-q-edit');
        const delBtn = card.querySelector('.btn-q-delete');
        if (editBtn) editBtn.addEventListener('click', (e) => { e.stopPropagation(); handleTeacherEditQuestion(q.id); });
        if (delBtn) delBtn.addEventListener('click', (e) => { e.stopPropagation(); handleTeacherDeleteQuestion(q.id); });
      }

      const checkBtn = card.querySelector('.btn-check-sa');
      const inputEl = card.querySelector('.sa-input');

      checkBtn.addEventListener('click', function() {
        const val = inputEl.value.trim().toLowerCase();
        if (!val) {
          showToast("Vui lòng nhập kết quả!");
          return;
        }

        const validAnswers = (q.acceptAnswers || [q.answer]).map(a => a.toLowerCase().trim());
        const isCorrect = validAnswers.includes(val);

        state.userStats.totalAttempted++;
        if (isCorrect) {
          state.userStats.totalCorrect++;
          soundEffects.playCorrect();
          inputEl.style.borderColor = "var(--success-color)";
          inputEl.style.backgroundColor = "var(--success-light)";
          showToast("Chính xác tuyệt đối! 🎉");
        } else {
          soundEffects.playIncorrect();
          inputEl.style.borderColor = "var(--danger-color)";
          inputEl.style.backgroundColor = "var(--danger-light)";
          showToast(`Chưa đúng! Đáp án chính xác là: ${q.answer}`);
        }
        saveStats();

        const expBox = card.querySelector('.explain-box');
        expBox.classList.add('show');
        renderMath(expBox);
      });

      const expBtn = card.querySelector('.btn-toggle-explain');
      expBtn.addEventListener('click', function() {
        const expBox = card.querySelector('.explain-box');
        expBox.classList.toggle('show');
        renderMath(expBox);
      });

      container.appendChild(card);
    });

    if (state.currentUserRole === 'teacher') {
      const addBanner = document.createElement('button');
      addBanner.type = "button";
      addBanner.className = "teacher-add-banner-btn";
      addBanner.innerHTML = "<span>➕</span> Thêm câu hỏi Trả lời ngắn mới vào chuyên đề này";
      addBanner.addEventListener('click', () => {
        openTeacherModal({
          mode: 'add',
          type: 'sa',
          lockType: true,
          title: `Thêm Câu Hỏi Điền Số • ${topic.title}`,
          targetInfo: { scope: 'topic', topicId: topic.id, qtype: 'shortAnswer' }
        });
      });
      container.appendChild(addBanner);
    }
  }

  function renderEssay(topic) {
    const container = document.getElementById('tab-content-essay');
    if (!container) return;

    const list = topic.exercises?.essay || [];
    if (list.length === 0) {
      container.innerHTML = `
        <div class="question-card"><p>Chưa có bài tập tự luận cho phần này.</p></div>
        ${state.currentUserRole === 'teacher' ? `
          <button type="button" class="teacher-add-banner-btn" id="btn-add-empty-essay">
            <span>➕</span> Thêm bài toán Tự luận mới vào chuyên đề này
          </button>
        ` : ''}
      `;
      if (state.currentUserRole === 'teacher') {
        document.getElementById('btn-add-empty-essay')?.addEventListener('click', () => {
          openTeacherModal({
            mode: 'add',
            type: 'essay',
            lockType: true,
            title: `Thêm Bài Tự Luận • ${topic.title}`,
            targetInfo: { scope: 'topic', topicId: topic.id, qtype: 'essay' }
          });
        });
      }
      return;
    }

    container.innerHTML = "";
    list.forEach((q, idx) => {
      const card = document.createElement('div');
      card.className = "essay-card";
      const qid = q.id || `essay-${idx}`;

      let diagramHtml = "";
      if (q.diagram === "fig1_dths_phan_thuc_tcx.png") {
        diagramHtml = `<div class="diagram-container">${MathDiagrams.renderFractionGraph()}</div>`;
      } else if (q.diagram === "fig2_gap_hop_ton.png") {
        diagramHtml = `<div class="diagram-container">${MathDiagrams.renderFoldBox()}</div>`;
      } else if (q.diagram === "fig1_cong_parabol_10m_6m.png") {
        diagramHtml = `<div class="diagram-container">${MathDiagrams.renderParabolArch()}</div>`;
      } else if (q.diagram === "fig4_can_bang_luc_den_chum.png") {
        diagramHtml = `<div class="diagram-container">${MathDiagrams.renderCeilingLamp()}</div>`;
      } else if (q.id === "12-1-es1") {
        diagramHtml = `<div class="diagram-container">${MathDiagrams.renderBoxVector()}</div>`;
      }

      card.innerHTML = `
        <div class="q-header">
          <span class="q-tag">Tự luận chuyên sâu • Bài ${idx + 1}</span>
          <span class="q-level">${q.title}</span>
          ${state.currentUserRole === 'teacher' ? `
            <div class="teacher-card-actions">
              <button type="button" class="btn-q-edit" data-qid="${qid}" title="Sửa câu hỏi">✏️ Sửa</button>
              <button type="button" class="btn-q-delete" data-qid="${qid}" title="Xóa câu hỏi">🗑️ Xóa</button>
            </div>
          ` : ''}
        </div>
        <div class="q-title" style="font-size: 15.5px; font-weight: 600;">${q.question.replace(/\n/g, '<br>')}</div>
        ${diagramHtml}
        <div class="card-footer" style="margin-top: 18px;">
          <button class="btn-primary btn-toggle-sol">
            <span>📝</span> Xem lời giải chi tiết từng bước
          </button>
        </div>
        <div class="explain-box" style="margin-top: 14px; background-color: var(--bg-card); border: 1px solid var(--border-color); border-left: 4px solid var(--primary-color);">
          <div class="explain-title" style="font-size: 15px;"><span>✨</span> Lời giải chuẩn mực:</div>
          <div>${q.solution}</div>
        </div>
      `;

      if (state.currentUserRole === 'teacher') {
        const editBtn = card.querySelector('.btn-q-edit');
        const delBtn = card.querySelector('.btn-q-delete');
        if (editBtn) editBtn.addEventListener('click', (e) => { e.stopPropagation(); handleTeacherEditQuestion(qid); });
        if (delBtn) delBtn.addEventListener('click', (e) => { e.stopPropagation(); handleTeacherDeleteQuestion(qid); });
      }

      const solBtn = card.querySelector('.btn-toggle-sol');
      solBtn.addEventListener('click', function() {
        const expBox = card.querySelector('.explain-box');
        expBox.classList.toggle('show');
        renderMath(expBox);
      });

      container.appendChild(card);
    });

    if (state.currentUserRole === 'teacher') {
      const addBanner = document.createElement('button');
      addBanner.type = "button";
      addBanner.className = "teacher-add-banner-btn";
      addBanner.innerHTML = "<span>➕</span> Thêm bài toán Tự luận / Thực tế mới vào chuyên đề này";
      addBanner.addEventListener('click', () => {
        openTeacherModal({
          mode: 'add',
          type: 'essay',
          lockType: true,
          title: `Thêm Bài Tự Luận • ${topic.title}`,
          targetInfo: { scope: 'topic', topicId: topic.id, qtype: 'essay' }
        });
      });
      container.appendChild(addBanner);
    }
  }

  function renderExam(topic) {
    const container = document.getElementById('tab-content-exam');
    if (!container) return;

    container.innerHTML = `
      <div class="exam-header-bar">
        <div>
          <h3 style="color: white; margin-bottom: 4px;">Phòng Thi Thử Trực Tuyến</h3>
          <p style="font-size: 13px; opacity: 0.9;">Chủ đề: ${topic.title}</p>
        </div>
        <div class="timer-box">
          <span>⏳</span>
          <span id="exam-countdown">45:00</span>
        </div>
      </div>
      <div class="question-card" style="text-align: center; padding: 40px 20px;">
        <h3 style="margin-bottom: 12px;">Sẵn sàng bắt đầu bài kiểm tra?</h3>
        <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto 24px auto;">
          Bài thi bao gồm tổng hợp trắc nghiệm 4 lựa chọn, đúng/sai và điền đáp án ngắn của chủ đề này.
          Hệ thống sẽ tự động tính giờ và chấm điểm chi tiết khi nộp bài.
        </p>
        <button class="btn-primary" id="btn-start-exam" style="padding: 12px 28px; font-size: 15px;">
          🚀 Bắt đầu làm bài ngay
        </button>
      </div>
    `;

    const startBtn = document.getElementById('btn-start-exam');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        showToast("Bắt đầu tính giờ thi! Chúc bạn làm bài đạt điểm cao 🍀");
        clearInterval(state.examTimerInterval);
        state.examTimeRemaining = 45 * 60;
        state.examTimerInterval = setInterval(() => {
          state.examTimeRemaining--;
          const mins = Math.floor(state.examTimeRemaining / 60);
          const secs = state.examTimeRemaining % 60;
          const timerEl = document.getElementById('exam-countdown');
          if (timerEl) {
            timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
          }
          if (state.examTimeRemaining <= 0) {
            clearInterval(state.examTimerInterval);
            showToast("Hết giờ làm bài!", "danger");
          }
        }, 1000);
      });
    }
  }

  // ==============================================================================
  // MIDTERM EXAMS RENDERING & 2025 MOET EXAM ENGINE
  // ==============================================================================
  function getCurrentExam() {
    const exams = MATH_DATABASE.midtermExams || [];
    return exams.find(e => e.id === state.currentExamId) || exams[0];
  }

  function renderCurrentExam() {
    const container = document.getElementById('exam-content-area') || document.getElementById('view-exams-wrapper');
    if (!container) return;

    const exam = getCurrentExam();
    if (!exam) return;

    const sec = exam.sections;
    const p1Count = sec.part1?.questions?.length || 0;
    const p2Count = sec.part2?.questions?.length || 0;
    const p3Count = sec.part3?.questions?.length || 0;
    const p4Count = sec.part4?.items?.length || 0;

    let html = `
      <!-- Hero Banner -->
      <div class="exam-hero-banner">
        <div>
          <div class="exam-hero-title">${exam.title}</div>
          <div class="exam-hero-subtitle">${exam.subtitle}</div>
          <div class="exam-meta-pills">
            <span class="exam-pill">⏱️ Thời gian: ${exam.timeMinutes} phút</span>
            <span class="exam-pill">📝 Thang điểm: 10.0</span>
            <span class="exam-pill">🔘 Phần I: ${p1Count} câu MCQ</span>
            <span class="exam-pill">⚖️ Phần II: ${p2Count} câu Đúng/Sai</span>
            <span class="exam-pill">✍️ Phần III: ${p3Count} câu Điền số</span>
            ${p4Count > 0 ? `<span class="exam-pill">📐 Phần IV: ${p4Count} bài Tự luận</span>` : ''}
          </div>
        </div>
        <div class="exam-actions-group">
          <button type="button" class="btn-start-mock" id="btn-mock-start">
            <span>⚡</span> Bắt đầu Thi thử 90 phút
          </button>
          <button type="button" class="btn-study-mode" id="btn-study-scroll">
            <span>📖</span> Chế độ Luyện đề & Xem giải
          </button>
        </div>
      </div>

      <!-- Floating Bar for Mock Exam (Hidden by default) -->
      <div class="exam-floating-status" id="exam-floating-bar" style="display: none;">
        <div class="exam-status-left">
          <div class="exam-timer-display">
            <span>⏳</span>
            <span id="exam-sticky-timer">90:00</span>
          </div>
          <div class="exam-progress-text">
            <span>Đang thi thử trực tuyến • Chuẩn ma trận Bộ GD&ĐT</span>
          </div>
        </div>
        <button type="button" class="btn-submit-exam" id="btn-submit-exam-now">
          <span>📤</span> Nộp bài & Chấm điểm
        </button>
      </div>

      <!-- Exam Questions List -->
      <div class="exam-questions-content" id="exam-questions-container">
    `;

    // 1. PHẦN I: TRẮC NGHIỆM 4 LỰA CHỌN
    if (sec.part1 && sec.part1.questions) {
      html += `
        <div class="exam-section-divider">
          <div class="exam-section-title">${sec.part1.name}</div>
          <span class="exam-section-badge">Mỗi câu 0.25 điểm • 3.0 điểm tối đa</span>
        </div>
      `;

      sec.part1.questions.forEach((q, idx) => {
        let optHtml = "";
        q.options.forEach((opt, oIdx) => {
          optHtml += `
            <div class="option-item exam-p1-opt" data-qid="${q.id}" data-opt="${oIdx}">
              <div class="opt-indicator">${String.fromCharCode(65 + oIdx)}</div>
              <div class="opt-text">${opt}</div>
            </div>
          `;
        });

        html += `
          <div class="question-card" id="card-${q.id}">
            <div class="q-header">
              <span class="q-tag">Phần I • Câu ${idx + 1}</span>
              <span class="q-level">0.25 điểm</span>
              ${state.currentUserRole === 'teacher' ? `
                <div class="teacher-card-actions">
                  <button type="button" class="btn-q-edit" data-qid="${q.id}" title="Sửa câu hỏi">✏️ Sửa</button>
                  <button type="button" class="btn-q-delete" data-qid="${q.id}" title="Xóa câu hỏi">🗑️ Xóa</button>
                </div>
              ` : ''}
            </div>
            <div class="q-title">${q.text.replace(/\n/g, '<br>')}</div>
            <div class="options-grid ${q.options.length <= 4 ? 'two-cols' : ''}">
              ${optHtml}
            </div>
            <div class="card-footer study-only-action">
              <button class="btn-check btn-check-exam-p1" data-qid="${q.id}">Kiểm tra đáp án</button>
              <button class="btn-toggle-explain" data-qid="${q.id}">
                <span>💡</span> Xem lời giải
              </button>
            </div>
            <div class="explain-box" id="explain-${q.id}">
              <div class="explain-title"><span>📘</span> Lời giải chi tiết:</div>
              <div>${q.explain}</div>
            </div>
          </div>
        `;
      });

      if (state.currentUserRole === 'teacher') {
        html += `
          <button type="button" class="teacher-add-banner-btn btn-add-exam-p1" data-examid="${exam.id}">
            <span>➕</span> Thêm câu hỏi Trắc nghiệm mới vào Phần I của đề này
          </button>
        `;
      }
    }

    // 2. PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI (16 Ý)
    if (sec.part2 && sec.part2.questions) {
      html += `
        <div class="exam-section-divider">
          <div class="exam-section-title">${sec.part2.name}</div>
          <span class="exam-section-badge">Đúng 1 ý: 0.1đ | 2 ý: 0.25đ | 3 ý: 0.5đ | 4 ý: 1.0đ • Tối đa 4.0 điểm</span>
        </div>
      `;

      sec.part2.questions.forEach((q, idx) => {
        let rowsHtml = "";
        q.items.forEach((item, itemIdx) => {
          rowsHtml += `
            <tr class="tf-row" data-idx="${itemIdx}">
              <td class="tf-cell-text">${item.text}</td>
              <td class="tf-cell-actions">
                <div class="tf-btn-group">
                  <button type="button" class="tf-choice-btn exam-tf-btn" data-val="true">Đúng</button>
                  <button type="button" class="tf-choice-btn exam-tf-btn" data-val="false">Sai</button>
                </div>
              </td>
            </tr>
          `;
        });

        html += `
          <div class="question-card" id="card-${q.id}">
            <div class="q-header">
              <span class="q-tag">Phần II • Câu ${idx + 1}</span>
              <span class="q-level">Tối đa 1.0 điểm</span>
              ${state.currentUserRole === 'teacher' ? `
                <div class="teacher-card-actions">
                  <button type="button" class="btn-q-edit" data-qid="${q.id}" title="Sửa câu hỏi">✏️ Sửa</button>
                  <button type="button" class="btn-q-delete" data-qid="${q.id}" title="Xóa câu hỏi">🗑️ Xóa</button>
                </div>
              ` : ''}
            </div>
            <div class="q-title">${q.context}</div>
            <table class="tf-table">
              <tbody>${rowsHtml}</tbody>
            </table>
            <div class="card-footer study-only-action">
              <button class="btn-check btn-check-exam-tf" data-qid="${q.id}">Kiểm tra câu này</button>
              <button class="btn-toggle-explain" data-qid="${q.id}">
                <span>💡</span> Xem phân tích 4 ý
              </button>
            </div>
            <div class="explain-box" id="explain-${q.id}">
              <div class="explain-title"><span>📘</span> Phân tích từng ý:</div>
              <ul style="padding-left: 20px;">
                ${q.items.map(it => `<li><strong>${it.text.slice(0, 3)}:</strong> [${it.answer ? 'ĐÚNG' : 'SAI'}] - ${it.explain}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;
      });

      if (state.currentUserRole === 'teacher') {
        html += `
          <button type="button" class="teacher-add-banner-btn btn-add-exam-p2" data-examid="${exam.id}">
            <span>➕</span> Thêm câu hỏi Đúng / Sai mới vào Phần II của đề này
          </button>
        `;
      }
    }

    // 3. PHẦN III: TRẢ LỜI NGẮN (ĐIỀN SỐ)
    if (sec.part3 && sec.part3.questions) {
      html += `
        <div class="exam-section-divider">
          <div class="exam-section-title">${sec.part3.name}</div>
          <span class="exam-section-badge">Mỗi câu đúng 0.5 điểm • Tối đa 3.0 điểm</span>
        </div>
      `;

      sec.part3.questions.forEach((q, idx) => {
        html += `
          <div class="question-card" id="card-${q.id}">
            <div class="q-header">
              <span class="q-tag">Phần III • Câu ${idx + 1}</span>
              <span class="q-level">0.5 điểm</span>
              ${state.currentUserRole === 'teacher' ? `
                <div class="teacher-card-actions">
                  <button type="button" class="btn-q-edit" data-qid="${q.id}" title="Sửa câu hỏi">✏️ Sửa</button>
                  <button type="button" class="btn-q-delete" data-qid="${q.id}" title="Xóa câu hỏi">🗑️ Xóa</button>
                </div>
              ` : ''}
            </div>
            <div class="q-title">${q.text.replace(/\n/g, '<br>')}</div>
            <div class="sa-input-wrap">
              <input type="text" class="sa-input exam-sa-input" placeholder="Điền kết quả số..." data-qid="${q.id}">
              <button class="btn-check btn-check-exam-sa study-only-action" data-qid="${q.id}">Kiểm tra</button>
            </div>
            <div class="card-footer study-only-action">
              <div></div>
              <button class="btn-toggle-explain" data-qid="${q.id}">
                <span>💡</span> Xem đáp án & Lời giải
              </button>
            </div>
            <div class="explain-box" id="explain-${q.id}">
              <div class="explain-title"><span>🎯</span> Đáp án: <strong style="color: var(--danger-color);">${q.answer}</strong></div>
              <div>${q.explain}</div>
            </div>
          </div>
        `;
      });

      if (state.currentUserRole === 'teacher') {
        html += `
          <button type="button" class="teacher-add-banner-btn btn-add-exam-p3" data-examid="${exam.id}">
            <span>➕</span> Thêm câu hỏi Trả lời ngắn mới vào Phần III của đề này
          </button>
        `;
      }
    }

    // 4. PHẦN IV: TỰ LUẬN & TOÁN THỰC TẾ (NẾU CÓ)
    if (sec.part4 && sec.part4.items) {
      html += `
        <div class="exam-section-divider">
          <div class="exam-section-title">${sec.part4.name}</div>
          <span class="exam-section-badge">Chuyên sâu Vận dụng & Vận dụng cao</span>
        </div>
      `;

      sec.part4.items.forEach((item, idx) => {
        let diagramHtml = "";
        if (item.diagram === "fig1_dths_phan_thuc_tcx.png") {
          diagramHtml = `<div class="diagram-container">${MathDiagrams.renderFractionGraph()}</div>`;
        } else if (item.diagram === "fig2_gap_hop_ton.png") {
          diagramHtml = `<div class="diagram-container">${MathDiagrams.renderFoldBox()}</div>`;
        } else if (item.diagram === "fig4_can_bang_luc_den_chum.png") {
          diagramHtml = `<div class="diagram-container">${MathDiagrams.renderCeilingLamp()}</div>`;
        }

        const qid = item.id || `exam-essay-${idx}`;

        html += `
          <div class="essay-card" style="margin-bottom: 20px;">
            <div class="q-header">
              <span class="q-tag">Tự luận • Bài ${idx + 1}</span>
              <span class="q-level">${item.title}</span>
              ${state.currentUserRole === 'teacher' ? `
                <div class="teacher-card-actions">
                  <button type="button" class="btn-q-edit" data-qid="${qid}" title="Sửa câu hỏi">✏️ Sửa</button>
                  <button type="button" class="btn-q-delete" data-qid="${qid}" title="Xóa câu hỏi">🗑️ Xóa</button>
                </div>
              ` : ''}
            </div>
            <div class="q-title" style="font-weight: 600;">${item.question.replace(/\n/g, '<br>')}</div>
            ${diagramHtml}
          </div>
        `;
      });

      if (state.currentUserRole === 'teacher') {
        html += `
          <button type="button" class="teacher-add-banner-btn btn-add-exam-p4" data-examid="${exam.id}">
            <span>➕</span> Thêm bài toán Tự luận mới vào Phần IV của đề này
          </button>
        `;
      }
    }

    // Kết thúc danh sách câu hỏi
    html += `
        <!-- Nút Nộp bài lớn ở cuối đề -->
        <div style="text-align: center; margin: 36px 0;">
          <button type="button" class="btn-submit-exam" id="btn-bottom-submit" style="padding: 14px 40px; font-size: 16px;">
            🏁 NỘP BÀI THI & XEM BẢNG ĐIỂM
          </button>
        </div>
      </div>
    `;

    container.innerHTML = html;
    renderMath(container);

    // Bind event handlers for this exam
    bindExamInteractions(exam);
  }

  // ==============================================================================
  // EXAM INTERACTIONS & AUTO SCORING ENGINE (THUẬT TOÁN CHẤM ĐIỂM BỘ GD&ĐT)
  // ==============================================================================
  function bindExamInteractions(exam) {
    const container = document.getElementById('exam-content-area') || document.getElementById('view-exams-wrapper');
    if (!container) return;

    // 1. Click option in Part 1
    container.querySelectorAll('.exam-p1-opt').forEach(optEl => {
      optEl.addEventListener('click', function() {
        const card = this.closest('.question-card');
        card.querySelectorAll('.exam-p1-opt').forEach(el => el.classList.remove('selected'));
        this.classList.add('selected');
      });
    });

    // 2. Click True / False buttons in Part 2
    container.querySelectorAll('.exam-tf-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const row = this.closest('.tf-row');
        row.querySelectorAll('.exam-tf-btn').forEach(b => {
          b.classList.remove('active-true', 'active-false');
        });
        if (this.dataset.val === "true") {
          this.classList.add('active-true');
        } else {
          this.classList.add('active-false');
        }
        row.dataset.userVal = this.dataset.val;
      });
    });

    // 3. Start 90-min Mock Exam Button
    const mockBtn = document.getElementById('btn-mock-start');
    if (mockBtn) {
      mockBtn.addEventListener('click', () => {
        state.examIsTimed = true;
        const floatingBar = document.getElementById('exam-floating-bar');
        if (floatingBar) floatingBar.style.display = "flex";

        showToast("Bắt đầu tính giờ thi thử 90 phút! Chúc bạn làm bài đạt điểm 10 🍀");

        // Start countdown
        clearInterval(state.examTimerInterval);
        state.examTimeRemaining = 90 * 60;
        state.examTimerInterval = setInterval(() => {
          state.examTimeRemaining--;
          const mins = Math.floor(state.examTimeRemaining / 60);
          const secs = state.examTimeRemaining % 60;
          const timerEl = document.getElementById('exam-sticky-timer');
          if (timerEl) {
            timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
          }
          if (state.examTimeRemaining <= 0) {
            clearInterval(state.examTimerInterval);
            showToast("Hết giờ làm bài! Đang tự động nộp bài...", "danger");
            gradeAndSubmitExam(exam);
          }
        }, 1000);

        // Scroll to questions
        document.getElementById('exam-questions-container').scrollIntoView({ behavior: 'smooth' });
      });
    }

    // 4. Scroll to questions in Study Mode
    const studyBtn = document.getElementById('btn-study-scroll');
    if (studyBtn) {
      studyBtn.addEventListener('click', () => {
        document.getElementById('exam-questions-container').scrollIntoView({ behavior: 'smooth' });
      });
    }

    // 5. Submit Exam Buttons (Sticky floating bar & bottom button)
    const submitBtn1 = document.getElementById('btn-submit-exam-now');
    const submitBtn2 = document.getElementById('btn-bottom-submit');
    if (submitBtn1) submitBtn1.addEventListener('click', () => gradeAndSubmitExam(exam));
    if (submitBtn2) submitBtn2.addEventListener('click', () => gradeAndSubmitExam(exam));

    // 6. Study-mode single check buttons (Part 1)
    container.querySelectorAll('.btn-check-exam-p1').forEach(btn => {
      btn.addEventListener('click', function() {
        const qid = this.dataset.qid;
        const card = document.getElementById(`card-${qid}`);
        const q = exam.sections.part1.questions.find(x => x.id === qid);
        if (!q) return;

        const selected = card.querySelector('.exam-p1-opt.selected');
        if (!selected) {
          showToast("Vui lòng chọn một đáp án trước!");
          return;
        }

        const userChoice = parseInt(selected.dataset.opt, 10);
        card.querySelectorAll('.exam-p1-opt').forEach((optEl, idx) => {
          if (idx === q.answer) optEl.classList.add('correct');
          else if (idx === userChoice && userChoice !== q.answer) optEl.classList.add('incorrect');
        });

        if (userChoice === q.answer) {
          soundEffects.playCorrect();
          showToast("Chính xác (+0.25 điểm) 🎉");
        } else {
          soundEffects.playIncorrect();
          showToast("Chưa đúng. Xem lời giải chi tiết bên dưới!", "danger");
        }

        const exp = card.querySelector('.explain-box');
        exp.classList.add('show');
        renderMath(exp);
      });
    });

    // 7. Study-mode single check buttons (Part 2 TF)
    container.querySelectorAll('.btn-check-exam-tf').forEach(btn => {
      btn.addEventListener('click', function() {
        const qid = this.dataset.qid;
        const card = document.getElementById(`card-${qid}`);
        const q = exam.sections.part2.questions.find(x => x.id === qid);
        if (!q) return;

        let correct = 0;
        let answeredAll = true;
        q.items.forEach((it, iIdx) => {
          const row = card.querySelector(`.tf-row[data-idx="${iIdx}"]`);
          if (row.dataset.userVal === undefined) answeredAll = false;
          else if (String(it.answer) === row.dataset.userVal) correct++;
        });

        if (!answeredAll) {
          showToast("Vui lòng trả lời đủ cả 4 ý a, b, c, d!");
          return;
        }

        const scoreTable = { 0: 0, 1: 0.1, 2: 0.25, 3: 0.5, 4: 1.0 };
        const score = scoreTable[correct];

        if (correct === 4) {
          soundEffects.playCorrect();
          showToast("Tuyệt vời! Đúng cả 4/4 ý (+1.0 điểm) 🎉");
        } else {
          soundEffects.playIncorrect();
          showToast(`Bạn đúng ${correct}/4 ý (+${score} điểm). Xem chi tiết bên dưới!`);
        }

        const exp = card.querySelector('.explain-box');
        exp.classList.add('show');
        renderMath(exp);
      });
    });

    // 8. Study-mode single check buttons (Part 3 SA)
    container.querySelectorAll('.btn-check-exam-sa').forEach(btn => {
      btn.addEventListener('click', function() {
        const qid = this.dataset.qid;
        const card = document.getElementById(`card-${qid}`);
        const q = exam.sections.part3.questions.find(x => x.id === qid);
        if (!q) return;

        const input = card.querySelector('.exam-sa-input');
        const val = input.value.trim().toLowerCase();
        if (!val) {
          showToast("Vui lòng điền kết quả!");
          return;
        }

        const validAnswers = (q.acceptAnswers || [q.answer]).map(a => a.toLowerCase().trim());
        const isCorrect = validAnswers.includes(val);

        if (isCorrect) {
          soundEffects.playCorrect();
          input.style.borderColor = "var(--success-color)";
          input.style.backgroundColor = "var(--success-light)";
          showToast("Chính xác (+0.5 điểm) 🎉");
        } else {
          soundEffects.playIncorrect();
          input.style.borderColor = "var(--danger-color)";
          input.style.backgroundColor = "var(--danger-light)";
          showToast(`Chưa đúng! Đáp án đúng: ${q.answer}`);
        }

        const exp = card.querySelector('.explain-box');
        exp.classList.add('show');
        renderMath(exp);
      });
    });

    // 9. Toggle explanations
    container.querySelectorAll('.btn-toggle-explain').forEach(btn => {
      btn.addEventListener('click', function() {
        const qid = this.dataset.qid;
        const exp = document.getElementById(`explain-${qid}`);
        if (exp) {
          exp.classList.toggle('show');
          renderMath(exp);
        }
      });
    });

    // 10. Teacher Actions in Exam Cards
    if (state.currentUserRole === 'teacher') {
      container.querySelectorAll('.btn-q-edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          handleTeacherEditQuestion(this.dataset.qid);
        });
      });

      container.querySelectorAll('.btn-q-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          handleTeacherDeleteQuestion(this.dataset.qid);
        });
      });

      // Nút thêm câu hỏi vào các phần của đề
      container.querySelector('.btn-add-exam-p1')?.addEventListener('click', () => {
        openTeacherModal({
          mode: 'add',
          type: 'mcq',
          lockType: true,
          title: `Thêm Câu Hỏi Trắc Nghiệm • ${exam.title.split(':')[0]}`,
          targetInfo: { scope: 'exam', examId: exam.id, part: 'part1', qtype: 'mcq' }
        });
      });

      container.querySelector('.btn-add-exam-p2')?.addEventListener('click', () => {
        openTeacherModal({
          mode: 'add',
          type: 'tf',
          lockType: true,
          title: `Thêm Câu Hỏi Đúng/Sai • ${exam.title.split(':')[0]}`,
          targetInfo: { scope: 'exam', examId: exam.id, part: 'part2', qtype: 'tf' }
        });
      });

      container.querySelector('.btn-add-exam-p3')?.addEventListener('click', () => {
        openTeacherModal({
          mode: 'add',
          type: 'sa',
          lockType: true,
          title: `Thêm Câu Trả Lời Ngắn • ${exam.title.split(':')[0]}`,
          targetInfo: { scope: 'exam', examId: exam.id, part: 'part3', qtype: 'sa' }
        });
      });

      container.querySelector('.btn-add-exam-p4')?.addEventListener('click', () => {
        openTeacherModal({
          mode: 'add',
          type: 'essay',
          lockType: true,
          title: `Thêm Bài Tự Luận • ${exam.title.split(':')[0]}`,
          targetInfo: { scope: 'exam', examId: exam.id, part: 'part4', qtype: 'essay' }
        });
      });
    }
  }

  // ==============================================================================
  // CHẤM ĐIỂM TỔNG HỢP THEO MA TRẬN CHUẨN BỘ GIÁO DỤC & ĐÀO TẠO 2025
  // ==============================================================================
  function gradeAndSubmitExam(exam) {
    clearInterval(state.examTimerInterval);

    let scorePart1 = 0;
    let scorePart2 = 0;
    let scorePart3 = 0;

    const sec = exam.sections;

    // 1. Chấm Phần I (Trắc nghiệm 4 lựa chọn - 0.25đ / câu)
    if (sec.part1 && sec.part1.questions) {
      sec.part1.questions.forEach(q => {
        const card = document.getElementById(`card-${q.id}`);
        if (card) {
          const selected = card.querySelector('.exam-p1-opt.selected');
          const userChoice = selected ? parseInt(selected.dataset.opt, 10) : -1;

          card.querySelectorAll('.exam-p1-opt').forEach((optEl, oIdx) => {
            if (oIdx === q.answer) optEl.classList.add('correct');
            else if (oIdx === userChoice && userChoice !== q.answer) optEl.classList.add('incorrect');
          });

          if (userChoice === q.answer) {
            scorePart1 += 0.25;
          }

          const exp = card.querySelector('.explain-box');
          if (exp) exp.classList.add('show');
        }
      });
    }

    // 2. Chấm Phần II (Trắc nghiệm Đúng / Sai - 1 ý = 0.1đ, 2 ý = 0.25đ, 3 ý = 0.5đ, 4 ý = 1.0đ)
    if (sec.part2 && sec.part2.questions) {
      const scoreTable = { 0: 0, 1: 0.1, 2: 0.25, 3: 0.5, 4: 1.0 };
      sec.part2.questions.forEach(q => {
        const card = document.getElementById(`card-${q.id}`);
        if (card) {
          let correctItems = 0;
          q.items.forEach((item, idx) => {
            const row = card.querySelector(`.tf-row[data-idx="${idx}"]`);
            if (row && row.dataset.userVal !== undefined) {
              if (String(item.answer) === row.dataset.userVal) {
                correctItems++;
              }
            }
          });

          scorePart2 += scoreTable[correctItems] || 0;

          const exp = card.querySelector('.explain-box');
          if (exp) exp.classList.add('show');
        }
      });
    }

    // 3. Chấm Phần III (Trả lời ngắn điền số - 0.5đ / câu)
    if (sec.part3 && sec.part3.questions) {
      sec.part3.questions.forEach(q => {
        const card = document.getElementById(`card-${q.id}`);
        if (card) {
          const input = card.querySelector('.exam-sa-input');
          const val = input ? input.value.trim().toLowerCase() : "";
          const validAnswers = (q.acceptAnswers || [q.answer]).map(a => a.toLowerCase().trim());
          const isCorrect = validAnswers.includes(val);

          if (isCorrect) {
            scorePart3 += 0.5;
            input.style.borderColor = "var(--success-color)";
            input.style.backgroundColor = "var(--success-light)";
          } else {
            input.style.borderColor = "var(--danger-color)";
            input.style.backgroundColor = "var(--danger-light)";
          }

          const exp = card.querySelector('.explain-box');
          if (exp) exp.classList.add('show');
        }
      });
    }

    // Render Math trên tất cả lời giải vừa mở
    renderMath();

    const totalScore = parseFloat((scorePart1 + scorePart2 + scorePart3).toFixed(2));

    // Cập nhật thống kê học tập
    state.userStats.totalAttempted += 22;
    state.userStats.totalCorrect += Math.round((totalScore / 10.0) * 22);
    saveStats();

    // Hiệu ứng âm thanh chúc mừng
    if (totalScore >= 8.0) {
      soundEffects.playFanfare();
    } else if (totalScore >= 5.0) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playIncorrect();
    }

    // Hiển thị Modal bảng điểm
    showScoreModal(totalScore, scorePart1, scorePart2, scorePart3);
  }

  function showScoreModal(total, p1, p2, p3) {
    const overlay = document.getElementById('exam-result-overlay');
    if (!overlay) return;

    document.getElementById('modal-score-num').textContent = total.toFixed(2);
    document.getElementById('modal-part1-score').textContent = `${p1.toFixed(2)} / 3.0`;
    document.getElementById('modal-part2-score').textContent = `${p2.toFixed(2)} / 4.0`;
    document.getElementById('modal-part3-score').textContent = `${p3.toFixed(2)} / 3.0`;

    const titleEl = document.getElementById('modal-score-title');
    const msgEl = document.getElementById('modal-score-msg');

    if (total >= 9.0) {
      titleEl.textContent = "🏆 Xuất Sắc - Thủ Khoa!";
      msgEl.textContent = "Bạn nắm rất vững toàn bộ cấu trúc và ma trận kiến thức Toán 12 của Bộ GD&ĐT!";
    } else if (total >= 8.0) {
      titleEl.textContent = "🌟 Giỏi - Phong Độ Tuyệt Vời!";
      msgEl.textContent = "Kết quả rất tốt! Hãy tiếp tục rèn luyện thêm các câu hỏi vận dụng cao.";
    } else if (total >= 6.5) {
      titleEl.textContent = "👍 Khá - Tiến Bộ Rõ Rệt!";
      msgEl.textContent = "Bạn đã đạt mức điểm khá. Hãy xem kỹ lại các câu sai để bứt phá lên 8+.";
    } else {
      titleEl.textContent = "💪 Cố Lên - Cần Ôn Lại Kiến Thức!";
      msgEl.textContent = "Đừng nản lòng, hãy xem lại lời giải chi tiết và làm lại lần nữa nhé!";
    }

    overlay.classList.add('active');

    const closeBtn = document.getElementById('btn-close-modal');
    if (closeBtn) {
      closeBtn.onclick = function() {
        overlay.classList.remove('active');
        // Scroll to top of questions to review
        document.getElementById('exam-questions-container').scrollIntoView({ behavior: 'smooth' });
      };
    }
  }

  // Switch Tab in Topic View
  function switchTab(tabId, updateUrl = true) {
    state.currentTab = tabId;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    document.querySelectorAll('.section-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const activePanel = document.getElementById(`tab-content-${tabId}`);
    if (activePanel) {
      activePanel.classList.add('active');
      renderMath(activePanel);
    }

    if (updateUrl && state.currentMode === 'topics') {
      const slug = AppRouter.getTopicSlug(state.currentTopicId);
      const query = tabId !== 'theory' ? `?tab=${tabId}` : '';
      AppRouter.push(`/lop-${state.currentGrade}/chuyen-de/${slug}${query}`);
    }
  }

  // Bind Global Events
  function initEvents() {
    // 0. AUTHENTICATION & LOGIN SCREEN EVENTS
    const btnBackFromLogin = document.getElementById('btn-back-from-login');
    if (btnBackFromLogin) {
      btnBackFromLogin.addEventListener('click', () => AppRouter.push('/'));
    }

    // Nút mở trang đăng nhập trên Header 3 màn hình
    ['btn-login-open-landing', 'btn-login-open-mode', 'btn-login-open-workspace'].forEach(id => {
      document.getElementById(id)?.addEventListener('click', () => {
        AppRouter.push('/login');
      });
    });

    // Chuyển tab Đăng nhập / Đăng ký
    const tabSignIn = document.getElementById('tab-auth-login') || document.getElementById('auth-tab-signin');
    const tabSignUp = document.getElementById('tab-auth-register') || document.getElementById('auth-tab-signup');
    const formSignIn = document.getElementById('form-login') || document.getElementById('form-signin');
    const formSignUp = document.getElementById('form-register') || document.getElementById('form-signup');

    if (tabSignIn && tabSignUp) {
      tabSignIn.addEventListener('click', () => {
        tabSignIn.classList.add('active');
        tabSignUp.classList.remove('active');
        if (formSignIn) formSignIn.style.display = 'flex';
        if (formSignUp) formSignUp.style.display = 'none';
      });

      tabSignUp.addEventListener('click', () => {
        tabSignUp.classList.add('active');
        tabSignIn.classList.remove('active');
        if (formSignIn) formSignIn.style.display = 'none';
        if (formSignUp) formSignUp.style.display = 'flex';
      });
    }

    // 1-Click Demo Accounts
    document.getElementById('btn-quick-login-student')?.addEventListener('click', () => {
      const ok = authManager.login('hocsinh@toan.edu.vn', '123456');
      if (ok) {
        AppRouter.push('/lop-12');
      }
    });

    document.getElementById('btn-quick-login-teacher')?.addEventListener('click', () => {
      const ok = authManager.login('giaovien@toan.edu.vn', '123456');
      if (ok) {
        AppRouter.push('/lop-12');
      }
    });

    // Form Submit: Đăng nhập
    if (formSignIn) {
      formSignIn.addEventListener('submit', function(e) {
        e.preventDefault();
        const userInput = document.getElementById('input-login-user') || document.getElementById('signin-email');
        const passInput = document.getElementById('input-login-pass') || document.getElementById('signin-password');
        const roleInput = document.querySelector('input[name="login-role"]:checked');
        const email = userInput ? userInput.value.trim() : '';
        const password = passInput ? passInput.value : '';
        const role = roleInput ? roleInput.value : 'student';

        const ok = authManager.login(email, password, role);
        if (ok) {
          AppRouter.push('/lop-12');
        }
      });
    }

    // Form Submit: Đăng ký
    if (formSignUp) {
      formSignUp.addEventListener('submit', function(e) {
        e.preventDefault();
        const nameInput = document.getElementById('input-reg-name') || document.getElementById('signup-name');
        const userInput = document.getElementById('input-reg-user') || document.getElementById('signup-email');
        const passInput = document.getElementById('input-reg-pass') || document.getElementById('signup-password');
        const roleInput = document.querySelector('input[name="reg-role"]:checked') || document.querySelector('input[name="signup-role"]:checked');

        const name = nameInput ? nameInput.value.trim() : '';
        const username = userInput ? userInput.value.trim() : '';
        const password = passInput ? passInput.value : '';
        const role = roleInput ? roleInput.value : 'student';

        const ok = authManager.register(name, username, password, role);
        if (ok) {
          AppRouter.push('/lop-12');
        }
      });
    }

    // Sự kiện Đăng xuất (Event delegation trên document cho các nút logout)
    document.addEventListener('click', function(e) {
      const logoutBtn = e.target.closest('.btn-user-logout');
      if (logoutBtn) {
        e.preventDefault();
        if (confirm("Bạn có muốn đăng xuất khỏi tài khoản hiện tại?")) {
          authManager.logout();
          showToast("Đã đăng xuất thành công");
          AppRouter.push('/login');
        }
      }
    });

    // 1. Màn hình 1 (Chọn khối lớp): Click vào thẻ khối lớp -> Chuyển sang Màn hình 2 (Chọn hình thức)
    document.querySelectorAll('.grade-card').forEach(card => {
      card.addEventListener('click', function() {
        const gradeId = this.dataset.grade;
        AppRouter.push(`/lop-${gradeId}`);
      });
    });

    // 2. Màn hình 2 (Chọn hình thức): Click vào Ôn theo chuyên đề hoặc Luyện thi
    const cardTopics = document.getElementById('card-action-topics');
    const cardExams = document.getElementById('card-action-exams');
    if (cardTopics) {
      cardTopics.addEventListener('click', () => {
        AppRouter.push(`/lop-${state.currentGrade}/chuyen-de`);
      });
    }
    if (cardExams) {
      cardExams.addEventListener('click', () => {
        AppRouter.push(`/lop-${state.currentGrade}/luyen-thi/gk1`);
      });
    }

    // 3. Các nút quay lại Màn hình 1 (Chọn khối lớp)
    const btnBackFromMode = document.getElementById('btn-back-from-mode');
    const crumbToGradeSelect = document.getElementById('crumb-to-grade-select');
    const btnBrandModeHub = document.getElementById('btn-brand-mode-hub');
    const btnReturnGrade = document.getElementById('btn-return-grade-select');
    const btnBrandHome = document.getElementById('btn-brand-home');
    const crumbHome = document.getElementById('crumb-home');

    if (btnBackFromMode) btnBackFromMode.addEventListener('click', () => AppRouter.push('/'));
    if (crumbToGradeSelect) crumbToGradeSelect.addEventListener('click', () => AppRouter.push('/'));
    if (btnBrandModeHub) btnBrandModeHub.addEventListener('click', () => AppRouter.push('/'));
    if (btnReturnGrade) btnReturnGrade.addEventListener('click', () => AppRouter.push('/'));
    if (btnBrandHome) btnBrandHome.addEventListener('click', () => AppRouter.push('/'));
    if (crumbHome) crumbHome.addEventListener('click', () => AppRouter.push('/'));

    // 4. Các nút quay lại Màn hình 2 (Chọn hình thức Chuyên đề / Luyện thi)
    const btnReturnMode = document.getElementById('btn-return-mode-select');
    const crumbGrade = document.getElementById('crumb-grade');
    if (btnReturnMode) btnReturnMode.addEventListener('click', () => AppRouter.push(`/lop-${state.currentGrade}`));
    if (crumbGrade) crumbGrade.addEventListener('click', () => AppRouter.push(`/lop-${state.currentGrade}`));

    // 5. Chuyển chế độ nhanh trên Header Workspace (Chuyên đề vs Luyện thi)
    const btnTopics = document.getElementById('btn-mode-topics');
    const btnExams = document.getElementById('btn-mode-exams');

    if (btnTopics) {
      btnTopics.addEventListener('click', () => switchMode('topics', true));
    }
    if (btnExams) {
      btnExams.addEventListener('click', () => switchMode('exams', true));
    }

    // 6. Chuyển khối lớp nhanh trên Header
    document.querySelectorAll('.grade-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        switchGrade(this.dataset.grade, true);
      });
    });

    // 7. Tab buttons trong giao diện Chuyên đề
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        switchTab(this.dataset.tab, true);
      });
    });

    // 8. Đặt lại tiến độ làm bài
    const resetBtn = document.getElementById('btn-reset-stats');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm("Bạn có chắc chắn muốn đặt lại toàn bộ kết quả luyện tập?")) {
          state.userStats = { totalAttempted: 0, totalCorrect: 0, topicProgress: {} };
          saveStats();
          showToast("Đã đặt lại tiến độ!");
        }
      });
    }

    // 9. Chuyển đổi vai trò người dùng (Học sinh / Giáo viên) trên cả 3 màn hình
    document.querySelectorAll('.role-pill-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const role = this.dataset.role;
        if (role) {
          setUserRole(role);
        }
      });
    });

    // 10. Thanh công cụ quản trị dành cho Giáo viên (Teacher Control Toolbar)
    const btnAddQ = document.getElementById('btn-teacher-add-q');
    if (btnAddQ) {
      btnAddQ.addEventListener('click', () => {
        if (state.currentMode === 'topics') {
          const topic = getCurrentTopic();
          let defaultType = 'mcq';
          if (state.currentTab === 'tf') defaultType = 'tf';
          else if (state.currentTab === 'short') defaultType = 'sa';
          else if (state.currentTab === 'essay') defaultType = 'essay';

          openTeacherModal({
            mode: 'add',
            type: defaultType,
            title: `Thêm Câu Hỏi Mới • ${topic ? topic.title : 'Chuyên đề'}`,
            targetInfo: { scope: 'topic', topicId: state.currentTopicId, qtype: defaultType }
          });
        } else {
          const exam = getCurrentExam();
          openTeacherModal({
            mode: 'add',
            type: 'mcq',
            title: `Thêm Câu Hỏi Vào Đề • ${exam ? exam.title.split(':')[0] : 'Đề thi'}`,
            targetInfo: { scope: 'exam', examId: state.currentExamId, part: 'part1', qtype: 'mcq' }
          });
        }
      });
    }

    const btnEditTheory = document.getElementById('btn-teacher-edit-theory');
    if (btnEditTheory) {
      btnEditTheory.addEventListener('click', () => {
        const topic = getCurrentTopic();
        if (!topic) return;
        openTeacherModal({
          mode: 'edit',
          type: 'theory',
          lockType: true,
          title: `Chỉnh Sửa Lý Thuyết Trọng Tâm • ${topic.title}`,
          data: topic.theory,
          targetInfo: { scope: 'theory', topicId: topic.id }
        });
      });
    }

    const btnAddExam = document.getElementById('btn-teacher-add-exam');
    if (btnAddExam) {
      btnAddExam.addEventListener('click', () => {
        openTeacherModal({
          mode: 'add',
          type: 'new_exam',
          lockType: true,
          title: "Tạo Đề Thi Mới Cho Hệ Thống",
          targetInfo: { scope: 'new_exam' }
        });
      });
    }

    const btnEditExamInfo = document.getElementById('btn-teacher-edit-exam-info');
    if (btnEditExamInfo) {
      btnEditExamInfo.addEventListener('click', () => {
        const exam = getCurrentExam();
        if (!exam) return;
        openTeacherModal({
          mode: 'edit',
          type: 'exam_info',
          lockType: true,
          title: `Sửa Thông Tin Đề • ${exam.title.split(':')[0]}`,
          data: {
            title: exam.title,
            subtitle: exam.subtitle,
            timeMinutes: exam.timeMinutes,
            badge: exam.badge
          },
          targetInfo: { scope: 'exam_info', examId: exam.id }
        });
      });
    }

    const btnExportJSON = document.getElementById('btn-teacher-export-json');
    if (btnExportJSON) {
      btnExportJSON.addEventListener('click', exportMaterialsJSON);
    }

    const btnImportJSON = document.getElementById('btn-teacher-import-json');
    const fileImportInput = document.getElementById('teacher-file-import');
    if (btnImportJSON && fileImportInput) {
      btnImportJSON.addEventListener('click', () => fileImportInput.click());
      fileImportInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          importMaterialsJSON(e.target.files[0]);
          e.target.value = '';
        }
      });
    }

    const btnResetDefaults = document.getElementById('btn-teacher-reset-defaults');
    if (btnResetDefaults) {
      btnResetDefaults.addEventListener('click', resetDefaultMaterials);
    }

    // 11. Modal Soạn Thảo & Chỉnh Sửa Học Liệu Dành Cho Giáo Viên
    const btnCloseModal = document.getElementById('btn-close-teacher-modal');
    const btnCancelModal = document.getElementById('btn-cancel-teacher-modal');
    const btnSaveModal = document.getElementById('btn-save-teacher-modal');

    if (btnCloseModal) btnCloseModal.addEventListener('click', closeTeacherModal);
    if (btnCancelModal) btnCancelModal.addEventListener('click', closeTeacherModal);
    if (btnSaveModal) btnSaveModal.addEventListener('click', saveTeacherModal);

    // Ký hiệu toán học nhanh trong Modal
    document.querySelectorAll('.math-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const formula = this.dataset.formula;
        if (formula) insertMathAtCursor(formula);
      });
    });

    // Đóng Modal khi nhấp ra vùng nền đen bên ngoài
    const modalOverlay = document.getElementById('teacher-modal-overlay');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function(e) {
        if (e.target === this) closeTeacherModal();
      });
    }
  }

  // Initialize App
  function init() {
    initTheme();
    loadStats();
    loadCustomMaterials();
    authManager.getCurrentUser();
    authManager.updateWidgets();
    initEvents();

    // Khởi tạo router điều hướng URL
    AppRouter.init();
  }

  // Launch on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
