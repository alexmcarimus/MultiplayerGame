import React from 'react';
import { connect } from 'react-redux';
import {
    a_MainInputName, a_MainInputRoom, a_MainClickStart, a_MainClickJoin, a_MainClickMore,
    a_LobbyClickCancel,
    a_WagerInputMoney,
    a_DecideClickCooperate,
    a_DecideClickBetray,
    a_NavigateToTitle,
    a_NavigateToMain,
    a_NavigateToWager,
    a_NavigateToDecide,
    a_NavigateToResult, a_GenerateFakeOpponent, a_ReadyOpponent, a_ReadyPlayer, a_ResultUpdateScore,
} from '../../actions/actions';
import {SCREEN_TITLE, SCREEN_MAIN, SCREEN_LOBBY, SCREEN_GAME_WAGER, SCREEN_GAME_DECIDE, SCREEN_GAME_RESULT} from '../../constants/screens';
import {STATUS_WAITING} from '../../constants/statuses';
import Title from '../screens/Title';
import Main from '../screens/Main';
import Lobby from '../screens/Lobby';
import Wager from '../screens/Wager';
import Decide from '../screens/Decide';
import Result from '../screens/Result';

class GameComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application: {
                room: -1,
                screen: SCREEN_TITLE,
            },
            player: {
                id: 0,
                name: 'Anonymous',
                money: 0,
                wager: 0,
                betrayal: false,
                status: STATUS_WAITING,
            },
            opponent: {
                id: 0,
                name: 'Opponent',
                money: 0,
                wager: 0,
                betrayal: false,
                status: STATUS_WAITING,
            }
        };
    }

    render() {
        // Switch Screens
        switch(this.props.application.screen) {
            case SCREEN_MAIN:
                return <Main
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
                    application={this.props.application}
                    player={this.props.player}
                    opponent={this.props.opponent}
                    onCancelClick={() => this.props.lobbyClickCancel()}
                    onConnect={() => this.props.generateFakeOpponent()}
                    onReady={() => this.props.navigateToWager()}
                />;
            case SCREEN_GAME_WAGER:
                return <Wager
                    application={this.props.application}
                    player={this.props.player}
                    opponent={this.props.opponent}
                    onWagerInput={(wager) => this.props.wagerInputMoney(wager)}
                    onPlayerReady={() => this.props.readyPlayer()}
                    onOpponentReady={() => this.props.readyOpponent()}
                    onReady={() => this.props.navigateToDecide()}
                />;
            case SCREEN_GAME_DECIDE:
                return <Decide
                    application={this.props.application}
                    player={this.props.player}
                    opponent={this.props.opponent}
                    decideCooperateClick={() => this.props.decideClickCooperate()}
                    decideBetrayClick={() => this.props.decideClickBetray()}
                    onPlayerReady={() => this.props.readyPlayer()}
                    onOpponentReady={() => this.props.readyOpponent()}
                    onReady={() => this.props.navigateToResult()}
                />;
            case SCREEN_GAME_RESULT:
                return <Result
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
                    application={this.props.application}
                    player={this.props.player}
                    opponent={this.props.opponent}
                    onLoad={() => this.props.navigateToTitle()}
                    onPress={() => this.props.navigateToMain()}
                />;
        }
    }
}

const mapStateToProps = state => ({
    application: state.application,
    player: state.player,
    opponent: state.opponent,
});

const mapDispatchToProps = dispatch => ({
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
