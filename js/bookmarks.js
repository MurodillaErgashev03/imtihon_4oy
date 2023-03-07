let bookUl = document.querySelector('.left__block-group');
let bookmarksTempelete = document.querySelector('#book-template');

let products = [];
let arr = [];

fetch('https://www.googleapis.com/books/v1/volumes?q=java&startIndex=0&maxResults=40')
    .then((res) => res.json())
    .then((data) => {

        let result = data.items.filter((product) => {

            if (product.id) {
                return product
            }
        })
        products = result;

    })





function bookmarksRender(array) {
    bookUl.textContent = '';

    array.forEach((array) => {



        const newBookmasrks = bookmarksTempelete.content.cloneNode(true);


        const elText = findElement('#item__box-text', newBookmasrks);
        const elName = findElement('#item__box-title', newBookmasrks);
        const deleteBtn = findElement('#btn-delete', newBookmasrks);
        const infoBtn = findElement('#book-img', newBookmasrks);
       
     
     


        deleteBtn.dataset.id = array.id;

        elText.textContent = array.volumeInfo.authors[0];
        elName.textContent = array.volumeInfo.title;


        bookUl.appendChild(newBookmasrks);

        infoBtn.addEventListener('click', () => {
            window.location.href = array.volumeInfo.infoLink;
        });


    })

}










