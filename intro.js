// === Golden Intro Script (FIXED) ===
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro-section");

  if (!intro) {
    console.error("❌ Elemen #intro-section tidak ditemukan!");
    return;
  }

  // Pastikan intro mulai terlihat
  intro.style.opacity = "1";
  intro.style.transition = "opacity 0.8s ease";

  // Setelah 3 detik, mulai fade out dan redirect
  setTimeout(() => {
    intro.style.opacity = "0";

    // Setelah fade-out selesai, pindah ke index.html utama
    setTimeout(() => {
      window.location.href = "index.html";
    }, 800);
  }, 3000);
});
