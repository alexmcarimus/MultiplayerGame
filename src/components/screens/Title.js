import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image } from 'react-native';

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
                        <Image
                            style={styles.logo}
                            source={require('../../../images/carimus-logo-transparency.png')}
                        >
                        </Image>
                    </View>
            </TouchableWithoutFeedback>
        );
    }

    componentDidMount() {
        this.props.onLoad();
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
});
