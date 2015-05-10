var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    onDeviceReady: function() {

        //-------------------------------
        //------- Status Bateria
        //-------------------------------

        /**
         * This event fires when the percentage of battery charge changes by at least 1 percent, or if the device is plugged in or unplugged.
         */
        window.addEventListener("batterystatus", batteryStatus.setBatteryStatus, false);

        /**
         *The event fires when the percentage of battery charge has reached the critical battery threshold. The value is device-specific.
         */
        window.addEventListener("batterycritical", function(info) {
            /*
             * info =   level: The percentage of battery charge (0-100). (Number)   isPlugged: A boolean that indicates whether the device is plugged in. (Boolean)
             */

            var radio = document.getElementById('battery-critical');
            radio.checked = true;
        }, false);

        /**
         * The event fires when the percentage of battery charge has reached the low battery threshold, device-specific value
         */
        window.addEventListener("batterylow", function(info) {
            /*
             * info =   level: The percentage of battery charge (0-100). (Number)   isPlugged: A boolean that indicates whether the device is plugged in. (Boolean)
             */
            var radio = document.getElementById('battery-low');
            radio.checked = true;
        }, false);

        //-------------------------------------------------------------------------------------------


        /**
         * Evento para executar elementos do DOM.
         */
        app.receivedEvent('deviceready');

    },
    receivedEvent: function(id) {

        //-------------------------------
        //------- Status Bateria
        //-------------------------------
        console.log(batteryStatus.getBatteryStatus());

    },
    criarClick: function(element, funcao) {
        element.addEventListener("click", function(e) {
            funcao(e);
            e.preventDefault();
        });
    }
};

var batteryStatus = (function() {
    var batteryStatusFinal;
    var level = document.querySelector('#level');
    var energia = document.querySelector('#energia');
    var setBatteryStatus = function(info) {
        batteryStatusFinal = info;
        level.innerHTML = info.level + '%';
        energia.innerHTML = (batteryStatus.getBatteryStatus().isPlugged ? 'Sim' : 'Não');

    };

    /**
     * Valor do Status da Bateria
     * @return {JSON} level: The percentage of battery charge (0-100). (Number) - isPlugged: A boolean that indicates whether the device is plugged in. (Boolean)
     */
    var getBatteryStatus = function() {
        return batteryStatusFinal;
    }


    return {
        setBatteryStatus: setBatteryStatus,
        getBatteryStatus: getBatteryStatus
    }


})();

app.initialize();