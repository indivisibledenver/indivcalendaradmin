// Call this from the developer console and you can control both instances
var calendars = {};

$(document).ready( function() {
    console.info(
        'Welcome to the CLNDR demo. Click around on the calendars and' +
        'the console will log different events that fire.');

    //Create a date object that will track against the original date in JSON mode as well as the currently viewed date
    var Date_Manager = {};
    Date_Manager.date = new Date();  //store the JSON date for reference
    Date_Manager.todays_month = Date_Manager.date.getMonth() + 1;  //for the current month that comes from date
    Date_Manager.viewed_month = Date_Manager.date.getMonth() + 1; //for the currently viewed month on the calendar
    console.log('date manager ', Date_Manager);

    // here is where you will make a db call.
    var eventArrayTemp = getEvents(Date_Manager.todays_month);

    function getEvents(month_num) {
      var EventArrays = [];
      console.log('in the getEvents()');
      $.ajax({
        type: 'post',
        url: '/calendar/month/' + month_num,
        data: {
          month: month_num
        },
        success: (result) => {
          console.log('result from events is: ', result);

      var tempEvents = result;
      console.log('tempEvents: ', tempEvents);


    var eventArray = tempEvents.days;
    console.log('eventArray: ', eventArray);

    calendars.clndr1 = $('.cal1').clndr({
        events: eventArray,
        clickEvents: {
            click: function (target) {
                //this is a moment object - here is the attribute that pulls out the formatted date.
                $.ajax({
                  type: 'GET',
                  url: '/day/' + target.date._i,
                  success: (result) => {
                    if(result.events[0] !== undefined){

                      $('#show_event').html(result.events[0].event_name).addClass('day_event');

                      $('#description').html(result.events[0].description).addClass('description');

                      $('#time_start').html(result.events[0].time_start).addClass('start');

                      $('#time_end').html(result.events[0].time_end).addClass('end');

                      $('#location').html(result.events[0].location_name).addClass('location');

                      $('#street').html(result.events[0].street).addClass('street');

                      $('#city').html(result.events[0].city).addClass('city');
                    } else {
                      $('#show_event').html("").addClass('day_event');

                      $('#description').html("").addClass('description');

                      $('#time_start').html("").addClass('start');

                      $('#time_end').html("").addClass('end');

                      $('#location').html("").addClass('location');

                      $('#street').html("").addClass('street');

                      $('#city').html("").addClass('city');
                    }
                  },
                  error: (error) => {
                    console.log('you are in the error');
                  }
                });
            },
            today: function () {
                console.log('Cal-1 today');
            },
            nextMonth: function () {
                console.log('Cal-1 next month');
                Date_Manager.viewed_month += 1;
                console.log('next month: ', Date_Manager);
            },
            previousMonth: function () {
                console.log('Cal-1 previous month');
                Date_Manager.viewed_month = 1;
            },
            onMonthChange: function () {
                console.log('Cal-1 month changed');
                console.log('on Month Change: ', Date_Manager);
            },
            nextYear: function () {
                console.log('Cal-1 next year');
            },
            previousYear: function () {
                console.log('Cal-1 previous year');
            },
            onYearChange: function () {
                console.log('Cal-1 year changed');
            },
            nextInterval: function () {
                console.log('Cal-1 next interval');
            },
            previousInterval: function () {
                console.log('Cal-1 previous interval');
            },
            onIntervalChange: function () {
                console.log('Cal-1 interval changed');
            }
        },
        multiDayEvents: {
            singleDay: 'date',
            endDate: 'endDate',
            startDate: 'startDate'
        },
        showAdjacentMonths: true,
        adjacentDaysChangeMonth: false
    });

    // Bind all clndrs to the left and right arrow keys
    $(document).keydown( function(e) {
        // Left arrow
        if (e.keyCode === 37) {
            calendars.clndr1.back();
            calendars.clndr2.back();
            calendars.clndr3.back();
        }

        // Right arrow
        if (e.keyCode === 39) {
            calendars.clndr1.forward();
            calendars.clndr2.forward();
            calendars.clndr3.forward();
        }
    });

    function dayOnCalendar(string) {
      //calendar-day-2017-03-15
      return "calendar-day-" + string.date;
    }

    function getEventData($control) {
      $.ajax({
        type: 'GET',
        url: '/day/',
        //  + target.date._i,
        success: (result) => {
          if(result.events[0] !== undefined){

            $('#show_event').html(result.events[0].event_name).addClass('day_event');

          }
        },
        error: (error) => {
          console.log('you are in the error');
        }
      });
    }

    var controlStrings = eventArray.map(dayOnCalendar);

    console.log('controlStrings: ', controlStrings);
    controlStrings.map(getEventData);

  },
  error: (error) => {
    console.log('here is the error: ', error);
  }
});
}
});
