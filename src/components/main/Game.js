import React from 'react';
import { connect } from 'react-redux';
import {
    a_MainInputName,
    a_MainInputRoom,
    a_MainClickStart,
    a_MainClickJoin,
    a_MainClickMore,
    a_LobbyClickCancel,
    a_WagerInputMoney,
    a_DecideClickCooperate,
    a_DecideClickBetray,
    a_NavigateToTitle,
    a_NavigateToMain,
    a_NavigateToWager,
    a_NavigateToDecide,
    a_NavigateToResult,
    a_GenerateFakeOpponent,
    a_ReadyOpponent,
    a_ReadyPlayer,
    a_ResultUpdateScore,
    a_NetworkSendPlayerData, a_NetworkReceivePlayerData, a_NetworkRoomJoin, a_NetworkRoomLeave, a_NetworkDisconnect,
} from '../../actions/actions';
import {SCREEN_TITLE, SCREEN_MAIN, SCREEN_LOBBY, SCREEN_GAME_WAGER, SCREEN_GAME_DECIDE, SCREEN_GAME_RESULT} from '../../constants/screens';
import {STATUS_WAITING} from '../../constants/statuses';
import Title from '../screens/Title';
import Main from '../screens/Main';
import Lobby from '../screens/Lobby';
import Wager from '../screens/Wager';
import Decide from '../screens/Decide';
import Result from '../screens/Result';
import PropTypes from 'prop-types';

class GameComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application: {
                room: '',
                screen: SCREEN_TITLE,
            },
            player: {
                id: '',
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
                socket: null,
            }
        };
    }

    render() {
        // Switch Screens
        switch(this.props.application.screen) {
            case SCREEN_MAIN:
                return <Main
                    network={this.props.network}
                    application={this.props.application}
                    player={this.props.player}
                    opponent={this.props.opponent}
                    onNameInput={(name) => this.props.mainInputName(name)}
                    onRoomInput={(room) => this.props.mainInputRoom(room)}
                    onStartClick={() => this.props.mainClickStart()}
                    onJoinClick={() => this.props.mainClickJoin()}
                    onMoreClick={() => this.props.mainClickMore()}
                />;
            case SCREEN_LOBBY:
                return <Lobby
                    network={this.props.network}
                    application={this.props.application}
                    player={this.props.player}
                    opponent={this.props.opponent}
                    onCancelClick={() => this.props.lobbyClickCancel()}
                    onConnect={(payload, socket) => this.props.networkSendPlayerData(payload, socket)}
                    onResponse={(payload) => this.props.networkReceivePlayerData(payload)}
                    onReady={() => this.props.navigateToWager()}
                    onJoin={(room, socket) => this.props.networkRoomJoin(room, socket)}
                    onLeave={(room, socket) => this.props.networkRoomLeave(room, socket)}
                    onDisconnect={() => this.props.networkDisconnect()}
                />;
            case SCREEN_GAME_WAGER:
                return <Wager
                    network={this.props.network}
                    application={this.props.application}
                    player={this.props.player}
                    opponent={this.props.opponent}
                    onWagerInput={(wager) => this.props.wagerInputMoney(wager)}
                    onPlayerReady={() => this.props.readyPlayer()}
                    onOpponentReady={() => this.props.readyOpponent()}
                    onResponse={(payload) => this.props.networkReceivePlayerData(payload)}
                    onSend={(payload, socket) => this.props.networkSendPlayerData(payload, socket)}
                    onReady={() => this.props.navigateToDecide()}
                    onDisconnect={() => this.props.networkDisconnect()}
                />;
            case SCREEN_GAME_DECIDE:
                return <Decide
                    network={this.props.network}
                    application={this.props.application}
                    player={this.props.player}
                    opponent={this.props.opponent}
                    decideCooperateClick={() => this.props.decideClickCooperate()}
                    decideBetrayClick={() => this.props.decideClickBetray()}
                    onPlayerReady={() => this.props.readyPlayer()}
                    onOpponentReady={() => this.props.readyOpponent()}
                    onResponse={(payload) => this.props.networkReceivePlayerData(payload)}
                    onSend={(payload, socket) => this.props.networkSendPlayerData(payload, socket)}
                    onReady={() => this.props.navigateToResult()}
                    onLeave={(room, socket) => this.props.networkRoomLeave(room, socket)}
                    onDisconnect={() => this.props.networkDisconnect()}
                />;
            case SCREEN_GAME_RESULT:
                return <Result
                    network={this.props.network}
                    application={this.props.application}
                    player={this.props.player}
                    opponent={this.props.opponent}
                    onReady={(score) => {
                        this.props.resultUpdateScore(score);
                        this.props.navigateToMain();
                    }}
                />;
            default:
                return <Title
                    network={this.props.network}
                    application={this.props.application}
                    player={this.props.player}
                    opponent={this.props.opponent}
                    onLoad={() => this.props.navigateToTitle()}
                    onPress={() => this.props.navigateToMain()}
                />;
        }
    }
}

