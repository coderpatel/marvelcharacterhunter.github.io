//importing md5
const md5 = require("crypto-js/md5")

let ts = Date.now().toString()
let pub_key = '2bbd65d3f0863b96bf6390c4e06e1e0a'
let pri_key = '708742b4b2545698ce3b369ca07f1281c2e7de44'

//making a hash key
let hash = md5(ts+pri_key+pub_key).toString()


// using pre defined character array for home page
let characterArray = ['Iron Man','Thor','Hulk','Black Widow','Hawkeye','Captain America','Vision','Peter Parker','Thanos']

let count=0
let elem
let characterContainer = document.getElementById("characterContainer")
//fetching details for every character
for(let i=0;i<9;i++){
    
    let url = `https://gateway.marvel.com:443/v1/public/characters?name=${characterArray[i].toUpperCase()}&ts=${ts}&apikey=${pub_key}&hash=${hash}`
    fetch(url).then((res) =>{return res.json()}).then((data) => {
        //defining element
        if(count == 0){
            elem = document.createElement('div')
            elem.classList.add("card-group","m-2")
        }
        count++
        console.log(data.data.results[0])
        let description = data.data.results[0]['description']
        if(description == '') description = 'A secret character, not much is known about them.'
        let imgSrc = data.data.results[0]['thumbnail']['path']+'.'+data.data.results[0]['thumbnail']['extension']
        let text = "Add to Favourites"
        if(localStorage.getItem(characterArray[i].toUpperCase()) != null){
            text = "Remove from Favourites"
        }
        //adding in element
        elem.innerHTML+=`<div class="card m-2">
        <img class="card-img-top" src="${imgSrc}" alt="Card image cap">
        <div class="card-body text-center">
        <h5 class="card-title text-center"><a href="character.html?name=${characterArray[i].toUpperCase()}" target="_blank">${characterArray[i].toUpperCase()}</a></h5>
        <p class="card-text text-center">${description}</p>
        <button type="button" id="${characterArray[i].toUpperCase()}" class="btn btn-secondary" onclick="toggleFav('${characterArray[i].toUpperCase()}')">${text}</button>
        </div>
        </div>`
        //adding in div
        if(i == 8){
            characterContainer.append(elem)
        }
        if(count == 3){
            characterContainer.append(elem)
            count = 0;
        }
    })
}