/// ===================== LOGIN SECTION =====================
const users = [
  { email: "derihanggara86@gmail.com", password: "Embun2017" },
  { email: "anugrah@indosat.com", password: "anugrah2025" }
];

// ✅ Mapping foto untuk user berdasarkan email
const userPhotos = {
  "derihanggara86@gmail.com": "https://i.postimg.cc/Fzryv9tm/call-center.png",
  "anugrah@indosat.com": "https://i.postimg.cc/cCynBx79/FAFA.jpg"
};

// ===================== FUNGSI LOGIN =====================
async function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPassword").value.trim();
  const err = document.getElementById("loginError");

  // ✅ Tampilkan Loader
  showLoader();

  // Simulasi proses login
  setTimeout(() => {
    const user = users.find((u) => u.email === email && u.password === pass);
    if (user) {
      err.textContent = "";

      // ✅ Tampilkan dashboard, sembunyikan login page
      document.getElementById("loginPage").style.display = "none";
      document.querySelector("header").style.display = "flex";
      document.querySelector("main").style.display = "block";

      // ✅ Tampilkan tanggal hari ini
      const now = new Date();
      document.getElementById(
        "current-date"
      ).textContent = now.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      // ✅ Simpan user yang login di localStorage
      localStorage.setItem("currentUser", user.email);

      // ✅ Tampilkan foto & nama user
      const userInfoImg = document.querySelector(".user-info img");
      const userInfoText = document.querySelector(".user-info span");
      const photoURL =
        userPhotos[user.email] ||
        "https://cdn-icons-png.flaticon.com/512/149/149071.png";

      userInfoImg.src = photoURL;
      userInfoText.textContent = user.email.split("@")[0];
    } else {
      err.textContent = "❌ Email atau password salah!";
    }

    // ✅ Sembunyikan loader setelah selesai
    hideLoader();
  }, 1200);
}

// ===================== ATURAN TAMPILAN AWAL =====================
window.addEventListener("DOMContentLoaded", () => {
  // Saat halaman pertama kali dibuka, tampilkan hanya login page
  document.querySelector("header").style.display = "none";
  document.querySelector("main").style.display = "none";
  document.getElementById("loginPage").style.display = "flex";

  // Jika sebelumnya user sudah login (session tersimpan)
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    document.getElementById("loginPage").style.display = "none";
    document.querySelector("header").style.display = "flex";
    document.querySelector("main").style.display = "block";

    const userInfoImg = document.querySelector(".user-info img");
    const userInfoText = document.querySelector(".user-info span");
    const photoURL =
      userPhotos[savedUser] ||
      "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    userInfoImg.src = photoURL;
    userInfoText.textContent = savedUser.split("@")[0];
  }
});
// ===================== FUNGSI LOGOUT =====================
function logout() {
  showLoader(); // ✅ Tampilkan loader saat logout

  setTimeout(() => {
    document.getElementById("loginPage").style.display = "flex";
    document.querySelector("header").style.display = "none";
    document.querySelector("main").style.display = "none";
    document.getElementById("reportSection").style.display = "none";
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";

    // ✅ Hapus info user yang aktif
    localStorage.removeItem("currentUser");

    // Kosongkan job number
    document.getElementById("jobNumber").textContent = "";

    hideLoader(); // ✅ Sembunyikan loader
  }, 1000);
}

// ===================== TOGGLE PASSWORD =====================
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("loginPassword");

togglePassword.addEventListener("click", () => {
  const isVisible = passwordInput.type === "text";
  passwordInput.type = isVisible ? "password" : "text";

  // Ubah isi SVG di dalam span, bukan outerHTML
  togglePassword.innerHTML = isVisible
    ? `<svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>`
    : `<svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.26 18.26 0 0 1 4.47-5.94M1 1l22 22"/>
          <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88"/>
        </svg>`;
});

// ===================== FUNGSI LOADER =====================
function showLoader() {
  document.getElementById("loader").style.display = "flex";
}
function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

