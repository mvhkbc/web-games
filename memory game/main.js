
let namee = window.prompt("What's your name?");
let tries = document.querySelector(".trie");
let game = document.querySelector(".game");
let n =document.querySelector(".name")
n.textContent = namee
let lockBoard = false;
let count = 0;
let comp = [];
let imgs_links = [
  "imgs/code.png", "imgs/code.png",
  "imgs/html.png", "imgs/html.png",
  "imgs/java-script.png", "imgs/java-script.png",
  "imgs/mysql.png", "imgs/mysql.png",
  "imgs/php.png", "imgs/php.png",
  "imgs/programmer.png", "imgs/programmer.png",
  "imgs/python.png", "imgs/python.png",
  "imgs/swift.png", "imgs/swift.png",
  "imgs/typescript.png", "imgs/typescript.png",
  "imgs/visual-basic.png", "imgs/visual-basic.png",
];

window.onload = function () {
  imgs_links.sort(() => 0.5 - Math.random());

  for (let i = 0; i < imgs_links.length; i++) {
    let box = document.createElement("div");
    box.className = "box";
    let boxInner = document.createElement("div");
    boxInner.className = "box-inner";
    let front = document.createElement("div");
    front.className = "front";
    let back = document.createElement("div");
    back.className = "back";
    back.textContent = "?";
    let img = document.createElement("img");
    img.src = imgs_links[i];
    img.style.width = "80px";
    front.appendChild(img);
    boxInner.appendChild(back);
    boxInner.appendChild(front);
    box.appendChild(boxInner);
    game.appendChild(box);
    box.classList.add("flipped");

    box.addEventListener("click", function () {
      if (lockBoard || !box.classList.contains("flipped")) return;
      box.classList.remove("flipped");
      comp.push(box);
      if (comp.length === 2) {
        lockBoard = true;
        let img1 = comp[0].querySelector("img").src;
        let img2 = comp[1].querySelector("img").src;
        if (img1 !== img2) {
          count++;
          setTimeout(() => {
            comp[0].classList.add("flipped");
            comp[1].classList.add("flipped");
            comp = [];
            lockBoard = false;
          }, 800);
        } else {
          comp = [];
          lockBoard = false;
        }
        tries.textContent = `Tries: ${count}`;
      }
    });
  }
};