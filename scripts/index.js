const output = document.getElementById("output");
const yes = document.getElementById("yes");
const reset = document.getElementById("reset");
const optionDisplay = document.getElementById("optionBox");
const player = document.getElementById("player");
let playerName;
let numNouns = 0,
  numVerbs = 0,
  numAdj = 0,
  numVerbPast = 0,
  numAdverb = 0;

$(window).on("load", function () {
  //playerName = prompt("What is your name?");
  //player.textContent = playerName;
  $(".content").hide();
});

//get prompt from txt file and display to output
jQuery.get("../madlibs.txt", function (textString) {
  var stringArray = textString.split(" ");
  //add clickable buttons to mutable words
  addClickableButtons(stringArray);
  let formattedString = "";
  for (var i = 0; i < stringArray.length; i++) {
    formattedString += stringArray[i] + " ";
  }
  output.innerHTML = formattedString;
});

// hide intro and show main content
yes.addEventListener("click", () => {
  $("#intro").hide();
  $(".content").fadeIn(2000);
});

// make optionBox disappear if someone clicks anything other than the mutable words
document.body.addEventListener("click", function (e) {
  if (e.target.textContent !== "ADVERB") {
    optionDisplay.style.display = "none";
  } else if (e.target.textContent !== "ADJECTIVE") {
    optionDisplay.style.display = "none";
  } else if (e.target.textContent !== "NOUN") {
    optionDisplay.style.display = "none";
  } else if (e.target.textContent !== "VERB") {
    optionDisplay.style.display = "none";
  } else if (e.target.textContent !== "VERB, PAST TENSE") {
    optionDisplay.style.display = "none";
  }
});

//onclick reload the page
reset.addEventListener("click", () => {
  location.reload();
});

//change font color mutables on focus
$(document).on("focus", ".mutables", function () {
  this.style.color = "red";
});

//change font color of mutables on blur
$(document).on("blur", ".mutables", function () {
  this.style.color = "white";
});

$(document).on("click", ".mutables", function () {
  let num;
  $("#optionBox").show();
  if (this.textContent === "ADJECTIVE") {
    optionDisplay.innerHTML = "<label>Adjectives</label><br>";
    for (var i = 0; i < numAdj; i++) {
      num = Math.floor(Math.random() * adjectives.length);
      optionDisplay.innerHTML +=
        "<button class='optionButtons'>" + adjectives[num] + "</button><br>";
    }
  } else if (this.textContent === "NOUN") {
    optionDisplay.innerHTML = "<label>Nouns</label><br>";
    for (var i = 0; i < numNouns; i++) {
      num = Math.floor(Math.random() * nouns.length);
      optionDisplay.innerHTML +=
        "<button class='optionButtons'>" + nouns[num] + "</button><br>";
    }
  } else if (this.textContent === "VERB") {
    optionDisplay.innerHTML = "<label>Verbs</label><br>";
    for (var i = 0; i < numVerbs; i++) {
      num = Math.floor(Math.random() * verbs.length);
      optionDisplay.innerHTML +=
        "<button class='optionButtons'>" + verbs[num].present + "</button><br>";
    }
  } else if (this.textContent === "ADVERB") {
    optionDisplay.innerHTML = "<label>Adverbs</label><br>";
    for (var i = 0; i < numAdverb; i++) {
      num = Math.floor(Math.random() * adverbs.length);
      optionDisplay.innerHTML +=
        "<button class='optionButtons'>" + adverbs[num] + "</button><br>";
    }
  } else if (this.textContent === "VERB, PAST TENSE") {
    optionDisplay.innerHTML = "<label>Verbs, Past Tense</label><br>";
    for (var i = 0; i < numVerbPast; i++) {
      num = Math.floor(Math.random() * verbs.length);
      optionDisplay.innerHTML +=
        "<button class='optionButtons'>" + verbs[num].past + "</button><br>";
    }
  }
  changeWords(this);
});

//change value of mutable word to option chosen by user
function changeWords(buttonEl) {
  $(".optionButtons").on("click", function (e) {
    buttonEl.textContent = e.target.textContent;
    buttonEl.style.color = "#dbb100";
    buttonEl.style.background = "#00058f";
  });
}

// for each mutable word in array, change element of array to button object
function addClickableButtons(array) {
  array.forEach((element, index = 0) => {
    if (element.includes("noun")) {
      numNouns++;
      array[index] =
        '<button class="mutables">' +
        array[index].substring(1, 5).toUpperCase() +
        "</button>";
    } else if (element.includes("adjective")) {
      numAdj++;
      array[index] =
        '<button class="mutables">' +
        array[index].substring(1, 10).toUpperCase() +
        "</button>";
    } else if (element.includes("(adverb)")) {
      numAdverb++;
      array[index] =
        '<button class="mutables">' +
        array[index].substring(1, 7).toUpperCase() +
        "</button>";
    } else if (element.includes("(verb,") && array[index + 1] === "past") {
      numVerbPast++;
      array[index] =
        '<button class="mutables">' + array[index].substring(1).toUpperCase();
      array[index + 1] = array[index + 1].toUpperCase();
      array[index + 2] =
        array[index + 2].substring(0, 5).toUpperCase() + "</button>";
    } else if (element.includes("(verb)")) {
      numVerbs++;
      array[index] =
        '<button class="mutables">' +
        array[index].substring(1, 5).toUpperCase() +
        "</button>";
    } else {
      array[index] = element;
    }
    index++;
  });
}
