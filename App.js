import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Question from './Components/Question';
import Button from './Components/Button';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
  }

  ShowHideComponent = () => {
    if (this.state.show === true) {
      this.setState({show: false});
    } else {
      this.setState({show: true});
    }
  };

  startScreen = (
    <View>
      <Image
        source={require('./quiz_logo.png')}
        style={{width: 150, height: 150}}
      />
      <Button onPress={this.ShowHideComponent}>{'Start'}</Button>
    </View>
  );

  quizScreen = <Question onPress={this.ShowHideComponent} />;

  render() {
    return (
      <View style={styles.MainContainer}>
        {this.state.show ? this.startScreen : this.quizScreen}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
});
