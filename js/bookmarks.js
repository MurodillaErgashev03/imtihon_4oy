let bookUl = document.querySelector('.left__block-group')
let bookmarksTempelete = document.querySelector('#book-template')
let products = [];

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

    const newBookmasrks = bookmarksTempelete.content.cloneNode(true);
    const elText = findElement('#item__box-text', newBookmasrks);
    const elName = findElement('#item__box-title', newBookmasrks);
    const deleteBtn = findElement('#btn-delete', newBookmasrks);

    deleteBtn.dataset.id = array.id;

    elText.textContent = array.volumeInfo.authors[0];
    elName.textContent = array.volumeInfo.title;


    bookUl.appendChild(newBookmasrks)

}


ul.addEventListener('click', (evt) => {
    let target = evt.target
    if (target.className.includes('right__book-btn')) {
        const id = target.dataset.id;
        products.forEach((element) => {
            if (element.id == id) {
                bookmarksRender(element)
            }
        })
    }
})

// bookUl.addEventListener("click", function (evt) {
//     const element = evt.target;
//     if (element.id.includes("btn-delete")) {

//         const id = (element.dataset.id);
//         let result = [];

//         for (let i = 0; i < products.length; i++) {
//             const book = products[i];
//             let idd = (book.id);
//             if (idd != id) {
               
                
//             }
//         }

//         console.log(result)
//         //   bookmarksRender(resul);
//     }
// });


