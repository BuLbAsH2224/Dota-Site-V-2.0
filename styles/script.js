function getImage(a){ 
    if(a < 610){
        return "/images/icons/herald_icon.png";
    }
    else if(a < 1400){
        return "/images/icons/guardian_icon.png";
    }
    else if(a < 2150){
        return "/images/icons/crusader_icon.png";
    }
    else if(a < 2930){
        return "/images/icons/archon_icon.png";
    }
    else if(a < 3700){
        return "/images/icons/legend_icon.png";
    }
    else if(a < 4460){
        return "/images/icons/ancient_icon.png";
    }
    else {
        return "/images/icons/divine_icon.png";
    }
    
} 


  let LogoutButton = document.querySelector(".logoutBanner");
  let KubokButton = document.querySelector(".KubokBanner");
  function logout(){
    localStorage.removeItem("TOKEN");
    document.querySelector("#allContent").classList.add("hide");
    createLogin();
    deleteAllCards();

  }
   


 if(localStorage.getItem("In_Carts") != null){
    let carts = JSON.parse(localStorage.getItem("In_Carts"));
    for(let i = 0; i<dotaAccounts.length; i++){
        dotaAccounts[i].in_cart = carts[i];
    }
 }

function addToCart(event){
    let num = parseInt(event.target.id.slice(4));
    let els = document.querySelectorAll("#" + event.target.id);
    
    if(dotaAccounts[num].in_cart){
        dotaAccounts[num].in_cart = false;
        for (let item of els) {
            item.classList.remove("cartTrue");
        }
    }
    else{
        dotaAccounts[num].in_cart = true;
        for (let item of els) {

            item.classList.add("cartTrue");
          
        }
     
    }
    let elss = [];
    for (let item of dotaAccounts) {

        elss.push(item.in_cart);
      
    }
localStorage.setItem("In_Carts",JSON.stringify(elss));
}

function deleteCartCard(event){
    let num = parseInt(event.target.id.slice(4));
    let el = document.querySelector("#CartId" + num);
    el.remove();
}
function deleteAllCartCards(){
    let cards = document.querySelectorAll(".DivCartMenu");
for (let item of cards) {
    item.remove();
}

}


let Poloski = document.querySelector(".poloski");  
let filter = document.querySelector("div.filter");  
let filterButton = document.querySelector("#send");  
let clearFilterButton = document.querySelector("#clear");  
let cartUser = document.querySelector(".cartUser");
let cartButtonUser = document.querySelector(".cartBanner");
let CartButtonClear = document.querySelector(".ButtonClear");
let CartButtonUpdate = document.querySelector(".ButtonUpdate");


