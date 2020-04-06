import { SCREEN_TITLE, SCREEN_MAIN, SCREEN_LOBBY, SCREEN_GAME_WAGER, SCREEN_GAME_DECIDE, SCREEN_GAME_RESULT } from '../constants/screens';
import { STATUS_WAITING, STATUS_READY } from '../constants/statuses';
import {
    NETWORK_SEND_PLAYER_DATA,
    NETWORK_RECEIVE_PLAYER_DATA,
    NETWORK_ROOM_JOIN,
    NETWORK_ROOM_LEAVE,
    MAIN_INPUT_NAME,
    MAIN_CLICK_JOIN,
    MAIN_CLICK_MORE,
    MAIN_CLICK_START,
    LOBBY_CLICK_CANCEL,
    WAGER_INPUT_MONEY,
    DECIDE_CLICK_BETRAY,
    DECIDE_CLICK_COOPERATE,
    NAVIGATE_TO_TITLE,
    NAVIGATE_TO_MAIN,
    NAVIGATE_TO_LOBBY,
    NAVIGATE_TO_WAGER,
    NAVIGATE_TO_DECIDE,
    NAVIGATE_TO_RESULT,
    MAIN_INPUT_ROOM,
    GENERATE_FAKE_OPPONENT,
    READY_OPPONENT,
    READY_PLAYER,
    RESULT_UPDATE_SCORE, NETWORK_DISCONNECT,
} from '../constants/actions';
import { MONEY_AMOUNT } from '../constants/game';
import io from "socket.io-client";

const initialState = {
    application: {
        room: '',
        screen: SCREEN_TITLE,
    },
    player: {
        id: '' + new Date().getTime(),
        name: 'Anonymous',
        money: 0,
        wager: 0,
        betrayal: false,
        status: STATUS_WAITING,
    },
    opponent: {
        id: '',
        name: 'Opponent',
        money: 0,
        wager: 0,
        betrayal: false,
        status: STATUS_WAITING,
    },
    network: {
        socket: io('http://127.0.0.1:8002'),
    }
};

function rootReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case NETWORK_DISCONNECT:
            return initialState;
        case NETWORK_SEND_PLAYER_DATA:
            newState = {
                application: {
                    ...state.application,
                },
                player: {
                    ...state.player,
                },
                opponent: {
                    ...state.opponent,
                }
            };
            action.socket.emit('exchange', newState.player, newState.application.room);
            return {
                ...state,
                ...newState
            };
        case NETWORK_RECEIVE_PLAYER_DATA:
            // Update opponent's values
            newState = {
                application: {
                    ...state.application,
                },
                player : {
                    ...state.player,
                },
                opponent: action.payload,
            };
            return {
                ...state,
                ...newState,
            };
        case NETWORK_ROOM_JOIN:
            newState = {
                application: {
                    ...state.application,
                },
                player : {
                    ...state.player,
                },
                opponent : {
                    ...state.opponent,
                },
            };
            action.socket.emit('joinRoom', action.room);
            return {
                ...state,
                ...newState,
            };
        case NETWORK_ROOM_LEAVE:
            newState = {
                application: {
                    ...state.application,
                },
                player : {
                    ...state.player,
                },
                opponent : {
                    ...state.opponent,
                },
            };
            action.socket.emit('leaveRoom', action.room);
            return {
                ...state,
                ...newState,
            };
        case MAIN_INPUT_NAME:
            // Set player's name
            newState = {
                application: {
                    ...state.application,
                },
                player: {
                    ...state.player,
                    name: action.name,
                },
                opponent: {
                    ...state.opponent,
                }
            };
            return {
                ...state,
                ...newState
            };
        case MAIN_INPUT_ROOM:
            // Set room
            newState = {
                application: {
                    ...state.application,
                    room: action.room,
                },
                player: {
                    ...state.player,
                },
                opponent: {
                    ...state.opponent
                }
            };
            return {
                ...state,
                ...newState
            };
        case MAIN_CLICK_START:
            newState = {
                application: {
                    ...state.application,
                    screen: SCREEN_LOBBY,
                },
                player: {
                    ...state.player,
                    status: STATUS_WAITING,
                },
                opponent: {
                    ...state.opponent,
                }
            };
            return {
                ...state,
                ...newState
            };
        case MAIN_CLICK_JOIN:
            newState = {
                application: {
                    ...state.application,
                    screen: SCREEN_LOBBY,
                },
                player: {
                    ...state.player,
                    status: STATUS_READY,
                },
                opponent: {
                    ...state.opponent,
                },
            };
            return {
                ...state,
                ...newState,
            };
        case MAIN_CLICK_MORE:
            // Give player money
            newState = {
                application: {
                    ...state.application,
                },
                player: {
                    ...state.player,
                    money: state.player.money + MONEY_AMOUNT,
                },
                opponent: {
                    ...state.opponent,
                }
            };
            return {
                ...state,
                ...newState
            };
        case LOBBY_CLICK_CANCEL:
            newState = {
                application: {
                    room: '',
                    screen: SCREEN_MAIN,
                },
                player: {
                    ...state.player,
                },
                opponent: {
                    ...state.opponent,
                }
            };
            return {
                ...state,
                ...newState
            };
        case WAGER_INPUT_MONEY:
            // Set player's wager
            newState = {
                application: {
                    ...state.application,
                },
                player: {
                    ...state.player,
                    wager: action.wager,
                },
                opponent: {
                    ...state.opponent
                }
            };
            return {
                ...state,
                ...newState
            };
        case DECIDE_CLICK_COOPERATE:
            // Set player's betrayal to false
            newState = {
                application: {
                    ...state.application,
                },
                player: {
                    ...state.player,
                    betrayal: false,
                },
                opponent: {
                    ...state.opponent,
                }
            };
            return {
                ...state,
                ...newState
            };
        case DECIDE_CLICK_BETRAY:
            // Set player's betrayal to true
            newState = {
                application: {
                    ...state.application,
                },
                player: {
                    ...state.player,
                    betrayal: true,
                },
                opponent: {
                    ...state.opponent,
                }
            };
            return {
                ...state,
                ...newState
            };
        case RESULT_UPDATE_SCORE:
            newState = {
                application: {
                    ...state.application,
                },
                player: {
                    ...state.player,
                    money: parseInt(action.money),
                },
                opponent: {
                    ...state.opponent,
                }
            };
            return {
                ...state,
                ...newState,
            };
        case NAVIGATE_TO_TITLE:
            // Reset everything to a default value, and generate a new id for player
            newState = {
                application: {
                    ...state.application,
                },
                players: {
                    ...state.player,
                    id: new Date().getTime(),
                },
                opponent: {
                    ...state.opponent,
                }
            };
            return {
                ...initialState,
                ...newState
            };
        case NAVIGATE_TO_MAIN:
            // Reset opponent but keep player's out-of-game values
            newState = {
                application: {
                    room: '',
                    screen: SCREEN_MAIN,
                },
                player: {
                    ...state.player,
                    wager: 0,
                    betrayal: false,
                    status: STATUS_WAITING,
                },
                opponent: initialState.opponent,
            };
            return {
                ...state,
                ...newState
            };
        case NAVIGATE_TO_LOBBY:
            // Set the room code
            newState = {
                application: {
                    room: action.room,
                    screen: SCREEN_LOBBY,
                },
                player: {
                    ...state.player,
                    status: STATUS_READY
                },
                opponent: {
                    ...state.opponent,
                }
            };
            return {
                ...state,
                ...newState
            };
        case NAVIGATE_TO_WAGER:
            // Set screen and reset status
            newState = {
                application: {
                    ...state.application,
                    screen: SCREEN_GAME_WAGER,
                },
                player: {
                    ...state.player,
                    status: STATUS_WAITING,
                },
                opponent: {
                    ...state.opponent,
                    status: STATUS_WAITING,
                }
            };
            return {
                ...state,
                ...newState
            };
        case NAVIGATE_TO_DECIDE:
            // Set screen and reset status
            newState = {
                application: {
                    ...state.application,
                    screen: SCREEN_GAME_DECIDE,
                },
                player: {
                    ...state.player,
                    status: STATUS_WAITING,
                },
                opponent: {
                    ...state.opponent,
                    status: STATUS_WAITING,
                }
            };
            return {
                ...state,
                ...newState
            };
        case NAVIGATE_TO_RESULT:
            // Set screen and reset status
            newState = {
                application: {
                    ...state.application,
                    screen: SCREEN_GAME_RESULT,
                },
                player: {
                    ...state.player,
                    status: STATUS_WAITING,
                },
                opponent: {
                    ...state.opponent,
                    status: STATUS_WAITING,
                }
            };
            return {
                ...state,
                ...newState
            };
        case GENERATE_FAKE_OPPONENT:
            // Get fake values until networking is available (I KNOW ACTIONS SHOULD BE PURE, NOT RANDOMLY GENERATED)
            let name = "Opponent" + randomBetween(0, 999);
            let money = randomBetween(1000, 10000);
            let wager = randomBetween(1000, money);
            let betrayal = Math.random() >= 0.5;
            newState = {
                application: {
                    ...state.application,
                },
                player: {
                    ...state.player,
                },
                opponent: {
                    ...state.opponent,
                    name: name,
                    money: money,
                    wager: wager,
                    betrayal: betrayal,
                    status: STATUS_WAITING,
                }
            };
            return {
                ...state,
                ...newState,
            };
        case READY_OPPONENT:
            newState = {
                application: {
                    ...state.application,
                },
                player: {
                    ...state.player,
                },
                opponent: {
                    ...state.opponent,
                    status: STATUS_READY
                }
            };
            return {
                ...state,
                ...newState,
            };
        case READY_PLAYER:
            newState = {
                application: {
                    ...state.application,
                },
                player: {
                    ...state.player,
                    status: STATUS_READY,
                },
                opponent: {
                    ...state.opponent,
                }
            };
            return {
                ...state,
                ...newState,
            };
        default:
    }
    return state;
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default rootReducer;