// ===================== Tampilkan tanggal otomatis =====================
document.getElementById(
  "current-date"
).textContent = new Date().toLocaleDateString("id-ID", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

// ===================== PANEL MENU =====================
function togglePanel() {
  document.getElementById("slidePanel").classList.toggle("open");
}

// ===================== LOADER CONTROL =====================
function showLoader() {
  document.getElementById("loaderOverlay").classList.add("active");
}

function hideLoader() {
  document.getElementById("loaderOverlay").classList.remove("active");
}

// ✅ Fungsi pembungkus agar loader muncul dulu, baru jalankan fungsi target
function showLoaderAndRun(callback) {
  showLoader();

  // Simulasi waktu pemrosesan (misal ambil data dari localStorage / server)
  setTimeout(() => {
    try {
      callback(); // Jalankan fungsi target
    } finally {
      hideLoader(); // Pastikan loader selalu hilang
    }
  }, 800); // Loader muncul setidaknya 0.8 detik agar terasa
}

// ===================== CONTOH FUNGSI =====================
function showForm() {
  console.log("Menampilkan Form Pekerjaan...");
  alert("Form Pekerjaan terbuka!");
}

function showReport() {
  console.log("Menampilkan Laporan Pekerjaan...");
  alert("Laporan Pekerjaan terbuka!");
}

function showPhotoReport() {
  console.log("Menampilkan Laporan Foto...");
  alert("Laporan Foto per Nomor Pekerjaan terbuka!");
}
// ===================== JOB NUMBER =====================
function generateJobNumber() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    alert("Silakan login terlebih dahulu!");
    return;
  }

  // Key localStorage unik berdasarkan email user
  const key = `lastJobNumber_${currentUser}`;

  let last = localStorage.getItem(key);
  if (!last) last = 0;
  let next = parseInt(last) + 1;

  // Simpan kembali
  localStorage.setItem(key, next);

  const formatted = `JB : ${String(next).padStart(3, "0")}`;
  document.getElementById("jobNumber").textContent = formatted;

  // 🕒 Tampilkan tanggal di bawah job number
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("id-ID", {
    dateStyle: "short",
    timeStyle: "medium"
  });
  document.getElementById("current-date").textContent = formattedDate;
}

// ===================== FORM HANDLER =====================
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit-btn");
  if (!submitBtn) return;

  submitBtn.addEventListener("click", async function () {
    const fileInput = document.querySelector("input[type='file']");
    let fotoUrl = "";

    // === Upload foto ke base64 ===
    if (fileInput && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      fotoUrl = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }

    // === Dapatkan tanggal terbaru ===
    const tanggalSekarang = new Date().toLocaleString("id-ID", {
      dateStyle: "short",
      timeStyle: "medium"
    });

    // === Kumpulkan semua data form ===
    const formData = {
      "Job Number": document.getElementById("jobNumber").textContent,
      Tanggal: tanggalSekarang, // ✅ DITAMBAHKAN DI SINI
      "User name": document.getElementById("user").value,
      "working type": document.getElementById("workingType").value,
      "installation type": document.getElementById("installationType").value,
      "Merk kendaraan": document.getElementById("merkKendaraan").value,
      "Vehicle type": document.getElementById("vehicleType").value,
      "Lisence plate": document.getElementById("licensePlate").value,
      "Vehicle id": document.getElementById("vehicleId").value,
      Department: document.getElementById("department").value,
      Colour: document.getElementById("colour").value,
      Location: document.getElementById("location").value,
      "GPS Serial No": document.getElementById("gpsSerial").value,
      "GPS Unit ID": document.getElementById("gpsUnitId").value,
      GSM: document.getElementById("gsm").value,
      Distance: document.getElementById("distance").value,
      "GPS Unit Module": getStatus("gps"),
      "RFID Reader": getStatus("rfid"),
      Buzzer: getStatus("buzzer"),
      "Stater interupter": getStatus("starter"),
      "Fuel stick": getStatus("fuel"),
      Mesin: getStatus("d-mesin"),
      "Panel Dasbord": getStatus("d-paneldashboard"),
      Klakson: getStatus("d-klakson"),
      Audio: getStatus("d-audio"),
      "Sistem listrik": getStatus("d-listrik"),
      AC: getStatus("d-ac"),
      "Power windows": getStatus("d-powerwindows"),
      "Panel Instrument": getStatus("d-panelinstrument"),
      Spion: getStatus("d-spion"),
      "Deskripsi Pekerjaan": document.getElementById("deskripsiPekerjaan")
        .value,
      "Progres Status": document.getElementById("progressStatus").value,
      "Upload foto Bukti": fotoUrl
    };

    console.log("📤 Mengirim:", formData);
    await sendToGoogleSheet(formData);
    generateJobNumber();
  });
});

