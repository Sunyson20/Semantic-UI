$(document)
    .ready(function () {
        /** login form modal **/
        let $loginModal = $('.ui.tiny.modal');
        let $loginButton = $('#login-button');
        let $loginForm = $('#login-form');

        $loginModal
            .modal({
                // closable: false,
                inverted: true,
                onShow: function () {
                    console.info("Modal show");
                    $('#login-error-info').addClass('hidden');
                    var email = $loginForm.form('get value', 'email');
                    console.log('email:' + email);
                    $loginForm.form('reset');

                    $loginForm.form('set value', 'email', email);


                }
            })
            .modal('hide')
            .modal('attach events', '#login-main', 'show');

        $loginForm
            .form({
                fields: {
                    email: {
                        identifier: 'email',
                        rules: [{
                            type: 'email',
                            prompt: 'Please enter a valid e-mail'
                        }]
                    },
                    password: {
                        identifier: 'password',
                        rules: [{
                            type: 'minLength[3]',
                            prompt: 'Please enter a password'
                        }]
                    }
                },
                inline: true,
                on: 'change',
                onInvalid: function (element, errors) {
                    $loginButton.addClass('disabled');
                },
                onValid: function (element) {
                    if ($loginForm.form('is valid')) {
                        console.info('All fields are valid.');
                        $loginButton.removeClass('disabled');
                    }
                }
            });

        // $loginButton.click(function () {
        //     //not process login before ajax return
        //     console.info("click login button");
        //     //event.preventDefault();
        // });

        $loginForm.submit(function () {
            console.info("login submit");
            event.preventDefault(); //prevent default action 
            // var post_url = $(this).attr("action"); //get form action url
            // var request_method = $(this).attr("method"); //get form GET/POST method
            // var form_data = $(this).serialize(); //Encode form elements for submission

            // // get all the inputs into an array.
            let $inputs = $('#login-form :input');
            // // get an associative array of just the values.
            var data = {};
            $inputs.each(function () {
                data[this.name] = $(this).val();
            });

            if ($loginForm.form('is valid')) {
                ajax(data);
            }
            return false;
        });

        let ajax = function (data) {
            $loginButton.addClass('loading disabled');

            $.ajax({
                    url: "https://reqres.in/api/login",
                    type: "POST",
                    // data: data
                    data: {
                        email: "1@1",
                    }
                }).done(function (response) {
                    console.info(response);
                    $loginModal.modal('hide');

                }).fail(function (response) {
                    console.info(response);
                    console.info("status code:" + response.status);
                    rJSON = response.responseJSON;
                    loginError = [];
                    loginError.push(rJSON['error']);
                    if (loginError.length > 0) {
                        // remove all error info before display
                        $('#login-error-info-list li').remove();
                        for (const i of loginError) {
                            console.info(i);
                            var info = '<li>' + i + '</li>';
                            $('#login-error-info-list').append(info);
                        }
                        $('#login-error-info').removeClass('hidden');
                    }
                })
                .always(function () {
                    console.info("Always...")
                    $loginButton.removeClass('loading disabled');
                });
        };
    });