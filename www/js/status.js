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
        if (StatusBar) {
            app.receivedEvent('deviceready');
        }else {
            console.log('Por favor instale o plugin "StatusBar"')
        }

    },
    receivedEvent: function(id) {

        //-------------------------------
        //------- Show
        //-------------------------------
        var show = document.getElementById('show');
        this.criarClick(show, function() {

            StatusBar.show();
        });

         //-------------------------------
        //------- Hide
        //-------------------------------
        var hide = document.getElementById('hide');
        this.criarClick(hide, function() {

            StatusBar.hide();
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