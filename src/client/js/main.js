$(document).on('ready', () => {
  console.log('connected to new event on main.js');


//this is the button from the event management screen.  This formats and sends the data to the server as a JSON package using Express.
  $('#add_event_func').on('click', (eve)=> {
    console.log('click on event func');
    eve.preventDefault();

    //you don't have to do this - but I always like to take literal values and apply them to variables.  It means that down the road, I can easily take the passed value of the webpage and manipulate it without having to directly change the page data.  As a rule, passed in page data should never be considered mutable.

    var name = $('#event_name').val();
    var date = $('#date').val();
    var time_start = $('#event_start').val();
    var time_end = $('#event_end').val();
    var location_name = $('#location').val();
    var street = $('#street').val();
    var city = $('#city').val();
    var state = $('#state').val();
    var zip = $('#zip').val();
    var event_description = $('#event_description').val();
    var event_type_id = $('#event_type').val();
    var url = $('#url').val();

    //using the taking the selected date from the page and formatting it into an object called checkDate.
    var checkDate = new Date();
    checkDateYear = date.toString().substring(0, 4);
    checkDateMonth = parseInt(date.toString().substring(5, 7))-1;
    checkDateDay = date.toString().substring(8,10);

    //pushing date values into an object to "easily" validate against date.  Otherwise, the JSON value for determining if a date is earlier is too tacky and tricky.
    checkDate.setFullYear(
      checkDateYear,
      checkDateMonth,
      checkDateDay);

    //this is the value of today's date
    var todayDate = new Date();

    //error check on dates and time_start
    //time start must occur before time end
    if((time_start > time_end) || (checkDate < todayDate))
    {
      //if start is before end and the date is earlier than today - there's a problem
      console.log('time isn\'t working fix your date or time');
    } else {
      $.ajax({
        type: 'post',
        url: '/events',
        data: {
          event_name: name,
          date: date,
          time_start: time_start,
          time_end: time_end,
          location_name: location_name,
          street: street,
          city: city,
          state: state,
          zip: zip,
          description: event_description,
          event_type_id: event_type_id,
          url: url
        },
        success: (result) => {
          // should use location.reload()?
          window.location = '/events';
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  });

  //add event type func and reload the event_type page
  $('#add_event_type_func').on('click', (eve)=> {
    eve.preventDefault();

    var event_type_name = $('#event_type_name').val();
    var event_type_description = $('#event_type_description').val();

    $.ajax({
      type: 'post',
      url: '/event_types',
      data: {
        event_type_name: event_type_name,
        event_type_description: event_type_description
      },
      success: (result) => {
        //should use location.reload?
        window.location = '/event_types';
      },
      error: (error) => {
        console.log(error);
      }
    });
  });

  //this deletes an event and reloads the event page
  $('.delete_event').on('click', function(event) {
    event.preventDefault();
    const $url = $(this).attr("href");

    $.ajax({
      type: 'get',
      url: $url
    })
    .done((data) => {
      location.reload();
    })
    .fail((error) => {
      console.log(error);
    });
  });

  //for the event_type - this just pulls in the selected value from the drop down.
  $(".option_selected").change(function(){
    $("#event_type_description_option").
    html($(".option_selected").val());
  });
});
