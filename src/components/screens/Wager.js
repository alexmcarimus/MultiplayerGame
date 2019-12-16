import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import {STATUS_READY, STATUS_WAITING} from '../../constants/statuses';

export default class Wager extends React.Component {
    componentDidMount() {
        // If the player is ready, go to the next screen. Otherwise, wait for them
        this.wagerTimeout = setTimeout(() => {
            if (this.props.player.status === STATUS_READY) {
                this.props.onReady();
            }
            else {
                this.props.onOpponentReady();
            }
        }, 10000);
    }

    componentWillUnmount() {
        clearTimeout(this.wagerTimeout);
    }

    render() {
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
                            if (text.includes("-") || text.includes(".")) {
                                alert("Please enter positive integers!");
                                this.props.onWagerInput(0);
                            }
                            if (text > this.props.player.money) {
                                alert("You can't wager more than you have!");
                                this.props.onWagerInput(this.props.player.money);
                            }
                            else {
                                this.props.onWagerInput(text);
                            }
                        }}
                        value={String(this.props.player.wager)}
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
                <Image
                    style={styles.logo}
                    source={require('../../../images/carimus-logo-transparency.png')}
                >
                </Image>
            </View>
        );
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
    title: {
        color: '#92CD97',
        fontWeight: 'bold',
        fontSize: 40,
    },
    subtext: {
        color: '#92CD97',
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
    spacing: {
        height: 50,
    },
    money: {
        color: '#F8F8F8',
        fontWeight: 'bold',
        fontSize: 40,
    }
});
