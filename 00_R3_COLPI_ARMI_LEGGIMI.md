# Eclissi Stellare — R3: proiettili associati alla carta arma

**Base:** R2 consolidata.
**Scopo:** correggere la corrispondenza tra carta arma e tipo fisico di colpo, SENZA cambiare i varchi verticali, le regole Poker, Boost o danni.

## I 3 file di funzionamento modificati

1. `src/newCombat/pokerVolleyVfx.js`
   - Aggiunge `WEAPON_PROJECTILES` con 48 definizioni esplicite: per ID arma indica forma, nome del colpo, colori, dimensioni, velocità e ritmo.
   - Il varco mantiene la propria `family` basata sull'effetto; il colpo ha un profilo **indipendente** `projectile`.
2. `src/newCombat/PokerCombatEffects.jsx`
   - Al momento dello sparo ottiene la forma del proiettile dalla **carta arma realmente equipaggiata** (`volley.weaponId`), non dal tipo del varco.
   - Il CSS e i metadati del proiettile sono assegnati per arma; anche le traiettorie guidate dipendono dal proiettile.
   - Boost rimane un modificatore grafico dorato senza trasformare la forma originale del colpo.
3. `src/newCombat/pokerCombatEffects.css`
   - Distingue visivamente missili con pinne e scia, aghi, lame, dischi, dardi, scariche, onde, raggi, sfere, sigilli, ecc.
   - I 48 ID condividono alcune basi, ma sono assegnati esplicitamente a **43 forme/tipi di proiettile** con parametri individuali.

## Esempi da controllare in Avventura

- `Gatling Cinetica` -> dardi cinetici turchesi.
- `Lanciatore Leviatano` -> missile con pinne blu e scia; NON una sfera orbitale anche quando il portale è orbitale.
- `Falce di Rimbalzo` -> lama curva a mezzaluna.
- `Doppio Arco Ionico` -> scarica elettrica.
- `Anello di Marea` -> onda gravitazionale.
- `Filo dell’Eternità` -> filamento energetico.
- `Trono della Singolarità` -> micro-singolarità oscura.

**Quando non parte nessun colpo** non deve comparire un proiettile, anche se è stata giocata una combinazione Poker.

## Verifiche
- 4 test R3 specifici: superati.
- Test generali R3: 418/428 superati, 10 errori già presenti nella R2 (414/424 superati).
- Controllo JSX e struttura: superato.
- CSS: parser senza errori di sintassi.
- NON certificato: collaudo grafico in vera battaglia StackBlitz. La prova Chromium isolata non è riuscita a terminare in questo ambiente.

## Installazione

Sul progetto R2 già esistente, **sostituisci solo i 3 file** sopra indicati mantenendo esattamente le cartelle.
Non sostituire le cartelle `public/assets` e non cancellare altri file.
I test R3 opzionali sono presenti solo nel progetto completo (`src/newCombat/weaponProjectilesR3.test.js`).
