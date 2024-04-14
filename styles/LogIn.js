let icons = [];
let Intervals = [];
function IconsDota(IMG){
    this.el = document.createElement("img")
    this.el.classList.add("IconsForLG")
    this.el.style.top = "-3vh"
    this.el.style.left = `${Math.trunc(Math.random() * 98)}vw`
    this.el.src = IMG;
    this.speed = 0.1 + Math.random() * 0.5;
    document.body.prepend(this.el)
    this.Die = false;
    this.update = function(){
        if(this.Die != true){

      this.el.style.top = `${parseFloat(this.el.style.top) + this.speed}vh`;
    if(parseInt(this.el.style.top) >= 96){
this.Die = true;
    }
    if(this.Die == true){
       this.el.remove()
    }
}
    }
    
}
function createLogin(){
 icons = []
 
    document.body.classList.add("LogInBodyBackground");
    if(document.querySelector(".LoginDiv") != null){
        document.querySelector(".LoginDiv").remove();
    }
    let divMenu = document.createElement('div');    
    divMenu.classList.add("LoginDiv");   
  
    let header = document.createElement('h2');   
    header.innerText = "Войти"; 
    header.classList.add("LoginHeader");  

    let NameInput = document.createElement('input');  
    NameInput.type = "text";
    NameInput.placeholder = "username";
    NameInput.classList.add("LoginInputs");

    let PasswordInput = document.createElement('input');  
    PasswordInput.type = "password";
    PasswordInput.placeholder = "password";
    PasswordInput.classList.add("LoginInputs");
    
    let divForButtons = document.createElement('div');  
    divForButtons.classList.add("divForButtonsInputs")

    let LoginButton = document.createElement('button');   
    LoginButton.classList.add("LoginButton");
    LoginButton.innerText = "Login";
    LoginButton.addEventListener("click",() => {confirm(NameInput.value,PasswordInput.value,PasswordInput)});

    let divForIcons = document.createElement('div');    
    divForIcons.classList.add("divForIcons");   
     


    document.body.prepend(divMenu);   
    divMenu.append(header);
    divMenu.append(NameInput);
    divMenu.append(PasswordInput);
    divMenu.append(LoginButton);
    divMenu.append(divForIcons)
    Intervals.push(setInterval(() => {icons.push(new IconsDota(`${IconsUrl}${getHero(Math.trunc(Math.random() * (100 - 25) + 25)).icon}`))},100))
    Intervals.push(setInterval(() => {
for (let item of icons) {
    item.update();
}
icons = icons.filter((icon) => icon.Die == false);
    }
,10))
}

function confirm(Name,Passw,el){
    fetch('https://fakestoreapi.com/auth/login',{
      method:'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body:JSON.stringify({
          username: Name,
          password: Passw
      })
  })
  .then(res=>res.json())
  .then(json=>{
      logIn(json.token); 
  })
  .catch(() => {
    if(document.querySelector(".LoginFAILED") == null){
        let text = document.createElement("p");
        text.innerText = "Имя или пароль введены неправильно";
        text.classList.add("LoginFAILED")
        el.after(text);
    }
  })
  }



   function logIn(token){
    localStorage.setItem("TOKEN",token);
    document.body.classList.remove("LogInBodyBackground");
    if(document.querySelector(".LoginDiv") != null){
        document.querySelector(".LoginDiv").remove();
    }
    document.querySelector("#allContent").classList.remove("hide");

       for (let item of Intervals) {
        clearInterval(item);
       }
    Intervals = [];
   

        for (let item of icons) {
            item.el.remove()
        }
        icons = [];
        for(i = 0; dotaAccounts.length > i; i++){   
            createCard(dotaAccounts[i],i);   
        }  
    
    
   }

   