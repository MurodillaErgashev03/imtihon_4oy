let ul = document.querySelector('.right__block-group');

function infoRender(element) {
    

    const elNameInfo = findElement('#offcanvasRightLabel');
    const elDiv = findElement('#offcanvasRight');
    const infoText = findElement('#info__text');
    const span = findElement('#span');
    const infoName = findElement('#info__namer');
    const publishers = findElement('#publishers');
    const categories = findElement('#categories');
    const pages = findElement('#pages');
    const infoImg = findElement('#info__img');
    
    elNameInfo.textContent = element.volumeInfo.title;
    infoImg.src = element.volumeInfo.imageLinks.thumbnail;
    infoText.textContent = element.volumeInfo.description;
    span.textContent = element.volumeInfo.authors;
    infoName.textContent= element.volumeInfo.publishedDate;
    publishers.textContent= element.accessInfo.accessViewStatus;
    categories.textContent =element.volumeInfo.categories[0];
    pages.textContent=element.volumeInfo.pageCount;
}
ul.addEventListener('click', (evt) => {
    let target = evt.target
    if (target.id.includes('info__btn')) {
       
      const id = target.dataset.id;
     
      products.forEach((element) => {
        if (element.id == id) {
          infoRender(element)
         console.log(element)
        }
      })
    }
  })
