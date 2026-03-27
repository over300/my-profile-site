// ===== 1. Theme Manager (다크모드 관리) =====
const ThemeManager = {
  init() {
    const htmlEl = document.documentElement;
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // 초기 테마 설정
    if (storedTheme === 'dark' || (!storedTheme && prefersDark.matches)) {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }

    // 토글 버튼 이벤트
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => this.toggle());

    // 시스템 설정 변경 감지
    prefersDark.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          htmlEl.classList.add('dark');
        } else {
          htmlEl.classList.remove('dark');
        }
      }
    });
  },

  toggle() {
    const htmlEl = document.documentElement;
    if (htmlEl.classList.contains('dark')) {
      htmlEl.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      htmlEl.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }
};

// ===== 2. Mobile Menu =====
const MobileMenu = {
  init() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('icon-menu');
    const closeIcon = document.getElementById('icon-close');
    const navLinks = mobileMenu.querySelectorAll('a');

    menuToggle.addEventListener('click', () => this.toggleMenu());
    navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  },

  toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('icon-menu');
    const closeIcon = document.getElementById('icon-close');

    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    } else {
      this.closeMenu();
    }
  },

  closeMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('icon-menu');
    const closeIcon = document.getElementById('icon-close');

    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
};

// ===== 3. Scroll Effects (스크롤 효과) =====
const ScrollEffects = {
  init() {
    this.initNavbar();
    this.initActiveLink();
    this.initSmoothScroll();
  },

  initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScrollY = window.scrollY;
    }, { passive: true });
  },

  initActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    const updateActiveLink = () => {
      let currentSection = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', this.throttle(updateActiveLink, 100), { passive: true });
  },

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  },

  throttle(fn, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), wait);
    };
  }
};

// ===== 4. Animation Observer (스크롤 진입 애니메이션) =====
const AnimationObserver = {
  init() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // 프로그레스바 애니메이션 트리거
          if (entry.target.classList.contains('progress-fill')) {
            const width = entry.target.getAttribute('data-width');
            if (width) {
              entry.target.style.width = width + '%';
            }
          }
        }
      });
    }, observerOptions);

    // 애니메이션 대상 요소들
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    // 프로그레스바
    document.querySelectorAll('.progress-fill').forEach(el => {
      observer.observe(el);
    });
  }
};

// ===== 5. Typing Effect (타이핑 애니메이션) =====
const TypingEffect = {
  roles: [
    'Frontend Developer',
    'UI/UX Designer',
    'Problem Solver',
    'Full Stack Developer'
  ],
  currentIndex: 0,
  currentText: '',
  isDeleting: false,
  speed: 100,
  deleteSpeed: 50,
  pauseTime: 2000,

  init() {
    this.type();
  },

  type() {
    const textEl = document.getElementById('typing-text');
    const currentRole = this.roles[this.currentIndex];

    if (!this.isDeleting && this.currentText.length < currentRole.length) {
      // 타이핑
      this.currentText += currentRole.charAt(this.currentText.length);
      textEl.textContent = this.currentText;
      setTimeout(() => this.type(), this.speed);
    } else if (this.isDeleting && this.currentText.length > 0) {
      // 삭제
      this.currentText = this.currentText.slice(0, -1);
      textEl.textContent = this.currentText;
      setTimeout(() => this.type(), this.deleteSpeed);
    } else if (!this.isDeleting && this.currentText.length === currentRole.length) {
      // 타이핑 완료, 잠시 멈춤
      this.isDeleting = true;
      setTimeout(() => this.type(), this.pauseTime);
    } else if (this.isDeleting && this.currentText.length === 0) {
      // 삭제 완료, 다음 역할로
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % this.roles.length;
      setTimeout(() => this.type(), 300);
    }
  }
};

// ===== 6. Contact Form (연락처 폼) =====
const ContactForm = {
  init() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => this.handleSubmit(e));

    // 포커스 아웃 시 유효성 검사
    document.getElementById('name').addEventListener('blur', () => this.validateField('name'));
    document.getElementById('email').addEventListener('blur', () => this.validateField('email'));
    document.getElementById('message').addEventListener('blur', () => this.validateField('message'));
  },

  handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // 유효성 검사
    let isValid = true;
    isValid = this.validateField('name') && isValid;
    isValid = this.validateField('email') && isValid;
    isValid = this.validateField('message') && isValid;

    if (!isValid) return;

    // 성공 메시지 표시
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');

    form.style.opacity = '0.5';
    form.style.pointerEvents = 'none';
    successMsg.classList.remove('hidden');

    // 3초 후 폼 초기화
    setTimeout(() => {
      form.reset();
      form.style.opacity = '1';
      form.style.pointerEvents = 'auto';
      successMsg.classList.add('hidden');
      // 포커스 상태도 초기화
      document.querySelectorAll('.form-error').forEach(el => el.classList.remove('show'));
    }, 3000);

    // 실제 이메일 전송을 원하면 mailto: 사용
    // window.location.href = `mailto:${email}?subject=포트폴리오 문의&body=${message}`;
  },

  validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorEl = document.getElementById(`${fieldName}-error`);
    let isValid = true;

    if (fieldName === 'name') {
      isValid = field.value.trim().length > 0;
    } else if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(field.value.trim());
    } else if (fieldName === 'message') {
      isValid = field.value.trim().length > 0;
    }

    if (isValid) {
      errorEl.classList.remove('show');
    } else {
      errorEl.classList.add('show');
    }

    return isValid;
  }
};

// ===== App 초기화 =====
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  MobileMenu.init();
  ScrollEffects.init();
  AnimationObserver.init();
  TypingEffect.init();
  ContactForm.init();

  console.log('✅ Portfolio site initialized');
});
