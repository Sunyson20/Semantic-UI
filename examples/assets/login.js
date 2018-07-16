$(document)
    .ready(function () {
        /** login form modal **/
        $('.ui.tiny.modal')
            .modal({
                // closable: false,
                inverted: true
            })
            .modal('hide')
            .modal('attach events', '#login-main', 'show');

        var login_process = false;
        $("#login").click(function () {
            if (!login_process) {
                $("#login-form").submit();
                $('#login').addClass('loading');
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

            // not sure if you wanted this, but I thought I'd add it.
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
                loginError = "err";
                if (loginError) {
                    $('#login-error').removeClass('hidden');
                }
            }).always(function () {
                console.info("Always...")
                login_process = false;
                $('#login').removeClass('loading');
            });

            return false;
        });
    });