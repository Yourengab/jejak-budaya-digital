# DEVELOPMENT GUIDELINES

## 2. DESIGN GUIDELINES

### 2.1 Visual Reference

User akan sering memberikan gambar, screenshot, mockup, wireframe, atau referensi desain kepada agent.

Jika user memberikan visual reference, WAJIB menjadikan gambar tersebut sebagai acuan utama desain.

Implementasi harus dibuat semirip mungkin dengan reference, terutama pada:

- Layout
- Spacing
- Positioning
- Typography
- Ukuran elemen
- Hierarchy
- Warna
- Border
- Border radius
- Shape
- Composition
- Visual style
- Overall feeling

Jangan melakukan redesign berdasarkan preferensi agent.

Jika user mengatakan "buat seperti gambar ini", prioritaskan kemiripan dengan gambar tersebut.

Jangan menambahkan elemen visual yang tidak terdapat pada reference hanya untuk membuat halaman terlihat lebih menarik.

Jika terdapat bagian gambar yang tidak jelas atau tidak dapat diimplementasikan dengan akurat, tanyakan kepada user terlebih dahulu.

### 2.2 Design Must Be Realistic

Desain harus realistis untuk diimplementasikan pada website production.

Prioritaskan:

- UX yang jelas
- Layout sederhana
- Responsive design
- Reusable components
- Performance
- Accessibility
- Maintainability

Jangan membuat desain kompleks hanya untuk terlihat menarik.

Hindari:

- Animasi berlebihan
- Interaksi yang tidak diperlukan
- Layout yang sulit digunakan
- Decorative elements yang mengganggu UX
- Komponen yang terlalu kompleks
- UI yang tidak realistis untuk diimplementasikan

Prinsip utama:

Simple + Attractive + Usable + Implementable

---

## 3. IMPLEMENTATION PLAN

### 3.1 Always Plan Before Implementation

WAJIB membuat Implementation Plan sebelum melakukan implementasi page atau feature.

Jangan langsung menulis atau mengubah kode sebelum membuat plan.

Implementation Plan minimal menjelaskan:

1. Requirement yang akan diimplementasikan.
2. Page atau feature yang akan dibuat/diubah.
3. Layout yang akan digunakan.
4. Component yang akan dibuat atau digunakan kembali.
5. Data yang dibutuhkan.
6. Interaction yang diperlukan.
7. Responsive behaviour.
8. File yang akan dibuat atau dimodifikasi.
9. Dependency atau asset yang diperlukan.
10. Hal yang tidak termasuk dalam scope.

Setelah Implementation Plan dibuat, baru lakukan implementasi.

### 3.2 Incremental Implementation

Implementasikan perubahan secara bertahap.

Setelah implementasi:

1. Review hasil.
2. Bandingkan dengan requirement.
3. Bandingkan dengan visual reference.
4. Pastikan tidak merusak existing functionality.
5. Perbaiki discrepancy yang ditemukan.

Jangan melakukan refactor besar jika tidak diperlukan untuk task yang sedang dikerjakan.

---

## 4. CLEAN CODE GUIDELINES

### 4.1 Componentization

Jangan menempatkan seluruh UI dan logic dalam satu file.

Pecah kode berdasarkan tanggung jawab.

Contoh struktur:

components/
├── Navbar/
├── Hero/
├── MascotGuide/
├── FoodCard/
├── DataChart/
├── QuizCard/
└── ProgressIndicator/

services/
├── surveyService
├── studentService
└── analysisService

utils/
├── calculations
└── validators

Struktur folder dapat disesuaikan dengan architecture project.

Prinsip utama:

One component/module should have a clear responsibility.

### 4.2 Avoid Large Files

Jangan membuat satu file yang berisi:

- Seluruh UI page
- Seluruh business logic
- Seluruh data processing
- Seluruh event handler
- Seluruh API/database logic

