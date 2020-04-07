(() => {
    const allCats = document.querySelector('#allCats');

    fetch('./cats-template.hbs')
        .then(x => x.text())
        .then(x => {
            let template = Handlebars.compile(x);
            allCats.innerHTML = template({ cats });

            const allBtns = document.querySelectorAll('button');

            allBtns.forEach(btn => {
                btn.addEventListener('click', toggle);
            });
        });

    function toggle() {
        let currentInfo = this.parentNode.querySelector('.status');

        if (currentInfo.style.display === 'none') {
            this.textContent = 'Hide status code';
            currentInfo.style.display = 'block';
        } else {
            this.textContent = 'Show status code';
            currentInfo.style.display = 'none';
        }
    }
})();