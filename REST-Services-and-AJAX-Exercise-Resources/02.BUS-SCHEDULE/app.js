function solve() {
    const infoRef = document.querySelector('.info');
    const deppartBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');

    let nextStopId = '';
    let currentStation = '';

    function depart() {
        if (infoRef.textContent === 'Not Connected') {
            nextStopId = 'depot';
        }

        fetch(`https://judgetests.firebaseio.com/schedule/${nextStopId}.json`)
            .then(x => {
                if (x.status >= 400) {
                    deppartBtn.disabled = false;
                    arriveBtn.disabled = false;
                    infoRef.textContent = 'Error';
                    throw new Error('Invalid data');
                }

                return x;
            })
            .then(x => x.json())
            .then(x => {
                nextStopId = x.next;
                currentStation = x.name;
                infoRef.textContent = `Next stop ${currentStation}`;
            });

        deppartBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        infoRef.textContent = `Arriving at ${currentStation}`;

        deppartBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();