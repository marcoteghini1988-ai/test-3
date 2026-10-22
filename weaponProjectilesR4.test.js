import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {ARSENAL_48} from './weaponCatalog.js';
import {weaponProjectileProfile} from './pokerVolleyVfx.js';

const renderer=readFileSync(new URL('./PokerCombatEffects.jsx',import.meta.url),'utf8');
const css=readFileSync(new URL('./pokerCombatEffects.css',import.meta.url),'utf8');

test('R4 regressione: il colpo viene dichiarato prima del primo accesso a projectile.shape',()=>{
  const callback=renderer.split('for(let i=0;i<shots;i++)later(()=>{')[1];
  assert.ok(callback,'callback emissione non trovato');
  const declaration=callback.indexOf('const projectile=signature.projectile;');
  const use=callback.indexOf('projectile.shape');
  assert.ok(declaration>=0 && use>declaration,'ReferenceError: projectile letto prima di essere inizializzato');
});

test('R4: traiettoria e geometria dipendono dalla carta, non dalla famiglia del varco',()=>{
  assert.match(renderer,/const guided=\[[^\]]+\]\.includes\(projectile\.shape\)/);
  assert.doesNotMatch(renderer,/signature\.family===['"](?:arc|orbit|shard)['"]\?deviation/);
  assert.match(renderer,/es-weapon-shot-\$\{projectile\.shape\}/);
  assert.match(renderer,/--shot-core/);
  assert.match(renderer,/--shot-length/);
  assert.match(renderer,/flight\.onfinish=/);
});

test('R4: le 48 armi hanno una forma coperta dal CSS attivo',()=>{
  assert.equal(ARSENAL_48.length,48);
  for(const weapon of ARSENAL_48){
    const shot=weaponProjectileProfile(weapon);
    assert.ok(shot,`${weapon.name} senza tipo di proiettile`);
    assert.ok(css.includes(`.es-weapon-shot-${shot.shape} `)||css.includes(`.es-weapon-shot-${shot.shape}.`),`manca CSS per ${weapon.name}: ${shot.shape}`);
  }
});
