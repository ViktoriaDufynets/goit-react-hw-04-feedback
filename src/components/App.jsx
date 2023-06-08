import { useState } from 'react';
import Feedback from './Feedback/Feedback';
import Statistics  from "./Statistics/Statistics";
import Section from './Section/Section';
import Notification from './Notification/Notification';
import css from './App.module.css';
import JSConfetti from 'js-confetti'

export const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);  

  const handleFeedback = (event) => {
    const option = event.target.name;
    const jsConfetti = new JSConfetti();
    switch (option) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;

      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;

      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        console.log(`No option called ${option}`);
        break;
    }
    jsConfetti.addConfetti({
      emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
  }).then(() => jsConfetti.addConfetti())
  };

  const countTotalFeedback = () => {
     const total = good + neutral + bad;
     return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();
    const goodFeedback = good;
    let result = 0;
    if (totalFeedback > 0) {
      result = Math.ceil((goodFeedback / totalFeedback) * 100);
    }

    return result;
 };

    return (

    <div className={css.container}>
    <Section title = "Please leave feedback">
    <Feedback
      options={['good', 'neutral', 'bad']}
      onLeaveFeedback={handleFeedback}
    />
    </Section>

    <Section title = "Statistics">
    {countTotalFeedback() > 0 ? (
      <Statistics
      good = {good}
      neutral = {neutral}
      bad = {bad}
      total = {countTotalFeedback()}
      percentage = {countPositiveFeedbackPercentage()}
      />

      
    ) : (
      <Notification message = "There is no feedback"/>
    )} 
    </Section>
    </div>
    )
  }


