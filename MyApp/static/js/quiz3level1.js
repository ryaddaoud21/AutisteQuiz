var rowOne = "",
	rowTwo = "",
	rowThree = "",
	rowOneSelected = "",
	rowTwoSelected = "",
	rowThreeSelected = "";

function initializeDefaults() {
	$(".user-choice").fadeTo("fast", 1);
	rowOne = "",
	rowTwo = "",
	rowThree = "",
	rowOneSelected = "",
	rowTwoSelected = "",
	rowThreeSelected = "";
}

function generateColorArray( colorCount ) {
	var colors = [];

	for( var i = 0; i < colorCount; i++ ) {
		colors.push( getRandomColor() );
	}

	return colors;
}

function restart() {
	initializeDefaults();
	var colors = generateColorArray(3);

	$("#target-color").css("background-color", colors[1]);
	$("#reset").css("background-color", colors[1]);

	$(".row").each(function() {
		var thisRowColors = shuffle(colors.slice(0));
		$row = $(this);

		$row.find(".user-choice").each(function() {
			$(this).css("background-color", thisRowColors.pop());
		});
	});
}

function clickFade(rowNumber, rowNumberSelected, selectedElement, rowClass) {
	if (rowNumber !== "") {
		selectedElement.fadeTo("fast", 1);
	}

	rowNumber = selectedElement.html();
	rowNumberSelected = selectedElement;
	rowClass.not(selectedElement).fadeTo("fast", .5);

	return [rowNumber, rowNumberSelected];
}

function compare(rowCompare, rowCompareTwo, selectedElement) {
	if (rowCompare === "" && rowCompareTwo === "") {
		return;
	} else if (rowCompare !== "") {
		if (selectedElement.css("background-color") !== rowCompare.css("background-color")) {
			initializeDefaults();
		}
	} else if (rowCompareTwo !== "") {
		if (selectedElement.css("background-color") !== rowCompareTwo.css("background-color")) {
			initializeDefaults();
		}
	}
}

function complete(rowCompare, rowCompareTwo, rowCompareThree) {
	if (rowCompare !== "" && rowCompareTwo !== "" && rowCompareThree !== "") {
		if (rowCompare.css("background-color") === $("#target-color").css("background-color")) {
			$("#win-lose").html("Good job!");
			restart();
		} else {
			$("#win-lose").html("Oops! Wrong color!");
			initializeDefaults();
		}
	}
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$(".first-row").click(function() {
	var returned = clickFade(rowOne, rowOneSelected, $(this), $(".first-row"));
	rowOne = returned[0];
	rowOneSelected = returned[1];
	compare(rowTwoSelected, rowThreeSelected, $(this));
	complete(rowTwoSelected, rowThreeSelected, $(this));
});

$(".second-row").click(function() {
	var returned = clickFade(rowTwo, rowTwoSelected, $(this), $(".second-row"));
	rowTwo = returned[0];
	rowTwoSelected = returned[1];
	compare(rowOneSelected, rowThreeSelected, $(this));
	complete(rowOneSelected, rowThreeSelected, $(this));
});

$(".third-row").click(function() {
	var returned = clickFade(rowThree, rowThreeSelected, $(this), $(".third-row"));
	rowThree = returned[0];
	rowThreeSelected = returned[1];
	compare(rowOneSelected, rowTwoSelected, $(this));
	complete(rowOneSelected, rowTwoSelected, $(this));
});

$("#reset").click(function() {
	restart();
});