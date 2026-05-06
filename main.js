const images = [
  "assets/image_01.jpg",
  "assets/image_02.jpg",
  "assets/image_03.jpg",
  "assets/image_04.jpg",
];

images.forEach(src => {
  const preload = new Image();
  preload.src = src;
});

const allImgs = document.querySelectorAll(".img-slide");

// Track which images are currently transitioning
const transitioning = new Set();

function getRandomInterval() {
  return Math.floor(Math.random() * 4000) + 1000; // 1s to 2s
}

function getRandomImage(currentSrc) {
  let filtered = images.filter(src => !currentSrc.includes(src.split("/").pop()));
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function startCycling(img) {
  const delay = getRandomInterval();

  setTimeout(() => {
    // Only allow max 2 images transitioning at the same time
    if (transitioning.size >= 2) {
      startCycling(img); // retry after another random delay
      return;
    }

    transitioning.add(img);
    img.classList.add("fade-out");

    setTimeout(() => {
      img.src = getRandomImage(img.src);
      img.classList.remove("fade-out");

      // Wait for transition to fully finish before freeing the slot
      setTimeout(() => {
        transitioning.delete(img);
      }, 900); // matches new transition duration

      startCycling(img);
    }, 900); // matches new transition duration

  }, delay);
}

window.addEventListener("load", () => {
  // Stagger the start of each image so they don't fire together
  allImgs.forEach((img, i) => {
    setTimeout(() => startCycling(img), i * 600);
  });
});