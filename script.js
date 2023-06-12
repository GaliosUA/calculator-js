const buttons = document.querySelectorAll('.button');
const inputField = document.querySelector('.input');
const answerField = document.querySelector('.answer');
const dotButton = document.querySelector('.dot');
let a = '';
let b = '';
let operator = '';

buttons.forEach(button => button.addEventListener('click', pressed));
buttons.forEach(button => button.addEventListener('transitionend', released));

function pressed() {
    this.classList.add('pressed');
    if (this.textContent == 'C') clearAll();
    if (this.textContent == '√') answerField.textContent = Math.sqrt(a);
    if (this.classList.contains('operator') && operator == '') {
        operator = this.textContent;
        inputField.textContent += operator;
    };

    inputField.textContent = inputField.textContent.slice(0, 30);
    if (this.classList.contains('number') && operator == '') {
        inputField.textContent += this.textContent;
        a += this.textContent;
        dotButton.addEventListener('click', pressed);
        if (a.includes('.')) dotButton.removeEventListener('click', pressed);
    } else if (this.classList.contains('number') && operator != '') {
        inputField.textContent += this.textContent;
        b += this.textContent;
        dotButton.addEventListener('click', pressed);
        if (b.includes('.')) dotButton.removeEventListener('click', pressed);
    };

    if (this.classList.contains('operator') && b != '') {
        operate(a, b, operator);
        a = answerField.textContent;
        b = '';
        operator = '';
    };
    
    if (this.classList.contains('equals') && b != '') {
        operate(a, b, operator);
        a = answerField.textContent;
        b = '';
        operator = '';
    };
};

function released() {
    this.classList.remove('pressed');
};

function clearAll() {
    a = '';
    b = '';
    operator = '';
    inputField.textContent = '';
    answerField.textContent = '';
};

function operate(first, second, operator) {
    if (operator == '+') answerField.textContent = +first + +second;
    if (operator == '-') answerField.textContent = +first - +second;
    if (operator == '*') answerField.textContent = +first * +second;
    if (operator == '/') answerField.textContent = +first / +second;
    if (operator == '%') answerField.textContent = (+first / 100) * +second;
};