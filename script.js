// === ORDER VIA WHATSAPP ===
function orderToken(token, price) {
  const phone = "6281244170370"; // GANTI nomor kamu di sini (tanpa 0)
  const message = `Halo, saya mau pesan paket ${token} Token seharga Rp${price}.`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

document.getElementById("orderForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const phone = "6281244170370"; // Nomor WA kamu
  const token = document.getElementById("token").value;
  const method = document.getElementById("method").value;
  const club = document.getElementById("club").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const payment = document.getElementById("payment").value;

  if (!token || !method || !club || !email || !password || !payment) {
    alert("⚠️ Semua kolom wajib diisi dulu!");
    return;
  }

  // Data pembayaran
  let paymentText = "";
  if (payment === "BCA") {
    paymentText = `🏦 BCA: 8300230408 a.n. Subhan Fajri`;
  } else if (payment === "DANA") {
    paymentText = `📱 DANA: 081244170370`;
  } else if (payment === "PayPal") {
    paymentText = `💸 PayPal: cirooarsa@gmail.com`;
  }

  // Konfirmasi sebelum kirim
  const konfirmasi = confirm(
    `Pastikan data sudah benar:\n\n` +
      `💠 Paket: ${token}\n` +
      `🔑 Login Via: ${method}\n` +
      `⚽ Nama Club: ${club}\n` +
      `📧 Email: ${email}\n` +
      `🔐 Password: ${password}\n` +
      `💳 Pembayaran: ${paymentText}\n\n` +
      `Kirim ke WhatsApp penjoki?`
  );

  if (konfirmasi) {
    const pesan =
      `Halo, saya mau pesan ${token}\n` +
      `Login Via: ${method}\n` +
      `Nama Club: ${club}\n` +
      `Email: ${email}\n` +
      `Password: ${password}\n\n` +
      `💳 Pembayaran via:\n${paymentText}\n\n` +
      `⚠️ Harap kirim bukti transfer setelah pembayaran.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(pesan)}`;
    window.location.href = url;
  }
});

// === LOGO MUTER DI TEPI-TEPI LAYAR (super smooth & lambat) ===
const logo = document.querySelector(".logo-wrapper");

if (logo) {
  const speed = 50; // pixel per detik (lebih kecil = lebih pelan)
  const delayStart = 10000; // jeda 10 detik sebelum mulai muter
  const margin = 30;

  let x = margin;
  let y = margin;
  let dirX = 1;
  let dirY = 0;

  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;
  const logoSize = 200;

  let lastTime = null;

  function moveLogo(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const delta = (timestamp - lastTime) / 1000; // detik antar frame
    lastTime = timestamp;

    const moveDist = speed * delta;

    // Update posisi berdasarkan arah
    x += dirX * moveDist;
    y += dirY * moveDist;

    // Batas kanan
    if (x + logoSize >= screenWidth - margin && dirX === 1) {
      dirX = 0;
      dirY = 1;
      x = screenWidth - logoSize - margin;
    }
    // Batas bawah
    else if (y + logoSize >= screenHeight - margin && dirY === 1) {
      dirY = 0;
      dirX = -1;
      y = screenHeight - logoSize - margin;
    }
    // Batas kiri
    else if (x <= margin && dirX === -1) {
      dirX = 0;
      dirY = -1;
      x = margin;
    }
    // Batas atas
    else if (y <= margin && dirY === -1) {
      dirY = 0;
      dirX = 1;
      y = margin;
    }

    logo.style.left = `${x}px`;
    logo.style.top = `${y}px`;

    requestAnimationFrame(moveLogo);
  }

  // Jalankan animasi setelah delay
  setTimeout(() => {
    requestAnimationFrame(moveLogo);
  }, delayStart);

  // Update ukuran layar kalau berubah
  window.addEventListener("resize", () => {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
  });
}
