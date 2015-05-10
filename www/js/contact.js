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
        if (navigator.contacts && navigator.notification) {
            app.receivedEvent('deviceready');
        } else {
            console.log('Por favor instale o plugin "Contacts" e "Dialogs-Notification"')
        }
    },
    receivedEvent: function(id) {
        var getCurrent = document.getElementById('add-contact');
        this.criarClick(getCurrent, function() {
            function sucesso(contato) {
                navigator.notification.alert("Contato " + contato.displayName + ' salvo com sucesso!');
            };

            function erro(erro) {
                navigator.notification.alert("COD. Erro = " + erro.code);
            };

            // create a new contact object
            var contatoTorto = navigator.contacts.create();
            contatoTorto.displayName = "Guilherme Berghauser";
            contatoTorto.nickname = "Torto"; // specify both to support all devices

            // Complemento de nome
            var tortoComplementos = new ContactName();
            name.givenName = "Guilherme";
            name.middleName = "Costa";
            name.familyName = "Berghauser";
            contatoTorto.name = name;
            contatoTorto.displayName = 'Guilherme';

            //Complemento de telefones
            var numerosTelefone = [];
            numerosTelefone[0] = new ContactField('celular', '+554699168533', true /*numero principal*/ );
            // numerosTelefone[1] = new ContactField('casa', '+554655555555', false);
            contatoTorto.phoneNumbers = numerosTelefone;

            //Complemento de enderecos
            var enderecos = [];
            //endereco torto casa
            enderecos[0] = {};
            enderecos[0].pref = true;
            enderecos[0].type = 'casa';
            enderecos[0].streetAddress = 'Rua tal tal tal';
            enderecos[0].locality = 'Pato Branco';
            enderecos[0].region = 'Paraná';
            enderecos[0].country = 'Brasil';
            //inserindo os enderecos
            contatoTorto.addresses = enderecos;

            // salvar no aparelho
            contatoTorto.save(sucesso, erro);
        });

        var getTorto = document.querySelector('#get-contact');
        this.criarClick(getTorto, function() {
            function sucesso(contato) {
                for (var i = 0; i < contato.length; i++) {
                    navigator.notification.alert("Formatado: " + contato[i].name.formatted + "\n" +
                        "Sobrenome: " + contato[i].name.familyName + "\n" +
                        "Nome: " + contato[i].name.givenName + "\n" +
                        "Nome do meio: " + contato[i].name.middleName + "\n" +
                        "Suffix: " + contato[i].name.honorificSuffix + "\n" +
                        "Prefix: " + contato[i].name.honorificSuffix, function(){}, 'Contato encontrado', 'Ok');
                }
            };

            function erro(contatoErro) {
                navigator.notification.alert('Erro!',function(){}, 'Erro Busca Contato', 'Ok');
            };

            var opcao = new ContactFindOptions();
            opcao.filter = "Torto";
            opcao.multiple = true;
            // options.desiredFields = [navigator.contacts.fieldType.id];
            field = [navigator.contacts.fieldType.nickname];
            navigator.contacts.find(field, sucesso, erro, opcao);
        });

        var pick = document.querySelector('#pick-contact'); 
        this.criarClick(pick, function() {
            navigator.contacts.pickContact(function(contact) {
                navigator.notification.alert('The following contact has been selected:' + JSON.stringify(contact),function(){}, 'Contato Selecionado', 'Ok');
            }, function(err) {
               navigator.notification.alert('Error: ' + err,function(){}, 'Erro Busca Contato', 'Ok');
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