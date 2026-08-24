/* =========================
   BACKGROUND EFFECT
========================= */
const container = document.querySelector(".bg-diamond");

for (let i = 0; i < 25; i++) {
  const d = document.createElement("div");
  d.classList.add("diamond");
  d.innerText = "◊";

  d.style.top = Math.random() * 100 + "%";
  d.style.left = Math.random() * 100 + "%";
  d.style.animationDelay = Math.random() * 3 + "s";
  d.style.fontSize = (Math.random() * 10 + 10) + "px";

  container.appendChild(d);
}

/* =========================
   CURSOR PARTICLE
========================= */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function drawStar(x, y, radius, spikes) {
  let rot = Math.PI / 2 * 3;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(x, y - radius);

  for (let i = 0; i < spikes; i++) {
    let x1 = x + Math.cos(rot) * radius;
    let y1 = y + Math.sin(rot) * radius;
    ctx.lineTo(x1, y1);
    rot += step;

    x1 = x + Math.cos(rot) * (radius / 2);
    y1 = y + Math.sin(rot) * (radius / 2);
    ctx.lineTo(x1, y1);
    rot += step;
  }

  ctx.lineTo(x, y - radius);
  ctx.closePath();
  ctx.fill();
}

window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 5; i++) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
      opacity: 1
    });
  }
});

window.addEventListener("click", (e) => {
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 4,
      speedY: (Math.random() - 0.5) * 4,
      opacity: 1
    });
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.size *= 0.97;
    p.opacity *= 0.96;

    ctx.fillStyle = `rgba(200, 180, 255, ${p.opacity})`;

    drawStar(p.x, p.y, p.size * 2, 5);

    if (p.size < 0.3 || p.opacity < 0.05) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* =========================
   TAB SWITCHING
========================= */

const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    tabButtons.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});
document.querySelectorAll("img").forEach(img => {
  img.setAttribute("draggable", "false");
});

/* =========================
   LOAD MORE (MASONRY SAFE)
========================= */
function initLoadMore(container) {
  const items = container.querySelectorAll(".gallery-item");
  const button = container.querySelector(".load-more button");

  let visible = 6;

  function updateItems() {
    items.forEach((item, index) => {
      if (index < visible) {
        item.style.display = "inline-block"; // 🔥 penting!
      } else {
        item.style.display = "none";
      }
    });
  }

  updateItems();

  button.addEventListener("click", () => {
    visible += 3;
    updateItems();

    // 🔥 force reflow biar masonry gak glitch
    const grid = container.querySelector(".image-grid");
    grid.style.columnCount = "auto";
    setTimeout(() => {
      grid.style.columnCount = "3";
    }, 10);

    if (visible >= items.length) {
      button.style.display = "none";
    }
  });
}

// init untuk semua tab
document.querySelectorAll(".tab-content").forEach(tab => {
  initLoadMore(tab);
});


/* =========================
   SLIDER (DESIGN SECTION)
========================= */
document.querySelectorAll(".slider").forEach(slider => {
  const slides = slider.querySelectorAll(".slide");
  const left = slider.querySelector(".arrow.left");
  const right = slider.querySelector(".arrow.right");
  const counter = slider.querySelector(".counter");

  let index = 0;

  function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    slides[i].classList.add("active");
    counter.textContent = `${i + 1}/${slides.length}`;
  }

  left.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  right.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });

  showSlide(index);
});


/* =========================
   FILTER (WORKS SECTION)
========================= */
function filterSelection(category) {
  let cards = document.querySelectorAll(".project-card");
  let buttons = document.querySelectorAll(".filter button");

  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  cards.forEach(card => {
    if (category === "all" || card.classList.contains(category)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

/* =========================
   YOUTUBE (SLIDER)
========================= */
const slider = document.querySelector(".yt-slider");
const leftBtn = document.querySelector(".yt-arrow.left");
const rightBtn = document.querySelector(".yt-arrow.right");

const step = 320;

rightBtn.addEventListener("click", () => {
  slider.scrollBy({
    left: step,
    behavior: "smooth"
  });
});

leftBtn.addEventListener("click", () => {
  slider.scrollBy({
    left: -step,
    behavior: "smooth"
  });
});

// AMBIL SEMUA GAMBAR GALLERY
const images = document.querySelectorAll(".gallery-img");

const overlay = document.querySelector(".overlay");
const overlayImg = document.getElementById("overlay-img");
const overlayTitle = document.getElementById("overlay-title");
const overlayDesc = document.getElementById("overlay-desc");
const closeBtn = document.getElementById("close-btn");

// LOOP SEMUA GAMBAR
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    
    // buka overlay
    overlay.classList.add("active");

    // isi data
    overlayImg.src = img.src;
    overlayTitle.textContent = "Artwork " + (index + 1);
    overlayDesc.textContent = "Ini karya kamu, bisa kamu isi deskripsi nanti.";

  });
});

// CLOSE BUTTON
closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
});

// CLICK LUAR BOX
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("active");
  }
});