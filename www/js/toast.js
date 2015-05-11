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
        if (navigator.toast) {
            app.receivedEvent('deviceready');
        } else {
            console.log('Por favor instale o plugin "io.github.tortoyoyo.toast"')
        }
    },
    receivedEvent: function(id) {

        //-------------------------------
        //------- criarToast
        //-------------------------------
        var toast = document.getElementById('criar-toast');
        this.criarClick(toast, function() {

            function sucesso(resposta) {
                console.log('Sucesso: '+ resposta);
            };

            function erro(erro) {
                //console.log(erro);
                alert(erro);
            };

             navigator.toast.criarToast('FirefoxOS - Titulo/Android -Mensagem', sucesso, erro, {
                body: 'FirefoxOS - Mensagem',
                icon: 'http://localhost/img/logo.png',
                duration: 1
            });

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