const gameboard = (() => {
  const arr = [];
  const render = () => {

  };
  const update = (marker, index) => {
    arr.splice(index, 1, marker);
  };
  const newBoard = () => {
    arr.splice(0, arr.length);
    for (let i = 0; i < 9; i++) {
      arr.push(' ');
    }
  };


})();

const game = (() => {

})();

const Player = () => {

};