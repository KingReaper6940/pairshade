import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeHex,luminance,contrast,passes,grades} from '../src/color.mjs';
test('hex normalization',()=>{assert.equal(normalizeHex(' #abc '),'#AABBCC');assert.equal(normalizeHex('#12abEF'),'#12ABEF');});
test('rejects unsupported color syntax',()=>{for(const v of ['red','#abcd','#12345678','abc','#ggg','rgb(0,0,0)'])assert.throws(()=>normalizeHex(v));});
test('black and white produce reference luminance and ratio',()=>{assert.equal(luminance('#000'),0);assert.equal(luminance('#fff'),1);assert.equal(contrast('#000','#fff'),21);});
test('same colors and symmetry',()=>{assert.equal(contrast('#123','#123'),1);assert.equal(contrast('#abc','#123'),contrast('#123','#abc'));});
test('known gray reference value',()=>{assert.ok(Math.abs(contrast('#777','#fff')-4.478089453577214)<1e-12);assert.equal(grades(contrast('#777','#fff')).normalAA,false);});
test('threshold comparison never rounds',()=>{assert.equal(passes(4.499999,4.5),false);assert.equal(passes(4.5,4.5),true);assert.equal(passes(2.999999,3),false);});
