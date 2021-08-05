import { useState } from 'react'
import { getWeatherDataFromCSV, lowestSpreadDay } from './Utils'
import './App.css';

function App() {
  const [error, setError] = useState('')
  const [lowestDayArray, setLowestDayArray] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const csv = event.target[0].files[0]

    if (!csv) {
      setError('Please upload a csv')
      setTimeout(600, setError(''))
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      try {
        const weatherData = getWeatherDataFromCSV(text)
        const lowestDays = lowestSpreadDay(weatherData)
        setLowestDayArray(lowestDays)
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
        <form className="csv-upload-form" onSubmit={handleSubmit}>
          <label htmlFor="csvFile">Upload CSV</label>
          <input className="csv-upload-btn" type="file" id="csvFile" accept=".csv" />
          <br />
          <br />
          <input type="submit" value="Process Weather Data" />
        </form>
        <section className="output">
          {error && <p className="error">{error}</p>}
          {lowestDayArray.length > 0 && <p className="result">The lowest day{lowestDayArray.length > 1 ? 's' : ''} in this set: {lowestDayArray.join(', ')}</p>}
        </section>
      </section>
    </div>
  )
}

export default App
