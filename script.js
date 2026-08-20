/* ============================================================
   PASSWORD & LOCK SCREEN UNLOCK
============================================================ */
const CORRECT_PASSWORD = "21082006";

const lockScreen = document.getElementById("lock-screen");
const lockForm = document.getElementById("lock-form");
const passwordInput = document.getElementById("password-input");
const inputWrapper = document.getElementById("input-wrapper");
const errorMessage = document.getElementById("error-message");
const mainContent = document.getElementById("main-content");

if (lockForm) {
  lockForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const entered = passwordInput.value.trim();
    if (entered === CORRECT_PASSWORD) {
      handleUnlock();
    } else {
      handleWrongPassword();
    }
  });
}

function handleUnlock() {
  hideError();
  lockScreen.classList.add("unlock");
  setTimeout(function () {
    lockScreen.style.display = "none";
    mainContent.removeAttribute("aria-hidden");
    document.body.style.overflow = "";
  }, 900);
}

function handleWrongPassword() {
  showError();
  inputWrapper.classList.remove("shake");
  void inputWrapper.offsetWidth;
  inputWrapper.classList.add("shake");
  passwordInput.value = "";
  passwordInput.focus();
  setTimeout(function () {
    inputWrapper.classList.remove("shake");
  }, 600);
}

function showError() { errorMessage.classList.add("visible"); }
function hideError() { errorMessage.classList.remove("visible"); }

const togglePasswordBtn = document.getElementById("toggle-password-btn");

if (togglePasswordBtn && lockForm) {
  togglePasswordBtn.addEventListener("click", function () {
    const isHidden = lockForm.style.display === "none" || lockForm.style.display === "";
    lockForm.style.display = isHidden ? "block" : "none";
    if (isHidden && passwordInput) {
      passwordInput.focus();
    }
  });
}

if (passwordInput) {
  passwordInput.addEventListener("input", function () {
    if (errorMessage.classList.contains("visible")) hideError();
  });
}

/* ============================================================
   LIVE BIRTHDAY COUNTDOWN TIMER
============================================================ */
const TARGET_MONTH = 7;   // August (0-indexed: 7 = August)
const TARGET_DAY = 21;    // 21st
const TARGET_HOURS = 0;   // 0 = 12:00 AM Midnight
const TARGET_MINUTES = 0;
const TARGET_SECONDS = 0;

const cdDays  = document.getElementById("cd-days");
const cdHours = document.getElementById("cd-hours");
const cdMins  = document.getElementById("cd-mins");
const cdSecs  = document.getElementById("cd-secs");

function getBirthdayTargetDate() {
  const now = new Date();
  let targetYear = now.getFullYear();
  let target = new Date(targetYear, TARGET_MONTH, TARGET_DAY, TARGET_HOURS, TARGET_MINUTES, TARGET_SECONDS);
  if (now.getTime() > target.getTime() + (24 * 3600 * 1000)) {
    target = new Date(targetYear + 1, TARGET_MONTH, TARGET_DAY, TARGET_HOURS, TARGET_MINUTES, TARGET_SECONDS);
  }
  return target;
}

function setDigitValueWithPulse(el, newValue) {
  if (!el) return;
  if (el.textContent !== newValue) {
    el.textContent = newValue;
    el.classList.remove("tick-pulse");
    void el.offsetWidth;
    el.classList.add("tick-pulse");
  }
}

function updateLockCountdown() {
  const now = new Date();
  const targetDate = getBirthdayTargetDate();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    setDigitValueWithPulse(cdDays,  "00");
    setDigitValueWithPulse(cdHours, "00");
    setDigitValueWithPulse(cdMins,  "00");
    setDigitValueWithPulse(cdSecs,  "00");
  } else {
    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    setDigitValueWithPulse(cdDays,  String(days).padStart(2, '0'));
    setDigitValueWithPulse(cdHours, String(hours).padStart(2, '0'));
    setDigitValueWithPulse(cdMins,  String(mins).padStart(2, '0'));
    setDigitValueWithPulse(cdSecs,  String(secs).padStart(2, '0'));
  }
}

if (cdDays) {
  updateLockCountdown();
  setInterval(updateLockCountdown, 1000);
}


/* ============================================================
   SCROLL REVEAL OBSERVER
============================================================ */
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function initScrollReveal() {
  document.querySelectorAll(".reveal-on-scroll").forEach(el => scrollObserver.observe(el));
}


/* ============================================================
   HEART NOTE GENERATOR (#4)
============================================================ */
const NOTE_MESSAGES_ARRAY = [
  "You care for me so much, and I’m truly lucky to have you. ❤️",
  "You’ve always been there for me — now let me be there for you. 🫶",
  "You deserve all the love, happiness, and beautiful things in life. ✨",
  "This birthday is all about YOU — so smile, enjoy, and be happy! 🎂💖",
  "Keep living life the way you love, and never stop being you. 🌸",
  "You’ve given me so much love and care — I hope I can give you the same. ❤️",
  "You deserve better, you deserve more, and you deserve to be loved endlessly. 🥹",
  "No matter what happens, I’m here beside you — to help, support, and love you. 🤍",
  "Today, forget everything else and just enjoy your special day. 🎀",
  "Happy Birthday, Dhivya — I’ll always be here for you. ❤️"
];

