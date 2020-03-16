function attachEvents() {
    const inputRef = document.querySelector('#location');
    const submitBtn = document.querySelector('#submit');
    const forecastDiv = document.querySelector('#forecast');
    const currentDiv = document.querySelector('#current');
    const upcomingDiv = document.querySelector('#upcoming');

    submitBtn.addEventListener('click', addWeather);

    async function addWeather() {
        forecastDiv.style.display = 'block';
        currentDiv.innerHTML = '';
        upcomingDiv.innerHTML = '';
        try {
            let code = await getCode();
            let currentWeather = await getWeather('today', code);
            let threeDaysWeather = await getWeather('upcoming', code);
            displayWeather(currentWeather, threeDaysWeather);
        } catch (error) {
            currentDiv.textContent = error;
        }
    }

    async function getCode() {
        let response = await fetch('https://judgetests.firebaseio.com/locations.json');
        let json = await response.json();
        let currentLocation = json.find(x => x.name === inputRef.value);

        if (!currentLocation) {
            throw new Error('Invalid input!!!');
        }
        return currentLocation.code;
    }

    async function getWeather(day, code) {
        let response = await fetch(`https://judgetests.firebaseio.com/forecast/${day}/${code}.json `);
        let json = await response.json();
        return json;
    }

    function displayWeather(currentWeather, threeDaysWeather) {
        const symbols = {
            S: '☀',
            P: '⛅',
            O: '☁',
            R: '☂',
            D: '°'
        }

        let symbol = symbols[currentWeather.forecast.condition[0]];
        let degrees = `${currentWeather.forecast.low}${symbols.D}/${currentWeather.forecast.high}${symbols.D}`;
        let newForecastDiv = createNewElement('div', ['forecast']);
        let sybolSpan = createNewElement('span', ['condition', 'symbol'], symbol);
        let conditionSpan = createNewElement('span', ['condition']);
        let citySpan = createNewElement('span', ['forecast-data'], currentWeather.name);
        let degreesSpan = createNewElement('span', ['forecast-data'], degrees);
        let condSpan = createNewElement('span', ['forecast-data'], currentWeather.forecast.condition);
        addChildren(conditionSpan, [citySpan, degreesSpan, condSpan]);
        addChildren(newForecastDiv, [sybolSpan, conditionSpan]);
        currentDiv.appendChild(newForecastDiv);

        let newForecastInfoDiv = createNewElement('div', ['forecast-info']);
        threeDaysWeather.forecast.forEach(element => {
            symbol = symbols[element.condition[0]];
            degrees = `${element.low}${symbols.D}/${element.high}${symbols.D}`;

            let upcomingSpan = createNewElement('span', ['upcoming']);
            let sybolSpan = createNewElement('span', ['forecast-data'], symbol);
            let degreesSpan = createNewElement('span', ['forecast-data'], degrees);
            let condSpan = createNewElement('span', ['forecast-data'], element.condition);

            addChildren(upcomingSpan, [sybolSpan, degreesSpan, condSpan]);
            newForecastInfoDiv.appendChild(upcomingSpan);
        });

        upcomingDiv.appendChild(newForecastInfoDiv);

    }

    function createNewElement(name, classes, content) {
        let newElement = document.createElement(name);

        if (classes) {
            classes.forEach(clas => {
                newElement.classList.add(clas);
            });
        }
        if (content) {
            newElement.textContent = content;
        }
        return newElement;
    }

    function addChildren(parent, children) {
        children.forEach(child => {
            parent.appendChild(child);
        });
    }
}

attachEvents();