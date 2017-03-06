// Call this from the developer console and you can control both instances
var calendars = {};

$(document).ready( function() {
    console.info(
        'Welcome to the CLNDR demo. Click around on the calendars and' +
        'the console will log different events that fire.');

    // Assuming you've got the appropriate language files,
    // clndr will respect whatever moment's language is set to.
    // moment.locale('ru');

    // Here's some magic to make sure the dates are happening this month.

    //Create a date object that will track against the original date in JSON mode as well as the currently viewed date
    var Date_Manager = {};
    Date_Manager.date = new Date();  //store the JSON date for reference
    Date_Manager.todays_month = Date_Manager.date.getMonth() + 1;  //for the current month that comes from date
    Date_Manager.viewed_month = Date_Manager.date.getMonth() + 1; //for the currently viewed month on the calendar
    console.log('date manager ', Date_Manager);

    //in getMonth() - January = 0!
    //console.log("this month is: ", thisMonth);
    // Events to load into calendar

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

      tempEvents = result;
      console.log('tempEvents: ', tempEvents);


    var eventArray = tempEvents.days;
    console.log('eventArray: ', eventArray);
    //var eventArray = getMonthEvents();




    // The order of the click handlers is predictable. Direct click action
    // callbacks come first: click, nextMonth, previousMonth, nextYear,
    // previousYear, nextInterval, previousInterval, or today. Then
    // onMonthChange (if the month changed), inIntervalChange if the interval
    // has changed, and finally onYearChange (if the year changed).
    calendars.clndr1 = $('.cal1').clndr({
        events: eventArray,
        clickEvents: {
            click: function (target) {
                //this is a moment object - here is the attribute that pulls out the formatted date.
                console.log('Cal-1 clicked: ', target.date._i);
                $.ajax({
                  type: 'GET',
                  url: '/day/' + target.date._i,
                  success: (result) => {
                    console.log('results from day: ', result.events[0].event_name);
                    $('#show_event').text(result.events[0].event_name);
                  },
                  error: (error) => {
                    console.log(error);
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

  },
  error: (error) => {
    console.log('here is the error: ', error);
  }
});
}
});