function initNoteGenerator() {
  const btn = document.getElementById("generate-note-btn");
  const display = document.getElementById("note-display");
  if (!btn || !display) return;

  btn.addEventListener("click", () => {
    const randomMsg = NOTE_MESSAGES_ARRAY[Math.floor(Math.random() * NOTE_MESSAGES_ARRAY.length)];
    display.textContent = randomMsg;
    display.classList.add("active");
    triggerConfettiBurst();
  });
}


/* ============================================================
   COUPLE'S BIRTHDAY FLIP CARDS (#15)
============================================================ */
const FLIP_CARDS_ARRAY = [
  { prompt: "Who is my favourite person? ❤️", answer: "You, Dhivya. Always you. 🫶" },
  { prompt: "When did I first meet you? 🌸", answer: "18th July 2024 — a day I’ll never forget. ❤️" },
  { prompt: "When did our love begin? 💕", answer: "24th July 2024 — my favourite date forever. 🥹" },
  { prompt: "What do I love most about you? 🫶", answer: "Your caring heart and the way you love me. ❤️" },
  { prompt: "What do you deserve? 🎀", answer: "All the love, happiness, and beautiful things in life. 💕" },
  { prompt: "What will I always do? ✨", answer: "Love you, care for you, and support you. ❤️" }
];

function renderFlipCards() {
  const grid = document.getElementById("flip-cards-grid");
  if (!grid || grid.children.length > 0) return;

  FLIP_CARDS_ARRAY.forEach((item) => {
    const card = document.createElement("div");
    card.className = "flip-card";
    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <span class="card-question">${item.prompt}</span>
          <span class="tap-hint">Tap to flip 💫</span>
        </div>
        <div class="flip-card-back">
          <span class="card-answer">${item.answer}</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });

    grid.appendChild(card);
  });
}


/* ============================================================
   MOMENTS I'LL NEVER FORGET (#8)
============================================================ */
const MOMENTS_ARRAY = [
  { title: "18th July 2024 ❤️", text: "The day I met you — the beginning of a beautiful memory." },
  { title: "24th July 2024 💕", text: "The day our love started — a date forever close to my heart." },
  { title: "Our Little Moments 🌸", text: "Every laugh, every talk, every little moment with you made me happy." },
  { title: "The Times You Cared 🫶", text: "You cared for me, helped me, and stood by me when I needed you." },
  { title: "Us, Always ❤️", text: "Every moment with you is special, and I hope we make many more." }
];

function renderMomentsGrid() {
  const grid = document.getElementById("moments-grid");
  const modalList = document.getElementById("modal-moments-list");

  if (grid && grid.children.length === 0) {
    MOMENTS_ARRAY.forEach(m => {
      const card = document.createElement("div");
      card.className = "moment-card";
      card.innerHTML = `
        <h3 class="moment-title">${m.title}</h3>
        <p class="moment-text">${m.text}</p>
      `;
      grid.appendChild(card);
    });
  }

  if (modalList && modalList.children.length === 0) {
    MOMENTS_ARRAY.forEach(m => {
      const div = document.createElement("div");
      div.className = "moment-card";
      div.style.marginBottom = "14px";
      div.innerHTML = `
        <h3 class="moment-title">${m.title}</h3>
        <p class="moment-text">${m.text}</p>
      `;
      modalList.appendChild(div);
    });
  }
}


/* ============================================================
   SECTION 4: ARC CAROUSEL MATH & ROTATION SYSTEM ("moving next to next")
============================================================ */
let activeCardIndex = 0;
let autoRotateTimer = null;

function initArcCarousel() {
  const track = document.getElementById("arc-carousel-track");
  if (!track) return;

  const cards = Array.from(track.querySelectorAll(".arc-card"));
  const totalCards = cards.length;
  if (totalCards === 0) return;

  const prevBtn = document.getElementById("nav-prev");
  const nextBtn = document.getElementById("nav-next");

  function updateArcLayout() {
    const isMobile = window.innerWidth <= 768;
    const radiusX = isMobile ? window.innerWidth * 0.38 : 420;
    const radiusY = isMobile ? 60 : 95;
    const angleStep = (Math.PI * 1.1) / totalCards;

    cards.forEach(function (card, idx) {
      let offset = idx - activeCardIndex;
      if (offset > totalCards / 2) offset -= totalCards;
      if (offset < -totalCards / 2) offset += totalCards;

      const angle = (offset * angleStep) - (Math.PI / 2);
      const x = Math.cos(angle) * radiusX;
      const y = Math.sin(angle) * radiusY + radiusY * 0.4;

      const absOffset = Math.abs(offset);
      const isCenter = (offset === 0);
      const baseScale = isCenter ? (isMobile ? 1.20 : 1.32) : Math.max(0.68, 1 - absOffset * 0.12);
      const zIndex = isCenter ? 50 : (30 - Math.round(absOffset * 5));
      const opacity = isCenter ? 1 : Math.max(0.35, 1 - absOffset * 0.25);

      card.style.transform = `translate3d(${x}px, ${y}px, 0px) scale(${baseScale})`;
      card.style.zIndex = zIndex;
      card.style.opacity = opacity;

      if (isCenter) {
        card.classList.add("card-active");
      } else {
        card.classList.remove("card-active");
      }
    });
  }

  function nextCard() {
    activeCardIndex = (activeCardIndex + 1) % totalCards;
    updateArcLayout();
  }

  function prevCard() {
    activeCardIndex = (activeCardIndex - 1 + totalCards) % totalCards;
    updateArcLayout();
  }

  if (nextBtn) nextBtn.addEventListener("click", nextCard);
  if (prevBtn) prevBtn.addEventListener("click", prevCard);

  autoRotateTimer = setInterval(nextCard, 4500);
  track.addEventListener("mouseenter", () => clearInterval(autoRotateTimer));
  track.addEventListener("mouseleave", () => autoRotateTimer = setInterval(nextCard, 4500));

  window.syncCarouselIndex = function (idx) {
    activeCardIndex = idx;
    updateArcLayout();
  };

  window.addEventListener("resize", updateArcLayout);
  updateArcLayout();
}


