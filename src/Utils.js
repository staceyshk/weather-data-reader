/**
 * Assuming the spread between temperatures is the difference.
 * Added the absolute of it in case the max/min are switched because
 * the spread is just the amount between anyway
 * @param {object} dayInfo 
 * @returns difference between high temp and low temp
 */
export const spread  = (dayInfo) => {
  return Math.abs(dayInfo.maxTemp - dayInfo.minTemp)
}

/**
 * Takes the array of days with max and min temp and returns the lowest day/days 
 * @param {array} dayInfoList
 * @returns {array} day numbers with lowest spreads
 */
export const lowestSpreadDay = (dayInfoList) => {
  // Easy exit, no days to sort
  if (!dayInfoList || dayInfoList.length === 0) return []

  // Add the spread to each object
  dayInfoList.forEach(dayInfo => dayInfo.spread = spread(dayInfo))

  // Sort by the lowest spread
  const sortedDays = dayInfoList.sort((a, b) => (a.spread >= b.spread) ? 1 : -1)

  // This wasn't in the requirement, but if two days are equal I'd like to return them both
  const shortestSpreadDays = sortedDays.filter(spreadDayInfo => spreadDayInfo.spread === sortedDays[0].spread)
  return shortestSpreadDays.map(shortestSpreadDay => shortestSpreadDay.day)
}

/**
 * Reads in csv, trims lines and returns weather data
 * 
 * @param {string} csvString 
 * @returns {array} partial weather data in object format that can be used in
 */
export const getWeatherDataFromCSV = (csvString) => {
  // This looks for \r\n or \r or \n to account for all types of operating system csvs
  const lines = csvString.split(/\r\n|\r|\n/)
  const headers = lines[0]
  if (headers !== 'Day,MxT,MnT,AvT,AvDP,1HrP TPcpn,PDir,AvSp,Dir,MxS,SkyC,MxR,Mn,R AvSLP') {
    throw new Error('Wrong CSV Header format')
  }

  if (lines.length < 2){
    throw new Error('Missing weather data')
  }
 
  const weatherData = []

  // Each weather data has day,max,min temps in that order
  for (let i = 1; i < lines.length; i++) {
    const weatherDataItem = lines[i].replace('\r', '').split(',')
    const day = parseInt(weatherDataItem[0])
    const maxTemp = parseInt(weatherDataItem[1])
    const minTemp = parseInt(weatherDataItem[2])

    if (isNaN(day) || isNaN(maxTemp) || isNaN(minTemp)) {
      throw new Error('Invalid weather data on line ' + i)
    }

    weatherData.push({
      day: day,
      maxTemp: maxTemp,
      minTemp: minTemp
    })
  }

  return weatherData
}
