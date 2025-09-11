document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.createElement('div');
    overlay.id = 'opening-animation-overlay';
    document.body.appendChild(overlay);

    const imageSources = [
        'images/アイシーグマ_アイシー.png',
        'images/アルゴリス_グー.png',
        'images/ビットリ_ごめん.png'
    ];

    const images = [];
    const numImages = 30;

    for (let i = 0; i < numImages; i++) {
        const img = document.createElement('img');
        img.src = imageSources[Math.floor(Math.random() * imageSources.length)];
        img.className = 'anim-image';
        overlay.appendChild(img);

        images.push({
            element: img,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            size: Math.random() * 100 + 50 // 50px to 150px
        });

        img.style.width = `${images[i].size}px`;
        img.style.height = 'auto';
    }

    let animationFrameId;

    function animate() {
        images.forEach(imgData => {
            imgData.x += imgData.vx;
            imgData.y += imgData.vy;

            // Wrap around screen edges
            if (imgData.x > window.innerWidth) imgData.x = -imgData.size;
            if (imgData.x < -imgData.size) imgData.x = window.innerWidth;
            if (imgData.y > window.innerHeight) imgData.y = -imgData.size;
            if (imgData.y < -imgData.size) imgData.y = window.innerHeight;

            imgData.element.style.left = `${imgData.x}px`;
            imgData.element.style.top = `${imgData.y}px`;
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Set timeout to hide animation
    setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
        overlay.classList.add('fade-out');
        
        // Remove overlay after fade out transition ends
        overlay.addEventListener('transitionend', () => {
            overlay.remove();
        });

    }, 3000); // Animation duration: 3 seconds
});
