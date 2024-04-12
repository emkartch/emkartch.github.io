const sprite = document.querySelector('.sprite');
const spriteShiny = document.querySelector('.sprite-shiny');
const sprites = document.querySelector('.images');

const btnQuote = document.querySelector("#js-new-quote");
const btnPicture = document.querySelector("#js-show-picture");
const btnAnswer = document.querySelector("#js-tweet");

btnQuote.addEventListener("click", getQuote);
btnPicture.addEventListener("click", addPictures);
btnAnswer.addEventListener("click", getAnswer);

const answerText = document.querySelector("#js-answer-text");

let answer = "";

let pictures = "false";

async function getQuote() {

    const id = String(Math.floor(Math.random() * 1024) + 1);

    const endpoint = "https://pokeapi.co/api/v2/pokemon/" + id + "/"

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {

            throw Error(response.statusText)
        }

        const json = await response.json();

        const name = json["name"]

        const spriteImg = json["sprites"]["front_default"]
        const spriteShinyImg = json["sprites"]["front_shiny"]

        displayQuotePic(capitalize(name), spriteImg, spriteShinyImg);

        const types = json["types"];

        let type = capitalize(types[0]["type"]["name"]);

        if (types.length > 1) {

            let type2 = capitalize(types[1]["type"]["name"]);

            type = type + ", " + type2

        }

        answer = type;
        answerText.textContent = '';

    } catch (err) {
        console.log(err);
        alert('Failed to fetch new quote');
    }

};

function displayQuotePic(quote, img, shinyImg) {

    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;

    const imgAlt = "The default front-facing sprite of" + quote;
    const shinyAlt = "The shiny front-facing sprite of" + quote;

    sprite.setAttribute('src', img);
    sprite.setAttribute('alt', imgAlt);

    spriteShiny.setAttribute('src', shinyImg);
    spriteShiny.setAttribute('alt', shinyAlt);

};

function getAnswer() {

    answerText.textContent = answer;

};

function addPictures() {

    if (pictures === "false") {

        pictures = "true";

        sprites.style.visibility = 'visible';

    } else {

        pictures = "false";

        sprites.style.visibility = 'hidden';

    }

}

function capitalize(str) {

    const modStr = str[0].toUpperCase() + str.slice(1);

    return modStr

}

getQuote();