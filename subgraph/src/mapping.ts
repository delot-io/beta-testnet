import { BigDecimal, BigInt } from "@graphprotocol/graph-ts"
import {    
  PlayerUpdated,
  PlayerDeposited
} from "../generated/Lottery/Lottery"

import { Player, AutoPoolPlayerJoiningHistory } from "../generated/schema"

export function handlePlayerUpdated(event: PlayerUpdated): void {
  let id = event.params.roundId.toHex() + "-" + event.params.user.toHexString()
  let player = Player.load(id)
  if (player == null) {
    player = new Player(id)
  }

  player.address = event.params.user
  player.roundId = event.params.roundId
  player.depositAmount = event.params.depositAmount
  player.depositTickets = event.params.depositTickets
  player.holdAmount = event.params.holdAmount
  player.holdTickets = event.params.holdTickets
  player.tickets = event.params.tickets    
  
  player.save()     
} 

export function handlePlayerDeposited(event: PlayerDeposited): void {    
  if (event.params.isAuto) {
    let id = event.params.roundId.toHex() + "-" + event.params.user.toHexString()
    let autoPoolPlayerJoiningHistory = new AutoPoolPlayerJoiningHistory(id);
    
    autoPoolPlayerJoiningHistory.address = event.params.user
    autoPoolPlayerJoiningHistory.roundId = event.params.roundId
    autoPoolPlayerJoiningHistory.amount = event.params.amount
    autoPoolPlayerJoiningHistory.transactionHash = event.transaction.hash

    autoPoolPlayerJoiningHistory.save()
  }  
}