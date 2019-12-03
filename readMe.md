# Alle Dependencies auf eienm Blick

`npm init`
express
`npm install --save pug`

---
# Into Express Again Step 1
### Mein zweite Gehversuch auf dem Express-Server. 
Aufgaben: Grundlegen Funktionen notieren und erlernen.
app.get ist für die Öffentlichkeit verantwortlich.
Es ist die Funktion die Seiten zur Verfügung stellt und rendert.
```javascript
app.get('/', function (req, res) {
  res.send('Hello World!')
})
```
Hier noch ein paar nützliche Grundlagen vomn der Express Homepage:
Respond to POST request on the root route (/),
```javascript
 the application’s home page:
app.post('/', function (req, res) {
  res.send('Got a POST request')
})
```
Respond to a ***PUT request*** to the /user route:

```javascript
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})
```
Respond to a ***DELETE request*** to the ***/user route:**
```javascript
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})
```
## Serving static files in Express
To serve static files such as images, CSS files, and JavaScript files, use the express.static ***built-in middleware*** function in Express.
For example, use the following code to serve images, CSS files, and JavaScript files in a directory named public:
```javascript
app.use(express.static('public'))
```

## Handle 404 responses
```javascript
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})
```
## So Schreibt man einenError Handler

```javascript
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```
## How do I render plain HTML?
You don’t! There’s no need to “render” HTML with the res.render() function. If you have a specific file, use the res.sendFile() function. If you are serving many assets from a directory, use the express.static() middleware function.

Mehr gibts auf der Express Webseite
---
## Auf die Plätze Server los

Mit sechs Zeilem Code bringen wir nicht nur den Express-Server zum laufen, wir haben uns sogar schon ein Feedback eingebaut.

```javascript
const express = require('express');

// Path ist ein Core Modul
const path = require('path');

// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function(req,res){
  res.send('Hello');
});

// Start Server
app.listen(3000, function(){
  console.log('The Machine listens');
})
```
----

# Creating Templates

Die Kiste läuft. Zeit sich eine Webseite zu bauen. Wir benutzen heute die Pug Template Engine. 
Pug hieß früher Jade udn war recht populär. Anstelle von HTML-Tags benutzt Identationen. Mal shcaune was das bedeutet.

`npm install --save pug`


```javascript
// Path ist ein Core Modul das beim Verknüfen der Dateipfade hilft
const path = require('path');

//  Die View-Enine laden,  mit dem Ordner Views (Dort kommen unsere Webseiten rein) und dem pug Modul verknüfen. )
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); 
```
---

unser Home-Route soll jetzt nicht mehr schöne Welt Frasen senden, sodern pug-Dateine rendern.

```javascript
app.get('/', function(req,res){
  res.redirect('index');
});
```
Alle "HTML"-Damit Dateien richtig gerendert weren können brauchen sie eine .pug Endung.

---
# Pug-Dateine erstellen
Wie bereits erwähnt verzichtet Pug anstelle von Tags Indentations,  also einrücken.

```
doctype html
html
  head
    titel So etwas Dummes
    body
      h1 Das macht keinen Spaß
      article
      p Das macht keinen Spaß  

```

Vielleicht kann diese Schreibweise ja Hacker abschrecken, aber sie ist auch sehr Fehleranfällig. Man kann zum Einrücken entweder Tabulatoren oder Leerzeichen benutzen, aber auf keien Fall Beides. 

Templates werden in der Regel nicht per Hand befüllt sondern automatisch von einm Serverprogamm
```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Hier steht doch eh immer das selbe drin">
  <meta name="keywords" content="wem, fällt da auch was neues ein">
  <meta name="author" content="Andreas Breitwieser">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="style.css">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```