// ===================== HELPER FUNCTION =====================
function getStatus(name) {
  const checked = document.querySelector(`input[name='${name}']:checked`);
  return checked ? checked.parentElement.textContent.trim() : "";
}

// ===================== KIRIM KE GOOGLE SHEET =====================
async function sendToGoogleSheet(formData) {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyW6bQ8QS6Ba0sJzc6CzmUiCaAwaFuFetKhewZCQxsa2mv9aHep7nyeuPS1sZENNkWz/exec";

  const loader = document.getElementById("loaderOverlay");
  loader.style.display = "flex";

  try {
    await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    });

    alert("✅ Data dan foto berhasil disimpan!");

    const form = document.getElementById("jobForm");
    if (form) form.reset();

    document.getElementById("jobNumber").textContent = "";
    document.getElementById("current-date").textContent = "";

    if (typeof generateJobNumber === "function") generateJobNumber();
  } catch (error) {
    alert("❌ Gagal mengirim data ke Google Sheet!\n" + error.message);
  } finally {
    loader.style.display = "none";
  }
}

// ===================== TAMPIL / SEMBUNYIKAN PANEL =====================

// ✅ Tampilkan Form Input
function showForm() {
  document.querySelector("main").style.display = "block"; // Tampilkan form utama
  document.getElementById("reportSection").style.display = "none";
  document.getElementById("photoReportSection").style.display = "none";
  document.getElementById("slidePanel").classList.remove("open"); // Tutup menu
}

// ✅ Tampilkan Laporan Pekerjaan
function showReport() {
  document.querySelector("main").style.display = "none"; // Sembunyikan form utama
  document.getElementById("reportSection").style.display = "block"; // Tampilkan laporan pekerjaan
  document.getElementById("photoReportSection").style.display = "none"; // Sembunyikan laporan foto
  loadReport(); // Muat data laporan pekerjaan
  document.getElementById("slidePanel").classList.remove("open"); // Tutup menu
}

// ✅ Tampilkan Laporan Foto per Nomor Pekerjaan
function showPhotoReport() {
  document.querySelector("main").style.display = "none"; // Sembunyikan form utama
  document.getElementById("reportSection").style.display = "none"; // Sembunyikan laporan pekerjaan
  document.getElementById("photoReportSection").style.display = "block"; // Tampilkan laporan foto
  loadPhotoReport(); // Muat data foto
  document.getElementById("slidePanel").classList.remove("open"); // Tutup menu
}

/* ===================== LOAD LAPORAN PEKERJAAN ===================== */
const rowsPerPage = 20;
let currentPage = 1;
let allReportData = [];

// ===================== LOAD DATA LAPORAN =====================
async function loadReport() {
  const tableBody = document.querySelector("#reportTable tbody");

  // 🌀 Loader animasi
  tableBody.innerHTML = `
    <tr>
      <td colspan="17" style="text-align:center; font-weight:500; font-size:15px;">
        <div style="display:flex; align-items:center; justify-content:center; gap:10px;">
          <div class="loader"></div>
          <span>Memuat data laporan, mohon tunggu...</span>
        </div>
      </td>
    </tr>`;

  try {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyW6bQ8QS6Ba0sJzc6CzmUiCaAwaFuFetKhewZCQxsa2mv9aHep7nyeuPS1sZENNkWz/exec";
    const response = await fetch(scriptURL);

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    console.log("📥 Data Laporan:", data);

    allReportData = data;
    currentPage = 1;
    renderReportTable();
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="18" style="text-align:center;">❌ Gagal memuat data!</td></tr>`;
    console.error("❌ Error load report:", error);
  }
}

// ===================== RENDER TABEL =====================
function renderReportTable() {
  const tableBody = document.querySelector("#reportTable tbody");
  tableBody.innerHTML = "";

  if (!allReportData || allReportData.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="18" style="text-align:center;">❌ Tidak ada data laporan</td></tr>`;
    return;
  }

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = allReportData.slice(start, end);

  pageData.forEach((item, i) => {
    const row = document.createElement("tr");
    const photoField = item["Foto Bukti"] || item["Upload foto Bukti"] || "";
    const tanggal = item["Tanggal"] || ""; // ✅ Ambil data tanggal dari sheet

    row.innerHTML = `
      <td>${start + i + 1}</td>
      <td>${item["Job Number"] || ""}</td>
      <td>${tanggal}</td> <!-- ✅ Tampilkan tanggal -->
      <td>${item["User name"] || ""}</td>
      <td>${item["working type"] || ""}</td>
      <td>${item["installation type"] || ""}</td>
      <td>${item["Merk kendaraan"] || ""}</td>
      <td>${item["Vehicle type"] || ""}</td>
      <td>${item["Lisence plate"] || ""}</td>
      <td>${item["Vehicle id"] || ""}</td>
      <td>${item["Department"] || ""}</td>
      <td>${item["GPS Serial No"] || ""}</td>
      <td>${item["GPS Unit ID"] || ""}</td>
      <td>${item["GSM"] || ""}</td>
      <td>${item["Progres Status"] || ""}</td>
      <td class="desc-cell">${item["Deskripsi Pekerjaan"] || ""}</td>
      <td>${renderPhotoCell(photoField)}</td>
      <td><button class="view-btn" onclick='openDetail(${JSON.stringify(
        item
      )})'>Detail</button></td>
    `;
    tableBody.appendChild(row);
  });

  renderPaginationNumbers();
}

