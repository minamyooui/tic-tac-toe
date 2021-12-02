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
  const getArr = () => arr;
  return { update, newBoard, render, getArr, arr }
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
  
  const playerTurn = (player = p1) => {
    const marker = player.getMarker();
    const boxes = document.querySelectorAll('.block');
    boxes.forEach(e => {
      if (e.textContent == ' ') {
        e.addEventListener('click', placeMarker);
        e.addEventListener('click', callPlay)
      } 
    });
    function placeMarker() {
      gameboard.update(marker, this.id);
      if (checkWin()) {
        const h1 = document.createElement('h1');
        h1.textContent = `${player.getName()} wins!`;
        const body = document.querySelector('body');
        body.appendChild(h1);
        removeAll();
      }
      this.removeEventListener('click', placeMarker);
    }

    function removeAll() {
      boxes.forEach(e => {
        e.removeEventListener('click', callPlay);
        e.removeEventListener('click', placeMarker);
      });
    }
  };

  
  const play = (player) => {
    playerTurn(player);
    return player;
  }
  const callPlay = function() {
    if (player == p1) {
      player = play(p2);
    } else {
      player = play(p1);
    }
    this.removeEventListener('click', callPlay);
  }
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
    const arr = gameboard.getArr();
    if (arr[a] == ' ' || arr[b] == ' ' || arr[c] == ' ') {
      return false;
    }else if (arr[a] == arr[b] && arr[b] == arr[c]) {
      return true;
    } else {
      return false;
    }
  }
  let player = play(p1);
  return {checkWin}
})();

