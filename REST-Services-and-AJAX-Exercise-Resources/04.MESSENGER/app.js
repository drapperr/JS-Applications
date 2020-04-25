function attachEvents() {
    const textArea = document.querySelector('#messages');
    const nameRef = document.querySelector('#author');
    const messageRef = document.querySelector('#content');
    const sendBtn = document.querySelector('#submit');
    const refreshBtn = document.querySelector('#refresh');

    refreshBtn.addEventListener('click', () => {
        textArea.value = '';
        fetch('https://rest-messanger.firebaseio.com/messanger.json')
            .then(x => x.json())
            .then(x => {
                for (const message of Object.values(x)) {
                    if (!message.author || !message.content) {
                        continue;
                    }
                    textArea.value += `${message.author}: ${message.content}\n`;
                }
            });
    });

    sendBtn.addEventListener('click', () => {
        if (!nameRef.value || !messageRef.value) {
            clear();
            return;
        }

        textArea.value += `${nameRef.value}: ${messageRef.value}\n`;

        let key = {
            author: nameRef.value,
            content: messageRef.value,
        };

        fetch('https://rest-messanger.firebaseio.com/messanger.json', {
            method: 'POST',
            body: JSON.stringify(key)
        });
        clear();
    })

    function clear() {
        nameRef.value = '';
        messageRef.value = '';
    }
}

attachEvents();