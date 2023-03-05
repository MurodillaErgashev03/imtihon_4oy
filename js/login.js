let userNameInput = findElement('#username');
let passwordInput = findElement('#password');
let loginBtn = findElement('#login-btn');
let errMessage = findElement('.error__message');


loginBtn.addEventListener('click', () => {

    errMessage.textContent = '';
    userNameInput.className = 'username__input';
    passwordInput.className = 'password__input';


    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if ((userNameInput.value.match(mailformat))) {
        userNameInput.className = 'username__input'
    } else {
        userNameInput.className = 'error_username'
        errMessage.textContent = 'email  notogri'
        return;
    };

    if (!(passwordInput.value.trim().length > 5)) {
        passwordInput.className = 'error_username';
        errMessage.textContent =
            "parol minimum 5 ta harfdan iborat bo'lishi kerak";
        return;
    }
   
    

   

    fetch('https://reqres.in/api/register', {
        method: "post",
        body:JSON.stringify({
            email: userNameInput.value,
            password: passwordInput.value,
              
        }),
        headers:{
            'Content-Type': 'application/json'
        },

    }).then((res) => res.json()).then((res) =>{
        

        if(res.error){    
            throw new Error(res.error);
         }

        const token = res.token;
        localStorage.setItem('token', token);      
        window.location.href = "../index.html";
    
    })
    .catch((err) => {
        errMessage.textContent = "Email yoki parol xato"
    })
    

})

