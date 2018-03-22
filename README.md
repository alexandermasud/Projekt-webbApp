# WebbApp

## Krav:

* [Node.js](https://nodejs.org/en/)
* [Angular CLI](https://cli.angular.io)

### Installation:
* Ladda ner och installera [Node.js](https://nodejs.org/en/) från nodejs.org
* Öppna konsolen och skriv "npm install -g @angular/cli" för att installera Angular CLI


### Installation av applikation:
* __Navigera till root__

* "npm install"


### Start av applikation:
* __Navigera till root__

* "ng serve"


## DEV:

### Skapa en applikation:   
* __Navigera till mappen som root ska ligga i__

* "ng new ***namn på applikationen***"
* "cd ***namn på applikationen***"
* "npm install"
* "ng serve"


### Skapa en huvudkomponent:
* __Navigera till root__

* ng generate component ***namn på komponentenhuvud***


### Skapa en subkomponent:
* __Navigera till root__

* ng generate component ***namn på huvudkomponenten***/***namn på subkomponenten***

### Bygga en applikation:
* __Navigera till root__

* ng build --prod

#### Ifall det inte funkar testa

* ng build --prod -bh ./
