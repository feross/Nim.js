(function() {
  var doComputerMove, handleComputerWin, isValidMove, numStones, playTurn, playerTurn;

  numStones = 15;

  playerTurn = 1;

  playTurn = function(player, numStonesToRemove) {
    var _ref;
    numStones -= numStonesToRemove;
    playerTurn = (_ref = playerTurn === 1) != null ? _ref : {
      0: 1
    };
    console.log(player + " removed " + numStonesToRemove + " stones.");
    console.log(numStones + " stones left.");
    console.log("-------");
    if (numStones === 0) {
      console.log(player + " wins!");
      return handleComputerWin();
    }
  };

  isValidMove = function(numStonesToRemove) {
    return numStones - numStonesToRemove >= 0;
  };

  window.handleHumanMove = function(numStonesToRemove) {
    if (isValidMove(numStonesToRemove)) {
      playTurn(0, numStonesToRemove);
    } else {
      alert("Invalid move!");
    }
    return doComputerMove();
  };

  doComputerMove = function() {
    var numStonesToRemove;
    numStonesToRemove = numStones > 4 ? numStones % 4 : numStones;
    return playTurn(1, numStonesToRemove);
  };

  doComputerMove();

  handleComputerWin = function() {};

}).call(this);
