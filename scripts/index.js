let output = document.getElementById("output");
let yes = document.getElementById("yes");
let reset = document.getElementById("reset");
let optionDisplay = document.getElementById("optionBox");
let numNouns = 0,
  numVerbs = 0,
  numAdj = 0,
  numVerbPast = 0,
  numAdverb = 0;

$(window).on("load", function () {
  $(".content").hide();
});

$.getScript("../words/adjectives.js", function () {});
$.getScript("../words/adverbs.js", function () {});
$.getScript("../words/nouns.js", function () {});
$.getScript("../words/verbs.js", function () {});

jQuery.get("../madlibs.txt", function (textString) {
  var stringArray = textString.split(" ");
  addClickableSpans(stringArray);
  let formattedString = "";
  for (var i = 0; i < stringArray.length; i++) {
    formattedString += stringArray[i] + " ";
  }
  output.innerHTML = formattedString;
});

yes.addEventListener("click", function () {
  $("#intro").hide();
  $(".content").show();
});

reset.addEventListener("click", function () {
  location.reload();
});

$(document).on("click", ".mutables", function () {
  let num;
  let choice;
  $("#optionBox").show();
  if (this.innerHTML.includes("adjective")) {
    choice = this.textContent;
    optionDisplay.innerHTML = "<label>Adjectives</label><br>";
    for (var i = 0; i < numAdj; i++) {
      num = Math.floor(Math.random() * adjectives.length);
      optionDisplay.innerHTML +=
        "<button class='optionButtons'>" + adjectives[num] + "</button><br>";
    }
    $(".optionButtons").on("click", function () {
      choice = this.textContent;
    });
  } else if (this.innerHTML.includes("noun")) {
    optionDisplay.innerHTML = "<label>Nouns</label><br>";
    for (var i = 0; i < numNouns; i++) {
      num = Math.floor(Math.random() * nouns.length);
      optionDisplay.innerHTML +=
        "<button class='optionButtons'>" + nouns[num] + "</button><br>";
    }
  } else if (this.textContent === "(verb)") {
    optionDisplay.innerHTML = "<label>Verbs</label><br>";
    for (var i = 0; i < numVerbs; i++) {
      num = Math.floor(Math.random() * verbs.length);
      optionDisplay.innerHTML +=
        "<button class='optionButtons'>" + verbs[num].present + "</button><br>";
    }
  } else if (this.innerHTML.includes("adverb")) {
    optionDisplay.innerHTML = "<label>Adverbs</label><br>";
    for (var i = 0; i < numAdverb; i++) {
      num = Math.floor(Math.random() * adverbs.length);
      optionDisplay.innerHTML +=
        "<button class='optionButtons'>" + adverbs[num] + "</button><br>";
    }
  } else if (this.textContent.includes("verb,")) {
    optionDisplay.innerHTML = "<label>Verbs, Past Tense</label><br>";
    for (var i = 0; i < numVerbPast; i++) {
      num = Math.floor(Math.random() * verbs.length);
      optionDisplay.innerHTML +=
        "<button class='optionButtons'>" + verbs[num].past + "</button><br>";
    }
  }

  this.textContent = choice;
});

function addClickableSpans(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].includes("(noun)")) {
      numNouns++;
      array[i] = '<button class="mutables">' + array[i] + "</button>";
    } else if (array[i].includes("(adjective)")) {
      numAdj++;
      array[i] = '<button class="mutables">' + array[i] + "</button>";
    } else if (array[i].includes("(adverb)")) {
      numAdverb++;
      array[i] = '<button class="mutables">' + array[i] + "</button>";
    } else if (array[i].includes("(verb,") && array[i + 1] === "past") {
      numVerbPast++;
      array[i] = '<button class="mutables">' + array[i];
      array[i + 1] = array[i + 1];
      array[i + 2] = array[i + 2] + "</button>";
    } else if (array[i].includes("(verb)")) {
      numVerbs++;
      array[i] = '<button class="mutables">' + array[i] + "</button>";
    }
  }
}
