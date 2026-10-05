# PRD — Jejak Data Budaya

## 1. PROJECT OVERVIEW

**Nama:** Jejak Data Budaya

**Tagline:** Data Explorer — Petualangan Data di Pasar Budaya

Jejak Data Budaya adalah website edukasi interaktif untuk siswa sekolah dasar yang menggabungkan pembelajaran data/statistika sederhana dengan kearifan lokal Batak Toba, Sumatera Utara.

Website dirancang sebagai aplikasi edukasi interaktif dengan satu pengguna pada satu perangkat. Tidak diperlukan sistem login, registrasi, akun siswa, atau multi-user management.

Siswa diajak mengikuti perjalanan:

**Kenali Budaya → Survei → Input Data → Analisis → Detektif Data → Misi → Data Berubah**

Website menggunakan karakter utama berupa anak detektif Batak Toba yang memakai Ulos dan Sortali sebagai learning guide dan narrator sepanjang perjalanan.

---

## 2. PRODUCT GOALS

Produk bertujuan untuk:

- Mengenalkan budaya Batak Toba melalui konteks yang dekat dengan kehidupan sehari-hari.
- Mengenalkan konsep data dan statistika sederhana kepada siswa sekolah dasar.
- Membuat siswa aktif mengumpulkan dan memasukkan data.
- Membantu siswa memahami data melalui visualisasi yang sederhana.
- Mengajak siswa menarik kesimpulan berdasarkan data.
- Menjadikan proses belajar terasa seperti sebuah petualangan atau misi detektif.

Website harus mengutamakan pengalaman belajar yang sederhana, visual, interaktif, dan mudah dipahami oleh siswa sekolah dasar.

---

## 3. TARGET USER

Target utama:

**Siswa sekolah dasar.**

Karakteristik pengguna:

- Membutuhkan instruksi yang sederhana.
- Lebih mudah memahami informasi melalui visual.
- Membutuhkan alur yang jelas dan bertahap.
- Tidak membutuhkan terminology teknis yang kompleks.
- Membutuhkan feedback yang jelas setelah melakukan aktivitas.

Website digunakan oleh satu pengguna pada satu perangkat dan tidak membutuhkan sistem akun.

---

## 4. CORE USER FLOW

Alur utama website:

**Beranda**
↓
**Kenali Budaya**
↓
**Survei**
↓
**Input Data**
↓
**Analisis**
↓
**Detektif Data**
↓
**Misi**
↓
**Data Berubah**

Setiap tahap harus memiliki tujuan yang jelas dan mengarahkan user menuju tahap berikutnya.

User tidak harus melihat atau memahami seluruh data/statistika secara teknis. Informasi harus disederhanakan sesuai tingkat pemahaman siswa sekolah dasar.

---

## 5. MAIN FEATURES

### 5.1 Beranda

Beranda merupakan halaman awal website.

Tujuan:

- Memperkenalkan pengalaman Jejak Data Budaya.
- Menjelaskan secara singkat apa yang akan dilakukan siswa.
- Mengarahkan siswa untuk memulai perjalanan.

Elemen utama dapat meliputi:

- Hero section.
- Judul dan tagline.
- CTA untuk memulai.
- Visual suasana Pasar Budaya Batak Toba.
- Elemen visual makanan/budaya Batak Toba.

Desain harus mengikuti visual reference yang diberikan user dan `@GUIDELINES.md`.

---

### 5.2 Kenali Budaya

Halaman untuk mengenalkan objek budaya atau makanan yang akan digunakan dalam aktivitas survei.

Tujuan:

- Memberikan konteks sebelum siswa mengumpulkan data.
- Mengenalkan nama dan informasi dasar objek budaya/makanan.
- Membuat siswa memahami apa yang akan mereka survei.

Konten harus disampaikan dengan bahasa sederhana.

---

### 5.3 Survei

Halaman untuk menjelaskan aktivitas survei.

Siswa diarahkan untuk melakukan pengumpulan data berdasarkan pertanyaan yang telah ditentukan.

Contoh konsep:

"Saya bertanya kepada beberapa orang tentang makanan yang mereka pilih."

Hasil jawaban dapat berbeda antara satu penggunaan dan penggunaan lainnya.

---

### 5.4 Input Data

Halaman tempat siswa memasukkan hasil survei.

User dapat memasukkan jumlah atau data sesuai hasil survei.

Contoh:

- Lapet: 8
- Lemang: 5
- Ombus-ombus: 12
- Bika Ambon: 3

Data yang dimasukkan menjadi dataset aktif untuk seluruh aktivitas berikutnya.

Validasi input harus sederhana dan mudah dipahami.

---

### 5.5 Analisis

Halaman yang menampilkan hasil pengolahan dataset.

Contoh informasi:

- Total data.
- Data terbanyak.
- Data paling sedikit.
- Perbandingan antar kategori.
- Persentase sederhana.
- Grafik atau visualisasi.

Perhitungan dapat dilakukan di frontend karena dataset relatif sederhana.

Hasil analisis harus berasal dari data yang dimasukkan user, bukan data statis.

---

