FIX 10 — VARCHI COSMICI

Obiettivo di questo passaggio:
- mantenere il varco sopra la carta corretta;
- NON toccare la logica dei danni;
- rifare il look del varco sul modello di uno squarcio cosmico / portale energetico;
- lasciare i colpi determinati dalla carta arma.

File modificati:
1) src/newCombat/pokerCombatEffects.css
   - varco ricostruito con nucleo profondo, bordo energetico, scintille, vortice, crackle;
   - famiglie visive differenziate (arc, beam, pulse, orbit, plasma, shard, spear);
   - ombra e tether sopra la carta mantenuti.

2) src/newCombat/pokerVolleyVfx.js
   - aumentata la dimensione dei varchi per renderli più leggibili.

Note:
- Questo step lavora sul LOOK del varco.
- I proiettili rimangono quelli già definiti per arma.
- Se serve, il prossimo step sarà rifinire una per una le famiglie visive.
