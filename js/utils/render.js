let template = document.querySelector("#templete");
let ul = document.querySelector('.right__block-group')


function renderBook(array){
    array.items.forEach((books) => {
      
     
            
            
            const newBooks = template.content.cloneNode(true);

            const elImg = findElement('.right__block-img', newBooks);
            const elName = findElement('.right__block-title', newBooks);
            const elAfter = findElement('.right__block-text', newBooks);
            const elYers = findElement('.right__year', newBooks);
            const bookBtn = findElement('.right__book-btn', newBooks);
            const infoBtn = findElement('#info__btn', newBooks);
         

            bookBtn.dataset.id = books.id;
            infoBtn.dataset.id = books.id;
            


        
    
            elImg.src = books.volumeInfo.imageLinks.thumbnail;
            elName.textContent = books.volumeInfo.title;            ;
            elAfter.textContent = books.volumeInfo.authors[0];
            elYers.textContent = books.volumeInfo.publishedDate;
            
    
            ul.appendChild(newBooks)

    })

}