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
        if (FileTransfer && navigator.notification) {
            app.receivedEvent('deviceready');
        } else {
            console.log('Por favor instale o plugin "FileTransfer" e "Dialogs-Notification"')
        }
    },
    receivedEvent: function(id) {
        var download = document.querySelector('#download');
        this.criarClick(download, function() {
            var fileTransfer = new FileTransfer();
            var uri = encodeURI("http://www.corvetteblogger.com/images/content/072006_1.jpg");
            var fileURL = cordova.file.applicationStorageDirectory+"www/img/corvette.jpg";


            fileTransfer.download(
                uri,
                fileURL,
                function(entry) {
                    navigator.notification.alert("download complete: " + entry.toURL());
                    var img = document.querySelector('#img-resultado');
                    img.src = entry.toURL();
                },
                function(error) {
                    console.log("download error source " + error.source);
                    console.log("download error target " + error.target);
                    console.log("upload error code" + error.code);
                },
                false, {}

            );

        });

        // var download = document.querySelector('#download');
        // this.criarClick(download, function() {
        //     var win = function(r) {
        //         console.log("Code = " + r.responseCode);
        //         console.log("Response = " + r.response);
        //         console.log("Sent = " + r.bytesSent);
        //     }

        //     var fail = function(error) {
        //         alert("An error has occurred: Code = " + error.code);
        //         console.log("upload error source " + error.source);
        //         console.log("upload error target " + error.target);
        //     }

        //     fileURL = DirectoryEntry.toURL() + '/download_complet.html';

        //     var options = new FileUploadOptions();
        //     options.fileKey = "file";
        //     options.fileName = 'download_complet.html';
        //     options.mimeType = "text/plain";

        //     var params = {};
        //     // params.value1 = "test";
        //     // params.value2 = "param";

        //     options.params = params;

        //     var ft = new FileTransfer();
        //     ft.upload(fileURL, encodeURI("partial/download.html"), win, fail, options);

        // });



    },
    criarClick: function(element, funcao) {
        element.addEventListener("click", function(e) {
            funcao(e);
            e.preventDefault();
        });
    }
};

app.initialize();