let heroes;
let items;
let itemsID
const IconsUrl = "https://cdn.cloudflare.steamstatic.com"
fetch(`https://api.opendota.com/api/heroStats`).then(pl => pl.json()).then(json => {heroes = json})
fetch(`https://raw.githubusercontent.com/odota/dotaconstants/master/build/items.json`).then(pls => pls.json()).then(json => {items = json})
fetch(`https://raw.githubusercontent.com/odota/dotaconstants/master/build/item_ids.json`).then(pls => pls.json()).then(json => {itemsID = json})

function getPlayer(PlArr,PlSlot){
    for (let item of PlArr) {
        if(item.player_slot == PlSlot){
            return item;
        }
    }
}
function getHero(idHero){
    for (let item of heroes) {
        if(item.id == idHero){
            return item
        }
    }
    }
    function getItem(idItem){
        let itemName = itemsID[idItem]

        return items[itemName];             
        }
   
function CreateMatchesPreview(){
    document.querySelector("#allContent").classList.add("hide");
    document.body.classList.add("backgroundForBody");
    let divMenu = document.createElement('div');    
    divMenu.classList.add("DivForMatches");   

    let topPl = document.createElement('img'); 
   
    topPl.classList.add("ProPlayersButton");  
    topPl.src = "/images/topPlIcon.jpg"
    topPl.addEventListener("click",createTopPlList)
    
let banner = document.createElement('div'); 
banner.classList.add("BannerMatch")

    let close = document.createElement('img');   
    close.src = "/images/logout_icon.png";
    close.classList.add("OutMatch");
    close.addEventListener("click",ExitFromMatches)

    let Pl = document.createElement('img');   
    Pl.src = "/images/ButtonStat.jpg";
    Pl.classList.add("PlButton");
    Pl.addEventListener("click",createPlayerStatisticPreview)
  
    /*let HeroesInfoB = document.createElement('img');   
    HeroesInfoB.src = "/images/ButtonStat.jpg";
    HeroesInfoB.classList.add("HIButton");
    HeroesInfoB.addEventListener("click",createPlayerStatisticPreview)*/

    window.addEventListener('scroll', scrollLoadMatch);
    createCardsMatches(5);

    document.body.prepend(divMenu);   
    divMenu.append(banner);
    banner.append(Pl);  
    banner.append(topPl);
    banner.append(close);

}
let createsCards = 0;
let timers = [];
function createCardsMatches(colv){
    fetch('https://api.opendota.com/api/proMatches')
    .then(res=>res.json())
    .then(json=>getMatchesFromMassive(json,colv)).catch(() => {alert("сайт сейчас недоступен, повторите попытку позже")})
}

function getMatchesFromMassive(json,colv){
    let delay = 500;
    if(createsCards+colv < json.length){
    for(let i = createsCards; i < createsCards+colv;i++){
        let timer = setTimeout(() => {fetch(`https://api.opendota.com/api/matches/${json[i].match_id}`)
        .then(res=>res.json()).then(json => createCardMatch(json))},delay);
        timers.push(timer);
        delay += 1000;
    }
    createsCards += colv;
    }
}     
              
      
 
