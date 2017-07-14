var TABLET_WIDTH = 1024;
var TABLET_HEIGHT = 1570;
var MIN_COLUMNS = 5;
var MAX_COLUMNS = 29;
var MAX_COLUMNS_SMALL_DEVICES = 12;
var colorSelected = "";
var colors = ["red", "purple", "orange", "blue"];
var clickCount = 0;

function askForColumns(){
  var columns = prompt("¿Cuántas columnas quieres?");

  if(isSmallDevice() && outOfSmallDeviceRange(columns) ) {
    alert("Con un aparato tan pequeño mejor no elijas más de 12 ¡No queremos dejarte ciego!");
    return askForColumns();
  }
  if (isMaxColumns(columns) || isMinColumns(columns)){
    alert("Wenwenwen... El número de columnas tiene que estar entre "
          + MIN_COLUMNS + " y " + MAX_COLUMNS + " coleguita");
    return askForColumns();
  }
  return columns;
}
function outOfSmallDeviceRange(size){
  var isMaxColumnsSmallDevice = (size > MAX_COLUMNS_SMALL_DEVICES);
  return (isMaxColumnsSmallDevice || isMinColumns(size));
}
function isMaxColumns (columns){
  return (columns > MAX_COLUMNS);
}
function isMinColumns (columns){
  return (columns < MIN_COLUMNS);
}

function isSmallDevice(){
  var smallWidth = window.innerWidth <= TABLET_WIDTH;
  var smallHeight = window.innerHeight <= TABLET_HEIGHT;
  return (smallWidth && smallHeight);
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
        if (!colorSelected){
          alert("A alguien se le ha olvidado seleccionar un color... ¡Vuelve a intentarlo!");
          return;
        }
        var ball = $(this);
        var ballOldColor = ball.data("color");
        var ballX = ball.data("x");
        var ballY = ball.data("y");
        var changed = changeColor(ballOldColor, ballX, ballY);
        if (changed){
          clickCount++;
        };
        $("#movesCounter").html(clickCount);
      });
    }
  }
  var boardHeight = $('.board').width();
  $('.board').css({'height':boardHeight+'px'});

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
        $(".legend").removeClass("selected");
        $(this).addClass("selected");
      });
    }
  }
}

function startGame(){
  drawLegend();
  var columnsNumber = askForColumns();
  var board = createBoard(columnsNumber);
  drawBoard(board);
  $("#movesCounter").html(0);
  clickCount=0;
  colorSelected="";
  $(".legend").removeClass("selected");
}

$(document).ready(
  function(){
    startGame();
  }
)
