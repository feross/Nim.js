numStones = 15
playerTurn = 1 # 0: human player, 1: computer player
numSelectedStones = 0
computerWins = 0
humanWins = 0

# need to always leave human player with 4, 8, or 12 stones

delay = (ms, func) -> window.setTimeout func, ms

isValidMove = ->
  return (numStones - numSelectedStones >= 0 && 1 <= numSelectedStones <= 3)

handleHumanMove = ->
  if (isValidMove())
    playTurn 0
  else
    alert "Invalid move!"

removeSelectedStones = ->
  $('.stone.selected').removeClass('selected').hide()

  numSelectedStones = 0
  if playerTurn == 1
    turnText = "Your Turn"
    $('html').addClass 'player'
  else
    turnText = "Computer's Turn"
    $('html').removeClass 'player'


  $('.status').html "#{numStones} stones left. " + turnText + "."

handleComputerWin = ->
  computerWins += 1
  $('.stone').show()
  numStones = 15
  playerTurn = 1
  numSelectedStones = 0

  $('.computerScore span').text computerWins
  $('.status').html "#{numStones} stones left."
  delay 1000, ->
    doComputerMove();

playTurn = (player) ->
  numStones -= numSelectedStones
  
  console.log player + " removed " + numSelectedStones + " stones."
  console.log numStones + " stones left."
  console.log "-------"

  removeSelectedStones()

  if (player == 0)
    doComputerMove()

  playerTurn = (playerTurn == 1) ? 0 : 1

doComputerMove = ->
  numSelectedStones =
    if (numStones > 4)
      numStones % 4
    else
      numStones
  
  stones = $('.stone:not(:hidden)')[0...numSelectedStones]

  msDelay = 0
  stones.each (i, e) ->
    msDelay += 500
    delay msDelay, ->
      $(e).addClass 'selected'
  
  msDelay += 500
  delay msDelay, ->
    playTurn 1

    if (numStones == 0)
      console.log playerTurn + " wins!"
      handleComputerWin()

$ ->
  $(document).on 'click', '.go', (e) ->
    if (isValidMove)
      handleHumanMove()

  $(document).on 'click', '.stone', (e) ->
    elem = $(e.target)

    if (elem.hasClass 'selected')
      numSelectedStones -= 1
      elem.removeClass 'selected'
    else
      if (numSelectedStones < 3)
        numSelectedStones += 1
        elem.addClass 'selected'

  delay 1000, ->
    doComputerMove()