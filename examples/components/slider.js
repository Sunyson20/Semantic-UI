$(document).ready(function () {

  // load all li elements befor initialize lightslider
  $.ajax({
      url: "https://reqres.in/api/unknown",
      type: "GET"
      // data: data
    }).done(function (response) {
      console.log(response.data);
      for (const it of response.data) {
        var ali = '<li><h3>' + it['name'] + '</h3></li>';
        $("#style-slider").append(ali);
      }
    }).fail(function (response) {
      console.log(response);
    })
    .always(function (response) {
      console.info("Always...")
      $("#style-slider").lightSlider({
        item: 4,
        autoWidth: false,
        slideMove: 1, // slidemove will be 1 if loop is true
        slideMargin: 10,

        addClass: '',
        mode: "slide",
        useCSS: true,
        cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
        easing: 'linear', //'for jquery animation',////

        speed: 200, //ms'
        auto: false,
        loop: true,
        slideEndAnimation: true,
        pause: 500,

        keyPress: true,
        controls: true,
        prevHtml: '',
        nextHtml: '',

        enableTouch: false,
        enableDrag: true,
        freeMove: true,
        swipeThreshold: 40,

        responsive: [{
            breakpoint: 960,
            settings: {
              item: 4,
              slideMove: 1
            }
          },
          {
            breakpoint: 640,
            settings: {
              item: 3,
              slideMove: 1
            }
          }
        ],
        
      });
    });


  $("#style-slider").on('click', 'li', function (e) {
    console.log(e);
    console.log($(this).text());
    $(this).parent().find('li').removeClass('selected');
    $(this).addClass('selected');
    // TODO: find the li text value equal this.text(), and set selected
    return false;
  });

  $('.card .dimmer')
    .dimmer({
      on: 'hover'
    });
});