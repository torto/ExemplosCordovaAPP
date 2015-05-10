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
        if (navigator.geolocation && navigator.notification) {
            app.receivedEvent('deviceready');
        } else {
            console.log('Por favor instale o plugin "Geolocation" e "Dialogs-Notification"')
        }
    },
    receivedEvent: function(id) {
        var getCurrent = document.getElementById('get-current');
        this.criarClick(getCurrent, function() {

            //-------------------------------
            //------- getCurrentAcceleration
            //-------------------------------
            function sucesso(position) {
                //valores.x - valores.y - valores.x - valores.timestamp
                navigator.notification.alert('Latitude: ' + position.coords.latitude + '\n' +
                    'Longitude: ' + position.coords.longitude + '\n' +
                    'Altitude: ' + position.coords.altitude + '\n' +
                    'Exatidão: ' + position.coords.accuracy + '\n' +
                    'Altitude Exatidão: ' + position.coords.altitudeAccuracy + '\n' +
                    'Heading: ' + position.coords.heading + '\n' +
                    'Velocidade: ' + position.coords.speed + '\n' +
                    'Timestamp: ' + position.timestamp + '\n', function() {}, "Posição", 'Ok');

            };

            function erro(error) {
                navigator.notification.alert('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n', function() {}, "Posição", 'Ok');
            };
            navigator.geolocation.getCurrentPosition(sucesso, erro, {
                enableHighAccuracy: true
            });

        });

        //-------------------------------
        //------- watchAcceleration
        //-------------------------------

        var watch = document.getElementById('get-watch');
        var elementoWatch;
        this.criarClick(watch, function() {
            var x = document.querySelector('#x');
            var y = document.getElementById('y');


            function sucesso(valores) {
                // 'Latitude: ' + valores.coords.latitude + '\n' +
                //     'Longitude: ' + valores.coords.longitude + '\n' +
                x.innerHTML = valores.coords.latitude;
                y.innerHTML = valores.coords.longitude;

            };

            function erro(error) {
                console.log('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
            };

            var opicao = {
                timeout: 30000,
                enableHighAccuracy: true
            };


            elementoWatch = navigator.geolocation.watchPosition(sucesso, erro, opicao);
        });

        //-------------------------------
        //------- clearWatch
        //-------------------------------

        var watch = document.getElementById('get-watch-stop');
        this.criarClick(watch, function() {
            navigator.geolocation.clearWatch(elementoWatch);

            var x = document.querySelector('#x');
            var y = document.getElementById('y');


            x.innerHTML = '';
            y.innerHTML = '';

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