function createCardMatch(Match){
 
       // console.log(Match);
        if(Match != undefined && Match.radiant_name != undefined && Match.dire_name != undefined && Match.players.length == 10 && Match.picks_bans != undefined){
            
    let divMenu = document.createElement('div');    
    divMenu.classList.add("DivForMatch")
    setTimeout(() => {divMenu.classList.add("DivForMatchAnimation")},100)
    
    let text = document.createElement("h4");
    text.innerText = `${Match.radiant_name} VS ${Match.dire_name}`
    text.classList.add("TitleMatch");
    
    let TimeText = document.createElement("h5");
    TimeText.classList.add("TimeText");
     
        let time = Match.duration;
        let timeString = '';
  
        let hours = Math.trunc(time / 3600);
        let minutes = Math.trunc((time % 3600) / 60);
        let seconds = Math.trunc(time % 60);
      
        if(hours != 0){
        timeString = `${hours}:`
        }
        if(minutes < 10){
         timeString += '0';
         }
         timeString += `${minutes}:`;
         if(seconds < 10){
             timeString += '0';
             }
             timeString += `${seconds}`;
             TimeText.innerText = `${timeString}`

    

    let image = document.createElement("img");
    image.src = "/images/dota2_logotype.png"
    image.classList.add("Dota2LogotypeImg");

    let league = document.createElement("p");
    league.innerText = `League: ${Match.league.name}`
    league.classList.add("LeagueMatch")

    let more = document.createElement("p");
    more.innerText = `Подробнее о матче`
    more.classList.add("MoreMatch");
    more.addEventListener("click",() => createMatchInfo(Match));

    let divForText = document.createElement('div'); 
    divForText.classList.add("divForMore")  

    document.querySelector(".DivForMatches").append(divMenu);
    divMenu.append(text);
    divMenu.append(TimeText);
    divMenu.append(image);
    
    divMenu.append(divForText);
    divForText.append(league);
    divForText.append(more);
        
    }
    else{
        createCardsMatches(1);
    }
    }

function ExitFromMatches(){
    createsCards = 0
    for (let i = 0; i < timers.length; i++) {
        clearTimeout(timers[i]);
    }
    document.querySelector(".DivForMatches").remove();
    document.body.classList.remove("backgroundForBody");
    document.querySelector("#allContent").classList.remove("hide");
    deleteMatchInfo();
    window.removeEventListener('scroll', scrollLoadMatch);
    
}
function scrollLoadMatch(){
    if(window.scrollY + 1 >= document.documentElement.scrollHeight - document.documentElement.clientHeight){
        createCardsMatches(1);
        }
}


