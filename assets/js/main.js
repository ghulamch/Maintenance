// Add mouse parallax effect to background shapes
document.addEventListener("mousemove", (e) => {
  const shapes = document.querySelectorAll(".shape");
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 20;
    shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

// Add confetti bubbles on click
document.addEventListener("click", (e) => {
  createBubble(e.clientX, e.clientY);
});

function createBubble(x, y) {
  const bubble = document.createElement("div");
  bubble.style.position = "fixed";
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  bubble.style.width = "20px";
  bubble.style.height = "20px";
  bubble.style.background = `hsl(${Math.random() * 360}, 100%, 75%)`;
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

// Dynamic Progress Text
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
    progressLabel.style.opacity = 1;
  }, 500);
}, 3000);
