import { useState } from 'react'
import { getWeatherDataFromCSV, lowestSpreadDay } from './Utils'
import './App.css';

function App() {
  const [error, setError] = useState('')
  const [lowestDayText, setLowestDayText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const csv = event.target[0].files[0]

    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      // const data = csvToArray(text);
      // document.write(JSON.stringify(data));
      try {
        const weatherData = getWeatherDataFromCSV(text)
        const lowestDays = lowestSpreadDay(weatherData)
        setLowestDayText(lowestDays.join(' '))
      } catch (error) {
        setError(error)
        setTimeout(600, setError(''))
      }
    }
  
    reader.readAsText(csv)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Weather Data Spread Processor</p>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="csvFile">Upload CSV</label>
          <input type="file" id="csvFile" accept=".csv" />
          <br />
          <input type="submit" value="Process Weather Data" />
        </form>
        {error && <p>{error}</p>}
        {lowestDayText && <p>The lowest day(s) in this set are: {lowestDayText}</p>}
      </section>
    </div>
  )
}

export default App
