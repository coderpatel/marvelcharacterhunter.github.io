//importing md5

const md5 = require("crypto-js/md5")

//hashing
let ts = Date.now().toString()
let pub_key = '2bbd65d3f0863b96bf6390c4e06e1e0a'
let pri_key = '708742b4b2545698ce3b369ca07f1281c2e7de44'

let hash = md5(ts+pri_key+pub_key).toString()

let favDiv = document.getElementById("favourites") //fetching favourites div


let i=0
let count=0
let elem
//searaching in local storage
for(let ele in localStorage){
    if(localStorage.getItem(localStorage[ele]) != null){
        let charUrl = `https://gateway.marvel.com:443/v1/public/characters?name=${localStorage.getItem(localStorage[ele])}&ts=${ts}&apikey=${pub_key}&hash=${hash}`
        //fetching each charater with it's name
        fetch(charUrl).then((res) =>{ return res.json()}).then((data) =>{
            //console.log(data.data.results[0])
            
            if(count == 0){
                elem = document.createElement('div')
                elem.classList.add("card-group")
            }
            
            let result = data.data.results[0]
            let desc = result['description']
            //console.log(elem)
            if(desc === "") desc = 'A secret character, not much is known about them.'
            let imgSrc = data.data.results[0]['thumbnail']['path']+'.'+data.data.results[0]['thumbnail']['extension']
            elem.innerHTML += `<div class="card text-center" style:"width:18rem">
            <img class="card-img-top rounded mx-auto d-block" src="${imgSrc}" alt="Card image cap" style="width:50%">
            <div class="card-body">
            <h5 class="card-title">${localStorage.getItem(localStorage[ele])}</h5>
            <p class="card-text">${desc}</p>
            <button type="button" class="btn btn-secondary" onclick = "removeFav('${localStorage.getItem(localStorage[ele])}')">Remove from favourites</button>
            </div>`
            console.log(elem)
            count++
            
            if(i == (localStorage.length -1)){
                //console.log("here1")
                favDiv.append(elem)
            }
            i++
            if(count == 3){
                count = 0
                favDiv.append(elem)
            }
        })
        
    }
}



