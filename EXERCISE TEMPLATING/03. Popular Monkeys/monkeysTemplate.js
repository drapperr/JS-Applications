$(() => {
    const monekysDiv = document.querySelector('.monkeys');

    fetch('./monkeys-template.hbs')
        .then(x => x.text())
        .then(x => {
            let template = Handlebars.compile(x);
            monekysDiv.innerHTML = template({ monkeys });

            const allBtns = document.querySelectorAll('button');

            allBtns.forEach(btn => {
                btn.addEventListener('click', toggle);
            });
        })

    function toggle() {
        let currentInfo = this.parentNode.querySelector('p');

        if (currentInfo.style.display === 'none') {
            currentInfo.style.display = 'block'
        } else {
            currentInfo.style.display = 'none';
        }
    }
})