import React from 'react';
import {Text, View, TouchableOpacity, Switch} from 'react-native';
import {STATUS_READY, STATUS_WAITING} from '../../constants/statuses';
import calculatePayout from '../../helpers/calculations';
import { styles } from '../../styles/stylesheets';
import { displayLogo} from '../widgets/widgets';
import PropTypes from 'prop-types';

export default class Decide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: false,
            // Calculate payouts one time and store them in state
            // Player - Cooperate; Opponent - Cooperate
            payoutCC: calculatePayout(this.props.player.wager, false, this.props.opponent.wager, false),
            // Player - Cooperate; Opponent - Betray
            payoutCB: calculatePayout(this.props.player.wager, false, this.props.opponent.wager, true),
            // Player - Betray; Opponent - Cooperate
            payoutBC: calculatePayout(this.props.player.wager, true, this.props.opponent.wager, false),
            // Player - Betray; Opponent - Betray
            payoutBB: calculatePayout(this.props.player.wager, true, this.props.opponent.wager, true),
        };
        if (this.state.switchValue === false) {
            this.props.decideBetrayClick();
        }
        else {
            this.props.decideCooperateClick();
        }
    }

    componentDidMount() {
        // If the player is ready, go to the next screen. Otherwise, wait for them
        this.props.network.socket.on('exchangeResponse', (message) => {
            this.props.onResponse(message);
        });
    }

    componentWillUnmount() {
        this.props.network.socket.off('exchangeResponse');
        // Do not need networking for screens after here, do not get disconnect events
        this.props.network.socket.off('disconnect');
    }

    render() {
        if (this.props.player.status === STATUS_READY && this.props.opponent.status === STATUS_READY) {
            this.props.onReady();
            this.props.onLeave(this.props.application.room, this.props.network.socket);
        }
        return (
            <View style={styles.container}>
                <Text style={styles.money}>
                    WAGERS
                </Text>
                <View style={styles.row}>
                    <Text style={styles.money}>
                        ${this.props.player.wager}
                    </Text>
                    <View style={styles.horizontalSpacing}>
                    </View>
                    <Text style={styles.splitBig}>
                        (You)
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.money}>
                        ${this.props.opponent.wager}
                    </Text>
                    <View style={styles.horizontalSpacing}>
                    </View>
                    <Text style={styles.stealBig}>
                        (Them)
                    </Text>
                </View>
                <View style={styles.verticalSpacing}>
                </View>
                {this.displayPayoutText()}
                <View style={styles.verticalSpacing}>
                </View>
                <Text style={styles.money}>
                    Make your choice...
                </Text>
                <View style={styles.row}>
                    <Text style={styles.stealBig}>
                        STEAL
                    </Text>
                    <View style={styles.horizontalSpacing}>
                    </View>
                    <Switch
                        ios_backgroundColor={'red'}
                        value={this.state.switchValue}
                        onValueChange={(value) => {
                            this.setState({
                                switchValue: value
                            });
                            if (value === false) {
                                this.props.decideBetrayClick();
                            }
                            else {
                                this.props.decideCooperateClick();
                            }
                        }}
                    >
                    </Switch>
                    <View style={styles.horizontalSpacing}>
                    </View>
                    <Text style={styles.splitBig}>
                        SPLIT
                    </Text>
                </View>
                <View style={styles.verticalSpacing}>
                </View>
                {this.displayReadyButton()}
                {displayLogo()}
            </View>
        );
    }

    displayPayoutText() {
        // Betray
        if (this.state.switchValue === false) {
            return (
                <View>
                    <View style={styles.row}>
                        <Text style={styles.subtext}>
                            If you{" "}
                        </Text>
                        <Text style={styles.steal}>
                            STEAL
                        </Text>
                        <Text style={styles.subtext}>
                            {" "}and they{" "}
                        </Text>
                        <Text style={styles.split}>
                            SPLIT:
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.subtext}>
                            You get{" "}
                        </Text>
                        <Text style={styles.split}>
                            +${this.state.payoutBC.player}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.subtext}>
                            {" "}and they lose{" "}
                        </Text>
                        <Text style={styles.steal}>
                            -${Math.abs(this.state.payoutBC.opponent)}
                        </Text>
                    </View>
                    <View style={styles.verticalSpacing}>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.subtext}>
                            If you{" "}
                        </Text>
                        <Text style={styles.steal}>
                            STEAL
                        </Text>
                        <Text style={styles.subtext}>
                            {" "}and they{" "}
                        </Text>
                        <Text style={styles.steal}>
                            STEAL:
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.subtext}>
                            You lose{" "}
                        </Text>
                        <Text style={styles.steal}>
                            -${Math.abs(this.state.payoutBB.player)}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.subtext}>
                            {" "}and they lose{" "}
                        </Text>
                        <Text style={styles.steal}>
                            -${Math.abs(this.state.payoutBB.opponent)}
                        </Text>
                    </View>
                </View>
            );
        }
        // Cooperate
        else {
            return (
                <View>
                    <View style={styles.row}>
                        <Text style={styles.subtext}>
                            If you{" "}
                        </Text>
                        <Text style={styles.split}>
                            SPLIT
                        </Text>
                        <Text style={styles.subtext}>
                            {" "}and they{" "}
                        </Text>
                        <Text style={styles.split}>
                            SPLIT:
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.subtext}>
                            You get{" "}
                        </Text>
                        <Text style={styles.split}>
                            +${this.state.payoutCC.player}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.subtext}>
                            {" "}and they get{" "}
                        </Text>
                        <Text style={styles.split}>
                            +${this.state.payoutCC.opponent}
                        </Text>
                    </View>
                    <View style={styles.verticalSpacing}>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.subtext}>
                            If you{" "}
                        </Text>
                        <Text style={styles.split}>
                            SPLIT
                        </Text>
                        <Text style={styles.subtext}>
                            {" "}and they{" "}
                        </Text>
                        <Text style={styles.steal}>
                            STEAL:
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.subtext}>
                            You lose{" "}
                        </Text>
                        <Text style={styles.steal}>
                            -${Math.abs(this.state.payoutCB.player)}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.subtext}>
                            {" "}and they get{" "}
                        </Text>
                        <Text style={styles.split}>
                            +${this.state.payoutCB.opponent}
                        </Text>
                    </View>
                </View>
            );
        }
    }

    displayReadyButton() {
        if (this.props.player.status === STATUS_WAITING && this.props.opponent.status === STATUS_WAITING) {
            return (
                <View style={styles.ready}>
                    <TouchableOpacity onPress={() => {
                        this.props.onPlayerReady();
                        this.props.onSend(this.props.player, this.props.network.socket);
                    }}>
                        <Text style={styles.input}>
                            READY?
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else if (this.props.player.status === STATUS_WAITING && this.props.opponent.status === STATUS_READY) {
            return (
                <View style={styles.opponentReady}>
                    <TouchableOpacity onPress={() => {
                        // If the opponent is ready, go to the next screen. Otherwise, wait for them
                        this.props.onPlayerReady();
                        this.props.onSend(this.props.player, this.props.network.socket);
                    }}>
                        <Text style={styles.buttonText}>
                            OPPONENT IS READY...
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else if (this.props.player.status === STATUS_READY && this.props.opponent.status === STATUS_WAITING) {
            return (
                <View style={styles.waiting}>
                    <TouchableOpacity disabled={true}>
                        <Text style={styles.buttonText}>
                            WAITING ON OPPONENT...
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
};

Decide.propTypes = {
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

