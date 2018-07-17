$(document)
    .ready(function () {
        /** login form modal **/
        $('.ui.tiny.modal')
            .modal({
                // closable: false,
                inverted: true,
                onShow: function(){
                    console.info("Modal show");
                    $('#login-error-info').addClass('hidden');
                }
            })
            .modal('hide')
            .modal('attach events', '#login-main', 'show');

        var login_process = false;
        $("#login-button").click(function () {
            //not process login before ajax return
            if (!login_process) {
                $("#login-form").submit();
                $('#login-button').addClass('loading');
            }
        });

        $('#login-form').submit(function () {
            login_process = true;
            event.preventDefault(); //prevent default action 
            var post_url = $(this).attr("action"); //get form action url
            var request_method = $(this).attr("method"); //get form GET/POST method
            var form_data = $(this).serialize(); //Encode form elements for submission

            // get all the inputs into an array.
            var $inputs = $('#login-form :input');

            // get an associative array of just the values.
            var values = {};
            $inputs.each(function () {
                values[this.name] = $(this).val();
            });

            $.ajax({
                // url: post_url,
                // type: request_method,
                // data: form_data
            }).done(function (response) {
                alert("sss");
                console.info('Login done.');
                loginError = [];
                loginError.push("Error info");
                loginError.push("Error info");
                if (loginError.length > 0) {
                    // remove all error info before display
                    $('#login-error-info-list li').remove();
                    for (const i of loginError){
                        console.info(i);
                        var info = '<li>' + i + '</li>';
                        $('#login-error-info-list').append(info);
                    }
                    $('#login-error-info').removeClass('hidden');
                }
            }).always(function () {
                console.info("Always...")
                login_process = false;
                $('#login-button').removeClass('loading');
            });

            return false;
        });
    });