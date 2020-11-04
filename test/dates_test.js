/*
  How to run

  npm run test_dates

*/

// Enable ES2018 support
require('@babel/register')

const dates = require('../src/dates')
const { RED, GREEN, BLUE, LIGHT_BLUE } = require('../src/colors')

function check(e,n) {
  console.log(`${BLUE(n)} is ${LIGHT_BLUE(dates.epoch_to_str(e, 'DD MMM YYYY HH:mm:ss'))}`)
}


const now= dates.epoch()
const today= dates.day()

check(now, 'now')
check(today, 'today')

const may04= dates.epoch_from_str('04/05/2020', 'DD/MM/YYYY')
const may04noon= dates.epoch_from_str('04/05/2020 15:00:00', 'DD/MM/YYYY HH:mm:ss')

check(may04, 'May 04')
check(may04noon, 'May 04 - noon')

const may04d= dates.epoch_from_date(new Date(2020, 4, 4))
check(may04d, 'May 04 - from date')

check(dates.day(may04), 'Day Of: May 04')
check(dates.day(may04noon), 'Day Of: May 04 - noon')

const may04_same= dates.epoch_same_day(may04, may04noon)
console.log(`May 04 / May 04 - noon => are the same day? ${may04_same ? GREEN('yes') : RED('no!')}`)

const jun18= dates.epoch_from_str('18/06/2020', 'DD/MM/YYYY')
const jun18night= dates.epoch_from_str('18/06/2020 23:00:00', 'DD/MM/YYYY HH:mm:ss')

check(jun18, 'Jun 18')
check(jun18night, 'Jun 18 - night')

check(dates.day(jun18), 'Day Of: Jun 18')
check(dates.day(jun18night), 'Day Of: Jun 18 - night')

const jun18_same= dates.epoch_same_day(jun18, jun18night)
console.log(`Jun 18 / Jun 18 - night => are the same day? ${jun18_same ? GREEN('yes') : RED('no!')}`)

const diffa= dates.epoch_diff(may04, jun18)
const diffb= dates.epoch_diff(may04, jun18night)

console.log(`From 04 May to 18 Jun => ${diffa}`)
console.log(`From 04 May to 18 Jun night => ${diffb}`)


check(dates.epoch_add_days(jun18, 1), '1 Day after Jun 18')
check(dates.epoch_add_days(jun18, 11), '11 Day after Jun 18')

check(dates.epoch_add_months(jun18, 1), '1 month after Jun 18')
check(dates.epoch_add_months(jun18, 11), '11 month after Jun 18')

check(dates.epoch_sub_months(jun18, 1), '1 month before Jun 18')
check(dates.epoch_sub_months(jun18, 11), '11 month before Jun 18')

check(dates.epoch_add_years(jun18, 1), '1 year after Jun 18')
check(dates.epoch_add_years(jun18, 11), '11 year after Jun 18')


check(dates.epoch_first_of_month(jun18), 'First of month from Jun 18')
check(dates.epoch_first_of_week(jun18), 'First of week from Jun 18')
check(dates.epoch_last_of_week(jun18), 'Last of week from Jun 18')

check(dates.epoch_last_of_month(may04noon), 'Last of month from May 04')
check(dates.epoch_last_of_month(jun18), 'Last of month from Jun 18')





console.group('DA Range:')
dates.epoch_range(may04, jun18).map((day, idx) => check(day, idx))







/*


epoch_first_of_month: function(e) {
  return this.day(_moment(e).date(1).unix())
},
epoch_last_of_month: function(e) {
  return this.day(_moment(e).date(31).unix())
},
epoch_first_of_week: function(e) {
  return this.day(_moment(e).weekday(0).unix())
},
epoch_last_of_week: function(e) {
  return this.day(_moment(e).weekday(6).unix())
},    

epoch_range: function(efrom, eto, includeTo= true) {
*/