function createMatchInfo(Match){
    console.log(Match)
    if(document.querySelector(".DivInfoMatch") == null){
       
    let divMenu = document.createElement('div');    
    divMenu.classList.add("DivInfoMatch");   
    setTimeout(() => {divMenu.classList.add("DivInfoMatchAnimation")},1)
    let exit = document.createElement('img');    
    exit.src = "/images/close_icon.png";   
    exit.classList.add("ExitInfoMatch");  
    exit.addEventListener("click",() => {setTimeout(() => {deleteMatchInfo()},500);divMenu.classList.remove("DivInfoMatchAnimation")}); 

    
  
    

    let text = document.createElement("h4");
    text.innerText = `${Match.radiant_name} VS ${Match.dire_name}`
    text.classList.add("TitleMatch");  

    let matchChat = document.createElement('div');
    matchChat.classList.add("MatchChat") ;   

    let bans = document.createElement('div');
    bans.classList.add("MatchChat")

    let divForBansAndChat = document.createElement('div');
    divForBansAndChat.classList.add("divForBansAndChat")

    document.body.append(divMenu); 
    divMenu.append(text);
   
    let divMenuForPlayers = document.createElement('div');    
    divMenuForPlayers.classList.add("DivForTeamsPl"); 
    divMenu.append(divMenuForPlayers)
    let Radiant_team = document.createElement('p');   
    Radiant_team.innerText = `Radiant team: `;
    if(Match.radiant_win){
        Radiant_team.innerText = `Radiant team - winner: `;
    }
    divMenuForPlayers.append(Radiant_team)
    for(let i = 0; i < 5; i++) { 
        let Pl = document.createElement("p");
        img = document.createElement("img")
        if(Match.players[i].personaname != null){
            Pl.innerText += `${Match.players[i].personaname} - ${getHero(Match.players[i].hero_id).localized_name}`;
        }
        else{
            Pl.innerText += `Скрыто - ${getHero(Match.players[i].hero_id).localized_name}`;
        }
         
    
            img.src = `${IconsUrl}${getHero(Match.players[i].hero_id).icon}`
            img.classList.add("ImgHeroIconPl");

            let divForStats = document.createElement("div");
            divForStats.classList.add("DivForStatss")
            let killsTXT = document.createElement("p");
            killsTXT.innerText = `${Match.players[i].kills}`
            killsTXT.classList.add("statTxt");

            let killsImg = document.createElement("img");
            killsImg.src = `/images/kills.png`
            killsImg.classList.add("ImgPlStatsIcon");

            let deathsTXT = document.createElement("p");
            deathsTXT.innerText = `${Match.players[i].deaths}`
            deathsTXT.classList.add("statTxt");

            let deathsImg = document.createElement("img");
            deathsImg.src = `/images/deaths.png`
            deathsImg.classList.add("ImgPlStatsIcon");

            Radiant_team.append(Pl);
            Pl.append(img);
            divForStats.append(killsTXT);
            divForStats.append(killsImg);
            divForStats.append(deathsTXT);
            divForStats.append(deathsImg);
            img.after(divForStats)
            for(let j = 0;j < 3; j++){
                if(Match.players[i][`backpack_${j}`] != 0 && getItem(Match.players[i][`backpack_${j}`]) != undefined){
                    let div = document.createElement("div")
                    div.classList.add("DivForTimeAndImgItems")
                let image = document.createElement("img")
                image.src = `${IconsUrl}${getItem(Match.players[i][`backpack_${j}`]).img}`
                image.classList.add("ItemsPlayersBackpack")
               Pl.after(div);
               div.append(image)
               if(Match.players[i].purchase_time != undefined){
                if(Match.players[i].purchase_time[itemsID[Match.players[i][`backpack_${j}`]]] != undefined ){
                    let DivForTime = document.createElement("div");
                    DivForTime.classList.add("MatchDivForTime")
                 
                    let time = Match.players[i].purchase_time[itemsID[Match.players[i][`backpack_${j}`]]];
                    let timeString = '';
                    if(Match.players[i].purchase_time[itemsID[Match.players[i][`backpack_${j}`]]] < 0){
                        timeString += "-";
                        time = Math.abs(time);
                    }
              
                    let hours = Math.trunc(time / 3600);
                    let minutes = Math.trunc((time % 3600) / 60);
                    let seconds = Math.trunc(time % 60);
                  
                    if(hours != 0){
                    timeString = `${hours}:`
                    }
                    if(minutes < 10){
                     timeString += '0';
                     }
                     timeString += `${minutes}:`;
                     if(seconds < 10){
                         timeString += '0';
                         }
                         timeString += `${seconds}`;
                     DivForTime.innerText = `${timeString}`
                     image.after(DivForTime);
                }
               }
                }
            }
            for(let j = 0;j < 6; j++){
               if(getItem(Match.players[i][`item_${j}`]) != undefined){
                let div = document.createElement("div")
                div.classList.add("DivForTimeAndImgItems")
                let image = document.createElement("img")
        
                image.src = `${IconsUrl}${getItem(Match.players[i][`item_${j}`]).img}`
                image.classList.add("ItemsPlayers")
           
                Pl.after(div);
                div.append(image);
               if(Match.players[i].purchase_time != undefined){
                if(Match.players[i].purchase_time[itemsID[Match.players[i][`item_${j}`]]] != undefined ){
                    let DivForTime = document.createElement("div");
                    DivForTime.classList.add("MatchDivForTime")
                 
                    let time = Match.players[i].purchase_time[itemsID[Match.players[i][`item_${j}`]]];
                    let timeString = '';
                    if(Match.players[i].purchase_time[itemsID[Match.players[i][`item_${j}`]]] < 0){
                        timeString += "-";
                        time = Math.abs(time);
                    }
                    let hours = Math.trunc(time / 3600);
                    let minutes = Math.trunc((time % 3600) / 60);
                    let seconds = Math.trunc(time % 60);
                    

                    if(hours != 0){
                    timeString = `${hours}:`
                    }
                    if(minutes < 10){
                     timeString += '0';
                     }
                     timeString += `${minutes}:`;
                     if(seconds < 10){
                         timeString += '0';
                         }
                         timeString += `${seconds}`;
                     DivForTime.innerText = `${timeString}`
                     image.after(DivForTime);
                }
            }
            }
        }
        
    }
    
    let Dire_team = document.createElement('span');    
    Dire_team.innerText = `Dire team:`;
    if(Match.radiant_win == false){
        Dire_team.innerText = `Dire team - winner: `;
    }
    divMenuForPlayers.append(Dire_team)
    for(let i = 5; i < 10; i++) { 
        let Pl = document.createElement("p");
        img = document.createElement("img")
        if(Match.players[i].personaname != null){
            Pl.innerText += `${Match.players[i].personaname} - ${getHero(Match.players[i].hero_id).localized_name}`;
        }
        else{
            Pl.innerText += `Скрыто -  ${getHero(Match.players[i].hero_id).localized_name}`;
        }
          
            img.src = `${IconsUrl}${getHero(Match.players[i].hero_id).icon}`
            img.classList.add("ImgHeroIconPl");
            Dire_team.append(Pl);
            Pl.append(img);
            let divForStats = document.createElement("div");
            divForStats.classList.add("DivForStatss")
            let killsTXT = document.createElement("p");
            killsTXT.innerText = `${Match.players[i].kills}`
            killsTXT.classList.add("statTxt");

            let killsImg = document.createElement("img");
            killsImg.src = `/images/kills.png`
            killsImg.classList.add("ImgPlStatsIcon");

            let deathsTXT = document.createElement("p");
            deathsTXT.innerText = `${Match.players[i].deaths}`
            deathsTXT.classList.add("statTxt");

            let deathsImg = document.createElement("img");
            deathsImg.src = `/images/deaths.png`
            deathsImg.classList.add("ImgPlStatsIcon");

            Dire_team.append(Pl);
            divForStats.append(killsTXT);
            divForStats.append(killsImg);
            divForStats.append(deathsTXT);
            divForStats.append(deathsImg);
            img.after(divForStats)
            for(let j = 0;j < 3; j++){
                if(Match.players[i][`backpack_${j}`] != 0 && getItem(Match.players[i][`backpack_${j}`]) != undefined){
                    let div = document.createElement("div")
                    div.classList.add("DivForTimeAndImgItems")
                let image = document.createElement("img")
                image.src = `${IconsUrl}${getItem(Match.players[i][`backpack_${j}`]).img}`
                image.classList.add("ItemsPlayersBackpack")
               Pl.after(div);
               div.append(image)
               if(Match.players[i].purchase_time != undefined){
                if(Match.players[i].purchase_time[itemsID[Match.players[i][`backpack_${j}`]]] != undefined ){
                    let DivForTime = document.createElement("div");
                    DivForTime.classList.add("MatchDivForTime")
                 
                    let time = Match.players[i].purchase_time[itemsID[Match.players[i][`backpack_${j}`]]];
                    let timeString = '';
                    if(Match.players[i].purchase_time[itemsID[Match.players[i][`backpack_${j}`]]] < 0){
                        timeString += "-";
                        time = Math.abs(time);
                    }
              
                    let hours = Math.trunc(time / 3600);
                    let minutes = Math.trunc((time % 3600) / 60);
                    let seconds = Math.trunc(time % 60);
                  
                    if(hours != 0){
                    timeString = `${hours}:`
                    }
                    if(minutes < 10){
                     timeString += '0';
                     }
                     timeString += `${minutes}:`;
                     if(seconds < 10){
                         timeString += '0';
                         }
                         timeString += `${seconds}`;
                     DivForTime.innerText = `${timeString}`
                     image.after(DivForTime);
                }
               }
                }
            }
            for(let j = 0;j < 6; j++){
               if(getItem(Match.players[i][`item_${j}`]) != undefined){
                let div = document.createElement("div")
                div.classList.add("DivForTimeAndImgItems")
                let image = document.createElement("img")
        
                image.src = `${IconsUrl}${getItem(Match.players[i][`item_${j}`]).img}`
                image.classList.add("ItemsPlayers")
           
                Pl.after(div);
                div.append(image);
               if(Match.players[i].purchase_time != undefined){
                if(Match.players[i].purchase_time[itemsID[Match.players[i][`item_${j}`]]] != undefined ){
                    let DivForTime = document.createElement("div");
                    DivForTime.classList.add("MatchDivForTime")
                 
                    let time = Match.players[i].purchase_time[itemsID[Match.players[i][`item_${j}`]]];
                    let timeString = '';
                    if(Match.players[i].purchase_time[itemsID[Match.players[i][`item_${j}`]]] < 0){
                        timeString += "-";
                        time = Math.abs(time);
                    }
                    let hours = Math.trunc(time / 3600);
                    let minutes = Math.trunc((time % 3600) / 60);
                    let seconds = Math.trunc(time % 60);
                 
                    if(hours != 0){
                    timeString = `${hours}:`
                    }
                    if(minutes < 10){
                     timeString += '0';
                     }
                     timeString += `${minutes}:`;
                     if(seconds < 10){
                         timeString += '0';
                         }
                         timeString += `${seconds}`;
                     DivForTime.innerText = `${timeString}`
                     image.after(DivForTime);
                }
               }
            }
        } 
    
    }
   
    
    divMenu.append(divForBansAndChat);
    divForBansAndChat.append(bans);  
    let bansText = document.createElement('p');    
    bansText.innerText = "Баны персонажей: "
    bans.append(bansText)
    for (let item of Match.picks_bans) {

  if(item.is_pick == false){
        let img = document.createElement("img");
         let BanHero = document.createElement('p');
            BanHero.innerText += getHero(item.hero_id).localized_name;
            img.src = `${IconsUrl}${getHero(item.hero_id).icon}`
            img.classList.add("ImgHeroIconBan");
            bans.append(BanHero)
            BanHero.append(img);
    }
    } 

    if(Match.chat != null){
        divForBansAndChat.append(matchChat);  
        let chatText = document.createElement('p');    
        chatText.innerText = "Чат: "
        matchChat.append(chatText)
    for (let item of Match.chat) {
        if(item.type == "chat"){
         let chat = document.createElement('p');
        
    
       if(getPlayer(Match.players,item.player_slot) != undefined){
       if(getPlayer(Match.players,item.player_slot).personaname != undefined){
            chat.innerText += `${getPlayer(Match.players,item.player_slot).personaname}: ${item.key}`;
       }
       else{
        chat.innerText += `Скрыто: ${item.key}`;
       }
        matchChat.append(chat)
    }
        }
    } 
 
  
}
 
    divMenu.append(exit);  
  
}
}
function deleteMatchInfo(){
    if(document.querySelector(".DivInfoMatch") != null){
    document.querySelector(".DivInfoMatch").remove();
    }
}




