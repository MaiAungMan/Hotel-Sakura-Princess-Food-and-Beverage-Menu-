// Fill each layer with enough blocks to cover the entire screen
function createBlocks(layerSelector, blockSize = 60) {
  const layer = document.querySelector(layerSelector);
  const cols = Math.ceil(window.innerWidth / blockSize);
  const rows = Math.ceil(window.innerHeight / blockSize);
  const total = cols * rows;

  for (let i = 0; i < total; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    layer.appendChild(block);
  }
}

// Create layers
createBlocks('.layer1');
createBlocks('.layer2');
createBlocks('.layer3');

// Anime.js grid options
const options = { from: 'center' }

// Smooth infinite animation for each block
function animateLayer(selector, moveRange, durationRange, rotateRange) {
  const blocks = document.querySelectorAll(selector);

  blocks.forEach(block => {
    function smoothAnimate() {
      anime({
        targets: block,
        translateX: anime.random(-moveRange, moveRange),
        translateY: anime.random(-moveRange, moveRange),
        rotate: anime.random(-rotateRange, rotateRange),
        scale: anime.random(90, 110) / 100,
        opacity: anime.random(7, 10) / 10,
        easing: 'easeInOutQuad',     // smoother transition
        duration: anime.random(durationRange[0], durationRange[1]),
        complete: smoothAnimate,     // 🔁 nonstop smooth loop
      });
    }
    smoothAnimate();
  });
}

// Apply layers with smooth depth motion
animateLayer('.layer1 .block',  [3000, 5000], 90);   // front (fastest)
animateLayer('.layer2 .block', 25, [4000, 6500], 60);   // middle
animateLayer('.layer3 .block', 15, [5000, 8000], 45);   // back (slowest)


// Layer 1 - fast movement (front)
anime.timeline({ loop: true })
  .add({
    targets: '.layer1 .layer2 .layer3 .block',
    scale: anime.stagger([1.5, 0.7], options),
    translateX: anime.stagger([-30, 30], options),
    translateY: anime.stagger([-30, 30], options),
    rotate: anime.stagger([0, 360], options),
    opacity: anime.stagger([1, 0.2], options),
    easing: 'easeInOutSine',
    delay: anime.stagger(40, options),
    duration: 2500
  });

// Layer 2 - medium movement
// anime.timeline({ loop: true })
//   .add({
//     targets: '.layer2 .block',
//     scale: anime.stagger([1.3, 0.8], options),
//     translateX: anime.stagger([-20, 20], options),
//     translateY: anime.stagger([-20, 20], options),
//     rotate: anime.stagger([0, 360], options),
//     opacity: anime.stagger([1, 0.3], options),
//     easing: 'easeInOutSine',
//     delay: anime.stagger(60, options),
//     duration: 2500
//   });

// // Layer 3 - slowest (background)
// anime.timeline({ loop: true })
//   .add({
//     targets: '.layer3 .block',
//     scale: anime.stagger([1.1, 0.9], options),
//     translateX: anime.stagger([-10, 10], options),
//     translateY: anime.stagger([-10, 10], options),
//     rotate: anime.stagger([0, 360], options),
//     opacity: anime.stagger([1, 0.2], options),
//     easing: 'easeInOutSine',
//     delay: anime.stagger(80, options),
//     duration: 2500
//   });
