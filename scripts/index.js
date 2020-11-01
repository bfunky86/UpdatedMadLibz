let output = document.getElementById('output');
var numNouns = 0, numVerbs = 0, numAdj = 0, numVerbPast = 0, numAdverb = 0;

$(window).on('load', function () {
    $('#output').hide();
})

$(document).ready(function () {
    $('#yes').click(function () {
        $('#intro').hide();
        $('#output').fadeIn(3000);
        displayPrompt();
        $('.choices-top').fadeIn(5000);
        $('.choices-bottom').fadeIn(5000);
    });
});

function displayPrompt() {
    jQuery.get('../madlibs.txt', function (textString) {
        output.textContent = textString;
        var stringArray = textString.split(' ');
        checkNums(stringArray);
        /*var transformed;
        transformed = stringArray[0] + ' ';
        for(var j = 1; j < stringArray.length; j++){
            transformed += stringArray[j] + ' ';
        }
        output.textContent = transformed;*/
    })
}

function checkNums(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].includes('(noun)')) {
            numNouns++;
        }
        else if (array[i].includes('(adjective)')) {
            numAdj++;
        }
        else if (array[i].includes('(adverb)')) {
            numAdverb++;
        }
        else if (array[i].includes('(verb,') && array[i + 1] === ('past')) {
            numVerbPast++;
        }
        else if (array[i].includes('(verb)')) {
            numVerbs++;
        }
    }
}