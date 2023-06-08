const buttons = document.querySelectorAll('.button');
const inputField = document.querySelector('.input');
let a = null;
let b = null;
let operator = '';

buttons.forEach(button => button.addEventListener('click', pressed));
buttons.forEach(button => button.addEventListener('transitionend', released));


function pressed() {
    this.classList.add('pressed');
    if (this.textContent != '=') inputField.textContent += this.textContent;
    if (this.textContent == 'C') {
        clearVariables();
        inputField.textContent = '';
        return 0;
    }
    if (inputField.textContent.length >= 10) inputField.textContent = inputField.textContent.slice(0, 10);
    if (a == null && this.classList.contains('operator')) {
        operator = this.textContent;
        console.log('operator is ' + operator);
        a = inputField.textContent.slice(0, -1);
        console.log('a is ' + a);
    } else if (a != null && this.classList.contains('operator')) {
        b = inputField.textContent.slice(a.length + 1, -1);
        console.log('b is ' + b);
        operate(a, b, operator);
        clearVariables();
    };
    if (this.textContent == '=' && a == null) {
        return 0;
    }
    else if (this.textContent == '=' && b != null) {
        operate(a, b, operator);
        a = inputField.textContent;
    } else if (this.textContent == '=' && b == null) {
        b = inputField.textContent.slice(a.length + 1);
        console.log('b is equals' + b);
        operate(a, b, operator);
        a = inputField.textContent;
    };

};

function released() {
    this.classList.remove('pressed');
};

function operate(first, second, operator) {
    if (operator == '+') inputField.textContent = +first + +second;
    if (operator == '-') inputField.textContent = +first - +second;
    if (operator == '*') inputField.textContent = +first * +second;
    if (operator == '/') inputField.textContent = +first / +second;
};

function clearVariables() {
    a = null;
    b = null;
};