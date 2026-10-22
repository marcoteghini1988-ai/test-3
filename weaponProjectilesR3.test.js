import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {ARSENAL_48} from './weaponCatalog.js';
import {WEAPON_PROJECTILES,weaponProjectileProfile,pokerVolleyProfile} from './pokerVolleyVfx.js';

const keys=Object.keys(WEAPON_PROJECTILES);
const js=readFileSync(new URL('./PokerCombatEffects.jsx',import.meta.url),'utf8');
const css=readFileSync(new URL('./pokerCombatEffects.css',import.meta.url),'utf8');

test('R3: tutte e 48 le carte arma hanno il proprio proiettile fisico esplicito',()=>{
 assert.equal(keys.length,48);
 assert.deepEqual(new Set(keys),new Set(ARSENAL_48.map(w=>w.id)));
 for(const weapon of ARSENAL_48){
  const profile=weaponProjectileProfile(weapon);
  assert.equal(profile.weaponId,weapon.id);
  assert.ok(profile.label.length>=8);
  assert.ok(profile.shape.length>1);
  assert.match(profile.primary,/^#[a-f\d]{6}$/i);
  assert.match(profile.highlight,/^#[a-f\d]{6}$/i);
  assert.ok(profile.size>=8&&profile.travelMs>0);
  assert.match(css,new RegExp('\\.es-weapon-shot-'+profile.shape+'\\b'));
 }
});

test('R3: missili, dardi, lame, scariche e onde NON sono assegnati dall’effetto del varco',()=>{
 const byName=name=>ARSENAL_48.find(w=>w.name===name);
 for(const [name,expected] of [
  ['Lanciatore Leviatano','missile'],['Arca di Tritone','missile'],
  ['Gatling Cinetica','kinetic'],['Falce di Rimbalzo','crescent'],
  ['Doppio Arco Ionico','lightning'],['Anello di Marea','wave'],
  ['Filo dell’Eternità','filament'],['Trono della Singolarità','singularity'],
 ])assert.equal(weaponProjectileProfile(byName(name)).shape,expected,name);
 const leviatano=byName('Lanciatore Leviatano');
 const portal=pokerVolleyProfile(leviatano);
 assert.equal(portal.family,'orbit'); // la porta può essere orbitale
 assert.equal(portal.projectile.shape,'missile'); // MA esce un missile
});

test('R3: il renderer usa la forma fisica, senza sostituirla con il tipo di varco',()=>{
 assert.match(js,/es-weapon-shot-\$\{projectile\.shape\}/);
 assert.doesNotMatch(js,/es-rift-shot-\$\{signature\.family\}/);
 assert.match(js,/shot\.dataset\.projectileShape=projectile\.shape/);
 assert.match(js,/portal\.setAttribute\('data-rift-projectile',signature\.projectile\.shape\)/);
 assert.match(js,/--shot-core/);
 assert.match(js,/--shot-edge/);
});

test('R3: gli effetti grafici continuano a non modificare HP o danni',()=>{
 assert.doesNotMatch(js,/setGame\(|setHp\(|commitCombatMove\(|resolvePhase4Volleys\(/);
});
