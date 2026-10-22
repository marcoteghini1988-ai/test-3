# Eclissi Stellare R9 — PvP e classifiche simulate, senza Firebase

## Modifiche
- Rimosse chiave API Google e configurazione Firebase dal codice frontend.
- Rimossa dipendenza npm `firebase` e componente WebSocket/Firebase online inutilizzato.
- Eliminato il backend Firebase Admin obsoleto dalla distribuzione R9.
- Lobby: abbinamento locale dopo 2,6 secondi con avversario IA esistente.
- Sfida giornaliera: resta locale con 150 avversari simulati, come nella versione di partenza.
- Classifica Élite: 500 avversari simulati, posizione e trofei locali; niente podio mondiale reale.
- Battaglia PvP: riutilizza PvpPokerBotBattle e i profili di armi esistenti.
- Regole, animazioni dei varchi e campagna non intenzionalmente modificati.
- I precedenti rami online in App.tsx sono bloccati (`db=null`) da un adattatore che non comunica in rete; si potranno rimuovere completamente in una successiva pulizia senza modificare il motore.

## Sicurezza Google: operazione esterna necessaria
Cancellare o disattivare manualmente la precedente chiave dalla console Google Cloud.
Eliminare la stringa dallo ZIP NON la revoca dal servizio Google. Git conserva anche cronologia precedente.
In assenza di giocatori reali e database utilizzato, non serve migrare dati, ma verificare che nessun altro progetto Google usi la medesima chiave.

## Controlli consigliati
1. `npm ci`
2. `npm run build`
3. Aprire il gioco e lanciare PvP Addestramento: compare un bot senza connessione.
4. Controllare Lega Élite simulata e Sfida giornaliera (anche con rete disattivata).
5. Ispezionare strumenti sviluppatore Network: nessuna richiesta a Google Firebase.
6. Controllare i salvataggi dal medesimo browser e ricaricare pagina.

## Limiti
I risultati, trofei e sfide non sono sincronizzati tra dispositivi. I salvataggi browser/localStorage possono essere persi cancellando i dati del sito. La classifica non è mondiale reale.
