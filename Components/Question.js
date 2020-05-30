import React, {useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Button from './Button';
import data from './Data';

const Question = props => {
  const [getShow, setShow] = useState({
    show: true,
  });
  const [getInfo, setInfo] = useState({
    number: 0,
    score: 0,
  });
  const [getCurrent, setCurrent] = useState({
    question: '',
    options: '',
    answer: '',
  });
  const [getColor, setColor] = useState({
    color: ['white', 'white', 'white', 'white'],
  });
  // Checks whether user has selected an option or not
  const [getOptionSelected, setOptionSelected] = useState(false);
  const [getButtonText, setButtonText] = useState('Next');
  const horizontalLine = () => (
    <View
      style={{
        borderBottomColor: '#39ADDA',
        borderBottomWidth: 1,
        marginVertical: 10,
        marginHorizontal: 25,
      }}
    />
  );
  const updateCurrent = index => {
    setCurrent({
      question: data[index].question,
      options: data[index].options,
      answer: data[index].answer,
    });
  };
  const askQuestion = () => {
    // if no option is selected then do nothing
    if (!getOptionSelected) {
      return;
    }
    // change all option color to white
    setColor({color: ['white', 'white', 'white', 'white']});
    // If all the questions have been asked
    setInfo({
      score: getInfo.score,
      number: getInfo.number + 1,
    });
    let index = Math.floor(Math.random() * 10);
    updateCurrent(index);
    setOptionSelected(false);
  };
  const onOptionSelect = answer => {
    // Makes true that option is selected
    setOptionSelected(true);
    if (getInfo.number === 5) {
      setButtonText('Finish');
    }
    if (answer === getCurrent.answer) {
      setInfo({
        score: getInfo.score + 1,
        number: getInfo.number,
      });
    }
    changeColor(answer);
  };
  const changeColor = answer => {
    if (answer === getCurrent.answer) {
      let options = getCurrent.options;
      let colors = getColor.color;
      for (let i = 0; i < options.length; i++) {
        if (options[i] === answer) {
          colors[i] = '#53B051';
          setColor({color: colors});
          break;
        }
      }
    } else {
      let options = getCurrent.options;
      let colors = getColor.color;
      for (let i = 0; i < options.length; i++) {
        if (options[i] === answer) {
          colors[i] = '#F34636';
        } else if (options[i] === getCurrent.answer) {
          colors[i] = '#53B051';
        }
      }
      setColor({color: colors});
    }
  };
  return (
    <View>
      <Text style={styles.quizInfo}>Question : {getInfo.number} / 5</Text>
      <Text style={styles.quizInfo}>Score : {getInfo.score}</Text>
      {horizontalLine()}
      <Text style={styles.question}>{getCurrent.question}</Text>
      <TouchableOpacity
        onPress={() => onOptionSelect(getCurrent.options[0])}
        style={[styles.card, {backgroundColor: getColor.color[0].toString()}]}>
        <Text style={styles.cardText}>{getCurrent.options[0]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onOptionSelect(getCurrent.options[1])}
        style={[styles.card, {backgroundColor: getColor.color[1].toString()}]}>
        <Text style={styles.cardText}>{getCurrent.options[1]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onOptionSelect(getCurrent.options[2])}
        style={[styles.card, {backgroundColor: getColor.color[2].toString()}]}>
        <Text style={styles.cardText}>{getCurrent.options[2]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onOptionSelect(getCurrent.options[3])}
        style={[styles.card, {backgroundColor: getColor.color[3].toString()}]}>
        <Text style={styles.cardText}>{getCurrent.options[3]}</Text>
      </TouchableOpacity>
      <Button
        onPress={
          getButtonText === 'Next' ? () => askQuestion() : props.onPress
        }>
        {getButtonText}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginHorizontal: 25,
    marginVertical: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 3,
    borderRadius: 10,
  },
  cardText: {
    width: '95%',
  },
  quizInfo: {
    marginHorizontal: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#39ADDA',
  },
  question: {
    marginHorizontal: 25,
    fontSize: 18,
    color: '#333',
    marginVertical: 20,
  },
});

export default Question;