// ===================== PAGINATION DENGAN ANGKA =====================
function renderPaginationNumbers() {
  const totalPages = Math.ceil(allReportData.length / rowsPerPage);
  let paginationContainer = document.getElementById("pagination");

  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.id = "pagination";
    paginationContainer.style.textAlign = "center";
    paginationContainer.style.margin = "15px 0";
    paginationContainer.style.userSelect = "none";
    document.querySelector(".table-responsive").after(paginationContainer);
  }

  let buttonsHTML = `<span class="page-btn" onclick="changePage(-1)" ${
    currentPage === 1 ? "style='opacity:0.5;pointer-events:none;'" : ""
  }>⬅</span>`;

  for (let i = 1; i <= totalPages; i++) {
    buttonsHTML += `
      <span class="page-number ${
        i === currentPage ? "active" : ""
      }" onclick="goToPage(${i})">${i}</span>
    `;
  }

  buttonsHTML += `<span class="page-btn" onclick="changePage(1)" ${
    currentPage === totalPages ? "style='opacity:0.5;pointer-events:none;'" : ""
  }>➡</span>`;

  paginationContainer.innerHTML = buttonsHTML;
}

function goToPage(page) {
  currentPage = page;
  renderReportTable();
  document
    .querySelector(".table-responsive")
    .scrollIntoView({ behavior: "smooth" });
}

function changePage(direction) {
  const totalPages = Math.ceil(allReportData.length / rowsPerPage);
  const newPage = currentPage + direction;

  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage;
    renderReportTable();
    document
      .querySelector(".table-responsive")
      .scrollIntoView({ behavior: "smooth" });
  }
}

// ===================== RENDER FOTO =====================
function renderPhotoCell(photoField) {
  if (!photoField) return "❌ Tidak ada foto";
  if (photoField.startsWith("http")) {
    return `<a href="${photoField}" target="_blank">📷 Lihat</a>`;
  }
  return photoField;
}

async function downloadReportWithPhotos() {
  const table = document.getElementById("reportTable");
  if (!table) return alert("Tabel tidak ditemukan!");

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Report");

  // ===== Ambil header =====
  const headers = Array.from(table.querySelectorAll("thead th")).map((th) =>
    th.innerText.trim()
  );
  sheet.addRow(headers);

  // ===== Ambil data =====
  const rows = Array.from(table.querySelectorAll("tbody tr"));
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll("td");
    const rowValues = [];

    for (let j = 0; j < cells.length; j++) {
      const img = cells[j].querySelector("img");
      if (img) {
        rowValues.push(""); // placeholder untuk gambar
      } else {
        rowValues.push(cells[j].innerText.trim());
      }
    }

    const addedRow = sheet.addRow(rowValues);

    // ===== Tambahkan gambar =====
    for (let j = 0; j < cells.length; j++) {
      const img = cells[j].querySelector("img");
      if (img) {
        try {
          const response = await fetch(img.src);
          const blob = await response.blob();
          const arrayBuffer = await blob.arrayBuffer();

          const imageId = workbook.addImage({
            buffer: arrayBuffer,
            extension: "jpeg"
          });

          // Letakkan gambar di sel
          sheet.addImage(imageId, {
            tl: { col: j, row: i + 1 },
            ext: { width: 80, height: 60 }
          });
        } catch (err) {
          console.error("Gagal menambahkan gambar:", err);
        }
      }
    }
  }

  // Styling dasar
  sheet.columns.forEach((col) => (col.width = 20));
  sheet.getRow(1).font = { bold: true };

  // Download file
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer]),
    `report_${new Date().toISOString().split("T")[0]}.xlsx`
  );
}

