import { useState } from 'react'
import { getWeatherDataFromCSV, lowestSpreadDay } from './Utils'
import './App.css';

function App() {
  const [errorString, setErrorString] = useState('')
  const [lowestDayArray, setLowestDayArray] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const csv = event.target[0].files[0]

    if (!csv) {
      setErrorString('Please upload a csv')
      setTimeout(() => setErrorString(''), 5000)
      return
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      try {
        const weatherData = getWeatherDataFromCSV(text)
        const lowestDays = lowestSpreadDay(weatherData)
        setLowestDayArray(lowestDays)
      } catch (error) {
        setErrorString(error.toString())
        setTimeout(() => setErrorString(''), 5000)
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
          {errorString && <p className="error">{errorString}</p>}
          {lowestDayArray.length > 0 && <p className="result">The lowest day{lowestDayArray.length > 1 ? 's' : ''} in this set: {lowestDayArray.join(', ')}</p>}
        </section>
      </section>
    </div>
  )
}

export default App
