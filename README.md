# Português — Vokabeltrainer 🇵🇹

Eine Web-App zum Lernen des **europäischen portugiesischen** (pt-PT) Grundwortschatzes
für die Niveaustufen **A1 und A2** — rund 1.290 Wörter in 43 thematischen Lektionen.

**➡️ [App direkt im Browser öffnen](https://karstenlemler.github.io/portugiesisch-vokabeln/)**
— funktioniert auch auf dem Handy.

Die App läuft komplett offline im Browser. Keine Installation, kein Server,
keine Registrierung. Alternativ einfach `index.html` lokal öffnen.

## Funktionen

| Modus | Beschreibung |
|---|---|
| **Lektionen** | Übersicht aller Lektionen als Kacheln mit eigenem Fortschritt |
| **Lernen** | Wiederholung nach Leitner-Prinzip (Spaced Repetition) |
| **Karten** | Klassische Karteikarten zum Durchblättern |
| **Quiz** | Multiple Choice mit vier Antwortmöglichkeiten |
| **Schreiben** | Portugiesische Schreibweise selbst eintippen |
| **Liste** | Durchsuchbare Übersicht mit Fortschrittsanzeige je Wort |

Weitere Merkmale:

- **Audio** für jedes portugiesische Wort über die Sprachausgabe des Browsers (pt-PT)
- **Beide Abfragerichtungen**: PT → DE und DE → PT
- **Ampel-Fortschritt je Wort**: rot (neu) → orange (zuletzt falsch) → grün wachsend;
  nach 10× richtig gilt ein Wort als gemeistert und wird nicht mehr abgefragt
- Fortschritt wird automatisch im Browser gespeichert (`localStorage`)

## Aufbau der Vokabeln

```
Stufe A1  →  25 Lektionen  →  774 Wörter
Stufe A2  →  18 Lektionen  →  518 Wörter
```

Jede Lektion umfasst ein Thema (z. B. „Essen & Trinken", „Beim Arzt") mit
20–80 Wörtern. Gelernt wird immer nur eine Lektion; wahlweise auch eine ganze
Stufe oder alle Vokabeln gemischt.

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Oberfläche und Gestaltung |
| `vokabeln.js` | Lektionen und Vokabeldaten |
| `app.js` | Programmlogik (Modi, Fortschritt, Sprachausgabe) |

Alle drei Dateien müssen im selben Ordner liegen.

## Vokabeln ergänzen

Neue Wörter kommen in `vokabeln.js` in das Objekt `WORDS`, jeweils der passenden
Lektions-ID zugeordnet:

```js
"a1-11": [
  ["o pão", "das Brot"],
  ["o queijo", "der Käse"]
]
```

Substantive bitte **mit Artikel** (`o` / `a`) erfassen — so wird das Geschlecht
gleich mitgelernt. Beim Schreibmodus darf der Artikel weggelassen werden.
Mehrere gültige Antworten werden mit ` / ` getrennt (z. B. `obrigado / obrigada`).

Für eine neue Lektion zusätzlich einen Eintrag in `LESSONS` anlegen.

## Hinweis zur Aussprache

Die Audioqualität hängt davon ab, ob auf dem System eine **portugiesische Stimme
(pt-PT)** installiert ist. Unter Windows: *Einstellungen → Zeit und Sprache →
Sprache & Region → Sprache hinzufügen → „Português (Portugal)"* inklusive Sprachpaket.
Fehlt sie, weist die App oben darauf hin und nutzt eine Ersatzstimme.
