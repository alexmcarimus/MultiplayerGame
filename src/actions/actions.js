import {
    NETWORK_SEND_PLAYER_DATA, NETWORK_RECEIVE_PLAYER_DATA,
    TITLE_CLICK_START,
    MAIN_INPUT_NAME, MAIN_CLICK_JOIN, MAIN_CLICK_MORE, MAIN_CLICK_START, MAIN_INPUT_ROOM,
    LOBBY_CLICK_CANCEL,
    WAGER_INPUT_MONEY,
    DECIDE_CLICK_BETRAY, DECIDE_CLICK_COOPERATE,
    RESULT_CLICK_RETURN,
    NAVIGATE_TO_TITLE, NAVIGATE_TO_MAIN, NAVIGATE_TO_LOBBY, NAVIGATE_TO_WAGER, NAVIGATE_TO_DECIDE, NAVIGATE_TO_RESULT,
    GENERATE_FAKE_OPPONENT, READY_OPPONENT, READY_PLAYER, RESULT_UPDATE_SCORE,
} from '../constants/actions';

export function a_NetworkSendPlayerData(payload) {
    return ({
        type: NETWORK_SEND_PLAYER_DATA,
        payload: payload,
    });
}

export function a_NetworkReceivePlayerData(payload) {
    return ({
        type: NETWORK_RECEIVE_PLAYER_DATA,
        payload: payload,
    });
}

export function a_TitleClickStart(payload) {
    return ({
        type: TITLE_CLICK_START,
        payload: payload,
    });
}

export function a_MainInputName(name) {
    return ({
        type: MAIN_INPUT_NAME,
        name: name,
    });
}

export function a_MainInputRoom(room) {
    return ({
        type: MAIN_INPUT_ROOM,
        room: room,
    });
}

export function a_MainClickStart() {
    return ({
        type: MAIN_CLICK_START,
    });
}

export function a_MainClickJoin() {
    return ({
        type: MAIN_CLICK_JOIN,
    });
}

export function a_MainClickMore() {
    return ({
        type: MAIN_CLICK_MORE,
    });
}

export function a_LobbyClickCancel() {
    return ({
        type: LOBBY_CLICK_CANCEL,
    });
}

export function a_WagerInputMoney(wager) {
    return ({
        type: WAGER_INPUT_MONEY,
        wager: wager,
    });
}

export function a_DecideClickCooperate() {
    return ({
        type: DECIDE_CLICK_COOPERATE,
    });
}

export function a_DecideClickBetray() {
    return ({
        type: DECIDE_CLICK_BETRAY,
    });
}

export function a_ResultUpdateScore(money) {
    return ({
        type: RESULT_UPDATE_SCORE,
        money: money,
    });
}

export function a_ResultClickReturn() {
    return ({
        type: RESULT_CLICK_RETURN,
    });
}

export function a_NavigateToTitle() {
    return ({
        type: NAVIGATE_TO_TITLE,
    });
}

export function a_NavigateToMain() {
    return ({
        type: NAVIGATE_TO_MAIN,
    });
}

export function a_NavigateToLobby() {
    return ({
        type: NAVIGATE_TO_LOBBY,
    });
}

export function a_NavigateToWager() {
    return ({
        type: NAVIGATE_TO_WAGER,
    });
}

export function a_NavigateToDecide() {
    return ({
        type: NAVIGATE_TO_DECIDE,
    });
}

export function a_NavigateToResult() {
    return ({
        type: NAVIGATE_TO_RESULT,
    });
}

export function a_GenerateFakeOpponent() {
    return ({
        type: GENERATE_FAKE_OPPONENT,
    })
}

export function a_ReadyOpponent() {
    return ({
        type: READY_OPPONENT,
    })
}

export function a_ReadyPlayer() {
    return ({
        type: READY_PLAYER,
    })
}
