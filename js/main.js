let loginBtn = findElement('#login-btn');
let logoutBtn = findElement('#logout')

fetch('https://www.googleapis.com/books/v1/volumes?q=java&startIndex=0&maxResults=40')
  .then((res) => res.json())
  .then((data) => {
    // console.log(data)
    renderBook(data)
  })



let token = localStorage.getItem('token');




logoutBtn.addEventListener('click', () => {

  let token = localStorage.getItem('token');
  if (token) {
    localStorage.removeItem('token');
  }
  else {
    window.location.href = '../pages/login.html'
  }
})