// ===================== LOAD LAPORAN FOTO =====================
async function loadPhotoReport() {
  const tableBody = document.querySelector("#photoReportTable tbody");
  const paginationContainer = document.getElementById("photoPagination");

  tableBody.innerHTML = `
    <tr>
      <td colspan="8" style="text-align:center; font-weight:500; font-size:15px;">
        <div style="display:flex; align-items:center; justify-content:center; gap:10px;">
          <div class="loader"></div>
          <span>Memuat data foto, mohon tunggu...</span>
        </div>
      </td>
    </tr>
  `;

  try {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyW6bQ8QS6Ba0sJzc6CzmUiCaAwaFuFetKhewZCQxsa2mv9aHep7nyeuPS1sZENNkWz/exec";

    console.log("📡 Fetching data from:", scriptURL);
    const response = await fetch(scriptURL);

    // 🛑 Jika tidak 200 OK
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status} - ${response.statusText}`);
    }

    // 🧠 Coba parse JSON dengan aman
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      const textData = await response.text();
      console.error("⚠️ Response bukan JSON valid:", textData);
      throw new Error("Response dari server bukan format JSON valid");
    }

    console.log("✅ Data diterima:", data);

    // 🔍 Filter data yang memiliki foto
    const filteredData = data.filter(
      (item) => item["Upload foto Bukti"] || item["Foto Bukti"]
    );

    if (filteredData.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;">📭 Tidak ada foto tersimpan</td></tr>`;
      paginationContainer.innerHTML = "";
      return;
    }

    // 📖 Pagination
    const rowsPerPage = 10;
    let currentPage = 1;
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    function renderPage(page) {
      tableBody.innerHTML = "";
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      const pageData = filteredData.slice(start, end);

      pageData.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${start + index + 1}</td>
          <td>${item["Job Number"] || ""}</td>
          <td>${item["User name"] || ""}</td>
          <td>${item["Department"] || ""}</td>
          <td>${item["Vehicle id"] || ""}</td>
          <td>${item["Progres Status"] || ""}</td>
          <td>${
            item["Deskripsi Pekerjaan"] || "<i>Tidak ada deskripsi</i>"
          }</td>
          <td>${renderPhotoCell(
            item["Upload foto Bukti"] || item["Foto Bukti"]
          )}</td>
        `;
        tableBody.appendChild(row);
      });

      renderPagination(page);
      window.scrollTo({ top: tableBody.offsetTop - 100, behavior: "smooth" });
    }

    // 🔢 Pagination angka
    function renderPagination(activePage) {
      paginationContainer.innerHTML = "";
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = `page-number ${i === activePage ? "active" : ""}`;
        btn.onclick = () => renderPage(i);
        paginationContainer.appendChild(btn);
      }
    }

    renderPage(currentPage);
  } catch (err) {
    console.error("❌ Error load photo report:", err);
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;">❌ Gagal memuat data!<br><small>${err.message}</small></td></tr>`;
  }
}

