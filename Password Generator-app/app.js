//Selectors 
const passwordEL = document.getElementById('password');
const copyEL = document.getElementById('copy');
const lenEL = document.getElementById('len');
const upperEL = document.getElementById('upper');
const lowerEL = document.getElementById('lower');
const numberEL = document.getElementById('number');
const symboleEL = document.getElementById('symbole');
const generateEL = document.getElementById('generate');

//Const
const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abscefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '&(-_)@[]{}/*%!.:?,@';

//Events
generateEL.addEventListener('click' , generatePassword);
copyEL.addEventListener('click', copyClipboard);

//Function
function getLowerLetter(){
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUpperLetter(){
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber(){
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbole(){
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(){
    const len = lenEL.value;
    let myPassword = '';

    for(let i=0 ; i<len ; i++){
        myPassword += getRandomCase();
    }

    passwordEL.innerHTML = myPassword;
}

function getRandomCase(){
    const randoms = [];

    if(upperEL.checked){
        randoms.push(getUpperLetter());
    }
    if(lowerEL.checked){
        randoms.push(getLowerLetter());
    }
    if(numberEL.checked){
        randoms.push(getNumber());
    }
    if(symboleEL.checked){
        randoms.push(getSymbole());
    }

    return randoms.length > 0 ? randoms[Math.floor(Math.random() * randoms.length)] : '';
}

function copyClipboard(){
    const textArea = document.createElement('textarea');
    const password = passwordEL.innerText;

    if(!password) { return ;}

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Password copied to the clipboard')
}