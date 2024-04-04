const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const filenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg']

/* Declaring the alternative text for each image file */
const alts = {
    'pic1.jpg' : 'A gray British Shorthair cat with bright orange eyes sitting on a wooden floor and staring past the camera.',
    'pic2.jpg' : 'A gray British Shorthair cat with bright orange eyes laying on top of a white and a blue blanket and leaning against a white wall.',
    'pic3.jpg' : 'A gray British Shorthair cat with bright orange eyes sitting on a gray and white blanket looking straight at the camera with her tongue out.',
    'pic4.jpg' : 'A gray British Shorthair cat with bright orange eyes looking surprised as she had been caught straching at a dark gray piece of furniture.',
    'pic5.jpg' : 'A gray British Shorthair cat sleeping upside down on a fluffy white pillow with one of her paws covering her face.'
}

/* Looping through images */

for (const i of filenames) {

    const nalt = alts[i];
    const nsrc = `images/${i}`;

    const newImage = document.createElement('img');
    newImage.setAttribute('src', nsrc);
    newImage.setAttribute('alt', nalt);
    thumbBar.appendChild(newImage);

    newImage.addEventListener('click', () => {
        displayedImage.setAttribute('src', nsrc);
        displayedImage.setAttribute('alt', nalt);
    })

};

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
    const btnClass = btn.getAttribute('class');

    if (btnClass === 'dark') {

        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';

    } else {

        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)'

    }


})
