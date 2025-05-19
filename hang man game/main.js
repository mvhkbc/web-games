let lettersDiv = document.querySelector(".letters")
let category =document.querySelector(".catagory span")
let hangman = document.querySelector(".hangman")
let container = document.querySelector(".container")
let wrong = ["wrong-1","wrong-2","wrong-3","wrong-4","wrong-5","wrong-6","wrong-7","wrong-8"]
let succes= document.getElementById("succes")
let fail= document.getElementById("fail")
let count = 0

let words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}
let letters = "abcdefghijklmnopqrstuvwxyz";
let arrayOfLetters= Array.from(letters)
arrayOfLetters.forEach(e => {
  let letterBox=document.createElement("span")
  letterBox.className="letter-box"
  letterBox.textContent=e
  lettersDiv.append(letterBox)
})
let allKeys = Object.keys(words);
let randomPropName = allKeys[Math.floor(Math.random() * allKeys.length)];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let word = randomPropValue[randomValueNumber];

category.textContent=randomPropName
word = word.toUpperCase().split("")
let testWord = word

word.forEach(e => {
  let guees = document.querySelector(".letters-guess")
  let span = document.createElement("span")
  guees.append(span)
  span.dataset.letter=e
  console.log(span.dataset.letter)
})

function mainGame() {
  document.addEventListener("click" , function(e) {
    if (e.target.className === "letter-box") {
            e.target.style.backgroundColor="#777"
            e.target.style.pointerEvents = "none"
      if (testWord.includes(e.target.textContent.toUpperCase())){
        let gus =document.querySelectorAll(".letters-guess span")
        rightGuss(e,gus)
        gameWin(gus)
      }else {
        wrongGuss()
        gameFail()
      }
    }
  })
}

function rightGuss(e,gus) {
  gus.forEach(q=> {
    if(q.dataset.letter == e.target.textContent.toUpperCase()){
      q.textContent=q.dataset.letter
      count+=1
      fail.pause();
      succes.pause();             
      succes.currentTime = 0;   
      succes.volume = 0.05
      succes.play();
    }
  })
}

function gameWin(gus) {
  if (count==gus.length){
    let gg =document.createElement("div")
    gg.textContent="GG"
    container.append(gg)
    gg.style.cssText="color: red;text-align: center;font-weight: bold;font-size: 100px;"
    let letterBox=document.querySelectorAll(".letters span")
    letterBox.forEach(letter=>{
      letter.style.cursor = "default"
      letter.style.pointerEvents = "none"
    })
    retry()
  }
}

function wrongGuss() {
  hangman.classList.add(wrong.shift())
  succes.pause(); 
  fail.pause();             
  fail.currentTime = 0;   
  fail.volume = 0.03
  fail.play();
}

function gameFail() {
  if (hangman.classList.contains("wrong-8")) {
    let letters = document.querySelectorAll(".letters span")
    let gameOver =document.createElement("div")
    gameOver.textContent="Game Over"
    container.append(gameOver)
    gameOver.style.cssText="color: red;text-align: center;font-weight: bold;font-size: 100px;"
    letters.forEach(letter => {
      letter.style.pointerEvents = "none"
      letter.style.cursor = "default"     
    });
    retry()
  }
}

function retry() {
  let btn = document.createElement("div")
  btn.textContent="Retry"
  btn.style.cssText="    text-align: center;font-weight: bold;font-size: 26px;background-color: red;width: fit-content;margin: 20px auto;padding: 10px;border-radius: 6px;color: white;cursor: pointer;"
  container.append(btn)
  btn.onclick = function() {
    window.location.reload();
  }
}

mainGame()