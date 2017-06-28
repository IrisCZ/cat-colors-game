$(document).ready(
  function(){
    var columns = prompt("¿Cuantas columnas quieres?");
    if (columns > 29 || columns < 3){
      alert("Wenwenwen... El número de columnas tiene que estar entre 3 y 29 coleguita");
    }
    var board = [];
    for(var y=0; y<columns; y++){
      var row =[];
      for(var x=0; x<columns; x++){
        var cell = {
          x : x,
          y : y
        }
        row.push(cell);
      }
      board.push(row);
    }

    var gameBoard = $("#board");
    var colorsLegend = $("#colors");
    var colorSelected = "";

    var colors = ["red", "purple", "orange", "blue"];
    for (var z=0; z<colors.length; z++){
      var cellColorsLegend = $("<div>");
      var color = colors[z];
      cellColorsLegend.addClass("cell").addClass(color);
      cellColorsLegend.data("color",color);
      cellColorsLegend.appendTo(colorsLegend);
      cellColorsLegend.click(function(){
        colorSelected = $(this).data("color");
      });
    }


    for(var y=0; y<board.length; y++){
      var row=board[y];
      for(var x=0; x<row.length; x++){
        var cell = row[x];
        var color = colors[Math.floor((Math.random() * 4))];
        var cellContent = $("<div>")
        cellContent.addClass("cell").addClass(color);
        cellContent.css("width", (100/columns)+"%").css("height", (100/columns)+"%");
        cellContent.data("x", cell.x);
        cellContent.data("y", cell.y);
        cellContent.data("color",color);
        cellContent.appendTo(gameBoard);
        cellContent.click(function(){
          //console.log("HAS PINCHADO EN ", $(this).data("x"), $(this).data("y"));
          var ball = $(this);
          ball.removeClass(ball.data("color")).addClass(colorSelected);
          ball.data("color", colorSelected);
        });
      }
    }
  }
)
