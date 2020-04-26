function getInfo() {
    let idRef = document.querySelector('#stopId');
    let stopNameRef = document.querySelector('#stopName');
    let bussesRef = document.querySelector('#buses');

    fetch(`https://judgetests.firebaseio.com/businfo/${idRef.value}.json`)
        .then(x => x.json())
        .then(x => {
            bussesRef.innerHTML = '';

            if (x.error) {
                stopNameRef.textContent = 'Error';
                return;
            }

            stopNameRef.textContent = x.name;

            for (const bus in x.buses) {
                let newLi = document.createElement('li');
                newLi.textContent = `Bus ${bus} arrives in ${x.buses[bus]} minutes`;
                bussesRef.appendChild(newLi);
            }
        });
}