const btnQuote = document.querySelector("#js-new-quote");
const btnAnswer = document.querySelector("#js-tweet");

btnQuote.addEventListener("click", getQuote);
btnAnswer.addEventListener("click", getAnswer);

const answerText = document.querySelector("#js-answer-text");

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion"

let answer = "";

async function getQuote() {

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {

            throw Error(response.statusText)
        }

        const json = await response.json();

        displayQuote(json["question"]);
        answer = json["answer"];
        answerText.textContent = '';

    } catch (err) {
        console.log(err);
        alert('Failed to fetch new quote');

    }

};

function displayQuote(quote) {

    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;

};

function getAnswer() {

    answerText.textContent = answer;

};

getQuote();