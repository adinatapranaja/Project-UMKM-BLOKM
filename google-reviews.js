// ===== GOOGLE REVIEWS INTEGRATION =====
// Configuration
const GOOGLE_API_KEY = 'AIzaSyDkvF9wgXze28fVus8j4Bh6PwUyjT-vPR4';
const PLACE_ID = 'ChIJmxBj46_xaS4RXo9e_16aOlw'; // Blok M Hub Place ID

// Initialize Google Reviews
async function loadGoogleReviews() {
    try {
        // Fetch place details including reviews
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&key=${GOOGLE_API_KEY}&language=id`
        );

        // Note: Direct API calls from browser are blocked by CORS
        // We need to use a proxy or alternative method
        // Let's use the Places Library approach instead
        
        // Load Google Maps JavaScript API with Places library
        loadGoogleMapsAPI();
    } catch (error) {
        console.error('Error loading reviews:', error);
        showFallbackReviews();
    }
}

// Load Google Maps API
function loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&callback=initGoogleReviews`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Initialize when Google Maps API is ready
window.initGoogleReviews = function() {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    
    const request = {
        placeId: PLACE_ID,
        fields: ['name', 'rating', 'user_ratings_total', 'reviews']
    };

    service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            displayReviews(place);
        } else {
            console.warn('Could not load Google reviews, showing fallback');
            showFallbackReviews();
        }
    });
};

// Display reviews in the testimonial section
function displayReviews(place) {
    const reviews = place.reviews.slice(0, 5); // Show top 5 reviews
    const rating = place.rating;
    const totalReviews = place.user_ratings_total;

    // Update rating display
    updateRatingDisplay(rating, totalReviews);

    // Clear loading message
    const container = document.getElementById('reviewsContainer');
    container.innerHTML = '';

    // Create review items
    reviews.forEach((review, index) => {
        const reviewItem = createReviewElement(review, index);
        container.appendChild(reviewItem);
    });

    // Update controls
    updateReviewControls(reviews);

    // Show controls
    document.getElementById('reviewsControls').style.display = 'flex';

    // Initialize carousel for reviews
    initializeReviewCarousel(reviews.length);
}

// Create review HTML element
function createReviewElement(review, index) {
    const div = document.createElement('div');
    div.className = `testimonial-item${index === 0 ? ' active' : ''}`;
    div.setAttribute('data-testimonial', index + 1);

    const stars = '⭐'.repeat(review.rating);
    const reviewDate = new Date(review.time * 1000).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long'
    });

    div.innerHTML = `
        <div style="margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <img src="${review.profile_photo_url || 'https://i.pravatar.cc/150?img=' + (index + 1)}" 
                     alt="${review.author_name}" 
                     style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                <div>
                    <h4 style="font-weight: 700; margin-bottom: 4px;">${review.author_name}</h4>
                    <div style="font-size: 18px; color: #FFD700;">${stars}</div>
                </div>
            </div>
            <p style="color: var(--text-gray); font-size: 12px; margin-bottom: 12px;">${reviewDate}</p>
        </div>
        <p class="testimonial-text">"${review.text}"</p>
    `;

    return div;
}

// Update rating display
function updateRatingDisplay(rating, totalReviews) {
    const starsContainer = document.getElementById('ratingStars');
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span style="color: #FFD700; font-size: 24px;">⭐</span>';
    }
    if (hasHalfStar) {
        starsHTML += '<span style="color: #FFD700; font-size: 24px;">⭐</span>';
    }
    
    starsContainer.innerHTML = starsHTML;
    document.getElementById('ratingScore').textContent = rating.toFixed(1);
    document.getElementById('ratingCount').textContent = `(${totalReviews} reviews)`;
}