/* ============================================================
   POPUP MODAL ENGINE ("popup style")
============================================================ */
function initPopupModalEngine() {
  const overlay = document.getElementById("modal-overlay");
  const cards = document.querySelectorAll(".arc-card");
  const modals = document.querySelectorAll(".popup-modal");

  if (!overlay) return;

  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (!targetModal) return;

    modals.forEach(m => m.classList.remove("active"));
    overlay.classList.add("active");
    overlay.removeAttribute("aria-hidden");
    targetModal.classList.add("active");
  }

  function closeModal() {
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    modals.forEach(m => m.classList.remove("active"));
    pauseAllAudio();
  }

  cards.forEach((card, idx) => {
    card.addEventListener("click", function () {
      if (window.syncCarouselIndex) {
        window.syncCarouselIndex(idx);
      }
      const targetSecId = this.getAttribute("data-scroll-target");
      if (targetSecId) {
        const targetElement = document.getElementById(targetSecId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      const modalId = this.getAttribute("data-modal");
      if (modalId) {
        openModal(modalId);
      }
    });
  });

  document.querySelectorAll(".modal-close-btn").forEach(btn => {
    btn.addEventListener("click", closeModal);
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeModal();
    }
  });
}


/* ============================================================
   DATA ARRAYS & SECTION INITIALIZERS
============================================================ */

/* 5. WHY I FELL FOR YOU */
const REASONS_ARRAY = [
  { text: "Un manasu ❤️", emoji: "❤️" },
  { text: "Un smile 😊", emoji: "😊" },
  { text: "Un support 🫂", emoji: "🫂" },
  { text: "Un anbu 💕", emoji: "💕" },
  { text: "Nee nee-ah irukradhu ✨", emoji: "✨" }
];

function renderReasons() {
  const container = document.getElementById("reasons-list");
  if (!container || container.children.length > 0) return;
  REASONS_ARRAY.forEach((item) => {
    const li = document.createElement("li");
    li.className = "reason-item";
    li.innerHTML = `<span class="reason-glyph">${item.emoji}</span><span>${item.text}</span>`;
    container.appendChild(li);
  });
}


/* 6. THE LITTLE THINGS (#6) */
const THINGS_ARRAY = [
  "Nee sirikkumbodhu enakku romba pidikkum 😍",
  "Naan sona atha purinjukura nee 🫶",
  "Nee pesura chinna chinna vishayam kooda enakku special 💕",
  "Un sirippu kettaale en mood maaridum 😊",
  "Enna pathi nee care panra ovvoru chinna vishayam 🤍",
  "Nee enna ipdi paathukura vidham romba special ✨"
];