### 5.6 Detektif Data

Halaman pembelajaran yang menggunakan konsep detektif.

Siswa diberikan pertanyaan berdasarkan dataset mereka sendiri.

Contoh:

- "Makanan apa yang paling banyak dipilih?"
- "Mana yang memiliki jumlah paling sedikit?"
- "Berapa jumlah seluruh pilihan?"
- "Apakah pilihan A lebih banyak daripada pilihan B?"

Pertanyaan dan jawaban harus menggunakan dataset aktif sehingga hasil dapat berbeda pada setiap penggunaan.

---

### 5.7 Misi

Halaman aktivitas lanjutan untuk menguji pemahaman siswa terhadap data.

Misi dapat menggunakan:

- Pertanyaan.
- Pilihan jawaban.
- Perbandingan data.
- Interpretasi grafik.
- Kesimpulan sederhana.

Tujuan utama adalah memastikan siswa tidak hanya melihat grafik tetapi juga memahami informasi yang terdapat di dalamnya.

---

### 5.8 Data Berubah

Halaman untuk menunjukkan bahwa data dapat berubah dan perubahan tersebut memengaruhi hasil analisis.

Contoh:

Dataset awal:

Lapet: 8
Lemang: 5
Ombus-ombus: 12

Kemudian salah satu data berubah.

Sistem menunjukkan perubahan pada:

- Grafik.
- Jumlah.
- Persentase.
- Kesimpulan.

Tujuan halaman adalah membantu siswa memahami hubungan antara data dan hasil analisis.

---

## 6. MASCOT & NARRATIVE

Website menggunakan maskot utama berupa anak detektif Batak Toba.

Karakter menggunakan:

- Ulos.
- Sortali Batak.

Maskot berfungsi sebagai:

- Learning guide.
- Narrator.
- Pemberi instruksi.
- Pemberi feedback.
- Pengarah perjalanan.

Maskot dapat berbicara sepanjang perjalanan website melalui speech bubble atau bentuk komunikasi visual lainnya.

Bahasa yang digunakan harus:

- Ramah.
- Sederhana.
- Edukatif.
- Tidak terlalu formal.
- Sesuai dengan siswa sekolah dasar.

Maskot tidak boleh mengganggu konten utama dan harus digunakan secara konsisten.

---

## 7. DATA MODEL

Tidak menggunakan database atau backend pada versi produk saat ini.

Data utama disimpan menggunakan browser `localStorage`.

Contoh struktur data:

- Survey dataset.
- User progress.
- Completed activities.
- Data yang digunakan untuk aktivitas Data Berubah.

Dataset bersifat dinamis dan dapat berubah berdasarkan input user.

Contoh:

```text
foodData:
- category
- name
- count
```

Struktur data harus dibuat sederhana dan mudah dikembangkan.

---

## 8. DATA PERSISTENCE

Gunakan `localStorage` sebagai persistent storage.

Ketika user:

- Refresh halaman.
- Berpindah halaman.
- Menutup lalu membuka kembali browser.

Data sebaiknya tetap tersedia selama storage browser tidak dihapus.

Tidak diperlukan:

- Login.
- Register.
- Authentication.
- User account.
- Database.
- Backend API.
- Teacher dashboard.
- Multi-user management.

---

## 9. RESET DATA

Website harus memiliki fitur untuk memulai kembali aktivitas.

Contoh CTA:

**Mulai Survei Baru**

Ketika user memilih reset:

**User memilih "Mulai Survei Baru"**
↓
**Confirmation Dialog**
↓
**User memilih "Reset Data"**
↓
**Dataset dihapus**
↓
**Progress di-reset**
↓
**Website kembali ke kondisi awal**

Reset tidak boleh terjadi tanpa konfirmasi.

Tujuan fitur ini adalah memungkinkan perangkat yang sama digunakan kembali untuk dataset atau sesi pembelajaran baru.

---

## 10. FRONTEND ARCHITECTURE

Gunakan architecture frontend yang modular.

Struktur dapat mengikuti pola:

```text
app/
components/
features/
services/
lib/
types/
data/
```

Gunakan separation of concerns.

Contoh:

**Page**
↓
**Feature Component**
↓
**Service / Data Layer**
↓
**localStorage**

UI component tidak sebaiknya menangani seluruh data persistence dan business logic secara langsung.

Perhitungan data dapat dipisahkan menjadi utility/function khusus.

---

## 11. TECH STACK

Frontend:

- Next.js
- TypeScript
- Tailwind CSS

Persistence:

- Browser localStorage

Backend:

**Tidak diperlukan untuk versi produk saat ini.**

Jika di masa depan terdapat kebutuhan untuk:

- Multi-user.
- Authentication.
- Sinkronisasi antar perangkat.
- Penyimpanan data online.
- Dashboard guru.
- Pengumpulan data terpusat.

Architecture harus memungkinkan backend seperti Supabase ditambahkan tanpa melakukan perubahan besar terhadap UI dan component structure.

---

## 12. DESIGN REQUIREMENTS

Desain harus mengikuti `@GUIDELINES.md`.

Visual reference dari user merupakan sumber penting dalam menentukan desain.

