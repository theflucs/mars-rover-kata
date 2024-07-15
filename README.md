# Mars Rover kata 🚀

## Descrizione

L'applicazione Mars Rover Kata simula il movimento di un rover su un pianeta a griglia seguendo le regole del [Mars Rover Kata](https://kata-log.rocks/mars-rover-kata). L'applicazione legge un file di testo contenente la mappa del mondo e le stringhe di comando, quindi stampa la posizione del rover dopo l'esecuzione di ogni stringa di comandi.

Questa implementazione dimostra la gestione delle griglie, l'esecuzione dei comandi e la visualizzazione di base nel terminale.

## Requisiti

Assicurati di avere [node](https://nodejs.org/en/download/prebuilt-installer) e [pnpm](https://pnpm.io/installation) installati sul tuo computer.

## Installazione

### 1. Clona il Repository

```
git clone https://github.com/tuo-username/mars-rover-kata.git
cd mars-rover-kata
```

### Installa le dipendenze:

`pnpm install`

### Avvia il progetto:

`pnpm dev`

### Esecuzione dei test

Per eseguire i test, utilizza il comando:

`pnpm test`

## Tech Stack

- `TypeScript`
- `Jest`

## Struttura del Progetto

La struttura del progetto è definita nel file `projectStructure.txt`.

## Implementazione

### Approccio TDD

L'applicazione è stata sviluppata utilizzando il **Test-Driven Development (TDD)**, garantendo che ogni parte del codice fosse coperta da test prima dell'implementazione effettiva. Questo approccio ha aiutato a mantenere alta la qualità del codice e a rilevare tempestivamente eventuali errori.

### Come Funziona

#### 1. Lettura del File di Input:

Il file `input.txt` viene letto e analizzato, utilizzando il modulo `fs` di `Node.js`, per estrarre la dimensione della griglia, la posizione degli ostacoli e le sequenze di comandi.

#### 2. Inizializzazione del Rover:

Il rover inizia dalla posizione (0, 0) rivolto verso Nord (N).

#### 3. Esecuzione dei Comandi:

Ogni stringa di comandi viene eseguita sequenzialmente. I comandi sono:

- L - Sinistra (ruota a sinistra di 90 gradi)
- R - Destra (ruota a destra di 90 gradi)
- F - Avanti (muove il rover di una cella nella direzione attuale)
- B - Indietro (muove il rover di una cella nella direzione opposta)

#### 4. Gestione degli Ostacoli:

Se il rover incontra un ostacolo durante il movimento, si ferma e segnala la collisione nell'output.

#### 5. Effetto Pac-Man:

Se il rover raggiunge il bordo della griglia e continua a muoversi, ricompare dal lato opposto della griglia.

#### 6. Visualizzazione della Griglia:

Lo stato della griglia viene visualizzato nel terminale, mostrando la posizione e la direzione del rover e gli ostacoli.

#### 7. Output:

L'output include un riepilogo dei comandi del rover e dello stato finale della griglia, nel formato `[O:]<X>:<Y>:<Direzione>`.

Dove `<X> e <Y>` sono i valori delle coordinate sulla griglia mentre `<Direzione>` è la lettera che rappresenta la direzione verso cui è diretto il rover.

La `O` iniziale viene stampata solo nel caso in cui l’ultimo comando abbia fatto sbattere il rover contro un ostacolo.
Ad esempio: `1:1:N` oppure `O:2:5:S`.
