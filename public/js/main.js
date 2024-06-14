document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('.lazy');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '0px 0px 50px 0px' });

    lazyImages.forEach(img => {
        observer.observe(img);
    });

    // Hiển thị hiệu ứng chào mừng
    const welcomeMessage = document.querySelector('.welcome-message');
    welcomeMessage.style.opacity = '1';

    // Kiểm tra xem thiết bị di động
    if (window.innerWidth <= 768) {
        welcomeMessage.classList.add('show');
        setTimeout(() => {
            welcomeMessage.classList.remove('show');
        }, 3000);
    }

    // Kiểm tra xem đã có lần truy cập trước đó hay chưa
    if (!localStorage.getItem('firstVisit')) {
        // Hiển thị pop-up chào mừng
        alert('Welcome to DUST KILLER! Your go-to solution for home and office cleaning services.');

        // Đánh dấu lần truy cập đầu tiên
        localStorage.setItem('firstVisit', 'true');
    }
});

const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});