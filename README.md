# Exemplos Cordova App

Aplicativo com todos os plugins orificias do **Cordova**.

## Versão do Cordova

Foi desenvolvido e testado com o **Cordova 4.0.0**

## Instalar

### Pré-requisito

 - Nodejs
 - Sdks das plataformas
 - Apache Ant

Não esqueçam de colocar no PATH as pastas dos sdks e Apache Ant. [Confira a documentação](http://cordova.apache.org/docs/en/4.0.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide)

### Configurando o projeto

* Download do Cordova

> $ sudo npm install -g cordova

* Criando o projeto

> $ cordova create examples br.com.torto.cordova CordovaPlugins
> $ cd examples

* Instalando Plataformas

> $ cordova platform add android
> $ cordova platform add firefoxos

* Instalando Plugins

> $ cordova plugin add org.apache.cordova.battery-status

> $ cordova plugin add org.apache.cordova.camera

> $ cordova plugin add org.apache.cordova.contacts 

> $ cordova plugin add org.apache.cordova.device 

> $ cordova plugin add org.apache.cordova.console 

> $ cordova plugin add org.apache.cordova.device-motion

> $ cordova plugin add org.apache.cordova.device-orientation 

> $ cordova plugin add org.apache.cordova.dialogs 

> $ cordova plugin add org.apache.cordova.file

> $ cordova plugin add org.apache.cordova.file-transfer 

> $ cordova plugin add org.apache.cordova.geolocation 

> $ cordova plugin add org.apache.cordova.globalization 

> $ cordova plugin add org.apache.cordova.media 

> $ cordova plugin add org.apache.cordova.media-capture

> $ cordova plugin add org.apache.cordova.network-information

> $ cordova plugin add org.apache.cordova.splashscreen 

> $ cordova plugin add org.apache.cordova.vibration 

> $ cordova plugin add org.apache.cordova.statusbar

> $ cordova plugin add io.litehelpers.cordova.sqlite

> $ cordova plugin add io.github.tortoyoyo.toast

* Inserindo os arquivos

Baixe todos os arquivos do repositorio e insira na pasta que acabou de criar com o cordova, no nosso exemplo se chama **examples**.

* Rodando no Android

> $ cordova run android

* Criando o build para Firefoxos

> $ cordova build firefox


## Android

### Versão

Testado em um device com versão 4.0.1.

### Compatibilidade

Conferir na [documentação](http://cordova.apache.org/docs/en/4.0.0/) oficial do Cordova quais os métodos que rodam no Android.

### Obs

Os métodos do StatusBar rodam com Android 5+, o qual eu não possuo e fiquei com **preguiça** de criar um emulador para testar. 

## FirefoxOS

### Versão

Testado com FirefoxOS Flame.

### Compatibilidade

Conferir na [documentação](http://cordova.apache.org/docs/en/4.0.0/) oficial do Cordova quais os métodos que rodam no FirefoxOS. 

## IOS

Não tenho MAC e meu pc não tem suporte para virtualização o qual fica impraticavél criar uma VM para isso!