function renderLittleThingsBubbles() {
  const container = document.getElementById("bubbles-container");
  if (!container || container.children.length > 0) return;

  const unwrapAllBtn = document.getElementById("unwrap-all-btn");

  THINGS_ARRAY.forEach((thing, idx) => {
    const card = document.createElement("div");
    card.className = `gift-card gift-card-${idx + 1}`;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Unwrap Gift ${idx + 1}`);

    card.innerHTML = `
      <div class="gift-card-inner">
        <div class="gift-card-front">
          <div class="gift-ribbon-v"></div>
          <div class="gift-ribbon-h"></div>
          <div class="gift-box-icon-wrapper">
            <span class="gift-box-emoji">🎁</span>
            <span class="gift-sparkle">✨</span>
          </div>
          <span class="gift-title">Surprise #${idx + 1}</span>
          <span class="gift-unwrap-hint">Tap to unwrap 🎀</span>
        </div>
        <div class="gift-card-back">
          <span class="gift-heart-badge">💙</span>
          <p class="gift-revealed-text">${thing}</p>
          <span class="gift-unwrapped-tag">Unwrapped with Love ❤️</span>
        </div>
      </div>
    `;

    function toggleUnwrap() {
      const isUnwrapped = card.classList.toggle("unwrapped");
      card.setAttribute("aria-expanded", isUnwrapped ? "true" : "false");
      if (isUnwrapped && typeof triggerConfettiBurst === "function") {
        triggerConfettiBurst();
      }
      updateUnwrapAllBtnState();
    }

    card.addEventListener("click", toggleUnwrap);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleUnwrap();
      }
    });

    container.appendChild(card);
  });

  function updateUnwrapAllBtnState() {
    if (!unwrapAllBtn) return;
    const cards = container.querySelectorAll(".gift-card");
    const allUnwrapped = Array.from(cards).every(c => c.classList.contains("unwrapped"));
    if (allUnwrapped) {
      unwrapAllBtn.innerHTML = `✨ Wrap Gifts Again 🎁`;
    } else {
      unwrapAllBtn.innerHTML = `🎁 Unwrap All Surprise Gifts ✨`;
    }
  }

  if (unwrapAllBtn) {
    unwrapAllBtn.addEventListener("click", () => {
      const cards = container.querySelectorAll(".gift-card");
      const anyWrapped = Array.from(cards).some(c => !c.classList.contains("unwrapped"));

      cards.forEach((card, idx) => {
        setTimeout(() => {
          if (anyWrapped) {
            if (!card.classList.contains("unwrapped")) {
              card.classList.add("unwrapped");
              card.setAttribute("aria-expanded", "true");
            }
          } else {
            card.classList.remove("unwrapped");
            card.setAttribute("aria-expanded", "false");
          }
          if (idx === cards.length - 1 && anyWrapped && typeof triggerConfettiBurst === "function") {
            triggerConfettiBurst();
          }
          updateUnwrapAllBtnState();
        }, idx * 120);
      });
    });
  }
}


/* 9. PROMISES I MAKE YOU (#9) */
const PROMISES_ARRAY = [
  "Unna eppovum love pannuven. ❤️",
  "Unakku eppovum support-ah iruppen. 🫂",
  "Unna care panni purinjippen. 💕",
  "Unna thaniya feel panna vida maatten. 🛡️",
  "Nee low-ah irukkumbodhu un kooda iruppen. 🌸",
  "Unna vittu pogamaatten. 🤝",
  "Eppovum un pakkam iruppen. ✨"
];

let currentPromiseIndex = 0;
let isPromiseEnvelopeUnsealed = false;

function renderPromisesDeck() {
  const envelope = document.getElementById("promise-envelope");
  const badge    = document.getElementById("promise-badge");
  const quote    = document.getElementById("promise-quote");
  const dotsBar  = document.getElementById("promise-dots-bar");
  const nextBtn  = document.getElementById("next-promise-btn");

  if (!envelope) return;

  // Render promise dots
  if (dotsBar && dotsBar.children.length === 0) {
    PROMISES_ARRAY.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = `promise-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute("aria-label", `Promise ${idx + 1}`);
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        goToPromise(idx);
      });
      dotsBar.appendChild(dot);
    });
  }

  function updatePromiseContent() {
    if (badge) badge.textContent = `PROMISE ${currentPromiseIndex + 1} OF ${PROMISES_ARRAY.length}`;
    if (quote) quote.innerHTML = `&ldquo;${PROMISES_ARRAY[currentPromiseIndex]}&rdquo;`;

    // Update dots
    if (dotsBar) {
      Array.from(dotsBar.children).forEach((dot, idx) => {
        if (idx === currentPromiseIndex) dot.classList.add("active");
        else dot.classList.remove("active");
      });
    }
  }

  function unsealEnvelope() {
    if (!isPromiseEnvelopeUnsealed) {
      isPromiseEnvelopeUnsealed = true;
      envelope.classList.add("unsealed");
      triggerConfettiBurst();
    }
  }

  function cycleNextPromise() {
    if (!isPromiseEnvelopeUnsealed) {
      unsealEnvelope();
      return;
    }

    // Dip card transition
    const card = document.getElementById("promise-scroll-card");
    if (card) card.classList.add("dip-down");

    setTimeout(() => {
      currentPromiseIndex = (currentPromiseIndex + 1) % PROMISES_ARRAY.length;
      updatePromiseContent();

      if (card) {
        card.classList.remove("dip-down");
        card.classList.add("rise-up");
        setTimeout(() => card.classList.remove("rise-up"), 500);
      }
      triggerConfettiBurst();
    }, 320);
  }

  function goToPromise(idx) {
    if (currentPromiseIndex === idx && isPromiseEnvelopeUnsealed) return;
    unsealEnvelope();

    const card = document.getElementById("promise-scroll-card");
    if (card) card.classList.add("dip-down");

    setTimeout(() => {
      currentPromiseIndex = idx;
      updatePromiseContent();
      if (card) {
        card.classList.remove("dip-down");
        card.classList.add("rise-up");
        setTimeout(() => card.classList.remove("rise-up"), 500);
      }
      triggerConfettiBurst();
    }, 320);
  }

  envelope.addEventListener("click", unsealEnvelope);
  if (nextBtn) {
    nextBtn.addEventListener("click", cycleNextPromise);
  }

  updatePromiseContent();
}



/* 10. WISHES FOR YOUR YEAR AHEAD (#10) */
const WISHES_ARRAY = [
  { top: "18%", left: "12%", wish: "May you always be happy. ❤️" },
  { top: "32%", left: "42%", wish: "May all your dreams come true. ✨" },
  { top: "22%", left: "75%", wish: "May you always stay healthy and strong. 🌸" },
  { top: "62%", left: "20%", wish: "May you achieve everything you wish for. 🫶" },
  { top: "72%", left: "55%", wish: "May your life be filled with beautiful moments. 💕" },
  { top: "50%", left: "82%", wish: "May you always keep smiling. 😊" },
  { top: "82%", left: "38%", wish: "May this year bring you more love, peace, and happiness. 🎂❤️" }
];

