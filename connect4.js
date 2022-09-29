"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {

  for(let y = 0; y<HEIGHT; y++){
    board.push([]);
    for(let x = 0; x<WIDTH; x++){
      //board[y].push([1]); simulate board filled
      board[y].push(null);
    }
  }
}

/** Creates the HTML board and adds Ids to individual cells.
 *  No parameters, returns nothing */

function makeHtmlBoard() {

  let htmlBoard = document.querySelector("#board");

  // Create header row, setting the id and the event listener
  const headerRow = document.createElement("tr");
  headerRow.setAttribute("id", "column-top");
  headerRow.addEventListener("click", handleClick); //move somewhere better

  // Create cells for header row, setting id and adding those cells
  // to the row
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    headerRow.append(headCell);
  }

  // Add header row to the htmlBoard
  htmlBoard.append(headerRow);

  // dynamically creates the main part of html board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findValidRowInColumn: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 5
  // start at y = 5, if it is filled, move up.  repeat.  if 0 filled return null
  
  for(let y = 5; y>=0; y--){
    //debugger;
    if(board[y][x]===null){
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement("div");
  piece.classList.add("piece", `p${currPlayer}`);
  // Need to do as classlist, setAttribute takes last one set
  // piece.setAttribute("class", "piece");
  // piece.setAttribute("class", `p${currPlayer}`);
  //document.querySelector(`#${y}-${x}`).append(piece); won't properly select, needs letter before number #c${y}-${x}
  document.getElementById(`${y}-${x}`).append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
  const smallPause = 3000;
  setTimeout(()=>location.reload(), smallPause);
}



/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  board[y][x] = currPlayer === 1 ? 1 : 2;

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if(board.flat().every(cell => cell !== null)){
    //game over
    endGame("It's a tie")
  }

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
