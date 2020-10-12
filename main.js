window.onload = function() {

    const teacher = new Teacher({
        name: 'John',
        lastname: 'Willy',
        age: 25,
        group: []
    });


let form = document.getElementById('form');
let name = document.getElementById('name');
let lastname = document.getElementById('lastname');
let age = document.getElementById('age');
let point = document.getElementById('point');

let buttonAddStudent = document.querySelector('.form-button').firstElementChild;
let buttonUpdate = document.getElementById('updatebtn');
let listOfStudents = document.querySelector('.listOfStudents');



form.addEventListener('submit', e => {
	e.preventDefault();
	
    const formDataIsCorrect = checkInputs();
    if (formDataIsCorrect) {
        console.log('formDataIsCorrect');
        let inputs = Array.from(form).filter( (item) => item.type === 'text').map( (item) => item.value);
        console.log('inputs', inputs);
        [name, lastname, age, point] = inputs;


        teacher.group.push(new Student({
            name,
            lastname,
            age: Number.parseInt(age),
            point: point.split(',').map( (item) => Number.parseInt(item))
        }));
    }
});

buttonUpdate.onclick = function () {
    teacher.group.sort( (student1, student2) => student2.averageMark() - student1.averageMark());

    let newStudent = teacher.group.map( (item) => '<li>' + item.name + ' - ' + item.lastname + 
    ' - ' + item.averageMark() + '</li>').join("");

    listOfStudents.innerHTML = newStudent;
}

function checkInputs() {
	// trim to remove the whitespaces
    const nameValue = name.value.trim();
    const lastnameValue = lastname.value.trim();
    const ageValue = age.value.trim();
    const pointValue = point.value.trim();

    let formDataIsCorrect = true;
    
	
	if(nameValue === '') {
        setErrorFor(name, 'Name cannot be blank');
        formDataIsCorrect = false;
	} else {
        setSuccessFor(name);
    }
    
    if(lastnameValue === '') {
        setErrorFor(lastname, 'Lastname connot be blank');
        formDataIsCorrect = false;
    }else{
        setSuccessFor(lastname);
    }

    if(ageValue === '') {
        setErrorFor(age, 'Age connot be blank');
        formDataIsCorrect = false;
    }else{
        setSuccessFor(age);
    }

    if(pointValue === '') {
        setErrorFor(point, 'Points connot be blank');
        formDataIsCorrect = false;
    }else{
        setSuccessFor(point);
    }
    return formDataIsCorrect;
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
    

}


class Human {
    constructor({name, lastname, age}) {
        this.name = name;
        this.lastname = lastname;
        this.age = age;
    }

    getFullName() {
        return `${name} ${this.lastname}`;
    }

    setFullName(fullName) {
        [this.name, this.lastname] = fullName.split(' ');
    }
}

class Teacher extends Human {
    constructor({name, lastname, age, group}){
        super({name, lastname, age});
        this.group = group;
    }

    static setMarkByStudentName(teacherObj, point, name) {
        [].find.call(teacherObj.group, (item) => item.name === name ? item.point.push(point) : false );
    }

    getListOfNamesByAverageMark() {
        return this.group.sort((a, b) => b.averageMark() - a.averageMark())
        .map( (item) => item.name );
    }

    getStudentByName(name) {
        return this.group.find( (item) => item.name === name);
    }

    removeStudentByName(name) {
        this.group.splice(this.group.indexOf(this.getStudentByName(name)), 1);
    }

    updateStudentByName(student, name) {
        this.group.splice(this.group.indexOf(this.getStudentByName(name)), 1, new Student(student));
    }
}

class Student extends Human {
    constructor({name, lastname, age, point}) {
        super({name, lastname, age});
        this.point = point;
    
    }


    averageMark() {
        console.log(this.point);
        return Math.round(this.point.reduce( (acc, item) => acc += item, 0) / this.point.length);
    }

    minMark() {
        return this.point.sort( (a, b) => b - a )[point.length - 1];
    }

    maxMark() {
        return this.point.sort( (a, b) => a - b )[point.length - 1];
    }

    getFullName() {
        return Human.prototype.getFullName.call(this) + ' - student';
    }
}

