const buttonHeader = document.querySelector("#headerChange");
const buttonChange = document.querySelector('#buttonChange')
const h1 = document.querySelector('h1');
buttonHeader.addEventListener('click', changeText);
buttonChange.addEventListener('click', changeButton);

function changeText() {

    h1.textContent = `HOW DARE YOU`;

}

function changeButton() {

    buttonChange.style.backgroundColor = 'red';
    buttonChange.style.fontSize = 'x-large';
    buttonChange.textContent = `RUDE`;



}

