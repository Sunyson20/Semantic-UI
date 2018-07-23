$(document).ready(function () {
  //TODO cross domain
  const uploadUrl = "http://localhost:3000/upload";

  $imageUploadForm = $('#image-upload-form');
  $imageUploadButton = $('#image-upload-button');

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
      console.info("Slider Always...")
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

        enableTouch: true,
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


  $("#style-slider").on('dblclick', 'li', function (e) {
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


  $imageUploadButton.on('click', function (event) {
    event.preventDefault();
    console.log('image upload');
    // no work for the next input file element
    $imageUploadButton.next('input:file').click();
    // $imageUploadButton.parent().click();
  });

  const maxFileSize = 1 * 1024 * 1024;
  $imageUploadButton.next('input:file').on('change', function (event) {
    event.preventDefault();
    console.log("file input clicked.");
    var name = event.target.files[0].name;
    var size = event.target.files[0].size;
    var file = event.target.files[0];
    console.log(name + ":" + size);
    if (size > maxFileSize) {
      console.info("ERROR", "File size overflow.");
      // TODO tip max size exceed
    } else {
      var formData = new FormData();
      formData.append('file', file);
      console.log('formData:',formData);
      $.ajax({
        xhr: function () {
          var progress = $('.progress'),
            xhr = $.ajaxSettings.xhr();

          progress.show();

          xhr.upload.onprogress = function (ev) {
            if (ev.lengthComputable) {
              var percentComplete = parseInt((ev.loaded / ev.total) * 100);
              progress.val(percentComplete);
              if (percentComplete === 100) {
                progress.hide().val(0);
              }
            }
          };

          return xhr;
        },
        url: uploadUrl,
        type: 'POST',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        crossDomain: true,
        success: function (data, status, xhr) {
          console.log('Upload seccess.', data);
          console.log('status.', status);
          console.log('xhr', xhr);
        },
        error: function (xhr, status, error) {
          console.log('Upload error.', xhr);
          
        }
      }).done(function(response){

      }).fail(function(response){

      });
    }
  });

});