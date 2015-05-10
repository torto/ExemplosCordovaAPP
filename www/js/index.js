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
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var vibrar = document.querySelector('#vibrar');
        this.criarClick(vibrar, function() {
            if (navigator.vibrate) {
                navigator.vibrate(3000);
            } else{
                console.log('Por favor instale o plugin "Vibrate"');
            }
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