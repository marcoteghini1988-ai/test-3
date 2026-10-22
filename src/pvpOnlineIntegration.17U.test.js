import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const app=readFileSync(new URL('./App.tsx',import.meta.url),'utf8');
const lobby=readFileSync(new URL('./pvpManager.jsx',import.meta.url),'utf8');
const shim=readFileSync(new URL('./offlineLegacyNetwork.js',import.meta.url),'utf8');
test('R9 non include credenziali Google, Firebase o componenti PvP online',()=>{
 assert.doesNotMatch(lobby,/AIza|firebaseConfig|firebase\/|signInAnonymously/);
 assert.doesNotMatch(app,/from ['"]firebase\//);
 assert.doesNotMatch(app,/<PvpOnlinePokerBattle/);
 assert.equal(existsSync(new URL('./PvpOnlinePokerBattle.jsx',import.meta.url)),false);
});
test('R9 lobby avvia solamente avversari IA e classifica locale',()=>{
 assert.match(lobby,/isGhostMatch: true/);
 assert.match(lobby,/isOnlinePoker: false/);
 assert.match(lobby,/getPersistentLeaderboardData/);
 assert.match(lobby,/Classifica Élite Simulata/);
});
test('R9 vecchie chiamate network restano bloccate, non emulate',()=>{
 assert.match(shim,/throw new Error/);
 assert.match(lobby,/export const db = null/);
});
