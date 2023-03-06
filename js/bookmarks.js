let bookUl = document.querySelector('.left__block-group')
let bookmarksTempelete = document.querySelector('#book-template')
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

    array.forEach((array)=>{

    

    const newBookmasrks = bookmarksTempelete.content.cloneNode(true);
    const elText = findElement('#item__box-text', newBookmasrks);
    const elName = findElement('#item__box-title', newBookmasrks);
    const deleteBtn = findElement('#btn-delete', newBookmasrks);

    deleteBtn.dataset.id = array.id;

    elText.textContent = array.volumeInfo.authors[0];
    elName.textContent = array.volumeInfo.title;


    bookUl.appendChild(newBookmasrks)
})

}



bookUl.addEventListener('click', (evt) => {
    let target = evt.target;
   let  arr2 =[];
    if (target.id.includes('btn-delete')) {
        const id = target.dataset.id;
        arr.forEach((element) => {
            if (element.id !== id) {
                arr2.push(element)
            }
        })

        arr = arr2
        bookmarksRender(arr2)
    }
})


ul.addEventListener('click', (evt) => {
    let target = evt.target
    if (target.id.includes('right__book-btn')) {
        
        const id = target.dataset.id;
        products.forEach((item) => {
            if (item.id == id) {
                let product = arr.find((item) => item.id == id);
                if (!product) {
                    arr.push(item);
                }
            }
            bookmarksRender(arr)
            console.log(arr)
        })
    }
})



