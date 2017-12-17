var Script = (function (_module) {
    "use strict";    

    const $email = $("#email");
    const $name = $("#name");
    const $feedbackEmail = $("#feedback-email");
    const $feedbackName = $("#feedback-name");

    var Events = {
        Start: function (contexto) {
            this.SendForm(contexto);
            this.TouchInputs(contexto);
        },        
        SendForm: function(contexto) {
            contexto.on('click','#btn-apply', function(e){
                e.preventDefault();
                
                var _nameIsValid = nameIsValid($name.val());
                const _emailIsValid = emailIsValid($email.val());
                
                if(!_nameIsValid) {
                    $feedbackName.removeClass('d-none');
                }

                if(!_emailIsValid){
                    $feedbackEmail.removeClass('d-none');
                }

                if(_emailIsValid && _nameIsValid){
                    $.ajax({
                        method: 'POST',
                        url: 'http://avanade.gama.academy/api/process_applications',
                        dataType: 'json',
                        headers: { EMAIL: 'anderson.bernardo1@gmail.com' }, // coloque seu email que usou para se inscrever aqui!
                        contentType: 'application/json',
                        data: JSON.stringify({ process_application: { name: $name.val(), email: $email.val() } }),
                        success: function(json) { 
                            $("#apply-success").removeClass("d-none");
                            $(".modal").modal("hide");                            
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            $("#main-error").removeClass("d-none");
                            console.log(jqXHR);
                            console.log(textStatus);
                            console.log(errorThrown);                        }
                    });
                }else {
                    $("#apply-error").removeClass('d-none');
                }
            })
        },  
        TouchInputs: function(contexto) {
            contexto.on("keyup", "input.data", function(){
                $feedbackEmail.addClass("d-none");
                $feedbackName.addClass("d-none");
            })
        }
    }



    _module.Start = function (contexto) {
        Events.Start(contexto);
    };     

    function nameIsValid(name) {        
        return (name != undefined && name.length > 1);
    }

    function emailIsValid(email){       

        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;        
        
        return (email != '' && email != undefined && regex.test(email));       
    }

    function getFormData($form) {
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    }

    return _module;
}(Script || {}));
