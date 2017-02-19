$(document).on('ready', () => {
  console.log('connected to new event on main.js');
  $('#add_event_func').on('click', (eve)=> {
    console.log('click on event func');
    eve.preventDefault();

    var name = $('#event_name').val();
    console.log('the event type is: ', name);
    // const classname = $('.nameofclass option:selected').val();
    // const description = $('#description').val();
    // const instructorid = $('.instructorid option:selected').attr('data-instructorid');
    // const starttime = converttime($('#start_time').val());
    // const endtime = converttime($('#end_time').val());
    // const classsize = $('#size').val();
    // const classday = $('#classday').val();
    $.ajax({
      type: 'post',
      url: '/event_type',
      data: {
        event_name: name
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

    var event_type = $('#event_type_name').val();
    console.log('the event type is: ', event_type);

    $.ajax({
      type: 'post',
      url: '/event_type',
      data: {
        event_type: name
      },
      success: (result) => {
        window.location = '/';
      },
      error: (error) => {
        console.log(error);
      }
    });
  });
});
