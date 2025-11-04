// === Golden Intro Script ===
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro-section");

  // Setelah animasi progress bar selesai (3 detik)
  setTimeout(() => {
    intro.style.opacity = "0";
    intro.style.transition = "opacity 0.8s ease";

    // Tunggu sedikit, lalu pindah ke halaman utama
    setTimeout(() => {
      window.location.href = "index.html";
    }, 800);
  }, 3000);
});