// === UTILITAS: Tampilkan Foto ===
function renderPhotoCell(url) {
  if (!url) return "<span style='color:#aaa;'>📷 Tidak ada foto</span>";
  let fileId = "";
  const patterns = [
    /\/d\/([a-zA-Z0-9_-]{25,})/,
    /id=([a-zA-Z0-9_-]{25,})/,
    /open\?id=([a-zA-Z0-9_-]{25,})/,
    /file\/d\/([a-zA-Z0-9_-]{25,})/,
    /uc\?export=view&id=([a-zA-Z0-9_-]{25,})/,
    /([a-zA-Z0-9_-]{25,})/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      fileId = match[1];
      break;
    }
  }

  const photoURL = fileId
    ? `https://lh3.googleusercontent.com/d/${fileId}=s220`
    : url;

  return `
    <a href="https://drive.google.com/file/d/${fileId}/view" target="_blank" title="Klik untuk lihat foto">
      <img src="${photoURL}"
           alt="Foto Bukti"
           onerror="this.onerror=null;this.src='https://cdn-icons-png.flaticon.com/512/1828/1828665.png';"
           style="width:70px;height:70px;border-radius:10px;object-fit:cover;box-shadow:0 0 3px rgba(0,0,0,0.3);cursor:pointer;">
    </a>
  `;
}
// ===================== MODAL DETAIL =====================
function openDetail(item = {}) {
  const modal = document.getElementById("detailModal");
  const modalContent = document.getElementById("detailContent");
  modal.style.display = "block";

  // ================= Bagian C – Hasil Uji =================
  const bagianCKeys = [
    "GPS Unit Module",
    "RFID Reader",
    "Buzzer",
    "Stater interupter",
    "Fuel stick"
  ];
  const hasilUji = bagianCKeys.map((key) => ({
    jobDescription: key,
    status: item[key] || "",
    note: "",
    checked: item[key] === "OK"
  }));

  // ================= Bagian D – Komponen =================
  const bagianDKeys = [
    "Mesin",
    "Panel Dasbord",
    "Klakson",
    "Audio",
    "Sistem listrik",
    "AC",
    "Power windows",
    "Panel Instrument",
    "Spion"
  ];
  const bagD = bagianDKeys.map((key) => ({
    deskripsi: item[key + "_desc"] || "",
    OK: (item[key] || "").toLowerCase() === "ok",
    NotOK: (item[key] || "").toLowerCase() === "not ok",
    NA: (item[key] || "").toLowerCase() === "na"
  }));

  // ================= Bagian E – Deskripsi Pekerjaan =================
  const deskripsiPekerjaan = (item["Deskripsi Pekerjaan"] || "").replace(
    /\r\n|\r/g,
    "\n"
  );

  // ===================== TANGGAL / HARI UPDATE OTOMATIS =====================
  const now = new Date();
  const hariList = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
  ];
  const hari = hariList[now.getDay()];
  const tanggal = now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // 🔄 Jika belum ada hari update, buat otomatis
  if (!item["Hari Update"]) {
    item["Hari Update"] = `${hari}, ${tanggal}`;

    // Simpan ke localStorage agar tidak berubah lagi
    let allData = JSON.parse(localStorage.getItem("jobReports") || "[]");
    const index = allData.findIndex(
      (d) => d["Job Number"] === item["Job Number"]
    );

    if (index !== -1) {
      allData[index]["Hari Update"] = item["Hari Update"];
    } else {
      allData.push(item);
    }

    localStorage.setItem("jobReports", JSON.stringify(allData));
  }

  // ===================== HTML MODAL HEADER =====================
  const html = `
<!-- HEADER LOGO + INFO PERUSAHAAN -->
<div class="modal-header" style="
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  padding-bottom: 12px; 
  border-bottom: 2px solid #444;
  margin-bottom: 20px;">
  
  <!-- Logo -->
  <div style="flex: 0 0 120px; text-align: center;">
    <img src="https://i.postimg.cc/CLr4t8vR/indosat.webp" alt="Logo" style="height: 85px;">
  </div>

  <!-- Informasi Perusahaan -->
  <div style="flex: 1; text-align: left; padding-left: 20px;">
    <h1 style="margin: 0; font-size: 26px; letter-spacing: 0.5px; color: #222;">Indosat Ooredoo & Pertamina Jambi Project</h1>
    <h2 style="margin: 5px 0 10px; font-size: 20px; color: #555;">Laporan Pekerjaan (Job Report)</h2>
    <p style="margin: 4px 0; font-size: 15px;"><strong>Alamat Perwakilan:</strong> Kenali Asam Atas, Kec. Kota Baru, Kota Jambi, Jambi 36129</p>
    <p style="margin: 4px 0; font-size: 15px;"><strong>Kota:</strong> Jambi</p>
    <p style="margin: 4px 0; font-size: 15px;"><strong>WhatsApp:</strong> DA. 0852-6762-7060 &nbsp; | &nbsp; Teknisi VTS 0895-3822-81515</p>
  </div>
</div>

<!-- NOMOR PEKERJAAN + HARI UPDATE -->
<div class="job-number" style="
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  background: #f8fafc; 
  border: 1px solid #ccc; 
  padding: 10px 14px; 
  border-radius: 6px; 
  margin-bottom: 20px;
  font-size: 15px;">
  <div>
    <strong>No. Pekerjaan:</strong> <span id="jobNumber">${
      item["Job Number"] || ""
    }</span>
  </div>
  <div style="color: #333;">
    <strong>${item["Hari Update"]}</strong>
  </div>
</div>

<form id="jobForm">
  <!-- BAGIAN A -->
  <div class="form-section">
    <h2>Bagian A – Informasi Pekerjaan</h2>
    <div class="grid-3">
      <div><label>User Name</label><input type="text" value="${
        item["User name"] || ""
      }"></div>
      <div><label>Working Type</label><input type="text" value="${
        item["working type"] || ""
      }"></div>
      <div><label>Installation Type</label><input type="text" value="${
        item["installation type"] || ""
      }"></div>
    </div>
  </div>


      <!-- BAGIAN B -->
      <div class="form-section">
        <h2>Bagian B – Informasi Kendaraan</h2>
        <div class="grid-3">
          ${[
            "Merk kendaraan",
            "Vehicle type",
            "Lisence plate",
            "Vehicle id",
            "Department",
            "Colour",
            "Location",
            "GPS Serial No",
            "GPS Unit ID",
            "GSM",
            "Distance"
          ]
            .map(
              (key) => `
              <div><label>${key}</label><input type="${
                key === "Distance" ? "number" : "text"
              }" value="${item[key] || ""}"></div>
            `
            )
            .join("")}
        </div>
      </div>

  <!-- BAGIAN C -->
<div class="form-section" style="font-size: 14px;">
  <h2>Bagian C – Hasil Uji dan Laporan</h2>
  <table class="table-compact" style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #ccc; text-align: center;">
    <thead>
      <tr style="background-color: #f1f1f1;">
        <th style="padding: 6px; border: 1px solid #ccc;">No</th>
        <th style="padding: 6px; border: 1px solid #ccc; text-align: left;">Job Description</th>
        <th style="padding: 6px; border: 1px solid #ccc;">OK</th>
        <th style="padding: 6px; border: 1px solid #ccc;">Not OK</th>
        <th style="padding: 6px; border: 1px solid #ccc;">N/A</th>
        <th style="padding: 6px; border: 1px solid #ccc;">Status Update</th>
      </tr>
    </thead>
    <tbody>
      ${hasilUji
        .map(
          (row, idx) => `
        <tr>
          <td style="padding: 5px; border: 1px solid #ddd;">${idx + 1}</td>
          <td style="padding: 5px 8px; border: 1px solid #ddd; text-align: left;">${
            row.jobDescription
          }</td>
          <td style="border: 1px solid #ddd;"><input type="checkbox" ${
            row.status === "OK" ? "checked" : ""
          }></td>
          <td style="border: 1px solid #ddd;"><input type="checkbox" ${
            row.status === "Not OK" ? "checked" : ""
          }></td>
          <td style="border: 1px solid #ddd;"><input type="checkbox" ${
            row.status === "NA" ? "checked" : ""
          }></td>
          <td style="border: 1px solid #ddd;"><input type="checkbox" ${
            row.checked ? "checked" : ""
          }></td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>
