import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../styles/stylesheets';
import { displayLogo } from '../widgets/widgets';
import PropTypes from 'prop-types';
import { MAX_PLAYERS } from '../../constants/game';

export default class Main extends React.Component {
    componentDidMount() {
        this.props.network.socket.on('checkCreateRoomResponse', (message) => {
            if (message > 0) {
                alert('That room code is already being used! Please use a different code or wait for it to free up!');
            }
            else {
                this.props.onStartClick();
            }
        });
        this.props.network.socket.on('checkJoinRoomResponse', (message) => {
            if (message === 0) {
                alert('That room is empty! Please use a different code or create the room yourself!');
            }
            else if (message >= MAX_PLAYERS) {
                alert('That room is full! Please use a different code or wait for it to free up!');
            }
            else {
                this.props.onJoinClick();
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.title}
                >
                    CURRENT MONEY
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
                    PLAYER NAME
                </Text>
                <View style={styles.field}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.props.onNameInput(text)}
                        defaultValue={this.props.player.name}
                    >
                    </TextInput>
                </View>
                <View style={styles.spacing}>
                </View>
                <Text
                    style={styles.title}
                >
                    ROOM CODE
                </Text>
                <View style={styles.field}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.props.onRoomInput(text)}
                        defaultValue={this.props.application.room}
                    >
                    </TextInput>
                </View>
                <View style={styles.spacing}>
                </View>
                <View style={styles.room}>
                    <View style={styles.left}>
                        <TouchableOpacity onPress={() => {
                            if (this.props.application.room === null || this.props.application.room === undefined || this.props.application.room === '') {
                                alert('Cannot create room with empty Room Code! Please enter a value before starting a room.');
                            }
                            else if (this.props.player.money === null || this.props.player.money === undefined || this.props.player.money === 0) {
                                alert('Cannot start playing without money! Please come back when you can afford to play!');
                            }
                            else if (this.props.network.socket.disconnected) {
                                alert('Lost Websocket connection! Try again later...');
                            }
                            else {
                                this.props.network.socket.emit('checkRoom', this.props.application.room, 'CREATE');
                            }
                        }}>
                            <Text style={styles.input}>
                                CREATE
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.right}>
                        <TouchableOpacity onPress={() => {
                            if (this.props.application.room === null || this.props.application.room === undefined || this.props.application.room === '') {
                                alert('Cannot join room with empty Room Code! Please enter a value before starting a room.');
                            }
                            else if (this.props.player.money === null || this.props.player.money === undefined || this.props.player.money === 0) {
                                alert('Cannot start playing without money! Please come back when you can afford to play!');
                            }
                            else if (this.props.network.socket.disconnected) {
                                alert('Lost Websocket connection! Try again later...');
                            }
                            else {
                                this.props.network.socket.emit('checkRoom', this.props.application.room, 'JOIN');
                            }
                        }}>
                            <Text style={styles.input}>
                                JOIN
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.spacing}>
                </View>
                <View style={styles.field}>
                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            'Microtransaction:',
                            'Give Alex a dollar to continue',
                            [{
                                    text: 'Cancel'
                                },
                                {
                                    text: 'Done!'
                                }],
                            {cancelable: false},
                        );
                        this.props.onMoreClick()
                    }}>
                        <Text style={styles.input}>
                            CLICK FOR MONEY!
                        </Text>
                    </TouchableOpacity>
                </View>
                {displayLogo()}
            </View>
        );
    }
};

Main.propTypes = {
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
