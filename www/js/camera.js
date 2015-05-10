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
        if (navigator.camera && navigator.notification) {
            app.receivedEvent('deviceready');
        }else {
            console.log('Por favor instale o plugin "Dialogs-Notification" e "Camera"')
        }
    },
    receivedEvent: function(id) {

        //-------------------------------
        //------- getPicture - DATA
        //-------------------------------
        var data = document.getElementById('get-picture-data');
        this.criarClick(data, function() {
            navigator.camera.getPicture(sucesso, erro, {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
            });

            function sucesso(imageData) {
                var image = document.getElementById('imagem');
                image.src = "data:image/jpeg;base64," + imageData;
            }

            function erro(erro) {
                alert('Erro: ' + erro);
            }

        });


        //-------------------------------
        //------- getPicture - FILE
        //-------------------------------
        var data = document.getElementById('get-picture-file');
        this.criarClick(data, function() {
            navigator.camera.getPicture(sucesso, erro, {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI
            });

            function sucesso(imageData) {
                var image = document.getElementById('imagem');
                navigator.notification.alert('Caminho da imagem: ' + imageData, function() {}, 'Imagem FILE', 'Ok');
                image.src = imageData;
            }

            function erro(erro) {
                alert('Erro: ' + erro);
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