Jika file mulai terlalu besar atau memiliki terlalu banyak tanggung jawab, pecah menjadi beberapa component/module.

### 4.3 Separation of Concerns

Pisahkan:

UI
↓
Components

Business Logic
↓
Functions / Hooks / Services

Data
↓
Mock Data / Database

External Communication
↓
Services

Jangan mencampurkan seluruh logic tersebut dalam satu component.

### 4.4 Reusable Components

Jika UI pattern digunakan di beberapa tempat, gunakan reusable component.

Contoh:

- Button
- Card
- FoodCard
- SpeechBubble
- MascotGuide
- ChartCard
- QuizOption
- Modal

Hindari duplicate code jika component dapat dibuat reusable secara sederhana.

### 4.5 Avoid Premature Abstraction

Jangan membuat abstraction yang terlalu kompleks untuk kebutuhan sederhana.

Buat abstraction jika memberikan manfaat nyata:

- Reusability
- Maintainability
- Separation of concerns
- Mengurangi duplication

Jangan over-engineer project.

---

## 5. COMMENTS GUIDELINES

### 5.1 Minimize Comments

Minimalisir penggunaan komentar.

Jangan menambahkan komentar untuk menjelaskan kode yang sudah jelas.

Kode harus cukup jelas melalui naming dan structure.

### 5.2 When Comments Are Appropriate

Gunakan komentar hanya jika diperlukan untuk menjelaskan:

- Logic kompleks
- Business rule yang tidak obvious
- Workaround
- Technical constraint
- Alasan penting di balik suatu keputusan

Komentar harus menjelaskan mengapa, bukan sekadar menjelaskan apa yang dilakukan kode.

---

## 6. NAMING GUIDELINES

Gunakan nama yang jelas dan deskriptif.

Hindari:

- data1
- temp
- foo
- bar
- thing
- handleStuff

Gunakan:

- surveyResponses
- selectedFood
- totalRespondents
- handleSurveySubmit
- calculatePercentages

Nama component, function, variable, dan file harus menggambarkan tanggung jawabnya.

---

## 7. EXISTING CODE GUIDELINES

Sebelum mengubah existing code:

1. Baca file yang relevan.
2. Pahami struktur existing implementation.
3. Identifikasi component yang dapat digunakan kembali.
4. Jangan membuat duplicate component jika component yang sesuai sudah tersedia.
5. Pertahankan behaviour yang sudah berjalan kecuali memang diminta untuk diubah.

Jangan menghapus atau mengganti implementation existing tanpa alasan yang jelas.

---

## 8. FEATURE DEVELOPMENT GUIDELINES

Sebelum membuat feature baru:

1. Pastikan feature memang diperlukan oleh PRD atau requirement user.
2. Tentukan scope.
3. Buat Implementation Plan.
4. Tentukan component yang diperlukan.
5. Tentukan data yang diperlukan.
6. Implementasikan secara incremental.
7. Test behaviour.
8. Review UX.

Jangan menambahkan fitur hanya karena dianggap lebih bagus.

---

## 9. SUPABASE GUIDELINES

Gunakan Supabase sebagai backend apabila memang diperlukan.

Pisahkan komunikasi dengan Supabase dari UI component.

Gunakan pola:

UI Component
↓
Service / Repository
↓
Supabase

Jangan melakukan query database secara berlebihan langsung dari banyak component.

Gunakan environment variables untuk konfigurasi.

Jangan expose:

- Service role key
- Secret key
- Credential sensitif

Jika menggunakan data siswa, gunakan Row Level Security agar user hanya dapat mengakses data yang memang menjadi haknya.

---

## 10. MOCK DATA GUIDELINES

Selama backend belum diperlukan atau belum tersedia, gunakan mock/static data.

Mock data harus memiliki struktur yang mendekati data sebenarnya.

Jangan membuat mock data tersebar di banyak component.

Simpan mock data pada lokasi yang terstruktur agar mudah diganti dengan Supabase nantinya.