function renderWishesConstellation() {
  const container = document.getElementById("stars-constellation");
  if (!container || container.children.length > 0) return;

  WISHES_ARRAY.forEach((item, idx) => {
    const wrapper = document.createElement("div");
    wrapper.className = "star-node-wrapper";
    wrapper.style.top = item.top;
    wrapper.style.left = item.left;

    wrapper.innerHTML = `
      <button class="star-node" aria-label="Wish star ${idx + 1}">
        <svg class="star-svg" viewBox="0 0 24 24">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
        </svg>
      </button>
      <div class="star-wish-bubble">${item.wish}</div>
    `;

    const btn = wrapper.querySelector(".star-node");
    const bubble = wrapper.querySelector(".star-wish-bubble");

    btn.addEventListener("click", () => {
      document.querySelectorAll(".star-wish-bubble").forEach(b => b.classList.remove("visible"));
      bubble.classList.add("visible");
      triggerConfettiBurst();
    });

    container.appendChild(wrapper);
  });
}


/* 12. THANK YOU FOR EVERYTHING (#12) */
const THANK_YOU_ARRAY = [
  { icon: "❤️", prefix: "Thank you for", text: "En mela eppovume rendu மடங்கு care kaatinadhukku, naan kekaamaiye en manasa purinjittadhukku… ❤️" },
  { icon: "🫶", prefix: "Thank you for", text: "Naan kastapadum podhu en koodave ninnu ennaiya thangi pidichadhu kaaga… 🫶" },
  { icon: "🥹", prefix: "Thank you for", text: "Naan thappu panna kooda ennaiya purinju, enakku inoru chance kuduthadhukku… 🥹" },
  { icon: "🤍", prefix: "Thank you for", text: "En kooda irundhu en thappaiyellam poruthu ennaiya thangaama parthukittadhukku… 🤍" },
  { icon: "💕", prefix: "Thank you for", text: "En life-la un anbaal happiness and endless smiles kondu vandhadhukku… 💕" },
  { icon: "🌸", prefix: "Thank you for", text: "Nee neeya irundhu en vaazhkkaiyai ivvalavu azhaga maathinadhukku… 🌸" }
];

function renderThankYouList() {
  const container = document.getElementById("thank-you-list");
  if (!container || container.children.length > 0) return;

  THANK_YOU_ARRAY.forEach(item => {
    const card = document.createElement("div");
    card.className = "thank-card";
    card.innerHTML = `
      <div class="thank-card-header">
        <span class="thank-icon-badge">${item.icon}</span>
        <span class="thank-prefix">${item.prefix}</span>
      </div>
      <p class="thank-body-text">${item.text}</p>
    `;
    container.appendChild(card);
  });
}


/* 13. OUR SOUNDTRACK (#13) */
const TRACKS_ARRAY = [
  { title: "Yaanji", artist: "Anirudh Ravichander & Shakthisree Gopalan", note: "A song that feels like our little world. ❤️", src: "audio/song-1.mp3" },
  { title: "Malargal Kaettaen", artist: "A. R. Rahman & K. S. Chithra", note: "For the soft and beautiful moments we share. 🌸", src: "audio/song-2.mp3" },
  { title: "Anbil Avan", artist: "V. V. Prasanna & Chinmayi", note: "A little reminder of the love between us. 💕", src: "audio/song-3.mp3" },
  { title: "Unakkenna Venum Sollu", artist: "Harris Jayaraj & Benny Dayal", note: "Because your happiness will always matter to me. 🫶", src: "audio/song-4.mp3" },
  { title: "Naan Nee", artist: "Shakthisree Gopalan & Dhee", note: "A song that reminds me of you and me. ❤️", src: "audio/song-5.mp3" }
];

let activeAudio = null;
let activeTrackRow = null;
let activeSynthMelody = null;

// Romantic pentatonic synthesizer fallback for seamless play if MP3 is missing
function playRomanticMelodySynth(trackIdx) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  const ctx = new AudioCtx();

  const songScales = [
    [261.63, 329.63, 392.00, 523.25, 659.25, 783.99], // Yaanji
    [220.00, 261.63, 329.63, 440.00, 523.25, 659.25], // Malargal Kaettaen
    [293.66, 369.99, 440.00, 587.33, 739.99, 880.00], // Anbil Avan
    [196.00, 246.94, 293.66, 392.00, 493.88, 587.33], // Unakkenna Venum Sollu
    [246.94, 311.13, 369.99, 493.88, 622.25, 739.99]  // Naan Nee
  ];

  const notes = songScales[trackIdx % songScales.length];
  let nIdx = 0;
  let playing = true;
  let timerId = null;

  function nextNote() {
    if (!playing) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(notes[nIdx % notes.length], ctx.currentTime);
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
      nIdx++;
    } catch (e) { }
    timerId = setTimeout(nextNote, 550);
  }

  nextNote();

  return {
    stop: function () {
      playing = false;
      if (timerId) clearTimeout(timerId);
      try { ctx.close(); } catch (e) { }
    }
  };
}

