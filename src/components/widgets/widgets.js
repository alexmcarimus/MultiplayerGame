import React from 'react';
import { styles } from '../../styles/stylesheets';
import {STATUS_READY, STATUS_WAITING} from '../../constants/statuses';
import {Image, Text, TouchableOpacity, View} from 'react-native';

export function displayLogo() {
    return (
        <Image
            style={styles.logo}
            source={require('../../../images/carimus-logo-transparency.png')}
        >
        </Image>
    );
}

export function displayReadyButton(playerStatus, opponentStatus, onPlayerReadyCallback, onReadyCallback) {
    if (playerStatus === STATUS_WAITING && opponentStatus === STATUS_WAITING) {
        return (
            <View style={styles.ready}>
                <TouchableOpacity onPress={() => {
                    onPlayerReadyCallback();
                }}>
                    <Text style={styles.input}>
                        READY?
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    else if (playerStatus === STATUS_WAITING && opponentStatus === STATUS_READY) {
        return (
            <View style={styles.opponentReady}>
                <TouchableOpacity onPress={() => {
                    // If the opponent is ready, go to the next screen. Otherwise, wait for them
                    if (opponentStatus === STATUS_READY) {
                        onReadyCallback();
                    }
                    else {
                        onPlayerReadyCallback();
                    }
                }}>
                    <Text style={styles.buttonText}>
                        OPPONENT IS READY...
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    else if (playerStatus === STATUS_READY && opponentStatus === STATUS_WAITING) {
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
