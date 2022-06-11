/*
donker blauw #0084DC
donker rose #FF3264
donker geel #FFC700
donkergroen #6BCA00
*/
var colors = [
    "#0084DC", "#FF3264", "#FFC700", "#6BCA00"
];
//onzichtbaar
$('.vinkje').hide();
$('.kruisje').hide();
//10 letters in totaal ( maximum )
var woorden = [
    "a", "b", "c", "d","f"
];
//var woord = "hallo";
function randomWoord() {
    var wordplek = Math.floor(Math.random() * woorden.length);
    var woord = woorden[wordplek];
    return woord;
}
var woord = randomWoord();
woord = woord.toUpperCase();
woord = woord.split("");
//woord[0] woord[1] ...
var woordarrlengte = woord.length;
//maak grijze woord
/*

  <div class="fullword"><div class="container">
  <div class="centered">
      <h1 class="letter word" style="" title="W">W</h1>
  </div>
</div>
<div class="container">
  <div class="centered">
      <h1 class="letter word" style="" title="O">O</h1>
  </div>
</div>
<div class="container">
  <div class="centered">
      <h1 class="letter word" style="" title="R">R</h1>
  </div>
</div>
<div class="container">
  <div class="centered">
      <h1 class="letter word" style="" title="D">D</h1>
  </div>
</div>
</div>
*/
for (n = 0; n < woordarrlengte; n++) {
    var huidigeletter = woord[n];
    var elm = '<div class="container"><div class="centered"><h1 class="letter word wordletter' + n + '" ';
    elm += 'title="' + huidigeletter + '">';
    elm += huidigeletter + '</h1></div></div>';
    $(elm).appendTo('.fullword');
}

function randomLetter() {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
        var plekletter = Math.floor(Math.random() * chars.length);
        var randomletter = chars.substring(plekletter, plekletter + 1);
        return randomletter;
    }
    //randomLetter();
function randomKleur() {
        var i = Math.floor(Math.random() * colors.length);
        var kleur = colors[i];
        return kleur;
    }
    //randomKleur();
function randomNrTussen(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    //randomNrTussen(min,max);
var hoogtedoc = $(document).height();
var breedtedoc = $(document).width();
var aantal = 10;
for (n = 0; n < aantal; n++) {
    if (n >= woordarrlengte) {
        var huidigeletter = randomLetter();
    } else {
        var huidigeletter = woord[n];
    }
    var elm = '<h1 class="letter letter' + n + '" ';
    elm += 'style="color:' + randomKleur() + ';top:' + randomNrTussen(10, hoogtedoc - 20) + 'px;left:' + randomNrTussen(10, breedtedoc - 20) + 'px;transform: rotate(' + randomNrTussen(-10, 10) + 'deg);" title="' + huidigeletter + '">';
    elm += huidigeletter + '</h1>';
    $(elm).appendTo('body');
}

function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;
    //var str1 = $( ".letter" ).text();
    //var str2 = $( ".word" ).text();

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

function juistfout(letter, wordletter) {
        if (collision($(letter), $(wordletter))) {
            //$(wordletter).css( "color", "red" );
            var str1 = $(letter).text();
            var str2 = $(wordletter).text();
            if (str1 == str2) {
                $(wordletter).attr('style', 'color: green !important');
                //$(letter).attr('style', 'transform: rotate(0deg) !important;');//flikkerfout
                $(letter).addClass("letternorotation");
                $(wordletter).parent().parent().attr('style', 'background: green');
                //toon juistvinkje flikkerfout
                /*//$('.vinkje').show();
                $('.vinkje').addClass("zichtbaar");
                setTimeout(function() {
                    //$('.vinkje').hide();
                	$('.vinkje').removeClass("zichtbaar");
                }, 5000);*/
                if ($(".container").css('background')=="green") alert("juist");
            } else {
                $(wordletter).attr('style', 'color: red !important');
                $(wordletter).parent().parent().attr('style', 'background: red');
                //toon foutkruisje flikkerfout
                /*//$('.kruisje').show();
                $('.kruisje').addClass("zichtbaar");
                setTimeout(function() {
                    //$('.kruisje').hide();
                	$('.kruisje').removeClass("zichtbaar");
                }, 5000);*/
            }
        }
    }
    //vraag huidige muislocatie op
var currentMousePos = {
    x: -1,
    y: -1
};

$(document).mousemove(function(event) {
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
});

window.setInterval(function() {
    //$('#result').text(collision($('#div1'), $('#div2')));
    //$('#result').text(collision($('.letter0'), $('.letter1')));
    //$('#result').text(collision($('.letter0'), $('.wordletter0')));
    //reset
    for (r = 0; r < woordarrlengte; r++) {
        var wordletter = '.wordletter' + r;
        $(wordletter).attr('style', 'color: #555 !important');
        $(wordletter).parent().parent().attr('style', 'background: #999999');
    }
    for (n = 0; n < aantal; n++) {
        //$('#result').text(collision($('.letter' + n), $('.wordletter' + n)));
        var letter = '.letter' + n;
        //var wordletter = '.wordletter' + n;
        //juistfout(letter, wordletter);
        for (nw = 0; nw < woordarrlengte; nw++) {
            var wordletter = '.wordletter' + nw;
            juistfout(letter, wordletter);
        }
    }
    //kruisje en vinkje
    $('.vinkje').css({
        left: currentMousePos.x,
        top: currentMousePos.y,
        zIndex: 60
    });
    $('.kruisje').css({
        left: currentMousePos.x,
        top: currentMousePos.y,
        zIndex: 60
    });

}, 200);


$('.letter').draggable({
    cancel: ".word"
});