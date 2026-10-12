import {parsePalette,alternatives,exportCSS,exportReport} from './src/palette.mjs';
import {contrast} from './src/color.mjs';
const el=id=>document.getElementById(id);
const make=(tag,text)=>{const node=document.createElement(tag);node.textContent=text;return node;};
const example='ink: #182A36\npaper: #FAF8F2\nbrand: #235D50\nmint: #D6EBDC\nmuted: #888888\nwhite: #FFFFFF';
let palette=[];
el('palette').value=example;
function invalidate(){palette=[];el('workbench').hidden=true;el('matrix-section').hidden=true;el('status').textContent='Palette changed. Audit again to refresh the results.';}
el('palette').addEventListener('input',invalidate);
el('example').addEventListener('click',()=>{el('palette').value=example;run();});
function run(){
 invalidate();
 try{palette=parsePalette(el('palette').value);}catch(e){el('status').textContent=e.message;return;}
 for(const id of ['foreground','background']){
 el(id).replaceChildren(...palette.map(x=>{const o=make('option',x.name+' · '+x.hex);o.value=x.name;return o;}));
 }
 el('foreground').value=palette.find(x=>x.name==='muted')?.name||palette[0].name;
 el('background').value=palette.find(x=>x.name==='paper')?.name||palette[1].name;
 el('workbench').hidden=false;el('matrix-section').hidden=false;
 el('status').textContent=palette.length+' tokens loaded. Every pair calculated locally.';
 render();
}
function render(){
 if(!palette.length)return;
 const fg=palette.find(x=>x.name===el('foreground').value),bg=palette.find(x=>x.name===el('background').value),target=Number(el('target').value);
 const ratio=contrast(fg.hex,bg.hex),pass=ratio>=target;
 el('preview').style.color=fg.hex;el('preview').style.backgroundColor=bg.hex;
 el('ratio').textContent=ratio.toFixed(3)+':1';
 el('verdict').textContent=pass?'PASS · selected contrast target':'FAIL · below selected contrast target';
 el('precision').textContent='Target '+target+':1 · pass/fail compares the unrounded ratio.';
 el('suggestions').replaceChildren(make('p',pass?'Other passing text tokens for this surface':'Try an existing token on this surface'));
 const choices=alternatives(palette,bg.hex,target,fg.name);
 if(!choices.length)el('suggestions').append(make('p','No other palette token meets this target. Change the surface or revise the palette.'));
 for(const x of choices){const b=make('button',x.name+' · '+x.ratio.toFixed(2)+':1');b.className='quiet';b.addEventListener('click',()=>{el('foreground').value=x.name;render();});el('suggestions').append(b);}
 const table=el('matrix');table.replaceChildren(make('caption','Palette contrast matrix'));
 const header=document.createElement('tr');const corner=make('th','Text ↓ / Surface →');corner.scope='col';header.append(corner);
 for(const c of palette){const th=make('th',c.name);th.scope='col';header.append(th);}
 const head=document.createElement('thead');head.append(header);table.append(head);
 const body=document.createElement('tbody');
 for(const a of palette){const tr=document.createElement('tr'),name=make('th',a.name);name.scope='row';tr.append(name);
 for(const b of palette){const value=contrast(a.hex,b.hex),ok=value>=target,td=document.createElement('td'),btn=document.createElement('button');
 btn.className=ok?'':'fail';btn.setAttribute('aria-label',a.name+' on '+b.name+', '+value.toFixed(3)+' to 1, '+(ok?'pass':'fail'));
 btn.append(make('strong',value.toFixed(2)+':1'),make('span',ok?'PASS':'FAIL'));
 btn.addEventListener('click',()=>{el('foreground').value=a.name;el('background').value=b.name;render();el('foreground').focus();});
 td.append(btn);tr.append(td);}
 body.append(tr);}table.append(body);
}
for(const id of ['foreground','background','target'])el(id).addEventListener('change',render);
el('audit').addEventListener('click',run);
function download(text,type,name){const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
el('css').addEventListener('click',()=>download(exportCSS(palette),'text/css','pairshade-tokens.css'));
el('json').addEventListener('click',()=>download(exportReport(palette),'application/json','pairshade-audit.json'));
run();
