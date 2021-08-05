import { getWeatherDataFromCSV, spread, lowestSpreadDay } from './Utils'

test('Calculates temperature spread', () => {
  const dayInfo = { day: 1, minTemp: 3, maxTemp: 6 }
  expect(spread(dayInfo)).toEqual(3)
})

test('Returns lowest spread in array of day objects', () => {
  const dayInfoArray = [
    { day: 1, minTemp: 3, maxTemp: 6 },
    { day: 2, minTemp: 6, maxTemp: 6 },
    { day: 3, minTemp: 5, maxTemp: 6 },
  ]

  expect(lowestSpreadDay(dayInfoArray)).toEqual([2])
})

test('Returns multiple lowest spreads in array of day objects', () => {
  const dayInfoArray = [
    { day: 1, minTemp: 3, maxTemp: 6 },
    { day: 2, minTemp: 2, maxTemp: 6 },
    { day: 3, minTemp: 5, maxTemp: 6 },
    { day: 4, minTemp: 5, maxTemp: 6 },
  ]

  expect(lowestSpreadDay(dayInfoArray)).toEqual([3,4])
})

test('Returns empty array when no days are passed', () => {
  expect(lowestSpreadDay(null)).toEqual([]);
})

test('Reads CSV Lines and returns object for weather data', () => {
  const testCsvString = 'Day,MxT,MnT,AvT,AvDP,1HrP TPcpn,PDir,AvSp,Dir,MxS,SkyC,MxR,Mn,R AvSLP\r1,88,59,74,53.8,0,280,9.6,270,17,1.6,93,23,1004.5\r2,79,63,71,46.5,0,330,8.7,340,23,3.3,70,28,1004.5'
  const weatherData = getWeatherDataFromCSV(testCsvString)
  expect(weatherData).toEqual([{
    day: 1,
    maxTemp: 88,
    minTemp: 59
  },{
    day: 2,
    maxTemp: 79,
    minTemp: 63
  }])
})

test('Throws exception for wrong header format', () => {
  const testCsvString = 'Day,MxT,MnT,AvT,AvDP,PDir,AvSp,Dir,MxS,SkyC,MxR,Mn,R AvSLP\r1,88,59,74,53.8,0,280,9.6,270,17,1.6,93,23,1004.5\r2,79,63,71,46.5,0,330,8.7,340,23,3.3,70,28,1004.5'
  expect(() => { getWeatherDataFromCSV(testCsvString) }).toThrow('Wrong CSV Header format')
})

test('Throws exception for not enough lines of data', () => {
  const testCsvString = 'Day,MxT,MnT,AvT,AvDP,1HrP TPcpn,PDir,AvSp,Dir,MxS,SkyC,MxR,Mn,R AvSLP'
  expect(() => { getWeatherDataFromCSV(testCsvString) }).toThrow('Missing weather data')
})

test('Throws exception if weather data is not a number on line 1', () => {
  const testCsvString = 'Day,MxT,MnT,AvT,AvDP,1HrP TPcpn,PDir,AvSp,Dir,MxS,SkyC,MxR,Mn,R AvSLP\r1,S,TT,74,53.8,0,280,9.6,270,17,1.6,93,23,1004.5\r2,79,63,71,46.5,0,330,8.7,340,23,3.3,70,28,1004.5'
  expect(() => { getWeatherDataFromCSV(testCsvString) }).toThrow('Invalid weather data on line 1')
})

test('Throws exception if weather data is not a number on line 2', () => {
  const testCsvString = 'Day,MxT,MnT,AvT,AvDP,1HrP TPcpn,PDir,AvSp,Dir,MxS,SkyC,MxR,Mn,R AvSLP\r1,88,59,74,53.8,0,280,9.6,270,17,1.6,93,23,1004.5\r2,TT,63,71,46.5,0,330,8.7,340,23,3.3,70,28,1004.5'
  expect(() => { getWeatherDataFromCSV(testCsvString) }).toThrow('Invalid weather data on line 2')
})

test('Works for \r\n deliimiter', () => {
  const testCsvString = 'Day,MxT,MnT,AvT,AvDP,1HrP TPcpn,PDir,AvSp,Dir,MxS,SkyC,MxR,Mn,R AvSLP\r\n1,S,TT,74,53.8,0,280,9.6,270,17,1.6,93,23,1004.5\r2,79,63,71,46.5,0,330,8.7,340,23,3.3,70,28,1004.5'
  expect(() => { getWeatherDataFromCSV(testCsvString) }).toThrow('Invalid weather data on line 1')
})

test('Works for \n delimiter', () => {
  const testCsvString = 'Day,MxT,MnT,AvT,AvDP,1HrP TPcpn,PDir,AvSp,Dir,MxS,SkyC,MxR,Mn,R AvSLP\n1,88,59,74,53.8,0,280,9.6,270,17,1.6,93,23,1004.5\r2,79,63,71,46.5,0,330,8.7,340,23,3.3,70,28,1004.5'
  const weatherData = getWeatherDataFromCSV(testCsvString)
  expect(weatherData).toEqual([{
    day: 1,
    maxTemp: 88,
    minTemp: 59
  },{
    day: 2,
    maxTemp: 79,
    minTemp: 63
  }])
})


test('Works for \r\n delimiter', () => {
  const testCsvString = 'Day,MxT,MnT,AvT,AvDP,1HrP TPcpn,PDir,AvSp,Dir,MxS,SkyC,MxR,Mn,R AvSLP\r\n1,88,59,74,53.8,0,280,9.6,270,17,1.6,93,23,1004.5\r2,79,63,71,46.5,0,330,8.7,340,23,3.3,70,28,1004.5'
  const weatherData = getWeatherDataFromCSV(testCsvString)
  expect(weatherData).toEqual([{
    day: 1,
    maxTemp: 88,
    minTemp: 59
  },{
    day: 2,
    maxTemp: 79,
    minTemp: 63
  }])
})
