function App() {
  return {
    s: {},
    isDark: !0,
    mobileOpen: !1,
    formData: { name: "", phone: "", email: "", purpose: "", message: "" },
    sendToWhatsApp() {
      const waNumber = this.s.kontak?.whatsappNumber;
      const cleanNumber = waNumber.replace(/\D/g, "");
      if (
        !this.formData.name ||
        !this.formData.phone ||
        !this.formData.purpose ||
        !this.formData.message
      ) {
        this.showToastMessage(
          "⚠️ Harap lengkapi semua field yang wajib diisi!",
          "warning",
        );
        return;
      }
      let text = `*FORM KONTAK LAPAS NARKOTIKA JAYAPURA*%0A%0A`;
      text += `*Nama:* ${this.formData.name}%0A`;
      text += `*No. Telepon:* ${this.formData.phone}%0A`;
      text += `*Email:* ${this.formData.email || "-"}%0A`;
      text += `*Keperluan:* ${this.formData.purpose}%0A`;
      text += `*Pesan:*%0A${this.formData.message}%0A%0A`;
      text += `_Dikirim dari website resmi Lapas Narkotika Jayapura_`;
      this.showToastMessage("✓ Mengalihkan ke WhatsApp...", "success");
      setTimeout(() => {
        window.open(`https://wa.me/${cleanNumber}?text=${text}`, "_blank");
        this.formData = {
          name: "",
          phone: "",
          email: "",
          purpose: "",
          message: "",
        };
      }, 800);
    },
    showToastMessage(message, type = "success") {
      const toast = document.getElementById("toast");
      if (toast) {
        toast.textContent = message;
        if (type === "warning") {
          toast.style.background = "#dc2626";
          toast.style.color = "#fff";
        } else {
          toast.style.background = "var(--gold)";
          toast.style.color = "#000";
        }
        toast.classList.add("show");
        setTimeout(() => {
          toast.classList.remove("show");
          if (type === "warning") {
            setTimeout(() => {
              toast.style.background = "var(--gold)";
              toast.style.color = "#000";
            }, 400);
          }
        }, 3500);
      }
    },
    async init() {
      try {
        const res = await fetch("./settings.json");
        this.s = await res.json();
      } catch (e) {
        console.warn("settings.json not found, using empty data", e);
        this.s = {};
      }
      const saved = localStorage.getItem("lapas-theme") || "dark";
      this.isDark = saved === "dark";
      this.applyTheme();
      this.$nextTick(() => {
        hideLoader();
        initScrollAnimations();
        initCounters();
        initParticles();
        initProgressBar();
        initBackTop();
        initNavScroll();
        initSmoothScroll();
      });
    },
    toggleTheme() {
      this.isDark = !this.isDark;
      this.applyTheme();
      localStorage.setItem("lapas-theme", this.isDark ? "dark" : "light");
    },
    applyTheme() {
      document.body.classList.toggle("dark", this.isDark);
      document.body.classList.toggle("light", !this.isDark);
    },
    ripple(e) {
      const btn = e.currentTarget;
      const r = document.createElement("span");
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.className = "ripple";
      r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`;
      btn.appendChild(r);
      setTimeout(() => r.remove(), 700);
    },
    getIcon(name) {
      const icons = {
        users: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
        book: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
        alert: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        award: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
        smile: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
        calendar: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
        file: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>`,
        globe: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>`,
        home: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>`,
        heart: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
        activity: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
        graduation: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
        "user-plus": `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/><line x1="20" y1="8" x2="20" y2="14"/></svg>`,
        lock: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
        refresh: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><polyline points="23 4 23 8 19 8"/><polyline points="1 20 1 16 5 16"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>`,
        "book-open": `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>`,
        search: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        shield: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
        "check-square": `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>`,
        dollar: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
        eye: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
        grid: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
        "map-pin": `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
        phone: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>`,
        mail: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
        clock: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      };
      return (
        icons[name] ||
        `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`
      );
    },
  };
}
function hideLoader() {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => (loader.style.display = "none"), 600);
  }, 700);
}
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    ".anim-fade, .anim-left, .anim-right, .anim-scale, .anim-flip",
  );
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );
  targets.forEach((t) => obs.observe(t));
}
function initCounters() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !e.target.dataset.done) {
          e.target.dataset.done = "1";
          const target = parseInt(e.target.dataset.target);
          const dur = 2000;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            e.target.textContent = Math.floor(ease * target);
            if (p < 1) requestAnimationFrame(tick);
            else e.target.textContent = target;
          };
          requestAnimationFrame(tick);
        }
      });
    },
    { threshold: 0.5 },
  );
  document.querySelectorAll(".counter").forEach((el) => obs.observe(el));
}
function initParticles() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let W = (canvas.width = window.innerWidth);
  let H = (canvas.height = window.innerHeight);
  window.addEventListener("resize", () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
  const particles = Array.from({ length: 55 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.8 + 0.4,
    dx: (Math.random() - 0.5) * 0.35,
    dy: (Math.random() - 0.5) * 0.35,
    o: Math.random() * 0.5 + 0.1,
  }));
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const isDarkMode = document.body.classList.contains("dark");
    particles.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = isDarkMode
        ? `rgba(245,158,11,${p.o})`
        : `rgba(245,158,11,${p.o * 0.5})`;
      ctx.fill();
    });
    particles.forEach((a, i) => {
      particles.slice(i + 1).forEach((b) => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          const alpha = (1 - dist / 120) * (isDarkMode ? 0.12 : 0.06);
          ctx.strokeStyle = `rgba(245,158,11,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(draw);
  }
  draw();
}
function initProgressBar() {
  const bar = document.getElementById("progress-bar");
  window.addEventListener("scroll", () => {
    const pct =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;
    bar.style.width = pct + "%";
  });
}
function initBackTop() {
  const btn = document.getElementById("back-top");
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 400);
  });
}
function initNavScroll() {
  const nav = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("nav-scrolled", window.scrollY > 50);
  });
}
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute("href"));
      if (t)
        window.scrollTo({
          top: t.getBoundingClientRect().top + window.scrollY - 80,
          behavior: "smooth",
        });
    });
  });
}
function showToast(e) {
  e.preventDefault();
  const t = document.getElementById("toast");
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3500);
}
