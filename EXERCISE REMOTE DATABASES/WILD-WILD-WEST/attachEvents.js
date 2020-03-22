function attachEvents() {
    const startMoney = 500;
    const startBullets = 6;
    const playersUrl = 'https://softuni-myexercises.firebaseio.com/players/';
    const playersRef = document.querySelector('#players');
    const addPlayerBtn = document.querySelector('#addPlayer');
    const inputNameRef = document.querySelector('#addName');
    const fieldsets = document.querySelectorAll('fieldset');
    const saveBtn = document.querySelector('#save');
    const reloadBtn = document.querySelector('#reload');
    const canvas = document.querySelector('canvas');

    loadAllPlayers()

    addPlayerBtn.addEventListener('click', addPlayer);

    async function addPlayer() {
        let newPlayer = createPlayer(inputNameRef.value, startMoney, startBullets);
        await fetch(playersUrl + '.json', {
            method: 'POST',
            body: JSON.stringify(newPlayer)
        })
        inputNameRef.value = '';
        loadAllPlayers();
    }

    function loadAllPlayers() {
        playersRef.innerHTML = '';
        fetch(playersUrl + '.json')
            .then(x => x.json())
            .then(x => {
                Object.entries(x).forEach(([id, player]) => {
                    drowPlayer(id, player);
                });
            })
            .catch(console.log)
    }

    function drowPlayer(id, player) {
        let newBox = createNewElement('div', null, 'player');
        newBox.id = id;
        newBox.appendChild(createNewElement('div', `Name: ${player.name}`));
        newBox.appendChild(createNewElement('div', `Money: ${player.money}`));
        newBox.appendChild(createNewElement('div', `Bullets: ${player.bullets}`));

        let playBtn = createNewElement('button', 'Play', 'play');
        playBtn.addEventListener('click', play);
        newBox.appendChild(playBtn);

        let deleteBtn = createNewElement('button', 'Delete', 'delete');
        deleteBtn.addEventListener('click', deletePlayer);
        newBox.appendChild(deleteBtn);

        playersRef.appendChild(newBox);
    }

    async function play(e) {
        fieldsets[0].style.display = 'none';
        fieldsets[1].style.display = 'none';
        saveBtn.style.display = 'block';
        reloadBtn.style.display = 'block';
        canvas.style.display = 'block';

        let id = e.target.parentNode.id;

        reloadBtn.addEventListener('click', reload);
        saveBtn.addEventListener('click', save);

        let player = await fetch(playersUrl + id + '.json').then(x => x.json())
        loadCanvas(player);

        function reload() {
            if (player.money < 60) {
                alert('You dont have enough money !');
                return;
            }
            player.money -= 60;
            player.bullets = 6;
        }

        async function save() {
            await fetch(playersUrl + id + '.json', {
                method: 'PUT',
                body: JSON.stringify(player)
            });
            fieldsets[0].style.display = 'block';
            fieldsets[1].style.display = 'block';
            saveBtn.style.display = 'none';
            reloadBtn.style.display = 'none';
            canvas.style.display = 'none';

            location.reload();
            loadAllPlayers();
        }
    }

    async function deletePlayer(e) {
        let id = e.target.parentNode.id;
        await fetch(playersUrl + id + '.json', {
            method: 'DELETE'
        });

        loadAllPlayers();
    }

    function createNewElement(name, content, className) {
        let newElement = document.createElement(name);

        if (className) {
            newElement.classList.add(className);
        }

        if (content) {
            newElement.textContent = content;
        }

        return newElement;
    }

    function createPlayer(name, money, bullets) {
        return {
            name,
            money,
            bullets
        }
    }
}