/* main.js — single script for Edu Connect pages
  Usage: Add data-page attribute on <body>, e.g. <body data-page="home">
  Pages supported: home, courses, register, login, contact
*/

(async function () {
  // ---------- Helpers ----------
  const el = sel => document.querySelector(sel);
  const els = sel => Array.from(document.querySelectorAll(sel));

  function showToast(msg, type = 'info', timeout = 3000) {
    // simple toast/alert
    let t = document.createElement('div');
    t.textContent = msg;
    t.style = `
      position:fixed; right:20px; bottom:20px; background:#222; color:#fff;
      padding:10px 14px; border-radius:8px; z-index:9999; opacity:0.95;`;
    if (type === 'error') t.style.background = '#b00020';
    if (type === 'success') t.style.background = '#117a37';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), timeout);
  }

  // Web Crypto SHA-256 (returns hex)
  async function sha256Hex(message) {
    const enc = new TextEncoder();
    const msgUint8 = enc.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function saveUsersToStorage(users) {
    localStorage.setItem('edu_users', JSON.stringify(users));
  }
  function loadUsersFromStorage() {
    const raw = localStorage.getItem('edu_users');
    return raw ? JSON.parse(raw) : [];
  }

  function setSession(user) {
    localStorage.setItem('edu_session', JSON.stringify({email: user.email, name: user.name, time: Date.now()}));
  }
  function clearSession() {
    localStorage.removeItem('edu_session');
  }
  function getSession() {
    const s = localStorage.getItem('edu_session');
    return s ? JSON.parse(s) : null;
  }

  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ---------- Generic UI: active nav link ----------
  function setActiveNav() {
    const aEls = els('nav a');
    aEls.forEach(a => {
      try {
        // match by pathname or href presence
        if (location.pathname.endsWith(a.getAttribute('href'))) a.classList.add('active');
      } catch {}
    });
  }

  // ---------- Detect page ----------
  const page = document.body.dataset.page || 'home';

  // ---------- Home page ----------
  function initHome() {
    // hero button
    const heroBtn = el('.hero .btn');
    if (heroBtn) heroBtn.addEventListener('click', () => {
      // scroll to features if present
      const features = el('.features') || el('#course-list');
      if (features) features.scrollIntoView({behavior: 'smooth'});
      else showToast('Explore the site using the navigation', 'info');
    });

    // theme toggle
    const themeToggle = el('#theme-toggle');
    if (themeToggle) {
      const stored = localStorage.getItem('edu_theme') || 'light';
      document.documentElement.dataset.theme = stored;
      themeToggle.textContent = stored === 'dark' ? '☀️' : '🌙';
      themeToggle.addEventListener('click', () => {
        const cur = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = cur;
        localStorage.setItem('edu_theme', cur);
        themeToggle.textContent = cur === 'dark' ? '☀️' : '🌙';
        showToast(`Switched to ${cur} mode`, 'success', 1500);
      });
    }
  }

  // ---------- Courses page ----------
  function initCourses() {
    // example course data (you can later fetch from backend)
    const courses = [
      {id: 'c1', title: 'Web Development', desc: 'HTML, CSS, JS — Build websites', duration: '3 Months', level: 'Beginner'},
      {id: 'c2', title: 'Data Structures & Algorithms', desc: 'Core DSA for interviews', duration: '4 Months', level: 'Intermediate'},
      {id: 'c3', title: 'Cybersecurity Basics', desc: 'Intro to security and networking', duration: '2 Months', level: 'Beginner'},
      {id: 'c4', title: 'Data Science with Python', desc: 'Pandas, NumPy, ML intro', duration: '5 Months', level: 'Intermediate'}
    ];

    const container = el('#course-list');
    if (!container) return;

    function render(list) {
      container.innerHTML = '';
      list.forEach(c => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <i class="fa-solid fa-book"></i>
          <h3>${c.title}</h3>
          <p>${c.desc}</p>
          <small>${c.duration} • ${c.level}</small>
          <br/><br/>
          <button class="enroll-btn" data-id="${c.id}">Enroll</button>
        `;
        container.appendChild(card);
      });
      // attach enroll listeners
      els('.enroll-btn').forEach(b => b.addEventListener('click', (ev) => {
        const id = ev.currentTarget.dataset.id;
        const course = courses.find(x => x.id === id);
        const session = getSession();
        if (!session) {
          showToast('Please login to enroll.', 'error');
          return;
        }
        // store enrolled courses in localStorage per user
        const key = `enrolled_${session.email}`;
        const prev = JSON.parse(localStorage.getItem(key) || '[]');
        if (!prev.includes(id)) {
          prev.push(id);
          localStorage.setItem(key, JSON.stringify(prev));
          showToast(`Enrolled in ${course.title}`, 'success');
        } else showToast('Already enrolled', 'info');
      }));
    }

    // initial render
    render(courses);

    // search input (optional)
    const searchInput = document.createElement('input');
    searchInput.placeholder = 'Search courses...';
    searchInput.style = 'display:block; width:100%; padding:10px; margin:0 0 16px 0; border-radius:8px;';
    container.parentElement.insertBefore(searchInput, container);

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      render(courses.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)));
    });
  }

  // ---------- Register page ----------
  function initRegister() {
    const form = el('#register-form');
    if (!form) return;

    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const name = (el('#name')?.value || '').trim();
      const email = (el('#email')?.value || '').trim().toLowerCase();
      const password = el('#password')?.value || '';

      if (!name || !email || !password) {
        showToast('All fields are required', 'error'); return;
      }
      if (!isEmailValid(email)) { showToast('Invalid email', 'error'); return; }
      if (password.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }

      const users = loadUsersFromStorage();
      if (users.find(u => u.email === email)) {
        showToast('Email already registered', 'error'); return;
      }

      // hash password with salt (simple random salt)
      const salt = crypto.getRandomValues(new Uint8Array(8)).reduce((s,n)=>s+n.toString(16),'');
      const hash = await sha256Hex(salt + password);
      const newUser = { name, email, passHash: hash, salt, created: Date.now() };
      users.push(newUser);
      saveUsersToStorage(users);
      setSession({email, name});
      showToast('Registered & logged in', 'success');
      // redirect to homepage or courses
      setTimeout(()=> location.href = 'homepage.html', 700);
    });
  }

  // ---------- Login page ----------
  function initLogin() {
    const form = el('#login-form');
    if (!form) return;

    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const email = (el('#login-email')?.value || '').trim().toLowerCase();
      const password = el('#login-password')?.value || '';
      if (!email || !password) { showToast('Enter email & password', 'error'); return; }

      const users = loadUsersFromStorage();
      const user = users.find(u => u.email === email);
      if (!user) { showToast('No account with this email', 'error'); return; }

      const hash = await sha256Hex(user.salt + password);
      if (hash === user.passHash) {
        setSession({email: user.email, name: user.name});
        showToast('Login successful', 'success');
        setTimeout(() => location.href = 'homepage.html', 600);
      } else showToast('Wrong password', 'error');
    });

    // quick demo: logout if clicked logout link
    const logoutBtn = el('#logout');
    if (logoutBtn) logoutBtn.addEventListener('click', (e) => { e.preventDefault(); clearSession(); showToast('Logged out', 'info'); });
  }

  // ---------- Contact page ----------
  function initContact() {
    const form = el('#contact-form');
    if (!form) return;
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const name = (el('#contact-name')?.value || '').trim();
      const email = (el('#contact-email')?.value || '').trim();
      const msg = (el('#contact-msg')?.value || '').trim();
      if (!name || !email || !msg) { showToast('Please fill all fields', 'error'); return; }
      if (!isEmailValid(email)) { showToast('Invalid email', 'error'); return; }

      // save contact messages locally (for demo)
      const msgs = JSON.parse(localStorage.getItem('edu_contacts') || '[]');
      msgs.push({name, email, msg, time: Date.now()});
      localStorage.setItem('edu_contacts', JSON.stringify(msgs));
      showToast('Message sent. We will contact you soon.', 'success');
      form.reset();
    });
  }

  // ---------- Run per page ----------
  try {
    setActiveNav();
    // small mobile nav toggle if you have .mobile-toggle and nav ul
    const mobileToggle = el('.mobile-toggle');
    if (mobileToggle) mobileToggle.addEventListener('click', () => {
      const nav = el('nav ul'); if (nav) nav.classList.toggle('open');
    });

    if (page === 'home') initHome();
    if (page === 'courses') initCourses();
    if (page === 'register') initRegister();
    if (page === 'login') initLogin();
    if (page === 'contact') initContact();

    // session welcome badge optionally
    const session = getSession();
    if (session) {
      const userBadge = document.createElement('div');
      userBadge.textContent = `Hi, ${session.name}`;
      userBadge.style = 'position:fixed; left:20px; bottom:20px; background:#fff; padding:8px 10px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);';
      document.body.appendChild(userBadge);
      // remove after 4s
      setTimeout(()=>userBadge.remove(), 4000);
    }

  } catch (err) {
    console.error('main.js error', err);
  }
})();
