let elBody = document.querySelector('body');
let elLogo = document.querySelector('#logo');
let heroText = document.querySelector('.hero__title');
let mainTitle = document.querySelector('.left__block-title');
let mainText = document.querySelector('.left__block-text');
let leftBlock = document.querySelector('.left__big-block');
let elHero = document.querySelector('.hero');
let rightBlock = document.querySelector('.right__big-block');


let moon = document.querySelector('.header__img');

//lightmode

let theme = "light";

moon.addEventListener('click', () => {

    if ( theme === "light" ) {
        theme = "dark";
        moon.src = './img/crescent-moon.png';
        elBody.style.background = 'black';
        elLogo.src = './img/logowhite.svg';
        heroText.style.color = 'white';
        leftBlock.style.background = '#10404e';
        elHero.className = 'hero-style';
        rightBlock.style.background = '#0f566b';
      

        mainTitle.style.color = 'white';
        mainText.style.color = 'white';

    }
    else if (theme == "dark"){
        moon.src = './img/quyosh.svg';
        theme = "light";
        elBody.style.background = 'white';
        elLogo.src = './img/logo.black.svg';
        heroText.style.color = 'black';
        leftBlock.style.background = 'white';
        elHero.className = 'hero';
        rightBlock.style.background = '#F8FAFD';
     
        mainTitle.style.color = 'black';
        mainText.style.color = 'black';
    }

})