---

## 11. RESPONSIVE DESIGN GUIDELINES

Semua page harus mempertimbangkan:

- Desktop
- Tablet
- Mobile

Desktop menjadi prioritas utama jika visual reference diberikan dalam format desktop.

Responsive implementation harus mempertahankan:

- Visual hierarchy
- Readability
- Usability
- CTA visibility
- Content accessibility

Jangan sekadar mengecilkan seluruh elemen desktop.

---

## 12. UX GUIDELINES

Setiap halaman harus menjawab tiga pertanyaan:

1. Saya sedang berada di mana?
2. Apa yang harus saya lakukan?
3. Apa langkah berikutnya?

Prioritaskan:

- Clear CTA
- Clear navigation
- Consistent interaction
- Clear feedback
- Readable content
- Predictable behaviour

Jangan membuat user menebak bagaimana cara melanjutkan.

---

## 13. ANIMATION GUIDELINES

Gunakan animation hanya jika memberikan manfaat UX.

Contoh yang diperbolehkan:

- Button hover
- Card hover
- Page transition ringan
- Speech bubble muncul
- Loading state
- Feedback animation
- Mascot idle/talking animation

Hindari:

- Animasi berlebihan
- Animasi yang memperlambat user
- Animasi dekoratif tanpa fungsi
- Continuous animation yang mengganggu fokus

---

## 14. ACCESSIBILITY GUIDELINES

Pastikan:

- Text mudah dibaca.
- Contrast cukup.
- Button memiliki label jelas.
- Form memiliki label.
- Interactive element dapat digunakan dengan keyboard jika relevan.
- Image memiliki alt text jika memiliki informasi penting.
- Jangan menggunakan warna sebagai satu-satunya indikator informasi.

---

## 15. PERFORMANCE GUIDELINES

Prioritaskan performance.

Hindari:

- Asset berukuran sangat besar tanpa alasan.
- Duplicate request.
- Rendering yang tidak diperlukan.
- Component yang terlalu berat.
- Library tambahan yang sebenarnya tidak diperlukan.

Gunakan asset dan dependency seminimal mungkin.

---

## 16. DEPENDENCY GUIDELINES

Sebelum menambahkan library baru:

1. Periksa apakah functionality dapat dibuat menggunakan existing stack.
2. Jika sudah ada library yang menyediakan functionality tersebut, gunakan yang sudah ada.
3. Jangan menambahkan dependency hanya untuk functionality kecil yang dapat dibuat dengan sederhana.

Setiap dependency baru harus memiliki alasan yang jelas.

---

## 17. COMMUNICATION GUIDELINES

Jika requirement jelas:

Implementasikan sesuai requirement.

Jika requirement ambigu dan berdampak besar terhadap:

- UX
- Architecture
- Data structure
- User flow
- Visual design

Tanyakan kepada user terlebih dahulu.

Jangan membuat asumsi besar.

Untuk keputusan kecil yang tidak berdampak signifikan, gunakan judgement yang wajar dan tetap mengikuti existing design system.

---

## 18. DESIGN CONSISTENCY

Semua page harus menggunakan visual language yang konsisten.

Pertahankan konsistensi:

- Typography
- Color
- Spacing
- Button
- Card
- Border radius
- Shadow
- Icon style
- Illustration style
- Navigation
- Mascot
- Cultural elements

Jika user memberikan visual reference baru untuk page tertentu, ikuti reference tersebut tanpa merusak consistency sistem secara keseluruhan.

---

## 19. CHANGE MANAGEMENT

Ketika user meminta perubahan:

1. Pahami perubahan.
2. Identifikasi bagian yang terdampak.
3. Review existing implementation.
4. Buat Implementation Plan.
5. Implementasikan perubahan.
6. Jangan mengubah bagian lain yang tidak diperlukan.
7. Review hasil akhir.

