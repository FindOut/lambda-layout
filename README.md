# Teknikträffen om AWS Lambda

Målet med denna teknikträff är att ni skall lära er lite om AWS Lambda genom att arbeta med ett problem relaterat till ett verkligt behov vi har i våra FindOut-projekt.

I flera av våra visualiserings-web-appar använder vi browser-baserade layout-bibliotek. Detta begränsar oss till bibliotek skrivna i javascript, och att web-läsaren orkar med att göra layouten.
Men det skulle gå att köra layoutjobbet i webbappens backend-server eller på en annan dator.
En av fördelarna med detta är att vi kan använda de bästa layout-biblioteken oavsett vilket programspråk de är skrivna i.

I denna övning skall ni testa att skapa en AWS Lambda som tar emot en beskrivning av grafens noder och relationer, gör layout och returnerar nodpositioner och relationsrutter.

## Javascript

Vi har skapat ett enkelt program som visar en graf och en knapp som anropar en lokal layout-funktion (som använder biblioteket viz.js).
Programmet har också en knapp som anropar en tom funktion som ni skall implementera med ett REST-anrop till en AWS-Lambda-funktion som ni också implementerar.
Java
Ni som kan java får gärna skapa en java-Lambda och använda t ex biblioteket xxx.

## Arbetsmaterial

Repot https://github.com/FindOut/lambda-layout inehåller fungerande kod att utgå ifrån.

Steg för steg:

    git clone git@github.com:FindOut/lambda-layout.git
    cd lambda-layout

### Javascript-klient

    cd js-client
    npm install
    npm start

* ett browser-fönster öppnas och visar efter ett tag en liten graf
* prova knappen *Local Layout* - grafen layouts i browsern
* prova knappen *Lambda Layout* - ett REST request simulerar anrop av en Lambda-funktion, men returnerar nu bara en graf-fil ifrån utvecklingsservern på din dator

### Lambda-funktion i javascript med beroenden

Javascript-kod körs i AWS-Lambda med node.js. Enkel kod som inte använder node-moduler kan skrivas direkt i AWS-Lambda-websidan.

Om man vill använda node-moduler, så installerar man dem på sin egen dator med npm install *modul*. Sen zippar man sin mapp och laddar upp den med en knapp på AWS-Lambda-websidan.
Där kan man sedan testa och även redigera sin kod tills den funkar.
Det är viktigt att zip-filen har node_modules och layout.js på toppnivån.

Mappen js-lambda innehåller skelett till kod för att laddas upp till AWS-Lambda. Den laddar också ned node-modulen vis.js.

Kör

    cd js-lambda
    npm install

Ni som har kommandot zip installerat kan zippa för uppladdning med kommandot

    npm run pack

Mer info om javascript i AWS Lambda: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html.

### Layout som AWS-Lambda-tjänst

Titta på koden i web-app-filen app/js/localLayout.js - Ändra inte denna fil, men inspireras av koden för att:

1. skriva om app/js/lambdaLayout.js så att den anropar en AWS Lambda med vår graf, och tar emot och renderar en layoutad version av denna
1. skapa en AWS Lambda som tar emot REST-anropet ovan, gör layout och returnerar resultatet

## Om viz.js

Detta är en maskinöversättning av C++-biblioteket Graphviz till Javascript. Indata är i DOT-format. Se info om detta och länkar till mer infor på http://viz-js.com/ där man kan testa viz.js interaktivt och hitta länkar till Graphviz-dokumentationen.
