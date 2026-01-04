# Luscious Restaurant Website

Website restaurant modern dengan animasi halus dan interaktif yang menampilkan menu makanan Asia.

## Fitur Utama

### 1. Navbar + Hero Section
- Logo "luscious" di kiri atas
- Menu navigasi: Dumplings, Recipes, Food Menu, Order Now
- Hero dengan animasi fade-in dan slide-up saat load
- CTA button "Explore Now"
- Foto dumplings dengan efek scale-in halus

### 2. What's on our Plate Section
- 3 kategori tabs: Appetizers, Main Dish, Dessert
- Tab indicator yang bergeser secara smooth
- 3 menu cards per kategori dengan foto circular
- Animasi stagger (kiri → tengah → kanan)
- Hover effect: card naik + shadow, foto zoom kecil
- Link "Order Now" dengan underline animation

### 3. Testimonial Section
- Layout 2 kolom: gambar kiri, konten kanan
- Auto-carousel testimonial (ganti setiap 5 detik)
- 3 avatar customer dengan indicator dots
- Click avatar/dots untuk ganti testimonial manual
- Crossfade transition antar testimonial
- Parallax effect pada gambar saat scroll

### 4. Newsletter + Footer
- Form subscribe email dengan validation
- 3 kolom footer: Get Cooking, Information, Follow Us
- Stagger animation untuk footer columns
- Focus state pada input email

## Animasi yang Diimplementasikan

### Global
- Smooth scrolling untuk semua anchor links
- Scroll reveal dengan fade-in + slide-up
- Stagger delay antar elemen

### Hero (On-load)
- Teks headline: fade-in + slide-up
- Subheadline & description: fade-in bertahap
- CTA button: muncul dengan delay
- Hero image: scale-in dari 1.03 ke 1.00

### Tabs
- Indicator sliding animation
- Content crossfade/slide saat ganti tab
- Menu cards re-trigger stagger animation

### Parallax
- Dekorasi ingredient bergerak berbeda speed saat scroll
- Mouse movement parallax (subtle)

### Hover Effects
- Buttons: shadow + translateY
- Menu cards: lift + shadow
- Foto menu: scale 1.05
- Links: underline animation

## Cara Menggunakan

1. Buka file `index.html` di browser
2. Scroll halaman untuk melihat animasi reveal
3. Click tabs untuk ganti kategori menu
4. Click avatar/dots untuk ganti testimonial
5. Hover pada cards dan buttons untuk interaksi

## File Structure

```
project/
├── index.html          # Struktur HTML utama
├── style.css          # Semua styling dan animasi CSS
├── script.js          # JavaScript untuk interaktivitas
└── README.md          # Dokumentasi ini
```

## Browser Support

- Chrome/Edge (terbaru)
- Firefox (terbaru)
- Safari (terbaru)
- Fallback untuk browser lama tersedia

## Optimasi

- Intersection Observer untuk scroll reveal (performa lebih baik)
- Debounced scroll events
- Lazy loading images
- Smooth scroll polyfill untuk browser lama
- Keyboard navigation untuk accessibility

## Customization

Untuk mengubah warna:
- Edit variabel CSS di `:root` pada `style.css`
- `--orange-primary`: warna utama
- `--text-dark`: warna teks
- `--bg-light`: background terang

Untuk mengubah timing animasi:
- Edit duration di CSS animations (default 0.4s - 0.8s)
- Edit stagger delay (default 80ms - 150ms)

## Credits

- Images: Unsplash (placeholder)
- Avatars: Pravatar (placeholder)
- Fonts: System fonts
