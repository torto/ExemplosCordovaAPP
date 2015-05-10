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
        if (navigator.device.capture && Media) {
            app.receivedEvent('deviceready');
        } else {
            console.log('Por favor instale o plugin "MediaCapture" e "Media"')
        }

    },
    receivedEvent: function(id) {

        //-------------------------------
        //------- captureAudio
        //-------------------------------
        var audio = document.getElementById('capture-audio');
        this.criarClick(audio, function() {
            app.onCaptureGeneric('audio');
        });

        //-------------------------------
        //------- captureImage
        //-------------------------------
        var image = document.getElementById('capture-image');
        this.criarClick(image, function() {
            app.onCaptureGeneric('image');
        });

        //-------------------------------
        //------- captureVideo
        //-------------------------------
        var video = document.getElementById('capture-video');
        this.criarClick(video, function() {
            app.onCaptureGeneric('video');
        });

        //-------------------------------
        //------- Media.play()
        //-------------------------------
        var mediaPlay;
        var play = document.getElementById('play-audio');
        this.criarClick(play, function() {
            if (app.getUltimoAudio !== '') {
                mediaPlay = new Media(app.getUltimoAudio.split('file:/mnt/sdcard/')[1],
                    // success callback
                    function() {
                        console.log("playAudio():Audio Sucesso");
                    },
                    // error callback
                    function(err) {
                        console.log("playAudio():Audio Erro: " + err.message);
                    }
                );
                mediaPlay.play();
            }
        });

        var stop = document.getElementById('stop-audio');
        this.criarClick(stop, function() {
            if (mediaPlay) {
                mediaPlay.stop();
            }
        });


    },
    onCaptureGeneric: function(valores) {
        // capture callback
        var sucesso = function(audio) {
            var i, path, len;
            for (i = 0, len = audio.length; i < len; i += 1) {
                path = audio[i].fullPath;
                if (valores === 'audio') {
                    app.getUltimoAudio = path;
                }
                navigator.notification.alert('Caminho ' + valores + ': ' + path, null, 'Captura ' + valores);
            }
        };

        var erro = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Erro na Captura');
        };

        if (valores === 'audio') {
            navigator.device.capture.captureAudio(sucesso, erro, {
                limit: 1
            });
        } else if (valores === 'image') {
            navigator.device.capture.captureImage(sucesso, erro, {
                limit: 1
            });
        } else if (valores === 'video') {
            navigator.device.capture.captureVideo(sucesso, erro, {
                limit: 1
            });
        }
    },
    getUltimoAudio: '',
    criarClick: function(element, funcao) {
        element.addEventListener("click", function(e) {
            funcao(e);
            e.preventDefault();
        });
    }
};

app.initialize();