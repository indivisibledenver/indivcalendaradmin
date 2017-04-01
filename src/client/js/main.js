$(document).on('ready', () => {
  console.log('connected to new event on main.js');

  $('#add_event_func').on('click', (eve)=> {
    console.log('click on event func');
    eve.preventDefault();

    var todayDate = new Date();

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

    var checkDate = new Date();
    checkDateYear = date.toString().substring(0, 4);
    checkDateMonth = parseInt(date.toString().substring(5, 7))-1;
    checkDateDay = date.toString().substring(8,10);

    checkDate.setFullYear(
      checkDateYear,
      checkDateMonth,
      checkDateDay);


    //error check on dates and time_start
    //time start must occur before time end

    if((time_start > time_end) || (checkDate < todayDate))
    {
      console.log('time isn\'t working fixy your date or time');
    } else {
      $.ajax({
        type: 'post',
        url: '/',
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
          event_type_id: event_type_id
        },
        success: (result) => {
          window.location = '/';
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  });

  //add event type func
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
        window.location = '/';
      },
      error: (error) => {
        console.log(error);
      }
    });
  });

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

  $(".option_selected").change(function(){
    $("#event_type_description_option").
    html($(".option_selected").val());
});
});
