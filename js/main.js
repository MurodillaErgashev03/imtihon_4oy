let loginBtn = findElement('#login-btn');
let logoutBtn = findElement('#logout');
let ul = document.querySelector('.right__block-group');
let template = document.querySelector("#templete");

let GOOGLE_API = "AIzaSyCnL1enRSVkr1Sf0qkgJVYU0jRuVHa2sR0"
//token

let token = localStorage.getItem('token');

if (!token) {
  window.location.href = '../pages/login.html'
}

logoutBtn.addEventListener('click', () => {

  let token = localStorage.getItem('token');
  if (token) {
    localStorage.removeItem('token');
    window.location.href = '../pages/login.html'
  }
  else {
    window.location.href = '../pages/login.html'
  }
})

//pagination
let products = [];
let allProductCount = 0;
let activePage = 1;
let elPaginationList = findElement('.pagination');
let PageSize = 6;

const getData = async () => {
  try {
    const res = await fetch('https://www.googleapis.com/books/v1/volumes?q=java&startIndex=0&maxResults=40');


    if (res.status === 404) {
      throw new Error("Qaytadan urinib ko'ring")
    }
    const res2 = await res.json();

    allProductCount = res2.items.length;

    products = res2.items;



    elPaginationList.innerHTML = `
      <li id="prev" class="opacity-50 page-item page-link">
      &laquo;
      </li>
      `

    for (let i = 0; i < Math.ceil(allProductCount / PageSize); i++) {

      let newLi = document.createElement('li');

      newLi.className = 'page-item  page-link page-number';
      newLi.textContent = i + 1;

      if (activePage == i + 1) {
        newLi.style.color = 'white';
        newLi.style.background = 'blue'
      }

      elPaginationList.appendChild(newLi)
    }
    elPaginationList.innerHTML += `
      <li id="next" class="page-item  page-link">             
       &raquo;
      </li>
      `
    renderBook(res2.items.slice(0, 6))


  }
  catch (err) {
    console.log(err)
  }
  finally { }

}


elPaginationList.addEventListener('click', (evt) => {
  const prevBtn = document.querySelector('#prev');
  const nextBtn = document.querySelector('#next');
  if (evt.target.className.includes('page-number')) {
    const page = evt.target.textContent;
    activePage = page;



    if (true) {
      renderBook(products.slice(PageSize * (page - 1), PageSize * page));
    }



  }
  if (evt.target.id === 'prev') {

    if (activePage != 1) {
      activePage--
      console.log(renderBook(products.slice(PageSize * (activePage - 1), PageSize * activePage)))

    }

  }
  if (evt.target.id === 'next') {
    activePage++;
    renderBook(products.slice(PageSize * (activePage - 1), PageSize * activePage));

  }
  const lastPage = Math.ceil(products.length / PageSize)

  if (activePage == 1) {
    prevBtn.className = 'opacity-50 page-item page-link'
  }
  else {
    prevBtn.className = 'page-item page-link'
  }
  elPaginationList.innerHTML = `
<li id="prev" class="${activePage == 1 ? 'opacity-50' : ''} page-item page-link">
&laquo;
</li>
`

  for (let i = 0; i < Math.ceil(allProductCount / PageSize); i++) {

    let newLi = document.createElement('li');

    newLi.className = 'page-item  page-link page-number';
    newLi.textContent = i + 1;

    if (activePage == i + 1) {
      newLi.style.color = 'white';
      newLi.style.background = 'blue'
    }

    elPaginationList.appendChild(newLi)
  }
  elPaginationList.innerHTML += `
<li id="next" class="${activePage == lastPage ? 'opacity-50' : ''} page-item  page-link">             
&raquo;
</li>
`
})

getData();

// search



let search = document.querySelector('#search');


let URL = "https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest&key="

fetch(URL + GOOGLE_API)
  .then((res) => res.json())
  .then((data) => {
  })


search.addEventListener('input',(evt)=>{
let value = evt.target.value
fetch(` https://www.googleapis.com/books/v1/volumes?q=${value}&key=` + GOOGLE_API)
  .then((res) => res.json())
  .then((data) => {
    if(value == ''){
      renderBook(data)
    }else{
      
      let result = data.items.filter((product) => {
         console.log(data.items)
        if (product.id) {
          return product
        }
      })
      products = result;
      renderBook(products.slice(0,6))
    }
  })
})


//sortlash

let elNew = findElement('#select-id');

elNew.addEventListener('change',(evt)=>{
let value = evt.target.value

fetch(`https://www.googleapis.com/books/v1/volumes?q=${value}&orderBy=newest&key=` + GOOGLE_API)
  .then((res) => res.json())
  .then((data) => {
    let result = data.items.filter((product) => {
      if (product.id) {
        return product
      }
    })
    products = result;
    renderBook(products.slice(0,6))
  })
})


//delete


bookUl.addEventListener('click', (evt) => {
  let target = evt.target;
  let arr2 = [];
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


//qoshish

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
          
      })
  }
})