function renderSoundtrackPlayer() {
  const container = document.getElementById("playlist-container");
  if (!container || container.children.length > 0) return;

  const vinylDisc = document.getElementById("vinyl-record-disc");
  const tonearm = document.getElementById("turntable-tonearm");
  const eqWrapper = document.getElementById("eq-bars-wrapper");
  const nowTitle = document.getElementById("now-playing-title");
  const nowArtist = document.getElementById("now-playing-artist");
  const nowNote = document.getElementById("now-playing-note");

  TRACKS_ARRAY.forEach((track, idx) => {
    const row = document.createElement("div");
    row.className = "track-row";
    row.innerHTML = `
      <div class="track-num-badge">0${idx + 1}</div>
      <div class="track-info">
        <div class="track-title">${track.title}</div>
        <div class="track-artist">${track.artist}</div>
        <div class="track-note-badge">💕 ${track.note}</div>
      </div>
      <button class="track-play-btn" aria-label="Play track ${track.title}">
        <svg class="play-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        <svg class="pause-icon" viewBox="0 0 24 24" style="display:none;"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
      </button>
    `;

    row.addEventListener("click", () => {
      const isPlaying = row.classList.contains("playing");
      pauseAllAudio();

      if (isPlaying) {
        return;
      }

      // Update Now Playing Info & Player Animations
      if (nowTitle) nowTitle.textContent = track.title;
      if (nowArtist) nowArtist.textContent = track.artist;
      if (nowNote) nowNote.textContent = `"${track.note}"`;
      if (vinylDisc) vinylDisc.classList.add("spinning");
      if (tonearm) tonearm.classList.add("active");
      if (eqWrapper) eqWrapper.classList.add("playing");

      const playIcon = row.querySelector(".play-icon");
      const pauseIcon = row.querySelector(".pause-icon");
      const audio = new Audio(track.src);

      audio.play().then(() => {
        row.classList.add("playing");
        if (playIcon) playIcon.style.display = "none";
        if (pauseIcon) pauseIcon.style.display = "block";
        activeAudio = audio;
        activeTrackRow = row;
      }).catch(() => {
        activeSynthMelody = playRomanticMelodySynth(idx);
        row.classList.add("playing");
        if (playIcon) playIcon.style.display = "none";
        if (pauseIcon) pauseIcon.style.display = "block";
        activeTrackRow = row;
      });
    });

    container.appendChild(row);
  });
}

function pauseAllAudio() {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio = null;
  }
  if (activeSynthMelody) {
    activeSynthMelody.stop();
    activeSynthMelody = null;
  }

  const vinylDisc = document.getElementById("vinyl-record-disc");
  const tonearm = document.getElementById("turntable-tonearm");
  const eqWrapper = document.getElementById("eq-bars-wrapper");

  if (vinylDisc) vinylDisc.classList.remove("spinning");
  if (tonearm) tonearm.classList.remove("active");
  if (eqWrapper) eqWrapper.classList.remove("playing");

  document.querySelectorAll(".track-row").forEach(r => {
    r.classList.remove("playing");
    const playIcon = r.querySelector(".play-icon");
    const pauseIcon = r.querySelector(".pause-icon");
    if (playIcon) playIcon.style.display = "block";
    if (pauseIcon) pauseIcon.style.display = "none";
  });
}



