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

export default {
//module.exports= {
  epoch: function() {
    return moment().unix();
  },

  day: function(e) {
    if (e===undefined) {
      e= this.epoch();
    }
    //return (e - e%86400 - LOCALE_OFFSET_SECONDS)
    //return e - (e % 86400)
    return _moment(e)
           .set({hour:0,minute:0,second:0,millisecond:0})
           .unix()
  },

  /**
   * @param {int} e - Epoch value
   * @param {int} l - Format: (1) <D MMM>, (2) <fromNow>. (3) <D MMM (fromNow)>, (4) <D MMM at HH:MM>, (5) <DD MMMM YYYY>, (6) <DD MMM 'YY>
   */
  epoch_to_web: function(e, l) {
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
  },

  epoch_to_str: function (e, fmt = 'DD/MM/YYYY') {
    if (!e)
      return ''

    const m = _moment(e)

    return m.format(fmt)
  },

  epoch_from_date: function(d) {
    return moment(d).unix();
  },


  epoch_from_str: function (e, fmt = 'DD/MM/YYYY') {
    if (!e)
      return undefined
    /*
    const parts = e.split('/');
    const date = new Date(parseInt(parts[2], 10), 
                        parseInt(parts[1]-1, 10), 
                        parseInt(parts[0], 10))
    return parseInt(date.getTime() / 1000)*/
    return moment(e,fmt).unix()
  },


  epoch_to_doc: function (e, l) {
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
  },
  

  epoch_seconds : function(e) { return _moment(e).seconds(); },
  epoch_minutes : function(e) { return _moment(e).minutes(); },
  epoch_hour    : function(e) { return _moment(e).hour   (); },
  epoch_day     : function(e) { return _moment(e).date   (); },
  epoch_week_day: function(e) { return _moment(e).day    (); },
  epoch_month   : function(e) { return _moment(e).month  (); },
  epoch_year    : function(e) { return _moment(e).year   (); },

  epoch_same_day: function (e1,e2) {
    return this.day(e1)==this.day(e2)
  },

  epoch_from: function(y, m, d) {
    return moment([y,m-1,d]).unix()
  },

  epoch_diff: function(e1, e2, w= 'seconds') {
    return _moment(e2).diff(_moment(e1), w)
    //return parseInt(Math.abs( (e1-e2)/86400) );
  },

  epoch_add_days: function(e, n) {
    return _moment(e).add(n, 'days').unix()
  },

  epoch_add_months: function(e, n) {
    return _moment(e).add(n, 'months').unix()
  },

  epoch_sub_months: function(e, n) {
    return _moment(e).subtract(n, 'months').unix()
  },  
  
  epoch_add_years: function(e, n) {
    return _moment(e).add(n, 'years').unix()
  },

  month_name: function(month, long=false) {
    if (! month)
      return ''
    const e= this.epoch_from(2000, month, 1)
    const fmt= long ? 'DD/MMMM/YYYY' : 'DD/MMM/YYYY'
    const m= _moment(e)
    const s= m.format(fmt)
    const mname= s.split('/')[1]
    return mname
  },

  
  epoch_first_of_month: function(e) {
    return this.day(_moment(e).date(1))
  },
  epoch_last_of_month: function(e) {
    //return this.day(_moment(e).date(31))
    return this.day(_moment(e).endOf('month'))
  },
  epoch_first_of_week: function(e) {
    return this.day(_moment(e).weekday(0))
  },
  epoch_last_of_week: function(e) {
    return this.day(_moment(e).weekday(6))
  },    

  epoch_range: function(efrom, eto, includeTo= true) {
    const range= []
    let e= this.day(efrom)
    let epTo= this.day(eto)
    while (includeTo 
           ? e<=epTo
           : e<epTo) {
      range.push(e)
      e= this.epoch_add_days(e, 1)
    }
    return range
  },  

  epoch_debug: function(e) {
    return this.epoch_to_str(e, 'DD MMM YYYY HH:mm:ss')
  }
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