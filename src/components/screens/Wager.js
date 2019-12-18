import React from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {STATUS_READY, STATUS_WAITING} from '../../constants/statuses';
import { styles } from '../../styles/stylesheets';
import { displayLogo } from '../widgets/widgets';
import PropTypes from 'prop-types';

export default class Wager extends React.Component {
    componentDidMount() {
        // If the player is ready, go to the next screen. Otherwise, wait for them
        this.props.network.socket.on('exchangeResponse', (message) => {
            this.props.onResponse(message);
        });
    }

    componentWillUnmount() {
        this.props.network.socket.off('exchangeResponse');
    }

    render() {
        if (this.props.player.status === STATUS_READY && this.props.opponent.status === STATUS_READY) {
            this.props.onReady();
        }
        return (
            <View style={styles.container}>
                <Text
                    style={styles.title}
                >
                    WAGER?
                </Text>
                <View style={styles.field}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            text = text.replace(/[^\d]+/g,'');
                            if (text.includes("-") || text.includes(".")) {
                                alert("Please enter positive integers!");
                                this.props.onWagerInput(0);
                            }
                            else if (text > this.props.player.money) {
                                alert("You can't wager more than you have!");
                                this.props.onWagerInput(this.props.player.money);
                            }
                            else {
                                if (text === '') {
                                    text = '0';
                                }
                                this.props.onWagerInput(parseInt(text));
                            }
                        }}
                        value={'$' + String(this.props.player.wager)}
                        keyboardType={'numeric'}
                    >
                    </TextInput>
                </View>
                <View style={styles.spacing}>
                </View>
                <Text
                    style={styles.title}
                >
                    YOU HAVE:
                </Text>
                <Text
                    style={styles.money}
                >
                    ${this.props.player.money}
                </Text>
                <View style={styles.spacing}>
                </View>
                <Text
                    style={styles.title}
                >
                    {this.props.opponent.name} HAS:
                </Text>
                <Text
                    style={styles.money}
                >
                    ${this.props.opponent.money}
                </Text>
                {this.displayReadyButton()}
                {displayLogo()}
            </View>
        );
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

Wager.propTypes = {
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