/* 14. FINALE CONFETTI & BACK TO TOP (#14) */
function initFinaleSection() {
  const finaleSection = document.getElementById("finale-section");
  const backToTopBtn = document.getElementById("back-to-top-btn");

  if (finaleSection) {
    let triggered = false;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          triggerConfettiBurst();
        }
      });
    }, { threshold: 0.3 });
    obs.observe(finaleSection);
  }

  if (backToTopBtn && mainContent) {
    backToTopBtn.addEventListener("click", () => {
      mainContent.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}


/* ============================================================
   CANVAS OVERLAYS: BACKGROUND STARS, CURSOR TRAIL & CONFETTI
============================================================ */
(function initAmbientBgStars() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let curMouseX = width / 2;
  let curMouseY = height / 2;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener("touchmove", (e) => {
    if (e.touches[0]) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    }
  });

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function drawBgHeart(ctx, x, y, size, color) {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size);
    ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.fill();
  }

  const starCount = 65;
  const stars = [];
  const colors = ["#9fe0ff", "#ffffff", "#2f8fe0", "#1450c4"];

  for (let i = 0; i < starCount; i++) {
    const isHeart = Math.random() < 0.4;
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      r: isHeart ? Math.random() * 6 + 4 : Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.55 + 0.25,
      baseAlpha: Math.random() * 0.45 + 0.25,
      speedY: Math.random() * 0.3 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.008,
      phase: Math.random() * Math.PI * 2,
      isHeart: isHeart,
      parallaxFactor: Math.random() * 0.05 + 0.02
    });
  }

  function renderInteractiveBg() {
    ctx.clearRect(0, 0, width, height);

    // Smooth lerp tracking cursor position
    curMouseX += (mouseX - curMouseX) * 0.045;
    curMouseY += (mouseY - curMouseY) * 0.045;

    // 1. Large Cursor-Following Blurred Blue Glow Orb
    const cursorGlow = ctx.createRadialGradient(
      curMouseX, curMouseY, 20,
      curMouseX, curMouseY, Math.max(380, width * 0.35)
    );
    cursorGlow.addColorStop(0, "rgba(159, 224, 255, 0.38)");
    cursorGlow.addColorStop(0.4, "rgba(47, 143, 224, 0.20)");
    cursorGlow.addColorStop(0.75, "rgba(20, 80, 196, 0.08)");
    cursorGlow.addColorStop(1, "rgba(2, 7, 22, 0)");

    ctx.save();
    ctx.fillStyle = cursorGlow;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // 2. Secondary Floating Ambient Blurred Blue Orbs
    const time = Date.now() * 0.001;
    const orb1X = width * 0.25 + Math.sin(time * 0.6) * 120 + (curMouseX - width / 2) * 0.08;
    const orb1Y = height * 0.35 + Math.cos(time * 0.5) * 100 + (curMouseY - height / 2) * 0.08;

    const orb1Glow = ctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, 320);
    orb1Glow.addColorStop(0, "rgba(47, 143, 224, 0.30)");
    orb1Glow.addColorStop(0.6, "rgba(20, 80, 196, 0.12)");
    orb1Glow.addColorStop(1, "transparent");

    ctx.save();
    ctx.fillStyle = orb1Glow;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    const orb2X = width * 0.75 + Math.cos(time * 0.7) * 140 - (curMouseX - width / 2) * 0.06;
    const orb2Y = height * 0.65 + Math.sin(time * 0.4) * 110 - (curMouseY - height / 2) * 0.06;

    const orb2Glow = ctx.createRadialGradient(orb2X, orb2Y, 10, orb2X, orb2Y, 360);
    orb2Glow.addColorStop(0, "rgba(159, 224, 255, 0.25)");
    orb2Glow.addColorStop(0.55, "rgba(20, 80, 196, 0.15)");
    orb2Glow.addColorStop(1, "transparent");

    ctx.save();
    ctx.fillStyle = orb2Glow;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // 3. Render 3D Parallax Stars & Heart Particles
    stars.forEach(star => {
      star.y -= star.speedY;
      if (star.y < -20) star.y = height + 20;

      star.phase += star.twinkleSpeed;
      star.alpha = star.baseAlpha + Math.sin(star.phase) * 0.18;

      // Parallax shift based on cursor move
      const shiftX = (curMouseX - width / 2) * star.parallaxFactor;
      const shiftY = (curMouseY - height / 2) * star.parallaxFactor;

      const drawX = star.x + shiftX;
      const drawY = star.y + shiftY;

      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
      ctx.fillStyle = star.color;
      ctx.shadowBlur = star.isHeart ? 12 : 6;
      ctx.shadowColor = star.color;

      if (star.isHeart) {
        drawBgHeart(ctx, drawX, drawY, star.r, star.color);
      } else {
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    requestAnimationFrame(renderInteractiveBg);
  }

  renderInteractiveBg();
})();



(function initCursorTrail() {
  const canvas = document.getElementById("cursor-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const hearts = [];
  let isMouseDown = false;

  function drawCanvasHeart(ctx, x, y, size, color, alpha, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.fillStyle = color;
    ctx.shadowBlur = 14;
    ctx.shadowColor = color;

    ctx.beginPath();
    const d = size;
    ctx.moveTo(0, d * 0.25);
    ctx.bezierCurveTo(0, -d * 0.15, -d * 0.5, -d * 0.15, -d * 0.5, d * 0.25);
    ctx.bezierCurveTo(-d * 0.5, d * 0.55, 0, d * 0.85, 0, d);
    ctx.bezierCurveTo(0, d * 0.85, d * 0.5, d * 0.55, d * 0.5, d * 0.25);
    ctx.bezierCurveTo(d * 0.5, -d * 0.15, 0, -d * 0.15, 0, d * 0.25);
    ctx.fill();
    ctx.restore();
  }

  function spawnHeart(x, y, isBurst = false) {
    const count = isBurst ? (isMouseDown ? 4 : 2) : 1;
    const colors = ["#ffffff", "#9fe0ff", "#ffffff", "#2f8fe0"];

    for (let i = 0; i < count; i++) {
      hearts.push({
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        size: Math.random() * 10 + (isMouseDown ? 12 : 7),
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        vx: (Math.random() - 0.5) * (isMouseDown ? 3.5 : 1.8),
        vy: (Math.random() - 0.5) * (isMouseDown ? 3.5 : 1.8) - 0.8,
        rotation: (Math.random() - 0.5) * 0.5,
        spin: (Math.random() - 0.5) * 0.04,
        decay: Math.random() * 0.02 + 0.015
      });
    }
  }

  window.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    spawnHeart(e.clientX, e.clientY, true);
  });

  window.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (Math.random() < (isMouseDown ? 0.9 : 0.6)) {
      spawnHeart(e.clientX, e.clientY, isMouseDown);
    }
  });

  window.addEventListener("touchstart", (e) => {
    isMouseDown = true;
    if (e.touches[0]) spawnHeart(e.touches[0].clientX, e.touches[0].clientY, true);
  });

  window.addEventListener("touchend", () => {
    isMouseDown = false;
  });

  window.addEventListener("touchmove", (e) => {
    if (e.touches[0]) {
      spawnHeart(e.touches[0].clientX, e.touches[0].clientY, true);
    }
  });

  function renderCursorHearts() {
    ctx.clearRect(0, 0, width, height);

    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      h.x += h.vx;
      h.y += h.vy;
      h.vy -= 0.03; // Soft floating upward effect
      h.rotation += h.spin;
      h.alpha -= h.decay;

      if (h.alpha <= 0) {
        hearts.splice(i, 1);
        continue;
      }

      drawCanvasHeart(ctx, h.x, h.y, h.size, h.color, h.alpha, h.rotation);
    }

    requestAnimationFrame(renderCursorHearts);
  }

  renderCursorHearts();
})();