function filterCards(){  
    deleteAllCards();
    let price_min = document.querySelector("#price_min");
    let price_max = document.querySelector("#price_max");
    let mmr_min = document.querySelector("#mmr_min");
    let mmr_max = document.querySelector("#mmr_max");
    let decency_min = document.querySelector("#decency_min");
    let decency_max = document.querySelector("#decency_max");
    let level_min = document.querySelector("#level_min");
    let level_max = document.querySelector("#level_max");
    let matches_min = document.querySelector("#matches_min");
    let matches_max = document.querySelector("#matches_max");
    let guarnt_min = document.querySelector("#guarnt_min"); 
    let guarnt_max = document.querySelector("#guarnt_max"); 
    for(let i = 0; i < dotaAccounts.length;i++){  
        let acc = dotaAccounts[i];
         if( (price_min.value == "" && price_max.value == "") || (parseInt(price_min.value) <= acc.price && parseInt(price_max.value) >= acc.price) || (price_min.value == "" && parseInt(price_max.value) >= acc.price) || (parseInt(price_min.value) <= acc.price && price_max.value  == "")){
            if( (mmr_min.value == "" && mmr_max.value == "") || (parseInt(mmr_min.value) <= acc.MMR && parseInt(mmr_max.value) >= acc.MMR) || (mmr_min.value == "" && parseInt(mmr_max.value) >= acc.MMR) || (parseInt(mmr_min.value) <= acc.MMR && mmr_max.value  == "")){
                if( (decency_min.value == "" && decency_max.value == "") || (parseInt(decency_min.value) <= acc.Decency && parseInt(decency_max.value) >= acc.Decency) || (decency_min.value == "" && parseInt(decency_max.value) >= acc.Decency) || (parseInt(decency_min.value) <= acc.Decency && decency_max.value  == "")){
                    if( (level_min.value == "" && level_max.value == "") || (parseInt(level_min.value) <= acc.steamLevel && parseInt(level_max.value) >= acc.steamLevel) || (level_min.value == "" && parseInt(level_max.value) >= acc.steamLevel) || (parseInt(level_min.value) <= acc.steamLevel && level_max.value  == "")){
                        if( (matches_min.value == "" && matches_max.value == "") || (parseInt(matches_min.value) <= acc.NOfMatches && parseInt(matches_max.value) >= acc.NOfMatches) || (matches_min.value == "" && parseInt(matches_max.value) >= acc.NOfMatches) || (parseInt(matches_min.value) <= acc.NOfMatches && matches_max.value  == "")){
                            if( (guarnt_min.value == "" && guarnt_max.value == "") || (parseInt(guarnt_min.value) <= parseInt(acc.Guarantee) && parseInt(guarnt_max.value) >= parseInt(acc.Guarantee)) || (guarnt_min.value == "" && parseInt(guarnt_max.value) >= parseInt(acc.Guarantee)) || (parseInt(guarnt_min.value) <= parseInt(acc.Guarantee) && guarnt_max.value  == "")){
                                createCard(acc,i);
                            }
                        }
                    }
                }
            }
         }
       }  
} 
function deleteAllFromCart(){
    for (let item of dotaAccounts) {
        item.in_cart = false;
    }
    let els = document.querySelectorAll(".cart");
    for (let item of els) {
        item.classList.remove("cartTrue")
    }
    localStorage.removeItem("In_Carts")
}
function clearInputs(){
    let price_min = document.querySelector("#price_min");
    let price_max = document.querySelector("#price_max");
    let mmr_min = document.querySelector("#mmr_min");
    let mmr_max = document.querySelector("#mmr_max");
    let decency_min = document.querySelector("#decency_min");
    let decency_max = document.querySelector("#decency_max");
    let level_min = document.querySelector("#level_min");
    let level_max = document.querySelector("#level_max");
    let matches_min = document.querySelector("#matches_min");
    let matches_max = document.querySelector("#matches_max");
    let guarnt_min = document.querySelector("#guarnt_min"); 
    let guarnt_max = document.querySelector("#guarnt_max"); 
    price_min.value = "";
    price_max.value = "";
    mmr_min.value = "";
    mmr_max.value = "";
    decency_min.value = "";
    decency_max.value = "";
    level_min.value = "";
    level_max.value = "";
    matches_min.value = "";
    matches_max.value = "";
    guarnt_min.value = "";
    guarnt_max.value = "";
    deleteAllCards();
    for(i = 0; dotaAccounts.length > i; i++){   
        createCard(dotaAccounts[i],i);   
    }  
}
function deleteAllCards(){
let cards = document.querySelectorAll(".CARD");
for (let item of cards) {
    item.remove();
}
}
function deleteInfo(){
  
    let cards = document.querySelectorAll(".INFOMENU");
 
    for (let item of cards) {
        item.remove();
    }
}
function createCard(obj,num) {    
    let divMenu = document.createElement('div');    
    divMenu.classList.add("divMenu");   
    divMenu.classList.add("CARD");   
    divMenu.id =  "divMenu";  
  

    let img = document.createElement('img');    
    img.src = getImage(obj.MMR);   
    img.classList.add("kartina");   
    img.classList.add("CARD");   
      
    let InfoImg = document.createElement('img');    
    InfoImg.src = "/images/info_icon.png";   
    InfoImg.classList.add("infoImg"); 
    InfoImg.classList.add("CARD"); 
    InfoImg.addEventListener("click",() => {createCardInfo(num)})
    InfoImg.id = "NUMM_" + num;

    let header = document.createElement('h2');    
    header.innerText = obj.title;    
    header.classList.add("header");
    header.classList.add("CARD");
    
    let desript = document.createElement('p');    
    desript.innerText = obj.description;   
     desript.classList.add("descr");
     desript.classList.add("CARD");
  
    let price = document.createElement('footer');    
    price.innerText = obj.price + "$";   
    price.classList.add("price");  
    price.classList.add("CARD"); 

    let MMR = document.createElement('h2');   
    MMR.innerText = "MMR: " + obj.MMR;
    MMR.classList.add("MMR");
    MMR.classList.add("CARD");

    let cart = document.createElement('img');   
    cart.src = "/images/cart_icon.png";
    cart.id = "NUM_" + num;
    cart.classList.add("cart");
    if(obj.in_cart){
        cart.classList.add("cartTrue");  
    }
    cart.addEventListener("click",(event) => {addToCart(event)})
    cart.classList.add("CARD");  


    let Decency = document.createElement('h3');   
    Decency.innerText = "Порядочность: " + obj.Decency;
    Decency.classList.add("Decency");
    Decency.classList.add("CARD");

    document.querySelector('.content').append(divMenu); 
    divMenu.append(InfoImg);    
    divMenu.append(MMR);    
    divMenu.append(Decency);  
    divMenu.append(img);  
    divMenu.append(header);    
    divMenu.append(desript);   
    divMenu.append(price);
    divMenu.append(cart);
} 

