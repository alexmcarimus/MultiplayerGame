import React from 'react';
import { Text, View, TouchableWithoutFeedback} from 'react-native';
import { styles } from '../../styles/stylesheets';
import { displayLogo } from '../widgets/widgets';
import PropTypes from 'prop-types';

export default class Title extends React.Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
                    <View style={styles.container}>
                        <Text
                            style={styles.title}
                        >
                            SPLIT OR STEAL
                        </Text>
                        <Text
                            style={styles.subtext}
                        >
                            Press anywhere to continue...
                        </Text>
                        {displayLogo()}
                    </View>
            </TouchableWithoutFeedback>
        );
    }

    componentDidMount() {
        this.props.onLoad();
    }
};

Title.propTypes = {
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
