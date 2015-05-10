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
        if (device.cordova && navigator.connection) {
            app.receivedEvent('deviceready');
        } else {
            console.log('Por favor instale o plugin "Device" e "network-information"');
        }

    },
    receivedEvent: function(id) {

        // device.cordova
        // device.model
        // device.platform
        // device.uuid
        // device.version
        var cordova = document.getElementById('cordova');
        var model = document.getElementById('model');
        var platform = document.getElementById('platform');
        var uuid = document.getElementById('uuid');
        var version = document.getElementById('version');

        this.inserirValor(cordova, 'cordova');
        this.inserirValor(model, 'model');
        this.inserirValor(platform, 'platform');
        this.inserirValor(uuid, 'uuid');
        this.inserirValor(version, 'version');

        var tipo = document.getElementById('tipo');
        this.inserirValor(tipo, null, this.checkConnection());

    },
    inserirValor: function(element, valor, valorFixo) {
        if (!valorFixo) {
            element.innerHTML = device[valor];
        } else {
            element.innerHTML = valorFixo;
        }
    },
    checkConnection: function() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        return states[networkState]
    },
    criarClick: function(element, funcao) {
        element.addEventListener("click", function(e) {
            funcao(e);
            e.preventDefault();
        });
    }
};

app.initialize();