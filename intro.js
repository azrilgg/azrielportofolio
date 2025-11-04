// === Golden Intro Script (FINAL FIX) ===
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro-section");

  // Pastikan elemen ada
  if (!intro) {
    alert("⚠️ Elemen intro-section tidak ditemukan!");
    return;
  }

  console.log("✅ Intro dimulai...");

  // Delay animasi progress bar
  setTimeout(() => {
    intro.style.opacity = "0";
    console.log("🎬 Fade-out mulai...");

    // Setelah fade out selesai, redirect
    setTimeout(() => {
      console.log("➡️ Pindah ke index.html");
      window.location.href = "index.html";
    }, 800);

  }, 3200);
});
