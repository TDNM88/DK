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

    // Hiển thị scene chào mừng và chuyển đổi sau 1.5 giây và 5 giây
    const welcomeScene = document.getElementById('welcome-scene');
    setTimeout(() => {
        welcomeScene.classList.remove('yellow-screen');
        welcomeScene.classList.add('show-image');
    }, 1500);
    setTimeout(() => {
        welcomeScene.classList.add('hidden');
    }, 6500);

    // Kiểm tra xem đã có lần truy cập trước đó hay chưa
    if (!localStorage.getItem('firstVisit')) {
        // Hiển thị pop-up chào mừng
        alert('Welcome to DUST KILLER! Your go-to solution for home and office cleaning services.');
        // Đánh dấu lần truy cập đầu tiên
        localStorage.setItem('firstVisit', 'true');
    }

    // Thêm hiệu ứng chuyển động cho các phần tử khi trang được tải
    const fadeElements = document.querySelectorAll('.fade-in-element');
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transition = 'opacity 2s ease-in';
    });

    const onScroll = () => {
        fadeElements.forEach(element => {
            const position = element.getBoundingClientRect();
            if (position.top >= 0 && position.bottom <= window.innerHeight) {
                element.style.opacity = 1;
            }
        });
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // Trigger the scroll event on page load to check visibility

    // Thêm hiệu ứng hover cho các button
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
            button.style.backgroundColor = '#ff5722';
        });

        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
            button.style.backgroundColor = '';
        });
    });

    // Thêm hiệu ứng hover cho các liên kết
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.color = '#ff5722';
            link.style.textDecoration = 'underline';
        });

        link.addEventListener('mouseout', () => {
            link.style.color = '';
            link.style.textDecoration = 'none';
        });
    });
});

const navLinks = document.querySelector('.nav-links'); 
const hamburger = document.querySelector('.hamburger'); 
hamburger.addEventListener('click', () => { 
    navLinks.classList.toggle('show'); 
});