function createTopPlList(){
    if(document.querySelector(".ProPlayerDiv") == null){
    let el = document.createElement("div");
    el.classList.add("ProPlayerDiv")
    setTimeout(() => {el.classList.add("anim")},1);
    document.querySelector(".DivForMatches").append(el);
 
    fetch(`https://api.opendota.com/api/proPlayers`).then(pls => pls.json()).then(json => {createTopPlCard(json)})
    }
    else{
        setTimeout(() => {document.querySelector(".ProPlayerDiv").remove()},2000);document.querySelector(".ProPlayerDiv").classList.remove("anim")
    }
}
function createTopPlCard(list){
    //console.log(list)
    let div = document.querySelector(".ProPlayerDiv");

    let close = document.createElement("img");  
    close.src = "/images/close_icon.png";
    close.classList.add("PrPlClose");
    close.addEventListener("click",() => {setTimeout(() => {div.remove()},2000);div.classList.remove("anim")})

    let zagolovok = document.createElement("h3");   
    zagolovok.innerText = "Лучшие игроки: " 
    zagolovok.classList.add("PrPlH4");     

    div.append(close)
    div.append(zagolovok)
for (let i = 0; i < 5;i++) {
     let divMenu = document.createElement("div");
     divMenu.classList.add("ForProPlayerDiv")

    let img = document.createElement("img");
   img.src = list[i].avatarfull;
   img.classList.add("AvatarImg")

   let name = document.createElement("h6");
   name.innerText = list[i].personaname
   name.classList.add("PersonanamePrPl")

   div.append(divMenu);
   divMenu.append(img);
   divMenu.append(name);

  if(list[i].loccountrycode != null){
   let country = document.createElement("p")
   country.innerText = `ID: ${list[i].account_id} Country: ${list[i].loccountrycode}`
   country.classList.add("CountryPrPl")
   divMenu.append(country);
}
 else{
    let id = document.createElement("p")
    id.innerText = `ID: ${list[i].account_id}`
    id.classList.add("CountryPrPl")
    divMenu.append(id);
 }
   
}
}