Perubahan kecil tidak boleh menyebabkan refactor besar tanpa alasan.

---

## 20. FINAL CHECKLIST

Sebelum menyelesaikan setiap task, pastikan:

- [ ] Guidelines.md sudah diikuti.
- [ ] Requirement user sudah dipenuhi.
- [ ] Visual reference sudah diikuti jika tersedia.
- [ ] Implementation Plan sudah dibuat sebelum coding.
- [ ] UX tetap sederhana dan jelas.
- [ ] Tidak ada fitur yang ditambahkan tanpa kebutuhan.
- [ ] Component sudah dipisahkan dengan baik.
- [ ] Tidak ada file yang menampung terlalu banyak logic.
- [ ] Comments tidak berlebihan.
- [ ] Naming jelas.
- [ ] Existing functionality tidak rusak.
- [ ] Responsive behaviour diperhatikan.
- [ ] Tidak ada dependency yang tidak diperlukan.
- [ ] Code tetap clean dan maintainable.

---

## 21. CORE PRINCIPLE

Selalu ikuti prinsip:

Follow the Reference.
Follow the Guidelines.
Plan Before Implementation.
Keep the Code Clean.
Keep the UX Simple.
Avoid Overengineering.

Tujuan utama adalah membangun produk yang:

Attractive + Usable + Consistent + Maintainable + Realistically Implementable

---

## 22. NEXT.JS IMAGE GUIDELINES

Ketika menggunakan komponen `Image` dari `next/image`:
- Jika mengubah ukuran gambar dengan CSS (misalnya menggunakan class bawaan untuk scaling), tambahkan class `w-auto h-auto` atau style `width: "auto", height: "auto"` agar aspect ratio tetap terjaga dan tidak memicu warning.
- Jika menggunakan properti `fill` pada `Image`, pastikan selalu menambahkan properti `sizes` (misalnya: `sizes="(max-width: 1024px) 128px, 0vw"`) untuk mengoptimalkan performa halaman dan mematuhi aturan Next.js.

## 23. TAILWIND CSS V4 GUIDELINES

Proyek ini menggunakan konfigurasi linting/standar Tailwind CSS v4 (atau versi yang diperbarui). Harap selalu patuhi aturan penulisan kelas (class) berikut untuk menghindari warning:

- **Hindari Nilai Sembarang (Arbitrary Values) Jika Ada Standarnya**:
  - Ukuran: Gunakan kelipatan standar seperti `w-50`, `h-75`, `w-100`, `h-140` alih-alih `w-[200px]`, `h-[300px]`, `w-[400px]`, atau `h-[560px]`.
  - Border Radius: Gunakan `rounded-3xl` (1.5rem) atau `rounded-4xl` (2rem) alih-alih `rounded-[1.5rem]` atau `rounded-[2rem]`.
  - Border Width: Gunakan `border-3` alih-alih `border-[3px]`.
  - Z-Index: Gunakan `z-100` alih-alih `z-[100]`.
  - Rotasi: Gunakan `rotate-110` alih-alih `rotate-[110deg]`.
- **Sintaks Linear Gradient**:
  - Gunakan `bg-linear-to-r` alih-alih `bg-gradient-to-r` yang sudah usang (deprecated).
- **Format Variabel pada Arbitrary Values**:
  - Jangan gunakan garis bawah (`_`) sebelum `var()` pada properti CSS kompleks.
  - Gunakan `bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))]` alih-alih `bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]`.
- **Menghindari Konflik Properti CSS**:
  - Jangan mencampur utilitas nilai sembarang (*arbitrary value*) dengan utilitas bawaan untuk properti yang sama agar linter tidak memberikan warning tumpang tindih (*overlap*).
  - Contoh: Jika elemen sudah menggunakan `shadow-[0_4px_0_0_rgba(0,0,0,0.2)]`, gunakan `active:shadow-[none]` alih-alih `active:shadow-none`.