GameComponent.propTypes = {
    application: PropTypes.shape({
        screen: PropTypes.string.isRequired,
        room: PropTypes.string,
    }),
    player: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        money: PropTypes.number.isRequired,
        wager: PropTypes.number.isRequired,
        betrayal: PropTypes.bool.isRequired,
        status: PropTypes.string.isRequired,
    }),
    opponent: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        money: PropTypes.number.isRequired,
        wager: PropTypes.number.isRequired,
        betrayal: PropTypes.bool.isRequired,
        status: PropTypes.string.isRequired,
    }),
    network: PropTypes.shape({
        socket: PropTypes.object.isRequired,
    }),
    networkDisconnect:PropTypes.func,
    networkSendPlayerData:PropTypes.func,
    networkReceivePlayerData: PropTypes.func,
    networkRoomJoin: PropTypes.func,
    networkRoomLeave: PropTypes.func,
    navigateToTitle: PropTypes.func,
    navigateToMain: PropTypes.func,
    navigateToWager: PropTypes.func,
    navigateToDecide: PropTypes.func,
    navigateToResult: PropTypes.func,
    mainInputName: PropTypes.func,
    mainInputRoom: PropTypes.func,
    mainClickStart: PropTypes.func,
    mainClickJoin: PropTypes.func,
    mainClickMore: PropTypes.func,
    lobbyClickCancel: PropTypes.func,
    generateFakeOpponent: PropTypes.func,
    readyOpponent: PropTypes.func,
    readyPlayer: PropTypes.func,
    wagerInputMoney: PropTypes.func,
    decideClickCooperate: PropTypes.func,
    decideClickBetray: PropTypes.func,
    resultUpdateScore: PropTypes.func,
};

const mapStateToProps = state => ({
    application: state.application,
    player: state.player,
    opponent: state.opponent,
    network: state.network,
});

const mapDispatchToProps = dispatch => ({
    networkDisconnect: () => dispatch(a_NetworkDisconnect()),
    networkSendPlayerData: (payload, socket) => dispatch(a_NetworkSendPlayerData(payload, socket)),
    networkReceivePlayerData: (payload) => dispatch(a_NetworkReceivePlayerData(payload)),
    networkRoomJoin: (room, socket) => dispatch(a_NetworkRoomJoin(room, socket)),
    networkRoomLeave: (room, socket) => dispatch(a_NetworkRoomLeave(room, socket)),
    navigateToTitle: () => dispatch(a_NavigateToTitle()),
    navigateToMain: () => dispatch(a_NavigateToMain()),
    navigateToWager: () => dispatch(a_NavigateToWager()),
    navigateToDecide: () => dispatch(a_NavigateToDecide()),
    navigateToResult: () => dispatch(a_NavigateToResult()),
    mainInputName: (name) => dispatch(a_MainInputName(name)),
    mainInputRoom: (room) => dispatch(a_MainInputRoom(room)),
    mainClickStart: () => dispatch(a_MainClickStart()),
    mainClickJoin: () => dispatch(a_MainClickJoin()),
    mainClickMore: () => dispatch(a_MainClickMore()),
    lobbyClickCancel: () => dispatch(a_LobbyClickCancel()),
    generateFakeOpponent: () => dispatch(a_GenerateFakeOpponent()),
    readyOpponent: () => dispatch(a_ReadyOpponent()),
    readyPlayer: () => dispatch(a_ReadyPlayer()),
    wagerInputMoney: (wager) => dispatch(a_WagerInputMoney(wager)),
    decideClickCooperate: () => dispatch(a_DecideClickCooperate()),
    decideClickBetray: () => dispatch(a_DecideClickBetray()),
    resultUpdateScore: (score) => dispatch(a_ResultUpdateScore(score)),
});

const Game = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameComponent);

export default Game;
