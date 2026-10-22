# Eclissi Stellare — R8 | Varchi sequenziali: correzione di visualizzazione

Questa versione corregge la R7, nella quale i nuovi varchi non risultavano visibili durante il test dell'utente.

## Correzioni applicate

- Le **7 sequenze originali** a 6 fotogrammi ciascuna sono ora in formato WebP con trasparenza, ottimizzate per un caricamento rapido (da circa 19 MB a circa 3,2 MB complessivi).
- Il componente `PokerCombatEffects.jsx` continua a essere quello della plancia Classic: non è stato introdotto un altro renderer.
- Riproduzione sprite controllata da JavaScript: comparsa, apertura, stabilizzazione, picco di emissione, chiusura; i sei frame vengono selezionati sulla stessa sprite sheet.
- Il varco si apre e resta visibile per tutta la salva; si chiude dopo l'ultimo colpo. Prima i sei frame terminavano dopo soli 900 ms anche se l'animazione proseguiva.
- Il sistema ritenta per pochi istanti il collegamento con lo slot corrispondente se lo schieramento non è ancora completo, senza cambiare carta arma.
- La forma del proiettile è ancora definita dall'ID delle 48 armi e non dal portale.
- Nessun intervento su Poker, danni, HP, Boost, IA, round, timer o economia.

## Come aggiornare la R7

Copia i file del pacchetto minimo mantenendo le cartelle `src` e `public` nella radice del progetto StackBlitz:

- `src/newCombat/PokerCombatEffects.jsx`
- `src/newCombat/pokerCombatEffects.css`
- `public/assets/portal_sequences/{orbit,arc,plasma,toxic,shard,burst,pulse}.webp`

Gli asset PNG della R7 in `public/assets/portal_sequences/*.png` non vengono più utilizzati: si possono cancellare per risparmiare spazio.

Il file `public/verifica-varchi-r8.html` è una semplice pagina per provare graficamente le 7 animazioni da browser; in StackBlitz apri `/verifica-varchi-r8.html` nello stesso indirizzo del progetto.

## Prova consigliata

1. Apri `/verifica-varchi-r8.html` e premi «Riproduci sequenze» per vedere le sette famiglie. Questo verifica caricamento delle immagini e cambi di frame, NON il collegamento con la partita.
2. Torna in Avventura e attiva una combinazione Poker che produca almeno un colpo.
3. Controlla l'apertura verticale sulla carta arma, la permanenza del varco mentre escono i colpi e la chiusura.
4. Ripeti anche con un'arma avversaria.

## Limiti del collaudo

Le immagini WebP (trasparenza e dimensioni) e i test statici/di logica sono stati verificati. Il browser Chromium in questo ambiente ha impedito l'apertura sia della pagina locale sia del server locale, quindi l'effetto nella partita completa NON è stato collaudato visivamente. In caso di problemi residui, servono screenshot e console durante la fase «risoluzione dello scontro».
