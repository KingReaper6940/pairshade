import {normalizeHex,contrast,grades,THRESHOLDS} from './color.mjs';
export function parsePalette(text){
 if(text.length>8000)throw Error('Keep the palette under 8,000 characters.');
 const lines=text.split(/\r?\n/).map((line,i)=>({line:line.trim(),number:i+1})).filter(x=>x.line);
 if(lines.length<2||lines.length>16)throw Error('Use between 2 and 16 named colors.');
 const names=new Set();
 return lines.map(({line,number})=>{
  const match=/^([a-z][a-z0-9-]{0,31})\s*:\s*(#[a-f0-9]{3}|#[a-f0-9]{6})$/i.exec(line);
  if(!match)throw Error('Line '+number+': use name: #HEX (names start with a letter; letters, digits and hyphens only).');
  const name=match[1].toLowerCase();
  if(names.has(name))throw Error('Line '+number+': duplicate name '+name+'.');
  names.add(name);return {name,hex:normalizeHex(match[2])};
 });
}
export function audit(palette){
 return palette.flatMap(fg=>palette.map(bg=>{const ratio=contrast(fg.hex,bg.hex);return {foreground:fg.name,background:bg.name,ratio,...grades(ratio)};}));
}
export function alternatives(palette,background,threshold,exclude){
 return palette.filter(x=>x.name!==exclude).map(x=>({...x,ratio:contrast(x.hex,background)})).filter(x=>x.ratio>=threshold).sort((a,b)=>b.ratio-a.ratio||a.name.localeCompare(b.name));
}
export function exportCSS(palette){return ':root {\n'+palette.map(x=>'  --'+x.name+': '+x.hex+';').join('\n')+'\n}\n';}
export function exportReport(palette){return JSON.stringify({method:'WCAG 2.x relative luminance, opaque sRGB',thresholds:THRESHOLDS,palette,pairs:audit(palette)},null,2)+'\n';}
