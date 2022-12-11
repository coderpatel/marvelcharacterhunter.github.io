let url = document.URL // fetching URL of the current page

url = url.split('=')

let currChar = url[1].split('%20')
currChar = currChar.join(' ') // extracted character name from url


document.title = currChar //setting title
document.getElementById("head").innerText = currChar

//importing md5
const md5 = require("crypto-js/md5")

//hashing
let ts = Date.now().toString()
let pub_key = '2bbd65d3f0863b96bf6390c4e06e1e0a'
let pri_key = '708742b4b2545698ce3b369ca07f1281c2e7de44'

let hash = md5(ts+pri_key+pub_key).toString()
let charUrl = `https://gateway.marvel.com:443/v1/public/characters?name=${currChar.toUpperCase()}&ts=${ts}&apikey=${pub_key}&hash=${hash}`

//fetching characters with API
fetch(charUrl).then((res) =>{return res.json()}).then((data) => {
    let charId = data.data.results[0]['id']
    //console.log(charId)
    let imgSrc = data.data.results[0]['thumbnail']['path']+'.'+data.data.results[0]['thumbnail']['extension']
    document.getElementById("charImg").setAttribute("src",imgSrc)
    let description = data.data.results[0]['description']
    if(description == '') description = 'A secret character, not much is known about them.'
    document.getElementById("describe").innerHTML = `<h4>"${description}"</h4>`
    //fetching comics
    let comicUrl = `https://gateway.marvel.com:443/v1/public/characters/${charId}/comics?ts=${ts}&apikey=${pub_key}&hash=${hash}`
    fetch(comicUrl).then((respo) => {return respo.json()}).then((comicData) =>{
        let comicUl = document.getElementById("comic")
        let result = comicData.data.results
        for(let i=0;i<result.length;i++){
            comicUl.innerHTML+= `<li class="list-group-item">${result[i]['title']}</li>`
        }
    })
    //fetching events
    let eventUrl = `https://gateway.marvel.com:443/v1/public/characters/${charId}/events?ts=${ts}&apikey=${pub_key}&hash=${hash}`
    fetch(eventUrl).then((respo)=> {return respo.json()}).then((eventData) =>{
        let eventUl = document.getElementById("event")
        let result = eventData.data.results
        for(let i=0;i<result.length;i++){
            eventUl.innerHTML+= `<li class="list-group-item">${result[i]['title']}</li>`
        }
    })
    //fetching series
    let seriesUrl = `https://gateway.marvel.com:443/v1/public/characters/${charId}/series?ts=${ts}&apikey=${pub_key}&hash=${hash}`
    fetch(seriesUrl).then((respo)=> {return respo.json()}).then((seriesData) =>{
        let seriesUl = document.getElementById("series")
        let result = seriesData.data.results
        for(let i=0;i<result.length;i++){
            seriesUl.innerHTML+= `<li class="list-group-item">${result[i]['title']}</li>`
        }
    })
    //fetching stories
    let storiesUrl = `https://gateway.marvel.com:443/v1/public/characters/${charId}/stories?ts=${ts}&apikey=${pub_key}&hash=${hash}`
    fetch(storiesUrl).then((respo)=> {return respo.json()}).then((storiesData) =>{
        let storiesUl = document.getElementById("stories")
        let result = storiesData.data.results
        for(let i=0;i<result.length;i++){
            storiesUl.innerHTML+= `<li class="list-group-item">${result[i]['title']}</li>`
        }
    })
})