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
        if (navigator.accelerometer && navigator.notification) {
            app.receivedEvent('deviceready');
        } else {
            console.log('Por favor instale o plugin "Accelerometer" e "Dialogs-Notification"')
        }
    },
    receivedEvent: function(id) {
        var getCurrent = document.getElementById('get-current');
        this.criarClick(getCurrent, function() {

            //-------------------------------
            //------- getCurrentAcceleration
            //-------------------------------
            function sucesso(valores) {
                //valores.x - valores.y - valores.x - valores.timestamp
                navigator.notification.alert("Valor X: " + valores.x + "\n Valor Y: " + valores.y + "\n Valor Z: " + valores.z + "\n Valor TimeStamp: " + valores.timestamp, function() {}, "Acelerometro", 'Ok');

            };

            function erro() {
                alert('Erro!');
            };

            navigator.accelerometer.getCurrentAcceleration(sucesso, erro);

        });

        //-------------------------------
        //------- watchAcceleration
        //-------------------------------

        var watch = document.getElementById('get-watch');
        var elementoWatch;
        this.criarClick(watch, function() {
            var x = document.querySelector('#x');
            var y = document.getElementById('y');
            var z = document.getElementById('z');

            var time = document.getElementById('time');

            function sucesso(valores) {
                x.innerHTML = valores.x;
                y.innerHTML = valores.y;
                z.innerHTML = valores.z;
                time.innerHTML = valores.timestamp;
            };

            function erro() {
                alert('erro!');
            };

            var opicao = {
                frequency: 3000
            };

            elementoWatch = navigator.accelerometer.watchAcceleration(sucesso, erro, opicao);
        });

        //-------------------------------
        //------- clearWatch
        //-------------------------------

        var watch = document.getElementById('get-watch-stop');
        this.criarClick(watch, function() {
            navigator.accelerometer.clearWatch(elementoWatch);

            var x = document.querySelector('#x');
            var y = document.getElementById('y');
            var z = document.getElementById('z');
            var time = document.getElementById('time');

            x.innerHTML = '';
            y.innerHTML = '';
            z.innerHTML = '';
            time.innerHTML = '';
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