export default function calculatePayout(playerWager, playerBetrayal, opponentWager, opponentBetrayal) {
    let payout = {
        player: 0,
        opponent: 0,
    };
    // Both players cooperate? Give them both half the average wager
    if (playerBetrayal === false && opponentBetrayal === false) {
        payout = {
            player: Math.round((parseInt(playerWager) + parseInt(opponentWager)) / 2),
            opponent: Math.round((parseInt(playerWager) + parseInt(opponentWager)) / 2),
        };
    }
    // Player betrays a cooperating opponent? Give them all of the total wager with the opponent losing theirs
    else if (playerBetrayal === true && opponentBetrayal === false) {
        payout = {
            player: Math.round(parseInt(playerWager) + parseInt(opponentWager)),
            opponent: Math.round(-1 * parseInt(opponentWager)),
        };
    }
    // Opponent betrays a cooperating player? Give them all of the total wager with the player losing theirs
    else if (playerBetrayal === false && opponentBetrayal === true) {
        payout = {
            player: Math.round(-1 * parseInt(playerWager)),
            opponent: Math.round(parseInt(playerWager) + parseInt(opponentWager)),
        };
    }
    // Both players betray? Lose half of their own wager
    else if (playerBetrayal === true && opponentBetrayal === true) {
        payout = {
            player: Math.round(-1 * parseInt(playerWager) / 2),
            opponent: Math.round(-1 * parseInt(opponentWager) / 2),
        }
    }
    return payout;
}
