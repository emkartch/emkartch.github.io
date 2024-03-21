const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = "After preheating the oven to 325 fahrenheit, it was time to mix :insertx: into the ingredients. Today, Bob was making :inserty: the Powerpuff Girl and needed to insert the final ingredient: :insertz: of chemical X! Bob tried to put the mix in the oven, but it exploded and broke the oven! They must have added too much :insertx: and, unfortunately, the oven weighs 220 pounds, making it impossible to move and fix on their own"

const insertX = ["sugar","spice","everything nice"]

const insertY = ["Blossom","Bubbles","Buttercup"]

const insertZ = ["a splosh","a trickle","an ooze"]

randomize.addEventListener('click', result);

function result() {

    let newStory = storyText;

    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);

    newStory = newStory.replaceAll(":insertx:",xItem).replaceAll(":inserty:",yItem).replaceAll(":insertz:",zItem);

    if(customName.value !== '') {

        const name = customName.value;

        newStory = newStory.replaceAll("Bob",name);

    }

    if(document.getElementById("uk").checked) {

        const weight = Math.round(220/14) + ' stone';
        const temperature =  Math.round((325-32)*(5/9)) + ' centigrade';

        newStory = newStory.replaceAll("220 pounds",weight);
        newStory = newStory.replaceAll("325 fahrenheit",temperature);

    }

    story.textContent = newStory;
    story.style.visibility = 'visible';

}