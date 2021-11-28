const gameboard = (() => {
  const arr = [];
  const render = () => {
    const boxes = document.querySelectorAll('.block');
    boxes.forEach((e, i) => {
      e.textContent = arr[i];
    });
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
  return { update, newBoard, render }
})();

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker }
};

const game = (() => {
  const p1 = Player('Player1', 'X');
  const p2 = Player('Player2', 'O');
  gameboard.newBoard();
 
  const playerTurn = (player) => {
    const marker = player.getMarker();
    const boxes = document.querySelectorAll('.block');
    function placeMarker() {
      this.textContent = marker;
      boxes.forEach(e => {
        e.removeEventListener('click', placeMarker);
      });
    }
    boxes.forEach(e => {
      if (e.textContent == ' ') {
        e.addEventListener('click', placeMarker);
      } 
    });
  };
  playerTurn(p1);
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
  // const play = (() => {
  //   let keepGoing = true;
  //   while(keepGoing) {
  //     takeTurn(p1);
  //     takeTurn(p2);
  //   }
  // })();
})();

