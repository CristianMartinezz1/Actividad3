document.addEventListener('DOMContentLoaded', () => {
    const animals = [
        {
            img: "img/mapache.jpg",
            caption: "Mapache (el king)",
            stat1Label: "Agilidad / Velocidad",
            stat1Val: 70,
            stat1Text: "25 km/h",
            stat2Label: "Esperanza de Vida",
            stat2Val: 50,
            stat2Text: "3 a 5 años"
        },
        {
            img: "img/gato.jpg",
            caption: "Gatito ",
            stat1Label: "Agilidad / Velocidad",
            stat1Val: 90,
            stat1Text: "48 km/h",
            stat2Label: "Esperanza de Vida",
            stat2Val: 80,
            stat2Text: "12 a 15 años"
        },
        {
            img: "img/perro.jpg",
            caption: "Perro",
            stat1Label: "Agilidad / Velocidad",
            stat1Val: 75,
            stat1Text: "40 km/h",
            stat2Label: "Esperanza de Vida",
            stat2Val: 70,
            stat2Text: "10 a 13 años"
        },
        {
            img: "img/capibara.jpg",
            caption: "Capibara relajado y descansando",
            stat1Label: "Velocidad en el Agua",
            stat1Val: 60,
            stat1Text: "35 km/h",
            stat2Label: "Esperanza de Vida",
            stat2Val: 85,
            stat2Text: "8 a 10 años"
        }
    ];

    UIComponents.initAnimalCarousel('#animalCarousel', animals, (currentAnimal) => {
        UIComponents.animateProgressBar(
            '#barStat1', 
            currentAnimal.stat1Val, 
            '#textStat1', 
            currentAnimal.stat1Text, 
            '#labelStat1', 
            currentAnimal.stat1Label
        );

        UIComponents.animateProgressBar(
            '#barStat2', 
            currentAnimal.stat2Val, 
            '#textStat2', 
            currentAnimal.stat2Text, 
            '#labelStat2', 
            currentAnimal.stat2Label
        );
    });
});