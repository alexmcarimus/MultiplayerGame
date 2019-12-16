import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert } from 'react-native';

export default class Main extends React.Component {
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
                            else {
                                this.props.onStartClick();
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
                                alert('Cannot create room with empty Room Code! Please enter a value before starting a room.');
                            }
                            else if (this.props.player.money === null || this.props.player.money === undefined || this.props.player.money === 0) {
                                alert('Cannot start playing without money! Please come back when you can afford to play!');
                            }
                            else {
                                this.props.onJoinClick();
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
                <Image
                    style={styles.logo}
                    source={require('../../../images/carimus-logo-transparency.png')}
                >
                </Image>
            </View>
        );
    }
};

const styles = StyleSheet.create({
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
    title: {
        color: '#92CD97',
        fontWeight: 'bold',
        fontSize: 40,
    },
    money: {
        color: '#F8F8F8',
        fontWeight: 'bold',
        fontSize: 40,
    },
    spacing: {
        height: 50,
    },
    left: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        height: 50,
        width: 125,
        right: 25,
    },
    right: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        height: 50,
        width: 125,
        left: 25,
    },
    room: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
