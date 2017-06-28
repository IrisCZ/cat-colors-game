var colorSelected = "";
var colors = ["red", "purple", "orange", "blue"];

function askForColumns(minColumns, maxColumns){
  var columns = prompt("¿Cuantas columnas quieres?");
  if (columns > maxColumns || columns < minColumns){
    alert("Wenwenwen... El número de columnas tiene que estar entre 3 y 29 coleguita");
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
      var color = colors[Math.floor((Math.random() * 4))];
      var cellContent = $("<div>")
      cellContent.addClass("cell").addClass(color);
      cellContent.css("width", (100/row.length)+"%").css("height", (100/row.length)+"%");
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

function drawLegend(){
  var colorsLegend = $("#colors");
  if(colorsLegend.html().length === 0){
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
  }
}

function startGame(){
  drawLegend();
  var columns = askForColumns(3, 29);
  var board = createBoard(columns);
  drawBoard(board);
}

$(document).ready(
  function(){
    startGame();
  }
)
