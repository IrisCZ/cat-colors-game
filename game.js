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

function drawBoard(columns){
  var board = getCleanBoard();

  for(var y=0; y<columns; y++){
    drawRow(columns, y, board);
  }
  resizeHeightBoard(board);
}
function getCleanBoard(){
  var board = $("#board");
  board.html("");
  return board;
}

function resizeHeightBoard(board){
  var boardHeight = board.width();
  board.css({'height':boardHeight+'px'});
}

function drawRow(size, column, board){
  for(var x=0; x<size; x++){
    var cellContent = buildCellContent(size, x, column);
    board.append(cellContent);
  }
}

function buildCellContent(numCells, x, y){
  var color = getRandomColor();
  var cellContent = $("<div>");
  cellContent.addClass("cell").addClass("cat").addClass(color);
  cellContent.css("width", (100/numCells)+"%").css("height", (100/numCells)+"%");
  cellContent.data("x", x);
  cellContent.data("y", y);
  cellContent.attr("id", "cell_"+x+"_"+y);
  cellContent.data("color",color);
  cellContent.click(onClickElement);
  return cellContent;
}

function getRandomColor(){
  return colors[Math.floor((Math.random() * colors.length))];
}

function onClickElement(){
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
}

function changeColor(oldColor, x, y){
  var ballAround= $('#cell_'+x+'_'+y);
  var isOldColor = ballAround.data("color")  === oldColor;
  var isNotColorSelected = ballAround.data("color") !== colorSelected;
  if (isOldColor && isNotColorSelected){
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
  drawBoard(columnsNumber);
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