Jika user memberikan screenshot, mockup, wireframe, atau gambar reference:

- Jadikan reference sebagai acuan utama.
- Buat desain semirip mungkin.
- Pertahankan layout dan visual hierarchy.
- Jangan melakukan redesign tanpa alasan.
- Jangan menambahkan elemen kompleks hanya untuk membuat desain lebih menarik.

Desain harus:

- Realistis untuk diimplementasikan.
- UX friendly.
- Responsive.
- Sederhana.
- Konsisten.
- Maintainable.

---

## 13. IMPLEMENTATION REQUIREMENTS

Sebelum implementasi page atau feature:

1. Baca `@GUIDELINES.md`.
2. Pahami requirement.
3. Pahami visual reference.
4. Buat Implementation Plan.
5. Review plan.
6. Implementasikan.
7. Review hasil.
8. Pastikan implementation sesuai requirement dan reference.

Jangan langsung melakukan coding sebelum Implementation Plan dibuat.

---

## 14. CODE QUALITY

Project harus mengikuti clean code principles yang terdapat pada `@GUIDELINES.md`.

Prinsip utama:

- Jangan membuat satu file terlalu besar.
- Pecah component berdasarkan responsibility.
- Pisahkan UI dan business logic.
- Gunakan reusable component jika diperlukan.
- Hindari duplicate code.
- Gunakan naming yang jelas.
- Minimalisir penggunaan komentar.
- Jangan melakukan over-engineering.
- Jangan menambahkan dependency tanpa kebutuhan.

---

## 15. RESPONSIVE DESIGN

Website harus mempertimbangkan:

- Desktop.
- Tablet.
- Mobile.

Responsive design harus mempertahankan:

- Visual hierarchy.
- Readability.
- Usability.
- CTA visibility.
- Content accessibility.

Jangan hanya mengecilkan layout desktop.

---

## 16. ACCESSIBILITY & UX

Website harus mudah digunakan oleh siswa sekolah dasar.

Prioritaskan:

- Instruksi yang jelas.
- Tombol yang mudah dikenali.
- Typography yang mudah dibaca.
- Contrast yang cukup.
- Feedback setelah interaksi.
- Navigation yang konsisten.
- Error message yang sederhana.
- Alur yang tidak membingungkan.

Setiap halaman harus membantu user memahami:

1. Saya sedang berada di mana?
2. Apa yang harus saya lakukan?
3. Apa langkah berikutnya?

---

## 17. OUT OF SCOPE

Fitur berikut tidak termasuk dalam scope versi saat ini:

- Login.
- Register.
- User account.
- Authentication.
- Database server.
- Supabase integration.
- Teacher dashboard.
- Admin dashboard.
- Multi-user management.
- Cloud synchronization.
- Social features.
- Complex analytics.
- Real-time collaboration.

Fokus produk adalah pengalaman pembelajaran interaktif berbasis data pada satu perangkat.

---

## 18. FUTURE BACKEND MIGRATION

Jika backend diperlukan di masa depan, migration harus dilakukan secara modular.

Frontend tidak boleh bergantung langsung pada implementation database.

Gunakan data/service layer sehingga sumber data dapat diganti:

```text
Current:

UI
↓
Data Service
↓
localStorage


Future:

UI
↓
Data Service
↓
Supabase
```

Dengan pendekatan tersebut, perubahan backend tidak memerlukan perubahan besar pada UI.

---

## 19. GUIDELINES REFERENCE

**IMPORTANT:**

Seluruh aturan pengembangan project terdapat di file:

**`@GUIDELINES.md`**

`@GUIDELINES.md` adalah sumber utama untuk:

- Design Guidelines.
- Visual Reference Guidelines.
- Implementation Plan.
- Clean Code Guidelines.
- Component Structure.
- UX Guidelines.
- Responsive Design.
- Accessibility.
- Performance.
- Dependency Management.
- Change Management.
- Development Workflow.

Agent WAJIB membaca dan mengikuti `@GUIDELINES.md` sebelum melakukan pekerjaan development apa pun.

Jika terdapat konflik antara PRD, user requirement, visual reference, dan `@GUIDELINES.md`, jangan membuat asumsi besar. Identifikasi konflik tersebut dan tanyakan kepada user jika diperlukan.

---

## 20. CORE PRODUCT PRINCIPLE

Jejak Data Budaya harus terasa seperti:

**Petualangan edukasi interaktif di Pasar Budaya Batak Toba.**

Bukan sekadar dashboard statistik.

Kombinasi utama produk:

**Batak Toba + Pasar Budaya + Detektif + Survei + Data + Visualisasi + Misi + Pembelajaran**

harus menjadi identitas utama pengalaman pengguna.

Prinsip pengembangan:

**Follow the Reference.**

**Follow `@GUIDELINES.md`.**

**Plan Before Implementation.**

**Keep the Code Clean.**

**Keep the UX Simple.**

**Avoid Overengineering.**

Produk harus menghasilkan pengalaman yang:

**Attractive + Educational + Usable + Consistent + Maintainable + Realistically Implementable**
