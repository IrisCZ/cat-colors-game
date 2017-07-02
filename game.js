var colorSelected = "";
var colors = ["red", "purple", "orange", "blue"];
var counterClick = 0;

function askForColumns(minColumns, maxColumns){
  var columns = prompt("¿Cuántas columnas quieres?");
  if (columns > maxColumns || columns < minColumns){
    alert("Wenwenwen... El número de columnas tiene que estar entre "
          + minColumns + " y " + maxColumns + " coleguita");
    return askForColumns();
  }
  return columns;
}

function createBoard(columns){
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
  return board;

}

function drawBoard(board){
  var gameBoard = $("#board");
  gameBoard.html("");

  for(var y=0; y<board.length; y++){
    var row=board[y];
    for(var x=0; x<row.length; x++){
      var cell = row[x];
      var color = colors[Math.floor((Math.random() * colors.length))];
      var cellContent = $("<div>");
      cellContent.addClass("cell").addClass("cat").addClass(color);
      cellContent.css("width", (100/row.length)+"%").css("height", (100/row.length)+"%");
      cellContent.data("x", cell.x);
      cellContent.data("y", cell.y);
      cellContent.attr("id", "cell_"+(cell.x)+"_"+(cell.y));
      cellContent.data("color",color);
      cellContent.appendTo(gameBoard);
      cellContent.click(function(){
        var ball = $(this);
        var ballOldColor = ball.data("color");
        var ballX = ball.data("x");
        var ballY = ball.data("y");
        var changed = changeColor(ballOldColor, ballX, ballY);
        if (changed){
          counterClick++;
        };
        console.log("¡Llevas " + counterClick+ " jugadas!")
      });
    }
  }
}
function changeColor(oldColor, x, y){
  var ballAround= $('#cell_'+x+'_'+y);
  if (ballAround.data("color") === oldColor && ballAround.data("color") !== colorSelected){
    ballAround.removeClass(ballAround.data("color")).addClass(colorSelected);
    ballAround.data("color", colorSelected);
    changeColor(oldColor, x, y-1);
    changeColor(oldColor, x+1, y);
    changeColor(oldColor, x, y+1);
    changeColor(oldColor, x-1, y);
    return true;
  }
  return false;
}

function drawLegend(){
  var colorsLegend = $("#colors");
  if(colorsLegend.html().length === 0){
    for (var z=0; z<colors.length; z++){
      var cellColorsLegend = $("<div>");
      var color = colors[z];
      cellColorsLegend.addClass("cell").addClass("legend").addClass(color);
      cellColorsLegend.data("color",color);
      cellColorsLegend.appendTo(colorsLegend);
      cellColorsLegend.click(function(){
        colorSelected = $(this).data("color");
      });
    }
  }
}

function startGame(){
  drawLegend();
  var columnsNumber = askForColumns(3, 29);
  var board = createBoard(columnsNumber);
  drawBoard(board);
}

$(document).ready(
  function(){
    startGame();
  }
)
