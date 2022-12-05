/* Your Code Here */
const createEmployeeRecord = function (array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = function (array) {
    return array.map(array => createEmployeeRecord(array))
}

const createTimeInEvent = function (stamp) {
    let [date, hour] = stamp.split(' ')
    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    this.timeInEvents.push(timeInObj)
    return this
}

const createTimeOutEvent = function (stamp) {
    let [date, hour] = stamp.split(' ')
    let timeOutObj = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    this.timeOutEvents.push(timeOutObj)
    return this
}

const hoursWorkedOnDate = function (stamp) {
    const timeIn = this.timeInEvents.find(e => e.date == stamp).hour
    const timeOut = this.timeOutEvents.find(e => e.date == stamp).hour
    return (timeOut - timeIn) / 100
}

const wagesEarnedOnDate = function (stamp) {
    const wages = this.payPerHour
    return wages * hoursWorkedOnDate.call(this,stamp)
   
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function (array, personWeAreLookingFor) {

    const found = array.find((obj) => {
    return obj.firstName == personWeAreLookingFor
    })
    return found
   
}

const calculatePayroll = function (array) {

   const allWages = array.map((obj) => allWagesFor.call(obj))
   const total = allWages.reduce((accumulator, currentValue) => accumulator + currentValue)
   return total
}