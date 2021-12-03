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
  return { update, newBoard, render, getArr }
})();

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker }
};

const computer = (() => {
  const play = () => {
    let i = gameboard.getArr().findIndex(e => e == ' ');
    gameboard.update('O', i);
    console.log('comp');
    return 'computer';
  }
  return { play }
})();

const game = (() => {
  let p1, p2, player, pTurn, compPlay = false;
  const newGameButton = document.querySelector('#new-game');
  newGameButton.addEventListener('click', showForm);
  const submit = document.querySelector('#submit');
  submit.addEventListener('click', setPlayers);
  const close = document.querySelector('#close');
  close.addEventListener('click', closeForm);
  const playComputer = document.querySelector('#playComp');
  playComputer.addEventListener('click',  startComputerGame);
  function startComputerGame() {
    compPlay = true;
    p1 = Player('Player', 'X');
    pTurn = playerTurn();
    player = play(p1);
  }
  const getPlayer = () => player;
  function setPlayers() {
    let p1Name = document.querySelector('#P1').value;
    let p2Name = document.querySelector('#P2').value;
    p1 = Player(p1Name, 'X');
    p2 = Player(p2Name, 'O');
    document.querySelector('#P1').value = '';
    document.querySelector('#P2').value = '';
    closeForm();
    startGame();
  }
  function startGame() {
    pTurn = playerTurn();
    player = play(p1);
  }
  
  function showForm() {
    const form = document.querySelector('.form');
    form.classList.toggle('hideform');
    newGame();
  }
  function newGame() {
    gameboard.newBoard();
    const div = document.querySelector('.message');
    if (div.firstChild) {
      div.removeChild(div.firstChild);
    }
    if (pTurn) {
      pTurn.removeAll();
    }
  }
  function closeForm() {
    const form = document.querySelector('.form');
    form.classList.toggle('hideform');
  }
  const playerTurn = () => {
    let marker;
    const boxes = document.querySelectorAll('.block');
    boxes.forEach(e => {
      if (e.textContent == ' ') {
        e.addEventListener('click', placeMarker);
        e.addEventListener('click', callPlay)
      } 
    });
    const setMarker = (player) => {
      marker = player.getMarker();
    }
    const removeAll = () => {
      for (let i = 0; i < 10; i++) {
        boxes.forEach(e => {
          e.removeEventListener('click', callPlay);
          e.removeEventListener('click', placeMarker);
        });
      }
    }
    function placeMarker() {
      gameboard.update(marker, this.id);
      if (checkWin()) {
        console.log(player);
        endMsg(`${player.getName()} wins!`);
        removeAll();
      }
      if (checkEnd()) {
        endMsg('Draw!');
        removeAll();
      }
      this.removeEventListener('click', placeMarker);
    }
    
    return { setMarker, removeAll }
  };
  function checkEnd() {
    if (gameboard.getArr().includes(' ')) {
      return false;
    } else {
      return true;
    }
  }
  function endMsg(msg) {
      const h2 = document.createElement('h2');
      h2.textContent = msg;
      const div = document.querySelector('.message');
      div.appendChild(h2);
    }
  const play = (player) => {
    pTurn.setMarker(player);
    return player;
  }
  function callPlay() {
    if (compPlay) {
      computer.play();
    } else {
      if (player == p1) {
        player = play(p2);
      } else {
        player = play(p1);
      }
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
  return {checkWin, getPlayer}
})();

