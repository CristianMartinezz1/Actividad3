class UIComponents {
    static initAnimalCarousel(carouselSelector, animalsData, onSlideChange) {
        const carousel = document.querySelector(carouselSelector);
        if (!carousel) return;

        const track = carousel.querySelector('.ui-carousel-track');
        track.innerHTML = '';

        animalsData.forEach((animal, index) => {
            const li = document.createElement('li');
            li.className = 'ui-carousel-slide';

            li.innerHTML = `
                <img src="${animal.img}" alt="${animal.caption}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                <div class="ui-carousel-caption">${animal.caption}</div>
            `;
            track.appendChild(li);
        });

        const slides = Array.from(track.children);
        const nextBtn = carousel.querySelector('.ui-carousel-next');
        const prevBtn = carousel.querySelector('.ui-carousel-prev');

        let currentIndex = 0;

        const updateSlidePosition = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            
            if (typeof onSlideChange === 'function') {
                onSlideChange(animalsData[index]);
            }
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlidePosition(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlidePosition(currentIndex);
        });

        updateSlidePosition(0);
    }

    static animateProgressBar(barSelector, percentage, labelTextSelector, textValue, labelNameSelector, newLabelName) {
        const bar = document.querySelector(barSelector);
        const textEl = document.querySelector(labelTextSelector);
        const nameEl = document.querySelector(labelNameSelector);

        if (bar) {
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = `${percentage}%`;
            }, 50);
        }
        if (textEl) textEl.textContent = textValue;
        if (nameEl && newLabelName) nameEl.textContent = newLabelName;
    }
}