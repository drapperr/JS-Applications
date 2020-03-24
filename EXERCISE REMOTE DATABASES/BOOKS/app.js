const loadBtn = document.querySelector('#loadBooks');
const booksUrl = 'https://softuni-myexercises.firebaseio.com/books/';
const tbodyRef = document.querySelector('tbody');
const submitBtn = document.querySelector('form button');
const titleRef = document.querySelector('#title');
const authorRef = document.querySelector('#author');
const isbnRef = document.querySelector('#isbn');

loadBtn.addEventListener('click', loadBooks);
submitBtn.addEventListener('click', submitBook);

function submitBook(e) {
    e.preventDefault();
    let newBook = createBook(titleRef.value, authorRef.value, isbnRef.value);
    fetch(booksUrl + '.json', {
        method: 'POST',
        body: JSON.stringify(newBook)
    })
    addBook(newBook);
    clear();
}

function loadBooks() {
    tbodyRef.innerHTML = '';
    fetch(booksUrl + '.json')
        .then(x => x.json())
        .then(x => {
            if (!x) {
                throw new Error('Books is Empty');
            }
            Object.entries(x).forEach(([id, book]) => {
                addBook(book, id);
            })
        })
        .catch(console.log)
}

function addBook(book, id) {
    let newTr = createNewElement('tr');
    newTr.id = id;
    newTr.appendChild(createNewElement('td', book.title));
    newTr.appendChild(createNewElement('td', book.author));
    newTr.appendChild(createNewElement('td', book.isbn));

    let newTd = createNewElement('td');
    let editBtn = createNewElement('button', 'Edit');
    editBtn.addEventListener('click', editBook);
    let deleteBtn = createNewElement('button', 'Delete');
    deleteBtn.addEventListener('click', deleteBoook);

    newTd.appendChild(editBtn);
    newTd.appendChild(deleteBtn);

    newTr.appendChild(newTd);
    tbodyRef.appendChild(newTr);
}

function editBook() {
    let currentBook = this.parentNode.parentNode
    titleRef.value = currentBook.children[0].textContent;
    authorRef.value = currentBook.children[1].textContent;
    isbnRef.value = currentBook.children[2].textContent;

    submitBtn.removeEventListener('click', submitBook);
    submitBtn.addEventListener('click', putBook);

    function putBook(e) {
        e.preventDefault();
        let editedBook = createBook(titleRef.value, authorRef.value, isbnRef.value);

        fetch(booksUrl + currentBook.id + '.json', {
            method: 'PUT',
            body: JSON.stringify(editedBook)
        });
        currentBook.children[0].textContent = editedBook.title;
        currentBook.children[1].textContent = editedBook.author;
        currentBook.children[2].textContent = editedBook.isbn;
        submitBtn.removeEventListener('click', putBook);
        submitBtn.addEventListener('click', submitBook);
        clear();
    }
}

function deleteBoook() {
    let id = this.parentNode.parentNode.id;
    fetch(booksUrl + id + '.json', {
        method: 'Delete',
    })
    this.parentNode.parentNode.remove();
}

function createBook(title, author, isbn) {
    return {
        title,
        author,
        isbn
    }
}

function createNewElement(name, content) {
    let newElement = document.createElement(name);

    if (content) {
        newElement.textContent = content;
    }
    return newElement;
}

function clear() {
    titleRef.value = '';
    authorRef.value = '';
    isbnRef.value = '';
}