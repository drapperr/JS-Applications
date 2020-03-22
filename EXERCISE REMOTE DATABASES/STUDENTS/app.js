const studentUrl = 'https://softuni-myexercises.firebaseio.com/students/';
const tbodyRef = document.querySelector('tbody');
const addBtn = document.querySelector('form button');
const firstNameRef = document.querySelector('#firstName');
const lastNameRef = document.querySelector('#lastName');
const facultyNumberRef = document.querySelector('#facultyNumber');
const gradeRef = document.querySelector('#grade');

loadStudents();
addBtn.addEventListener('click', addStudent);

async function addStudent(e) {
    e.preventDefault();

    let newStudent = createNewStudent(firstNameRef.value, lastNameRef.value, facultyNumberRef.value, gradeRef.value);
    let id = await getNewId();

    await fetch(studentUrl + id + '.json', {
        method: 'PUT',
        body: JSON.stringify(newStudent)
    })

    loadStudents();
    clear();
}

async function getNewId() {
    let response = await fetch(studentUrl + '.json');
    let result = await response.json();
    return Number(Object.keys(result).slice(-1)[0]) + 1;
}

function loadStudents() {
    tbodyRef.innerHTML = '';
    fetch(studentUrl + '.json')
        .then(rsponse => rsponse.json())
        .then(students => {
            if (!students) {
                throw new Error('Student list is Empty');
            }
            Object.keys(students).sort((a,b)=> Number(a)-Number(b)).forEach((id) => {
                if (students[id]) {
                    let newStudent = createNewStudent(students[id].firstName,students[id].lastName,students[id].facultyNumber,students[id].grade);
                    addStudentToList(newStudent, id);
                }
            })
        })
        .catch(console.log)
}

function addStudentToList(student, id) {
    let newTr = createNewElement('tr');
    newTr.appendChild(createNewElement('td', id));
    newTr.appendChild(createNewElement('td', student.firstName));
    newTr.appendChild(createNewElement('td', student.lastName));
    newTr.appendChild(createNewElement('td', student.facultyNumber));
    newTr.appendChild(createNewElement('td', student.grade));

    tbodyRef.appendChild(newTr);
}

function createNewStudent(firstName, lastName, facultyNumber, grade) {
    return {
        firstName,
        lastName,
        facultyNumber,
        grade
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
    firstNameRef.value = '';
    lastNameRef.value = '';
    facultyNumberRef.value = '';
    gradeRef.value = '';
}