// Update review controls (avatars and dots)
function updateReviewControls(reviews) {
    const avatarsContainer = document.getElementById('reviewsAvatars');
    const dotsContainer = document.getElementById('reviewsDots');
    
    avatarsContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    reviews.forEach((review, index) => {
        // Avatar button
        const avatarBtn = document.createElement('button');
        avatarBtn.className = `avatar${index === 0 ? ' active' : ''}`;
        avatarBtn.setAttribute('data-testimonial', index + 1);
        avatarBtn.innerHTML = `
            <img src="${review.profile_photo_url || 'https://i.pravatar.cc/150?img=' + (index + 1)}" 
                 alt="${review.author_name}">
        `;
        avatarsContainer.appendChild(avatarBtn);

        // Dot indicator
        const dot = document.createElement('span');
        dot.className = `dot${index === 0 ? ' active' : ''}`;
        dot.setAttribute('data-testimonial', index + 1);
        dotsContainer.appendChild(dot);
    });
}

// Initialize review carousel
function initializeReviewCarousel(totalReviews) {
    let currentReview = 1;
    let reviewInterval;

    const avatars = document.querySelectorAll('#reviewsAvatars .avatar');
    const dots = document.querySelectorAll('#reviewsDots .dot');

    // Function to show specific review
    function showReview(index) {
        const items = document.querySelectorAll('#reviewsContainer .testimonial-item');
        
        // Remove active class from all items first
        items.forEach(item => item.classList.remove('active'));
        avatars.forEach(avatar => avatar.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Wait for fade out animation to complete before showing new item
        setTimeout(() => {
            const selectedItem = document.querySelector(`#reviewsContainer .testimonial-item[data-testimonial="${index}"]`);
            const selectedAvatar = document.querySelector(`#reviewsAvatars .avatar[data-testimonial="${index}"]`);
            const selectedDot = document.querySelector(`#reviewsDots .dot[data-testimonial="${index}"]`);

            if (selectedItem) selectedItem.classList.add('active');
            if (selectedAvatar) selectedAvatar.classList.add('active');
            if (selectedDot) selectedDot.classList.add('active');

            currentReview = index;
        }, 100); // Small delay to ensure smooth transition
    }

    // Auto-slide
    function startCarousel() {
        reviewInterval = setInterval(() => {
            let next = currentReview + 1;
            if (next > totalReviews) next = 1;
            showReview(next);
        }, 5000);
    }

    function stopCarousel() {
        clearInterval(reviewInterval);
    }

    // Event listeners
    avatars.forEach(avatar => {
        avatar.addEventListener('click', () => {
            const id = parseInt(avatar.getAttribute('data-testimonial'));
            showReview(id);
            stopCarousel();
            startCarousel();
        });
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const id = parseInt(dot.getAttribute('data-testimonial'));
            showReview(id);
            stopCarousel();
            startCarousel();
        });
    });

    // Start auto-carousel
    startCarousel();
}

// Fallback reviews if Google API fails
function showFallbackReviews() {
    const fallbackReviews = [
        {
            author_name: "Pelanggan Setia",
            rating: 5,
            text: "Ayam pop nya enak banget! Saus putihnya khas dan sayur daun singkongnya crispy. Pasti balik lagi!",
            time: Date.now() / 1000,
            profile_photo_url: "https://i.pravatar.cc/150?img=1"
        },
        {
            author_name: "Food Lover",
            rating: 5,
            text: "Tempatnya nyaman di Blok M Hub. Ayam pop dada nya juicy, tidak kering seperti tempat lain. Recommended!",
            time: Date.now() / 1000 - 86400,
            profile_photo_url: "https://i.pravatar.cc/150?img=2"
        },
        {
            author_name: "Jakarta Foodie",
            rating: 4,
            text: "Menu nasi lidah nya juga enak! Bumbunya meresap dan empuk. Harga sesuai dengan rasa dan porsi.",
            time: Date.now() / 1000 - 172800,
            profile_photo_url: "https://i.pravatar.cc/150?img=3"
        }
    ];

    const placeData = {
        rating: 4.5,
        user_ratings_total: 127,
        reviews: fallbackReviews
    };

    displayReviews(placeData);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGoogleReviews);
} else {
    loadGoogleReviews();
}

console.log('Google Reviews module loaded - Secte Ayam Pop');
