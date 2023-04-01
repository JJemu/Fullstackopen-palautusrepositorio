import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  const countAverage = () => { // Keskiarvon laskeminen
    const total = good + neutral + bad;
    const weight = good * 1 + neutral * 0 + bad * -1;
    const avg = weight / total;
    return avg;
  }

  const countPositive = () => { // Positiivisten äänten laskeminen
    const total = good + neutral + bad;
    const positive = good / total * 100;
    return positive;
  }
  
  const total = good + neutral + bad;
  if (total===0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={total} />
        <StatisticLine text="Average" value={countAverage()} />
        <StatisticLine text="Positive" value={`${countPositive()} %`} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(null) // useState null jotta 

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const handleAnekdootti = () => {
    const rng = Math.floor(Math.random() * anecdotes.length)
    setSelected(rng)
  }

  const handleVote = () => {
    const copy = [...points];
    copy[selected]++;
    setPoints(copy);
  };

  const handleClick = (type) => { // Klikkausten toiminta
    switch (type) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        break;
    }
  }

  const maxVotesIndex = points.indexOf(Math.max(...points));
  const maxVotesAnecdote = anecdotes[maxVotesIndex];

  return (
    <div>

      <h1>Feedback</h1>

      <Button onClick={() => handleClick('good')} text="Good"/>
      <Button onClick={() => handleClick('neutral')} text="Neutral"/>
      <Button onClick={() => handleClick('bad')} text="Bad"/>

      <h1>Statistics</h1>
      
      <Statistics good={good} neutral={neutral} bad={bad}/>

        <div>
          <Button onClick={handleAnekdootti} text="Next anecdote"/>
          <Button onClick={handleVote} text="Vote"/><br/>
          {selected !== null && (
          <div>
            <p>{anecdotes[selected]}</p>
            <p>has {points[selected]} votes</p>
          </div>
        )}
        </div>

      <h1>Anecdote with most votes</h1>
      {maxVotesAnecdote && (
        <div>
          <p>{maxVotesAnecdote}</p>
          <p>has {points[maxVotesIndex]} votes</p>
        </div>
      )}

    </div>
    
  )
}

export default App;