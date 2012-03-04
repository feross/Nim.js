(function() {
  var computerWins, delay, doComputerMove, handleComputerWin, handleHumanMove, humanWins, isValidMove, numSelectedStones, numStones, playTurn, playerTurn, removeSelectedStones;

  numStones = 15;

  playerTurn = 1;

  numSelectedStones = 0;

  computerWins = 0;

  humanWins = 0;

  delay = function(ms, func) {
    return window.setTimeout(func, ms);
  };

  isValidMove = function() {
    return numStones - numSelectedStones >= 0 && (1 <= numSelectedStones && numSelectedStones <= 3);
  };

  handleHumanMove = function() {
    if (isValidMove()) {
      return playTurn(0);
    } else {
      return alert("Invalid move!");
    }
  };

  removeSelectedStones = function() {
    var turnText;
    $('.stone.selected').removeClass('selected').hide();
    numSelectedStones = 0;
    if (playerTurn === 1) {
      turnText = "Your Turn";
      $('html').addClass('player');
    } else {
      turnText = "Computer's Turn";
      $('html').removeClass('player');
    }
    return $('.status').html(("" + numStones + " stones left. ") + turnText + ".");
  };

  handleComputerWin = function() {
    computerWins += 1;
    $('.stone').show();
    numStones = 15;
    playerTurn = 1;
    numSelectedStones = 0;
    $('.computerScore span').text(computerWins);
    $('.status').html("" + numStones + " stones left.");
    return delay(1000, function() {
      return doComputerMove();
    });
  };

  playTurn = function(player) {
    var _ref;
    numStones -= numSelectedStones;
    console.log(player + " removed " + numSelectedStones + " stones.");
    console.log(numStones + " stones left.");
    console.log("-------");
    removeSelectedStones();
    if (player === 0) doComputerMove();
    return playerTurn = (_ref = playerTurn === 1) != null ? _ref : {
      0: 1
    };
  };

  doComputerMove = function() {
    var msDelay, stones;
    numSelectedStones = numStones > 4 ? numStones % 4 : numStones;
    stones = $('.stone:not(:hidden)').slice(0, numSelectedStones);
    msDelay = 0;
    stones.each(function(i, e) {
      msDelay += 500;
      return delay(msDelay, function() {
        return $(e).addClass('selected');
      });
    });
    msDelay += 500;
    return delay(msDelay, function() {
      playTurn(1);
      if (numStones === 0) {
        console.log(playerTurn + " wins!");
        return handleComputerWin();
      }
    });
  };

  $(function() {
    $(document).on('click', '.go', function(e) {
      if (isValidMove) return handleHumanMove();
    });
    $(document).on('click', '.stone', function(e) {
      var elem;
      elem = $(e.target);
      if (elem.hasClass('selected')) {
        numSelectedStones -= 1;
        return elem.removeClass('selected');
      } else {
        if (numSelectedStones < 3) {
          numSelectedStones += 1;
          return elem.addClass('selected');
        }
      }
    });
    return delay(1000, function() {
      return doComputerMove();
    });
  });

}).call(this);
