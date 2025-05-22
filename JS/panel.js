const panelModule = (() => {
    const togglePanel = (panel, toggleButton) => {
        const isActive = panel.classList.contains('active');

        document.querySelectorAll('.calificacion, .categorias').forEach(p => {
            p.classList.remove('active');
        });

        if (!isActive) {
            panel.classList.add('active');
            toggleButton.classList.add('active');
        }
    };

    const init = () => {
        const ratingToggle = document.getElementById('rating-toggle');
        const categoriesToggle = document.getElementById('categories-toggle');
        const ratingElement = document.getElementById('calificacion');
        const categoriesElement = document.getElementById('categorias');

        ratingToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePanel(ratingElement, ratingToggle);
        });

        categoriesToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePanel(categoriesElement, categoriesToggle);
        });

        document.addEventListener('click', () => {
            ratingElement.classList.remove('active');
            categoriesElement.classList.remove('active');
            ratingToggle.classList.remove('active');
            categoriesToggle.classList.remove('active');
        });

        [ratingElement, categoriesElement].forEach(el => {
            el.addEventListener('click', (e) => e.stopPropagation());
        });
    };

    return { init };
})();