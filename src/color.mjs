export function normalizeHex(value) {
 const v=value.trim();
 if(!/^#(?:[a-f0-9]{3}|[a-f0-9]{6})$/i.test(v))throw Error('Use an opaque #RGB or #RRGGBB color.');
 return (v.length===4?'#'+[...v.slice(1)].map(x=>x+x).join(''):v).toUpperCase();
}
export function luminance(hex) {
 const color=normalizeHex(hex);
 const linear=[1,3,5].map(i=>parseInt(color.slice(i,i+2),16)/255).map(c=>c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4);
 return .2126*linear[0]+.7152*linear[1]+.0722*linear[2];
}
export function contrast(a,b){
 const x=luminance(a),y=luminance(b);
 return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
export const THRESHOLDS={normalAA:4.5,largeAA:3,normalAAA:7,largeAAA:4.5};
export function passes(ratio,threshold){return ratio>=threshold;}
export function grades(ratio){return Object.fromEntries(Object.entries(THRESHOLDS).map(([key,value])=>[key,passes(ratio,value)]));}
