let elRightBlock = document.querySelector('.right__block-group');
let template = document.querySelector('#templete');
const token = localStorage.getItem('token');
let elForm = findElement("#add-form");
let elJobInput = findElement('#job__input');
let elNameInput = findElement('#name__input');
let elImgInput = findElement('#img__input');



function renderAdminBooks(array) {

    elRightBlock.textContent = "";

    array.forEach((adminBook) => {

        const newAdminBook = template.content.cloneNode(true);




        const elImg = findElement('.right__block-img', newAdminBook);
        const elJob = findElement('.right__block-title', newAdminBook);
        const elAfter = findElement('.right__block-text', newAdminBook);
        const elYears = findElement('.right__year', newAdminBook);
        const deleteBtn = findElement('.delete__btn', newAdminBook);
        const editBtn = findElement('.edit__btn', newAdminBook);


        elAfter.textContent = adminBook.name;
        elJob.textContent = adminBook.category;
        elImg.src = adminBook.images;
        elYears.textContent = adminBook.createdAt;

        deleteBtn.dataset.id = adminBook.id,
        editBtn.dataset.id = adminBook.id,
   

            elRightBlock.appendChild(newAdminBook);


            elRightBlock.addEventListener('click', (evt) => {
            const target = evt.target;


            if (target.className.includes('edit__btn')) {


                const id = Number(target.dataset.id);
                
                   
                if(!elJobInput.value == '' && !elImgInput.value == '' && !elNameInput.value == ''){
                    if (id == adminBook.id) {
                        elAfter.textContent = elNameInput.value;
                        elJob.textContent = elJobInput.value;
                        elImg.src = elImgInput.value;
                    }

                }


            }
        })

        


    })
}


elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let submitBtn = findElement('#submit-btn');
    submitBtn.disabled = "true"


    const elImg = evt.target.img.value;
    const elName = evt.target.name.value;
    const elJob = evt.target.job.value;


    let newBook = {
        createdAt: new Date(),
        name: elName,
        images: elImg,
        category: elJob,
    }

    console.log(newBook)



    fetch('https://6407723177c1a905a0f95674.mockapi.io/books', {
        method: "post",
        body: JSON.stringify(newBook),
        headers: {
            "Authorization": "Bearer " + token,
            'Content-Type': 'application/json',
        }
    }).then((res) => res.json())
        .then((data) => {
            submitBtn.disabled = ""
            window.location.reload();
        })
})











fetch('https://6407723177c1a905a0f95674.mockapi.io/books').then((res) => res.json()).then((data) => {
    renderAdminBooks(data.slice(0, 6));
})

let books = [];


const getData = async () => {
    try {
        const res = await fetch('https://6407723177c1a905a0f95674.mockapi.io/books');


        if (res.status === 404) {
            throw new Error("Qaytadan urinib ko'ring")
        }
        const res2 = await res.json();

        books = res2;
        renderAdminBooks(res2);

    }
    catch (err) {
        alert(err)

    }
    finally {

    }

}

getData();








elRightBlock.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target.className.includes('delete__btn')) {

        const id = Number(target.dataset.id);

        fetch('https://6407723177c1a905a0f95674.mockapi.io/books/' + id, {
            method: "delete",
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json',
            }
        }

        )
            .then((res) => res.json())
            .then((res) => {

                window.location.reload();
            })
        renderAdminBooks(books)
    }
})







///theme

let elBody = document.querySelector('body');
let elLogo = document.querySelector('#logo');
let heroText = document.querySelector('.hero__title');
let mainTitle = document.querySelector('.left__block-title');
let mainText = document.querySelector('.left__block-text');
let leftBlock = document.querySelector('.left__big-block');
let elHero = document.querySelector('.hero');
let rightBlock = document.querySelector('.right__big-block');


let moon = document.querySelector('#header__img');

//lightmode

let theme = "light";

moon.addEventListener('click', () => {

    if (theme === "light") {
        theme = "dark";
        moon.src = '../img/crescent-moon.png';
        elBody.style.background = 'black';
        elLogo.src = '../img/logowhite.svg';
        heroText.style.color = 'white';
        leftBlock.style.background = '#10404e';
        elHero.className = 'hero-style';
        rightBlock.style.background = '#0f566b';


        mainTitle.style.color = 'white';
        mainText.style.color = 'white';

    }
    else if (theme == "dark") {
        moon.src = '../img/quyosh.svg';
        theme = "light";
        elBody.style.background = 'white';
        elLogo.src = '../img/logo.black.svg';
        heroText.style.color = 'black';
        leftBlock.style.background = 'white';
        elHero.className = 'hero';
        rightBlock.style.background = '#F8FAFD';

        mainTitle.style.color = 'black';
        mainText.style.color = 'black';
    }

})

