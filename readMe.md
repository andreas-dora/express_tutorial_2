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

```html
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
---

# Eine Vorlage in Pug bauen 
Viele Informationen wiederholen sich auf jeder Seite. 
Um Unssere Webseite etwas leichter zu machen. Bauen wir uns eine Vorlage, die für alle weiteren Seiten diese Informationen Bereit hällt.
Dafür erstellen wir eine Datei mit dem Namen layout.pug im views Ordner.

Deren Inhalt sieht dann ungefähr so aus.
```html
doctype html
html
  head
    titel Geschichtensammlung
  body
    block content
    br
    hr
    footer
      p &copy; Andreas B
```
Die Folgenden Seiten können sich dann alles was auf dieser Seite schon niedergeschrieben wurde ersparen.

Um vor der Instalation einer Datenbank schon mal zu zeigen wie wunderbar dynamisch so eine Seite gefüllt wird, bauen wir in unsre index.js Datei mal ein kleines Array ein:

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
  let articles =[
    {
      id: 1,
      titel: 'Geschichte eins',
      author: 'Andy Ding',
      body: 'Hier steht der Anfang der Geschichte'
    },
    {
      id:2,
      titel: 'Zweites Kapitel',
      author: 'Bing Bong',
      body: 'Hier steht der Hauptteil der Geschichte'
    },
    {
      id:3,
      titel: 'Drittes Kapitel',
      author: 'Andy Ding',
      body: 'Hier steht das Ende der Geschichte'
    }
  ];

  res.render('index', {
    titel: 'Articles',
    articles: articles
  });
});

// Add Route
app.get('/articles/add', function(req,res){
  res.render('add_article', {
    titel: 'Add Article'
  });
});

// Start Server
app.listen(3000, function(){
  console.log('The Machine listens');
})
```
---
# MongoDb installieren
Quelle: [MongoDB Crash Course](https://www.youtube.com/watch?v=-56x56UppqQ) von Travesy Media 2019

Hier soll man im ersten Schritt [Homebrew](https://brew.sh/index_de) instalieren. 

Dafür folgendes Komando in das Terminal eingeben: 

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

Auf der [MongoDB Homepage](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) sucht man sich nun die aktuelle Version die folgenden zwei
Befehle heraus um MonoDB als Service zu installieren.

`brew tap mongodb/brew`

`brew install mongodb-community@4.2`

`brew services start mongodb-community`

Im nächsten Schritt laden wir uns eine grafische Benutzeroberfläche für MongoDB: [MongoDB Compass](https://www.mongodb.com/download-center/compass)

# Mongo starten

nun können wir die Datenbak mit dem Befehl `mongo` aus der CommandLine starten. (Homebrew istalliert Compass nicht mit.)

Es erschein ein Eingabefenster, in dem wir erstmal alles so lassen können wie es ist.

Host: localhost
Port: 27017 

Man klickt nur unten auf "Connect"

Nun sehen wir drei Datenbanken:
- admin
- config
- local
  
Die lassen wir aber voerst in Ruhe und erstellen uns eine neue Datenbank. 
Die nennen wir mal Test
und die Collection nennen wir "Location"

klicken wir uns da mal rein.
Und klicken auf "Insert Document" 

Und erstellen eine Unter-Collection
die id lassen wir in Ruhe und geben in der nächsten Zeile folgendes ein:

***name: "Location Name"***


Nun wollen wir aber zunächst sehen was mit der Command Line Machen können.

---
# MongoDB Command Line

MongoDB starten:

`mongo`

Die vorhandenen Datenbanken anzeigen:

`show dbs`

In eine bestimmte Datenbank wechslen:

`use db_Name`

Die Collections in einer DB anzeigen: 

`show collections`

um sich anzeigen zu lassen in welcher Datenbank man gerde ist benutzt man den Befehel:

`db`

Um eine Datenbank zu löschen, muss man mit `use db_name` 
die Datenbannk anwählen.
und den Befehl:

`db.dropDatabase()`

eingeben. 
Daraif erhält man etwa folgende Bestätigung

`{ "dropped" : "Test1", "ok" : 1 }`

Um eine neue Datenbank zu erzeugen benutzt man wieder den Befehl `use` mit dem Namen der neuen Datenbank.

`use myLocations`

Die Datenbank wird mit `show dbs`aber noch nicht angezeigt. 
Eine neue Datenbank fängt erst dann an wirklich zu existieren, wenn sie mindestens eine Collection enthält.

So erzeugen wir eine Collection:

wir vergewissern uns, dass wir in der richtigen Datenbank sind mit `db`

und geben dann folgenden Befehl ein:

`db.createCollection('location')`

Als Bestätigung sollte `{ "ok" : 1 }` erscheinen.

`show collections`

sollte nun unsere neue Collection zeigen.

---
# Die Datenbank aus der Comand-Line füttern

Wir haben uns mit `use myLocations` eine Datenbank mit dem Namen "myLlocations" erzeugt und und mit `db.createCollection('location')` eine erste Collection eingefügt.

```
db.location.insert({
  name: 'Test Weiher',
  gemeinde: 'Teststadt am Main',
  category: 'Kiesgrube',
  tags: ['geprüft', 'super'],
  user: {
    name: 'Andy',
    status: 'author'
  },
  date: Date()
})
```
Der Wert `Date()` fügt das aktuelle Datum ein. Die Eingabe kann Arrays und Objects enthalten.
Es handelt sich dabei um eine Art erweiterte JSON. Man muss also sehr gut auf die Verteilung der Kommata achten.

Als Bestätigung der Eingabe gint die Command-Line folgendes zurück:

`WriteResult({ "nInserted" : 1 })`

Also schicken wir gleich noch eine Eingabe hinterher:

```
db.location.insert({
  name: 'Super See',
  gemeinde: 'Superseestadt am Hang',
  category: 'Super See',
  tags: ['geprüft', 'super'],
  user: {
    name: 'Andy',
    status: 'author'
  },
  date: Date()
})
```

Auch für die zweite Eingabe bekommen wir wieder `WriteResult({ "nInserted" : 1 })` zurück.

Mit `mit db.location.insertMany([` können 
wir auch ein ganzes Arry übetragen.

```
db.location.insertMany([
  {
  name: 'See 3',
  gemeinde: 'Dreiseeheim',
  category: 'Super See',
  tags: ['geprüft', 'super'],
  user: {
    name: 'Andy',
    status: 'author'
  },
  date: Date()
},
{
  name: 'Viertel Weiher',
  gemeinde: 'Superseestadt am Hang',
  category: 'Viertelstadt am Viertelbach',
  tags: ['geprüft', 'super'],
  user: {
    name: 'Andy',
    status: 'author'
  },
  date: Date()
}
])

```
Nun bekommen wir von der Command-Line auch ein Array zurück:

```
{
	"acknowledged" : true,
	"insertedIds" : [
		ObjectId("5de70307f6d02e6c5c546fd7"),
		ObjectId("5de70307f6d02e6c5c546fd8")
	]
}
```

Im Gegensatz zu Relational Databases wie mySQL, muss ein neuer Eintrag nicht alle Informationen enthalten, die vorangegangene Einträge hatten.

Einträge auflisten:

`db.location.find()`

Leichter leesbar wirds aber mit:

`db.location.find().pretty()`

Wir können suchen nach

`db.location.find({category: 'Super See'})`

bzw

`db.location.find({category: 'Super See'}).pretty()`


Sortieren:

`db.location.find().sort({name:1}).pretty()`

***1*** ist sortiert aufsteigen ***-1*** sortiert absteigend.

Einträge zählen `.coun()`

`db.location.find({category: 'Super See'}).count()
`

---
# For Each
kann schon eingebaut werden

`db.location.find().forEach(function(doc){print('Blog Post:' + doc.name)})`

gibt folgedes zurück:

```
Blog Post:Test Weiher
Blog Post:Super See
Blog Post:See 3
Blog Post:Viertel Weiher
```

---
# Update

Mit der Update-Funktion sollte man forsichtig umgehen und am besten immer die Id eines Eintargs benutzen.

Will mann einzelne Punkte updaten sollte `$set:` benutzt werden:

```
db.location.update({name: 'Test Weiher'},
  {
    set: {
      gemeinde: 'Teststadt an der Teste'
    }
  }
)
```
***ACHTUNG! so löscht man einem Eintrag alle Informationen, die nicht im Update auftauchen***

```
db.location.update({name: 'Test Weiher'},
  {
    name: 'Test Weiher',
    gemeinde: 'Teststadt an der Teste',
    },
  )
  ```

***ACHTUNG! so löscht man einem Eintrag alle Informationen, die nicht im Update auftauchen***

```
db.location.update({name: 'Test Weiher'},
  {
    name: 'Test Weiher',
    gemeinde: 'Teststadt an der Teste',
    },
    {
    upsert: true
    }
  )
  ```

  Falls eine entsprechender Eintrag in der Datenbank nicht gefunden wird, führt  `upsert` dazu das er erzeugt wird.

---

## Werte  erhöhen

`db.locations.update({name: 'nameDesEintrags'},{$inc: likes: 1}})`

---

## Ein Feld umbenennen :

`db.locations.update({name: 'nameDesEintrags'},{$rename: likes: 'views'}})`

---

## Einen Eintrag löschen:

`db.location.remove({name: 'See 3'})`

wir bekommen folgendes zurück:

`WriteResult({ "nRemoved" : 1 })`

---
