const sakuraContainer = document.querySelector(".sakura");
const sakuraCount = 100; // 🌸 number of petals (keep reasonable)

for (let i = 0; i < sakuraCount; i++) {
  const petal = document.createElement("span");
  petal.textContent = "🌸";

  const size = Math.random() * 16 + 12; // size 12–28px
  petal.style.fontSize = size + "px";
  petal.style.left = Math.random() * 100 + "%";
  petal.style.animationDuration = Math.random() * 10 + 8 + "s";
  petal.style.animationDelay = Math.random() * -20 + "s";
  petal.style.opacity = Math.random() * 0.5 + 0.3;

  sakuraContainer.appendChild(petal);
}