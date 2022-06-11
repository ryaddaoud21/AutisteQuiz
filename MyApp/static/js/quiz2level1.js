$(document).ready(function () {
            $(".selectable").draggable({
                addClasses: false,
                snap: true,
                stack: ".destination",
				scroll: false
            });

            $(".destination").draggable({
                snapMode: "inner"
            });

            $(".destination").draggable("disable");

            $(".destination").droppable({
                drop: function (event, ui) {
                    var selectedShape = ui.draggable.attr("id");
                    var dropZone = $(this).attr("id");
                    dropZone = dropZone.replace("inside", "");
                    if(selectedShape == dropZone)
                    {
                        $("#" + selectedShape).draggable("disable");
                        checkShapeStatus();
                    }
                    else {
                        alert("Wrong choice!");
                    }
                }
            });
        });
        function checkShapeStatus() {
            var counter = 0;
            $(".selectable").each(function () {
                var $thisId = $(this);
                var booleanValue = $thisId.draggable('option', 'disabled');
                if (booleanValue)
                {
                    counter = counter + 1;
                }
                else {
                }
                if(counter == 4)
                {
                    $("#centerText").text('You win!');
                    $("#centerText").fadeIn(1000).fadeOut(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000);
                }
            })
        }