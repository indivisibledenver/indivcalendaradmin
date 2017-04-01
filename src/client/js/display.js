// Call this from the developer console and you can control both instances
var calendars = {};

$(document).ready( function() {

    //Create a date object that will track against the original date in JSON mode as well as the currently viewed date
    var Date_Manager = {};
    Date_Manager.date = new Date();  //store the JSON date for reference
    Date_Manager.todays_month = Date_Manager.date.getMonth() + 1;  //for the current month that comes from date
    Date_Manager.viewed_month = Date_Manager.date.getMonth() + 1; //for the currently viewed month on the calendar

    // here is where you will make a db call.


    var eventArrayTemp = getEvents(Date_Manager.todays_month);

    function getEvents(month_num) {
      var EventArrays = [];

      $.ajax({
        type: 'post',
        url: '/calendar/month/' + month_num,
        data: {
          month: month_num
        },
        success: (result) => {
          var eventArray = result.days;

          calendars.clndr1 = $('.cal1').clndr({
            events: eventArray,
            clickEvents: {
                click: function (target) {

                    //clear the fields on a click
                    $('.day_events').html('');

                    //this is a moment object - here is the attribute that pulls out the formatted date.
                    $.ajax({
                      type: 'GET',
                      url: 'events/day/' + target.date._i,
                      success: (result) => {

                        if(result.events[0] !== undefined){
                          console.log('result events length: ', result.events.length);
                          for (var i = 0; i < result.events.length; i++) {
                            $('.day_events').append('<div class="day_event">' + result.events[i].event_name + '</div><br>');

                            $('.day_events').append('<div class=".description">' + result.events[i].description + '</div><br>');

                            $('.day_events').append('<span class=".start">' + result.events[i].time_start + ' - ' + result.events[i].time_end + '</span><br>');

                            $('.day_events').append('<span class=".location">' + result.events[i].location_name + '</span><br>');


                            $('.day_events').append('<span class=".street">' + result.events[i].street + '</span><br>');

                            $('.day_events').append('<span class=".city">' + result.events[i].city + '</span><br>');
                          }
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
                    //
                    controlStrings = controlStrings.filter (function (value, index, array) {
                      return array.indexOf (value) == index;
                    });

                    var controlStrings = eventArray.map(dayOnCalendar);
                    controlStrings.map(getEventData);
                },
                nextMonth: function () {
                    console.log('Cal-1 next month');
                    Date_Manager.viewed_month += 1;
                    console.log('next month: ', Date_Manager);
                },
                previousMonth: function () {
                    console.log('Cal-1 previous month');

                },
                onMonthChange: function () {
                    console.log('Cal-1 month changed');
                    console.log('on Month Change: ', Date_Manager);
                    var controlStrings = eventArray.map(dayOnCalendar);

                    controlStrings = controlStrings.filter (function (value, index, array) {
                      return array.indexOf (value) == index;
                    });

                    controlStrings.map(getEventData);
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

          var event_container = 'td.calendar-day-' + $control.substring(13, 23) + ' > div.event-container';

          $.ajax({
            type: 'GET',
            url: 'events/day/' + $control.substring(13, 23),
            success: (result) => {
              if(result.events[0] !== undefined){
                for (i = 0; i < result.events.length; i++) {
                  $(event_container).append('<div>' + result.events[i].event_name.substring(0,12) + '</div><br>')
                }
              }
            },
            error: (error) => {
              console.log('you are in the error');
            }
          });
        }//function getEventData

        var controlStrings = eventArray.map(dayOnCalendar);

        controlStrings = controlStrings.filter (function (value, index, array) {
          return array.indexOf (value) == index;
        });

        controlStrings.map(getEventData);

      },
      error: (error) => {
        console.log('here is the error: ', error);
      }
    });
  }
});
