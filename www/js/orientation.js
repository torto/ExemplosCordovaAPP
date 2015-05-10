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
        if (navigator.compass && navigator.notification) {
            app.receivedEvent('deviceready');
        } else {
            console.log('Por favor instale o plugin "Device-Orientation-Compass" e "Dialogs-Notification"')
        }
    },
    receivedEvent: function(id) {
        var getCurrent = document.getElementById('get-current');
        this.criarClick(getCurrent, function() {

            //-------------------------------
            //------- getCurrentHeading
            //-------------------------------
            function sucesso(valores) {
                //valores.x - valores.y - valores.x - valores.timestamp
                navigator.notification.alert("Valor Bússola: " + valores.magneticHeading, function(){}, "Bússola", 'Ok');

            };

            function erro() {
                alert('Erro!');
            };

            navigator.compass.getCurrentHeading(sucesso, erro);

        });

        //-------------------------------
        //------- watchHeading
        //-------------------------------

        var watch = document.getElementById('get-watch');
        var elementoWatch;
        this.criarClick(watch, function() {
            var x = document.querySelector('#x');
            
            function sucesso(valores) {
                x.innerHTML = valores.magneticHeading;
            };

            function erro() {
                alert('erro!');
            };

            var opicao = {
                frequency: 3000
            };

            elementoWatch = navigator.compass.watchHeading(sucesso, erro, opicao);
        });

        //-------------------------------
        //------- clearWatch
        //-------------------------------

        var watch = document.getElementById('get-watch-stop');
        this.criarClick(watch, function() {
            navigator.compass.clearWatch(elementoWatch);

            var x = document.querySelector('#x');
            
            x.innerHTML = '';
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