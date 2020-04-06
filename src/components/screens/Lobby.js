import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { styles } from '../../styles/stylesheets';
import { displayLogo } from '../widgets/widgets';
import PropTypes from 'prop-types';
import { STATUS_READY, STATUS_WAITING } from '../../constants/statuses';

export default class Lobby extends React.Component {
    componentDidMount() {
        // Join Room
        this.props.onJoin(this.props.application.room, this.props.network.socket);
        this.props.network.socket.on('exchangeResponse', (message) => {
            // Room owner sends opponent data
            if (this.props.player.status === STATUS_WAITING) {
                this.props.onConnect(this.props.player, this.props.network.socket);
            }
            this.props.network.socket.off('exchangeResponse');
            this.props.onResponse(message);
            this.props.onReady();
        });
        // Send player data to room owner when you join
        if (this.props.player.status === STATUS_READY) {
            this.props.onConnect(this.props.player, this.props.network.socket);
        }

        // Return to Title Screen if there is a network problem
        // Bound event will persist until it is destroyed in Decide.js
        this.props.network.socket.on('disconnect', () => {
            alert('Lost Websocket connection! Returning to Title Screen; your game will not be saved...');
            this.props.onDisconnect();
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.title}
                >
                    ROOM CODE:
                </Text>
                <Text
                    style={styles.result}
                >
                    {this.props.application.room}
                </Text>
                <Text
                    style={styles.subtext}
                >
                    Waiting to connect to opponent...
                </Text>
                <View style={styles.spacing}>
                </View>
                <View style={styles.field}>
                    <TouchableOpacity onPress={() => {
                        this.props.onLeave(this.props.application.room, this.props.network.socket);
                        this.props.onCancelClick();
                    }}>
                        <Text style={styles.input}>
                            CANCEL
                        </Text>
                    </TouchableOpacity>
                </View>
                {displayLogo()}
            </View>
        );
    }
};

Lobby.propTypes = {
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

