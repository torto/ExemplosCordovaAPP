var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    onDeviceReady: function() {
        /**
         * Evento para executar elementos do DOM.
         */
        if (navigator.notification) {
            app.receivedEvent('deviceready');
        }else {
            console.log('Por favor instale o plugin "Dialogs-Notification"')
        }

    },
    receivedEvent: function(id) {

        //-------------------------------
        //------- Alert
        //-------------------------------
        var alert = document.getElementById('alert');
        this.criarClick(alert, function() {

            navigator.notification.alert(
                'Sou um Alerta.', // message
                function() {
                    console.log('Alerta fechado');
                },
                'Dialog Alert', // title
                ['Ok'] // buttonLabels
            );
        });

        //-------------------------------
        //------- Confirm
        //-------------------------------
        var confirm = document.getElementById('confirm');
        this.criarClick(confirm, function() {

            navigator.notification.confirm(
                'Sou um confirm?', // message
                function(button) {
                    console.log('Confirm: ' + (button == 1 ? 'Sim' : 'Não'));
                },
                'Dialog Confirm', // title
                ['Sim', 'Não'] // buttonLabels
            );
        });

        //-------------------------------
        //------- Prompt
        //-------------------------------

        var prompt = document.getElementById('prompt');
        this.criarClick(prompt, function() {

            navigator.notification.prompt(
                'Qual seu nome?', // message
                function(retorno) {
                    if (retorno.buttonIndex == 1) {
                        console.log('Seu nome: ' + retorno.input1);
                    } else if (retorno.buttonIndex == 2) {
                        console.log('Cancelou.')
                    }
                },
                'Dialog Prompt', // title
                ['Ok', 'Cancel'], // buttonLabels
                'Texto Padrão'
            );
        });

        //-------------------------------
        //------- Beep
        //-------------------------------

        var beep = document.getElementById('beep');
        this.criarClick(beep, function() {
            navigator.notification.beep(2);
        });

    },
    criarClick: function(element, funcao) {
        element.addEventListener("click", function(e) {
            funcao(e);
            e.preventDefault();
        });
    }
};

app.initialize();