numStones = 15
playerTurn = 1 # 0: human player, 1: computer player

# need to always leave human player with 4, 8, or 12 stones

playTurn = (player, numStonesToRemove) ->
  numStones -= numStonesToRemove
  
  playerTurn = (playerTurn == 1) ? 0 : 1

  console.log player + " removed " + numStonesToRemove + " stones."
  console.log numStones + " stones left."
  console.log "-------"

  if (numStones == 0)
    console.log player + " wins!"
    handleComputerWin()


isValidMove = (numStonesToRemove) ->
  return (numStones - numStonesToRemove >= 0)

window.handleHumanMove = (numStonesToRemove) ->
  if (isValidMove(numStonesToRemove))
    playTurn 0, numStonesToRemove
  else
    alert "Invalid move!"

  doComputerMove()

doComputerMove = ->
  numStonesToRemove =
    if (numStones > 4)
      numStones % 4
    else
      numStones
  
  playTurn 1, numStonesToRemove

doComputerMove()

handleComputerWin = ->
  # do something