</div>

<!-- BAGIAN D -->
<div class="form-section" style="font-size: 15px;">
  <h2>Bagian D – Descriptions (Uraian Pemeriksaan)</h2>
  <table class="table-compact">
    <thead>
      <tr>
        <th>No</th>
        <th>Komponen</th>
        <th>OK</th>
        <th>Not OK</th>
        <th>N/A</th>
      </tr>
    </thead>
    <tbody>
      ${bagD
        .map(
          (row, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${bagianDKeys[i]}</td>
          <td><input type="checkbox" ${row.OK ? "checked" : ""}></td>
          <td><input type="checkbox" ${row.NotOK ? "checked" : ""}></td>
          <td><input type="checkbox" ${row.NA ? "checked" : ""}></td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>
</div>

<!-- BAGIAN E -->
<div class="form-section bagian-e">
  <h2>Bagian E – Laporan Pekerjaan</h2>
  <div class="grid-3">
    <div style="grid-column:1/-1;">
      <label>Deskripsi Pekerjaan</label>
      <div style="width: 100%; white-space: pre-line; border: 1px solid #ccc; padding: 8px; min-height: 80px; font-size: 16px;">
        ${deskripsiPekerjaan.replace(/\n/g, "<br>")}
      </div>
    </div>

    <!-- Tambahan: Jam Awal dan Jam Akhir -->
    <div>
      <label>Jam Awal</label>
      <input type="time" value="${
        item["Jam Awal"] || ""
      }" style="width: 100%; font-size: 16px;">
    </div>
    <div>
      <label>Jam Akhir</label>
      <input type="time" value="${
        item["Jam Akhir"] || ""
      }" style="width: 100%; font-size: 16px;">
    </div>

    <div>
      <label>Progress Status</label>
      <input type="text" value="${
        item["Progres Status"] || ""
      }" style="width: 100%; font-size: 16px;">
    </div>
  </div>
