import { contacts } from './contacts.js';

(() => {
    const contactsDiv = document.querySelector('#contacts');

    fetch('./contact-template.hbs').then(x => x.text()).then(x => {
        var template = Handlebars.compile(x);
        contactsDiv.innerHTML = template({ contacts });
    });

    contactsDiv.addEventListener('click', showDetails);

    function showDetails(e) {
        if (e.toElement.tagName === 'BUTTON') {
            let currentDetails=e.target.parentNode.querySelector('.details');
            if (currentDetails.style.display==='none'||currentDetails.style.display==='') {
                currentDetails.style.display='block';
            }else{
                currentDetails.style.display='none';
            }
        }
    }
})()