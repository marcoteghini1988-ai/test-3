# FIX R7 — Varchi a sequenza sprite

## Cosa contiene
- 7 sprite sheet PNG trasparenti in `public/assets/portal_sequences/`
- animazione dei varchi con sprite sheet 2 colonne x 3 righe
- il colpo resta separato e continua ad essere definito dalla carta arma

## Famiglie inserite
- orbit → `orbit.png`
- arc → `arc.png`
- plasma → `plasma.png`
- toxic → `toxic.png`
- shard → `shard.png`
- burst → `burst.png`
- pulse → `pulse.png`

## Mapping compatibilità
- `beam` usa temporaneamente la sequenza `pulse.png`
- `spear` usa temporaneamente la sequenza `shard.png`

## File modificati
- `src/newCombat/PokerCombatEffects.jsx`
- `src/newCombat/pokerCombatEffects.css`
- `public/assets/portal_sequences/*.png`

## Logica
- il varco è una sequenza visuale 2x3
- la sequenza viene riprodotta sopra la carta corrispondente
- il proiettile non dipende dal varco: dipende sempre dalla carta arma