function createCardInfo(num) {    
    
 
    if(document.querySelector(".INFOMENU") == null){

    let obj = dotaAccounts[num];
    let divMenu = document.createElement('div');    
    divMenu.classList.add("DivInfoMenu");   
    divMenu.classList.add("INFOMENU");   
    
  

    let img = document.createElement('img');    
    img.src = getImage(obj.MMR);   
    img.classList.add("MmrIcon");   
    img.classList.add("INFOMENU");   
      
    let exit = document.createElement('img');    
    exit.src = "/images/close_icon.png";   
    exit.classList.add("ExitInfo");  
    exit.addEventListener("click",() => {deleteInfo()}); 
    exit.classList.add("INFOMENU");   
    
   

    let divText = document.createElement('div');    
    divText.classList.add("divInfoText");   
    divText.classList.add("INFOMENU");   

    let title = document.createElement('h3'); 
    title.innerText = obj.title
    title.classList.add("INFOMENU");   
    title.classList.add("InfoTitleText");

    let descr = document.createElement('p'); 
    descr.innerText = obj.description;
    descr.classList.add("INFOMENU");   
    descr.classList.add("descript");   

    let guarnt = document.createElement('p'); 
    guarnt.innerText = "Гарантия: " + obj.Guarantee;
    guarnt.classList.add("AccInfoText");
    guarnt.classList.add("INFOMENU");   

    let divForImgMmr = document.createElement('div');
    divForImgMmr.classList.add("divForImgMmr");
    divForImgMmr.classList.add("INFOMENU");   

    let divForAccInfo = document.createElement('div');
    divForAccInfo.classList.add("divForAccInfo");
    divForAccInfo.classList.add("INFOMENU");   
    
    let MmrText = document.createElement("p");
    MmrText.innerText = "MMR: " + obj.MMR;
    MmrText.classList.add("AccInfoText");
    MmrText.classList.add("INFOMENU");   

    let DecencyText = document.createElement("p");
    DecencyText.innerText = "Порядочность: " + obj.Decency;
    DecencyText.classList.add("AccInfoText");
    DecencyText.classList.add("INFOMENU");  

    StLvl = document.createElement("p");
    StLvl.innerText = "Уровень Steam: " + obj.steamLevel;
    StLvl.classList.add("AccInfoText");
    StLvl.classList.add("INFOMENU");   

    let matches = document.createElement("p");
    matches.innerText = "Количество матчей: " + obj.NOfMatches;
    matches.classList.add("AccInfoText");
    matches.classList.add("INFOMENU");   

    let cart = document.createElement('img');   
    cart.src = "/images/cart_icon.png";
    cart.id = "NUM_" + num;
    cart.classList.add("Infocart");
    if(obj.in_cart){
        cart.classList.add("cartTrue");  
    }
    cart.addEventListener("click",(event) => {addToCart(event)})
    cart.classList.add("INFOMENU");  

    document.body.append(divMenu); 
    divMenu.append(divForImgMmr); 
    
    divMenu.append(title);
    divMenu.append(img);  

    divMenu.append(exit);  
    divMenu.append(divForAccInfo);
    
 

    


   divMenu.append(descr);
    
    divForAccInfo.append(MmrText);
    divForAccInfo.append(DecencyText);
    divForAccInfo.append(guarnt);
    divForAccInfo.append(matches);
    divForAccInfo.append(StLvl);
    divMenu.append(cart);
    }
}  
function createCartCard(obj,num){
        let divMenu = document.createElement('div');    
        divMenu.classList.add("DivCartMenu");   
        divMenu.id = `CartId${num}`;
        divMenu.style.background = `url(${getImage(obj.MMR)})`
        divMenu.style.backgroundRepeat = "no-repeat";
        divMenu.style.backgroundSize = "20vw 20vw";
 
          
        let title = document.createElement('h2'); 
        title.innerText = obj.title;
        title.classList.add("titleCart");

        let MMR = document.createElement('p'); 
        MMR.innerText = `MMR: ${obj.MMR}`;
        MMR.classList.add("mmrCart");

        let price = document.createElement('p'); 
        price.innerText = obj.price + "$";
        price.classList.add("priceCart");
    
        let close = document.createElement('img');   
        close.src = "/images/close_icon.png";
        close.id = "NUM_" + num;
        close.classList.add("CloseCartCardButton");
        close.addEventListener("click",(event) => {addToCart(event); deleteCartCard(event);})
    
        document.querySelector(".cartUser").prepend(divMenu); 
        divMenu.append(close);
        divMenu.append(title);
        divMenu.append(MMR);
        divMenu.append(price);
}
function filterMove(){  
    filter.classList.toggle("filterAnimation");   
    }  
function cartMove(){
    cartUser.classList.toggle("cartUserAnimation");  
    createAllCartCards()
}
function createAllCartCards(){
    for(i = 0; dotaAccounts.length > i; i++){   
        if(dotaAccounts[i].in_cart){
        createCartCard(dotaAccounts[i],i);   
        }
    }  
}
Poloski.addEventListener("click",filterMove);  
filterButton.addEventListener("click",filterCards);  
clearFilterButton.addEventListener("click",clearInputs);  
cartButtonUser.addEventListener("click",() => { deleteAllCartCards();cartMove();});  
CartButtonClear.addEventListener("click",() => { deleteAllCartCards();deleteAllFromCart();});  
CartButtonUpdate.addEventListener("click",() => { deleteAllCartCards();createAllCartCards();});  
LogoutButton.addEventListener("click",logout);  
KubokButton.addEventListener("click",CreateMatchesPreview);  
if(localStorage.getItem("TOKEN") != null){
logIn(localStorage.getItem("TOKEN"));
}
else{
createLogin();
}
