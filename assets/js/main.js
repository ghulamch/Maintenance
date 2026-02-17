// --- Theme Toggling ---
const toggleButton = document.getElementById("theme-toggle");
const toggleIcon = toggleButton.querySelector(".icon");
const body = document.body;

// Check localStorage for theme
const currentTheme = localStorage.getItem("theme");

// Apply stored theme or default to dark (no action needed for default dark as it's root)
if (currentTheme === "light") {
  body.setAttribute("data-theme", "light");
  toggleIcon.textContent = "☀️";
} else {
  // Ensure default is dark logic if implicit
  toggleIcon.textContent = "🌙";
}

toggleButton.addEventListener("click", () => {
  if (body.getAttribute("data-theme") === "light") {
    body.removeAttribute("data-theme"); // Revert to root (Dark)
    localStorage.setItem("theme", "dark");
    toggleIcon.textContent = "🌙";
  } else {
    body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    toggleIcon.textContent = "☀️";
  }

  // Refresh bubbles color on theme switch (optional, but nice)
});

// --- Mouse Parallax ---
document.addEventListener("mousemove", (e) => {
  const shapes = document.querySelectorAll(".shape");
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 20;
    shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

// --- Confetti Bubbles ---
document.addEventListener("click", (e) => {
  // Avoid spawning bubbles when clicking interactive elements
  if (e.target.closest("button") || e.target.closest("a")) return;
  createBubble(e.clientX, e.clientY);
});

function createBubble(x, y) {
  const bubble = document.createElement("div");
  const theme = body.getAttribute("data-theme");

  bubble.style.position = "fixed";
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  bubble.style.width = "20px";
  bubble.style.height = "20px";

  // Choose colors based on theme
  let hue;
  if (theme === "light") {
    hue = Math.random() * 360; // Any pastel color
    bubble.style.background = `hsl(${hue}, 100%, 75%)`;
  } else {
    // Neon/Cyber colors for dark mode
    const neonHues = [250, 280, 200, 320]; // Purple, Pink, Blue
    hue = neonHues[Math.floor(Math.random() * neonHues.length)];
    bubble.style.background = `hsl(${hue}, 80%, 60%)`;
    bubble.style.boxShadow = `0 0 10px hsl(${hue}, 80%, 60%)`;
  }

  bubble.style.borderRadius = "50%";
  bubble.style.pointerEvents = "none";
  bubble.style.animation = "pop 1s ease-out forwards";
  document.body.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 1000);
}

// Add CSS keyframe for bubble pop
const style = document.createElement("style");
style.innerHTML = `
    @keyframes pop {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(-50%, -150%) scale(2); opacity: 0; }
    }
`;
document.head.appendChild(style);

// --- Dynamic Progress Text ---
const progressLabel = document.querySelector(".progress-label");
const tasks = [
  "Sprinkling some magic... ✨",
  "Polishing the pixels... 🎨",
  "Tuning the engine... 🔧",
  "Almost ready! 🚀",
];
let taskIndex = 0;

setInterval(() => {
  taskIndex = (taskIndex + 1) % tasks.length;
  progressLabel.style.opacity = 0;
  setTimeout(() => {
    progressLabel.textContent = tasks[taskIndex];
    progressLabel.style.opacity = 1; /* Note: Opacity logic handles fade in/out via CSS transition on element? 
           Actually main.js sets style.opacity directly. 
           We need to ensure .progress-label has transition in CSS for this to fade smoothly. 
           Added text-color transition in CSS *, but opacity needs explicit transition. 
        */
    progressLabel.style.transition = "opacity 0.5s ease";
  }, 500);
}, 3000);
