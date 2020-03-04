function solve() {
    const dropdownBtn = document.querySelector('#dropdown');
    const box = document.querySelector('#box');
    const dropdownMenu = document.querySelector('#dropdown-ul')

    dropdownBtn.addEventListener('click', () => {
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
            box.style.backgroundColor = 'black';
            box.style.color='white';
        } else {
            dropdownMenu.style.display = 'block';
        }
    })

    dropdownMenu.addEventListener('click', (e) => {
        box.style.backgroundColor = e.target.textContent;
        box.style.color='black';
    })
}