</div>

<!-- TANDA TANGAN -->
<div style="grid-column:1/-1; margin-top:20px;">
  <table style="width:100%; border-collapse: collapse; text-align:center; font-size:14px;">
    <thead>
      <tr>
        <th style="border-top:1px solid #000; padding:5px;">EOS</th>
        <th style="border-top:1px solid #000; padding:5px;">Data Analis</th>
        <th style="border-top:1px solid #000; padding:5px;">User</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding:40px 5px; vertical-align:bottom;">&nbsp;</td>
        <td style="padding:40px 5px; vertical-align:bottom;">&nbsp;</td>
        <td style="padding:40px 5px; vertical-align:bottom;">&nbsp;</td>
      </tr>
    </tbody>
  </table>
</div>

     <div class="modal-footer">
        <button type="button" onclick="closeDetail()">Tutup</button>
        <button type="button" onclick="downloadPDF()">Download PDF</button>
      </div>
    </form>
  `;

  modalContent.innerHTML = html;
}

// Tutup modal
function closeDetail() {
  const modal = document.getElementById("detailModal");
  modal.style.display = "none";
  document.getElementById("detailContent").innerHTML = "";
}

window.addEventListener("click", function (event) {
  const modal = document.getElementById("detailModal");
  if (event.target === modal) closeDetail();
});

async function downloadPDF() {
  const original = document.getElementById("detailContent");

  // ✅ Sembunyikan elemen yang tidak ingin ikut PDF
  const hideElements = original.querySelectorAll(".no-print, button");
  hideElements.forEach((el) => (el.style.display = "none"));

  // ✅ Clone elemen agar tidak mengganggu tampilan asli
  const clone = original.cloneNode(true);
  clone.style.maxHeight = "none";
  clone.style.overflow = "visible";
  clone.style.height = "auto";
  clone.style.position = "absolute";
  clone.style.top = "-9999px";
  clone.style.left = "0";
  clone.style.width = "1400px"; // Lebar besar agar tabel tidak pecah
  clone.style.background = "#fff";

  document.body.appendChild(clone);

  // ✅ Tambahkan border tebal agar tabel jelas di PDF
  clone.querySelectorAll("table").forEach((table) => {
    table.style.border = "2px solid #000";
  });

  // ✅ Render ke canvas resolusi tinggi
  const canvas = await html2canvas(clone, {
    scale: 3,
    useCORS: true,
    windowWidth: clone.scrollWidth,
    windowHeight: clone.scrollHeight,
    backgroundColor: "#ffffff"
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jspdf.jsPDF("p", "mm", "a4");

  const imgWidth = 210; // mm
  const pageHeight = 295; // mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // ✅ Halaman pertama
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // ✅ Tambahkan halaman berikutnya jika konten panjang
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  // ✅ Simpan file PDF
  pdf.save(`Job_Report_${new Date().toISOString().slice(0, 10)}.pdf`);

  // ✅ Kembalikan tampilan normal
  hideElements.forEach((el) => (el.style.display = ""));
  document.body.removeChild(clone);
}

// ===================== PENCARIAN SPESIFIK BERDASARKAN JOB NUMBER =====================
function filterTable() {
  const searchJob = document.getElementById("searchJob").value.toLowerCase();
  const searchVehicle = document
    .getElementById("searchVehicle")
    .value.toLowerCase();
  const table = document.getElementById("reportTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    const jobCell = rows[i].getElementsByTagName("td")[1]; // Kolom No Pekerjaan
    const vehicleCell = rows[i].getElementsByTagName("td")[9]; // Kolom Vehicle ID

    const matchJob =
      jobCell && jobCell.textContent.toLowerCase().includes(searchJob);
    const matchVehicle =
      vehicleCell &&
      vehicleCell.textContent.toLowerCase().includes(searchVehicle);

    rows[i].style.display = matchJob && matchVehicle ? "" : "none";
  }
}

function clearSearchJob() {
  document.getElementById("searchJob").value = "";
  filterTable(); // Refresh filter setelah input dikosongkan
}

function clearSearchVehicle() {
  document.getElementById("searchVehicle").value = "";
  filterTable(); // Refresh filter setelah input dikosongkan
}