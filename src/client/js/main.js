$(document).on('ready', () => {
  console.log('connected to new event on main.js');

  $('#add_event_func').on('click', (eve)=> {
    console.log('click on event func');
    eve.preventDefault();

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
  });

  //add event type func
  $('#add_event_type_func').on('click', (eve)=> {
    console.log('click on event func');
    eve.preventDefault();

    var event_type_name = $('#event_type_name').val();
    var event_type_description = $('#event_type_description').val();
    console.log('the event type is: ', event_type_name);

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

  //add event type func
  $('#day').on('click', (eve)=> {
    console.log('click on day func');
    eve.preventDefault();

    // $.ajax({
    //   type: 'post',
    //   url: '/event_types',
    //   data: {
    //     event_type_name: event_type_name,
    //     event_type_description: event_type_description
    //   },
    //   success: (result) => {
    //     window.location = '/';
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });
  });

  // $('#delete_event').on('click', (eve)=> {
  //   console.log('clicked on delete event func');
  //   eve.preventDefault();
  //
  //   var answer = 1;
  //
  //   console.log('this: ', $('#event_id').val());
  //
  //   var event_id = $(this).attr('data-id');
  //
  //   console.log('here is the event_id for this record: ', event_id);
  //
  //   // if (answer) {
  //   //
  //   //   $.ajax({
  //   //     type: 'DELETE',
  //   //     url: `/event/delete/${event_id}`
  //   //   })
  //   //   .done((data) => {
  //   //     window.location.href = '/';
  //   //   })
  //   //   .fail((err) => {
  //   //     console.log(err);
  //   //   });
  //   // }
  // });
});
