let loginBtn = findElement('#login-btn');
let logoutBtn = findElement('#logout');
let ul = document.querySelector('.right__block-group');
let template = document.querySelector("#templete");


fetch('https://www.googleapis.com/books/v1/volumes?q=java&startIndex=0&maxResults=40')
  .then((res) => res.json())
  .then((data) => {
    // renderBook(data)
    
  })

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
     

      if (res.status === 404 ) {
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
          newLi.textContent= i + 1;

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
             renderBook(res2.items.slice(0,6))
        
    
  }
  catch(err){
     console.log(err)
  }
  finally {}

}


elPaginationList.addEventListener('click', (evt) => {
  const prevBtn = document.querySelector('#prev');
  const nextBtn = document.querySelector('#next');
 if (evt.target.className.includes('page-number')) {
  const page = evt.target.textContent;
  activePage= page;
  


 if (true) {
  renderBook(products.slice(PageSize * (page-1), PageSize * page));
 }


  
 }
 if (evt.target.id === 'prev') {
    
      if (activePage != 1) {
          activePage--
        console.log(  renderBook(products.slice(PageSize * (activePage-1), PageSize * activePage)))
         
      }
     
 }
 if (evt.target.id === 'next') {
  activePage++;
 renderBook(products.slice(PageSize * (activePage-1), PageSize * activePage));
  
}
const lastPage = Math.ceil(products.length / PageSize)

if (activePage == 1) {
  prevBtn.className = 'opacity-50 page-item page-link'
}
else{
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
  newLi.textContent= i + 1;

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



///dalete;