function triggerConfettiBurst() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const colors = ["#ffffff", "#9fe0ff", "#2f8fe0", "#1450c4"];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: width / 2,
      y: height / 2,
      r: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 14,
      alpha: 1,
      decay: Math.random() * 0.015 + 0.01
    });
  }

  function renderConfetti() {
    ctx.clearRect(0, 0, width, height);
    let active = false;

    particles.forEach(p => {
      if (p.alpha <= 0) return;
      active = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25;
      p.alpha -= p.decay;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    if (active) requestAnimationFrame(renderConfetti);
    else ctx.clearRect(0, 0, width, height);
  }
  renderConfetti();
}




/* INITIALIZE APP */
document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  renderFlipCards();
  initNoteGenerator();
  renderReasons();
  renderLittleThingsBubbles();
  renderMomentsGrid();
  initArcCarousel();
  initPopupModalEngine();
  renderPromisesDeck();
  renderWishesConstellation();
  renderThankYouList();
  renderSoundtrackPlayer();
  initFinaleSection();
  initBirthdayWishModals();
});


/* ============================================================
   BIRTHDAY WISH MODAL SYSTEM
============================================================ */
const BIRTHDAY_WISHES = [
  {
    icon: "🎂",
    title: "Birthday Wish",
    message: "Happy Birthday, Dhivya! 🎂✨\n\nOn this very special day, I wish you a life overflowing with joy, peace, and all the happiness you truly deserve. May every dream you've ever held close begin to bloom into beautiful reality this year. 🌸💕\n\nYou are the most beautiful part of my life."
  },
  {
    icon: "💖",
    title: "A Love Note",
    message: "Dear Dhivya 💕,\n\nEveryday with you feels like a gift I never knew I needed. Un smile-um, un eyes-um, un kindness-um — everything about you makes this world more beautiful. ❤️\n\nI love you more than words can ever say. Forever yours. 🫶"
  },
  {
    icon: "✨",
    title: "A Dream For You",
    message: "For your birthday, I dream of a year where every moment feels magical for you ✨\n\nMay you achieve everything you've worked so hard for. May every door you knock on swing wide open. May you find strength in every challenge and joy in every little thing. 🌟\n\nYou deserve the whole universe, Dhivya. 💙"
  },
  {
    icon: "🌸",
    title: "A Blessing For You",
    message: "May this birthday mark the beginning of the most beautiful chapter of your life 🌸\n\nMay happiness follow you everywhere. May your heart always be light and your smile never fade. May you be surrounded by love, warmth, and wonderful memories every single day. 💖\n\nHappy Birthday, my special one! 🎉✨"
  }
];

function initBirthdayWishModals() {
  const overlay  = document.getElementById("bwish-overlay");
  const closeBtn = document.getElementById("bwish-close");

  if (!overlay || !closeBtn) return;

  // Close handlers
  closeBtn.addEventListener("click", closeBirthdayWishModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeBirthdayWishModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeBirthdayWishModal();
  });
}

function openBirthdayWishModal(num) {
  const wish    = BIRTHDAY_WISHES[num - 1];
  const overlay = document.getElementById("bwish-overlay");
  const icon    = document.getElementById("bwish-icon");
  const title   = document.getElementById("bwish-title");
  const msg     = document.getElementById("bwish-message");

  if (!overlay || !wish) return;

  // Set content
  icon.textContent  = wish.icon;
  title.textContent = wish.title;
  msg.innerHTML     = wish.message.replace(/\n/g, "<br/>");

  // Reset emoji animation
  icon.style.animation = "none";
  requestAnimationFrame(() => {
    icon.style.animation = "";
  });

  // Open overlay
  overlay.setAttribute("aria-hidden", "false");
  overlay.classList.add("active");

  // Trigger confetti
  spawnWishConfetti();
}

function closeBirthdayWishModal() {
  const overlay = document.getElementById("bwish-overlay");
  if (!overlay) return;
  overlay.classList.remove("active");
  overlay.setAttribute("aria-hidden", "true");

  // Clear confetti
  const confettiLayer = document.getElementById("bwish-confetti");
  if (confettiLayer) {
    setTimeout(() => { confettiLayer.innerHTML = ""; }, 500);
  }
}

function spawnWishConfetti() {
  const container = document.getElementById("bwish-confetti");
  if (!container) return;
  container.innerHTML = "";

  const colors = [
    "#9fe0ff", "#ffb4e6", "#ffffff", "#a8edea",
    "#fed6e3", "#ffd700", "#ff8fb1", "#b8f4ff"
  ];
  const count = 55;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";

    const color = colors[Math.floor(Math.random() * colors.length)];
    const leftPct = Math.random() * 100;
    const duration = 1.5 + Math.random() * 2.5;
    const delay = Math.random() * 1.5;
    const size = 5 + Math.random() * 8;
    const shapes = ["50%", "2px", "0%"];
    const borderRadius = shapes[Math.floor(Math.random() * shapes.length)];

    piece.style.cssText = `
      left: ${leftPct}%;
      top: ${-10 - Math.random() * 30}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${borderRadius};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: 1;
    `;

    container.appendChild(piece);
  }
}

