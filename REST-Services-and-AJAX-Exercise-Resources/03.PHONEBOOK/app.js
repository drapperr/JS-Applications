function attachEvents() {
    const phoneBookRef = document.querySelector('#phonebook');
    const loadBtn = document.querySelector('#btnLoad');
    const personInput = document.querySelector('#person');
    const phoneInput = document.querySelector('#phone');
    const createBtn = document.querySelector('#btnCreate');

    loadBtn.addEventListener('click', loadPersons);

    createBtn.addEventListener('click', createPerson);

    function loadPersons() {
        phoneBookRef.textContent = '';
        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json')
            .then(x => x.json())
            .then(x => {
                for (let [key, value] of Object.entries(x)) {
                    if (!value.person || !value.phone) {
                        continue;
                    }
                    addPersonToList(key, value.person, value.phone);
                }
            });
    }

    function createPerson() {
        if (!personInput.value || !phoneInput.value) {
            clear();
            return;
        }
        let id;
        let newPerson = {
            person: personInput.value,
            phone: phoneInput.value
        }

        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json', {
            method: 'POST',
            body: JSON.stringify(newPerson)
        })
        .then(x => x.json())
        .then(x => addPersonToList(x.name, personInput.value, phoneInput.value));
    }

    function deletePerson(e) {
        let id = e.target.parentNode.id;

        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${id}.json`, {
            method: 'Delete'
        });
        e.target.parentNode.remove();
    }

    function addPersonToList(id, person, phone) {
        let newLi = document.createElement('li');
        newLi.textContent = `${person}: ${phone}`;
        newLi.id = id;

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deletePerson);

        newLi.appendChild(deleteBtn);
        phoneBookRef.appendChild(newLi);
        clear();
    }

    function clear() {
        personInput.value = '';
        phoneInput.value = '';
    }
}


attachEvents();