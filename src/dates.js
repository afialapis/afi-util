import moment from 'moment'
moment.locale('es')

// const LOCALE_OFFSET_SECONDS= 2*60*60
// const DEF_DATE_FORMAT      = 'DD MM YYYY'
// const DEF_DATETIME_FORMAT  = 'DD MM YYYY hh:mm:ss'


function _moment(e) {
  if (e==undefined) {
    return moment()
  }
  if (typeof e === 'object') {
    return e
  }
  return moment.unix(e)
}

 
export function epoch() {
  return moment().unix();
}

export function day(e) {
  if (e===undefined) {
    e= epoch();
  }
  //return (e - e%86400 - LOCALE_OFFSET_SECONDS)
  //return e - (e % 86400)
  return _moment(e)
          .set({hour:0,minute:0,second:0,millisecond:0})
          .unix()
}


/**
 * @param {int} e - Epoch value
 * @param {int} l - Format: (1) <D MMM>, (2) <fromNow>. (3) <D MMM (fromNow)>, (4) <D MMM at HH:MM>, (5) <DD MMMM YYYY>, (6) <DD MMM 'YY>
 */
export function epoch_to_web(e, l) {
  if (!e)
    return ''

  if (l === undefined) {
    l = 1;
  }

  const fmt1 = 'D MMM'
  const fmt2 = 'HH:mm'
  const fmt3 = 'DD MMMM YYYY'
  const fmt4 = 'DD MMM [\']YY'
  const m= _moment(e)

  if (l == 1) {
    return m.format(fmt1)
  }
  if (l == 2) {
    return m.fromNow()
  }
  if (l == 3) {
    return m.format(fmt1) + ' (' + m.fromNow() + ')'
  }    
  if (l == 4) {
    return m.format(fmt1) + ' a las ' + m.format(fmt2)
  }    
  if (l == 5) {
    return m.format(fmt3)
  }
  if (l == 6) {
    return m.format(fmt4)
  }   

  return ''
}

export function epoch_to_str (e, fmt = 'DD/MM/YYYY') {
  if (!e)
    return ''

  const m = _moment(e)

  return m.format(fmt)
}

export function epoch_from_date(d) {
  return moment(d).unix();
}


export function epoch_from_str (e, fmt = 'DD/MM/YYYY') {
  if (!e)
    return undefined
  /*
  const parts = e.split('/');
  const date = new Date(parseInt(parts[2], 10), 
                      parseInt(parts[1]-1, 10), 
                      parseInt(parts[0], 10))
  return parseInt(date.getTime() / 1000)*/
  return moment(e,fmt).unix()
}


export function epoch_to_doc (e, l) {
  if (!e)
    return ''

  if (l === undefined) {
    l = 1;
  }

  const fmt1 = 'D [de] MMMM [de] YYYY'
  const fmt2 = 'DD/MM/YYYY'
  const m = _moment(e)

  if (l == 1) {
    return m.format(fmt1)
  }
  if (l == 2) {
    return m.format(fmt2)
  }

  return ''
}


export function epoch_seconds (e) { return _moment(e).seconds(); }
export function epoch_minutes (e) { return _moment(e).minutes(); }
export function epoch_hour    (e) { return _moment(e).hour   (); }
export function epoch_day     (e) { return _moment(e).date   (); }
export function epoch_week_day(e) { return _moment(e).day    (); }
export function epoch_month   (e) { return _moment(e).month  (); }
export function epoch_year    (e) { return _moment(e).year   (); }

export function epoch_same_day (e1,e2) {
  return day(e1)==day(e2)
}

export function epoch_from(y, m, d) {
  return moment([y,m-1,d]).unix()
}

export function epoch_diff(e1, e2, w= 'seconds') {
  return _moment(e2).diff(_moment(e1), w)
  //return parseInt(Math.abs( (e1-e2)/86400) );
}

export function epoch_add_days(e, n) {
  return _moment(e).add(n, 'days').unix()
}

export function epoch_add_months(e, n) {
  return _moment(e).add(n, 'months').unix()
}

export function epoch_sub_months(e, n) {
  return _moment(e).subtract(n, 'months').unix()
}  

export function epoch_add_years(e, n) {
  return _moment(e).add(n, 'years').unix()
}

export function month_name(month, long=false) {
  if (! month)
    return ''
  const e= epoch_from(2000, month, 1)
  const fmt= long ? 'DD/MMMM/YYYY' : 'DD/MMM/YYYY'
  const m= _moment(e)
  const s= m.format(fmt)
  const mname= s.split('/')[1]
  return mname
}


export function epoch_first_of_month(e) {
  return day(_moment(e).date(1))
}

export function epoch_last_of_month(e) {
  //return day(_moment(e).date(31))
  return day(_moment(e).endOf('month'))
}

export function epoch_first_of_week(e) {
  return day(_moment(e).weekday(0))
}

export function epoch_last_of_week(e) {
  return day(_moment(e).weekday(6))
}

export function epoch_range(efrom, eto, includeTo= true) {
  const range= []
  let e= day(efrom)
  let epTo= day(eto)
  while (includeTo 
          ? e<=epTo
          : e<epTo) {
    range.push(e)
    e= epoch_add_days(e, 1)
  }
  return range
}

export function epoch_debug(e) {
  return epoch_to_str(e, 'DD MMM YYYY HH:mm:ss')
}


/*

Workin/Holiday days

def epoch_diff_bdays(ep1, ep2= None):
  cal      = Calendar(workdays=[MO,TU,WE,TH, FR], holidays=HOLIDAYS)
  _date1   = epoch_to_date(ep1)
  if not ep2:
    ep2= day()
  _date2 = epoch_to_date(ep2)
  return -1 * cal.busdaycount(_date1, _date2)

def epoch_add_bdays(e, n):
  cal      = Calendar(workdays=[MO,TU,WE,TH, FR], holidays=HOLIDAYS)
  _date    = epoch_to_date(e)
  _date2   = cal.addbusdays(_date, n)
  return date_to_epoch(_date2)



def date_to_epoch(d):
  return int(time.mktime(d.timetuple()))

def epoch_to_date(e):
  return datetime.datetime.fromtimestamp(e)

def date_to_str(d, fmt= DEF_DATETIME_FORMAT):
  return datetime.datetime.strftime(d, fmt)
*/