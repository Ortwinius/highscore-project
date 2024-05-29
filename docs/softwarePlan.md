# STRUKTUR DER SOFTWARE
Allgemeine Strukturierung des Projekts und verwendete Technologien:
## Frontend
-> Angular, HTML, SCSS, TypeScript
Formulare, Dashboard, Benutzerprofil
## Backend
-> Node.js, Express.js
REST-API mit Endpoints zur Verwaltung von Usern und Highscores
## Datenbank
-> MongoDB
Zum Speichern und Abrufen von User und Highscore Datenbeständen


# VARIABLEN
Verwendete Variablen für User und Highscore Datenoperationen:
## User
id, username, email, password (hashed for security reasons), company, address (street, zipcode, city)
## Highscore
userId, score


# RESSOURCEN
Verwendete Ressourcen für korrespondierenden Teilbereich der Software:
## Frontend
-> HTML, SCSS, TS Dateien für Benutzeroberfläche
-> HTTP-Client für HTTP Request ans Backend
## Backend
-> Routen-Handler für API Endpunkte
-> Software für DB-Operationen
## Datenbank
-> Highscores und User Daten in MongoDB



# KOMMUNIKAITON
Die Kommunikation erfolgt mittels eines HTTP-Requests vom Frontend an die jeweiligen API Endpoints des Backends,
welches dafür zuständig ist, die nötigen DB-Operationen durchzuführen und ein Repsonse ans Frontend zurücksendet.

