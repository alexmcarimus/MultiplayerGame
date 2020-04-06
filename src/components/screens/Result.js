import React from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import calculatePayout from '../../helpers/calculations';
import { styles } from '../../styles/stylesheets';
import { displayLogo } from '../widgets/widgets';
import PropTypes from 'prop-types';

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            title1Fade: new Animated.Value(0),
            subtitle1Fade: new Animated.Value(0),
            title2Fade: new Animated.Value(0),
            subtitle2Fade: new Animated.Value(0),
            title3Fade: new Animated.Value(0),
            subtitle3Fade: new Animated.Value(0),
            // Player - Cooperate; Opponent - Cooperate
            payoutCC: calculatePayout(this.props.player.wager, false, this.props.opponent.wager, false),
            // Player - Cooperate; Opponent - Betray
            payoutCB: calculatePayout(this.props.player.wager, false, this.props.opponent.wager, true),
            // Player - Betray; Opponent - Cooperate
            payoutBC: calculatePayout(this.props.player.wager, true, this.props.opponent.wager, false),
            // Player - Betray; Opponent - Betray
            payoutBB: calculatePayout(this.props.player.wager, true, this.props.opponent.wager, true),
        };
    }

    componentDidMount() {
        this.title1Timeout = setTimeout(() => {
            this.fadeInTitle1();
        }, 0);
        this.subtitle1Timeout = setTimeout(() => {
            this.fadeInSubtitle1();
        }, 2000);
        this.title2Timeout = setTimeout(() => {
            this.fadeInTitle2();
        }, 4000);
        this.subtitle2Timeout = setTimeout(() => {
            this.fadeInSubtitle2();
        }, 9000);
        this.title3Timeout = setTimeout(() => {
            this.fadeInTitle3();
        }, 10000);
        this.subtitle3Timeout = setTimeout(() => {
            this.fadeInSubtitle3();
        }, 12000);
    }

    componentWillUnmount() {
        clearTimeout(this.title1Timeout);
        clearTimeout(this.subtitle1Timeout);
        clearTimeout(this.title2Timeout);
        clearTimeout(this.subtitle2Timeout);
        clearTimeout(this.title3Timeout);
        clearTimeout(this.subtitle3Timeout);
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={{opacity: this.state.title1Fade}}>
                    <Text style={styles.result}>
                        You chose to...
                    </Text>
                </Animated.View>
                <Animated.View style={{opacity: this.state.subtitle1Fade}}>
                    {this.playerChoice()}
                </Animated.View>
                <Animated.View style={{opacity: this.state.title2Fade}}>
                    <Text style={styles.result}>
                        Opponent chose to...
                    </Text>
                </Animated.View>
                <Animated.View style={{opacity: this.state.subtitle2Fade}}>
                    {this.opponentChoice()}
                </Animated.View>
                <View style={styles.spacing}>
                </View>
                <Animated.View style={{opacity: this.state.title3Fade}}>
                    <Text style={styles.result}>
                        Results...
                    </Text>
                </Animated.View>
                <Animated.View style={{opacity: this.state.subtitle3Fade}}>
                    {this.results()}
                </Animated.View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => {
                        this.props.onReady(this.state.score);
                    }}>
                        <Text style={styles.input}>
                            RETURN TO MENU
                        </Text>
                    </TouchableOpacity>
                </View>
                {displayLogo()}
            </View>
        );
    }

    playerChoice() {
        if (this.props.player.betrayal) {
            return (
                <Text style={styles.stealBig}>
                    STEAL
                </Text>
            );
        }
        else {
            return (
                <Text style={styles.splitBig}>
                    SPLIT
                </Text>
            );
        }
    }

    opponentChoice() {
        if (this.props.opponent.betrayal) {
            return (
                <Text style={styles.stealBig}>
                    STEAL
                </Text>
            );
        }
        else {
            return (
                <Text style={styles.splitBig}>
                    SPLIT
                </Text>
            );
        }
    }

    results() {
        // Both players betray
        if (this.props.player.betrayal && this.props.opponent.betrayal) {
            this.state.score = (parseInt(this.props.player.money) + parseInt(this.state.payoutBB.player));
            return (
                <View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            (You){" "}
                        </Text>
                        <Text style={styles.steal}>
                            ${this.state.score}
                        </Text>
                        <Text style={styles.result}>
                            {" "}={" "}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            ${this.props.player.money}{" "}
                        </Text>
                        <Text style={styles.steal}>
                            - ${Math.abs(this.state.payoutBB.player)}
                        </Text>
                    </View>
                    <View style={styles.spacing}>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            (Them){" "}
                        </Text>
                        <Text style={styles.steal}>
                            ${parseInt(this.props.opponent.money) + parseInt(this.state.payoutBB.opponent)}
                        </Text>
                        <Text style={styles.result}>
                            {" "}={" "}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            ${this.props.opponent.money}{" "}
                        </Text>
                        <Text style={styles.steal}>
                            - ${Math.abs(this.state.payoutBB.opponent)}
                        </Text>
                    </View>
                </View>
            );
        }
        // Only the player betrays
        else if (this.props.player.betrayal && !this.props.opponent.betrayal) {
            this.state.score = (parseInt(this.props.player.money) + parseInt(this.state.payoutBC.player));
            return (
                <View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            (You){" "}
                        </Text>
                        <Text style={styles.split}>
                            ${this.state.score}
                        </Text>
                        <Text style={styles.result}>
                            {" "}={" "}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            ${this.props.player.money}{" "}
                        </Text>
                        <Text style={styles.split}>
                            + ${Math.abs(this.state.payoutBC.player)}
                        </Text>
                    </View>
                    <View style={styles.spacing}>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            (Them){" "}
                        </Text>
                        <Text style={styles.steal}>
                            ${parseInt(this.props.opponent.money) + parseInt(this.state.payoutBC.opponent)}
                        </Text>
                        <Text style={styles.result}>
                            {" "}={" "}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            ${this.props.opponent.money}{" "}
                        </Text>
                        <Text style={styles.steal}>
                            - ${Math.abs(this.state.payoutBC.opponent)}
                        </Text>
                    </View>
                </View>
            );
        }
        // Only the opponent betrays
        else if (!this.props.player.betrayal && this.props.opponent.betrayal) {
            this.state.score = (parseInt(this.props.player.money) + parseInt(this.state.payoutCB.player));
            return (
                <View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            (You){" "}
                        </Text>
                        <Text style={styles.steal}>
                            ${this.state.score}
                        </Text>
                        <Text style={styles.result}>
                            {" "}={" "}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            ${this.props.player.money}{" "}
                        </Text>
                        <Text style={styles.steal}>
                            - ${Math.abs(this.state.payoutCB.player)}
                        </Text>
                    </View>
                    <View style={styles.spacing}>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            (Them){" "}
                        </Text>
                        <Text style={styles.split}>
                            ${parseInt(this.props.opponent.money) + parseInt(this.state.payoutCB.opponent)}
                        </Text>
                        <Text style={styles.result}>
                            {" "}={" "}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            ${this.props.opponent.money}{" "}
                        </Text>
                        <Text style={styles.split}>
                            + ${Math.abs(this.state.payoutCB.opponent)}
                        </Text>
                    </View>
                </View>
            );
        }
        // Both players cooperate
        else {
            this.state.score = (parseInt(this.props.player.money) + parseInt(this.state.payoutCC.player));
            return (
                <View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            (You){" "}
                        </Text>
                        <Text style={styles.split}>
                            ${this.state.score}
                        </Text>
                        <Text style={styles.result}>
                            {" "}={" "}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            ${this.props.player.money}{" "}
                        </Text>
                        <Text style={styles.split}>
                            + ${Math.abs(this.state.payoutCC.player)}
                        </Text>
                    </View>
                    <View style={styles.spacing}>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            (Them){" "}
                        </Text>
                        <Text style={styles.split}>
                            ${parseInt(this.props.opponent.money) + parseInt(this.state.payoutCC.opponent)}
                        </Text>
                        <Text style={styles.result}>
                            {" "}={" "}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.result}>
                            ${this.props.opponent.money}{" "}
                        </Text>
                        <Text style={styles.split}>
                            + ${Math.abs(this.state.payoutCC.opponent)}
                        </Text>
                    </View>
                </View>
            );
        }
    }

    fadeInTitle1() {
        Animated.timing(
            this.state.title1Fade,
            {
                toValue: 1,
                duration: 2000,
            }
        ).start();
    }

    fadeInSubtitle1() {
        Animated.timing(
            this.state.subtitle1Fade,
            {
                toValue: 1,
                duration: 1000,
            }
        ).start();
    }

    fadeInTitle2() {
        Animated.timing(
            this.state.title2Fade,
            {
                toValue: 1,
                duration: 2000,
            }
        ).start();
    }

    fadeInSubtitle2() {
        Animated.timing(
            this.state.subtitle2Fade,
            {
                toValue: 1,
                duration: 1000,
            }
        ).start();
    }

    fadeInTitle3() {
        Animated.timing(
            this.state.title3Fade,
            {
                toValue: 1,
                duration: 2000,
            }
        ).start();
    }

    fadeInSubtitle3() {
        Animated.timing(
            this.state.subtitle3Fade,
            {
                toValue: 1,
                duration: 1000,
            }
        ).start();
    }
};

Result.propTypes = {
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
