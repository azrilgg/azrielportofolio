// === Golden Intro Script ===

// Efek load bar dan redirect ke index.html setelah animasi selesai
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro-section");

  // Setelah animasi selesai (sekitar 3.2 detik)
  setTimeout(() => {
    intro.style.opacity = "0";
    setTimeout(() => {
  
    }, 800);
  }, 3200);
});