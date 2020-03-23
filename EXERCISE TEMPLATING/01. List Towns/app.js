const inputTownsRef = document.querySelector('#towns');
const loadBtn = document.querySelector('#btnLoadTowns');
const root = document.querySelector('#root');

loadBtn.addEventListener('click', addTowns);

function addTowns(e) {
    e.preventDefault();
    let towns = inputTownsRef.value.split(', ').filter(x => x !== '');
    fetch('./towns-template.hbs')
        .then(x => x.text())
        .then(x => {
            if (towns.length !== 0) {
                let template = Handlebars.compile(x);
                root.innerHTML = template({ towns });
            }
        });
    inputTownsRef.value = '';
}