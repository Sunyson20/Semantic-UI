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

        speed: 400, //ms'
        auto: false,
        loop: true,
        slideEndAnimation: true,
        pause: 2000,

        keyPress: false,
        controls: true,
        prevHtml: '',
        nextHtml: '',

        rtl: false,
        adaptiveHeight: false,

        vertical: false,
        verticalHeight: 500,
        vThumbWidth: 100,

        thumbItem: 10,
        pager: true,
        gallery: false,
        galleryMargin: 5,
        thumbMargin: 5,
        currentPagerPosition: 'middle',

        enableTouch: true,
        enableDrag: true,
        freeMove: true,
        swipeThreshold: 40,

        responsive: [],

        onBeforeStart: function (el) {},
        onSliderLoad: function (el) {},
        onBeforeSlide: function (el) {},
        onAfterSlide: function (el) {},
        onBeforeNextSlide: function (el) {},
        onBeforePrevSlide: function (el) {}
      });
    });

  $("#style-slider").on('click', 'li', function () {
    console.log($(this).text());
    $(this).parent().find('li').removeClass('selected');
    $(this).addClass('selected');
  });

  $('.card .dimmer')
  .dimmer({
    on: 'hover'
  })
;
});