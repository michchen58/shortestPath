
function Node(coords, prev, next) {
  return {
    coords: coords,
    prev: prev,
    next: next,
  }
}

function printMatrix(b) {
    b.forEach((row, i) => console.log('  ' + row.map(x => (x === -1 ? '  ' : (x < 10 ? ' ' + x : x))).join('  ')));
}

function getNeighbors(coords) {
  let curRow = coords.row;
  let curCol = coords.col;
  return [
    {col: (curCol), row: (curRow - 1)}, // top
    {col: (curCol + 1), row:(curRow)}, // right
    {col: (curCol), row: (curRow + 1)}, // bottom
    {col: (curCol - 1), row:(curRow)}, // left
  ];
}

function isReachable(board, start, end) {
    let newBoard = board.slice();
    var num = 1;
    let frontier = [start];
    newBoard[start.row][start.col] = 0;

    function inBounds(coords) {
      let curRow = newBoard[coords.row];
      let curSquare = curRow ? curRow[coords.col] : undefined;
      return curSquare === -1;
    }

    function addSquareToFrontier(newFrontier, coords) {
      let newSquares = [];

      if (inBounds(coords)) {
          newBoard[coords.row][coords.col] = num;
          newFrontier.push(coords);
          return true;
      } else {
          return false;
      }
    }

    let result;

    // while (!result) {
    while (frontier.length > 0 && !result) {
        console.log('=====================================');
        let newFrontier = [];

        frontier.forEach(square => {
            if (square.row === end.row && square.col === end.col) {
                result = end;
                return square;
            }

            // set current as visited (no longer frontier)
            let curNeighbors = getNeighbors(square);

            curNeighbors.forEach(square => {
              addSquareToFrontier(newFrontier, square);
            });
        });
        frontier = newFrontier;
        printMatrix(newBoard);
        num++;
    }

}

/*

--is more space efficient--
store a pointer of how you got to each cell ("when I explored cell F, I got
there from cell B, so I can keep an external structure F -> B")

--comes out the cleanest--
store the full path you took to each cell ("I got to cell B by going G -> H -> B.
Then I explored cell F from there. So I store a map like F: [G, H, B, F]")

*/

// create empty 8x8 board
var board = Array(8).fill().map((x,i) => Array(8).fill(-1));

// add walls to map
// vertical
board = board.map((row, y) => row.map((squareVal, x) => ((x === 2 && y >= 0 && y <= 5) ? '██' : squareVal)));
// horizontal
board = board.map((row, y) => row.map((squareVal, x) => ((x >= 2 && x <= 5 && y === 6) ? '██' : squareVal)));
board = board.map((row, y) => row.map((squareVal, x) => ((x >= 4 && x <= 6 && y === 2) ? '██' : squareVal)));


var startCoords = {col: 0, row: 0};
var endCoords = {col: 7, row: 0};

isReachable(board, startCoords, endCoords);
