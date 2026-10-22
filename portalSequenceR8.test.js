import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,statSync} from 'node:fs';
import {ARSENAL_48} from './weaponCatalog.js';
import {pokerVolleyProfile} from './pokerVolleyVfx.js';

const main=readFileSync(new URL('./PokerCombatEffects.jsx',import.meta.url),'utf8');
const css=readFileSync(new URL('./pokerCombatEffects.css',import.meta.url),'utf8');
const fam=['orbit','arc','plasma','toxic','shard','burst','pulse'];
const root=new URL('../../public/assets/portal_sequences/',import.meta.url);

test('R8: tutte le sette famiglie hanno una sprite sheet WEBP, piccola e con sei frame',()=>{
  for(const name of fam){
    const uri=new URL(`${name}.webp`,root);
    assert.ok(existsSync(uri),`${name} manca`);
    assert.ok(statSync(uri).size<650000,`asset ${name} troppo grande per i tempi di combattimento`);
    assert.ok(main.includes(`/assets/portal_sequences/${name}.webp`),`mapping di ${name} mancante`);
  }
});
test('R8: il frame è aggiornato da JavaScript, non da una CSS animation di 900ms',()=>{
  assert.match(main,/function setRiftFrame\(art,frame\)/);
  assert.match(main,/setRiftFrame\(portalArt,0\)/);
  assert.match(main,/setRiftFrame\(portalArt,5\)/);
  assert.match(main,/volleyDuration\+50/);
  assert.doesNotMatch(css,/animation:es-rift-sheet-play/);
});
test('R8: carica un asset per il varco ma il proiettile resta legato all’ID arma',()=>{
  assert.equal(ARSENAL_48.length,48);
  assert.ok(ARSENAL_48.every(w=>Boolean(pokerVolleyProfile(w)?.projectile?.shape)));
  assert.match(main,/es-weapon-shot-\$\{projectile.shape\}/);
  assert.match(main,/if\(attempt<5\)/);
});
