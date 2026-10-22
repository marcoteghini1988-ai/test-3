# Eclissi Stellare — R4: il colpo esce dalla carta arma

## Causa verificata nel codice R3
Nel callback che genera i colpi in `src/newCombat/PokerCombatEffects.jsx`, il codice leggeva `projectile.shape` e `projectile.size` **prima** di dichiarare `const projectile=signature.projectile`. Questo provoca in JavaScript `ReferenceError: Cannot access 'projectile' before initialization`, bloccando la creazione del proiettile specifico, anche se la mappa R3 delle 48 armi è presente.

## Correzione
- Inizializzazione di `projectile` prima di usarlo per forma e dimensione.
- Traiettoria guidata collegata alla forma fisica (`projectile.shape`) e non al tipo di varco (`signature.family`).
- Nessun cambiamento ai varchi verticali, alle carte, agli HP, ai danni o al Boost.

## Tre file del pacchetto minimo (R4 pronto anche su installazioni R3 incomplete)
1. `src/newCombat/PokerCombatEffects.jsx` — **modificato rispetto a R3**.
2. `src/newCombat/pokerVolleyVfx.js` — stessa mappa delle 48 armi già introdotta in R3.
3. `src/newCombat/pokerCombatEffects.css` — stesse forme dei colpi già introdotte in R3.

## Installazione StackBlitz
1. Fai una copia di sicurezza.
2. Estrai lo ZIP minimo.
3. Copia la cartella `src` nella radice di `test-ec`, confermando la sovrascrittura dei tre file dentro **`src/newCombat`**. Non copiarli nella cartella principale.
4. Salva e riavvia l'anteprima. Per distinguere il colpo osserva il **Lanciatore Leviatano** (missile riconoscibile) e la **Falce di Rimbalzo** (lama curva).

## Prove eseguite
- Browser Chromium con il componente `PokerCombatEffects.jsx` compilato e montato su slot + barre HP simulati: R3 produce l'errore `Cannot access 'projectile' before initialization` e nessun proiettile della nuova serie; R4 crea due missili di `es_common_heavy_02` e due falci di `es_common_light_03`, senza errori JavaScript.
- Test specifici R3/R4: 7 su 7 superati.
- Test generali: 421/431 superati; 10 test preesistenti ancora falliscono, come nella R3.
- **Limite:** non è stato eseguito un collaudo completo della partita StackBlitz con questa versione: va verificato lì il risultato finale.
