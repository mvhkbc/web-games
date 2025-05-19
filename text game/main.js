let start = document.querySelector(".game .container .start");
let content = document.querySelector(".container");
let input = document.querySelector(".game .container .input");
let text = document.querySelector(".game .container .words");
let time = document.querySelector(".game .container .time .seconds");
let lvl = document.querySelector(".game .container .settings .mode");
let sec = document.querySelector(".game .container .time .seconds");
let got = document.querySelector(".game .container .score .got");
let total = document.querySelector(".game .container .score .total");
let retry = document.createElement("div");
let over = document.createElement("div");
let settings = document.querySelector(".settings");
let prevWord = "";
let firstWord = "";

input.readOnly = true;

let words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];
let newWords=0
got.innerHTML = 0;
total.innerHTML = words.length;
let lvls = {
  Easy: 6,
  Normal: 4,
  Hard: 3,
};
let count = lvls.Normal * 2;
time.innerHTML = count;
document.querySelector(".seconds").innerHTML = count / 2;

let def = document.querySelector("select");

def.onchange = function () {
  count = lvls[def.value] * 2;
  time.innerHTML = count;
  document.querySelector(".seconds").innerHTML = count / 2;
};

start.onclick = function () {
  baseGame();
};
document.addEventListener("click", function (e) {
  if (e.target.className == "btn") {
    got.textContent = 0;
    over.style.display = "none";
    retry.style.display = "none";
    baseGame();
  }
});
function baseGame() {
  settings.style.display = "none";
  count = lvls[def.value] * 2;
  shuffleArray(words);
  prevWord = newWords[0];

  displayWord();

  foucsInput();

  creatingWords();

  timer();

  input.oninput = function () {
    if (input.value.toLowerCase() === prevWord.toLowerCase()) {
      ++got.innerHTML;
      clearInterval(n);

      count = lvls[def.value];
      input.value = "";
      prevWord = newWords[0];

      displayWord();

      creatingWords();

      timer();
    }
  };
}

function displayWord() {
  input.previousElementSibling.style.display = "none";
  let word = document.createElement("div");
  word.textContent = newWords[0];
  document.querySelector(".game .container").insertBefore(word, input);

  word.style.cssText =
    "text-align: center;color: #2196f3;font-size: 36px;margin-bottom: 5px;font-weight: bold;";

    newWords.shift();
}

function foucsInput() {
  input.readOnly = false;
  input.focus();
}

function creatingWords() {
  text.textContent = "";
  for (i = 0; i < newWords.length; i++) {
    let div = document.createElement("div");
    div.textContent = newWords[i];

    text.append(div);

    div.style.cssText =
      "width: fit-content;padding: 3px 5px;background-color: #2196f3;color: white;border-radius: 6px;margin:  5px;display: inline-block;";
  }
}

function showGameOver() {
  if (count == 0) {
    settings.style.display = "flex";
    over.textContent = "GAME OVER";
    content.append(over);

    over.style.cssText =
      "margin-top:50px;font-size: 38px; color: red; text-align: center;";
    input.readOnly = true;

    retry.className = "btn";
    retry.textContent = "RETRY";
    content.append(retry);
    retry.style.cssText =
      "margin: 50px auto;background-color: red;width: fit-content;color: white;padding: 10px;border-radius: 6px;cursor: pointer;";
  }
}

function timer() {
  n = setInterval(function () {
    time.textContent = --count;
    if (count == 0) {
      clearInterval(n);
      showGameOver();
    }
    console.log();
  }, 1000);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    newWords=words.slice(0)
  }
}
