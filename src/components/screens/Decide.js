import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Switch} from 'react-native';
import {STATUS_READY, STATUS_WAITING} from '../../constants/statuses';
import calculatePayout from '../../helpers/calculations';

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
        this.decideTimeout = setTimeout(() => {
            if (this.props.player.status === STATUS_READY) {
                this.props.onReady();
            }
            else {
                this.props.onOpponentReady();
            }
        }, 20000);
    }

    componentWillUnmount() {
        clearTimeout(this.decideTimeout);
    }

    render() {
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
                <Image
                    style={styles.logo}
                    source={require('../../../images/carimus-logo-transparency.png')}
                >
                </Image>
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
                        if (this.props.opponent.status === STATUS_READY) {
                            this.props.onReady();
                        }
                        else {
                            this.props.onPlayerReady();
                        }
                    }}>
                        <Text style={styles.button}>
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
                        <Text style={styles.button}>
                            WAITING ON OPPONENT...
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

};

const styles = StyleSheet.create({
    button: {
        color: '#0A0943',
        fontWeight: 'bold',
        fontSize: 20,
    },
    ready: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        height: 50,
        width: 300,
        position: 'absolute',
        bottom: 20,
    },
    opponentReady: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFB7B6',
        height: 50,
        width: 300,
        position: 'absolute',
        bottom: 20,
    },
    waiting: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92CD97',
        height: 50,
        width: 300,
        position: 'absolute',
        bottom: 20,
    },
    logo: {
        position: 'absolute',
        top: 40,
        height: 80,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0A0943',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0A0943',
    },
    splitBig: {
        color: '#92CD97',
        fontWeight: 'bold',
        fontSize: 40,
    },
    stealBig: {
        color: '#FFB7B6',
        fontWeight: 'bold',
        fontSize: 40,
    },
    split: {
        color: '#92CD97',
        fontSize: 30,
    },
    steal: {
        color: '#FFB7B6',
        fontSize: 30,
    },
    subtext: {
        color: '#F8F8F8',
        fontSize: 25,
    },
    input: {
        color: '#0A0943',
        fontWeight: 'bold',
        fontSize: 30,
    },
    field: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        height: 50,
        width: 300
    },
    verticalSpacing: {
        height: 50,
    },
    horizontalSpacing: {
        width: 25,
    },
    money: {
        color: '#F8F8F8',
        fontWeight: 'bold',
        fontSize: 40,
    }
});
