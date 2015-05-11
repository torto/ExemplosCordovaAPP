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
        if (window.sqlitePlugin) {
            app.receivedEvent('deviceready');
        } else {
            console.log('Por favor instale o plugin "io.litehelpers.cordova.sqlite"');
        }
    },
    receivedEvent: function(id) {
        app.db = window.sqlitePlugin.openDatabase({
            name: "banco.db"
        });

        var insertPessoa = "INSERT INTO pessoas (nome, sobrenome, idade) VALUES (?,?,?);";
        var selectAllPessoas = "SELECT id, nome, sobrenome, idade FROM pessoas;";

        var criarTabela = document.getElementById('create-table');
        this.criarClick(criarTabela, function() {
            app.db.transaction(function(tx) {
                tx.executeSql('DROP TABLE IF EXISTS pessoas');
                tx.executeSql('CREATE TABLE IF NOT EXISTS pessoas (id integer primary key AUTOINCREMENT, nome text, sobrenome text, idade integer)');
                // demonstrate PRAGMA:
                app.db.executeSql("pragma table_info (pessoas)", [], function(res) {
                    document.getElementById('create').value = "PRAGMA res: " + JSON.stringify(res);
                });
            });
        });

        var inserirValores = document.getElementById('insert-into');
        this.criarClick(inserirValores, function() {
            app.db.transaction(function(tx) {

                tx.executeSql(insertPessoa, ["Guilherme random:" + Math.random(0, 9999), "Berghauser", (2015 - 1988)], function(tx, res) {
                    document.getElementById('insert').value = "INSERT res: " + JSON.stringify(res);
                });
            }, function(erro) {
                document.getElementById('insert').value = "ERRO: " + JSON.stringify(erro);
            });
        });

        var selecionarValores = document.getElementById('select-values');
        this.criarClick(selecionarValores, function() {
            app.db.transaction(function(tx) {

                tx.executeSql(selectAllPessoas, [], function(tx, res) {
                    var result = "SELECT res: " + JSON.stringify(res) + "\n";

                    var i = res.rows.length - 1;

                    for (i; i >= 0; i--) {
                        result += JSON.stringify(res.rows.item(i)) + "\n";
                    }
                    document.getElementById('select').value = result;
                });
            }, function(erro) {
                document.getElementById('select').value = "ERRO: " + JSON.stringify(erro);
            });
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