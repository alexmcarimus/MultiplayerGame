import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default class Lobby extends React.Component {
    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.props.onConnect();
            this.props.onReady();
        }, 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
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
                    style={styles.title}
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
                    <TouchableOpacity onPress={() => this.props.onCancelClick()}>
                        <Text style={styles.input}>
                            CANCEL
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
    title: {
        color: '#F8F8F8',
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
        height: 150,
    },
});
