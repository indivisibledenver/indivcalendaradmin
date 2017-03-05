(function () {
  let rating = '';
  $(document).on('click', '.star', function (e) {
    e.preventDefault();
    rating = $(this).attr('data-star');
    const starReplace = staticStar(rating);
  });

  $('[name="review_form"]').on('submit', function(e) {
    e.preventDefault();
    const user_rating = rating;
    const user_review = $('textarea#input_review').val();
    const user_id = $('#input_id').val();

    $.ajax({
      type: 'POST',
      url: user_id,
      data: {
        rating: user_rating,
        review: user_review
      },
      success:function (data) {
        window.location = data.redirect;
      }
    });
  });
})();

function staticStar(rating) {
  for (let i = 0; i < 5; i++) {
    if ($(`[for=star_${i + 1}]`).hasClass('fa-star-o')) {
      if (i < rating) {
        $(`[for=star_${i + 1}]`).removeClass('fa-star-o').addClass('fa-star');
      }
    } else {
      if (i + 1 > rating) {
        $(`[for=star_${i + 1}]`).removeClass('fa-star').addClass('fa-star-o');
      }
    }
  }
}