function createPlayerStatisticPreview(){

    if(document.querySelector(".PlayerStatisticPreview") == null){
        let el = document.createElement("div");
  
        let input = document.createElement("input")
        input.type = "text"
        input.placeholder = "Введите ID вашего аккаунта"
        input.classList.add("InputStats");
        if(localStorage.getItem("Account_ID") != null){
            input.value = localStorage.getItem("Account_ID");
        }
        
        let divStat = document.createElement("div");
        divStat.classList.add("PlayerStatisticDiv")
        divStat.innerText = `Введите ID и нажмите кнопку "показать"`

        let divForButtons = document.createElement("div");
        divForButtons.classList.add("PlStatsDivButtons")
        
        let buttonSend = document.createElement("button");
        buttonSend.innerText = "Показать";
        buttonSend.classList.add("ButtonStats");

        buttonSend.addEventListener("click",()=>{
            divStat.innerText = "Загрузка..."
    fetch(`https://api.opendota.com/api/players/${input.value}/heroes`).then(pl => pl.json()).then(json => {createPlayerStatistic(json);})
  
        })
 let buttonSave = document.createElement("button");
        buttonSave.innerText = "Сохранить ID";
        buttonSave.classList.add("ButtonStats");

        buttonSave.addEventListener("click",()=>{
            localStorage.setItem("Account_ID",input.value)
  })


        el.classList.add("PlayerStatisticPreview")
        setTimeout(() => {el.classList.add("PlStatPreviewAnim")},1);
        document.querySelector(".DivForMatches").append(el);
        let close = document.createElement('img');   
        close.src = "/images/close_icon.png";
        close.classList.add("ExitFromStats");
        close.addEventListener("click",() =>  {setTimeout(() => {el.remove()},2000);el.classList.remove("PlStatPreviewAnim")});
        el.append(close);
        el.append(input);
        el.append(divForButtons);
        divForButtons.append(buttonSave);
        divForButtons.append(buttonSend);
        el.append(divStat);
        
    
        }
        else{
            setTimeout(() => {document.querySelector(".PlayerStatisticPreview").remove()},2000);document.querySelector(".PlayerStatisticPreview").classList.remove("PlStatPreviewAnim")

        }
}

function createPlayerStatistic(obj){
  //  console.log(obj)

    let el =  document.querySelector(".PlayerStatisticDiv")
    el.innerText = ""
    let wins = 0;
    let games = 0;
   try{
    for (let item of obj) {
        if(item.games != 0){
        let div = document.createElement("div")
        div.classList.add("PlStDiv");
        let IconHero = document.createElement("img")
        IconHero.src = `${IconsUrl}${getHero(item.hero_id).img}`
        IconHero.classList.add("IconHeroStats")
   
        let stat = document.createElement("p")
        stat.innerHTML = `<p>Процетное соотношение побед: ${Math.round((item.win / item.games) * 100)}%<br>Игр: ${item.games} Побед: ${item.win}</p>`
        stat.classList.add("StTxt");

        wins += item.win;
        games += item.games;

        el.append(div);
        div.append(IconHero)
        div.append(stat);
    }
}
   }
finally{

if(document.querySelector(".PlStDiv") == null){
    let text = document.createElement("p")
    text.innerText = "Ничего не найдено"
    el.append(text)
} 
else{
    let text = document.createElement("p");
    text.classList.add("WinRateText")
    text.innerText = `Винрейт: ${Math.round((wins / games) * 100)}%`
    el.prepend(text);
}
}
}

