const gameboard = (() => {
  const arr = ['X', 'X', 'O', 'O', 'X', 'X', 'O', 'O', 'X'];
  const render = () => {

  };
  const update = (marker, index) => {
    arr.splice(index, 1, marker);
    render();
  };
  const newBoard = () => {
    arr.splice(0, arr.length);
    for (let i = 0; i < 9; i++) {
      arr.push(' ');
    }
    render();
  };

  return { update, newBoard }


})();

const game = (() => {
  const p1 = Player('Player1', 'X');
  const p2 = Player('Player2', 'O');
  gameboard.newBoard();
  const checkWin = () => {
    const checks = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let win;
    for (const e of checks) {
      win = checkRow(e[0], e[1], e[2])
      if (win) break;
    }
    return win
  }
  const checkRow = (a, b, c) => {
    if (arr[a] == arr[b] && arr[b] == arr[c]) {
      return true;
    } else {
      return false;
    }
  }
})();

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker }
};