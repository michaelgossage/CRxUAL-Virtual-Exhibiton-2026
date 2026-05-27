(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _a="160",Yc=0,ka=1,$c=2,zl=1,Kc=2,vn=3,qt=0,Ot=1,Nt=2,Fn=0,Ci=1,Ba=2,za=3,Ha=4,Zc=5,Jn=100,Jc=101,Qc=102,Va=103,Ga=104,eh=200,th=201,nh=202,ih=203,Zr=204,Jr=205,sh=206,rh=207,ah=208,oh=209,lh=210,ch=211,hh=212,uh=213,dh=214,fh=0,ph=1,mh=2,Xs=3,_h=4,gh=5,vh=6,xh=7,Hl=0,yh=1,Mh=2,On=0,Sh=1,bh=2,Eh=3,Vl=4,Th=5,wh=6,Wa="attached",Ah="detached",Gl=300,Pi=301,Di=302,qs=303,Qr=304,er=306,Bn=1e3,At=1001,js=1002,Mt=1003,ea=1004,Gs=1005,je=1006,Wl=1007,zn=1008,an=1009,Rh=1010,Ch=1011,ga=1012,Xl=1013,Nn=1014,Xt=1015,yn=1016,ql=1017,jl=1018,ti=1020,Lh=1021,Ft=1023,Ih=1024,Ph=1025,ni=1026,Ni=1027,Yl=1028,$l=1029,Dh=1030,Kl=1031,Zl=1033,hr=33776,ur=33777,dr=33778,fr=33779,Xa=35840,qa=35841,ja=35842,Ya=35843,Jl=36196,$a=37492,Ka=37496,Za=37808,Ja=37809,Qa=37810,eo=37811,to=37812,no=37813,io=37814,so=37815,ro=37816,ao=37817,oo=37818,lo=37819,co=37820,ho=37821,pr=36492,uo=36494,fo=36495,Nh=36283,po=36284,mo=36285,_o=36286,Uh=2200,Fh=2201,Oh=2202,as=2300,Ui=2301,mr=2302,Ti=2400,wi=2401,Ys=2402,va=2500,kh=2501,Bh=0,Ql=1,ta=2,ec=3e3,ii=3001,zh=3200,Hh=3201,tc=0,Vh=1,Wt="",Ye="srgb",pt="srgb-linear",xa="display-p3",tr="display-p3-linear",$s="linear",st="srgb",Ks="rec709",Zs="p3",oi=7680,go=519,Gh=512,Wh=513,Xh=514,nc=515,qh=516,jh=517,Yh=518,$h=519,na=35044,vo="300 es",ia=1035,Mn=2e3,Js=2001;class ai{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const Tt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let xo=1234567;const ns=Math.PI/180,Fi=180/Math.PI;function en(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Tt[r&255]+Tt[r>>8&255]+Tt[r>>16&255]+Tt[r>>24&255]+"-"+Tt[e&255]+Tt[e>>8&255]+"-"+Tt[e>>16&15|64]+Tt[e>>24&255]+"-"+Tt[t&63|128]+Tt[t>>8&255]+"-"+Tt[t>>16&255]+Tt[t>>24&255]+Tt[n&255]+Tt[n>>8&255]+Tt[n>>16&255]+Tt[n>>24&255]).toLowerCase()}function St(r,e,t){return Math.max(e,Math.min(t,r))}function ya(r,e){return(r%e+e)%e}function Kh(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Zh(r,e,t){return r!==e?(t-r)/(e-r):0}function is(r,e,t){return(1-t)*r+t*e}function Jh(r,e,t,n){return is(r,e,1-Math.exp(-t*n))}function Qh(r,e=1){return e-Math.abs(ya(r,e*2)-e)}function eu(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function tu(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function nu(r,e){return r+Math.floor(Math.random()*(e-r+1))}function iu(r,e){return r+Math.random()*(e-r)}function su(r){return r*(.5-Math.random())}function ru(r){r!==void 0&&(xo=r);let e=xo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function au(r){return r*ns}function ou(r){return r*Fi}function sa(r){return(r&r-1)===0&&r!==0}function lu(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Qs(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function cu(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),d=a((e-n)/2),p=s((n-e)/2),_=a((n-e)/2);switch(i){case"XYX":r.set(o*h,l*u,l*d,o*c);break;case"YZY":r.set(l*d,o*h,l*u,o*c);break;case"ZXZ":r.set(l*u,l*d,o*h,o*c);break;case"XZX":r.set(o*h,l*_,l*p,o*c);break;case"YXY":r.set(l*p,o*h,l*_,o*c);break;case"ZYZ":r.set(l*_,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function rn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Qe(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const kn={DEG2RAD:ns,RAD2DEG:Fi,generateUUID:en,clamp:St,euclideanModulo:ya,mapLinear:Kh,inverseLerp:Zh,lerp:is,damp:Jh,pingpong:Qh,smoothstep:eu,smootherstep:tu,randInt:nu,randFloat:iu,randFloatSpread:su,seededRandom:ru,degToRad:au,radToDeg:ou,isPowerOfTwo:sa,ceilPowerOfTwo:lu,floorPowerOfTwo:Qs,setQuaternionFromProperEuler:cu,normalize:Qe,denormalize:rn};class Se{constructor(e=0,t=0){Se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(St(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ge{constructor(e,t,n,i,s,a,o,l,c){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],_=n[8],v=i[0],m=i[3],f=i[6],S=i[1],x=i[4],T=i[7],L=i[2],A=i[5],b=i[8];return s[0]=a*v+o*S+l*L,s[3]=a*m+o*x+l*A,s[6]=a*f+o*T+l*b,s[1]=c*v+h*S+u*L,s[4]=c*m+h*x+u*A,s[7]=c*f+h*T+u*b,s[2]=d*v+p*S+_*L,s[5]=d*m+p*x+_*A,s[8]=d*f+p*T+_*b,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,p=c*s-a*l,_=t*u+n*d+i*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=u*v,e[1]=(i*c-h*n)*v,e[2]=(o*n-i*a)*v,e[3]=d*v,e[4]=(h*t-i*l)*v,e[5]=(i*s-o*t)*v,e[6]=p*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(_r.makeScale(e,t)),this}rotate(e){return this.premultiply(_r.makeRotation(-e)),this}translate(e,t){return this.premultiply(_r.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const _r=new Ge;function ic(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function os(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function hu(){const r=os("canvas");return r.style.display="block",r}const yo={};function ss(r){r in yo||(yo[r]=!0,console.warn(r))}const Mo=new Ge().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),So=new Ge().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),fs={[pt]:{transfer:$s,primaries:Ks,toReference:r=>r,fromReference:r=>r},[Ye]:{transfer:st,primaries:Ks,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[tr]:{transfer:$s,primaries:Zs,toReference:r=>r.applyMatrix3(So),fromReference:r=>r.applyMatrix3(Mo)},[xa]:{transfer:st,primaries:Zs,toReference:r=>r.convertSRGBToLinear().applyMatrix3(So),fromReference:r=>r.applyMatrix3(Mo).convertLinearToSRGB()}},uu=new Set([pt,tr]),Ke={enabled:!0,_workingColorSpace:pt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!uu.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=fs[e].toReference,i=fs[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return fs[r].primaries},getTransfer:function(r){return r===Wt?$s:fs[r].transfer}};function Li(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function gr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let li;class sc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{li===void 0&&(li=os("canvas")),li.width=e.width,li.height=e.height;const n=li.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=li}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=os("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Li(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Li(t[n]/255)*255):t[n]=Li(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let du=0;class rc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:du++}),this.uuid=en(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(vr(i[a].image)):s.push(vr(i[a]))}else s=vr(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function vr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?sc.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let fu=0;class mt extends ai{constructor(e=mt.DEFAULT_IMAGE,t=mt.DEFAULT_MAPPING,n=At,i=At,s=je,a=zn,o=Ft,l=an,c=mt.DEFAULT_ANISOTROPY,h=Wt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=en(),this.name="",this.source=new rc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(ss("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===ii?Ye:Wt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bn:e.x=e.x-Math.floor(e.x);break;case At:e.x=e.x<0?0:1;break;case js:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bn:e.y=e.y-Math.floor(e.y);break;case At:e.y=e.y<0?0:1;break;case js:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ss("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ye?ii:ec}set encoding(e){ss("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ii?Ye:Wt}}mt.DEFAULT_IMAGE=null;mt.DEFAULT_MAPPING=Gl;mt.DEFAULT_ANISOTROPY=1;class et{constructor(e=0,t=0,n=0,i=1){et.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],_=l[9],v=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,T=(p+1)/2,L=(f+1)/2,A=(h+d)/4,b=(u+v)/4,D=(_+m)/4;return x>T&&x>L?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=A/n,s=b/n):T>L?T<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(T),n=A/i,s=D/i):L<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(L),n=b/s,i=D/s),this.set(n,i,s,t),this}let S=Math.sqrt((m-_)*(m-_)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(m-_)/S,this.y=(u-v)/S,this.z=(d-h)/S,this.w=Math.acos((c+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pu extends ai{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new et(0,0,e,t),this.scissorTest=!1,this.viewport=new et(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(ss("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ii?Ye:Wt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:je,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new mt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new rc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class En extends pu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ac extends mt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=At,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oc extends mt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=At,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[a+0],p=s[a+1],_=s[a+2],v=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=_,e[t+3]=v;return}if(u!==v||l!==d||c!==p||h!==_){let m=1-o;const f=l*d+c*p+h*_+u*v,S=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){const L=Math.sqrt(x),A=Math.atan2(L,f*S);m=Math.sin(m*A)/L,o=Math.sin(o*A)/L}const T=o*S;if(l=l*m+d*T,c=c*m+p*T,h=h*m+_*T,u=u*m+v*T,m===1-o){const L=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=L,c*=L,h*=L,u*=L}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],d=s[a+1],p=s[a+2],_=s[a+3];return e[t]=o*_+h*u+l*p-c*d,e[t+1]=l*_+h*d+c*u-o*p,e[t+2]=c*_+h*p+o*d-l*u,e[t+3]=h*_-o*u-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),d=l(n/2),p=l(i/2),_=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*p*_,this._y=c*p*u-d*h*_,this._z=c*h*_+d*p*u,this._w=c*h*u-d*p*_;break;case"YXZ":this._x=d*h*u+c*p*_,this._y=c*p*u-d*h*_,this._z=c*h*_-d*p*u,this._w=c*h*u+d*p*_;break;case"ZXY":this._x=d*h*u-c*p*_,this._y=c*p*u+d*h*_,this._z=c*h*_+d*p*u,this._w=c*h*u-d*p*_;break;case"ZYX":this._x=d*h*u-c*p*_,this._y=c*p*u+d*h*_,this._z=c*h*_-d*p*u,this._w=c*h*u+d*p*_;break;case"YZX":this._x=d*h*u+c*p*_,this._y=c*p*u+d*h*_,this._z=c*h*_-d*p*u,this._w=c*h*u-d*p*_;break;case"XZY":this._x=d*h*u-c*p*_,this._y=c*p*u-d*h*_,this._z=c*h*_+d*p*u,this._w=c*h*u+d*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(a-i)*p}else if(n>o&&n>u){const p=2*Math.sqrt(1+n-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(s+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-n-u);this._w=(s-c)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-o);this._w=(a-i)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(St(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xr.copy(this).projectOnVector(e),this.sub(xr)}reflect(e){return this.sub(xr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(St(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xr=new C,bo=new rt;class Rt{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Yt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Yt):Yt.fromBufferAttribute(s,a),Yt.applyMatrix4(e.matrixWorld),this.expandByPoint(Yt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ps.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ps.copy(n.boundingBox)),ps.applyMatrix4(e.matrixWorld),this.union(ps)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Yt),Yt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qi),ms.subVectors(this.max,qi),ci.subVectors(e.a,qi),hi.subVectors(e.b,qi),ui.subVectors(e.c,qi),wn.subVectors(hi,ci),An.subVectors(ui,hi),Wn.subVectors(ci,ui);let t=[0,-wn.z,wn.y,0,-An.z,An.y,0,-Wn.z,Wn.y,wn.z,0,-wn.x,An.z,0,-An.x,Wn.z,0,-Wn.x,-wn.y,wn.x,0,-An.y,An.x,0,-Wn.y,Wn.x,0];return!yr(t,ci,hi,ui,ms)||(t=[1,0,0,0,1,0,0,0,1],!yr(t,ci,hi,ui,ms))?!1:(_s.crossVectors(wn,An),t=[_s.x,_s.y,_s.z],yr(t,ci,hi,ui,ms))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(un),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const un=[new C,new C,new C,new C,new C,new C,new C,new C],Yt=new C,ps=new Rt,ci=new C,hi=new C,ui=new C,wn=new C,An=new C,Wn=new C,qi=new C,ms=new C,_s=new C,Xn=new C;function yr(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Xn.fromArray(r,s);const o=i.x*Math.abs(Xn.x)+i.y*Math.abs(Xn.y)+i.z*Math.abs(Xn.z),l=e.dot(Xn),c=t.dot(Xn),h=n.dot(Xn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const mu=new Rt,ji=new C,Mr=new C;class jt{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):mu.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ji.subVectors(e,this.center);const t=ji.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ji,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ji.copy(e.center).add(Mr)),this.expandByPoint(ji.copy(e.center).sub(Mr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const dn=new C,Sr=new C,gs=new C,Rn=new C,br=new C,vs=new C,Er=new C;class cs{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,dn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=dn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(dn.copy(this.origin).addScaledVector(this.direction,t),dn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Sr.copy(e).add(t).multiplyScalar(.5),gs.copy(t).sub(e).normalize(),Rn.copy(this.origin).sub(Sr);const s=e.distanceTo(t)*.5,a=-this.direction.dot(gs),o=Rn.dot(this.direction),l=-Rn.dot(gs),c=Rn.lengthSq(),h=Math.abs(1-a*a);let u,d,p,_;if(h>0)if(u=a*l-o,d=a*o-l,_=s*h,u>=0)if(d>=-_)if(d<=_){const v=1/h;u*=v,d*=v,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-_?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c):d<=_?(u=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Sr).addScaledVector(gs,d),p}intersectSphere(e,t){dn.subVectors(e.center,this.origin);const n=dn.dot(this.direction),i=dn.dot(dn)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,dn)!==null}intersectTriangle(e,t,n,i,s){br.subVectors(t,e),vs.subVectors(n,e),Er.crossVectors(br,vs);let a=this.direction.dot(Er),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Rn.subVectors(this.origin,e);const l=o*this.direction.dot(vs.crossVectors(Rn,vs));if(l<0)return null;const c=o*this.direction.dot(br.cross(Rn));if(c<0||l+c>a)return null;const h=-o*Rn.dot(Er);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ue{constructor(e,t,n,i,s,a,o,l,c,h,u,d,p,_,v,m){Ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,u,d,p,_,v,m)}set(e,t,n,i,s,a,o,l,c,h,u,d,p,_,v,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=i,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=_,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ue().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/di.setFromMatrixColumn(e,0).length(),s=1/di.setFromMatrixColumn(e,1).length(),a=1/di.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=a*h,p=a*u,_=o*h,v=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+_*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=_+p*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,p=l*u,_=c*h,v=c*u;t[0]=d+v*o,t[4]=_*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-_,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,p=l*u,_=c*h,v=c*u;t[0]=d-v*o,t[4]=-a*u,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*h,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,p=a*u,_=o*h,v=o*u;t[0]=l*h,t[4]=_*c-p,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=p*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,_=o*l,v=o*c;t[0]=l*h,t[4]=v-d*u,t[8]=_*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*u+_,t[10]=d-v*u}else if(e.order==="XZY"){const d=a*l,p=a*c,_=o*l,v=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=a*h,t[9]=p*u-_,t[2]=_*u-p,t[6]=o*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_u,e,gu)}lookAt(e,t,n){const i=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),Cn.crossVectors(n,Bt),Cn.lengthSq()===0&&(Math.abs(n.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),Cn.crossVectors(n,Bt)),Cn.normalize(),xs.crossVectors(Bt,Cn),i[0]=Cn.x,i[4]=xs.x,i[8]=Bt.x,i[1]=Cn.y,i[5]=xs.y,i[9]=Bt.y,i[2]=Cn.z,i[6]=xs.z,i[10]=Bt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],_=n[2],v=n[6],m=n[10],f=n[14],S=n[3],x=n[7],T=n[11],L=n[15],A=i[0],b=i[4],D=i[8],g=i[12],y=i[1],N=i[5],B=i[9],$=i[13],R=i[2],I=i[6],U=i[10],X=i[14],q=i[3],j=i[7],Y=i[11],J=i[15];return s[0]=a*A+o*y+l*R+c*q,s[4]=a*b+o*N+l*I+c*j,s[8]=a*D+o*B+l*U+c*Y,s[12]=a*g+o*$+l*X+c*J,s[1]=h*A+u*y+d*R+p*q,s[5]=h*b+u*N+d*I+p*j,s[9]=h*D+u*B+d*U+p*Y,s[13]=h*g+u*$+d*X+p*J,s[2]=_*A+v*y+m*R+f*q,s[6]=_*b+v*N+m*I+f*j,s[10]=_*D+v*B+m*U+f*Y,s[14]=_*g+v*$+m*X+f*J,s[3]=S*A+x*y+T*R+L*q,s[7]=S*b+x*N+T*I+L*j,s[11]=S*D+x*B+T*U+L*Y,s[15]=S*g+x*$+T*X+L*J,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],p=e[14],_=e[3],v=e[7],m=e[11],f=e[15];return _*(+s*l*u-i*c*u-s*o*d+n*c*d+i*o*p-n*l*p)+v*(+t*l*p-t*c*d+s*a*d-i*a*p+i*c*h-s*l*h)+m*(+t*c*u-t*o*p-s*a*u+n*a*p+s*o*h-n*c*h)+f*(-i*o*h-t*l*u+t*o*d+i*a*u-n*a*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],p=e[11],_=e[12],v=e[13],m=e[14],f=e[15],S=u*m*c-v*d*c+v*l*p-o*m*p-u*l*f+o*d*f,x=_*d*c-h*m*c-_*l*p+a*m*p+h*l*f-a*d*f,T=h*v*c-_*u*c+_*o*p-a*v*p-h*o*f+a*u*f,L=_*u*l-h*v*l-_*o*d+a*v*d+h*o*m-a*u*m,A=t*S+n*x+i*T+s*L;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/A;return e[0]=S*b,e[1]=(v*d*s-u*m*s-v*i*p+n*m*p+u*i*f-n*d*f)*b,e[2]=(o*m*s-v*l*s+v*i*c-n*m*c-o*i*f+n*l*f)*b,e[3]=(u*l*s-o*d*s-u*i*c+n*d*c+o*i*p-n*l*p)*b,e[4]=x*b,e[5]=(h*m*s-_*d*s+_*i*p-t*m*p-h*i*f+t*d*f)*b,e[6]=(_*l*s-a*m*s-_*i*c+t*m*c+a*i*f-t*l*f)*b,e[7]=(a*d*s-h*l*s+h*i*c-t*d*c-a*i*p+t*l*p)*b,e[8]=T*b,e[9]=(_*u*s-h*v*s-_*n*p+t*v*p+h*n*f-t*u*f)*b,e[10]=(a*v*s-_*o*s+_*n*c-t*v*c-a*n*f+t*o*f)*b,e[11]=(h*o*s-a*u*s-h*n*c+t*u*c+a*n*p-t*o*p)*b,e[12]=L*b,e[13]=(h*v*i-_*u*i+_*n*d-t*v*d-h*n*m+t*u*m)*b,e[14]=(_*o*i-a*v*i-_*n*l+t*v*l+a*n*m-t*o*m)*b,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*d+t*o*d)*b,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,p=s*h,_=s*u,v=a*h,m=a*u,f=o*u,S=l*c,x=l*h,T=l*u,L=n.x,A=n.y,b=n.z;return i[0]=(1-(v+f))*L,i[1]=(p+T)*L,i[2]=(_-x)*L,i[3]=0,i[4]=(p-T)*A,i[5]=(1-(d+f))*A,i[6]=(m+S)*A,i[7]=0,i[8]=(_+x)*b,i[9]=(m-S)*b,i[10]=(1-(d+v))*b,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=di.set(i[0],i[1],i[2]).length();const a=di.set(i[4],i[5],i[6]).length(),o=di.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],$t.copy(this);const c=1/s,h=1/a,u=1/o;return $t.elements[0]*=c,$t.elements[1]*=c,$t.elements[2]*=c,$t.elements[4]*=h,$t.elements[5]*=h,$t.elements[6]*=h,$t.elements[8]*=u,$t.elements[9]*=u,$t.elements[10]*=u,t.setFromRotationMatrix($t),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=Mn){const l=this.elements,c=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let p,_;if(o===Mn)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===Js)p=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=Mn){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(a-s),d=(t+e)*c,p=(n+i)*h;let _,v;if(o===Mn)_=(a+s)*u,v=-2*u;else if(o===Js)_=s*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const di=new C,$t=new Ue,_u=new C(0,0,0),gu=new C(1,1,1),Cn=new C,xs=new C,Bt=new C,Eo=new Ue,To=new rt;class si{constructor(e=0,t=0,n=0,i=si.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(St(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-St(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(St(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-St(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(St(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-St(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Eo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Eo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return To.setFromEuler(this),this.setFromQuaternion(To,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}si.DEFAULT_ORDER="XYZ";class Ma{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let vu=0;const wo=new C,fi=new rt,fn=new Ue,ys=new C,Yi=new C,xu=new C,yu=new rt,Ao=new C(1,0,0),Ro=new C(0,1,0),Co=new C(0,0,1),Mu={type:"added"},Su={type:"removed"};class ot extends ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vu++}),this.uuid=en(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ot.DEFAULT_UP.clone();const e=new C,t=new si,n=new rt,i=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ue},normalMatrix:{value:new Ge}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=ot.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ma,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fi.setFromAxisAngle(e,t),this.quaternion.multiply(fi),this}rotateOnWorldAxis(e,t){return fi.setFromAxisAngle(e,t),this.quaternion.premultiply(fi),this}rotateX(e){return this.rotateOnAxis(Ao,e)}rotateY(e){return this.rotateOnAxis(Ro,e)}rotateZ(e){return this.rotateOnAxis(Co,e)}translateOnAxis(e,t){return wo.copy(e).applyQuaternion(this.quaternion),this.position.add(wo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ao,e)}translateY(e){return this.translateOnAxis(Ro,e)}translateZ(e){return this.translateOnAxis(Co,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ys.copy(e):ys.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Yi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fn.lookAt(Yi,ys,this.up):fn.lookAt(ys,Yi,this.up),this.quaternion.setFromRotationMatrix(fn),i&&(fn.extractRotation(i.matrixWorld),fi.setFromRotationMatrix(fn),this.quaternion.premultiply(fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Mu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Su)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(fn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,e,xu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,yu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++){const o=i[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ot.DEFAULT_UP=new C(0,1,0);ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Kt=new C,pn=new C,Tr=new C,mn=new C,pi=new C,mi=new C,Lo=new C,wr=new C,Ar=new C,Rr=new C;let Ms=!1;class Zt{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Kt.subVectors(e,t),i.cross(Kt);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Kt.subVectors(i,t),pn.subVectors(n,t),Tr.subVectors(e,t);const a=Kt.dot(Kt),o=Kt.dot(pn),l=Kt.dot(Tr),c=pn.dot(pn),h=pn.dot(Tr),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,p=(c*l-o*h)*d,_=(a*h-o*l)*d;return s.set(1-p-_,_,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,mn)===null?!1:mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getUV(e,t,n,i,s,a,o,l){return Ms===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ms=!0),this.getInterpolation(e,t,n,i,s,a,o,l)}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,mn.x),l.addScaledVector(a,mn.y),l.addScaledVector(o,mn.z),l)}static isFrontFacing(e,t,n,i){return Kt.subVectors(n,t),pn.subVectors(e,t),Kt.cross(pn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kt.subVectors(this.c,this.b),pn.subVectors(this.a,this.b),Kt.cross(pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Zt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Zt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return Ms===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ms=!0),Zt.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}getInterpolation(e,t,n,i,s){return Zt.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Zt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Zt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;pi.subVectors(i,n),mi.subVectors(s,n),wr.subVectors(e,n);const l=pi.dot(wr),c=mi.dot(wr);if(l<=0&&c<=0)return t.copy(n);Ar.subVectors(e,i);const h=pi.dot(Ar),u=mi.dot(Ar);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(pi,a);Rr.subVectors(e,s);const p=pi.dot(Rr),_=mi.dot(Rr);if(_>=0&&p<=_)return t.copy(s);const v=p*c-l*_;if(v<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(n).addScaledVector(mi,o);const m=h*_-p*u;if(m<=0&&u-h>=0&&p-_>=0)return Lo.subVectors(s,i),o=(u-h)/(u-h+(p-_)),t.copy(i).addScaledVector(Lo,o);const f=1/(m+v+d);return a=v*f,o=d*f,t.copy(n).addScaledVector(pi,a).addScaledVector(mi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const lc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},Ss={h:0,s:0,l:0};function Cr(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Ae{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ye){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ke.workingColorSpace){if(e=ya(e,1),t=St(t,0,1),n=St(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Cr(a,s,e+1/3),this.g=Cr(a,s,e),this.b=Cr(a,s,e-1/3)}return Ke.toWorkingColorSpace(this,i),this}setStyle(e,t=Ye){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ye){const n=lc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Li(e.r),this.g=Li(e.g),this.b=Li(e.b),this}copyLinearToSRGB(e){return this.r=gr(e.r),this.g=gr(e.g),this.b=gr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ye){return Ke.fromWorkingColorSpace(wt.copy(this),e),Math.round(St(wt.r*255,0,255))*65536+Math.round(St(wt.g*255,0,255))*256+Math.round(St(wt.b*255,0,255))}getHexString(e=Ye){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(wt.copy(this),t);const n=wt.r,i=wt.g,s=wt.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(wt.copy(this),t),e.r=wt.r,e.g=wt.g,e.b=wt.b,e}getStyle(e=Ye){Ke.fromWorkingColorSpace(wt.copy(this),e);const t=wt.r,n=wt.g,i=wt.b;return e!==Ye?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ln),this.setHSL(Ln.h+e,Ln.s+t,Ln.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ln),e.getHSL(Ss);const n=is(Ln.h,Ss.h,t),i=is(Ln.s,Ss.s,t),s=is(Ln.l,Ss.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wt=new Ae;Ae.NAMES=lc;let bu=0;class on extends ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bu++}),this.uuid=en(),this.name="",this.type="Material",this.blending=Ci,this.side=qt,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zr,this.blendDst=Jr,this.blendEquation=Jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ae(0,0,0),this.blendAlpha=0,this.depthFunc=Xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=go,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=oi,this.stencilZFail=oi,this.stencilZPass=oi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ci&&(n.blending=this.blending),this.side!==qt&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Zr&&(n.blendSrc=this.blendSrc),this.blendDst!==Jr&&(n.blendDst=this.blendDst),this.blendEquation!==Jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Xs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==go&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==oi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==oi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==oi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ht extends on{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Hl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xn=Eu();function Eu(){const r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}function Tu(r){Math.abs(r)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),r=St(r,-65504,65504),xn.floatView[0]=r;const e=xn.uint32View[0],t=e>>23&511;return xn.baseTable[t]+((e&8388607)>>xn.shiftTable[t])}function wu(r){const e=r>>10;return xn.uint32View[0]=xn.mantissaTable[xn.offsetTable[e]+(r&1023)]+xn.exponentTable[e],xn.floatView[0]}const bs={toHalfFloat:Tu,fromHalfFloat:wu},ft=new C,Es=new Se;class bt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=na,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Xt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Es.fromBufferAttribute(this,t),Es.applyMatrix3(e),this.setXY(t,Es.x,Es.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix3(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix4(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyNormalMatrix(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.transformDirection(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=rn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Qe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=rn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=rn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=rn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=rn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),i=Qe(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),i=Qe(i,this.array),s=Qe(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==na&&(e.usage=this.usage),e}}class cc extends bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class hc extends bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class bn extends bt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Au=0;const Vt=new Ue,Lr=new ot,_i=new C,zt=new Rt,$i=new Rt,yt=new C;class tn extends ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Au++}),this.uuid=en(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ic(e)?hc:cc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ge().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vt.makeRotationFromQuaternion(e),this.applyMatrix4(Vt),this}rotateX(e){return Vt.makeRotationX(e),this.applyMatrix4(Vt),this}rotateY(e){return Vt.makeRotationY(e),this.applyMatrix4(Vt),this}rotateZ(e){return Vt.makeRotationZ(e),this.applyMatrix4(Vt),this}translate(e,t,n){return Vt.makeTranslation(e,t,n),this.applyMatrix4(Vt),this}scale(e,t,n){return Vt.makeScale(e,t,n),this.applyMatrix4(Vt),this}lookAt(e){return Lr.lookAt(e),Lr.updateMatrix(),this.applyMatrix4(Lr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_i).negate(),this.translate(_i.x,_i.y,_i.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new bn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];zt.setFromBufferAttribute(s),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,zt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,zt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(zt.min),this.boundingBox.expandByPoint(zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(zt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];$i.setFromBufferAttribute(o),this.morphTargetsRelative?(yt.addVectors(zt.min,$i.min),zt.expandByPoint(yt),yt.addVectors(zt.max,$i.max),zt.expandByPoint(yt)):(zt.expandByPoint($i.min),zt.expandByPoint($i.max))}zt.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)yt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(yt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)yt.fromBufferAttribute(o,c),l&&(_i.fromBufferAttribute(e,c),yt.add(_i)),i=Math.max(i,n.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,a=t.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let y=0;y<o;y++)c[y]=new C,h[y]=new C;const u=new C,d=new C,p=new C,_=new Se,v=new Se,m=new Se,f=new C,S=new C;function x(y,N,B){u.fromArray(i,y*3),d.fromArray(i,N*3),p.fromArray(i,B*3),_.fromArray(a,y*2),v.fromArray(a,N*2),m.fromArray(a,B*2),d.sub(u),p.sub(u),v.sub(_),m.sub(_);const $=1/(v.x*m.y-m.x*v.y);isFinite($)&&(f.copy(d).multiplyScalar(m.y).addScaledVector(p,-v.y).multiplyScalar($),S.copy(p).multiplyScalar(v.x).addScaledVector(d,-m.x).multiplyScalar($),c[y].add(f),c[N].add(f),c[B].add(f),h[y].add(S),h[N].add(S),h[B].add(S))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let y=0,N=T.length;y<N;++y){const B=T[y],$=B.start,R=B.count;for(let I=$,U=$+R;I<U;I+=3)x(n[I+0],n[I+1],n[I+2])}const L=new C,A=new C,b=new C,D=new C;function g(y){b.fromArray(s,y*3),D.copy(b);const N=c[y];L.copy(N),L.sub(b.multiplyScalar(b.dot(N))).normalize(),A.crossVectors(D,N);const $=A.dot(h[y])<0?-1:1;l[y*4]=L.x,l[y*4+1]=L.y,l[y*4+2]=L.z,l[y*4+3]=$}for(let y=0,N=T.length;y<N;++y){const B=T[y],$=B.start,R=B.count;for(let I=$,U=$+R;I<U;I+=3)g(n[I+0]),g(n[I+1]),g(n[I+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new bt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const i=new C,s=new C,a=new C,o=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let d=0,p=e.count;d<p;d+=3){const _=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let p=0,_=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*h;for(let f=0;f<h;f++)d[_++]=c[p++]}return new bt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new tn,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],p=e(d,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Io=new Ue,qn=new cs,Ts=new jt,Po=new C,gi=new C,vi=new C,xi=new C,Ir=new C,ws=new C,As=new Se,Rs=new Se,Cs=new Se,Do=new C,No=new C,Uo=new C,Ls=new C,Is=new C;class Xe extends ot{constructor(e=new tn,t=new ht){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){ws.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(Ir.fromBufferAttribute(u,e),a?ws.addScaledVector(Ir,h):ws.addScaledVector(Ir.sub(t),h))}t.add(ws)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(s),qn.copy(e.ray).recast(e.near),!(Ts.containsPoint(qn.origin)===!1&&(qn.intersectSphere(Ts,Po)===null||qn.origin.distanceToSquared(Po)>(e.far-e.near)**2))&&(Io.copy(s).invert(),qn.copy(e.ray).applyMatrix4(Io),!(n.boundingBox!==null&&qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,qn)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,v=d.length;_<v;_++){const m=d[_],f=a[m.materialIndex],S=Math.max(m.start,p.start),x=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let T=S,L=x;T<L;T+=3){const A=o.getX(T),b=o.getX(T+1),D=o.getX(T+2);i=Ps(this,f,e,n,c,h,u,A,b,D),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=_,f=v;m<f;m+=3){const S=o.getX(m),x=o.getX(m+1),T=o.getX(m+2);i=Ps(this,a,e,n,c,h,u,S,x,T),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,v=d.length;_<v;_++){const m=d[_],f=a[m.materialIndex],S=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let T=S,L=x;T<L;T+=3){const A=T,b=T+1,D=T+2;i=Ps(this,f,e,n,c,h,u,A,b,D),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=_,f=v;m<f;m+=3){const S=m,x=m+1,T=m+2;i=Ps(this,a,e,n,c,h,u,S,x,T),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Ru(r,e,t,n,i,s,a,o){let l;if(e.side===Ot?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===qt,o),l===null)return null;Is.copy(o),Is.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Is);return c<t.near||c>t.far?null:{distance:c,point:Is.clone(),object:r}}function Ps(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,gi),r.getVertexPosition(l,vi),r.getVertexPosition(c,xi);const h=Ru(r,e,t,n,gi,vi,xi,Ls);if(h){i&&(As.fromBufferAttribute(i,o),Rs.fromBufferAttribute(i,l),Cs.fromBufferAttribute(i,c),h.uv=Zt.getInterpolation(Ls,gi,vi,xi,As,Rs,Cs,new Se)),s&&(As.fromBufferAttribute(s,o),Rs.fromBufferAttribute(s,l),Cs.fromBufferAttribute(s,c),h.uv1=Zt.getInterpolation(Ls,gi,vi,xi,As,Rs,Cs,new Se),h.uv2=h.uv1),a&&(Do.fromBufferAttribute(a,o),No.fromBufferAttribute(a,l),Uo.fromBufferAttribute(a,c),h.normal=Zt.getInterpolation(Ls,gi,vi,xi,Do,No,Uo,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new C,materialIndex:0};Zt.getNormal(gi,vi,xi,u.normal),h.face=u}return h}class dt extends tn{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,p=0;_("z","y","x",-1,-1,n,t,e,a,s,0),_("z","y","x",1,-1,n,t,-e,a,s,1),_("x","z","y",1,1,e,n,t,i,a,2),_("x","z","y",1,-1,e,n,-t,i,a,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new bn(c,3)),this.setAttribute("normal",new bn(h,3)),this.setAttribute("uv",new bn(u,2));function _(v,m,f,S,x,T,L,A,b,D,g){const y=T/b,N=L/D,B=T/2,$=L/2,R=A/2,I=b+1,U=D+1;let X=0,q=0;const j=new C;for(let Y=0;Y<U;Y++){const J=Y*N-$;for(let Z=0;Z<I;Z++){const F=Z*y-B;j[v]=F*S,j[m]=J*x,j[f]=R,c.push(j.x,j.y,j.z),j[v]=0,j[m]=0,j[f]=A>0?1:-1,h.push(j.x,j.y,j.z),u.push(Z/b),u.push(1-Y/D),X+=1}}for(let Y=0;Y<D;Y++)for(let J=0;J<b;J++){const Z=d+J+I*Y,F=d+J+I*(Y+1),K=d+(J+1)+I*(Y+1),oe=d+(J+1)+I*Y;l.push(Z,F,oe),l.push(F,K,oe),q+=6}o.addGroup(p,q,g),p+=q,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Oi(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Pt(r){const e={};for(let t=0;t<r.length;t++){const n=Oi(r[t]);for(const i in n)e[i]=n[i]}return e}function Cu(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function uc(r){return r.getRenderTarget()===null?r.outputColorSpace:Ke.workingColorSpace}const Lu={clone:Oi,merge:Pt};var Iu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ln extends on{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Iu,this.fragmentShader=Pu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Oi(e.uniforms),this.uniformsGroups=Cu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class dc extends ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue,this.coordinateSystem=Mn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Dt extends dc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Fi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ns*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Fi*2*Math.atan(Math.tan(ns*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ns*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const yi=-90,Mi=1;class Du extends ot{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Dt(yi,Mi,e,t);i.layers=this.layers,this.add(i);const s=new Dt(yi,Mi,e,t);s.layers=this.layers,this.add(s);const a=new Dt(yi,Mi,e,t);a.layers=this.layers,this.add(a);const o=new Dt(yi,Mi,e,t);o.layers=this.layers,this.add(o);const l=new Dt(yi,Mi,e,t);l.layers=this.layers,this.add(l);const c=new Dt(yi,Mi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Mn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Js)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class fc extends mt{constructor(e,t,n,i,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Pi,super(e,t,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Nu extends En{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(ss("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ii?Ye:Wt),this.texture=new fc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:je}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new dt(5,5,5),s=new ln({name:"CubemapFromEquirect",uniforms:Oi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ot,blending:Fn});s.uniforms.tEquirect.value=t;const a=new Xe(i,s),o=t.minFilter;return t.minFilter===zn&&(t.minFilter=je),new Du(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}const Pr=new C,Uu=new C,Fu=new Ge;class Kn{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Pr.subVectors(n,t).cross(Uu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Pr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Fu.getNormalMatrix(e),i=this.coplanarPoint(Pr).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jn=new jt,Ds=new C;class Sa{constructor(e=new Kn,t=new Kn,n=new Kn,i=new Kn,s=new Kn,a=new Kn){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Mn){const n=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],p=i[8],_=i[9],v=i[10],m=i[11],f=i[12],S=i[13],x=i[14],T=i[15];if(n[0].setComponents(l-s,d-c,m-p,T-f).normalize(),n[1].setComponents(l+s,d+c,m+p,T+f).normalize(),n[2].setComponents(l+a,d+h,m+_,T+S).normalize(),n[3].setComponents(l-a,d-h,m-_,T-S).normalize(),n[4].setComponents(l-o,d-u,m-v,T-x).normalize(),t===Mn)n[5].setComponents(l+o,d+u,m+v,T+x).normalize();else if(t===Js)n[5].setComponents(o,u,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jn)}intersectsSprite(e){return jn.center.set(0,0,0),jn.radius=.7071067811865476,jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(jn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Ds.x=i.normal.x>0?e.max.x:e.min.x,Ds.y=i.normal.y>0?e.max.y:e.min.y,Ds.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ds)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function pc(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Ou(r,e){const t=e.isWebGL2,n=new WeakMap;function i(c,h){const u=c.array,d=c.usage,p=u.byteLength,_=r.createBuffer();r.bindBuffer(h,_),r.bufferData(h,u,d),c.onUploadCallback();let v;if(u instanceof Float32Array)v=r.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=r.UNSIGNED_SHORT;else if(u instanceof Int16Array)v=r.SHORT;else if(u instanceof Uint32Array)v=r.UNSIGNED_INT;else if(u instanceof Int32Array)v=r.INT;else if(u instanceof Int8Array)v=r.BYTE;else if(u instanceof Uint8Array)v=r.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)v=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:_,type:v,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:p}}function s(c,h,u){const d=h.array,p=h._updateRange,_=h.updateRanges;if(r.bindBuffer(u,c),p.count===-1&&_.length===0&&r.bufferSubData(u,0,d),_.length!==0){for(let v=0,m=_.length;v<m;v++){const f=_[v];t?r.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d,f.start,f.count):r.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}p.count!==-1&&(t?r.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):r.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(r.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);if(u===void 0)n.set(c,i(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(u.buffer,c,h),u.version=c.version}}return{get:a,remove:o,update:l}}class Ut extends tn{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,p=[],_=[],v=[],m=[];for(let f=0;f<h;f++){const S=f*d-a;for(let x=0;x<c;x++){const T=x*u-s;_.push(T,-S,0),v.push(0,0,1),m.push(x/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let S=0;S<o;S++){const x=S+c*f,T=S+c*(f+1),L=S+1+c*(f+1),A=S+1+c*f;p.push(x,T,A),p.push(T,L,A)}this.setIndex(p),this.setAttribute("position",new bn(_,3)),this.setAttribute("normal",new bn(v,3)),this.setAttribute("uv",new bn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ut(e.width,e.height,e.widthSegments,e.heightSegments)}}var ku=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,zu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Gu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qu=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ju=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Yu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$u=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ku=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ju=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Qu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,ed=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,td=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,id=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,rd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ad=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,od=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ld=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,cd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,hd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ud=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pd="gl_FragColor = linearToOutputTexel( gl_FragColor );",md=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,_d=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,gd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Md=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ed=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Td=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,wd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Ad=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ld=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Id=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Pd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Dd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Nd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ud=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Fd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Od=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,kd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Bd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,zd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Wd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Xd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Yd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$d=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Kd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Qd=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,ef=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,tf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,af=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,of=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,lf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,uf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,df=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ff=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,pf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_f=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Mf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Sf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,bf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ef=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,wf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Af=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Rf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,If=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Df=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ff=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Of=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Xf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,qf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,jf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$f=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Qf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,np=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ip=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,rp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ap=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,op=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,cp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,up=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,fp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,_p=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ke={alphahash_fragment:ku,alphahash_pars_fragment:Bu,alphamap_fragment:zu,alphamap_pars_fragment:Hu,alphatest_fragment:Vu,alphatest_pars_fragment:Gu,aomap_fragment:Wu,aomap_pars_fragment:Xu,batching_pars_vertex:qu,batching_vertex:ju,begin_vertex:Yu,beginnormal_vertex:$u,bsdfs:Ku,iridescence_fragment:Zu,bumpmap_pars_fragment:Ju,clipping_planes_fragment:Qu,clipping_planes_pars_fragment:ed,clipping_planes_pars_vertex:td,clipping_planes_vertex:nd,color_fragment:id,color_pars_fragment:sd,color_pars_vertex:rd,color_vertex:ad,common:od,cube_uv_reflection_fragment:ld,defaultnormal_vertex:cd,displacementmap_pars_vertex:hd,displacementmap_vertex:ud,emissivemap_fragment:dd,emissivemap_pars_fragment:fd,colorspace_fragment:pd,colorspace_pars_fragment:md,envmap_fragment:_d,envmap_common_pars_fragment:gd,envmap_pars_fragment:vd,envmap_pars_vertex:xd,envmap_physical_pars_fragment:Id,envmap_vertex:yd,fog_vertex:Md,fog_pars_vertex:Sd,fog_fragment:bd,fog_pars_fragment:Ed,gradientmap_pars_fragment:Td,lightmap_fragment:wd,lightmap_pars_fragment:Ad,lights_lambert_fragment:Rd,lights_lambert_pars_fragment:Cd,lights_pars_begin:Ld,lights_toon_fragment:Pd,lights_toon_pars_fragment:Dd,lights_phong_fragment:Nd,lights_phong_pars_fragment:Ud,lights_physical_fragment:Fd,lights_physical_pars_fragment:Od,lights_fragment_begin:kd,lights_fragment_maps:Bd,lights_fragment_end:zd,logdepthbuf_fragment:Hd,logdepthbuf_pars_fragment:Vd,logdepthbuf_pars_vertex:Gd,logdepthbuf_vertex:Wd,map_fragment:Xd,map_pars_fragment:qd,map_particle_fragment:jd,map_particle_pars_fragment:Yd,metalnessmap_fragment:$d,metalnessmap_pars_fragment:Kd,morphcolor_vertex:Zd,morphnormal_vertex:Jd,morphtarget_pars_vertex:Qd,morphtarget_vertex:ef,normal_fragment_begin:tf,normal_fragment_maps:nf,normal_pars_fragment:sf,normal_pars_vertex:rf,normal_vertex:af,normalmap_pars_fragment:of,clearcoat_normal_fragment_begin:lf,clearcoat_normal_fragment_maps:cf,clearcoat_pars_fragment:hf,iridescence_pars_fragment:uf,opaque_fragment:df,packing:ff,premultiplied_alpha_fragment:pf,project_vertex:mf,dithering_fragment:_f,dithering_pars_fragment:gf,roughnessmap_fragment:vf,roughnessmap_pars_fragment:xf,shadowmap_pars_fragment:yf,shadowmap_pars_vertex:Mf,shadowmap_vertex:Sf,shadowmask_pars_fragment:bf,skinbase_vertex:Ef,skinning_pars_vertex:Tf,skinning_vertex:wf,skinnormal_vertex:Af,specularmap_fragment:Rf,specularmap_pars_fragment:Cf,tonemapping_fragment:Lf,tonemapping_pars_fragment:If,transmission_fragment:Pf,transmission_pars_fragment:Df,uv_pars_fragment:Nf,uv_pars_vertex:Uf,uv_vertex:Ff,worldpos_vertex:Of,background_vert:kf,background_frag:Bf,backgroundCube_vert:zf,backgroundCube_frag:Hf,cube_vert:Vf,cube_frag:Gf,depth_vert:Wf,depth_frag:Xf,distanceRGBA_vert:qf,distanceRGBA_frag:jf,equirect_vert:Yf,equirect_frag:$f,linedashed_vert:Kf,linedashed_frag:Zf,meshbasic_vert:Jf,meshbasic_frag:Qf,meshlambert_vert:ep,meshlambert_frag:tp,meshmatcap_vert:np,meshmatcap_frag:ip,meshnormal_vert:sp,meshnormal_frag:rp,meshphong_vert:ap,meshphong_frag:op,meshphysical_vert:lp,meshphysical_frag:cp,meshtoon_vert:hp,meshtoon_frag:up,points_vert:dp,points_frag:fp,shadow_vert:pp,shadow_frag:mp,sprite_vert:_p,sprite_frag:gp},ae={common:{diffuse:{value:new Ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Ae(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},sn={basic:{uniforms:Pt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:Pt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ae(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:Pt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ae(0)},specular:{value:new Ae(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:Pt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new Ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:Pt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new Ae(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:Pt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:Pt([ae.points,ae.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:Pt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:Pt([ae.common,ae.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:Pt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:Pt([ae.sprite,ae.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:Pt([ae.common,ae.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:Pt([ae.lights,ae.fog,{color:{value:new Ae(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};sn.physical={uniforms:Pt([sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Ae(0)},specularColor:{value:new Ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};const Ns={r:0,b:0,g:0};function vp(r,e,t,n,i,s,a){const o=new Ae(0);let l=s===!0?0:1,c,h,u=null,d=0,p=null;function _(m,f){let S=!1,x=f.isScene===!0?f.background:null;x&&x.isTexture&&(x=(f.backgroundBlurriness>0?t:e).get(x)),x===null?v(o,l):x&&x.isColor&&(v(x,1),S=!0);const T=r.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||S)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),x&&(x.isCubeTexture||x.mapping===er)?(h===void 0&&(h=new Xe(new dt(1,1,1),new ln({name:"BackgroundCubeMaterial",uniforms:Oi(sn.backgroundCube.uniforms),vertexShader:sn.backgroundCube.vertexShader,fragmentShader:sn.backgroundCube.fragmentShader,side:Ot,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,A,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=Ke.getTransfer(x.colorSpace)!==st,(u!==x||d!==x.version||p!==r.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,p=r.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Xe(new Ut(2,2),new ln({name:"BackgroundMaterial",uniforms:Oi(sn.background.uniforms),vertexShader:sn.background.vertexShader,fragmentShader:sn.background.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(x.colorSpace)!==st,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||p!==r.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,p=r.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function v(m,f){m.getRGB(Ns,uc(r)),n.buffers.color.setClear(Ns.r,Ns.g,Ns.b,f,a)}return{getClearColor:function(){return o},setClearColor:function(m,f=1){o.set(m),l=f,v(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,v(o,l)},render:_}}function xp(r,e,t,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=m(null);let c=l,h=!1;function u(R,I,U,X,q){let j=!1;if(a){const Y=v(X,U,I);c!==Y&&(c=Y,p(c.object)),j=f(R,X,U,q),j&&S(R,X,U,q)}else{const Y=I.wireframe===!0;(c.geometry!==X.id||c.program!==U.id||c.wireframe!==Y)&&(c.geometry=X.id,c.program=U.id,c.wireframe=Y,j=!0)}q!==null&&t.update(q,r.ELEMENT_ARRAY_BUFFER),(j||h)&&(h=!1,D(R,I,U,X),q!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function d(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function p(R){return n.isWebGL2?r.bindVertexArray(R):s.bindVertexArrayOES(R)}function _(R){return n.isWebGL2?r.deleteVertexArray(R):s.deleteVertexArrayOES(R)}function v(R,I,U){const X=U.wireframe===!0;let q=o[R.id];q===void 0&&(q={},o[R.id]=q);let j=q[I.id];j===void 0&&(j={},q[I.id]=j);let Y=j[X];return Y===void 0&&(Y=m(d()),j[X]=Y),Y}function m(R){const I=[],U=[],X=[];for(let q=0;q<i;q++)I[q]=0,U[q]=0,X[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:U,attributeDivisors:X,object:R,attributes:{},index:null}}function f(R,I,U,X){const q=c.attributes,j=I.attributes;let Y=0;const J=U.getAttributes();for(const Z in J)if(J[Z].location>=0){const K=q[Z];let oe=j[Z];if(oe===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(oe=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(oe=R.instanceColor)),K===void 0||K.attribute!==oe||oe&&K.data!==oe.data)return!0;Y++}return c.attributesNum!==Y||c.index!==X}function S(R,I,U,X){const q={},j=I.attributes;let Y=0;const J=U.getAttributes();for(const Z in J)if(J[Z].location>=0){let K=j[Z];K===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(K=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(K=R.instanceColor));const oe={};oe.attribute=K,K&&K.data&&(oe.data=K.data),q[Z]=oe,Y++}c.attributes=q,c.attributesNum=Y,c.index=X}function x(){const R=c.newAttributes;for(let I=0,U=R.length;I<U;I++)R[I]=0}function T(R){L(R,0)}function L(R,I){const U=c.newAttributes,X=c.enabledAttributes,q=c.attributeDivisors;U[R]=1,X[R]===0&&(r.enableVertexAttribArray(R),X[R]=1),q[R]!==I&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](R,I),q[R]=I)}function A(){const R=c.newAttributes,I=c.enabledAttributes;for(let U=0,X=I.length;U<X;U++)I[U]!==R[U]&&(r.disableVertexAttribArray(U),I[U]=0)}function b(R,I,U,X,q,j,Y){Y===!0?r.vertexAttribIPointer(R,I,U,q,j):r.vertexAttribPointer(R,I,U,X,q,j)}function D(R,I,U,X){if(n.isWebGL2===!1&&(R.isInstancedMesh||X.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const q=X.attributes,j=U.getAttributes(),Y=I.defaultAttributeValues;for(const J in j){const Z=j[J];if(Z.location>=0){let F=q[J];if(F===void 0&&(J==="instanceMatrix"&&R.instanceMatrix&&(F=R.instanceMatrix),J==="instanceColor"&&R.instanceColor&&(F=R.instanceColor)),F!==void 0){const K=F.normalized,oe=F.itemSize,ie=t.get(F);if(ie===void 0)continue;const le=ie.buffer,pe=ie.type,G=ie.bytesPerElement,se=n.isWebGL2===!0&&(pe===r.INT||pe===r.UNSIGNED_INT||F.gpuType===Xl);if(F.isInterleavedBufferAttribute){const he=F.data,O=he.stride,xe=F.offset;if(he.isInstancedInterleavedBuffer){for(let _e=0;_e<Z.locationSize;_e++)L(Z.location+_e,he.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let _e=0;_e<Z.locationSize;_e++)T(Z.location+_e);r.bindBuffer(r.ARRAY_BUFFER,le);for(let _e=0;_e<Z.locationSize;_e++)b(Z.location+_e,oe/Z.locationSize,pe,K,O*G,(xe+oe/Z.locationSize*_e)*G,se)}else{if(F.isInstancedBufferAttribute){for(let he=0;he<Z.locationSize;he++)L(Z.location+he,F.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let he=0;he<Z.locationSize;he++)T(Z.location+he);r.bindBuffer(r.ARRAY_BUFFER,le);for(let he=0;he<Z.locationSize;he++)b(Z.location+he,oe/Z.locationSize,pe,K,oe*G,oe/Z.locationSize*he*G,se)}}else if(Y!==void 0){const K=Y[J];if(K!==void 0)switch(K.length){case 2:r.vertexAttrib2fv(Z.location,K);break;case 3:r.vertexAttrib3fv(Z.location,K);break;case 4:r.vertexAttrib4fv(Z.location,K);break;default:r.vertexAttrib1fv(Z.location,K)}}}}A()}function g(){B();for(const R in o){const I=o[R];for(const U in I){const X=I[U];for(const q in X)_(X[q].object),delete X[q];delete I[U]}delete o[R]}}function y(R){if(o[R.id]===void 0)return;const I=o[R.id];for(const U in I){const X=I[U];for(const q in X)_(X[q].object),delete X[q];delete I[U]}delete o[R.id]}function N(R){for(const I in o){const U=o[I];if(U[R.id]===void 0)continue;const X=U[R.id];for(const q in X)_(X[q].object),delete X[q];delete U[R.id]}}function B(){$(),h=!0,c!==l&&(c=l,p(c.object))}function $(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:B,resetDefaultState:$,dispose:g,releaseStatesOfGeometry:y,releaseStatesOfProgram:N,initAttributes:x,enableAttribute:T,disableUnusedAttributes:A}}function yp(r,e,t,n){const i=n.isWebGL2;let s;function a(h){s=h}function o(h,u){r.drawArrays(s,h,u),t.update(u,s,1)}function l(h,u,d){if(d===0)return;let p,_;if(i)p=r,_="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[_](s,h,u,d),t.update(u,s,d)}function c(h,u,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<d;_++)this.render(h[_],u[_]);else{p.multiDrawArraysWEBGL(s,h,0,u,0,d);let _=0;for(let v=0;v<d;v++)_+=u[v];t.update(_,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Mp(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(b){if(b==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_TEXTURE_SIZE),_=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),v=r.getParameter(r.MAX_VERTEX_ATTRIBS),m=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),f=r.getParameter(r.MAX_VARYING_VECTORS),S=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,T=a||e.has("OES_texture_float"),L=x&&T,A=a?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:_,maxAttributes:v,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:S,vertexTextures:x,floatFragmentTextures:T,floatVertexTextures:L,maxSamples:A}}function Sp(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Kn,o=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||i;return i=d,n=u.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){const _=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,f=r.get(u);if(!i||_===null||_.length===0||s&&!m)s?h(null):c();else{const S=s?0:n,x=S*4;let T=f.clippingState||null;l.value=T,T=h(_,d,x,p);for(let L=0;L!==x;++L)T[L]=t[L];f.clippingState=T,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,p,_){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,_!==!0||m===null){const f=p+v*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let x=0,T=p;x!==v;++x,T+=4)a.copy(u[x]).applyMatrix4(S,o),a.normal.toArray(m,T),m[T+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function bp(r){let e=new WeakMap;function t(a,o){return o===qs?a.mapping=Pi:o===Qr&&(a.mapping=Di),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===qs||o===Qr)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Nu(l.height/2);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class nr extends dc{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ai=4,Fo=[.125,.215,.35,.446,.526,.582],Qn=20,Dr=new nr,Oo=new Ae;let Nr=null,Ur=0,Fr=0;const Zn=(1+Math.sqrt(5))/2,Si=1/Zn,ko=[new C(1,1,1),new C(-1,1,1),new C(1,1,-1),new C(-1,1,-1),new C(0,Zn,Si),new C(0,Zn,-Si),new C(Si,0,Zn),new C(-Si,0,Zn),new C(Zn,Si,0),new C(-Zn,Si,0)];class ra{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Nr=this._renderer.getRenderTarget(),Ur=this._renderer.getActiveCubeFace(),Fr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ho(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Nr,Ur,Fr),e.scissorTest=!1,Us(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Pi||e.mapping===Di?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Nr=this._renderer.getRenderTarget(),Ur=this._renderer.getActiveCubeFace(),Fr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:je,minFilter:je,generateMipmaps:!1,type:yn,format:Ft,colorSpace:pt,depthBuffer:!1},i=Bo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bo(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ep(s)),this._blurMaterial=Tp(s,e,t)}return i}_compileMaterial(e){const t=new Xe(this._lodPlanes[0],e);this._renderer.compile(t,Dr)}_sceneToCubeUV(e,t,n,i){const o=new Dt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Oo),h.toneMapping=On,h.autoClear=!1;const p=new ht({name:"PMREM.Background",side:Ot,depthWrite:!1,depthTest:!1}),_=new Xe(new dt,p);let v=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(Oo),v=!0);for(let f=0;f<6;f++){const S=f%3;S===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):S===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const x=this._cubeSize;Us(i,S*x,f>2?x:0,x,x),h.setRenderTarget(i),v&&h.render(_,o),h.render(e,o)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Pi||e.mapping===Di;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ho()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zo());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new Xe(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Us(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Dr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=ko[(i-1)%ko.length];this._blur(e,i-1,i,s,a)}t.autoClear=n}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Xe(this._lodPlanes[i],c),d=c.uniforms,p=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Qn-1),v=s/_,m=isFinite(s)?1+Math.floor(h*v):Qn;m>Qn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Qn}`);const f=[];let S=0;for(let b=0;b<Qn;++b){const D=b/v,g=Math.exp(-D*D/2);f.push(g),b===0?S+=g:b<m&&(S+=2*g)}for(let b=0;b<f.length;b++)f[b]=f[b]/S;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=_,d.mipInt.value=x-n;const T=this._sizeLods[i],L=3*T*(i>x-Ai?i-x+Ai:0),A=4*(this._cubeSize-T);Us(t,L,A,3*T,2*T),l.setRenderTarget(t),l.render(u,Dr)}}function Ep(r){const e=[],t=[],n=[];let i=r;const s=r-Ai+1+Fo.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>r-Ai?l=Fo[a-r+Ai-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,_=6,v=3,m=2,f=1,S=new Float32Array(v*_*p),x=new Float32Array(m*_*p),T=new Float32Array(f*_*p);for(let A=0;A<p;A++){const b=A%3*2/3-1,D=A>2?0:-1,g=[b,D,0,b+2/3,D,0,b+2/3,D+1,0,b,D,0,b+2/3,D+1,0,b,D+1,0];S.set(g,v*_*A),x.set(d,m*_*A);const y=[A,A,A,A,A,A];T.set(y,f*_*A)}const L=new tn;L.setAttribute("position",new bt(S,v)),L.setAttribute("uv",new bt(x,m)),L.setAttribute("faceIndex",new bt(T,f)),e.push(L),i>Ai&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Bo(r,e,t){const n=new En(r,e,t);return n.texture.mapping=er,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Us(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Tp(r,e,t){const n=new Float32Array(Qn),i=new C(0,1,0);return new ln({name:"SphericalGaussianBlur",defines:{n:Qn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function zo(){return new ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Ho(){return new ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function ba(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function wp(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===qs||l===Qr,h=l===Pi||l===Di;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new ra(r)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new ra(r));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Ap(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Rp(r,e,t,n){const i={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);for(const _ in d.morphAttributes){const v=d.morphAttributes[_];for(let m=0,f=v.length;m<f;m++)e.remove(v[m])}d.removeEventListener("dispose",a),delete i[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const _ in d)e.update(d[_],r.ARRAY_BUFFER);const p=u.morphAttributes;for(const _ in p){const v=p[_];for(let m=0,f=v.length;m<f;m++)e.update(v[m],r.ARRAY_BUFFER)}}function c(u){const d=[],p=u.index,_=u.attributes.position;let v=0;if(p!==null){const S=p.array;v=p.version;for(let x=0,T=S.length;x<T;x+=3){const L=S[x+0],A=S[x+1],b=S[x+2];d.push(L,A,A,b,b,L)}}else if(_!==void 0){const S=_.array;v=_.version;for(let x=0,T=S.length/3-1;x<T;x+=3){const L=x+0,A=x+1,b=x+2;d.push(L,A,A,b,b,L)}}else return;const m=new(ic(d)?hc:cc)(d,1);m.version=v;const f=s.get(u);f&&e.remove(f),s.set(u,m)}function h(u){const d=s.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Cp(r,e,t,n){const i=n.isWebGL2;let s;function a(p){s=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function h(p,_){r.drawElements(s,_,o,p*l),t.update(_,s,1)}function u(p,_,v){if(v===0)return;let m,f;if(i)m=r,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](s,_,o,p*l,v),t.update(_,s,v)}function d(p,_,v){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<v;f++)this.render(p[f]/l,_[f]);else{m.multiDrawElementsWEBGL(s,_,0,o,p,0,v);let f=0;for(let S=0;S<v;S++)f+=_[S];t.update(f,s,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function Lp(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Ip(r,e){return r[0]-e[0]}function Pp(r,e){return Math.abs(e[1])-Math.abs(r[1])}function Dp(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,a=new et,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const _=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,v=_!==void 0?_.length:0;let m=s.get(h);if(m===void 0||m.count!==v){let I=function(){$.dispose(),s.delete(h),h.removeEventListener("dispose",I)};var p=I;m!==void 0&&m.texture.dispose();const x=h.morphAttributes.position!==void 0,T=h.morphAttributes.normal!==void 0,L=h.morphAttributes.color!==void 0,A=h.morphAttributes.position||[],b=h.morphAttributes.normal||[],D=h.morphAttributes.color||[];let g=0;x===!0&&(g=1),T===!0&&(g=2),L===!0&&(g=3);let y=h.attributes.position.count*g,N=1;y>e.maxTextureSize&&(N=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const B=new Float32Array(y*N*4*v),$=new ac(B,y,N,v);$.type=Xt,$.needsUpdate=!0;const R=g*4;for(let U=0;U<v;U++){const X=A[U],q=b[U],j=D[U],Y=y*N*4*U;for(let J=0;J<X.count;J++){const Z=J*R;x===!0&&(a.fromBufferAttribute(X,J),B[Y+Z+0]=a.x,B[Y+Z+1]=a.y,B[Y+Z+2]=a.z,B[Y+Z+3]=0),T===!0&&(a.fromBufferAttribute(q,J),B[Y+Z+4]=a.x,B[Y+Z+5]=a.y,B[Y+Z+6]=a.z,B[Y+Z+7]=0),L===!0&&(a.fromBufferAttribute(j,J),B[Y+Z+8]=a.x,B[Y+Z+9]=a.y,B[Y+Z+10]=a.z,B[Y+Z+11]=j.itemSize===4?a.w:1)}}m={count:v,texture:$,size:new Se(y,N)},s.set(h,m),h.addEventListener("dispose",I)}let f=0;for(let x=0;x<d.length;x++)f+=d[x];const S=h.morphTargetsRelative?1:1-f;u.getUniforms().setValue(r,"morphTargetBaseInfluence",S),u.getUniforms().setValue(r,"morphTargetInfluences",d),u.getUniforms().setValue(r,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(r,"morphTargetsTextureSize",m.size)}else{const _=d===void 0?0:d.length;let v=n[h.id];if(v===void 0||v.length!==_){v=[];for(let T=0;T<_;T++)v[T]=[T,0];n[h.id]=v}for(let T=0;T<_;T++){const L=v[T];L[0]=T,L[1]=d[T]}v.sort(Pp);for(let T=0;T<8;T++)T<_&&v[T][1]?(o[T][0]=v[T][0],o[T][1]=v[T][1]):(o[T][0]=Number.MAX_SAFE_INTEGER,o[T][1]=0);o.sort(Ip);const m=h.morphAttributes.position,f=h.morphAttributes.normal;let S=0;for(let T=0;T<8;T++){const L=o[T],A=L[0],b=L[1];A!==Number.MAX_SAFE_INTEGER&&b?(m&&h.getAttribute("morphTarget"+T)!==m[A]&&h.setAttribute("morphTarget"+T,m[A]),f&&h.getAttribute("morphNormal"+T)!==f[A]&&h.setAttribute("morphNormal"+T,f[A]),i[T]=b,S+=b):(m&&h.hasAttribute("morphTarget"+T)===!0&&h.deleteAttribute("morphTarget"+T),f&&h.hasAttribute("morphNormal"+T)===!0&&h.deleteAttribute("morphNormal"+T),i[T]=0)}const x=h.morphTargetsRelative?1:1-S;u.getUniforms().setValue(r,"morphTargetBaseInfluence",x),u.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function Np(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class mc extends mt{constructor(e,t,n,i,s,a,o,l,c,h){if(h=h!==void 0?h:ni,h!==ni&&h!==Ni)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ni&&(n=Nn),n===void 0&&h===Ni&&(n=ti),super(null,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Mt,this.minFilter=l!==void 0?l:Mt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const _c=new mt,gc=new mc(1,1);gc.compareFunction=nc;const vc=new ac,xc=new oc,yc=new fc,Vo=[],Go=[],Wo=new Float32Array(16),Xo=new Float32Array(9),qo=new Float32Array(4);function Hi(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Vo[i];if(s===void 0&&(s=new Float32Array(i),Vo[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function _t(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function gt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function ir(r,e){let t=Go[e];t===void 0&&(t=new Int32Array(e),Go[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Up(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Fp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;r.uniform2fv(this.addr,e),gt(t,e)}}function Op(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(_t(t,e))return;r.uniform3fv(this.addr,e),gt(t,e)}}function kp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;r.uniform4fv(this.addr,e),gt(t,e)}}function Bp(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(_t(t,n))return;qo.set(n),r.uniformMatrix2fv(this.addr,!1,qo),gt(t,n)}}function zp(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(_t(t,n))return;Xo.set(n),r.uniformMatrix3fv(this.addr,!1,Xo),gt(t,n)}}function Hp(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(_t(t,n))return;Wo.set(n),r.uniformMatrix4fv(this.addr,!1,Wo),gt(t,n)}}function Vp(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Gp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;r.uniform2iv(this.addr,e),gt(t,e)}}function Wp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;r.uniform3iv(this.addr,e),gt(t,e)}}function Xp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;r.uniform4iv(this.addr,e),gt(t,e)}}function qp(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function jp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;r.uniform2uiv(this.addr,e),gt(t,e)}}function Yp(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;r.uniform3uiv(this.addr,e),gt(t,e)}}function $p(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;r.uniform4uiv(this.addr,e),gt(t,e)}}function Kp(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?gc:_c;t.setTexture2D(e||s,i)}function Zp(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||xc,i)}function Jp(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||yc,i)}function Qp(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||vc,i)}function em(r){switch(r){case 5126:return Up;case 35664:return Fp;case 35665:return Op;case 35666:return kp;case 35674:return Bp;case 35675:return zp;case 35676:return Hp;case 5124:case 35670:return Vp;case 35667:case 35671:return Gp;case 35668:case 35672:return Wp;case 35669:case 35673:return Xp;case 5125:return qp;case 36294:return jp;case 36295:return Yp;case 36296:return $p;case 35678:case 36198:case 36298:case 36306:case 35682:return Kp;case 35679:case 36299:case 36307:return Zp;case 35680:case 36300:case 36308:case 36293:return Jp;case 36289:case 36303:case 36311:case 36292:return Qp}}function tm(r,e){r.uniform1fv(this.addr,e)}function nm(r,e){const t=Hi(e,this.size,2);r.uniform2fv(this.addr,t)}function im(r,e){const t=Hi(e,this.size,3);r.uniform3fv(this.addr,t)}function sm(r,e){const t=Hi(e,this.size,4);r.uniform4fv(this.addr,t)}function rm(r,e){const t=Hi(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function am(r,e){const t=Hi(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function om(r,e){const t=Hi(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function lm(r,e){r.uniform1iv(this.addr,e)}function cm(r,e){r.uniform2iv(this.addr,e)}function hm(r,e){r.uniform3iv(this.addr,e)}function um(r,e){r.uniform4iv(this.addr,e)}function dm(r,e){r.uniform1uiv(this.addr,e)}function fm(r,e){r.uniform2uiv(this.addr,e)}function pm(r,e){r.uniform3uiv(this.addr,e)}function mm(r,e){r.uniform4uiv(this.addr,e)}function _m(r,e,t){const n=this.cache,i=e.length,s=ir(t,i);_t(n,s)||(r.uniform1iv(this.addr,s),gt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||_c,s[a])}function gm(r,e,t){const n=this.cache,i=e.length,s=ir(t,i);_t(n,s)||(r.uniform1iv(this.addr,s),gt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||xc,s[a])}function vm(r,e,t){const n=this.cache,i=e.length,s=ir(t,i);_t(n,s)||(r.uniform1iv(this.addr,s),gt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||yc,s[a])}function xm(r,e,t){const n=this.cache,i=e.length,s=ir(t,i);_t(n,s)||(r.uniform1iv(this.addr,s),gt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||vc,s[a])}function ym(r){switch(r){case 5126:return tm;case 35664:return nm;case 35665:return im;case 35666:return sm;case 35674:return rm;case 35675:return am;case 35676:return om;case 5124:case 35670:return lm;case 35667:case 35671:return cm;case 35668:case 35672:return hm;case 35669:case 35673:return um;case 5125:return dm;case 36294:return fm;case 36295:return pm;case 36296:return mm;case 35678:case 36198:case 36298:case 36306:case 35682:return _m;case 35679:case 36299:case 36307:return gm;case 35680:case 36300:case 36308:case 36293:return vm;case 36289:case 36303:case 36311:case 36292:return xm}}class Mm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=em(t.type)}}class Sm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ym(t.type)}}class bm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const Or=/(\w+)(\])?(\[|\.)?/g;function jo(r,e){r.seq.push(e),r.map[e.id]=e}function Em(r,e,t){const n=r.name,i=n.length;for(Or.lastIndex=0;;){const s=Or.exec(n),a=Or.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){jo(t,c===void 0?new Mm(o,r,e):new Sm(o,r,e));break}else{let u=t.map[o];u===void 0&&(u=new bm(o),jo(t,u)),t=u}}}class Ws{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);Em(s,a,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Yo(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Tm=37297;let wm=0;function Am(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Rm(r){const e=Ke.getPrimaries(Ke.workingColorSpace),t=Ke.getPrimaries(r);let n;switch(e===t?n="":e===Zs&&t===Ks?n="LinearDisplayP3ToLinearSRGB":e===Ks&&t===Zs&&(n="LinearSRGBToLinearDisplayP3"),r){case pt:case tr:return[n,"LinearTransferOETF"];case Ye:case xa:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function $o(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Am(r.getShaderSource(e),a)}else return i}function Cm(r,e){const t=Rm(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Lm(r,e){let t;switch(e){case Sh:t="Linear";break;case bh:t="Reinhard";break;case Eh:t="OptimizedCineon";break;case Vl:t="ACESFilmic";break;case wh:t="AgX";break;case Th:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Im(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ri).join(`
`)}function Pm(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ri).join(`
`)}function Dm(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Nm(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function Ri(r){return r!==""}function Ko(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zo(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Um=/^[ \t]*#include +<([\w\d./]+)>/gm;function aa(r){return r.replace(Um,Om)}const Fm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Om(r,e){let t=ke[e];if(t===void 0){const n=Fm.get(e);if(n!==void 0)t=ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return aa(t)}const km=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jo(r){return r.replace(km,Bm)}function Bm(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Qo(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function zm(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===zl?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Kc?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===vn&&(e="SHADOWMAP_TYPE_VSM"),e}function Hm(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Pi:case Di:e="ENVMAP_TYPE_CUBE";break;case er:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Vm(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Di:e="ENVMAP_MODE_REFRACTION";break}return e}function Gm(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Hl:e="ENVMAP_BLENDING_MULTIPLY";break;case yh:e="ENVMAP_BLENDING_MIX";break;case Mh:e="ENVMAP_BLENDING_ADD";break}return e}function Wm(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Xm(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=zm(t),c=Hm(t),h=Vm(t),u=Gm(t),d=Wm(t),p=t.isWebGL2?"":Im(t),_=Pm(t),v=Dm(s),m=i.createProgram();let f,S,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Ri).join(`
`),f.length>0&&(f+=`
`),S=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Ri).join(`
`),S.length>0&&(S+=`
`)):(f=[Qo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ri).join(`
`),S=[p,Qo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==On?"#define TONE_MAPPING":"",t.toneMapping!==On?ke.tonemapping_pars_fragment:"",t.toneMapping!==On?Lm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,Cm("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ri).join(`
`)),a=aa(a),a=Ko(a,t),a=Zo(a,t),o=aa(o),o=Ko(o,t),o=Zo(o,t),a=Jo(a),o=Jo(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,f=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,S=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===vo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===vo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const T=x+f+a,L=x+S+o,A=Yo(i,i.VERTEX_SHADER,T),b=Yo(i,i.FRAGMENT_SHADER,L);i.attachShader(m,A),i.attachShader(m,b),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function D(B){if(r.debug.checkShaderErrors){const $=i.getProgramInfoLog(m).trim(),R=i.getShaderInfoLog(A).trim(),I=i.getShaderInfoLog(b).trim();let U=!0,X=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(U=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,m,A,b);else{const q=$o(i,A,"vertex"),j=$o(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+$+`
`+q+`
`+j)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(R===""||I==="")&&(X=!1);X&&(B.diagnostics={runnable:U,programLog:$,vertexShader:{log:R,prefix:f},fragmentShader:{log:I,prefix:S}})}i.deleteShader(A),i.deleteShader(b),g=new Ws(i,m),y=Nm(i,m)}let g;this.getUniforms=function(){return g===void 0&&D(this),g};let y;this.getAttributes=function(){return y===void 0&&D(this),y};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=i.getProgramParameter(m,Tm)),N},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=wm++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=A,this.fragmentShader=b,this}let qm=0;class jm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Ym(e),t.set(e,n)),n}}class Ym{constructor(e){this.id=qm++,this.code=e,this.usedTimes=0}}function $m(r,e,t,n,i,s,a){const o=new Ma,l=new jm,c=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures;let p=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(g){return g===0?"uv":`uv${g}`}function m(g,y,N,B,$){const R=B.fog,I=$.geometry,U=g.isMeshStandardMaterial?B.environment:null,X=(g.isMeshStandardMaterial?t:e).get(g.envMap||U),q=X&&X.mapping===er?X.image.height:null,j=_[g.type];g.precision!==null&&(p=i.getMaxPrecision(g.precision),p!==g.precision&&console.warn("THREE.WebGLProgram.getParameters:",g.precision,"not supported, using",p,"instead."));const Y=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,J=Y!==void 0?Y.length:0;let Z=0;I.morphAttributes.position!==void 0&&(Z=1),I.morphAttributes.normal!==void 0&&(Z=2),I.morphAttributes.color!==void 0&&(Z=3);let F,K,oe,ie;if(j){const Ct=sn[j];F=Ct.vertexShader,K=Ct.fragmentShader}else F=g.vertexShader,K=g.fragmentShader,l.update(g),oe=l.getVertexShaderID(g),ie=l.getFragmentShaderID(g);const le=r.getRenderTarget(),pe=$.isInstancedMesh===!0,G=$.isBatchedMesh===!0,se=!!g.map,he=!!g.matcap,O=!!X,xe=!!g.aoMap,_e=!!g.lightMap,be=!!g.bumpMap,ce=!!g.normalMap,Pe=!!g.displacementMap,Ie=!!g.emissiveMap,w=!!g.metalnessMap,M=!!g.roughnessMap,H=g.anisotropy>0,te=g.clearcoat>0,ee=g.iridescence>0,ne=g.sheen>0,ye=g.transmission>0,fe=H&&!!g.anisotropyMap,ge=te&&!!g.clearcoatMap,Re=te&&!!g.clearcoatNormalMap,Be=te&&!!g.clearcoatRoughnessMap,Q=ee&&!!g.iridescenceMap,Je=ee&&!!g.iridescenceThicknessMap,We=ne&&!!g.sheenColorMap,De=ne&&!!g.sheenRoughnessMap,Ee=!!g.specularMap,ve=!!g.specularColorMap,Oe=!!g.specularIntensityMap,Ze=ye&&!!g.transmissionMap,lt=ye&&!!g.thicknessMap,He=!!g.gradientMap,re=!!g.alphaMap,P=g.alphaTest>0,ue=!!g.alphaHash,de=!!g.extensions,Ce=!!I.attributes.uv1,Te=!!I.attributes.uv2,tt=!!I.attributes.uv3;let nt=On;return g.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(nt=r.toneMapping),{isWebGL2:h,shaderID:j,shaderType:g.type,shaderName:g.name,vertexShader:F,fragmentShader:K,defines:g.defines,customVertexShaderID:oe,customFragmentShaderID:ie,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:p,batching:G,instancing:pe,instancingColor:pe&&$.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:le===null?r.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:pt,map:se,matcap:he,envMap:O,envMapMode:O&&X.mapping,envMapCubeUVHeight:q,aoMap:xe,lightMap:_e,bumpMap:be,normalMap:ce,displacementMap:d&&Pe,emissiveMap:Ie,normalMapObjectSpace:ce&&g.normalMapType===Vh,normalMapTangentSpace:ce&&g.normalMapType===tc,metalnessMap:w,roughnessMap:M,anisotropy:H,anisotropyMap:fe,clearcoat:te,clearcoatMap:ge,clearcoatNormalMap:Re,clearcoatRoughnessMap:Be,iridescence:ee,iridescenceMap:Q,iridescenceThicknessMap:Je,sheen:ne,sheenColorMap:We,sheenRoughnessMap:De,specularMap:Ee,specularColorMap:ve,specularIntensityMap:Oe,transmission:ye,transmissionMap:Ze,thicknessMap:lt,gradientMap:He,opaque:g.transparent===!1&&g.blending===Ci,alphaMap:re,alphaTest:P,alphaHash:ue,combine:g.combine,mapUv:se&&v(g.map.channel),aoMapUv:xe&&v(g.aoMap.channel),lightMapUv:_e&&v(g.lightMap.channel),bumpMapUv:be&&v(g.bumpMap.channel),normalMapUv:ce&&v(g.normalMap.channel),displacementMapUv:Pe&&v(g.displacementMap.channel),emissiveMapUv:Ie&&v(g.emissiveMap.channel),metalnessMapUv:w&&v(g.metalnessMap.channel),roughnessMapUv:M&&v(g.roughnessMap.channel),anisotropyMapUv:fe&&v(g.anisotropyMap.channel),clearcoatMapUv:ge&&v(g.clearcoatMap.channel),clearcoatNormalMapUv:Re&&v(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&v(g.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&v(g.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&v(g.iridescenceThicknessMap.channel),sheenColorMapUv:We&&v(g.sheenColorMap.channel),sheenRoughnessMapUv:De&&v(g.sheenRoughnessMap.channel),specularMapUv:Ee&&v(g.specularMap.channel),specularColorMapUv:ve&&v(g.specularColorMap.channel),specularIntensityMapUv:Oe&&v(g.specularIntensityMap.channel),transmissionMapUv:Ze&&v(g.transmissionMap.channel),thicknessMapUv:lt&&v(g.thicknessMap.channel),alphaMapUv:re&&v(g.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(ce||H),vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,vertexUv1s:Ce,vertexUv2s:Te,vertexUv3s:tt,pointsUvs:$.isPoints===!0&&!!I.attributes.uv&&(se||re),fog:!!R,useFog:g.fog===!0,fogExp2:R&&R.isFogExp2,flatShading:g.flatShading===!0,sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:$.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:Z,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:g.dithering,shadowMapEnabled:r.shadowMap.enabled&&N.length>0,shadowMapType:r.shadowMap.type,toneMapping:nt,useLegacyLights:r._useLegacyLights,decodeVideoTexture:se&&g.map.isVideoTexture===!0&&Ke.getTransfer(g.map.colorSpace)===st,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Nt,flipSided:g.side===Ot,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionDerivatives:de&&g.extensions.derivatives===!0,extensionFragDepth:de&&g.extensions.fragDepth===!0,extensionDrawBuffers:de&&g.extensions.drawBuffers===!0,extensionShaderTextureLOD:de&&g.extensions.shaderTextureLOD===!0,extensionClipCullDistance:de&&g.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()}}function f(g){const y=[];if(g.shaderID?y.push(g.shaderID):(y.push(g.customVertexShaderID),y.push(g.customFragmentShaderID)),g.defines!==void 0)for(const N in g.defines)y.push(N),y.push(g.defines[N]);return g.isRawShaderMaterial===!1&&(S(y,g),x(y,g),y.push(r.outputColorSpace)),y.push(g.customProgramCacheKey),y.join()}function S(g,y){g.push(y.precision),g.push(y.outputColorSpace),g.push(y.envMapMode),g.push(y.envMapCubeUVHeight),g.push(y.mapUv),g.push(y.alphaMapUv),g.push(y.lightMapUv),g.push(y.aoMapUv),g.push(y.bumpMapUv),g.push(y.normalMapUv),g.push(y.displacementMapUv),g.push(y.emissiveMapUv),g.push(y.metalnessMapUv),g.push(y.roughnessMapUv),g.push(y.anisotropyMapUv),g.push(y.clearcoatMapUv),g.push(y.clearcoatNormalMapUv),g.push(y.clearcoatRoughnessMapUv),g.push(y.iridescenceMapUv),g.push(y.iridescenceThicknessMapUv),g.push(y.sheenColorMapUv),g.push(y.sheenRoughnessMapUv),g.push(y.specularMapUv),g.push(y.specularColorMapUv),g.push(y.specularIntensityMapUv),g.push(y.transmissionMapUv),g.push(y.thicknessMapUv),g.push(y.combine),g.push(y.fogExp2),g.push(y.sizeAttenuation),g.push(y.morphTargetsCount),g.push(y.morphAttributeCount),g.push(y.numDirLights),g.push(y.numPointLights),g.push(y.numSpotLights),g.push(y.numSpotLightMaps),g.push(y.numHemiLights),g.push(y.numRectAreaLights),g.push(y.numDirLightShadows),g.push(y.numPointLightShadows),g.push(y.numSpotLightShadows),g.push(y.numSpotLightShadowsWithMaps),g.push(y.numLightProbes),g.push(y.shadowMapType),g.push(y.toneMapping),g.push(y.numClippingPlanes),g.push(y.numClipIntersection),g.push(y.depthPacking)}function x(g,y){o.disableAll(),y.isWebGL2&&o.enable(0),y.supportsVertexTextures&&o.enable(1),y.instancing&&o.enable(2),y.instancingColor&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),g.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.skinning&&o.enable(4),y.morphTargets&&o.enable(5),y.morphNormals&&o.enable(6),y.morphColors&&o.enable(7),y.premultipliedAlpha&&o.enable(8),y.shadowMapEnabled&&o.enable(9),y.useLegacyLights&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),g.push(o.mask)}function T(g){const y=_[g.type];let N;if(y){const B=sn[y];N=Lu.clone(B.uniforms)}else N=g.uniforms;return N}function L(g,y){let N;for(let B=0,$=c.length;B<$;B++){const R=c[B];if(R.cacheKey===y){N=R,++N.usedTimes;break}}return N===void 0&&(N=new Xm(r,y,g,s),c.push(N)),N}function A(g){if(--g.usedTimes===0){const y=c.indexOf(g);c[y]=c[c.length-1],c.pop(),g.destroy()}}function b(g){l.remove(g)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:T,acquireProgram:L,releaseProgram:A,releaseShaderCache:b,programs:c,dispose:D}}function Km(){let r=new WeakMap;function e(s){let a=r.get(s);return a===void 0&&(a={},r.set(s,a)),a}function t(s){r.delete(s)}function n(s,a,o){r.get(s)[a]=o}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Zm(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function el(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function tl(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,p,_,v,m){let f=r[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:_,renderOrder:u.renderOrder,z:v,group:m},r[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=_,f.renderOrder=u.renderOrder,f.z=v,f.group=m),e++,f}function o(u,d,p,_,v,m){const f=a(u,d,p,_,v,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):t.push(f)}function l(u,d,p,_,v,m){const f=a(u,d,p,_,v,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):t.unshift(f)}function c(u,d){t.length>1&&t.sort(u||Zm),n.length>1&&n.sort(d||el),i.length>1&&i.sort(d||el)}function h(){for(let u=e,d=r.length;u<d;u++){const p=r[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:h,sort:c}}function Jm(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new tl,r.set(n,[a])):i>=s.length?(a=new tl,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function Qm(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Ae};break;case"SpotLight":t={position:new C,direction:new C,color:new Ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Ae,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Ae,groundColor:new Ae};break;case"RectAreaLight":t={color:new Ae,position:new C,halfWidth:new C,halfHeight:new C};break}return r[e.id]=t,t}}}function e_(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let t_=0;function n_(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function i_(r,e){const t=new Qm,n=e_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new C);const s=new C,a=new Ue,o=new Ue;function l(h,u){let d=0,p=0,_=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let v=0,m=0,f=0,S=0,x=0,T=0,L=0,A=0,b=0,D=0,g=0;h.sort(n_);const y=u===!0?Math.PI:1;for(let B=0,$=h.length;B<$;B++){const R=h[B],I=R.color,U=R.intensity,X=R.distance,q=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)d+=I.r*U*y,p+=I.g*U*y,_+=I.b*U*y;else if(R.isLightProbe){for(let j=0;j<9;j++)i.probe[j].addScaledVector(R.sh.coefficients[j],U);g++}else if(R.isDirectionalLight){const j=t.get(R);if(j.color.copy(R.color).multiplyScalar(R.intensity*y),R.castShadow){const Y=R.shadow,J=n.get(R);J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize=Y.mapSize,i.directionalShadow[v]=J,i.directionalShadowMap[v]=q,i.directionalShadowMatrix[v]=R.shadow.matrix,T++}i.directional[v]=j,v++}else if(R.isSpotLight){const j=t.get(R);j.position.setFromMatrixPosition(R.matrixWorld),j.color.copy(I).multiplyScalar(U*y),j.distance=X,j.coneCos=Math.cos(R.angle),j.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),j.decay=R.decay,i.spot[f]=j;const Y=R.shadow;if(R.map&&(i.spotLightMap[b]=R.map,b++,Y.updateMatrices(R),R.castShadow&&D++),i.spotLightMatrix[f]=Y.matrix,R.castShadow){const J=n.get(R);J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize=Y.mapSize,i.spotShadow[f]=J,i.spotShadowMap[f]=q,A++}f++}else if(R.isRectAreaLight){const j=t.get(R);j.color.copy(I).multiplyScalar(U),j.halfWidth.set(R.width*.5,0,0),j.halfHeight.set(0,R.height*.5,0),i.rectArea[S]=j,S++}else if(R.isPointLight){const j=t.get(R);if(j.color.copy(R.color).multiplyScalar(R.intensity*y),j.distance=R.distance,j.decay=R.decay,R.castShadow){const Y=R.shadow,J=n.get(R);J.shadowBias=Y.bias,J.shadowNormalBias=Y.normalBias,J.shadowRadius=Y.radius,J.shadowMapSize=Y.mapSize,J.shadowCameraNear=Y.camera.near,J.shadowCameraFar=Y.camera.far,i.pointShadow[m]=J,i.pointShadowMap[m]=q,i.pointShadowMatrix[m]=R.shadow.matrix,L++}i.point[m]=j,m++}else if(R.isHemisphereLight){const j=t.get(R);j.skyColor.copy(R.color).multiplyScalar(U*y),j.groundColor.copy(R.groundColor).multiplyScalar(U*y),i.hemi[x]=j,x++}}S>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=p,i.ambient[2]=_;const N=i.hash;(N.directionalLength!==v||N.pointLength!==m||N.spotLength!==f||N.rectAreaLength!==S||N.hemiLength!==x||N.numDirectionalShadows!==T||N.numPointShadows!==L||N.numSpotShadows!==A||N.numSpotMaps!==b||N.numLightProbes!==g)&&(i.directional.length=v,i.spot.length=f,i.rectArea.length=S,i.point.length=m,i.hemi.length=x,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=L,i.pointShadowMap.length=L,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=L,i.spotLightMatrix.length=A+b-D,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=D,i.numLightProbes=g,N.directionalLength=v,N.pointLength=m,N.spotLength=f,N.rectAreaLength=S,N.hemiLength=x,N.numDirectionalShadows=T,N.numPointShadows=L,N.numSpotShadows=A,N.numSpotMaps=b,N.numLightProbes=g,i.version=t_++)}function c(h,u){let d=0,p=0,_=0,v=0,m=0;const f=u.matrixWorldInverse;for(let S=0,x=h.length;S<x;S++){const T=h[S];if(T.isDirectionalLight){const L=i.directional[d];L.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),L.direction.sub(s),L.direction.transformDirection(f),d++}else if(T.isSpotLight){const L=i.spot[_];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(f),L.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),L.direction.sub(s),L.direction.transformDirection(f),_++}else if(T.isRectAreaLight){const L=i.rectArea[v];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(f),o.identity(),a.copy(T.matrixWorld),a.premultiply(f),o.extractRotation(a),L.halfWidth.set(T.width*.5,0,0),L.halfHeight.set(0,T.height*.5,0),L.halfWidth.applyMatrix4(o),L.halfHeight.applyMatrix4(o),v++}else if(T.isPointLight){const L=i.point[p];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(f),p++}else if(T.isHemisphereLight){const L=i.hemi[m];L.direction.setFromMatrixPosition(T.matrixWorld),L.direction.transformDirection(f),m++}}}return{setup:l,setupView:c,state:i}}function nl(r,e){const t=new i_(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function a(u){n.push(u)}function o(u){i.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function s_(r,e){let t=new WeakMap;function n(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new nl(r,e),t.set(s,[l])):a>=o.length?(l=new nl(r,e),o.push(l)):l=o[a],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class r_ extends on{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=zh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class a_ extends on{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const o_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,l_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function c_(r,e,t){let n=new Sa;const i=new Se,s=new Se,a=new et,o=new r_({depthPacking:Hh}),l=new a_,c={},h=t.maxTextureSize,u={[qt]:Ot,[Ot]:qt,[Nt]:Nt},d=new ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:o_,fragmentShader:l_}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const _=new tn;_.setAttribute("position",new bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Xe(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zl;let f=this.type;this.render=function(A,b,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const g=r.getRenderTarget(),y=r.getActiveCubeFace(),N=r.getActiveMipmapLevel(),B=r.state;B.setBlending(Fn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const $=f!==vn&&this.type===vn,R=f===vn&&this.type!==vn;for(let I=0,U=A.length;I<U;I++){const X=A[I],q=X.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;i.copy(q.mapSize);const j=q.getFrameExtents();if(i.multiply(j),s.copy(q.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/j.x),i.x=s.x*j.x,q.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/j.y),i.y=s.y*j.y,q.mapSize.y=s.y)),q.map===null||$===!0||R===!0){const J=this.type!==vn?{minFilter:Mt,magFilter:Mt}:{};q.map!==null&&q.map.dispose(),q.map=new En(i.x,i.y,J),q.map.texture.name=X.name+".shadowMap",q.camera.updateProjectionMatrix()}r.setRenderTarget(q.map),r.clear();const Y=q.getViewportCount();for(let J=0;J<Y;J++){const Z=q.getViewport(J);a.set(s.x*Z.x,s.y*Z.y,s.x*Z.z,s.y*Z.w),B.viewport(a),q.updateMatrices(X,J),n=q.getFrustum(),T(b,D,q.camera,X,this.type)}q.isPointLightShadow!==!0&&this.type===vn&&S(q,D),q.needsUpdate=!1}f=this.type,m.needsUpdate=!1,r.setRenderTarget(g,y,N)};function S(A,b){const D=e.update(v);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new En(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,r.setRenderTarget(A.mapPass),r.clear(),r.renderBufferDirect(b,null,D,d,v,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,r.setRenderTarget(A.map),r.clear(),r.renderBufferDirect(b,null,D,p,v,null)}function x(A,b,D,g){let y=null;const N=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(N!==void 0)y=N;else if(y=D.isPointLight===!0?l:o,r.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const B=y.uuid,$=b.uuid;let R=c[B];R===void 0&&(R={},c[B]=R);let I=R[$];I===void 0&&(I=y.clone(),R[$]=I,b.addEventListener("dispose",L)),y=I}if(y.visible=b.visible,y.wireframe=b.wireframe,g===vn?y.side=b.shadowSide!==null?b.shadowSide:b.side:y.side=b.shadowSide!==null?b.shadowSide:u[b.side],y.alphaMap=b.alphaMap,y.alphaTest=b.alphaTest,y.map=b.map,y.clipShadows=b.clipShadows,y.clippingPlanes=b.clippingPlanes,y.clipIntersection=b.clipIntersection,y.displacementMap=b.displacementMap,y.displacementScale=b.displacementScale,y.displacementBias=b.displacementBias,y.wireframeLinewidth=b.wireframeLinewidth,y.linewidth=b.linewidth,D.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const B=r.properties.get(y);B.light=D}return y}function T(A,b,D,g,y){if(A.visible===!1)return;if(A.layers.test(b.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===vn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);const $=e.update(A),R=A.material;if(Array.isArray(R)){const I=$.groups;for(let U=0,X=I.length;U<X;U++){const q=I[U],j=R[q.materialIndex];if(j&&j.visible){const Y=x(A,j,g,y);A.onBeforeShadow(r,A,b,D,$,Y,q),r.renderBufferDirect(D,null,$,Y,A,q),A.onAfterShadow(r,A,b,D,$,Y,q)}}}else if(R.visible){const I=x(A,R,g,y);A.onBeforeShadow(r,A,b,D,$,I,null),r.renderBufferDirect(D,null,$,I,A,null),A.onAfterShadow(r,A,b,D,$,I,null)}}const B=A.children;for(let $=0,R=B.length;$<R;$++)T(B[$],b,D,g,y)}function L(A){A.target.removeEventListener("dispose",L);for(const D in c){const g=c[D],y=A.target.uuid;y in g&&(g[y].dispose(),delete g[y])}}}function h_(r,e,t){const n=t.isWebGL2;function i(){let P=!1;const ue=new et;let de=null;const Ce=new et(0,0,0,0);return{setMask:function(Te){de!==Te&&!P&&(r.colorMask(Te,Te,Te,Te),de=Te)},setLocked:function(Te){P=Te},setClear:function(Te,tt,nt,vt,Ct){Ct===!0&&(Te*=vt,tt*=vt,nt*=vt),ue.set(Te,tt,nt,vt),Ce.equals(ue)===!1&&(r.clearColor(Te,tt,nt,vt),Ce.copy(ue))},reset:function(){P=!1,de=null,Ce.set(-1,0,0,0)}}}function s(){let P=!1,ue=null,de=null,Ce=null;return{setTest:function(Te){Te?G(r.DEPTH_TEST):se(r.DEPTH_TEST)},setMask:function(Te){ue!==Te&&!P&&(r.depthMask(Te),ue=Te)},setFunc:function(Te){if(de!==Te){switch(Te){case fh:r.depthFunc(r.NEVER);break;case ph:r.depthFunc(r.ALWAYS);break;case mh:r.depthFunc(r.LESS);break;case Xs:r.depthFunc(r.LEQUAL);break;case _h:r.depthFunc(r.EQUAL);break;case gh:r.depthFunc(r.GEQUAL);break;case vh:r.depthFunc(r.GREATER);break;case xh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}de=Te}},setLocked:function(Te){P=Te},setClear:function(Te){Ce!==Te&&(r.clearDepth(Te),Ce=Te)},reset:function(){P=!1,ue=null,de=null,Ce=null}}}function a(){let P=!1,ue=null,de=null,Ce=null,Te=null,tt=null,nt=null,vt=null,Ct=null;return{setTest:function(it){P||(it?G(r.STENCIL_TEST):se(r.STENCIL_TEST))},setMask:function(it){ue!==it&&!P&&(r.stencilMask(it),ue=it)},setFunc:function(it,Lt,nn){(de!==it||Ce!==Lt||Te!==nn)&&(r.stencilFunc(it,Lt,nn),de=it,Ce=Lt,Te=nn)},setOp:function(it,Lt,nn){(tt!==it||nt!==Lt||vt!==nn)&&(r.stencilOp(it,Lt,nn),tt=it,nt=Lt,vt=nn)},setLocked:function(it){P=it},setClear:function(it){Ct!==it&&(r.clearStencil(it),Ct=it)},reset:function(){P=!1,ue=null,de=null,Ce=null,Te=null,tt=null,nt=null,vt=null,Ct=null}}}const o=new i,l=new s,c=new a,h=new WeakMap,u=new WeakMap;let d={},p={},_=new WeakMap,v=[],m=null,f=!1,S=null,x=null,T=null,L=null,A=null,b=null,D=null,g=new Ae(0,0,0),y=0,N=!1,B=null,$=null,R=null,I=null,U=null;const X=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,j=0;const Y=r.getParameter(r.VERSION);Y.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(Y)[1]),q=j>=1):Y.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),q=j>=2);let J=null,Z={};const F=r.getParameter(r.SCISSOR_BOX),K=r.getParameter(r.VIEWPORT),oe=new et().fromArray(F),ie=new et().fromArray(K);function le(P,ue,de,Ce){const Te=new Uint8Array(4),tt=r.createTexture();r.bindTexture(P,tt),r.texParameteri(P,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(P,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let nt=0;nt<de;nt++)n&&(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)?r.texImage3D(ue,0,r.RGBA,1,1,Ce,0,r.RGBA,r.UNSIGNED_BYTE,Te):r.texImage2D(ue+nt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Te);return tt}const pe={};pe[r.TEXTURE_2D]=le(r.TEXTURE_2D,r.TEXTURE_2D,1),pe[r.TEXTURE_CUBE_MAP]=le(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(pe[r.TEXTURE_2D_ARRAY]=le(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),pe[r.TEXTURE_3D]=le(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),G(r.DEPTH_TEST),l.setFunc(Xs),Ie(!1),w(ka),G(r.CULL_FACE),ce(Fn);function G(P){d[P]!==!0&&(r.enable(P),d[P]=!0)}function se(P){d[P]!==!1&&(r.disable(P),d[P]=!1)}function he(P,ue){return p[P]!==ue?(r.bindFramebuffer(P,ue),p[P]=ue,n&&(P===r.DRAW_FRAMEBUFFER&&(p[r.FRAMEBUFFER]=ue),P===r.FRAMEBUFFER&&(p[r.DRAW_FRAMEBUFFER]=ue)),!0):!1}function O(P,ue){let de=v,Ce=!1;if(P)if(de=_.get(ue),de===void 0&&(de=[],_.set(ue,de)),P.isWebGLMultipleRenderTargets){const Te=P.texture;if(de.length!==Te.length||de[0]!==r.COLOR_ATTACHMENT0){for(let tt=0,nt=Te.length;tt<nt;tt++)de[tt]=r.COLOR_ATTACHMENT0+tt;de.length=Te.length,Ce=!0}}else de[0]!==r.COLOR_ATTACHMENT0&&(de[0]=r.COLOR_ATTACHMENT0,Ce=!0);else de[0]!==r.BACK&&(de[0]=r.BACK,Ce=!0);Ce&&(t.isWebGL2?r.drawBuffers(de):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(de))}function xe(P){return m!==P?(r.useProgram(P),m=P,!0):!1}const _e={[Jn]:r.FUNC_ADD,[Jc]:r.FUNC_SUBTRACT,[Qc]:r.FUNC_REVERSE_SUBTRACT};if(n)_e[Va]=r.MIN,_e[Ga]=r.MAX;else{const P=e.get("EXT_blend_minmax");P!==null&&(_e[Va]=P.MIN_EXT,_e[Ga]=P.MAX_EXT)}const be={[eh]:r.ZERO,[th]:r.ONE,[nh]:r.SRC_COLOR,[Zr]:r.SRC_ALPHA,[lh]:r.SRC_ALPHA_SATURATE,[ah]:r.DST_COLOR,[sh]:r.DST_ALPHA,[ih]:r.ONE_MINUS_SRC_COLOR,[Jr]:r.ONE_MINUS_SRC_ALPHA,[oh]:r.ONE_MINUS_DST_COLOR,[rh]:r.ONE_MINUS_DST_ALPHA,[ch]:r.CONSTANT_COLOR,[hh]:r.ONE_MINUS_CONSTANT_COLOR,[uh]:r.CONSTANT_ALPHA,[dh]:r.ONE_MINUS_CONSTANT_ALPHA};function ce(P,ue,de,Ce,Te,tt,nt,vt,Ct,it){if(P===Fn){f===!0&&(se(r.BLEND),f=!1);return}if(f===!1&&(G(r.BLEND),f=!0),P!==Zc){if(P!==S||it!==N){if((x!==Jn||A!==Jn)&&(r.blendEquation(r.FUNC_ADD),x=Jn,A=Jn),it)switch(P){case Ci:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ba:r.blendFunc(r.ONE,r.ONE);break;case za:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ha:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Ci:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ba:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case za:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ha:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}T=null,L=null,b=null,D=null,g.set(0,0,0),y=0,S=P,N=it}return}Te=Te||ue,tt=tt||de,nt=nt||Ce,(ue!==x||Te!==A)&&(r.blendEquationSeparate(_e[ue],_e[Te]),x=ue,A=Te),(de!==T||Ce!==L||tt!==b||nt!==D)&&(r.blendFuncSeparate(be[de],be[Ce],be[tt],be[nt]),T=de,L=Ce,b=tt,D=nt),(vt.equals(g)===!1||Ct!==y)&&(r.blendColor(vt.r,vt.g,vt.b,Ct),g.copy(vt),y=Ct),S=P,N=!1}function Pe(P,ue){P.side===Nt?se(r.CULL_FACE):G(r.CULL_FACE);let de=P.side===Ot;ue&&(de=!de),Ie(de),P.blending===Ci&&P.transparent===!1?ce(Fn):ce(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),l.setFunc(P.depthFunc),l.setTest(P.depthTest),l.setMask(P.depthWrite),o.setMask(P.colorWrite);const Ce=P.stencilWrite;c.setTest(Ce),Ce&&(c.setMask(P.stencilWriteMask),c.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),c.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),H(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?G(r.SAMPLE_ALPHA_TO_COVERAGE):se(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(P){B!==P&&(P?r.frontFace(r.CW):r.frontFace(r.CCW),B=P)}function w(P){P!==Yc?(G(r.CULL_FACE),P!==$&&(P===ka?r.cullFace(r.BACK):P===$c?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):se(r.CULL_FACE),$=P}function M(P){P!==R&&(q&&r.lineWidth(P),R=P)}function H(P,ue,de){P?(G(r.POLYGON_OFFSET_FILL),(I!==ue||U!==de)&&(r.polygonOffset(ue,de),I=ue,U=de)):se(r.POLYGON_OFFSET_FILL)}function te(P){P?G(r.SCISSOR_TEST):se(r.SCISSOR_TEST)}function ee(P){P===void 0&&(P=r.TEXTURE0+X-1),J!==P&&(r.activeTexture(P),J=P)}function ne(P,ue,de){de===void 0&&(J===null?de=r.TEXTURE0+X-1:de=J);let Ce=Z[de];Ce===void 0&&(Ce={type:void 0,texture:void 0},Z[de]=Ce),(Ce.type!==P||Ce.texture!==ue)&&(J!==de&&(r.activeTexture(de),J=de),r.bindTexture(P,ue||pe[P]),Ce.type=P,Ce.texture=ue)}function ye(){const P=Z[J];P!==void 0&&P.type!==void 0&&(r.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function fe(){try{r.compressedTexImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ge(){try{r.compressedTexImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Re(){try{r.texSubImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Be(){try{r.texSubImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Q(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Je(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function We(){try{r.texStorage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function De(){try{r.texStorage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ee(){try{r.texImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ve(){try{r.texImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Oe(P){oe.equals(P)===!1&&(r.scissor(P.x,P.y,P.z,P.w),oe.copy(P))}function Ze(P){ie.equals(P)===!1&&(r.viewport(P.x,P.y,P.z,P.w),ie.copy(P))}function lt(P,ue){let de=u.get(ue);de===void 0&&(de=new WeakMap,u.set(ue,de));let Ce=de.get(P);Ce===void 0&&(Ce=r.getUniformBlockIndex(ue,P.name),de.set(P,Ce))}function He(P,ue){const Ce=u.get(ue).get(P);h.get(ue)!==Ce&&(r.uniformBlockBinding(ue,Ce,P.__bindingPointIndex),h.set(ue,Ce))}function re(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},J=null,Z={},p={},_=new WeakMap,v=[],m=null,f=!1,S=null,x=null,T=null,L=null,A=null,b=null,D=null,g=new Ae(0,0,0),y=0,N=!1,B=null,$=null,R=null,I=null,U=null,oe.set(0,0,r.canvas.width,r.canvas.height),ie.set(0,0,r.canvas.width,r.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:G,disable:se,bindFramebuffer:he,drawBuffers:O,useProgram:xe,setBlending:ce,setMaterial:Pe,setFlipSided:Ie,setCullFace:w,setLineWidth:M,setPolygonOffset:H,setScissorTest:te,activeTexture:ee,bindTexture:ne,unbindTexture:ye,compressedTexImage2D:fe,compressedTexImage3D:ge,texImage2D:Ee,texImage3D:ve,updateUBOMapping:lt,uniformBlockBinding:He,texStorage2D:We,texStorage3D:De,texSubImage2D:Re,texSubImage3D:Be,compressedTexSubImage2D:Q,compressedTexSubImage3D:Je,scissor:Oe,viewport:Ze,reset:re}}function u_(r,e,t,n,i,s,a){const o=i.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(w,M){return p?new OffscreenCanvas(w,M):os("canvas")}function v(w,M,H,te){let ee=1;if((w.width>te||w.height>te)&&(ee=te/Math.max(w.width,w.height)),ee<1||M===!0)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap){const ne=M?Qs:Math.floor,ye=ne(ee*w.width),fe=ne(ee*w.height);u===void 0&&(u=_(ye,fe));const ge=H?_(ye,fe):u;return ge.width=ye,ge.height=fe,ge.getContext("2d").drawImage(w,0,0,ye,fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+ye+"x"+fe+")."),ge}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),w;return w}function m(w){return sa(w.width)&&sa(w.height)}function f(w){return o?!1:w.wrapS!==At||w.wrapT!==At||w.minFilter!==Mt&&w.minFilter!==je}function S(w,M){return w.generateMipmaps&&M&&w.minFilter!==Mt&&w.minFilter!==je}function x(w){r.generateMipmap(w)}function T(w,M,H,te,ee=!1){if(o===!1)return M;if(w!==null){if(r[w]!==void 0)return r[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ne=M;if(M===r.RED&&(H===r.FLOAT&&(ne=r.R32F),H===r.HALF_FLOAT&&(ne=r.R16F),H===r.UNSIGNED_BYTE&&(ne=r.R8)),M===r.RED_INTEGER&&(H===r.UNSIGNED_BYTE&&(ne=r.R8UI),H===r.UNSIGNED_SHORT&&(ne=r.R16UI),H===r.UNSIGNED_INT&&(ne=r.R32UI),H===r.BYTE&&(ne=r.R8I),H===r.SHORT&&(ne=r.R16I),H===r.INT&&(ne=r.R32I)),M===r.RG&&(H===r.FLOAT&&(ne=r.RG32F),H===r.HALF_FLOAT&&(ne=r.RG16F),H===r.UNSIGNED_BYTE&&(ne=r.RG8)),M===r.RGBA){const ye=ee?$s:Ke.getTransfer(te);H===r.FLOAT&&(ne=r.RGBA32F),H===r.HALF_FLOAT&&(ne=r.RGBA16F),H===r.UNSIGNED_BYTE&&(ne=ye===st?r.SRGB8_ALPHA8:r.RGBA8),H===r.UNSIGNED_SHORT_4_4_4_4&&(ne=r.RGBA4),H===r.UNSIGNED_SHORT_5_5_5_1&&(ne=r.RGB5_A1)}return(ne===r.R16F||ne===r.R32F||ne===r.RG16F||ne===r.RG32F||ne===r.RGBA16F||ne===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function L(w,M,H){return S(w,H)===!0||w.isFramebufferTexture&&w.minFilter!==Mt&&w.minFilter!==je?Math.log2(Math.max(M.width,M.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?M.mipmaps.length:1}function A(w){return w===Mt||w===ea||w===Gs?r.NEAREST:r.LINEAR}function b(w){const M=w.target;M.removeEventListener("dispose",b),g(M),M.isVideoTexture&&h.delete(M)}function D(w){const M=w.target;M.removeEventListener("dispose",D),N(M)}function g(w){const M=n.get(w);if(M.__webglInit===void 0)return;const H=w.source,te=d.get(H);if(te){const ee=te[M.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&y(w),Object.keys(te).length===0&&d.delete(H)}n.remove(w)}function y(w){const M=n.get(w);r.deleteTexture(M.__webglTexture);const H=w.source,te=d.get(H);delete te[M.__cacheKey],a.memory.textures--}function N(w){const M=w.texture,H=n.get(w),te=n.get(M);if(te.__webglTexture!==void 0&&(r.deleteTexture(te.__webglTexture),a.memory.textures--),w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(H.__webglFramebuffer[ee]))for(let ne=0;ne<H.__webglFramebuffer[ee].length;ne++)r.deleteFramebuffer(H.__webglFramebuffer[ee][ne]);else r.deleteFramebuffer(H.__webglFramebuffer[ee]);H.__webglDepthbuffer&&r.deleteRenderbuffer(H.__webglDepthbuffer[ee])}else{if(Array.isArray(H.__webglFramebuffer))for(let ee=0;ee<H.__webglFramebuffer.length;ee++)r.deleteFramebuffer(H.__webglFramebuffer[ee]);else r.deleteFramebuffer(H.__webglFramebuffer);if(H.__webglDepthbuffer&&r.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&r.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let ee=0;ee<H.__webglColorRenderbuffer.length;ee++)H.__webglColorRenderbuffer[ee]&&r.deleteRenderbuffer(H.__webglColorRenderbuffer[ee]);H.__webglDepthRenderbuffer&&r.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(w.isWebGLMultipleRenderTargets)for(let ee=0,ne=M.length;ee<ne;ee++){const ye=n.get(M[ee]);ye.__webglTexture&&(r.deleteTexture(ye.__webglTexture),a.memory.textures--),n.remove(M[ee])}n.remove(M),n.remove(w)}let B=0;function $(){B=0}function R(){const w=B;return w>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),B+=1,w}function I(w){const M=[];return M.push(w.wrapS),M.push(w.wrapT),M.push(w.wrapR||0),M.push(w.magFilter),M.push(w.minFilter),M.push(w.anisotropy),M.push(w.internalFormat),M.push(w.format),M.push(w.type),M.push(w.generateMipmaps),M.push(w.premultiplyAlpha),M.push(w.flipY),M.push(w.unpackAlignment),M.push(w.colorSpace),M.join()}function U(w,M){const H=n.get(w);if(w.isVideoTexture&&Pe(w),w.isRenderTargetTexture===!1&&w.version>0&&H.__version!==w.version){const te=w.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{oe(H,w,M);return}}t.bindTexture(r.TEXTURE_2D,H.__webglTexture,r.TEXTURE0+M)}function X(w,M){const H=n.get(w);if(w.version>0&&H.__version!==w.version){oe(H,w,M);return}t.bindTexture(r.TEXTURE_2D_ARRAY,H.__webglTexture,r.TEXTURE0+M)}function q(w,M){const H=n.get(w);if(w.version>0&&H.__version!==w.version){oe(H,w,M);return}t.bindTexture(r.TEXTURE_3D,H.__webglTexture,r.TEXTURE0+M)}function j(w,M){const H=n.get(w);if(w.version>0&&H.__version!==w.version){ie(H,w,M);return}t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture,r.TEXTURE0+M)}const Y={[Bn]:r.REPEAT,[At]:r.CLAMP_TO_EDGE,[js]:r.MIRRORED_REPEAT},J={[Mt]:r.NEAREST,[ea]:r.NEAREST_MIPMAP_NEAREST,[Gs]:r.NEAREST_MIPMAP_LINEAR,[je]:r.LINEAR,[Wl]:r.LINEAR_MIPMAP_NEAREST,[zn]:r.LINEAR_MIPMAP_LINEAR},Z={[Gh]:r.NEVER,[$h]:r.ALWAYS,[Wh]:r.LESS,[nc]:r.LEQUAL,[Xh]:r.EQUAL,[Yh]:r.GEQUAL,[qh]:r.GREATER,[jh]:r.NOTEQUAL};function F(w,M,H){if(H?(r.texParameteri(w,r.TEXTURE_WRAP_S,Y[M.wrapS]),r.texParameteri(w,r.TEXTURE_WRAP_T,Y[M.wrapT]),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,Y[M.wrapR]),r.texParameteri(w,r.TEXTURE_MAG_FILTER,J[M.magFilter]),r.texParameteri(w,r.TEXTURE_MIN_FILTER,J[M.minFilter])):(r.texParameteri(w,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(w,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(M.wrapS!==At||M.wrapT!==At)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(w,r.TEXTURE_MAG_FILTER,A(M.magFilter)),r.texParameteri(w,r.TEXTURE_MIN_FILTER,A(M.minFilter)),M.minFilter!==Mt&&M.minFilter!==je&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(r.texParameteri(w,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(w,r.TEXTURE_COMPARE_FUNC,Z[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const te=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===Mt||M.minFilter!==Gs&&M.minFilter!==zn||M.type===Xt&&e.has("OES_texture_float_linear")===!1||o===!1&&M.type===yn&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(r.texParameterf(w,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function K(w,M){let H=!1;w.__webglInit===void 0&&(w.__webglInit=!0,M.addEventListener("dispose",b));const te=M.source;let ee=d.get(te);ee===void 0&&(ee={},d.set(te,ee));const ne=I(M);if(ne!==w.__cacheKey){ee[ne]===void 0&&(ee[ne]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,H=!0),ee[ne].usedTimes++;const ye=ee[w.__cacheKey];ye!==void 0&&(ee[w.__cacheKey].usedTimes--,ye.usedTimes===0&&y(M)),w.__cacheKey=ne,w.__webglTexture=ee[ne].texture}return H}function oe(w,M,H){let te=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(te=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(te=r.TEXTURE_3D);const ee=K(w,M),ne=M.source;t.bindTexture(te,w.__webglTexture,r.TEXTURE0+H);const ye=n.get(ne);if(ne.version!==ye.__version||ee===!0){t.activeTexture(r.TEXTURE0+H);const fe=Ke.getPrimaries(Ke.workingColorSpace),ge=M.colorSpace===Wt?null:Ke.getPrimaries(M.colorSpace),Re=M.colorSpace===Wt||fe===ge?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const Be=f(M)&&m(M.image)===!1;let Q=v(M.image,Be,!1,i.maxTextureSize);Q=Ie(M,Q);const Je=m(Q)||o,We=s.convert(M.format,M.colorSpace);let De=s.convert(M.type),Ee=T(M.internalFormat,We,De,M.colorSpace,M.isVideoTexture);F(te,M,Je);let ve;const Oe=M.mipmaps,Ze=o&&M.isVideoTexture!==!0&&Ee!==Jl,lt=ye.__version===void 0||ee===!0,He=L(M,Q,Je);if(M.isDepthTexture)Ee=r.DEPTH_COMPONENT,o?M.type===Xt?Ee=r.DEPTH_COMPONENT32F:M.type===Nn?Ee=r.DEPTH_COMPONENT24:M.type===ti?Ee=r.DEPTH24_STENCIL8:Ee=r.DEPTH_COMPONENT16:M.type===Xt&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===ni&&Ee===r.DEPTH_COMPONENT&&M.type!==ga&&M.type!==Nn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=Nn,De=s.convert(M.type)),M.format===Ni&&Ee===r.DEPTH_COMPONENT&&(Ee=r.DEPTH_STENCIL,M.type!==ti&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=ti,De=s.convert(M.type))),lt&&(Ze?t.texStorage2D(r.TEXTURE_2D,1,Ee,Q.width,Q.height):t.texImage2D(r.TEXTURE_2D,0,Ee,Q.width,Q.height,0,We,De,null));else if(M.isDataTexture)if(Oe.length>0&&Je){Ze&&lt&&t.texStorage2D(r.TEXTURE_2D,He,Ee,Oe[0].width,Oe[0].height);for(let re=0,P=Oe.length;re<P;re++)ve=Oe[re],Ze?t.texSubImage2D(r.TEXTURE_2D,re,0,0,ve.width,ve.height,We,De,ve.data):t.texImage2D(r.TEXTURE_2D,re,Ee,ve.width,ve.height,0,We,De,ve.data);M.generateMipmaps=!1}else Ze?(lt&&t.texStorage2D(r.TEXTURE_2D,He,Ee,Q.width,Q.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,Q.width,Q.height,We,De,Q.data)):t.texImage2D(r.TEXTURE_2D,0,Ee,Q.width,Q.height,0,We,De,Q.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ze&&lt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,He,Ee,Oe[0].width,Oe[0].height,Q.depth);for(let re=0,P=Oe.length;re<P;re++)ve=Oe[re],M.format!==Ft?We!==null?Ze?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,0,ve.width,ve.height,Q.depth,We,ve.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,re,Ee,ve.width,ve.height,Q.depth,0,ve.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,0,ve.width,ve.height,Q.depth,We,De,ve.data):t.texImage3D(r.TEXTURE_2D_ARRAY,re,Ee,ve.width,ve.height,Q.depth,0,We,De,ve.data)}else{Ze&&lt&&t.texStorage2D(r.TEXTURE_2D,He,Ee,Oe[0].width,Oe[0].height);for(let re=0,P=Oe.length;re<P;re++)ve=Oe[re],M.format!==Ft?We!==null?Ze?t.compressedTexSubImage2D(r.TEXTURE_2D,re,0,0,ve.width,ve.height,We,ve.data):t.compressedTexImage2D(r.TEXTURE_2D,re,Ee,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage2D(r.TEXTURE_2D,re,0,0,ve.width,ve.height,We,De,ve.data):t.texImage2D(r.TEXTURE_2D,re,Ee,ve.width,ve.height,0,We,De,ve.data)}else if(M.isDataArrayTexture)Ze?(lt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,He,Ee,Q.width,Q.height,Q.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,We,De,Q.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ee,Q.width,Q.height,Q.depth,0,We,De,Q.data);else if(M.isData3DTexture)Ze?(lt&&t.texStorage3D(r.TEXTURE_3D,He,Ee,Q.width,Q.height,Q.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,We,De,Q.data)):t.texImage3D(r.TEXTURE_3D,0,Ee,Q.width,Q.height,Q.depth,0,We,De,Q.data);else if(M.isFramebufferTexture){if(lt)if(Ze)t.texStorage2D(r.TEXTURE_2D,He,Ee,Q.width,Q.height);else{let re=Q.width,P=Q.height;for(let ue=0;ue<He;ue++)t.texImage2D(r.TEXTURE_2D,ue,Ee,re,P,0,We,De,null),re>>=1,P>>=1}}else if(Oe.length>0&&Je){Ze&&lt&&t.texStorage2D(r.TEXTURE_2D,He,Ee,Oe[0].width,Oe[0].height);for(let re=0,P=Oe.length;re<P;re++)ve=Oe[re],Ze?t.texSubImage2D(r.TEXTURE_2D,re,0,0,We,De,ve):t.texImage2D(r.TEXTURE_2D,re,Ee,We,De,ve);M.generateMipmaps=!1}else Ze?(lt&&t.texStorage2D(r.TEXTURE_2D,He,Ee,Q.width,Q.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,We,De,Q)):t.texImage2D(r.TEXTURE_2D,0,Ee,We,De,Q);S(M,Je)&&x(te),ye.__version=ne.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function ie(w,M,H){if(M.image.length!==6)return;const te=K(w,M),ee=M.source;t.bindTexture(r.TEXTURE_CUBE_MAP,w.__webglTexture,r.TEXTURE0+H);const ne=n.get(ee);if(ee.version!==ne.__version||te===!0){t.activeTexture(r.TEXTURE0+H);const ye=Ke.getPrimaries(Ke.workingColorSpace),fe=M.colorSpace===Wt?null:Ke.getPrimaries(M.colorSpace),ge=M.colorSpace===Wt||ye===fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Re=M.isCompressedTexture||M.image[0].isCompressedTexture,Be=M.image[0]&&M.image[0].isDataTexture,Q=[];for(let re=0;re<6;re++)!Re&&!Be?Q[re]=v(M.image[re],!1,!0,i.maxCubemapSize):Q[re]=Be?M.image[re].image:M.image[re],Q[re]=Ie(M,Q[re]);const Je=Q[0],We=m(Je)||o,De=s.convert(M.format,M.colorSpace),Ee=s.convert(M.type),ve=T(M.internalFormat,De,Ee,M.colorSpace),Oe=o&&M.isVideoTexture!==!0,Ze=ne.__version===void 0||te===!0;let lt=L(M,Je,We);F(r.TEXTURE_CUBE_MAP,M,We);let He;if(Re){Oe&&Ze&&t.texStorage2D(r.TEXTURE_CUBE_MAP,lt,ve,Je.width,Je.height);for(let re=0;re<6;re++){He=Q[re].mipmaps;for(let P=0;P<He.length;P++){const ue=He[P];M.format!==Ft?De!==null?Oe?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,P,0,0,ue.width,ue.height,De,ue.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,P,ve,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,P,0,0,ue.width,ue.height,De,Ee,ue.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,P,ve,ue.width,ue.height,0,De,Ee,ue.data)}}}else{He=M.mipmaps,Oe&&Ze&&(He.length>0&&lt++,t.texStorage2D(r.TEXTURE_CUBE_MAP,lt,ve,Q[0].width,Q[0].height));for(let re=0;re<6;re++)if(Be){Oe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Q[re].width,Q[re].height,De,Ee,Q[re].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ve,Q[re].width,Q[re].height,0,De,Ee,Q[re].data);for(let P=0;P<He.length;P++){const de=He[P].image[re].image;Oe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,P+1,0,0,de.width,de.height,De,Ee,de.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,P+1,ve,de.width,de.height,0,De,Ee,de.data)}}else{Oe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,De,Ee,Q[re]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ve,De,Ee,Q[re]);for(let P=0;P<He.length;P++){const ue=He[P];Oe?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,P+1,0,0,De,Ee,ue.image[re]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+re,P+1,ve,De,Ee,ue.image[re])}}}S(M,We)&&x(r.TEXTURE_CUBE_MAP),ne.__version=ee.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function le(w,M,H,te,ee,ne){const ye=s.convert(H.format,H.colorSpace),fe=s.convert(H.type),ge=T(H.internalFormat,ye,fe,H.colorSpace);if(!n.get(M).__hasExternalTextures){const Be=Math.max(1,M.width>>ne),Q=Math.max(1,M.height>>ne);ee===r.TEXTURE_3D||ee===r.TEXTURE_2D_ARRAY?t.texImage3D(ee,ne,ge,Be,Q,M.depth,0,ye,fe,null):t.texImage2D(ee,ne,ge,Be,Q,0,ye,fe,null)}t.bindFramebuffer(r.FRAMEBUFFER,w),ce(M)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,te,ee,n.get(H).__webglTexture,0,be(M)):(ee===r.TEXTURE_2D||ee>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,te,ee,n.get(H).__webglTexture,ne),t.bindFramebuffer(r.FRAMEBUFFER,null)}function pe(w,M,H){if(r.bindRenderbuffer(r.RENDERBUFFER,w),M.depthBuffer&&!M.stencilBuffer){let te=o===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(H||ce(M)){const ee=M.depthTexture;ee&&ee.isDepthTexture&&(ee.type===Xt?te=r.DEPTH_COMPONENT32F:ee.type===Nn&&(te=r.DEPTH_COMPONENT24));const ne=be(M);ce(M)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ne,te,M.width,M.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,ne,te,M.width,M.height)}else r.renderbufferStorage(r.RENDERBUFFER,te,M.width,M.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,w)}else if(M.depthBuffer&&M.stencilBuffer){const te=be(M);H&&ce(M)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,te,r.DEPTH24_STENCIL8,M.width,M.height):ce(M)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,te,r.DEPTH24_STENCIL8,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,w)}else{const te=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let ee=0;ee<te.length;ee++){const ne=te[ee],ye=s.convert(ne.format,ne.colorSpace),fe=s.convert(ne.type),ge=T(ne.internalFormat,ye,fe,ne.colorSpace),Re=be(M);H&&ce(M)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Re,ge,M.width,M.height):ce(M)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Re,ge,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,ge,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function G(w,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,w),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),U(M.depthTexture,0);const te=n.get(M.depthTexture).__webglTexture,ee=be(M);if(M.depthTexture.format===ni)ce(M)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,te,0,ee):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,te,0);else if(M.depthTexture.format===Ni)ce(M)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,te,0,ee):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function se(w){const M=n.get(w),H=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");G(M.__webglFramebuffer,w)}else if(H){M.__webglDepthbuffer=[];for(let te=0;te<6;te++)t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[te]),M.__webglDepthbuffer[te]=r.createRenderbuffer(),pe(M.__webglDepthbuffer[te],w,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=r.createRenderbuffer(),pe(M.__webglDepthbuffer,w,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function he(w,M,H){const te=n.get(w);M!==void 0&&le(te.__webglFramebuffer,w,w.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),H!==void 0&&se(w)}function O(w){const M=w.texture,H=n.get(w),te=n.get(M);w.addEventListener("dispose",D),w.isWebGLMultipleRenderTargets!==!0&&(te.__webglTexture===void 0&&(te.__webglTexture=r.createTexture()),te.__version=M.version,a.memory.textures++);const ee=w.isWebGLCubeRenderTarget===!0,ne=w.isWebGLMultipleRenderTargets===!0,ye=m(w)||o;if(ee){H.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(o&&M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[fe]=[];for(let ge=0;ge<M.mipmaps.length;ge++)H.__webglFramebuffer[fe][ge]=r.createFramebuffer()}else H.__webglFramebuffer[fe]=r.createFramebuffer()}else{if(o&&M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let fe=0;fe<M.mipmaps.length;fe++)H.__webglFramebuffer[fe]=r.createFramebuffer()}else H.__webglFramebuffer=r.createFramebuffer();if(ne)if(i.drawBuffers){const fe=w.texture;for(let ge=0,Re=fe.length;ge<Re;ge++){const Be=n.get(fe[ge]);Be.__webglTexture===void 0&&(Be.__webglTexture=r.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&w.samples>0&&ce(w)===!1){const fe=ne?M:[M];H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ge=0;ge<fe.length;ge++){const Re=fe[ge];H.__webglColorRenderbuffer[ge]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,H.__webglColorRenderbuffer[ge]);const Be=s.convert(Re.format,Re.colorSpace),Q=s.convert(Re.type),Je=T(Re.internalFormat,Be,Q,Re.colorSpace,w.isXRRenderTarget===!0),We=be(w);r.renderbufferStorageMultisample(r.RENDERBUFFER,We,Je,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ge,r.RENDERBUFFER,H.__webglColorRenderbuffer[ge])}r.bindRenderbuffer(r.RENDERBUFFER,null),w.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),pe(H.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ee){t.bindTexture(r.TEXTURE_CUBE_MAP,te.__webglTexture),F(r.TEXTURE_CUBE_MAP,M,ye);for(let fe=0;fe<6;fe++)if(o&&M.mipmaps&&M.mipmaps.length>0)for(let ge=0;ge<M.mipmaps.length;ge++)le(H.__webglFramebuffer[fe][ge],w,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,ge);else le(H.__webglFramebuffer[fe],w,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);S(M,ye)&&x(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ne){const fe=w.texture;for(let ge=0,Re=fe.length;ge<Re;ge++){const Be=fe[ge],Q=n.get(Be);t.bindTexture(r.TEXTURE_2D,Q.__webglTexture),F(r.TEXTURE_2D,Be,ye),le(H.__webglFramebuffer,w,Be,r.COLOR_ATTACHMENT0+ge,r.TEXTURE_2D,0),S(Be,ye)&&x(r.TEXTURE_2D)}t.unbindTexture()}else{let fe=r.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(o?fe=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(fe,te.__webglTexture),F(fe,M,ye),o&&M.mipmaps&&M.mipmaps.length>0)for(let ge=0;ge<M.mipmaps.length;ge++)le(H.__webglFramebuffer[ge],w,M,r.COLOR_ATTACHMENT0,fe,ge);else le(H.__webglFramebuffer,w,M,r.COLOR_ATTACHMENT0,fe,0);S(M,ye)&&x(fe),t.unbindTexture()}w.depthBuffer&&se(w)}function xe(w){const M=m(w)||o,H=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let te=0,ee=H.length;te<ee;te++){const ne=H[te];if(S(ne,M)){const ye=w.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,fe=n.get(ne).__webglTexture;t.bindTexture(ye,fe),x(ye),t.unbindTexture()}}}function _e(w){if(o&&w.samples>0&&ce(w)===!1){const M=w.isWebGLMultipleRenderTargets?w.texture:[w.texture],H=w.width,te=w.height;let ee=r.COLOR_BUFFER_BIT;const ne=[],ye=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,fe=n.get(w),ge=w.isWebGLMultipleRenderTargets===!0;if(ge)for(let Re=0;Re<M.length;Re++)t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let Re=0;Re<M.length;Re++){ne.push(r.COLOR_ATTACHMENT0+Re),w.depthBuffer&&ne.push(ye);const Be=fe.__ignoreDepthValues!==void 0?fe.__ignoreDepthValues:!1;if(Be===!1&&(w.depthBuffer&&(ee|=r.DEPTH_BUFFER_BIT),w.stencilBuffer&&(ee|=r.STENCIL_BUFFER_BIT)),ge&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,fe.__webglColorRenderbuffer[Re]),Be===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[ye]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[ye])),ge){const Q=n.get(M[Re]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Q,0)}r.blitFramebuffer(0,0,H,te,0,0,H,te,ee,r.NEAREST),c&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ne)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ge)for(let Re=0;Re<M.length;Re++){t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.RENDERBUFFER,fe.__webglColorRenderbuffer[Re]);const Be=n.get(M[Re]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.TEXTURE_2D,Be,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}}function be(w){return Math.min(i.maxSamples,w.samples)}function ce(w){const M=n.get(w);return o&&w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Pe(w){const M=a.render.frame;h.get(w)!==M&&(h.set(w,M),w.update())}function Ie(w,M){const H=w.colorSpace,te=w.format,ee=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||w.format===ia||H!==pt&&H!==Wt&&(Ke.getTransfer(H)===st?o===!1?e.has("EXT_sRGB")===!0&&te===Ft?(w.format=ia,w.minFilter=je,w.generateMipmaps=!1):M=sc.sRGBToLinear(M):(te!==Ft||ee!==an)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),M}this.allocateTextureUnit=R,this.resetTextureUnits=$,this.setTexture2D=U,this.setTexture2DArray=X,this.setTexture3D=q,this.setTextureCube=j,this.rebindTextures=he,this.setupRenderTarget=O,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=se,this.setupFrameBufferTexture=le,this.useMultisampledRTT=ce}function d_(r,e,t){const n=t.isWebGL2;function i(s,a=Wt){let o;const l=Ke.getTransfer(a);if(s===an)return r.UNSIGNED_BYTE;if(s===ql)return r.UNSIGNED_SHORT_4_4_4_4;if(s===jl)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Rh)return r.BYTE;if(s===Ch)return r.SHORT;if(s===ga)return r.UNSIGNED_SHORT;if(s===Xl)return r.INT;if(s===Nn)return r.UNSIGNED_INT;if(s===Xt)return r.FLOAT;if(s===yn)return n?r.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Lh)return r.ALPHA;if(s===Ft)return r.RGBA;if(s===Ih)return r.LUMINANCE;if(s===Ph)return r.LUMINANCE_ALPHA;if(s===ni)return r.DEPTH_COMPONENT;if(s===Ni)return r.DEPTH_STENCIL;if(s===ia)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Yl)return r.RED;if(s===$l)return r.RED_INTEGER;if(s===Dh)return r.RG;if(s===Kl)return r.RG_INTEGER;if(s===Zl)return r.RGBA_INTEGER;if(s===hr||s===ur||s===dr||s===fr)if(l===st)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===hr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ur)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===dr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===fr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===hr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ur)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===dr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===fr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Xa||s===qa||s===ja||s===Ya)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Xa)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===qa)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===ja)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Ya)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Jl)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===$a||s===Ka)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===$a)return l===st?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Ka)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Za||s===Ja||s===Qa||s===eo||s===to||s===no||s===io||s===so||s===ro||s===ao||s===oo||s===lo||s===co||s===ho)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Za)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ja)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Qa)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===eo)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===to)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===no)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===io)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===so)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ro)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===ao)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===oo)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===lo)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===co)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===ho)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===pr||s===uo||s===fo)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===pr)return l===st?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===uo)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===fo)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Nh||s===po||s===mo||s===_o)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===pr)return o.COMPRESSED_RED_RGTC1_EXT;if(s===po)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===mo)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===_o)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ti?n?r.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class f_ extends Dt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Jt extends ot{constructor(){super(),this.isGroup=!0,this.type="Group"}}const p_={type:"move"};class kr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),f=this._getHandJoint(c,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,_=.005;c.inputState.pinching&&d>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(p_)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Jt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class m_ extends ai{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,_=null;const v=t.getContextAttributes();let m=null,f=null;const S=[],x=[],T=new Se;let L=null;const A=new Dt;A.layers.enable(1),A.viewport=new et;const b=new Dt;b.layers.enable(2),b.viewport=new et;const D=[A,b],g=new f_;g.layers.enable(1),g.layers.enable(2);let y=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(F){let K=S[F];return K===void 0&&(K=new kr,S[F]=K),K.getTargetRaySpace()},this.getControllerGrip=function(F){let K=S[F];return K===void 0&&(K=new kr,S[F]=K),K.getGripSpace()},this.getHand=function(F){let K=S[F];return K===void 0&&(K=new kr,S[F]=K),K.getHandSpace()};function B(F){const K=x.indexOf(F.inputSource);if(K===-1)return;const oe=S[K];oe!==void 0&&(oe.update(F.inputSource,F.frame,c||a),oe.dispatchEvent({type:F.type,data:F.inputSource}))}function $(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",$),i.removeEventListener("inputsourceschange",R);for(let F=0;F<S.length;F++){const K=x[F];K!==null&&(x[F]=null,S[F].disconnect(K))}y=null,N=null,e.setRenderTarget(m),p=null,d=null,u=null,i=null,f=null,Z.stop(),n.isPresenting=!1,e.setPixelRatio(L),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(F){s=F,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(F){o=F,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(F){c=F},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(F){if(i=F,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",$),i.addEventListener("inputsourceschange",R),v.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(T),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const K={antialias:i.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,t,K),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new En(p.framebufferWidth,p.framebufferHeight,{format:Ft,type:an,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let K=null,oe=null,ie=null;v.depth&&(ie=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=v.stencil?Ni:ni,oe=v.stencil?ti:Nn);const le={colorFormat:t.RGBA8,depthFormat:ie,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(le),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),f=new En(d.textureWidth,d.textureHeight,{format:Ft,type:an,depthTexture:new mc(d.textureWidth,d.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});const pe=e.properties.get(f);pe.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Z.setContext(i),Z.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function R(F){for(let K=0;K<F.removed.length;K++){const oe=F.removed[K],ie=x.indexOf(oe);ie>=0&&(x[ie]=null,S[ie].disconnect(oe))}for(let K=0;K<F.added.length;K++){const oe=F.added[K];let ie=x.indexOf(oe);if(ie===-1){for(let pe=0;pe<S.length;pe++)if(pe>=x.length){x.push(oe),ie=pe;break}else if(x[pe]===null){x[pe]=oe,ie=pe;break}if(ie===-1)break}const le=S[ie];le&&le.connect(oe)}}const I=new C,U=new C;function X(F,K,oe){I.setFromMatrixPosition(K.matrixWorld),U.setFromMatrixPosition(oe.matrixWorld);const ie=I.distanceTo(U),le=K.projectionMatrix.elements,pe=oe.projectionMatrix.elements,G=le[14]/(le[10]-1),se=le[14]/(le[10]+1),he=(le[9]+1)/le[5],O=(le[9]-1)/le[5],xe=(le[8]-1)/le[0],_e=(pe[8]+1)/pe[0],be=G*xe,ce=G*_e,Pe=ie/(-xe+_e),Ie=Pe*-xe;K.matrixWorld.decompose(F.position,F.quaternion,F.scale),F.translateX(Ie),F.translateZ(Pe),F.matrixWorld.compose(F.position,F.quaternion,F.scale),F.matrixWorldInverse.copy(F.matrixWorld).invert();const w=G+Pe,M=se+Pe,H=be-Ie,te=ce+(ie-Ie),ee=he*se/M*w,ne=O*se/M*w;F.projectionMatrix.makePerspective(H,te,ee,ne,w,M),F.projectionMatrixInverse.copy(F.projectionMatrix).invert()}function q(F,K){K===null?F.matrixWorld.copy(F.matrix):F.matrixWorld.multiplyMatrices(K.matrixWorld,F.matrix),F.matrixWorldInverse.copy(F.matrixWorld).invert()}this.updateCamera=function(F){if(i===null)return;g.near=b.near=A.near=F.near,g.far=b.far=A.far=F.far,(y!==g.near||N!==g.far)&&(i.updateRenderState({depthNear:g.near,depthFar:g.far}),y=g.near,N=g.far);const K=F.parent,oe=g.cameras;q(g,K);for(let ie=0;ie<oe.length;ie++)q(oe[ie],K);oe.length===2?X(g,A,b):g.projectionMatrix.copy(A.projectionMatrix),j(F,g,K)};function j(F,K,oe){oe===null?F.matrix.copy(K.matrixWorld):(F.matrix.copy(oe.matrixWorld),F.matrix.invert(),F.matrix.multiply(K.matrixWorld)),F.matrix.decompose(F.position,F.quaternion,F.scale),F.updateMatrixWorld(!0),F.projectionMatrix.copy(K.projectionMatrix),F.projectionMatrixInverse.copy(K.projectionMatrixInverse),F.isPerspectiveCamera&&(F.fov=Fi*2*Math.atan(1/F.projectionMatrix.elements[5]),F.zoom=1)}this.getCamera=function(){return g},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(F){l=F,d!==null&&(d.fixedFoveation=F),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=F)};let Y=null;function J(F,K){if(h=K.getViewerPose(c||a),_=K,h!==null){const oe=h.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let ie=!1;oe.length!==g.cameras.length&&(g.cameras.length=0,ie=!0);for(let le=0;le<oe.length;le++){const pe=oe[le];let G=null;if(p!==null)G=p.getViewport(pe);else{const he=u.getViewSubImage(d,pe);G=he.viewport,le===0&&(e.setRenderTargetTextures(f,he.colorTexture,d.ignoreDepthValues?void 0:he.depthStencilTexture),e.setRenderTarget(f))}let se=D[le];se===void 0&&(se=new Dt,se.layers.enable(le),se.viewport=new et,D[le]=se),se.matrix.fromArray(pe.transform.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale),se.projectionMatrix.fromArray(pe.projectionMatrix),se.projectionMatrixInverse.copy(se.projectionMatrix).invert(),se.viewport.set(G.x,G.y,G.width,G.height),le===0&&(g.matrix.copy(se.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale)),ie===!0&&g.cameras.push(se)}}for(let oe=0;oe<S.length;oe++){const ie=x[oe],le=S[oe];ie!==null&&le!==void 0&&le.update(ie,K,c||a)}Y&&Y(F,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),_=null}const Z=new pc;Z.setAnimationLoop(J),this.setAnimationLoop=function(F){Y=F},this.dispose=function(){}}}function __(r,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,uc(r)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,S,x,T){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),u(m,f)):f.isMeshPhongMaterial?(s(m,f),h(m,f)):f.isMeshStandardMaterial?(s(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,T)):f.isMeshMatcapMaterial?(s(m,f),_(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),v(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,S,x):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ot&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ot&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const S=e.get(f).envMap;if(S&&(m.envMap.value=S,m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const x=r._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*x,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,S,x){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=x*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ot&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const S=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function g_(r,e,t,n){let i={},s={},a=[];const o=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(S,x){const T=x.program;n.uniformBlockBinding(S,T)}function c(S,x){let T=i[S.id];T===void 0&&(_(S),T=h(S),i[S.id]=T,S.addEventListener("dispose",m));const L=x.program;n.updateUBOMapping(S,L);const A=e.render.frame;s[S.id]!==A&&(d(S),s[S.id]=A)}function h(S){const x=u();S.__bindingPointIndex=x;const T=r.createBuffer(),L=S.__size,A=S.usage;return r.bindBuffer(r.UNIFORM_BUFFER,T),r.bufferData(r.UNIFORM_BUFFER,L,A),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,T),T}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const x=i[S.id],T=S.uniforms,L=S.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let A=0,b=T.length;A<b;A++){const D=Array.isArray(T[A])?T[A]:[T[A]];for(let g=0,y=D.length;g<y;g++){const N=D[g];if(p(N,A,g,L)===!0){const B=N.__offset,$=Array.isArray(N.value)?N.value:[N.value];let R=0;for(let I=0;I<$.length;I++){const U=$[I],X=v(U);typeof U=="number"||typeof U=="boolean"?(N.__data[0]=U,r.bufferSubData(r.UNIFORM_BUFFER,B+R,N.__data)):U.isMatrix3?(N.__data[0]=U.elements[0],N.__data[1]=U.elements[1],N.__data[2]=U.elements[2],N.__data[3]=0,N.__data[4]=U.elements[3],N.__data[5]=U.elements[4],N.__data[6]=U.elements[5],N.__data[7]=0,N.__data[8]=U.elements[6],N.__data[9]=U.elements[7],N.__data[10]=U.elements[8],N.__data[11]=0):(U.toArray(N.__data,R),R+=X.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,B,N.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function p(S,x,T,L){const A=S.value,b=x+"_"+T;if(L[b]===void 0)return typeof A=="number"||typeof A=="boolean"?L[b]=A:L[b]=A.clone(),!0;{const D=L[b];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return L[b]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function _(S){const x=S.uniforms;let T=0;const L=16;for(let b=0,D=x.length;b<D;b++){const g=Array.isArray(x[b])?x[b]:[x[b]];for(let y=0,N=g.length;y<N;y++){const B=g[y],$=Array.isArray(B.value)?B.value:[B.value];for(let R=0,I=$.length;R<I;R++){const U=$[R],X=v(U),q=T%L;q!==0&&L-q<X.boundary&&(T+=L-q),B.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=T,T+=X.storage}}}const A=T%L;return A>0&&(T+=L-A),S.__size=T,S.__cache={},this}function v(S){const x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function m(S){const x=S.target;x.removeEventListener("dispose",m);const T=a.indexOf(x.__bindingPointIndex);a.splice(T,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function f(){for(const S in i)r.deleteBuffer(i[S]);a=[],i={},s={}}return{bind:l,update:c,dispose:f}}class Mc{constructor(e={}){const{canvas:t=hu(),context:n=null,depth:i=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;const p=new Uint32Array(4),_=new Int32Array(4);let v=null,m=null;const f=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ye,this._useLegacyLights=!1,this.toneMapping=On,this.toneMappingExposure=1;const x=this;let T=!1,L=0,A=0,b=null,D=-1,g=null;const y=new et,N=new et;let B=null;const $=new Ae(0);let R=0,I=t.width,U=t.height,X=1,q=null,j=null;const Y=new et(0,0,I,U),J=new et(0,0,I,U);let Z=!1;const F=new Sa;let K=!1,oe=!1,ie=null;const le=new Ue,pe=new Se,G=new C,se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function he(){return b===null?X:1}let O=n;function xe(E,k){for(let V=0;V<E.length;V++){const W=E[V],z=t.getContext(W,k);if(z!==null)return z}return null}try{const E={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${_a}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",P,!1),t.addEventListener("webglcontextcreationerror",ue,!1),O===null){const k=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&k.shift(),O=xe(k,E),O===null)throw xe(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let _e,be,ce,Pe,Ie,w,M,H,te,ee,ne,ye,fe,ge,Re,Be,Q,Je,We,De,Ee,ve,Oe,Ze;function lt(){_e=new Ap(O),be=new Mp(O,_e,e),_e.init(be),ve=new d_(O,_e,be),ce=new h_(O,_e,be),Pe=new Lp(O),Ie=new Km,w=new u_(O,_e,ce,Ie,be,ve,Pe),M=new bp(x),H=new wp(x),te=new Ou(O,be),Oe=new xp(O,_e,te,be),ee=new Rp(O,te,Pe,Oe),ne=new Np(O,ee,te,Pe),We=new Dp(O,be,w),Be=new Sp(Ie),ye=new $m(x,M,H,_e,be,Oe,Be),fe=new __(x,Ie),ge=new Jm,Re=new s_(_e,be),Je=new vp(x,M,H,ce,ne,d,l),Q=new c_(x,ne,be),Ze=new g_(O,Pe,be,ce),De=new yp(O,_e,Pe,be),Ee=new Cp(O,_e,Pe,be),Pe.programs=ye.programs,x.capabilities=be,x.extensions=_e,x.properties=Ie,x.renderLists=ge,x.shadowMap=Q,x.state=ce,x.info=Pe}lt();const He=new m_(x,O);this.xr=He,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const E=_e.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=_e.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(E){E!==void 0&&(X=E,this.setSize(I,U,!1))},this.getSize=function(E){return E.set(I,U)},this.setSize=function(E,k,V=!0){if(He.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=E,U=k,t.width=Math.floor(E*X),t.height=Math.floor(k*X),V===!0&&(t.style.width=E+"px",t.style.height=k+"px"),this.setViewport(0,0,E,k)},this.getDrawingBufferSize=function(E){return E.set(I*X,U*X).floor()},this.setDrawingBufferSize=function(E,k,V){I=E,U=k,X=V,t.width=Math.floor(E*V),t.height=Math.floor(k*V),this.setViewport(0,0,E,k)},this.getCurrentViewport=function(E){return E.copy(y)},this.getViewport=function(E){return E.copy(Y)},this.setViewport=function(E,k,V,W){E.isVector4?Y.set(E.x,E.y,E.z,E.w):Y.set(E,k,V,W),ce.viewport(y.copy(Y).multiplyScalar(X).floor())},this.getScissor=function(E){return E.copy(J)},this.setScissor=function(E,k,V,W){E.isVector4?J.set(E.x,E.y,E.z,E.w):J.set(E,k,V,W),ce.scissor(N.copy(J).multiplyScalar(X).floor())},this.getScissorTest=function(){return Z},this.setScissorTest=function(E){ce.setScissorTest(Z=E)},this.setOpaqueSort=function(E){q=E},this.setTransparentSort=function(E){j=E},this.getClearColor=function(E){return E.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor.apply(Je,arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha.apply(Je,arguments)},this.clear=function(E=!0,k=!0,V=!0){let W=0;if(E){let z=!1;if(b!==null){const me=b.texture.format;z=me===Zl||me===Kl||me===$l}if(z){const me=b.texture.type,Me=me===an||me===Nn||me===ga||me===ti||me===ql||me===jl,we=Je.getClearColor(),Le=Je.getClearAlpha(),ze=we.r,Ne=we.g,Fe=we.b;Me?(p[0]=ze,p[1]=Ne,p[2]=Fe,p[3]=Le,O.clearBufferuiv(O.COLOR,0,p)):(_[0]=ze,_[1]=Ne,_[2]=Fe,_[3]=Le,O.clearBufferiv(O.COLOR,0,_))}else W|=O.COLOR_BUFFER_BIT}k&&(W|=O.DEPTH_BUFFER_BIT),V&&(W|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",P,!1),t.removeEventListener("webglcontextcreationerror",ue,!1),ge.dispose(),Re.dispose(),Ie.dispose(),M.dispose(),H.dispose(),ne.dispose(),Oe.dispose(),Ze.dispose(),ye.dispose(),He.dispose(),He.removeEventListener("sessionstart",Ct),He.removeEventListener("sessionend",it),ie&&(ie.dispose(),ie=null),Lt.stop()};function re(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const E=Pe.autoReset,k=Q.enabled,V=Q.autoUpdate,W=Q.needsUpdate,z=Q.type;lt(),Pe.autoReset=E,Q.enabled=k,Q.autoUpdate=V,Q.needsUpdate=W,Q.type=z}function ue(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function de(E){const k=E.target;k.removeEventListener("dispose",de),Ce(k)}function Ce(E){Te(E),Ie.remove(E)}function Te(E){const k=Ie.get(E).programs;k!==void 0&&(k.forEach(function(V){ye.releaseProgram(V)}),E.isShaderMaterial&&ye.releaseShaderCache(E))}this.renderBufferDirect=function(E,k,V,W,z,me){k===null&&(k=se);const Me=z.isMesh&&z.matrixWorld.determinant()<0,we=Wc(E,k,V,W,z);ce.setMaterial(W,Me);let Le=V.index,ze=1;if(W.wireframe===!0){if(Le=ee.getWireframeAttribute(V),Le===void 0)return;ze=2}const Ne=V.drawRange,Fe=V.attributes.position;let ut=Ne.start*ze,kt=(Ne.start+Ne.count)*ze;me!==null&&(ut=Math.max(ut,me.start*ze),kt=Math.min(kt,(me.start+me.count)*ze)),Le!==null?(ut=Math.max(ut,0),kt=Math.min(kt,Le.count)):Fe!=null&&(ut=Math.max(ut,0),kt=Math.min(kt,Fe.count));const xt=kt-ut;if(xt<0||xt===1/0)return;Oe.setup(z,W,we,V,Le);let hn,at=De;if(Le!==null&&(hn=te.get(Le),at=Ee,at.setIndex(hn)),z.isMesh)W.wireframe===!0?(ce.setLineWidth(W.wireframeLinewidth*he()),at.setMode(O.LINES)):at.setMode(O.TRIANGLES);else if(z.isLine){let Ve=W.linewidth;Ve===void 0&&(Ve=1),ce.setLineWidth(Ve*he()),z.isLineSegments?at.setMode(O.LINES):z.isLineLoop?at.setMode(O.LINE_LOOP):at.setMode(O.LINE_STRIP)}else z.isPoints?at.setMode(O.POINTS):z.isSprite&&at.setMode(O.TRIANGLES);if(z.isBatchedMesh)at.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else if(z.isInstancedMesh)at.renderInstances(ut,xt,z.count);else if(V.isInstancedBufferGeometry){const Ve=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,ar=Math.min(V.instanceCount,Ve);at.renderInstances(ut,xt,ar)}else at.render(ut,xt)};function tt(E,k,V){E.transparent===!0&&E.side===Nt&&E.forceSinglePass===!1?(E.side=Ot,E.needsUpdate=!0,ds(E,k,V),E.side=qt,E.needsUpdate=!0,ds(E,k,V),E.side=Nt):ds(E,k,V)}this.compile=function(E,k,V=null){V===null&&(V=E),m=Re.get(V),m.init(),S.push(m),V.traverseVisible(function(z){z.isLight&&z.layers.test(k.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),E!==V&&E.traverseVisible(function(z){z.isLight&&z.layers.test(k.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),m.setupLights(x._useLegacyLights);const W=new Set;return E.traverse(function(z){const me=z.material;if(me)if(Array.isArray(me))for(let Me=0;Me<me.length;Me++){const we=me[Me];tt(we,V,z),W.add(we)}else tt(me,V,z),W.add(me)}),S.pop(),m=null,W},this.compileAsync=function(E,k,V=null){const W=this.compile(E,k,V);return new Promise(z=>{function me(){if(W.forEach(function(Me){Ie.get(Me).currentProgram.isReady()&&W.delete(Me)}),W.size===0){z(E);return}setTimeout(me,10)}_e.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let nt=null;function vt(E){nt&&nt(E)}function Ct(){Lt.stop()}function it(){Lt.start()}const Lt=new pc;Lt.setAnimationLoop(vt),typeof self<"u"&&Lt.setContext(self),this.setAnimationLoop=function(E){nt=E,He.setAnimationLoop(E),E===null?Lt.stop():Lt.start()},He.addEventListener("sessionstart",Ct),He.addEventListener("sessionend",it),this.render=function(E,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),He.enabled===!0&&He.isPresenting===!0&&(He.cameraAutoUpdate===!0&&He.updateCamera(k),k=He.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,k,b),m=Re.get(E,S.length),m.init(),S.push(m),le.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),F.setFromProjectionMatrix(le),oe=this.localClippingEnabled,K=Be.init(this.clippingPlanes,oe),v=ge.get(E,f.length),v.init(),f.push(v),nn(E,k,0,x.sortObjects),v.finish(),x.sortObjects===!0&&v.sort(q,j),this.info.render.frame++,K===!0&&Be.beginShadows();const V=m.state.shadowsArray;if(Q.render(V,E,k),K===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),Je.render(v,E),m.setupLights(x._useLegacyLights),k.isArrayCamera){const W=k.cameras;for(let z=0,me=W.length;z<me;z++){const Me=W[z];Pa(v,E,Me,Me.viewport)}}else Pa(v,E,k);b!==null&&(w.updateMultisampleRenderTarget(b),w.updateRenderTargetMipmap(b)),E.isScene===!0&&E.onAfterRender(x,E,k),Oe.resetDefaultState(),D=-1,g=null,S.pop(),S.length>0?m=S[S.length-1]:m=null,f.pop(),f.length>0?v=f[f.length-1]:v=null};function nn(E,k,V,W){if(E.visible===!1)return;if(E.layers.test(k.layers)){if(E.isGroup)V=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(k);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||F.intersectsSprite(E)){W&&G.setFromMatrixPosition(E.matrixWorld).applyMatrix4(le);const Me=ne.update(E),we=E.material;we.visible&&v.push(E,Me,we,V,G.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||F.intersectsObject(E))){const Me=ne.update(E),we=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),G.copy(E.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),G.copy(Me.boundingSphere.center)),G.applyMatrix4(E.matrixWorld).applyMatrix4(le)),Array.isArray(we)){const Le=Me.groups;for(let ze=0,Ne=Le.length;ze<Ne;ze++){const Fe=Le[ze],ut=we[Fe.materialIndex];ut&&ut.visible&&v.push(E,Me,ut,V,G.z,Fe)}}else we.visible&&v.push(E,Me,we,V,G.z,null)}}const me=E.children;for(let Me=0,we=me.length;Me<we;Me++)nn(me[Me],k,V,W)}function Pa(E,k,V,W){const z=E.opaque,me=E.transmissive,Me=E.transparent;m.setupLightsView(V),K===!0&&Be.setGlobalState(x.clippingPlanes,V),me.length>0&&Gc(z,me,k,V),W&&ce.viewport(y.copy(W)),z.length>0&&us(z,k,V),me.length>0&&us(me,k,V),Me.length>0&&us(Me,k,V),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function Gc(E,k,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;const me=be.isWebGL2;ie===null&&(ie=new En(1,1,{generateMipmaps:!0,type:_e.has("EXT_color_buffer_half_float")?yn:an,minFilter:zn,samples:me?4:0})),x.getDrawingBufferSize(pe),me?ie.setSize(pe.x,pe.y):ie.setSize(Qs(pe.x),Qs(pe.y));const Me=x.getRenderTarget();x.setRenderTarget(ie),x.getClearColor($),R=x.getClearAlpha(),R<1&&x.setClearColor(16777215,.5),x.clear();const we=x.toneMapping;x.toneMapping=On,us(E,V,W),w.updateMultisampleRenderTarget(ie),w.updateRenderTargetMipmap(ie);let Le=!1;for(let ze=0,Ne=k.length;ze<Ne;ze++){const Fe=k[ze],ut=Fe.object,kt=Fe.geometry,xt=Fe.material,hn=Fe.group;if(xt.side===Nt&&ut.layers.test(W.layers)){const at=xt.side;xt.side=Ot,xt.needsUpdate=!0,Da(ut,V,W,kt,xt,hn),xt.side=at,xt.needsUpdate=!0,Le=!0}}Le===!0&&(w.updateMultisampleRenderTarget(ie),w.updateRenderTargetMipmap(ie)),x.setRenderTarget(Me),x.setClearColor($,R),x.toneMapping=we}function us(E,k,V){const W=k.isScene===!0?k.overrideMaterial:null;for(let z=0,me=E.length;z<me;z++){const Me=E[z],we=Me.object,Le=Me.geometry,ze=W===null?Me.material:W,Ne=Me.group;we.layers.test(V.layers)&&Da(we,k,V,Le,ze,Ne)}}function Da(E,k,V,W,z,me){E.onBeforeRender(x,k,V,W,z,me),E.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),z.onBeforeRender(x,k,V,W,E,me),z.transparent===!0&&z.side===Nt&&z.forceSinglePass===!1?(z.side=Ot,z.needsUpdate=!0,x.renderBufferDirect(V,k,W,z,E,me),z.side=qt,z.needsUpdate=!0,x.renderBufferDirect(V,k,W,z,E,me),z.side=Nt):x.renderBufferDirect(V,k,W,z,E,me),E.onAfterRender(x,k,V,W,z,me)}function ds(E,k,V){k.isScene!==!0&&(k=se);const W=Ie.get(E),z=m.state.lights,me=m.state.shadowsArray,Me=z.state.version,we=ye.getParameters(E,z.state,me,k,V),Le=ye.getProgramCacheKey(we);let ze=W.programs;W.environment=E.isMeshStandardMaterial?k.environment:null,W.fog=k.fog,W.envMap=(E.isMeshStandardMaterial?H:M).get(E.envMap||W.environment),ze===void 0&&(E.addEventListener("dispose",de),ze=new Map,W.programs=ze);let Ne=ze.get(Le);if(Ne!==void 0){if(W.currentProgram===Ne&&W.lightsStateVersion===Me)return Ua(E,we),Ne}else we.uniforms=ye.getUniforms(E),E.onBuild(V,we,x),E.onBeforeCompile(we,x),Ne=ye.acquireProgram(we,Le),ze.set(Le,Ne),W.uniforms=we.uniforms;const Fe=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Fe.clippingPlanes=Be.uniform),Ua(E,we),W.needsLights=qc(E),W.lightsStateVersion=Me,W.needsLights&&(Fe.ambientLightColor.value=z.state.ambient,Fe.lightProbe.value=z.state.probe,Fe.directionalLights.value=z.state.directional,Fe.directionalLightShadows.value=z.state.directionalShadow,Fe.spotLights.value=z.state.spot,Fe.spotLightShadows.value=z.state.spotShadow,Fe.rectAreaLights.value=z.state.rectArea,Fe.ltc_1.value=z.state.rectAreaLTC1,Fe.ltc_2.value=z.state.rectAreaLTC2,Fe.pointLights.value=z.state.point,Fe.pointLightShadows.value=z.state.pointShadow,Fe.hemisphereLights.value=z.state.hemi,Fe.directionalShadowMap.value=z.state.directionalShadowMap,Fe.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Fe.spotShadowMap.value=z.state.spotShadowMap,Fe.spotLightMatrix.value=z.state.spotLightMatrix,Fe.spotLightMap.value=z.state.spotLightMap,Fe.pointShadowMap.value=z.state.pointShadowMap,Fe.pointShadowMatrix.value=z.state.pointShadowMatrix),W.currentProgram=Ne,W.uniformsList=null,Ne}function Na(E){if(E.uniformsList===null){const k=E.currentProgram.getUniforms();E.uniformsList=Ws.seqWithValue(k.seq,E.uniforms)}return E.uniformsList}function Ua(E,k){const V=Ie.get(E);V.outputColorSpace=k.outputColorSpace,V.batching=k.batching,V.instancing=k.instancing,V.instancingColor=k.instancingColor,V.skinning=k.skinning,V.morphTargets=k.morphTargets,V.morphNormals=k.morphNormals,V.morphColors=k.morphColors,V.morphTargetsCount=k.morphTargetsCount,V.numClippingPlanes=k.numClippingPlanes,V.numIntersection=k.numClipIntersection,V.vertexAlphas=k.vertexAlphas,V.vertexTangents=k.vertexTangents,V.toneMapping=k.toneMapping}function Wc(E,k,V,W,z){k.isScene!==!0&&(k=se),w.resetTextureUnits();const me=k.fog,Me=W.isMeshStandardMaterial?k.environment:null,we=b===null?x.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:pt,Le=(W.isMeshStandardMaterial?H:M).get(W.envMap||Me),ze=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ne=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Fe=!!V.morphAttributes.position,ut=!!V.morphAttributes.normal,kt=!!V.morphAttributes.color;let xt=On;W.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(xt=x.toneMapping);const hn=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,at=hn!==void 0?hn.length:0,Ve=Ie.get(W),ar=m.state.lights;if(K===!0&&(oe===!0||E!==g)){const Ht=E===g&&W.id===D;Be.setState(W,E,Ht)}let ct=!1;W.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==ar.state.version||Ve.outputColorSpace!==we||z.isBatchedMesh&&Ve.batching===!1||!z.isBatchedMesh&&Ve.batching===!0||z.isInstancedMesh&&Ve.instancing===!1||!z.isInstancedMesh&&Ve.instancing===!0||z.isSkinnedMesh&&Ve.skinning===!1||!z.isSkinnedMesh&&Ve.skinning===!0||z.isInstancedMesh&&Ve.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ve.instancingColor===!1&&z.instanceColor!==null||Ve.envMap!==Le||W.fog===!0&&Ve.fog!==me||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==Be.numPlanes||Ve.numIntersection!==Be.numIntersection)||Ve.vertexAlphas!==ze||Ve.vertexTangents!==Ne||Ve.morphTargets!==Fe||Ve.morphNormals!==ut||Ve.morphColors!==kt||Ve.toneMapping!==xt||be.isWebGL2===!0&&Ve.morphTargetsCount!==at)&&(ct=!0):(ct=!0,Ve.__version=W.version);let Vn=Ve.currentProgram;ct===!0&&(Vn=ds(W,k,z));let Fa=!1,Xi=!1,or=!1;const Et=Vn.getUniforms(),Gn=Ve.uniforms;if(ce.useProgram(Vn.program)&&(Fa=!0,Xi=!0,or=!0),W.id!==D&&(D=W.id,Xi=!0),Fa||g!==E){Et.setValue(O,"projectionMatrix",E.projectionMatrix),Et.setValue(O,"viewMatrix",E.matrixWorldInverse);const Ht=Et.map.cameraPosition;Ht!==void 0&&Ht.setValue(O,G.setFromMatrixPosition(E.matrixWorld)),be.logarithmicDepthBuffer&&Et.setValue(O,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Et.setValue(O,"isOrthographic",E.isOrthographicCamera===!0),g!==E&&(g=E,Xi=!0,or=!0)}if(z.isSkinnedMesh){Et.setOptional(O,z,"bindMatrix"),Et.setOptional(O,z,"bindMatrixInverse");const Ht=z.skeleton;Ht&&(be.floatVertexTextures?(Ht.boneTexture===null&&Ht.computeBoneTexture(),Et.setValue(O,"boneTexture",Ht.boneTexture,w)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}z.isBatchedMesh&&(Et.setOptional(O,z,"batchingTexture"),Et.setValue(O,"batchingTexture",z._matricesTexture,w));const lr=V.morphAttributes;if((lr.position!==void 0||lr.normal!==void 0||lr.color!==void 0&&be.isWebGL2===!0)&&We.update(z,V,Vn),(Xi||Ve.receiveShadow!==z.receiveShadow)&&(Ve.receiveShadow=z.receiveShadow,Et.setValue(O,"receiveShadow",z.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Gn.envMap.value=Le,Gn.flipEnvMap.value=Le.isCubeTexture&&Le.isRenderTargetTexture===!1?-1:1),Xi&&(Et.setValue(O,"toneMappingExposure",x.toneMappingExposure),Ve.needsLights&&Xc(Gn,or),me&&W.fog===!0&&fe.refreshFogUniforms(Gn,me),fe.refreshMaterialUniforms(Gn,W,X,U,ie),Ws.upload(O,Na(Ve),Gn,w)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ws.upload(O,Na(Ve),Gn,w),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Et.setValue(O,"center",z.center),Et.setValue(O,"modelViewMatrix",z.modelViewMatrix),Et.setValue(O,"normalMatrix",z.normalMatrix),Et.setValue(O,"modelMatrix",z.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Ht=W.uniformsGroups;for(let cr=0,jc=Ht.length;cr<jc;cr++)if(be.isWebGL2){const Oa=Ht[cr];Ze.update(Oa,Vn),Ze.bind(Oa,Vn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Vn}function Xc(E,k){E.ambientLightColor.needsUpdate=k,E.lightProbe.needsUpdate=k,E.directionalLights.needsUpdate=k,E.directionalLightShadows.needsUpdate=k,E.pointLights.needsUpdate=k,E.pointLightShadows.needsUpdate=k,E.spotLights.needsUpdate=k,E.spotLightShadows.needsUpdate=k,E.rectAreaLights.needsUpdate=k,E.hemisphereLights.needsUpdate=k}function qc(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(E,k,V){Ie.get(E.texture).__webglTexture=k,Ie.get(E.depthTexture).__webglTexture=V;const W=Ie.get(E);W.__hasExternalTextures=!0,W.__hasExternalTextures&&(W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||_e.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,k){const V=Ie.get(E);V.__webglFramebuffer=k,V.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(E,k=0,V=0){b=E,L=k,A=V;let W=!0,z=null,me=!1,Me=!1;if(E){const Le=Ie.get(E);Le.__useDefaultFramebuffer!==void 0?(ce.bindFramebuffer(O.FRAMEBUFFER,null),W=!1):Le.__webglFramebuffer===void 0?w.setupRenderTarget(E):Le.__hasExternalTextures&&w.rebindTextures(E,Ie.get(E.texture).__webglTexture,Ie.get(E.depthTexture).__webglTexture);const ze=E.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(Me=!0);const Ne=Ie.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ne[k])?z=Ne[k][V]:z=Ne[k],me=!0):be.isWebGL2&&E.samples>0&&w.useMultisampledRTT(E)===!1?z=Ie.get(E).__webglMultisampledFramebuffer:Array.isArray(Ne)?z=Ne[V]:z=Ne,y.copy(E.viewport),N.copy(E.scissor),B=E.scissorTest}else y.copy(Y).multiplyScalar(X).floor(),N.copy(J).multiplyScalar(X).floor(),B=Z;if(ce.bindFramebuffer(O.FRAMEBUFFER,z)&&be.drawBuffers&&W&&ce.drawBuffers(E,z),ce.viewport(y),ce.scissor(N),ce.setScissorTest(B),me){const Le=Ie.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+k,Le.__webglTexture,V)}else if(Me){const Le=Ie.get(E.texture),ze=k||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Le.__webglTexture,V||0,ze)}D=-1},this.readRenderTargetPixels=function(E,k,V,W,z,me,Me){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=Ie.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Me!==void 0&&(we=we[Me]),we){ce.bindFramebuffer(O.FRAMEBUFFER,we);try{const Le=E.texture,ze=Le.format,Ne=Le.type;if(ze!==Ft&&ve.convert(ze)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Fe=Ne===yn&&(_e.has("EXT_color_buffer_half_float")||be.isWebGL2&&_e.has("EXT_color_buffer_float"));if(Ne!==an&&ve.convert(Ne)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ne===Xt&&(be.isWebGL2||_e.has("OES_texture_float")||_e.has("WEBGL_color_buffer_float")))&&!Fe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=E.width-W&&V>=0&&V<=E.height-z&&O.readPixels(k,V,W,z,ve.convert(ze),ve.convert(Ne),me)}finally{const Le=b!==null?Ie.get(b).__webglFramebuffer:null;ce.bindFramebuffer(O.FRAMEBUFFER,Le)}}},this.copyFramebufferToTexture=function(E,k,V=0){const W=Math.pow(2,-V),z=Math.floor(k.image.width*W),me=Math.floor(k.image.height*W);w.setTexture2D(k,0),O.copyTexSubImage2D(O.TEXTURE_2D,V,0,0,E.x,E.y,z,me),ce.unbindTexture()},this.copyTextureToTexture=function(E,k,V,W=0){const z=k.image.width,me=k.image.height,Me=ve.convert(V.format),we=ve.convert(V.type);w.setTexture2D(V,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,V.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,V.unpackAlignment),k.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,W,E.x,E.y,z,me,Me,we,k.image.data):k.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,W,E.x,E.y,k.mipmaps[0].width,k.mipmaps[0].height,Me,k.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,W,E.x,E.y,Me,we,k.image),W===0&&V.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),ce.unbindTexture()},this.copyTextureToTexture3D=function(E,k,V,W,z=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const me=E.max.x-E.min.x+1,Me=E.max.y-E.min.y+1,we=E.max.z-E.min.z+1,Le=ve.convert(W.format),ze=ve.convert(W.type);let Ne;if(W.isData3DTexture)w.setTexture3D(W,0),Ne=O.TEXTURE_3D;else if(W.isDataArrayTexture||W.isCompressedArrayTexture)w.setTexture2DArray(W,0),Ne=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,W.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,W.unpackAlignment);const Fe=O.getParameter(O.UNPACK_ROW_LENGTH),ut=O.getParameter(O.UNPACK_IMAGE_HEIGHT),kt=O.getParameter(O.UNPACK_SKIP_PIXELS),xt=O.getParameter(O.UNPACK_SKIP_ROWS),hn=O.getParameter(O.UNPACK_SKIP_IMAGES),at=V.isCompressedTexture?V.mipmaps[z]:V.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,at.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,at.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,E.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,E.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,E.min.z),V.isDataTexture||V.isData3DTexture?O.texSubImage3D(Ne,z,k.x,k.y,k.z,me,Me,we,Le,ze,at.data):V.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(Ne,z,k.x,k.y,k.z,me,Me,we,Le,at.data)):O.texSubImage3D(Ne,z,k.x,k.y,k.z,me,Me,we,Le,ze,at),O.pixelStorei(O.UNPACK_ROW_LENGTH,Fe),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ut),O.pixelStorei(O.UNPACK_SKIP_PIXELS,kt),O.pixelStorei(O.UNPACK_SKIP_ROWS,xt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,hn),z===0&&W.generateMipmaps&&O.generateMipmap(Ne),ce.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?w.setTextureCube(E,0):E.isData3DTexture?w.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?w.setTexture2DArray(E,0):w.setTexture2D(E,0),ce.unbindTexture()},this.resetState=function(){L=0,A=0,b=null,ce.reset(),Oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===xa?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace===tr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ye?ii:ec}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ii?Ye:pt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class v_ extends Mc{}v_.prototype.isWebGL1Renderer=!0;class Sc extends ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class x_{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=na,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=en()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=en()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=en()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const It=new C;class Ea{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=rn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=rn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=rn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=rn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),i=Qe(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),i=Qe(i,this.array),s=Qe(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new bt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ea(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const il=new C,sl=new et,rl=new et,y_=new C,al=new Ue,Fs=new C,Br=new jt,ol=new Ue,zr=new cs;class M_ extends Xe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Wa,this.bindMatrix=new Ue,this.bindMatrixInverse=new Ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Rt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fs),this.boundingBox.expandByPoint(Fs)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new jt),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fs),this.boundingSphere.expandByPoint(Fs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Br.copy(this.boundingSphere),Br.applyMatrix4(i),e.ray.intersectsSphere(Br)!==!1&&(ol.copy(i).invert(),zr.copy(e.ray).applyMatrix4(ol),!(this.boundingBox!==null&&zr.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,zr)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new et,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Wa?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ah?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;sl.fromBufferAttribute(i.attributes.skinIndex,e),rl.fromBufferAttribute(i.attributes.skinWeight,e),il.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const a=rl.getComponent(s);if(a!==0){const o=sl.getComponent(s);al.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(y_.copy(il).applyMatrix4(al),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class bc extends ot{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Ta extends mt{constructor(e=null,t=1,n=1,i,s,a,o,l,c=Mt,h=Mt,u,d){super(null,a,o,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ll=new Ue,S_=new Ue;class wa{constructor(e=[],t=[]){this.uuid=en(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:S_;ll.multiplyMatrices(o,t[s]),ll.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new wa(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Ta(t,e,e,Ft,Xt);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new bc),this.bones.push(a),this.boneInverses.push(new Ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class oa extends bt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const bi=new Ue,cl=new Ue,Os=[],hl=new Rt,b_=new Ue,Ki=new Xe,Zi=new jt;class E_ extends Xe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new oa(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,b_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Rt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,bi),hl.copy(e.boundingBox).applyMatrix4(bi),this.boundingBox.union(hl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new jt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,bi),Zi.copy(e.boundingSphere).applyMatrix4(bi),this.boundingSphere.union(Zi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ki.geometry=this.geometry,Ki.material=this.material,Ki.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zi.copy(this.boundingSphere),Zi.applyMatrix4(n),e.ray.intersectsSphere(Zi)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,bi),cl.multiplyMatrices(n,bi),Ki.matrixWorld=cl,Ki.raycast(e,Os);for(let a=0,o=Os.length;a<o;a++){const l=Os[a];l.instanceId=s,l.object=this,t.push(l)}Os.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new oa(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Ec extends on{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ul=new C,dl=new C,fl=new Ue,Hr=new cs,ks=new jt;class Aa extends ot{constructor(e=new tn,t=new Ec){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)ul.fromBufferAttribute(t,i-1),dl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ul.distanceTo(dl);e.setAttribute("lineDistance",new bn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ks.copy(n.boundingSphere),ks.applyMatrix4(i),ks.radius+=s,e.ray.intersectsSphere(ks)===!1)return;fl.copy(i).invert(),Hr.copy(e.ray).applyMatrix4(fl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new C,h=new C,u=new C,d=new C,p=this.isLineSegments?2:1,_=n.index,m=n.attributes.position;if(_!==null){const f=Math.max(0,a.start),S=Math.min(_.count,a.start+a.count);for(let x=f,T=S-1;x<T;x+=p){const L=_.getX(x),A=_.getX(x+1);if(c.fromBufferAttribute(m,L),h.fromBufferAttribute(m,A),Hr.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const D=e.ray.origin.distanceTo(d);D<e.near||D>e.far||t.push({distance:D,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,a.start),S=Math.min(m.count,a.start+a.count);for(let x=f,T=S-1;x<T;x+=p){if(c.fromBufferAttribute(m,x),h.fromBufferAttribute(m,x+1),Hr.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(d);A<e.near||A>e.far||t.push({distance:A,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}const pl=new C,ml=new C;class T_ extends Aa{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)pl.fromBufferAttribute(t,i),ml.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+pl.distanceTo(ml);e.setAttribute("lineDistance",new bn(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class w_ extends Aa{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Tc extends on{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const _l=new Ue,la=new cs,Bs=new jt,zs=new C;class A_ extends ot{constructor(e=new tn,t=new Tc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bs.copy(n.boundingSphere),Bs.applyMatrix4(i),Bs.radius+=s,e.ray.intersectsSphere(Bs)===!1)return;_l.copy(i).invert(),la.copy(e.ray).applyMatrix4(_l);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let _=d,v=p;_<v;_++){const m=c.getX(_);zs.fromBufferAttribute(u,m),gl(zs,m,l,i,e,t,this)}}else{const d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let _=d,v=p;_<v;_++)zs.fromBufferAttribute(u,_),gl(zs,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function gl(r,e,t,n,i,s,a){const o=la.distanceSqToPoint(r);if(o<t){const l=new C;la.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class R_ extends mt{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isVideoTexture=!0,this.minFilter=a!==void 0?a:je,this.magFilter=s!==void 0?s:je,this.generateMipmaps=!1;const h=this;function u(){h.needsUpdate=!0,e.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(u)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class Vi extends mt{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Qt extends on{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ae(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tc,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Tn extends Qt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Se(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return St(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ae(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ae(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ae(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function Hs(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function C_(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function L_(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function vl(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function wc(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push.apply(t,a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}class hs{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class I_ extends hs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ti,endingEnd:Ti}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case wi:s=e,o=2*t-n;break;case Ys:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case wi:a=e,l=2*n-t;break;case Ys:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,_=(n-t)/(i-t),v=_*_,m=v*_,f=-d*m+2*d*v-d*_,S=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*_+1,x=(-1-p)*m+(1.5+p)*v+.5*_,T=p*m-p*v;for(let L=0;L!==o;++L)s[L]=f*a[h+L]+S*a[c+L]+x*a[l+L]+T*a[u+L];return s}}class Ac extends hs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}}class P_ extends hs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class cn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Hs(t,this.TimeBufferType),this.values=Hs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Hs(e.times,Array),values:Hs(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new P_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ac(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new I_(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case as:t=this.InterpolantFactoryMethodDiscrete;break;case Ui:t=this.InterpolantFactoryMethodLinear;break;case mr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return as;case this.InterpolantFactoryMethodLinear:return Ui;case this.InterpolantFactoryMethodSmooth:return mr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&C_(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===mr,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{const u=o*n,d=u-n,p=u+n;for(let _=0;_!==n;++_){const v=t[u+_];if(v!==t[d+_]||v!==t[p+_]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let p=0;p!==n;++p)t[d+p]=t[u+p]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}cn.prototype.TimeBufferType=Float32Array;cn.prototype.ValueBufferType=Float32Array;cn.prototype.DefaultInterpolation=Ui;class Gi extends cn{}Gi.prototype.ValueTypeName="bool";Gi.prototype.ValueBufferType=Array;Gi.prototype.DefaultInterpolation=as;Gi.prototype.InterpolantFactoryMethodLinear=void 0;Gi.prototype.InterpolantFactoryMethodSmooth=void 0;class Rc extends cn{}Rc.prototype.ValueTypeName="color";class ki extends cn{}ki.prototype.ValueTypeName="number";class D_ extends hs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let h=c+o;c!==h;c+=4)rt.slerpFlat(s,0,a,c-o,a,c,l);return s}}class ri extends cn{InterpolantFactoryMethodLinear(e){return new D_(this.times,this.values,this.getValueSize(),e)}}ri.prototype.ValueTypeName="quaternion";ri.prototype.DefaultInterpolation=Ui;ri.prototype.InterpolantFactoryMethodSmooth=void 0;class Wi extends cn{}Wi.prototype.ValueTypeName="string";Wi.prototype.ValueBufferType=Array;Wi.prototype.DefaultInterpolation=as;Wi.prototype.InterpolantFactoryMethodLinear=void 0;Wi.prototype.InterpolantFactoryMethodSmooth=void 0;class Bi extends cn{}Bi.prototype.ValueTypeName="vector";class ca{constructor(e,t=-1,n,i=va){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=en(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(U_(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,a=n.length;s!==a;++s)t.push(cn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const h=L_(l);l=vl(l,1,h),c=vl(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new ki(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,p,_,v){if(p.length!==0){const m=[],f=[];wc(p,m,f,_),m.length!==0&&v.push(new u(d,m,f))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let _;for(_=0;_<d.length;_++)if(d[_].morphTargets)for(let v=0;v<d[_].morphTargets.length;v++)p[d[_].morphTargets[v]]=-1;for(const v in p){const m=[],f=[];for(let S=0;S!==d[_].morphTargets.length;++S){const x=d[_];m.push(x.time),f.push(x.morphTarget===v?1:0)}i.push(new ki(".morphTargetInfluence["+v+"]",m,f))}l=p.length*a}else{const p=".bones["+t[u].name+"]";n(Bi,p+".position",d,"pos",i),n(ri,p+".quaternion",d,"rot",i),n(Bi,p+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function N_(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ki;case"vector":case"vector2":case"vector3":case"vector4":return Bi;case"color":return Rc;case"quaternion":return ri;case"bool":case"boolean":return Gi;case"string":return Wi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function U_(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=N_(r.type);if(r.times===void 0){const t=[],n=[];wc(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Un={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class F_{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const p=c[u],_=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return _}return null}}}const Cc=new F_;class Hn{constructor(e){this.manager=e!==void 0?e:Cc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Hn.DEFAULT_MATERIAL_NAME="__DEFAULT";const _n={};class O_ extends Error{constructor(e,t){super(e),this.response=t}}class ls extends Hn{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Un.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(_n[e]!==void 0){_n[e].push({onLoad:t,onProgress:n,onError:i});return}_n[e]=[],_n[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=_n[e],u=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),p=d?parseInt(d):0,_=p!==0;let v=0;const m=new ReadableStream({start(f){S();function S(){u.read().then(({done:x,value:T})=>{if(x)f.close();else{v+=T.byteLength;const L=new ProgressEvent("progress",{lengthComputable:_,loaded:v,total:p});for(let A=0,b=h.length;A<b;A++){const D=h[A];D.onProgress&&D.onProgress(L)}f.enqueue(T),S()}})}}});return new Response(m)}else throw new O_(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(d);return c.arrayBuffer().then(_=>p.decode(_))}}}).then(c=>{Un.add(e,c);const h=_n[e];delete _n[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onLoad&&p.onLoad(c)}}).catch(c=>{const h=_n[e];if(h===void 0)throw this.manager.itemError(e),c;delete _n[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class k_ extends Hn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Un.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o=os("img");function l(){h(),Un.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class B_ extends Hn{constructor(e){super(e)}load(e,t,n,i){const s=this,a=new Ta,o=new ls(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(e,function(l){let c;try{c=s.parse(l)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:At,a.wrapT=c.wrapT!==void 0?c.wrapT:At,a.magFilter=c.magFilter!==void 0?c.magFilter:je,a.minFilter=c.minFilter!==void 0?c.minFilter:je,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0?a.colorSpace=c.colorSpace:c.encoding!==void 0&&(a.encoding=c.encoding),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=zn),c.mipmapCount===1&&(a.minFilter=je),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c)},n,i),a}}class zi extends Hn{constructor(e){super(e)}load(e,t,n,i){const s=new mt,a=new k_(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class sr extends ot{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ae(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Vr=new Ue,xl=new C,yl=new C;class Ra{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sa,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;xl.setFromMatrixPosition(e.matrixWorld),t.position.copy(xl),yl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yl),t.updateMatrixWorld(),Vr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Vr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class z_ extends Ra{constructor(){super(new Dt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Fi*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class H_ extends sr{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ot.DEFAULT_UP),this.updateMatrix(),this.target=new ot,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new z_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Ml=new Ue,Ji=new C,Gr=new C;class V_ extends Ra{constructor(){super(new Dt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Se(4,2),this._viewportCount=6,this._viewports=[new et(2,1,1,1),new et(0,1,1,1),new et(3,1,1,1),new et(1,1,1,1),new et(3,0,1,1),new et(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ji.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ji),Gr.copy(n.position),Gr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Gr),n.updateMatrixWorld(),i.makeTranslation(-Ji.x,-Ji.y,-Ji.z),Ml.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ml)}}class Lc extends sr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new V_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class G_ extends Ra{constructor(){super(new nr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class W_ extends sr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ot.DEFAULT_UP),this.updateMatrix(),this.target=new ot,this.shadow=new G_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class X_ extends sr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class rs{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class q_ extends Hn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Un.get(e);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Un.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Un.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Un.add(e,l),s.manager.itemStart(e)}}class j_{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,a;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,a=i;s!==a;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){rt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const a=this._workIndex*s;rt.multiplyQuaternionsFlat(e,a,e,t,e,n),rt.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,s){const a=1-i;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,s){for(let a=0;a!==s;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const Ca="\\[\\]\\.:\\/",Y_=new RegExp("["+Ca+"]","g"),La="[^"+Ca+"]",$_="[^"+Ca.replace("\\.","")+"]",K_=/((?:WC+[\/:])*)/.source.replace("WC",La),Z_=/(WCOD+)?/.source.replace("WCOD",$_),J_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",La),Q_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",La),eg=new RegExp("^"+K_+Z_+J_+Q_+"$"),tg=["material","materials","bones","map"];class ng{constructor(e,t,n){const i=n||$e.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class $e{constructor(e,t,n){this.path=t,this.parsedPath=n||$e.parseTrackName(t),this.node=$e.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new $e.Composite(e,t,n):new $e(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Y_,"")}static parseTrackName(e){const t=eg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);tg.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=$e.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}$e.Composite=ng;$e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};$e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};$e.prototype.GetterByBindingType=[$e.prototype._getValue_direct,$e.prototype._getValue_array,$e.prototype._getValue_arrayElement,$e.prototype._getValue_toArray];$e.prototype.SetterByBindingTypeAndVersioning=[[$e.prototype._setValue_direct,$e.prototype._setValue_direct_setNeedsUpdate,$e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_array,$e.prototype._setValue_array_setNeedsUpdate,$e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_arrayElement,$e.prototype._setValue_arrayElement_setNeedsUpdate,$e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_fromArray,$e.prototype._setValue_fromArray_setNeedsUpdate,$e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class ig{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,a=s.length,o=new Array(a),l={endingStart:Ti,endingEnd:Ti};for(let c=0;c!==a;++c){const h=s[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Fh,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,s=e._clip.duration,a=s/i,o=i/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case kh:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case va:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const a=n===Oh;if(e===0)return s===-1?i:a&&(s&1)===1?t-i:i;if(n===Uh){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=wi,i.endingEnd=wi):(e?i.endingStart=this.zeroSlopeAtStart?wi:Ti:i.endingStart=Ys,t?i.endingEnd=this.zeroSlopeAtEnd?wi:Ti:i.endingEnd=Ys)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}}const sg=new Float32Array(1);class Ia extends ai{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],p=d.name;let _=h[p];if(_!==void 0)++_.referenceCount,a[u]=_;else{if(_=a[u],_!==void 0){_._cacheIndex===null&&(++_.referenceCount,this._addInactiveBinding(_,l,p));continue}const v=t&&t._propertyBindings[u].binding.parsedPath;_=new j_($e.create(n,p,v),d.ValueTypeName,d.getValueSize()),++_.referenceCount,this._addInactiveBinding(_,l,p),a[u]=_}o[u].resultBuffer=_.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Ac(new Float32Array(2),new Float32Array(2),1,sg),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let a=typeof e=="string"?ca.findByName(i,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=va),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const h=new ig(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?ca.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class Ic{constructor(e,t,n=0,i=1/0){this.ray=new cs(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ma,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return ha(e,this,n,t),n.sort(Sl),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)ha(e[i],this,n,t);return n.sort(Sl),n}}function Sl(r,e){return r.distance-e.distance}function ha(r,e,t,n){if(r.layers.test(e.layers)&&r.raycast(e,t),n===!0){const i=r.children;for(let s=0,a=i.length;s<a;s++)ha(i[s],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_a}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_a);const rg="/CRxUAL-Virtual-Exhibiton-2026/art/images/logo.png",ag="The Chancery Rosewood Award for Creative Transformation",og="Virtual Exhibition 2026",lg="By entering this exhibition you agree to our terms of use. All artworks are the property of their respective artists. Unauthorised reproduction is prohibited.",cg="Click on artworks to focus. Drag to look around. Use the menu to move between spaces.",hg=[{role:"Artwork Curation",name:"Rachel Segal Hamilton"},{role:"Event Curation",name:"Siyan Zhang"},{role:"Producer",name:"Stephanie Barker-Fry"},{role:"Web Development",name:"Michael Gossage"}],ug=38,dg=14,fg=260,pg=4;function mg(r){const e=[...r];for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e}class _g{constructor(){this._ready=!1,this._onStart=null,this._rows=[],this._imagePool=[],this._carouselRaf=null,this._el=this._build(),document.body.appendChild(this._el),this._startCarousel()}setProgress(e){const t=Math.round(e*100);this._barFill.style.width=t+"%",this._barLabel.textContent="Loading… "+t+"%"}setReady(){this._ready=!0,this._barFill.style.width="100%",this._barLabel.textContent="Ready",this._startBtn.disabled=!1,this._startBtn.classList.add("ts-start-btn--ready"),this._finalizeStrips()}addImage(e){if(this._imagePool.includes(e)||(this._imagePool.push(e),this._rows.length===0))return;const t=this._rows[(this._imagePool.length-1)%this._rows.length];[t.stripA,t.stripB].forEach(n=>{n.appendChild(this._makeImg(e,!1))})}set onStart(e){this._onStart=e}get autoplayNarration(){return this._toggleNarration.checked}get extraInteractions(){return this._toggleExtras.checked}hide(){cancelAnimationFrame(this._carouselRaf),this._el.classList.add("ts--hiding");const e=()=>{this._el.parentNode&&this._el.remove()};this._el.addEventListener("transitionend",e,{once:!0}),setTimeout(e,2e3)}_build(){const e=document.createElement("div");e.id="title-screen";const t=document.createElement("div");t.className="ts-carousel",this._buildCarousel(t),e.appendChild(t);const n=document.createElement("div");return n.className="ts-vignette",e.appendChild(n),e.insertAdjacentHTML("beforeend",`
      <div class="ts-content">
        <div class="ts-panel">

          <img class="ts-logo" src="${rg}" alt="" onerror="this.style.display='none'">
          <h1 class="ts-title">${ag}</h1>
          <p  class="ts-subtitle">${og}</p>

          <div class="ts-divider"></div>

          <div class="ts-toggles">
            <label class="ts-toggle">
              <input type="checkbox" id="ts-toggle-narration">
              <span class="ts-toggle__track"></span>
              <span class="ts-toggle__label">Autoplay narration</span>
            </label>
            <label class="ts-toggle">
              <input type="checkbox" id="ts-toggle-extras">
              <span class="ts-toggle__track"></span>
              <span class="ts-toggle__label">Extra interactions</span>
            </label>
          </div>

          <div class="ts-loading">
            <div class="ts-bar-track"><div class="ts-bar-fill" id="ts-bar-fill"></div></div>
            <span class="ts-bar-label" id="ts-bar-label">Loading…</span>
          </div>

          <button class="ts-start-btn" id="ts-start-btn" disabled>Enter Exhibition</button>

          <p class="ts-instructions">${cg}</p>
          <p class="ts-disclaimer">${lg}</p>
          <button class="ts-credits-btn" type="button">Credits</button>

        </div>
      </div>
    `),this._barFill=e.querySelector("#ts-bar-fill"),this._barLabel=e.querySelector("#ts-bar-label"),this._startBtn=e.querySelector("#ts-start-btn"),this._toggleNarration=e.querySelector("#ts-toggle-narration"),this._toggleExtras=e.querySelector("#ts-toggle-extras"),this._startBtn.addEventListener("click",()=>{var i;this._ready&&(this._ready=!1,this._startBtn.disabled=!0,(i=this._onStart)==null||i.call(this))}),this._buildCreditsModal(e),e}_buildCreditsModal(e){const t=document.createElement("div");t.className="ts-credits-modal";const n=document.createElement("div");n.className="ts-credits-backdrop",t.appendChild(n);const i=document.createElement("div");i.className="ts-credits-card";const s=document.createElement("div");s.className="ts-credits-header",s.innerHTML='<span class="ts-credits-heading">Credits</span>';const a=document.createElement("button");a.className="ts-credits-close",a.setAttribute("aria-label","Close credits"),a.textContent="✕",s.appendChild(a),i.appendChild(s);const o=document.createElement("div");o.className="ts-credits-list";for(const{role:h,name:u}of hg){const d=document.createElement("div");d.className="ts-credits-item",d.innerHTML=`<span class="ts-credits-role">${h}</span><span class="ts-credits-name">${u}</span>`,o.appendChild(d)}i.appendChild(o),t.appendChild(i),e.appendChild(t);const l=()=>t.classList.add("ts-credits-modal--visible"),c=()=>t.classList.remove("ts-credits-modal--visible");e.querySelector(".ts-credits-btn").addEventListener("click",l),n.addEventListener("click",c),a.addEventListener("click",c)}_buildCarousel(e){const t=Math.max(2,Math.min(pg,Math.round(window.innerHeight/fg)));for(let n=0;n<t;n++){const i=document.createElement("div");i.className="ts-lane";const s=document.createElement("div");s.className="ts-lane-inner";const a=document.createElement("div"),o=document.createElement("div");a.className=o.className="ts-strip",s.appendChild(a),s.appendChild(o),i.appendChild(s),e.appendChild(i);const l=n%2===0?1:-1,c=ug+n%3*dg;this._rows.push({inner:s,stripA:a,stripB:o,x:0,speed:c,dir:l})}}async _finalizeStrips(){if(this._imagePool.length!==0){for(const e of this._rows){const t=mg(this._imagePool);e._pool=t,e.stripA.innerHTML="",e.stripB.innerHTML="";for(const n of t)e.stripA.appendChild(this._makeImg(n,!0))}await new Promise(e=>requestAnimationFrame(e)),await new Promise(e=>requestAnimationFrame(e));for(const e of this._rows){for(;e.stripA.scrollWidth<window.innerWidth+100;)for(const t of e._pool)e.stripA.appendChild(this._makeImg(t,!0));e.stripB.innerHTML=e.stripA.innerHTML,e.x=e.x%e.stripA.scrollWidth}}}_makeImg(e,t){const n=document.createElement("img");return n.src=e,t?n.classList.add("ts-img--visible"):n.addEventListener("load",()=>n.classList.add("ts-img--visible"),{once:!0}),n}_startCarousel(){let e=performance.now();const t=n=>{const i=Math.min((n-e)/1e3,.1);e=n;for(const s of this._rows){const a=s.stripA.scrollWidth;if(a===0)continue;s.x+=s.speed*i,s.x>=a&&(s.x-=a);const o=s.dir===1?-s.x:-(a-s.x);s.inner.style.transform=`translateX(${o}px)`}this._carouselRaf=requestAnimationFrame(t)};this._carouselRaf=requestAnimationFrame(t)}}class gg{constructor({mount:e,sizes:t}){this.mount=e,this.sizes=t,this.canvas=document.createElement("canvas"),this.mount.appendChild(this.canvas),this.gl=new Mc({canvas:this.canvas,antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.gl.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.gl.setSize(this.sizes.width,this.sizes.height,!1),this.gl.shadowMap.enabled=!0,this.gl.shadowMap.type=1,this.gl.shadowMap.autoUpdate=!1,this.gl.outputColorSpace="srgb",this.gl.toneMapping=Vl,this.gl.toneMappingExposure=1}onResize(e){this.gl.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.gl.setSize(e.width,e.height,!1)}render(e,t){this.gl.render(e,t)}destroy(){var e;this.gl.dispose(),(e=this.canvas)==null||e.remove()}}function vg(r){var e;(e=r.traverse)==null||e.call(r,t=>{var n,i,s,a,o,l,c,h,u,d,p;if(t.geometry&&((i=(n=t.geometry).dispose)==null||i.call(n)),t.material){const _=Array.isArray(t.material)?t.material:[t.material];for(const v of _)v&&(v.map&&((a=(s=v.map).dispose)==null||a.call(s)),v.normalMap&&((l=(o=v.normalMap).dispose)==null||l.call(o)),v.roughnessMap&&((h=(c=v.roughnessMap).dispose)==null||h.call(c)),v.metalnessMap&&((d=(u=v.metalnessMap).dispose)==null||d.call(u)),(p=v.dispose)==null||p.call(v))}})}class xg{constructor(e){this.scene=e}disposeAll(){vg(this.scene)}}class yg{constructor(e){this.camera=new Dt(70,e.width/e.height,.1,100),this.camera.rotation.order="YXZ",this.camera.position.set(0,.8,0)}onResize(e){this.camera.aspect=e.width/e.height,this.camera.updateProjectionMatrix()}update(e){}}class Pc{constructor(){this.listeners=new Map}on(e,t){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t),()=>this.off(e,t)}off(e,t){const n=this.listeners.get(e);n&&n.delete(t)}emit(e,...t){const n=this.listeners.get(e);if(n)for(const i of n)i(...t)}}class Mg extends Pc{constructor(){super(),this._onResize=this._onResize.bind(this),this.width=window.innerWidth,this.height=window.innerHeight,window.addEventListener("resize",this._onResize,{passive:!0})}_onResize(){this.width=window.innerWidth,this.height=window.innerHeight,this.emit("resize",this)}destroy(){window.removeEventListener("resize",this._onResize)}}class Sg extends Pc{constructor(){super(),this._raf=null,this._last=performance.now(),this._tick=this._tick.bind(this)}start(){this._raf||(this._last=performance.now(),this._raf=requestAnimationFrame(this._tick))}stop(){this._raf&&(cancelAnimationFrame(this._raf),this._raf=null)}_tick(e){const t=Math.min((e-this._last)/1e3,.05);this._last=e,this.emit("tick",t),this._raf=requestAnimationFrame(this._tick)}}const bg=6,Eg=2.5,Tg=.2,gn=192,In=64,Yn=192,wg=1800,Ag=300,Rg=4,Cg=9e3,Lg=.7,Ig=5.7,Wr="gpu",bl=10,Pg=.65,El=.65,Dg=1,Ng=.1,Ug=.5,Fg=.02,Og=15724527,kg=.2,Bg=.25,zg=4,Dc=-50,ua=100,Nc=-50,da=100,Uc=0,fa=30,Hg=`varying vec3 vWorld;
`,Vg=`#include <begin_vertex>
vWorld = (modelMatrix * vec4(position, 1.0)).xyz;`,Gg=`
precision highp sampler3D;
uniform sampler3D uRevealTex;
uniform sampler3D uRevealTexTemp;
uniform sampler3D uRevealTexGold;
uniform vec2      uWorldMinXZ;
uniform vec2      uWorldSizeXZ;
uniform float     uWorldMinY;
uniform float     uWorldSizeY;
uniform vec3      uFogColor;
uniform vec3      uGoldColor;
uniform float     uGoldEdgeWidth;
uniform float     uGoldEdgeMult;
varying vec3      vWorld;
uniform sampler2D uGoldNormalMap;
uniform float     uGoldNormalTileScale;
uniform float     uGoldNormalStrength;

uniform sampler2D uNoiseTex;
uniform float     uNoiseTileScale;
uniform float     uNoiseStrength;
uniform float     uEdgeHardness;
uniform float     uDebugNoise;
`,Wg=`
#include <color_fragment>

// Normalised 3D UVW — clamped so out-of-bounds geometry stays hidden
vec3 _uvw = clamp(vec3(
  (vWorld.x - uWorldMinXZ.x) / uWorldSizeXZ.x,
  (vWorld.y - uWorldMinY)    / uWorldSizeY,
  (vWorld.z - uWorldMinXZ.y) / uWorldSizeXZ.y
), 0.0, 1.0);

float _settled    = texture(uRevealTex,     _uvw).r;
float _settledRaw = _settled;
float _temp    = texture(uRevealTexTemp, _uvw).r;
float _gold    = texture(uRevealTexGold, _uvw).r;

// GPU noise — displace threshold with noise, then threshold for hard/soft edge
float _noiseSample = texture(uNoiseTex, fract(vWorld.xz * uNoiseTileScale)).r;
float _noised      = _settled + (_noiseSample - 0.5) * uNoiseStrength;
_settled = smoothstep(0.5 - uEdgeHardness, 0.5 + uEdgeHardness, _noised);

// Persistent gold ring — uses raw pre-noise gradient so edge width is always visible
// Gold band just inside the hard reveal edge: _settled keeps the outer edge hard,
// _settledRaw fades the band inward so GOLD_EDGE_WIDTH actually controls thickness
float _edge    = _settled * smoothstep(uGoldEdgeWidth, 0.0, _settledRaw);

float _goldAmt  = clamp(_gold + _edge * uGoldEdgeMult, 0.0, 1.0);
// Gold ring punches through fog so it's visible at the hidden boundary
float _reveal   = max(_settled, max(_temp, max(_gold, _goldAmt)));
vec3  _colored  = mix(diffuseColor.rgb, uGoldColor, max(_goldAmt, _temp));

diffuseColor.rgb = _colored;

// Debug — show raw noise texture as surface colour
diffuseColor.rgb = mix(diffuseColor.rgb, vec3(_noiseSample), uDebugNoise);
`;function Fc(r,e,t,n,i,s,a){e.userData.shader=r,r.uniforms.uRevealTex={value:t},r.uniforms.uRevealTexTemp={value:n},r.uniforms.uRevealTexGold={value:i},r.uniforms.uWorldMinXZ={value:new Se(Dc,Nc)},r.uniforms.uWorldSizeXZ={value:new Se(ua,da)},r.uniforms.uWorldMinY={value:Uc},r.uniforms.uWorldSizeY={value:fa},r.uniforms.uFogColor={value:new Ae(Og)},r.uniforms.uGoldColor={value:new Ae(16769635)},r.uniforms.uGoldEdgeWidth={value:Lg},r.uniforms.uGoldEdgeMult={value:Ig},r.uniforms.uNoiseTex={value:s},r.uniforms.uNoiseTileScale={value:Ng},r.uniforms.uNoiseStrength={value:Ug},r.uniforms.uEdgeHardness={value:Fg},r.uniforms.uDebugNoise={value:0},r.vertexShader=Hg+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",Vg),r.fragmentShader=Gg+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",Wg),r.fragmentShader=r.fragmentShader.replace("#include <opaque_fragment>",`#include <opaque_fragment>
       float _litLuma = dot(gl_FragColor.rgb, vec3(0.2126, 0.7152, 0.0722));
       vec3 _fogTarget = mix(uFogColor, vec3(_litLuma), ${kg.toFixed(4)});
       gl_FragColor.rgb = mix(_fogTarget, gl_FragColor.rgb, _reveal);`),r.uniforms.uGoldNormalMap={value:a??null},r.uniforms.uGoldNormalTileScale={value:Bg},r.uniforms.uGoldNormalStrength={value:zg},r.fragmentShader.includes("#include <normal_fragment_maps>")&&(r.fragmentShader=r.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
       vec3 _uvwN = clamp(vec3(
         (vWorld.x - uWorldMinXZ.x) / uWorldSizeXZ.x,
         (vWorld.y - uWorldMinY)    / uWorldSizeY,
         (vWorld.z - uWorldMinXZ.y) / uWorldSizeXZ.y
       ), 0.0, 1.0);
       float _goldN    = texture(uRevealTexGold, _uvwN).r;
       float _tempN    = texture(uRevealTexTemp, _uvwN).r;
       float _settledN = texture(uRevealTex,     _uvwN).r;
       float _edgeN    = _settledN * smoothstep(uGoldEdgeWidth, 0.0, _settledN);
       float _goldMask = clamp(_goldN + _edgeN * uGoldEdgeMult + _tempN, 0.0, 1.0);
       vec3 _triBlend = pow(abs(normal), vec3(4.0));
       _triBlend /= (_triBlend.x + _triBlend.y + _triBlend.z + 0.0001);
       vec2 _sXZ = texture(uGoldNormalMap, fract(vWorld.xz * uGoldNormalTileScale)).rg;
       vec2 _sXY = texture(uGoldNormalMap, fract(vWorld.xy * uGoldNormalTileScale)).rg;
       vec2 _sYZ = texture(uGoldNormalMap, fract(vWorld.yz * uGoldNormalTileScale)).rg;
       vec3 _nXZ = vec3(_sXZ.r * 2.0 - 1.0, 0.0,              _sXZ.g * 2.0 - 1.0);
       vec3 _nXY = vec3(_sXY.r * 2.0 - 1.0, _sXY.g * 2.0 - 1.0, 0.0            );
       vec3 _nYZ = vec3(0.0,              _sYZ.r * 2.0 - 1.0, _sYZ.g * 2.0 - 1.0);
       vec3 _nrmlOffset  = _nXZ * _triBlend.y + _nXY * _triBlend.z + _nYZ * _triBlend.x;
       float _revealN    = max(_settledN, _tempN);
       normal = normalize(normal + _nrmlOffset * _goldMask * _revealN * uGoldNormalStrength);`)),r.fragmentShader.includes("#include <roughnessmap_fragment>")&&(r.fragmentShader=r.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
       roughnessFactor = mix(roughnessFactor, 0.05, _goldAmt);`)),r.fragmentShader.includes("#include <metalnessmap_fragment>")&&(r.fragmentShader=r.fragmentShader.replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
       metalnessFactor = mix(metalnessFactor, 1.0, _goldAmt);`))}function Xg(r,{color:e=8421504,normalMap:t=null,side:n=qt}={}){const i=new Qt({color:e,normalMap:t,side:n,roughness:1,metalness:0});return i.onBeforeCompile=s=>Fc(s,i,r.texture,r.tempTexture,r.goldTexture,r.noiseTexture,r.goldNormalTexture),r.registerMaterial(i),i}function qg(r,e){if(r.userData._proximityRevealApplied)return;r.userData._proximityRevealApplied=!0;const t=r.onBeforeCompile;r.onBeforeCompile=(n,i)=>{t&&t(n,i),Fc(n,r,e.texture,e.tempTexture,e.goldTexture,e.noiseTexture,e.goldNormalTexture)},r.needsUpdate=!0,e.registerMaterial(r)}class jg{constructor(){this._materials=[],this._lastCamPos=null,this.enabled=!0,this.features={cameraTrail:!0,permanentFadeIn:!0,edgeNoise:!0,tapReveal:!0,goldRing:!0,mouseTrail:!0},this._activeFade=[],this._activeTemp=[],this._goldReveals=[],this._noiseData=null,this._noiseSize=0;const e=new Image;e.src="/CRxUAL-Virtual-Exhibiton-2026/art/textures/noise.png",e.onload=()=>{const n=e.naturalWidth,i=document.createElement("canvas");i.width=i.height=n,i.getContext("2d").drawImage(e,0,0);const s=i.getContext("2d").getImageData(0,0,n,n).data;this._noiseSize=n,this._noiseData=new Uint8Array(n*n);for(let a=0;a<this._noiseData.length;a++)this._noiseData[a]=s[a*4]},e.onerror=()=>console.warn("[ProximityReveal] noiseTest.png not found — using hash fallback"),this.noiseTexture=new zi().load("/CRxUAL-Virtual-Exhibiton-2026/art/textures/noise.png"),this.noiseTexture.wrapS=this.noiseTexture.wrapT=Bn,this.goldNormalTexture=new zi().load("/CRxUAL-Virtual-Exhibiton-2026/art/textures/noisev2_nrml.png"),this.goldNormalTexture.wrapS=this.goldNormalTexture.wrapT=Bn;const t=n=>{const i=new oc(n,gn,In,Yn);return i.format=Yl,i.type=an,i.magFilter=je,i.minFilter=je,i.unpackAlignment=1,i.needsUpdate=!0,i};this._texData=new Uint8Array(gn*In*Yn),this.texture=t(this._texData),this._tempData=new Uint8Array(gn*In*Yn),this.tempTexture=t(this._tempData),this._goldData=new Uint8Array(gn*In*Yn),this.goldTexture=t(this._goldData)}registerMaterial(e){this._materials.push(e)}_paint(e,t,n,i,s=1,a=!1,o=bg){const l=Math.round((t-Dc)/ua*gn),c=Math.round((n-Uc)/fa*In),h=Math.round((i-Nc)/da*Yn),u=o/ua*gn,d=o/fa*In,p=o/da*Yn,_=Math.ceil(Math.max(u,d,p));for(let v=-_;v<=_;v++){const m=h+v;if(!(m<0||m>=Yn))for(let f=-_;f<=_;f++){const S=c+f;if(!(S<0||S>=In))for(let x=-_;x<=_;x++){const T=l+x;if(T<0||T>=gn)continue;const L=x/u*(x/u)+f/d*(f/d)+v/p*(v/p);if(L>1)continue;const A=1-L;let b=A*A*(3-2*A)*s;if(a&&L>Pg){let y;if(this._noiseData){const N=(T*bl%this._noiseSize+this._noiseSize)%this._noiseSize,B=(m*bl%this._noiseSize+this._noiseSize)%this._noiseSize;y=this._noiseData[B*this._noiseSize+N]/255}else y=(T*1664525+m*1013904223>>>0)/4294967295;b*=El+y*(Dg-El)}const D=Math.round(b*255),g=T+S*gn+m*gn*In;D>e[g]&&(e[g]=D)}}}}addPermanentReveal(e){const{x:t,y:n,z:i}=e;this.features.goldRing&&this._goldReveals.push({x:t,y:n,z:i,t0:performance.now()}),this.features.permanentFadeIn?this._activeFade.some(a=>Math.abs(a.x-t)<.5&&Math.abs(a.z-i)<.5)||this._activeFade.push({x:t,y:n,z:i,t0:performance.now()}):(this._paint(this._texData,t,n,i,1,this.features.edgeNoise&&Wr==="cpu"),this.texture.needsUpdate=!0)}addAreaReveal(e,t,n,i){this._paint(this._texData,e,t,n,1,!1,i),this.texture.needsUpdate=!0}addTemporaryReveal(e,t=Rg){this.features.tapReveal&&this._activeTemp.push({x:e.x,y:e.y,z:e.z,t0:performance.now(),dur:t*1e3,fadeIn:Ag})}_paintCameraTrail(e,t,n){this._paint(this._texData,e,t,n,1,this.features.edgeNoise&&Wr==="cpu"),this.texture.needsUpdate=!0}update(e){if(!this.enabled||!e)return;this.features.cameraTrail&&(this._lastCamPos?this._lastCamPos.distanceTo(e)>=Tg&&(this._lastCamPos.copy(e),this._paintCameraTrail(e.x,e.y,e.z)):(this._lastCamPos=e.clone(),this._paintCameraTrail(e.x,e.y,e.z)));const t=performance.now();if(this.features.permanentFadeIn&&this._activeFade.length>0){let n=!1;for(let i=this._activeFade.length-1;i>=0;i--){const s=this._activeFade[i],a=Math.min((t-s.t0)/wg,1),o=Math.round(a*255);o!==(s._lastByte??-1)&&(s._lastByte=o,this._paint(this._texData,s.x,s.y,s.z,a,this.features.edgeNoise&&Wr==="cpu"),n=!0),a>=1&&this._activeFade.splice(i,1)}n&&(this.texture.needsUpdate=!0)}if(this.features.goldRing&&this._goldReveals.length>0){this._goldData.fill(0);for(let n=this._goldReveals.length-1;n>=0;n--){const i=this._goldReveals[n],s=Math.max(1-(t-i.t0)/Cg,0);if(s<=0){this._goldReveals.splice(n,1);continue}this._paint(this._goldData,i.x,i.y,i.z,s,!1)}this.goldTexture.needsUpdate=!0}if(this.features.tapReveal&&this._activeTemp.length>0){this._tempData.fill(0);for(let n=this._activeTemp.length-1;n>=0;n--){const i=this._activeTemp[n],s=t-i.t0,a=Math.min(s/i.fadeIn,1),o=Math.max(1-s/i.dur,0);if(o<=0){this._activeTemp.splice(n,1);continue}this._paint(this._tempData,i.x,i.y,i.z,a*o,!1,Eg)}this.tempTexture.needsUpdate=!0}}}function Yg(r){r.add(new X_(16777215,.3));const e=new Lc(16777215,10);e.position.set(-30,3,-20),e.castShadow=!0,r.add(e)}function Oc({map:r,mapNext:e,revealMap:t,revealSoftness:n=.15}){return new ln({transparent:!0,depthWrite:!1,uniforms:{uMap:{value:r},uMapNext:{value:e},uRevealMap:{value:t},uReveal:{value:1},uSoft:{value:n},uBlend:{value:0},uContainScale:{value:new Se(1,1)},uColorReveal:{value:0},uExposure:{value:1}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform sampler2D uMap;
      uniform sampler2D uMapNext;
      uniform sampler2D uRevealMap;
      uniform float uReveal;
      uniform float uSoft;
      uniform float uBlend;
      uniform vec2  uContainScale;
      uniform float uColorReveal;
      uniform float uExposure;

      varying vec2 vUv;

      void main() {
        float r = uReveal;
        r = r * r * (3.0 - 2.0 * r); // s-curve

        // contain UV mapping: centres the media and adds black bars for the remainder
        vec2 uv = (vUv - 0.5) * uContainScale + 0.5;
        bool inBounds = uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= 0.0 && uv.y <= 1.0;

        vec4 color;
        if (inBounds) {
          vec4 colorNext = texture2D(uMapNext, uv);
          color = texture2D(uMap, uv);
          float t = 1.0 - smoothstep(uBlend - uSoft, uBlend + uSoft, texture2D(uRevealMap, vUv).r);
          color = mix(color, colorNext, t);
        } else {
          color = vec4(0.0, 0.0, 0.0, 1.0); // black letterbox / pillarbox bars
        }

        // reveal mask always uses the full-plane vUv so the radial wipe covers everything
        float maskValue = texture2D(uRevealMap, vUv).r;
        // remap r so 0→-uSoft and 1→1+uSoft, ensuring clean opaque/transparent at endpoints
        float rExt = r * (1.0 + 2.0 * uSoft) - uSoft;
        float alpha = smoothstep(rExt - uSoft, rExt + uSoft, maskValue);

        float a = color.a * alpha;
        if (a < 0.001) discard;

        // Colour reveal: sweeps from grayscale to full colour driven by the reveal map
        float cExt = uColorReveal * (1.0 + 2.0 * uSoft) - uSoft;
        float colorAmt = 1.0 - smoothstep(cExt - uSoft, cExt + uSoft, maskValue);
        float luma = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
        color.rgb = mix(vec3(luma), color.rgb, colorAmt);

        gl_FragColor = vec4(color.rgb * uExposure, a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `})}function $g(){const r=new Ta(new Uint8Array([0,0,0,255]),1,1,Ft);return r.needsUpdate=!0,r}function Kg({map:r,revealMap:e}){return new ln({transparent:!0,depthWrite:!1,uniforms:{uMap:{value:r},uMapNext:{value:r},uSim:{value:$g()},uRevealMap:{value:e},uReveal:{value:1},uSoft:{value:.15},uBlend:{value:0},uIsTransitioning:{value:0},uDragReveal:{value:0},uWipeOrigin:{value:new Se(0,0)},uContainScale:{value:new Se(1,1)},uTime:{value:0},uExposure:{value:1}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      precision highp float;
      uniform sampler2D uMap;
      uniform sampler2D uMapNext;
      uniform sampler2D uSim;
      uniform sampler2D uRevealMap;
      uniform float uReveal;
      uniform float uSoft;
      uniform float uBlend;
      uniform float uIsTransitioning;
      uniform float uDragReveal;
      uniform vec2  uWipeOrigin;
      uniform vec2  uContainScale;
      uniform float uTime;
      uniform float uExposure;

      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y);
      }
      float fbm(vec2 p) {
        float v = 0.0; float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += noise(p) * a;
          p = p * 2.0 + vec2(17.3, 9.1);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = (vUv - 0.5) * uContainScale + 0.5;
        bool inBounds = uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= 0.0 && uv.y <= 1.0;

        vec4 sim  = texture2D(uSim, vUv);
        vec2 vel  = sim.rg;
        float dye = sim.b;

        vec2 warp = vel * 0.18 + normalize(vel + vec2(0.0001)) * dye * 0.06;

        vec4 colFrom = inBounds ? texture2D(uMap,     clamp(uv + warp, 0.001, 0.999))
                                : vec4(0.0, 0.0, 0.0, 1.0);
        vec4 colTo   = inBounds ? texture2D(uMapNext, clamp(uv + warp, 0.001, 0.999))
                                : vec4(0.0, 0.0, 0.0, 1.0);

        float dragRevealMask = smoothstep(0.02, 0.30, dye) * uDragReveal;
        vec4 baseCol = mix(colFrom, colTo, dragRevealMask);

        vec2 originUV = uWipeOrigin * 0.5 + 0.5;
        vec2 d = vUv - originUV;
        float ar = uContainScale.y / max(uContainScale.x, 0.0001);
        d.x *= ar;
        float distFromOrigin = length(d);

        vec2 flow1 = vUv * 3.0 + vel * 2.2 + vec2(uTime * 0.08, -uTime * 0.05);
        vec2 flow2 = vUv * 7.0 + vec2(-uTime * 0.03, uTime * 0.06);
        float pA = fbm(flow1);
        float pB = fbm(flow2 + pA * 1.5);
        float pC = noise(vUv * 20.0 + pB * 3.0);
        float painterlyNoise = (pA - 0.5)*0.22 + (pB - 0.5)*0.15 + (pC - 0.5)*0.06 + dye * 0.12;

        float maxRadius = length(vec2(ar, 1.0));
        float progressRadius = uBlend * maxRadius * 1.18;
        float edge = distFromOrigin + painterlyNoise;
        float feather = 0.12;
        float transitionReveal = 1.0 - smoothstep(progressRadius - feather, progressRadius + feather, edge);
        transitionReveal *= uIsTransitioning;
        float paintBreakup = smoothstep(0.25, 0.85, pA * 0.7 + pB * 0.5 + dye * 0.35);
        transitionReveal = clamp(transitionReveal + paintBreakup * 0.18 * uIsTransitioning, 0.0, 1.0);

        vec4 col = mix(baseCol, colTo, transitionReveal);

        float rim = smoothstep(0.35, 0.95, transitionReveal) - smoothstep(0.80, 1.0, transitionReveal);
        col.rgb += vec3(0.06, 0.05, 0.04) * rim * (0.5 + pB * 0.5);

        float speed = length(vel);
        col.rgb += vec3(speed * dye * 0.14);

        vec2 vig = vUv * 2.0 - 1.0;
        vig.x *= ar;
        col.rgb *= 1.0 - dot(vig, vig) * 0.22;

        // focus reveal
        float r = uReveal * uReveal * (3.0 - 2.0 * uReveal);
        float maskValue = texture2D(uRevealMap, vUv).r;
        float rExt = r * (1.0 + 2.0 * uSoft) - uSoft;
        float alpha = smoothstep(rExt - uSoft, rExt + uSoft, maskValue);

        float a = col.a * alpha;
        if (a < 0.001) discard;
        gl_FragColor = vec4(col.rgb * uExposure, a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `})}function Tl(r,e){if(e===Bh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===ta||e===Ql){let t=r.getIndex();if(t===null){const a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===ta)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class Zg extends Hn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new n0(t)}),this.register(function(t){return new u0(t)}),this.register(function(t){return new d0(t)}),this.register(function(t){return new f0(t)}),this.register(function(t){return new s0(t)}),this.register(function(t){return new r0(t)}),this.register(function(t){return new a0(t)}),this.register(function(t){return new o0(t)}),this.register(function(t){return new t0(t)}),this.register(function(t){return new l0(t)}),this.register(function(t){return new i0(t)}),this.register(function(t){return new h0(t)}),this.register(function(t){return new c0(t)}),this.register(function(t){return new Qg(t)}),this.register(function(t){return new p0(t)}),this.register(function(t){return new m0(t)})}load(e,t,n,i){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=rs.extractUrlBase(e);a=rs.resolveURL(c,this.path)}else a=rs.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new ls(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===kc){try{a[qe.KHR_BINARY_GLTF]=new _0(e)}catch(u){i&&i(u);return}s=JSON.parse(a[qe.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new C0(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case qe.KHR_MATERIALS_UNLIT:a[u]=new e0;break;case qe.KHR_DRACO_MESH_COMPRESSION:a[u]=new g0(s,this.dracoLoader);break;case qe.KHR_TEXTURE_TRANSFORM:a[u]=new v0;break;case qe.KHR_MESH_QUANTIZATION:a[u]=new x0;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function Jg(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Qg{constructor(e){this.parser=e,this.name=qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new Ae(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],pt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new W_(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Lc(h),c.distance=u;break;case"spot":c=new H_(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Dn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class e0{constructor(){this.name=qe.KHR_MATERIALS_UNLIT}getMaterialType(){return ht}extendParams(e,t,n){const i=[];e.color=new Ae(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],pt),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Ye))}return Promise.all(i)}}class t0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class n0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Se(o,o)}return Promise.all(s)}}class i0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class s0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Ae(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],pt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,Ye)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class r0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class a0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ae().setRGB(o[0],o[1],o[2],pt),Promise.all(s)}}class o0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class l0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ae().setRGB(o[0],o[1],o[2],pt),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,Ye)),Promise.all(s)}}class c0{constructor(e){this.parser=e,this.name=qe.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}}class h0{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}}class u0{constructor(e){this.parser=e,this.name=qe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}}class d0{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class f0{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class p0{constructor(e){this.name=qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(p){return p.buffer}):a.ready.then(function(){const p=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(p),h,u,d,i.mode,i.filter),p})})}else return null}}class m0{constructor(e){this.name=qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Gt.TRIANGLES&&c.mode!==Gt.TRIANGLE_STRIP&&c.mode!==Gt.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,p=[];for(const _ of u){const v=new Ue,m=new C,f=new rt,S=new C(1,1,1),x=new E_(_.geometry,_.material,d);for(let T=0;T<d;T++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,T),l.ROTATION&&f.fromBufferAttribute(l.ROTATION,T),l.SCALE&&S.fromBufferAttribute(l.SCALE,T),x.setMatrixAt(T,v.compose(m,f,S));for(const T in l)if(T==="_COLOR_0"){const L=l[T];x.instanceColor=new oa(L.array,L.itemSize,L.normalized)}else T!=="TRANSLATION"&&T!=="ROTATION"&&T!=="SCALE"&&_.geometry.setAttribute(T,l[T]);ot.prototype.copy.call(x,_),this.parser.assignFinalMaterial(x),p.push(x)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}}const kc="glTF",Qi=12,wl={JSON:1313821514,BIN:5130562};class _0{constructor(e){this.name=qe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Qi),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==kc)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Qi,s=new DataView(e,Qi);let a=0;for(;a<i;){const o=s.getUint32(a,!0);a+=4;const l=s.getUint32(a,!0);if(a+=4,l===wl.JSON){const c=new Uint8Array(e,Qi+a,o);this.content=n.decode(c)}else if(l===wl.BIN){const c=Qi+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class g0{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=pa[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=pa[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],p=Ii[d.componentType];c[u]=p.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(p){for(const _ in p.attributes){const v=p.attributes[_],m=l[_];m!==void 0&&(v.normalized=m)}u(p)},o,c,pt,d)})})}}class v0{constructor(){this.name=qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class x0{constructor(){this.name=qe.KHR_MESH_QUANTIZATION}}class Bc extends hs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,p=d*u,_=e*c,v=_-c,m=-2*p+3*d,f=p-d,S=1-m,x=f-d+u;for(let T=0;T!==o;T++){const L=a[v+T+o],A=a[v+T+l]*h,b=a[_+T+o],D=a[_+T]*h;s[T]=S*L+x*A+m*b+f*D}return s}}const y0=new rt;class M0 extends Bc{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return y0.fromArray(s).normalize().toArray(s),s}}const Gt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ii={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Al={9728:Mt,9729:je,9984:ea,9985:Wl,9986:Gs,9987:zn},Rl={33071:At,33648:js,10497:Bn},Xr={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},pa={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Pn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},S0={CUBICSPLINE:void 0,LINEAR:Ui,STEP:as},qr={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function b0(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Qt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:qt})),r.DefaultMaterial}function $n(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Dn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function E0(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function T0(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function w0(r){let e;const t=r.extensions&&r.extensions[qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+jr(t.attributes):e=r.indices+":"+jr(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+jr(r.targets[n]);return e}function jr(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function ma(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function A0(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const R0=new Ue;class C0{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Jg,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new zi(this.options.manager):this.textureLoader=new q_(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ls(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return $n(s,o,i),Dn(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())s(h,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[qe.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,a){n.load(rs.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=Xr[i.type],o=Ii[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new bt(c,a,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],l=Xr[i.type],c=Ii[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let v,m;if(p&&p!==u){const f=Math.floor(d/p),S="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+f+":"+i.count;let x=t.cache.get(S);x||(v=new c(o,f*p,i.count*p/h),x=new x_(v,p/h),t.cache.add(S,x)),m=new Ea(x,l,d%p/h,_)}else o===null?v=new c(i.count*l):v=new c(o,d,i.count*l),m=new bt(v,l,_);if(i.sparse!==void 0){const f=Xr.SCALAR,S=Ii[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,T=i.sparse.values.byteOffset||0,L=new S(a[1],x,i.sparse.count*f),A=new c(a[2],T,i.sparse.count*l);o!==null&&(m=new bt(m.array.slice(),m.itemSize,m.normalized));for(let b=0,D=L.length;b<D;b++){const g=L[b];if(m.setX(g,A[b*l]),l>=2&&m.setY(g,A[b*l+1]),l>=3&&m.setZ(g,A[b*l+2]),l>=4&&m.setW(g,A[b*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){const i=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(s.samplers||{})[a.sampler]||{};return h.magFilter=Al[d.magFilter]||je,h.minFilter=Al[d.minFilter]||zn,h.wrapS=Rl[d.wrapS]||Bn,h.wrapT=Rl[d.wrapT]||Bn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,p){let _=d;t.isImageBitmapLoader===!0&&(_=function(v){const m=new mt(v);m.needsUpdate=!0,d(m)}),t.load(rs.resolveURL(u,s.path),_,void 0,p)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),u.userData.mimeType=a.mimeType||A0(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[qe.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[qe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=s.associations.get(a);a=s.extensions[qe.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Tc,on.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Ec,on.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Qt}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let a;const o={},l=s.extensions||{},c=[];if(l[qe.KHR_MATERIALS_UNLIT]){const u=i[qe.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{const u=s.pbrMetallicRoughness||{};if(o.color=new Ae(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],pt),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,Ye)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Nt);const h=s.alphaMode||qr.OPAQUE;if(h===qr.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===qr.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==ht&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new Se(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==ht&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==ht){const u=s.emissiveFactor;o.emissive=new Ae().setRGB(u[0],u[1],u[2],pt)}return s.emissiveTexture!==void 0&&a!==ht&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,Ye)),Promise.all(c).then(function(){const u=new a(o);return s.name&&(u.name=s.name),Dn(u,s),t.associations.set(u,{materials:e}),s.extensions&&$n(i,u,s),u})}createUniqueName(e){const t=$e.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Cl(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=w0(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[qe.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Cl(new tn,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?b0(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let p=0,_=h.length;p<_;p++){const v=h[p],m=a[p];let f;const S=c[p];if(m.mode===Gt.TRIANGLES||m.mode===Gt.TRIANGLE_STRIP||m.mode===Gt.TRIANGLE_FAN||m.mode===void 0)f=s.isSkinnedMesh===!0?new M_(v,S):new Xe(v,S),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===Gt.TRIANGLE_STRIP?f.geometry=Tl(f.geometry,Ql):m.mode===Gt.TRIANGLE_FAN&&(f.geometry=Tl(f.geometry,ta));else if(m.mode===Gt.LINES)f=new T_(v,S);else if(m.mode===Gt.LINE_STRIP)f=new Aa(v,S);else if(m.mode===Gt.LINE_LOOP)f=new w_(v,S);else if(m.mode===Gt.POINTS)f=new A_(v,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&T0(f,s),f.name=t.createUniqueName(s.name||"mesh_"+e),Dn(f,s),m.extensions&&$n(i,f,m),t.assignFinalMaterial(f),u.push(f)}for(let p=0,_=u.length;p<_;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return s.extensions&&$n(i,u[0],s),u[0];const d=new Jt;s.extensions&&$n(i,d,s),t.associations.set(d,{meshes:e});for(let p=0,_=u.length;p<_;p++)d.add(u[p]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Dt(kn.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new nr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Dn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new Ue;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new wa(o,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const p=i.channels[u],_=i.samplers[p.sampler],v=p.target,m=v.node,f=i.parameters!==void 0?i.parameters[_.input]:_.input,S=i.parameters!==void 0?i.parameters[_.output]:_.output;v.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",f)),l.push(this.getDependency("accessor",S)),c.push(_),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],p=u[1],_=u[2],v=u[3],m=u[4],f=[];for(let S=0,x=d.length;S<x;S++){const T=d[S],L=p[S],A=_[S],b=v[S],D=m[S];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();const g=n._createAnimationTracks(T,L,A,b,D);if(g)for(let y=0;y<g.length;y++)f.push(g[y])}return new ca(s,void 0,f)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,R0)});for(let p=0,_=u.length;p<_;p++)h.add(u[p]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new bc:c.length>1?h=new Jt:c.length===1?h=c[0]:h=new ot,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=a),Dn(h,s),s.extensions&&$n(n,h,s),s.matrix!==void 0){const u=new Ue;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Jt;n.name&&(s.name=i.createUniqueName(n.name)),Dn(s,n),n.extensions&&$n(t,s,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,p]of i.associations)(d instanceof on||d instanceof mt)&&u.set(d,p);return h.traverse(d=>{const p=i.associations.get(d);p!=null&&u.set(d,p)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const a=[],o=e.name?e.name:e.uuid,l=[];Pn[s.path]===Pn.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(Pn[s.path]){case Pn.weights:c=ki;break;case Pn.rotation:c=ri;break;case Pn.position:case Pn.scale:c=Bi;break;default:switch(n.itemSize){case 1:c=ki;break;case 2:case 3:default:c=Bi;break}break}const h=i.interpolation!==void 0?S0[i.interpolation]:Ui,u=this._getArrayFromAccessor(n);for(let d=0,p=l.length;d<p;d++){const _=new c(l[d]+"."+Pn[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),a.push(_)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=ma(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ri?M0:Bc;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function L0(r,e,t){const n=e.attributes,i=new Rt;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),o.normalized){const h=ma(Ii[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new C,l=new C;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],p=d.min,_=d.max;if(p!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(_[2]))),d.normalized){const v=ma(Ii[d.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;const a=new jt;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function Cl(r,e,t){const n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(const a in n){const o=pa[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){const a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return Ke.workingColorSpace!==pt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ke.workingColorSpace}" not supported.`),Dn(r,e),L0(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?E0(r,e.targets,t):r})}const Yr=new WeakMap;class I0 extends Hn{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){const s=new ls(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,a=>{this.parse(a,t,i)},n,i)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,Ye).catch(n)}decodeDracoFile(e,t,n,i,s=pt,a=()=>{}){const o={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:s};return this.decodeGeometry(e,o).then(t).catch(a)}decodeGeometry(e,t){const n=JSON.stringify(t);if(Yr.has(e)){const l=Yr.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i;const s=this.workerNextTaskID++,a=e.byteLength,o=this._getWorker(s,a).then(l=>(i=l,new Promise((c,h)=>{i._callbacks[s]={resolve:c,reject:h},i.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{i&&s&&this._releaseTask(i,s)}),Yr.set(e,{key:n,promise:o}),o}_createGeometry(e){const t=new tn;e.index&&t.setIndex(new bt(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const i=e.attributes[n],s=i.name,a=i.array,o=i.itemSize,l=new bt(a,o);s==="color"&&(this._assignVertexColorSpace(l,i.vertexColorSpace),l.normalized=!(a instanceof Float32Array)),t.setAttribute(s,l)}return t}_assignVertexColorSpace(e,t){if(t!==Ye)return;const n=new Ae;for(let i=0,s=e.count;i<s;i++)n.fromBufferAttribute(e,i).convertSRGBToLinear(),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new ls(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,s)=>{n.load(e,i,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const s=P0.toString(),a=["/* draco decoder */",i,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([a]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(s){const a=s.data;switch(a.type){case"decode":i._callbacks[a.id].resolve(a);break;case"error":i._callbacks[a.id].reject(a);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+a.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,s){return i._taskLoad>s._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function P0(){let r,e;onmessage=function(a){const o=a.data;switch(o.type){case"init":r=o.decoderConfig,e=new Promise(function(h){r.onModuleLoaded=function(u){h({draco:u})},DracoDecoderModule(r)});break;case"decode":const l=o.buffer,c=o.taskConfig;e.then(h=>{const u=h.draco,d=new u.Decoder;try{const p=t(u,d,new Int8Array(l),c),_=p.attributes.map(v=>v.array.buffer);p.index&&_.push(p.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:p},_)}catch(p){console.error(p),self.postMessage({type:"error",id:o.id,error:p.message})}finally{u.destroy(d)}});break}};function t(a,o,l,c){const h=c.attributeIDs,u=c.attributeTypes;let d,p;const _=o.GetEncodedGeometryType(l);if(_===a.TRIANGULAR_MESH)d=new a.Mesh,p=o.DecodeArrayToMesh(l,l.byteLength,d);else if(_===a.POINT_CLOUD)d=new a.PointCloud,p=o.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!p.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+p.error_msg());const v={index:null,attributes:[]};for(const m in h){const f=self[u[m]];let S,x;if(c.useUniqueIDs)x=h[m],S=o.GetAttributeByUniqueId(d,x);else{if(x=o.GetAttributeId(d,a[h[m]]),x===-1)continue;S=o.GetAttribute(d,x)}const T=i(a,o,d,m,f,S);m==="color"&&(T.vertexColorSpace=c.vertexColorSpace),v.attributes.push(T)}return _===a.TRIANGULAR_MESH&&(v.index=n(a,o,d)),a.destroy(d),v}function n(a,o,l){const h=l.num_faces()*3,u=h*4,d=a._malloc(u);o.GetTrianglesUInt32Array(l,u,d);const p=new Uint32Array(a.HEAPF32.buffer,d,h).slice();return a._free(d),{array:p,itemSize:1}}function i(a,o,l,c,h,u){const d=u.num_components(),_=l.num_points()*d,v=_*h.BYTES_PER_ELEMENT,m=s(a,h),f=a._malloc(v);o.GetAttributeDataArrayForAllPoints(l,u,m,v,f);const S=new h(a.HEAPF32.buffer,f,_).slice();return a._free(f),{name:c,array:S,itemSize:d}}function s(a,o){switch(o){case Float32Array:return a.DT_FLOAT32;case Int8Array:return a.DT_INT8;case Int16Array:return a.DT_INT16;case Int32Array:return a.DT_INT32;case Uint8Array:return a.DT_UINT8;case Uint16Array:return a.DT_UINT16;case Uint32Array:return a.DT_UINT32}}}const zc=new Zg,Hc=new I0;Hc.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");zc.setDRACOLoader(Hc);function D0(r,e=null){return new Promise((t,n)=>{zc.load(r,i=>t(i),i=>{e&&e(i)},i=>n(i))})}async function rr(r,e=null){const t=await D0(r,e);return{scene:t.scene,animations:t.animations}}const Ll=.35,N0=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,U0=`
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D u_vel;
  uniform vec2      u_res;
  uniform vec2      u_mouse;
  uniform vec2      u_mouseDelta;
  uniform float     u_dt;
  uniform float     u_active;

  void main() {
    vec2 uv = vUv;
    vec2 px = 1.0 / u_res;

    vec4 cur  = texture2D(u_vel, uv);
    vec2 vel  = cur.rg;
    float dye = cur.b;

    vec2 prevUV = clamp(uv - vel * u_dt * 0.4, px, 1.0 - px);
    vec4 prev   = texture2D(u_vel, prevUV);
    vel = prev.rg * 0.996;
    dye = prev.b  * 0.994;

    vec2 vN = texture2D(u_vel, uv + vec2(0.0, px.y)).rg;
    vec2 vS = texture2D(u_vel, uv - vec2(0.0, px.y)).rg;
    vec2 vE = texture2D(u_vel, uv + vec2(px.x, 0.0)).rg;
    vec2 vW = texture2D(u_vel, uv - vec2(px.x, 0.0)).rg;
    vel = mix(vel, (vN + vS + vE + vW) * 0.25, 0.10);

    if (u_active > 0.5) {
      vec2 mUV = u_mouse * 0.5 + 0.5;
      float ar = u_res.x / u_res.y;
      vec2 diff = uv - mUV;
      diff.x *= ar;

      float splat = exp(-dot(diff, diff) * 800.0);
      vel += u_mouseDelta * splat * 10.0;
      dye += splat * 3.0;
    }

    gl_FragColor = vec4(vel, clamp(dye, 0.0, 1.0), 1.0);
  }
`;class F0{constructor(){this._simW=0,this._simH=0,this._fboA=null,this._fboB=null,this._quadGeo=new Ut(2,2),this._orthoCamera=new nr(-1,1,1,-1,0,1),this._simMaterial=new ln({vertexShader:N0,fragmentShader:U0,uniforms:{u_vel:{value:null},u_res:{value:new Se(1,1)},u_mouse:{value:new Se(0,0)},u_mouseDelta:{value:new Se(0,0)},u_dt:{value:.016},u_active:{value:0}},depthTest:!1,depthWrite:!1}),this._simMesh=new Xe(this._quadGeo,this._simMaterial),this._simScene=new Sc,this._simScene.add(this._simMesh)}_ensureFBOs(e){var c,h;const t=e.getSize(new Se),n=e.getPixelRatio(),i=Math.round(t.width*n),s=Math.round(t.height*n),a=Math.max(2,Math.floor(i*Ll)),o=Math.max(2,Math.floor(s*Ll));if(a===this._simW&&o===this._simH)return;this._simW=a,this._simH=o,(c=this._fboA)==null||c.dispose(),(h=this._fboB)==null||h.dispose();const l={minFilter:je,magFilter:je,format:Ft,type:an,depthBuffer:!1};this._fboA=new En(a,o,l),this._fboB=new En(a,o,l),this._simMaterial.uniforms.u_res.value.set(a,o)}update(e,t,n,i,s){this._ensureFBOs(t);const a=this._simMaterial.uniforms;a.u_vel.value=this._fboA.texture,a.u_mouse.value.copy(n),a.u_mouseDelta.value.copy(i),a.u_dt.value=e,a.u_active.value=s?1:0;const o=t.getRenderTarget(),l=t.autoClear;t.autoClear=!1,t.setRenderTarget(this._fboB),t.render(this._simScene,this._orthoCamera),t.setRenderTarget(o),t.autoClear=l;const c=this._fboA;this._fboA=this._fboB,this._fboB=c}clearSim(e){if(!this._fboA||!this._fboB)return;const t=e.getRenderTarget(),n=new Ae,i=e.getClearAlpha();e.getClearColor(n),e.setClearColor(new Ae(0,0,0),0),e.setRenderTarget(this._fboA),e.clear(!0,!1,!1),e.setRenderTarget(this._fboB),e.clear(!0,!1,!1),e.setClearColor(n,i),e.setRenderTarget(t)}get texture(){var e;return((e=this._fboA)==null?void 0:e.texture)??null}dispose(){var e,t;(e=this._fboA)==null||e.dispose(),(t=this._fboB)==null||t.dispose(),this._quadGeo.dispose(),this._simMaterial.dispose()}}function Il(){const r=new Qt({color:16118510,roughness:.32,metalness:0,envMapIntensity:.6});return r.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
       vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.vertexShader=`varying vec3 vWorldPos;
`+e.vertexShader,e.fragmentShader=`varying vec3 vWorldPos;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace("#include <color_fragment>",`
      #include <color_fragment>

      // Cheap hash — no texture needed
      vec3 p = vWorldPos * 1.8;
      float v = sin(p.x * 1.1 + p.y * 0.4 + sin(p.z * 0.9 + p.x * 0.6) * 2.2) * 0.5 + 0.5;
      v = pow(v, 3.5); // thin, sharp veins
      float vein = smoothstep(0.55, 0.72, v);

      // Vein colour: cool grey-blue, typical of Carrara marble
      vec3 veinColor = vec3(0.72, 0.74, 0.76);
      diffuseColor.rgb = mix(diffuseColor.rgb, veinColor, vein * 0.55);
      `)},r}class O0{constructor({scene:e,camera:t,renderer:n,domElement:i,makeTextPlane:s,debugOn:a,isMobile:o=!1}){this.scene=e,this.camera=t,this.renderer=n??null,this.domElement=i,this.makeTextPlane=s,this.textureLoader=new zi,this.raycaster=new Ic,this.pointerNDC=new Se,this.screens=[],this.hitBoxes=[],this.clickables=[],this._activeVideo=null,this._isMobile=o,this.models=[],this._frameMat=new Qt({color:1118481}),this._plinthMat=Il(),this._hitboxMat=new ht({visible:a,opacity:.3,transparent:!0}),this._btnMat=new ht({visible:!1}),this._fluidRecords=[],this._fluidMouse=new Se(0,0),this._fluidMousePrev=new Se(0,0),this._mouseDelta=new Se,this._ndcScratch=new Se,this._fluidMouseActive=!1,this._fluidActiveRecord=null,this._fluidDragStartX=0,this._fluidDragStartY=0,this._tapStartX=0,this._tapStartY=0,this._onPointerMove=this._onPointerMove.bind(this),this._onPointerUpFluid=this._onPointerUpFluid.bind(this),this._doRaycast=this._onClick.bind(this),this._onTapDown=l=>{this._tapStartX=l.clientX,this._tapStartY=l.clientY},this._onTapUp=l=>{const c=l.clientX-this._tapStartX,h=l.clientY-this._tapStartY;Math.hypot(c,h)<8&&this._doRaycast(l)},this.domElement.addEventListener("pointerdown",this._onTapDown,{passive:!0}),this.domElement.addEventListener("pointerup",this._onTapUp,{passive:!0}),this._texCache=new Map,this._revealTex=this.textureLoader.load("/CRxUAL-Virtual-Exhibiton-2026/art/textures/noisev2.png"),this._revealTex.wrapS=this._revealTex.wrapT=At,this._revealTex.minFilter=this._revealTex.magFilter=je,this.onHit=null,this.onMiss=null,this.debugOn=a}destroy(){this.domElement.removeEventListener("pointerdown",this._onTapDown),this.domElement.removeEventListener("pointerup",this._onTapUp);for(const e of this.screens)this.removeScreen(e.mesh);this.screens.length=0,this.hitBoxes.length=0,this.clickables.length=0;for(const e of this.models)this.removeModel(e.root);this.models.length=0}addScreen({url:e,width:t=4,height:n=2.25,_cameraScalar:i=1,position:s=[0,0,0],rotation:a=[0,0,0],offsetClick:o=0,clickable:l=!1,text:c="",fontSize:h=30,plinthVisible:u=!0,plinthSize:d=null,plinthOffset:p=[0,0,0],clickableSize:_=[t*1.2,n*1.2],onClick:v=null,artworkInfo:m=null,poster:f=null,skipReveal:S=!0,location:x=null,exposure:T=1}){this.debugOn&&console.log("Adding screen:",e,s,a),a=a.map(ie=>kn.degToRad(ie));const L=/\.(mp4|webm|ogg)$/i.test(e);let A,b,D,g;const y=t/n;if(L){const ie=this._makeVideoTexture(e);b=ie.video,D=ie.texture,f?(g=this._makeImageTexture(f,le=>{const pe=le.image;(pe==null?void 0:pe.naturalWidth)>0&&$(pe.naturalWidth/pe.naturalHeight)}).texture,A=g):A=D,m&&(m.isVideo=!0)}else A=this._makeImageTexture(e,ie=>{const le=ie.image;(le==null?void 0:le.naturalWidth)>0&&$(le.naturalWidth/le.naturalHeight)}).texture,b=null,D=null,g=null;const N=this._revealTex,B=Oc({map:A,revealMap:N});B.userData={uReveal:S?0:1},S&&(B.uniforms.uReveal.value=0),B.uniforms.uExposure.value=T;const $=ie=>{const[le,pe]=this._computeContainScale(ie,y);B.uniforms.uContainScale.value.set(le,pe)};if(L&&!f){const ie=()=>{b.videoWidth>0&&$(b.videoWidth/b.videoHeight)};b.videoWidth>0?ie():b.addEventListener("loadedmetadata",ie,{once:!0})}const R=new Ut(t,n),I=new Xe(R,B);I.position.set(...s),I.rotation.set(...a),I.userData.isScreen=!0,I.userData.revealMaterial=B,I.userData.skipReveal=S,I.castShadow=!0,this.scene.add(I);const U=.08,X=this._frameMat,q=new Ut(t+U*2,n+U*2),j=new Xe(q,X),Y=new C(0,0,-.02),J=new rt().setFromEuler(new si(...a));Y.applyQuaternion(J),j.position.set(s[0]+Y.x,s[1]+Y.y,s[2]+Y.z),j.rotation.set(...a),j.castShadow=!0,this.scene.add(j);let Z=null;if(u){const[ie,le,pe]=d??[t*.9,2,1],G=new dt(ie,le,pe);Z=new Xe(G,this._plinthMat),Z.position.set(s[0]+p[0],s[1]-n/2-le/2+p[1],s[2]+p[2]),Z.rotation.set(...a),Z.receiveShadow=!0,Z.castShadow=!0,this.scene.add(Z)}let F=null;if(l){if(F=new Xe(new dt(..._,.5),this._hitboxMat),F.position.set(s[0],s[1]-o,s[2]),F.rotation.set(...a),F.userData.cameraScalar=i,F.userData.onClick=v,F.userData.focusTarget=I,F.userData.artworkInfo=m,L){F.userData.video=b,F.userData.videoTexture=D,F.userData.posterTexture=g,F.userData.videoContainScale=[1,1],F.userData.posterContainScale=[1,1];const ie=()=>{b.videoWidth>0&&(F.userData.videoContainScale=this._computeContainScale(b.videoWidth/b.videoHeight,y))};b.videoWidth>0?ie():b.addEventListener("loadedmetadata",ie,{once:!0}),f&&this.textureLoader.load(f,le=>{const pe=le.image;pe&&pe.naturalWidth>0&&(F.userData.posterContainScale=this._computeContainScale(pe.naturalWidth/pe.naturalHeight,y))})}this.scene.add(F),this.hitBoxes.push(F),this.clickables.push(F)}F&&(F.userData.focusTarget=F,I.userData.focusTarget=F,F.userData.revealTarget=I);let K=null;if(this.makeTextPlane&&c){K=this.makeTextPlane(c,{fontsize:h,textColor:{r:200,g:255,b:200},canvasWidth:100*t+20}),K.rotation.set(...a);const ie=-n/2-.2,le=.6,pe=new C(0,ie,le),G=new rt().setFromEuler(new si(...a));pe.applyQuaternion(G),K.position.set(s[0]+pe.x,s[1]+pe.y,s[2]+pe.z),this.scene.add(K)}I.userData.location=x,I.userData.associatedMeshes=[I,j,F,Z,K].filter(Boolean);const oe={mesh:I,material:B,texture:A,video:b??null,videoTexture:D,posterTexture:g,hitBox:F,textMesh:K,frameMesh:j};return this.screens.push(oe),I.userData.onClick=v,I.userData.artworkInfo=m,l&&this.clickables.push(I),I}addContentScreen({content:e,width:t=4,height:n=2.25,position:i=[0,0,0],rotation:s=[0,0,0],clickable:a=!0,offsetClick:o=0,fontSize:l=30,clickableSize:c=[t*1.2,n*1.2],plinthVisible:h=!0,infoPanel:u=!0,infoWidth:d=3.2,infoHeight:p=2.25,infoOffset:_=[2.4,0,0],buttonSize:v=.45,buttonOffsetY:m=-.85,transitionDuration:f=1.2,skipReveal:S=!0,onFocusClick:x=null,location:T=null}){if(!e||!Array.isArray(e.images)||e.images.length===0)throw new Error("addContentScreen: content.images[] is required.");const L=this.addScreen({url:e.images[0],width:t,height:n,position:i,rotation:s,clickable:a,offsetClick:o,text:e.title??"",fontSize:l,clickableSize:c,onClick:x,plinthVisible:h,skipReveal:S,location:T,artworkInfo:{title:e.title??"",artist:e.artist??"",description:e.bio??"",narration:e.narration,narrationCues:e.narrationCues}}),A=this.screens.find($=>$.mesh===L);if(!A)throw new Error("addContentScreen: could not find screen record.");let b=null;if(u){const $=new rt;L.getWorldQuaternion($);const R=new C(1,0,0).applyQuaternion($),I=new C(0,1,0).applyQuaternion($),U=new C(0,0,1).applyQuaternion($),X=new C(...i).addScaledVector(R,_[0]).addScaledVector(I,_[1]).addScaledVector(U,_[2]),q=this._makeInfoPanelTexture({title:e.title??"",body:e.bio??"",width:t*256,height:n*256}),j=new ht({map:q,transparent:!0,toneMapped:!1,side:Nt});b=new Xe(new Ut(d,p),j),b.position.copy(X),b.rotation.copy(L.rotation),b.userData.isInfoPanel=!0,this.scene.add(b),A.infoMesh=b,A.infoTex=q}const D=($,R)=>{const I=new Xe(new Ut(v,v),this._btnMat),U=new rt;L.getWorldQuaternion(U);const X=new C(1,0,0).applyQuaternion(U),q=new C(0,1,0).applyQuaternion(U),j=new C(0,0,1).applyQuaternion(U),Y=L.position.clone();return I.position.copy(Y).addScaledVector(X,R).addScaledVector(q,m-.2).addScaledVector(j,.2),I.quaternion.copy(L.quaternion),I.userData.isContentButton=!0,I.userData.button=$,I.userData.focusTarget=L.userData.focusTarget,this.scene.add(I),this.clickables.push(I),I},g=D("prev",-t*.35-c[0]*.25),y=D("next",t*.35+c[0]*.25),N={index:0,images:e.images.slice(),setIndex:$=>{var J;if(N._transitioning)return;const R=N.images.length;N.index=($%R+R)%R;const I=N.images[N.index],U=this._getCachedTexture(I),X=(J=A.material)==null?void 0:J.uniforms;if(!X)return;N._transitioning=!0,X.uMapNext.value=U;const q=f,j=performance.now(),Y=()=>{const Z=(performance.now()-j)/1e3,F=Math.min(Z/q,1);X.uBlend.value=F,F<1?requestAnimationFrame(Y):(X.uMap.value=U,X.uMapNext.value=U,X.uBlend.value=0,N._transitioning=!1)};requestAnimationFrame(Y)},next:()=>N.setIndex(N.index+1),prev:()=>N.setIndex(N.index-1)};L.userData.contentCarousel=N,g.userData.contentCarousel=N,y.userData.contentCarousel=N,g.userData.onClick=()=>N.prev(),y.userData.onClick=()=>N.next(),A.prevBtn=g,A.nextBtn=y;const B=[b,g,y].filter(Boolean);return B.length&&(L.userData.associatedMeshes=(L.userData.associatedMeshes??[]).concat(B)),{screenMesh:L,infoMesh:b,prevBtn:g,nextBtn:y,carousel:N}}addFluidContentScreen(e){var F,K,oe,ie,le,pe,G,se;const{content:t,width:n=4,height:i=2.25,position:s=[0,0,0],rotation:a=[0,0,0],clickable:o=!0,offsetClick:l=0,fontSize:c=30,clickableSize:h=[n*1.2,i*1.2],plinthVisible:u=!0,infoPanel:d=!0,infoWidth:p=3.2,infoHeight:_=2.25,infoOffset:v=[2.4,0,0],buttonSize:m=.45,buttonOffsetY:f=-.85,transitionDuration:S=1.2,skipReveal:x=!0,onFocusClick:T=null,location:L=null}=e,A=this.addContentScreen({content:t,width:n,height:i,position:s,rotation:a,clickable:o,offsetClick:l,fontSize:c,clickableSize:h,plinthVisible:u,infoPanel:d,infoWidth:p,infoHeight:_,infoOffset:v,buttonSize:m,buttonOffsetY:f,transitionDuration:S,skipReveal:x,onFocusClick:T,location:L}),{screenMesh:b,prevBtn:D,nextBtn:g,carousel:y}=A,N=this.screens.find(he=>he.mesh===b);if(!N)return A;const B=t.images[0];!this._texCache.has(B)&&N.texture&&this._texCache.set(B,N.texture);for(const he of t.images)this._getCachedTexture(he);const $=(oe=(K=(F=N.material)==null?void 0:F.uniforms)==null?void 0:K.uRevealMap)==null?void 0:oe.value,R=(pe=(le=(ie=N.material)==null?void 0:ie.uniforms)==null?void 0:le.uMap)==null?void 0:pe.value,I=N.material,U=Kg({map:R,revealMap:$});b.material=U,b.userData.revealMaterial=U,b.userData.skipReveal=x,x&&(U.uniforms.uReveal.value=0),N.material=U,(G=I==null?void 0:I.dispose)==null||G.call(I);const X=n/i,q=he=>{if(!(he!=null&&he.naturalWidth))return;const[O,xe]=this._computeContainScale(he.naturalWidth/he.naturalHeight,X);U.uniforms.uContainScale.value.set(O,xe)};((se=R==null?void 0:R.image)==null?void 0:se.naturalWidth)>0?q(R.image):R!=null&&R.image&&(R.image.naturalWidth>0?q(R.image):R.image.addEventListener("load",()=>q(R.image),{once:!0}));const j=new F0;y.setIndex=(he,O=null)=>{if(y._transitioning)return;const xe=y.images.length;y.index=(he%xe+xe)%xe;const _e=y.images[y.index],be=this._getCachedTexture(_e),ce=U.uniforms;y._transitioning=!0,ce.uMapNext.value=be,O?ce.uWipeOrigin.value.copy(O):ce.uWipeOrigin.value.set(0,0),ce.uIsTransitioning.value=1,ce.uDragReveal.value=0,Y._transition={tex:be,uniforms:ce,elapsed:0,duration:S}},D.userData.onClick=()=>{const he=D.position.clone().project(this.camera);y.setIndex(y.index-1,he)},g.userData.onClick=()=>{const he=g.position.clone().project(this.camera);y.setIndex(y.index+1,he)};const Y={record:N,fluidSim:j,hitBox:N.hitBox,state:y,screenMesh:b,_transition:null,active:!1};this._fluidRecords.push(Y),this.domElement.addEventListener("pointermove",this._onPointerMove,{passive:!0}),this.domElement.addEventListener("pointerup",this._onPointerUpFluid,{passive:!0}),this.domElement.addEventListener("pointercancel",this._onPointerUpFluid,{passive:!0});const J=this.domElement,Z=he=>{if(document.pointerLockElement===J)return;const O=J.getBoundingClientRect(),xe=(he.clientX-O.left)/O.width*2-1,_e=-((he.clientY-O.top)/O.height*2-1),be=new Se(xe,_e);if(this.raycaster.setFromCamera(be,this.camera),Y.hitBox){const ce=this.raycaster.intersectObject(Y.hitBox,!1);if(ce.length>0){this._fluidMouseActive=!0,this._fluidActiveRecord=Y,this._fluidDragStartX=he.clientX,this._fluidDragStartY=he.clientY;const Pe=ce[0].uv,Ie=new Se(Pe.x*2-1,Pe.y*2-1);this._fluidMouse.copy(Ie),this._fluidMousePrev.copy(Ie),U.uniforms.uDragReveal.value=1}}};return J.addEventListener("pointerdown",Z,{passive:!0}),A}update(e){var t;if(!(!this.renderer||!this._fluidRecords.length)){for(const n of this._fluidRecords){const{fluidSim:i,record:s}=n,a=(t=s.material)==null?void 0:t.uniforms;if(!a||!n.active&&!n._transition)continue;const o=this._fluidMouseActive&&this._fluidActiveRecord===n;if(this._mouseDelta.subVectors(this._fluidMouse,this._fluidMousePrev).multiplyScalar(120),i.update(e,this.renderer,this._fluidMouse,this._mouseDelta,o),i.texture&&(a.uSim.value=i.texture),a.uTime.value+=e,n._transition){const l=n._transition;l.elapsed+=e;const c=Math.min(l.elapsed/l.duration,1);l.uniforms.uBlend.value=c,c>=1&&(l.uniforms.uMap.value=l.tex,l.uniforms.uMapNext.value=l.tex,l.uniforms.uBlend.value=0,l.uniforms.uIsTransitioning.value=0,n.state._transitioning=!1,n._transition=null,i.clearSim(this.renderer))}}this._fluidMousePrev.copy(this._fluidMouse)}}updateMixers(e,t){for(const n of this.models)n.mixer&&n.root===t&&n.mixer.update(e)}setActiveFluids(e){for(const t of this._fluidRecords)t.active=t.hitBox===e}_onPointerMove(e){if(!this._fluidMouseActive||!this._fluidActiveRecord)return;const t=this._fluidActiveRecord;if(!t.hitBox)return;const n=this.domElement.getBoundingClientRect(),i=(e.clientX-n.left)/n.width*2-1,s=-((e.clientY-n.top)/n.height*2-1);this._ndcScratch.set(i,s),this.raycaster.setFromCamera(this._ndcScratch,this.camera);const a=this.raycaster.intersectObject(t.hitBox,!1);if(a.length>0){const o=a[0].uv;this._fluidMouse.set(o.x*2-1,o.y*2-1)}}_onPointerUpFluid(e){var n;if(!this._fluidMouseActive)return;const t=this._fluidActiveRecord;if(this._fluidMouseActive=!1,t){const i=(n=t.record.material)==null?void 0:n.uniforms;i&&(i.uDragReveal.value=0);const s=e.clientX-this._fluidDragStartX;if(Math.abs(s)>25){const a=this.domElement.getBoundingClientRect(),o=(e.clientX-a.left)/a.width*2-1,l=-((e.clientY-a.top)/a.height*2-1),c=new Se(o,l);s<0?t.state.setIndex(t.state.index+1,c):t.state.setIndex(t.state.index-1,c)}}this._fluidActiveRecord=null}removeScreen(e){var i,s;const t=this.screens.findIndex(a=>a.mesh===e);if(t===-1)return;const n=this.screens[t];if(n.textMesh&&(this.scene.remove(n.textMesh),this._disposeMesh(n.textMesh)),n.frameMesh&&(this.scene.remove(n.frameMesh),this._disposeMesh(n.frameMesh)),n.hitBox&&(this.scene.remove(n.hitBox),this._disposeMesh(n.hitBox),this._removeFromArray(this.hitBoxes,n.hitBox),this._removeFromArray(this.clickables,n.hitBox)),this.scene.remove(n.mesh),this._disposeMesh(n.mesh),(s=(i=n.texture)==null?void 0:i.dispose)==null||s.call(i),n.video)try{n.video.pause(),n.video.src="",n.video.load()}catch{}this._removeFromArray(this.clickables,n.mesh),this.screens.splice(t,1)}_makeImageTexture(e,t=null){const n=this.textureLoader.load(e,t);return n.colorSpace=Ye,n.minFilter=je,n.magFilter=je,{texture:n,video:null}}_computeContainScale(e,t){return e>=t?[1,e/t]:[t/e,1]}_makeVideoTexture(e){const t=document.createElement("video");t.src=e,t.crossOrigin="anonymous",t.loop=!0,t.muted=!1,t.playsInline=!0,t.preload="metadata";const n=new R_(t);return n.colorSpace=Ye,n.minFilter=je,n.magFilter=je,{texture:n,video:t}}activateVideo(e){var n;if(this._activeVideo){this._activeVideo.pause();const i=this.hitBoxes.find(s=>s.userData.video===this._activeVideo);i!=null&&i.userData.posterTexture&&this._swapScreenTexture(i,i.userData.posterTexture,i.userData.posterContainScale),this._activeVideo=null}const t=(n=e==null?void 0:e.userData)==null?void 0:n.video;if(!t)return null;if(t.preload="auto",t.readyState===0&&t.load(),this._activeVideo=t,e.userData.videoTexture&&this._swapScreenTexture(e,e.userData.videoTexture,e.userData.videoContainScale),this._isMobile)t.play().catch(()=>{});else{const i=()=>t.play().catch(()=>{});if(t.readyState>=3)i();else{const s=()=>{i(),t.removeEventListener("canplay",s)};t.addEventListener("canplay",s)}}return t}deactivateVideo(e){var n;const t=(n=e==null?void 0:e.userData)==null?void 0:n.video;t&&(t.pause(),this._activeVideo===t&&(this._activeVideo=null),e.userData.posterTexture&&this._swapScreenTexture(e,e.userData.posterTexture,e.userData.posterContainScale))}_swapScreenTexture(e,t,n){var a,o;if(!t)return;const i=e.userData.revealTarget;if(!i)return;const s=i.userData.revealMaterial;(a=s==null?void 0:s.uniforms)!=null&&a.uMap&&(s.uniforms.uMap.value=t),n&&((o=s==null?void 0:s.uniforms)!=null&&o.uContainScale)&&s.uniforms.uContainScale.value.set(...n)}_onClick(e){if(document.pointerLockElement===this.domElement)return;const t=this.domElement.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*2-1,i=-((e.clientY-t.top)/t.height*2-1);this.pointerNDC.set(n,i),this.raycaster.setFromCamera(this.pointerNDC,this.camera);const s=this.raycaster.intersectObjects(this.clickables,!1);if(!s.length){typeof this.onMiss=="function"&&this.onMiss();return}const a=s[0],o=a.object;typeof this.onHit=="function"&&this.onHit(o,a);const l=o.userData.onClick;typeof l=="function"&&l(o,a)}_disposeMesh(e){var t,n,i,s,a;if((n=(t=e.geometry)==null?void 0:t.dispose)==null||n.call(t),e.material){const o=Array.isArray(e.material)?e.material:[e.material];for(const l of o)l&&((s=(i=l.map)==null?void 0:i.dispose)==null||s.call(i),(a=l.dispose)==null||a.call(l))}}_removeFromArray(e,t){const n=e.indexOf(t);n!==-1&&e.splice(n,1)}_getCachedTexture(e){if(this._texCache.has(e))return this._texCache.get(e);const t=this.textureLoader.load(e,n=>{this.renderer&&this.renderer.initTexture(n)});return t.colorSpace=Ye,t.minFilter=je,t.magFilter=je,this._texCache.set(e,t),t}_makeInfoPanelTexture({title:e="",body:t="",width:n=768,height:i=768}){const s=document.createElement("canvas");s.width=n,s.height=i;const a=s.getContext("2d");a.fillStyle="#0e1016",a.fillRect(0,0,n,i);const o=48;a.fillStyle="rgba(255,255,255,0.95)",a.font="700 44px system-ui, -apple-system, Segoe UI, Roboto, Arial",a.textBaseline="top",a.fillText(e,o,o),a.fillStyle="rgba(255,255,255,0.78)",a.font="400 26px system-ui, -apple-system, Segoe UI, Roboto, Arial";const l=n-o*2,c=34,h=String(t).split(/\s+/);let u=o,d=o+74,p="";for(const v of h){const m=p?`${p} ${v}`:v;if(a.measureText(m).width>l){if(a.fillText(p,u,d),p=v,d+=c,d>i-o-c)break}else p=m}d<=i-o-c&&a.fillText(p,u,d);const _=new Vi(s);return _.colorSpace=Ye,_.minFilter=je,_.magFilter=je,_}async addModel({url:e,position:t=[0,0,0],rotation:n=[0,0,0],scale:i=1,normalizeTo:s=null,center:a=!0,clickable:o=!1,offsetClick:l=0,hitboxSize:c=null,text:h="",fontSize:u=30,textOffset:d=[0,-.6,.6],plinthVisible:p=!0,plinthSize:_=null,plinthOffset:v=[0,0,0],castShadow:m=!0,playAnimation:f="first",onClick:S=null,artworkInfo:x=null,location:T=null,rotationOffset:L=0}){const A=n.map(R=>kn.degToRad(R)),{scene:b,animations:D}=await rr(e);b.traverse(R=>{R.isMesh&&(R.castShadow=m)}),Array.isArray(i)?b.scale.set(i[0],i[1],i[2]):b.scale.setScalar(i),typeof s=="number"&&this._normalizeModelToSize(b,s,a),b.position.set(...t),b.rotation.set(...A),L&&b.rotateY(kn.degToRad(L)),b.userData.baseQuaternion=b.quaternion.clone(),b.userData.isModel=!0,b.userData.onClick=S,this.scene.add(b),this.renderer&&(b.traverse(R=>{if(!R.isMesh)return;(Array.isArray(R.material)?R.material:[R.material]).forEach(U=>{[U.map,U.normalMap,U.roughnessMap,U.metalnessMap,U.emissiveMap,U.aoMap,U.lightMap,U.envMap].forEach(X=>{X&&this.renderer.initTexture(X)})})}),await this.renderer.compileAsync(this.scene,this.camera));let g=null;if(D&&D.length&&f)if(g=new Ia(b),f==="all")for(const R of D)g.clipAction(R).play();else{let R=D[0];if(f!=="first"){const I=D.find(U=>U.name===f);I&&(R=I)}g.clipAction(R).play()}let y=null;if(o){let R=1,I=1,U=1;if(c)[R,I,U]=c;else{const q=new Rt().setFromObject(b).getSize(new C);R=Math.max(.25,q.x),I=Math.max(.25,q.y),U=Math.max(.25,q.z)}y=new Xe(new dt(R,I,U),this._hitboxMat),y.position.set(t[0],t[1]-l,t[2]),y.rotation.set(...A),y.userData.onClick=S,y.userData.focusTarget=b,y.userData.focusTarget=y,y.userData.isModelHitbox=!0,y.userData.artworkInfo=x,y.userData.modelRoot=b,b.userData.hitBox=y,this.scene.add(y),this.hitBoxes.push(y),this.clickables.push(y)}let N=null;if(p){const[R,I,U]=_??[1.2,10.2,1.2];N=new Xe(new dt(R,I,U),Il()),N.position.set(t[0]+v[0],t[1]-I/2+v[1],t[2]+v[2]),N.rotation.set(...A),N.receiveShadow=!0,N.castShadow=!0,this.scene.add(N)}let B=null;if(this.makeTextPlane&&h){B=this.makeTextPlane(h,{fontsize:u,textColor:{r:200,g:255,b:200},canvasWidth:640}),B.rotation.set(...A);const R=new C(...d),I=new rt().setFromEuler(new si(...A));R.applyQuaternion(I),B.position.set(t[0]+R.x,t[1]+R.y,t[2]+R.z),this.scene.add(B)}b.userData.location=T,b.userData.associatedMeshes=[b,B,N].filter(Boolean);const $={root:b,hitBox:y,textMesh:B,mixer:g,clips:D,url:e};return this.models.push($),b}removeModel(e){const t=this.models.findIndex(i=>i.root===e);if(t===-1)return;const n=this.models[t];if(n.textMesh&&(this.scene.remove(n.textMesh),this._disposeMesh(n.textMesh)),n.hitBox&&(this.scene.remove(n.hitBox),this._disposeMesh(n.hitBox),this._removeFromArray(this.hitBoxes,n.hitBox),this._removeFromArray(this.clickables,n.hitBox)),n.mixer)try{n.mixer.stopAllAction()}catch{}this.scene.remove(n.root),n.root.traverse(i=>{var s,a,o,l,c,h,u,d,p,_,v,m,f,S,x;if(i.isMesh&&((a=(s=i.geometry)==null?void 0:s.dispose)==null||a.call(s),i.material)){const T=Array.isArray(i.material)?i.material:[i.material];for(const L of T)(l=(o=L.map)==null?void 0:o.dispose)==null||l.call(o),(h=(c=L.normalMap)==null?void 0:c.dispose)==null||h.call(c),(d=(u=L.roughnessMap)==null?void 0:u.dispose)==null||d.call(u),(_=(p=L.metalnessMap)==null?void 0:p.dispose)==null||_.call(p),(m=(v=L.emissiveMap)==null?void 0:v.dispose)==null||m.call(v),(S=(f=L.aoMap)==null?void 0:f.dispose)==null||S.call(f),(x=L.dispose)==null||x.call(L)}}),this.models.splice(t,1)}_normalizeModelToSize(e,t=1,n=!0){const i=new Rt().setFromObject(e),s=i.getSize(new C),a=Math.max(s.x,s.y,s.z)||1;if(n){const l=i.getCenter(new C);e.position.sub(l)}const o=t/a;e.scale.multiplyScalar(o),e.updateMatrixWorld(!0)}}function k0(r,{fontsize:e=30,textColor:t={r:255,g:255,b:255},canvasWidth:n=512,canvasHeight:i=128,padding:s=20}={}){const a=document.createElement("canvas");a.width=n,a.height=i;const o=a.getContext("2d");o.clearRect(0,0,a.width,a.height),o.fillStyle="rgba(0,0,0,0.35)",o.fillRect(0,0,a.width,a.height),o.fillStyle=`rgb(${t.r}, ${t.g}, ${t.b})`,o.font=`700 ${e}px system-ui, -apple-system, Segoe UI, Roboto, Arial`,o.textBaseline="middle",o.fillText(r,s,a.height/2);const l=new Vi(a);l.colorSpace=Ye;const c=a.width/a.height,h=.35,u=h*c,d=new ht({map:l,transparent:!0,toneMapped:!1}),p=new Ut(u,h),_=new Xe(p,d);return _.userData._textTexture=l,_}class B0{constructor({camera:e,domElement:t,autoRotate:n=!1,autoRotateSpeed:i=.25,dragToLook:s=!0,autoRotateResumeDelay:a=1}){if(!t)throw new Error("ControlsFPS: domElement is missing. Pass renderer.domElement.");this.camera=e,this.domElement=t,this.autoRotate=n,this.autoRotateSpeed=i,this.autoRotateResumeDelay=a,this.dragToLook=s,this.yawTotal=0,this.pitch=-.05,this.yawVel=0,this.pitchVel=0,this.yawNudgeVel=0,this.SENS_YAW=.0023,this.SENS_PITCH=.0019,this.PITCH_LIMIT=Math.PI/2-.05,this.INERTIA_DECAY=3.5,this._isDown=!1,this._isTouch=!1,this._activePointerId=null,this._lastX=0,this._lastY=0,this._accumDx=0,this._accumDy=0,this._autoRotatePauseTimer=0,this._tmpForward=new C,this._bind()}setAutoRotate(e,t=this.autoRotateSpeed){this.autoRotate=!!e,this.autoRotateSpeed=t}_pauseAutoRotateForDelay(){this._autoRotatePauseTimer=this.autoRotateResumeDelay}_bind(){const e=this.domElement;e.style.touchAction="none",e.addEventListener("pointerdown",n=>{var i;this.dragToLook&&(this._isDown=!0,this._isTouch=n.pointerType==="touch",this._activePointerId=n.pointerId,this._lastX=n.clientX,this._lastY=n.clientY,this.yawVel=0,this.pitchVel=0,this._accumDx=0,this._accumDy=0,(i=e.setPointerCapture)==null||i.call(e,n.pointerId),this._pauseAutoRotateForDelay())},{passive:!0}),e.addEventListener("pointermove",n=>{this.dragToLook&&this._isDown&&this._activePointerId===n.pointerId&&(this._accumDx+=n.clientX-this._lastX,this._accumDy+=n.clientY-this._lastY,this._lastX=n.clientX,this._lastY=n.clientY,this._pauseAutoRotateForDelay())},{passive:!0});const t=n=>{var i;this.dragToLook&&this._activePointerId===n.pointerId&&(this._isDown=!1,this._activePointerId=null,(i=e.releasePointerCapture)==null||i.call(e,n.pointerId),this._pauseAutoRotateForDelay())};e.addEventListener("pointerup",t,{passive:!0}),e.addEventListener("pointercancel",t,{passive:!0}),e.addEventListener("pointerleave",()=>{this._isDown=!1,this._activePointerId=null},{passive:!0}),e.addEventListener("wheel",n=>{n.preventDefault(),this.yawNudgeVel+=n.deltaY*65e-5},{passive:!1})}update(e){if(this._autoRotatePauseTimer=Math.max(0,this._autoRotatePauseTimer-e),this._isDown&&(this._accumDx!==0||this._accumDy!==0)){const i=this._isTouch?.75:1,s=this._accumDx*this.SENS_YAW*1.4*i,a=this._accumDy*this.SENS_PITCH*1.2*i;this.yawTotal+=s,this.pitch=kn.clamp(this.pitch-a,-this.PITCH_LIMIT,this.PITCH_LIMIT),e>0&&(this.yawVel=s/e,this.pitchVel=-a/e),this._accumDx=0,this._accumDy=0}else if(!this._isDown&&(Math.abs(this.yawVel)>1e-5||Math.abs(this.pitchVel)>1e-5)){this.yawTotal+=this.yawVel*e,this.pitch=kn.clamp(this.pitch+this.pitchVel*e,-this.PITCH_LIMIT,this.PITCH_LIMIT);const i=Math.exp(-this.INERTIA_DECAY*e);this.yawVel*=i,this.pitchVel*=i}this.autoRotate&&!this._isDown&&this._autoRotatePauseTimer<=0&&(this.yawTotal+=this.autoRotateSpeed*e),!this._isDown&&this._autoRotatePauseTimer<=0&&Math.abs(this.pitchVel)<1e-4&&(this.pitch*=.99),Math.abs(this.yawNudgeVel)>1e-6&&(this.yawTotal+=this.yawNudgeVel,this.yawNudgeVel*=.88);const t=Math.PI*2,n=(this.yawTotal%t+t)%t;this.camera.rotation.order="YXZ",this.camera.rotation.y=n,this.camera.rotation.x=this.pitch,this.camera.rotation.z=0}forward(){return this._tmpForward.set(0,0,-1).applyEuler(this.camera.rotation).normalize(),this._tmpForward}resetDrag(){var e,t;if(this._isDown=!1,this._accumDx=0,this._accumDy=0,this.yawVel=0,this.pitchVel=0,this._activePointerId!==null)try{(t=(e=this.domElement).releasePointerCapture)==null||t.call(e,this._activePointerId)}catch{}this._autoRotatePauseTimer=0,this._activePointerId=null,this._lastX=0,this._lastY=0}}const z0=r=>Math.max(0,Math.min(1,r)),H0=r=>r*r*(3-2*r);class V0{constructor({camera:e}){this.camera=e,this.isMoving=!1,this.isFocused=!1,this.t=1,this.duration=.75,this.fromPos=new C,this.toPos=new C,this.fromQuat=new rt,this.toQuat=new rt,this.homePos=new C,this.homeQuat=new rt,this._hasHome=!1,this._tmpMat=new Ue,this._tmpPos=new C,this._tmpQuat=new rt,this._tmpForward=new C,this._tmpUp=new C(0,1,0),this._box=new Rt,this._size=new C,this._sphere=new jt}setHomeFromCurrent(){this.homePos.copy(this.camera.position),this.homeQuat.copy(this.camera.quaternion),this._hasHome=!0}focusOn({targetObject:e,distance:t="fit",padding:n=1.05,minDistance:i=.3,maxDistance:s=100,heightOffset:a=.2,duration:o=.75,useObjectNormal:l=!0,fallbackDirection:c=new C(0,0,1),keepHomeWhileFocused:h=!0}){if(!e)return;(!this._hasHome||!h&&this.isFocused)&&this.setHomeFromCurrent(),this.duration=Math.max(.05,o),this.fromPos.copy(this.camera.position),this.fromQuat.copy(this.camera.quaternion);const u=this._tmpPos;e.getWorldPosition(u);const d=this._tmpQuat;e.getWorldQuaternion(d);let p=this._tmpForward;l?(p.set(0,0,1).applyQuaternion(d).normalize(),(!isFinite(p.x)||p.lengthSq()<1e-8)&&p.copy(c).normalize()):(p.copy(this.camera.position).sub(u).normalize(),(!isFinite(p.x)||p.lengthSq()<1e-8)&&p.copy(c).normalize());let _;t==="fit"?_=this._computeFitDistance(e,n):_=Number(t),_=kn.clamp(_,i,s),_=Math.max(_,this.camera.near*4),this.toPos.copy(u).addScaledVector(p,_),this.toPos.y+=a,this._tmpMat.lookAt(this.toPos,u,this._tmpUp),this.toQuat.setFromRotationMatrix(this._tmpMat),this.t=0,this.isMoving=!0,this.isFocused=!0}moveTo({position:e,quaternion:t,duration:n=.9}){this._hasHome||this.setHomeFromCurrent(),this.duration=Math.max(.05,n),this.fromPos.copy(this.camera.position),this.fromQuat.copy(this.camera.quaternion),this.toPos.copy(e),this.toQuat.copy(t),this.t=0,this.isMoving=!0,this.isFocused=!0}returnHome(e=.75){this._hasHome&&(this.duration=Math.max(.05,e),this.fromPos.copy(this.camera.position),this.fromQuat.copy(this.camera.quaternion),this.toPos.copy(this.homePos),this.toQuat.copy(this.homeQuat),this.t=0,this.isMoving=!0,this.isFocused=!1)}update(e){if(!this.isMoving)return;this.t+=e/this.duration;const t=H0(z0(this.t));this.camera.position.lerpVectors(this.fromPos,this.toPos,t),this.camera.quaternion.slerpQuaternions(this.fromQuat,this.toQuat,t),this.t>=1&&(this.isMoving=!1)}_computeFitDistance(e,t=1.15){this._box.setFromObject(e),this._box.getBoundingSphere(this._sphere);const n=Math.max(1e-6,this._sphere.radius)*t,i=kn.degToRad(this.camera.fov),s=this.camera.aspect,a=2*Math.atan(Math.tan(i*.5)*s),o=n/Math.tan(i*.5),l=n/Math.tan(a*.5);return Math.max(o,l)}}const G0=r=>Math.max(0,Math.min(1,r)),W0=r=>r*r*(3-2*r);function Sn({from:r,to:e,duration:t=.35,onUpdate:n,onDone:i}){let s=0,a=!1;return{update(o){if(a)return;s+=o/Math.max(1e-4,t);const l=W0(G0(s)),c=r+(e-r)*l;n==null||n(c),s>=1&&(a=!0,i==null||i())},get done(){return a}}}class X0 extends B_{constructor(e){super(e),this.type=yn}parse(e){const a=function(D,g){switch(D){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(g||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(g||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(g||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(g||""))}},u=function(D,g,y){g=g||1024;let B=D.pos,$=-1,R=0,I="",U=String.fromCharCode.apply(null,new Uint16Array(D.subarray(B,B+128)));for(;0>($=U.indexOf(`
`))&&R<g&&B<D.byteLength;)I+=U,R+=U.length,B+=128,U+=String.fromCharCode.apply(null,new Uint16Array(D.subarray(B,B+128)));return-1<$?(D.pos+=R+$+1,I+U.slice(0,$)):!1},d=function(D){const g=/^#\?(\S+)/,y=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,N=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,B=/^\s*FORMAT=(\S+)\s*$/,$=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,R={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let I,U;for((D.pos>=D.byteLength||!(I=u(D)))&&a(1,"no header found"),(U=I.match(g))||a(3,"bad initial token"),R.valid|=1,R.programtype=U[1],R.string+=I+`
`;I=u(D),I!==!1;){if(R.string+=I+`
`,I.charAt(0)==="#"){R.comments+=I+`
`;continue}if((U=I.match(y))&&(R.gamma=parseFloat(U[1])),(U=I.match(N))&&(R.exposure=parseFloat(U[1])),(U=I.match(B))&&(R.valid|=2,R.format=U[1]),(U=I.match($))&&(R.valid|=4,R.height=parseInt(U[1],10),R.width=parseInt(U[2],10)),R.valid&2&&R.valid&4)break}return R.valid&2||a(3,"missing format specifier"),R.valid&4||a(3,"missing image size specifier"),R},p=function(D,g,y){const N=g;if(N<8||N>32767||D[0]!==2||D[1]!==2||D[2]&128)return new Uint8Array(D);N!==(D[2]<<8|D[3])&&a(3,"wrong scanline width");const B=new Uint8Array(4*g*y);B.length||a(4,"unable to allocate buffer space");let $=0,R=0;const I=4*N,U=new Uint8Array(4),X=new Uint8Array(I);let q=y;for(;q>0&&R<D.byteLength;){R+4>D.byteLength&&a(1),U[0]=D[R++],U[1]=D[R++],U[2]=D[R++],U[3]=D[R++],(U[0]!=2||U[1]!=2||(U[2]<<8|U[3])!=N)&&a(3,"bad rgbe scanline format");let j=0,Y;for(;j<I&&R<D.byteLength;){Y=D[R++];const Z=Y>128;if(Z&&(Y-=128),(Y===0||j+Y>I)&&a(3,"bad scanline data"),Z){const F=D[R++];for(let K=0;K<Y;K++)X[j++]=F}else X.set(D.subarray(R,R+Y),j),j+=Y,R+=Y}const J=N;for(let Z=0;Z<J;Z++){let F=0;B[$]=X[Z+F],F+=N,B[$+1]=X[Z+F],F+=N,B[$+2]=X[Z+F],F+=N,B[$+3]=X[Z+F],$+=4}q--}return B},_=function(D,g,y,N){const B=D[g+3],$=Math.pow(2,B-128)/255;y[N+0]=D[g+0]*$,y[N+1]=D[g+1]*$,y[N+2]=D[g+2]*$,y[N+3]=1},v=function(D,g,y,N){const B=D[g+3],$=Math.pow(2,B-128)/255;y[N+0]=bs.toHalfFloat(Math.min(D[g+0]*$,65504)),y[N+1]=bs.toHalfFloat(Math.min(D[g+1]*$,65504)),y[N+2]=bs.toHalfFloat(Math.min(D[g+2]*$,65504)),y[N+3]=bs.toHalfFloat(1)},m=new Uint8Array(e);m.pos=0;const f=d(m),S=f.width,x=f.height,T=p(m.subarray(m.pos),S,x);let L,A,b;switch(this.type){case Xt:b=T.length/4;const D=new Float32Array(b*4);for(let y=0;y<b;y++)_(T,y*4,D,y*4);L=D,A=Xt;break;case yn:b=T.length/4;const g=new Uint16Array(b*4);for(let y=0;y<b;y++)v(T,y*4,g,y*4);L=g,A=yn;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:S,height:x,data:L,header:f.string,gamma:f.gamma,exposure:f.exposure,type:A}}setDataType(e){return this.type=e,this}load(e,t,n,i){function s(a,o){switch(a.type){case Xt:case yn:a.colorSpace=pt,a.minFilter=je,a.magFilter=je,a.generateMipmaps=!1,a.flipY=!0;break}t&&t(a,o)}return super.load(e,s,n,i)}}async function q0({renderer:r,scene:e,url:t,background:n=!1,envIntensity:i=1}){const s=new ra(r),a=/\.(hdr|exr)$/i.test(t);let o;a?o=await new X0().loadAsync(t):(o=await new zi().loadAsync(t),o.mapping=qs,o.colorSpace=Ye,s.compileEquirectangularShader());const l=s.fromEquirectangular(o).texture;return e.environment=l,n&&(e.background=l),o.dispose(),s.dispose(),e.traverse(c=>{if(!c.isMesh)return;const h=Array.isArray(c.material)?c.material:[c.material];for(const u of h)u&&"envMapIntensity"in u&&(u.envMapIntensity=i,u.needsUpdate=!0)}),l}const Pl=r=>Math.max(0,Math.min(1,r)),j0=r=>r*r*(3-2*r);class Y0{constructor({camera:e}){this.camera=e,this.locations={},this.activeId=null,this.isMoving=!1,this.t=1,this.duration=.8,this.fromPos=new C,this.toPos=new C,this.fromQuat=new rt,this.toQuat=new rt,this._tmpMat=new Ue,this._tmpTarget=new C,this._tmpUp=new C(0,1,0),this._paths=new Map,this._pathActive=!1,this._pathPoints=[],this._pathQuats=[],this._pathSegFracs=[],this._pathSegStarts=[],this._pathSegCount=0}setLocations(e){this.locations=e||{}}setPath(e,t,n,i={}){const s=`${e}→${t}`;this._paths.set(s,{waypoints:n,options:i})}setPathBidirectional(e,t,n,i={}){this.setPath(e,t,n,i);const s=n.slice().reverse(),a=this.locations[e],o=s.map((l,c)=>{let h;return c<s.length-1?h=s[c+1].pos:a?h=a.camera.pos:h=l.pos,{pos:l.pos,lookAt:h}});this.setPath(t,e,o,i)}setPaths(e){for(const t of e)t.bidirectional?this.setPathBidirectional(t.from,t.to,t.waypoints,t.options):this.setPath(t.from,t.to,t.waypoints,t.options)}goTo(e,{duration:t=.8}={}){var o,l,c;const n=this.locations[e];if(!n)return;this.activeId&&this.activeId!==e&&((l=(o=this.locations[this.activeId])==null?void 0:o.onExit)==null||l.call(o)),(c=n.onEnter)==null||c.call(n);const i=this.activeId;this.activeId=e,this.duration=Math.max(.05,t);const s=`${i}→${e}`,a=i&&this._paths.get(s);a?this._startPath(e,a,this.duration):(this._pathActive=!1,this.fromPos.copy(this.camera.position),this.fromQuat.copy(this.camera.quaternion),this.toPos.set(...n.camera.pos),this._tmpTarget.set(...n.camera.lookAt),this._tmpMat.lookAt(this.toPos,this._tmpTarget,this._tmpUp),this.toQuat.setFromRotationMatrix(this._tmpMat),this.fromQuat.dot(this.toQuat)<0&&this.toQuat.set(-this.toQuat.x,-this.toQuat.y,-this.toQuat.z,-this.toQuat.w),this.t=0,this.isMoving=!0)}_startPath(e,{waypoints:t,options:n}){const i=this.locations[e],s=(n==null?void 0:n.distanceWeighted)??!1;n!=null&&n.duration&&(this.duration=Math.max(.05,n.duration));const a=[{pos:this.camera.position.toArray(),_useCurrentQuat:!0},...t,{pos:i.camera.pos,lookAt:i.camera.lookAt}],o=a.length;this._pathPoints=a.map(d=>new C(...d.pos)),this._pathQuats=a.map((d,p)=>{if(d._useCurrentQuat)return this.camera.quaternion.clone();const _=this._pathPoints[p];let v;d.lookAt?v=new C(...d.lookAt):p<o-1?v=this._pathPoints[p+1]:v=this._pathPoints[p].clone().add(new C(0,0,-1));const m=new Ue;return m.lookAt(_,v,this._tmpUp),new rt().setFromRotationMatrix(m)});for(let d=1;d<this._pathQuats.length;d++)if(this._pathQuats[d-1].dot(this._pathQuats[d])<0){const p=this._pathQuats[d];p.set(-p.x,-p.y,-p.z,-p.w)}const l=o-1;this._pathSegCount=l;const c=[];let h=0;for(let d=0;d<l;d++){const p=this._pathPoints[d].distanceTo(this._pathPoints[d+1]);c.push(p),h+=p}if(s&&h>0)this._pathSegFracs=c.map(d=>d/h);else{const d=1/l;this._pathSegFracs=c.map(()=>d)}this._pathSegStarts=[0];let u=0;for(let d=0;d<l;d++)u+=this._pathSegFracs[d],this._pathSegStarts.push(u);this._pathSegStarts[l]=1,this.t=0,this.isMoving=!0,this._pathActive=!0}_updatePath(e){let t=this._pathSegCount-1;for(let s=0;s<this._pathSegCount;s++)if(e<this._pathSegStarts[s+1]){t=s;break}const n=this._pathSegFracs[t],i=n>0?Pl((e-this._pathSegStarts[t])/n):1;this.camera.position.lerpVectors(this._pathPoints[t],this._pathPoints[t+1],i),this.camera.quaternion.slerpQuaternions(this._pathQuats[t],this._pathQuats[t+1],i)}update(e){if(!this.isMoving)return;this.t+=e/this.duration;const t=j0(Pl(this.t));this._pathActive?this._updatePath(t):(this.camera.position.lerpVectors(this.fromPos,this.toPos,t),this.camera.quaternion.slerpQuaternions(this.fromQuat,this.toQuat,t)),this.t>=1&&(this.isMoving=!1,this._pathActive=!1)}}class $0{constructor({onClose:e,onNav:t,onJumpTo:n}={}){var a,o,l,c;this.el=document.getElementById("info-panel"),this.titleEl=this.el.querySelector(".info-panel__title"),this.artistEl=this.el.querySelector(".info-panel__artist"),this.descEl=this.el.querySelector(".info-panel__description"),this.closeBtn=this.el.querySelector(".info-panel__close");const i=document.getElementById("menu");this.prevBtn=i.querySelector(".artwork-nav__prev"),this.nextBtn=i.querySelector(".artwork-nav__next"),this.listBtn=i.querySelector(".artwork-nav__list-btn"),this.listEl=document.getElementById("artwork-list"),this.listItemsEl=this.listEl.querySelector(".artwork-list__items"),this.listCloseBtn=this.listEl.querySelector(".artwork-list__close"),this.videoEl=this.el.querySelector(".info-panel__video"),this.playPauseBtn=this.videoEl.querySelector(".video-ctrl__playpause"),this.timeEl=this.videoEl.querySelector(".video-ctrl__time"),this.scrubberEl=this.videoEl.querySelector(".video-ctrl__scrubber"),this.durationEl=this.videoEl.querySelector(".video-ctrl__duration"),this._activeVideo=null,this._rafId=null,this.videoEl.hidden=!1,this.audioEl=this.el.querySelector(".info-panel__audio");const s=this.audioEl.querySelector(".info-panel__audio-controls");this.audioPlayPauseBtn=s.querySelector(".video-ctrl__playpause"),this.audioTimeEl=s.querySelector(".video-ctrl__time"),this.audioScrubberEl=s.querySelector(".video-ctrl__scrubber"),this.audioDurationEl=s.querySelector(".video-ctrl__duration"),this._activeAudio=null,this._audioRafId=null,this._activeCues=null,this._activeCueIdx=-1,this._onJumpTo=n,this._registry=[],this.descEl.addEventListener("scroll",()=>this._updateMask(),{passive:!0}),this.closeBtn.addEventListener("click",()=>{this.hide(),typeof e=="function"&&e()}),this.prevBtn.addEventListener("click",()=>{typeof t=="function"&&t(-1)}),this.nextBtn.addEventListener("click",()=>{typeof t=="function"&&t(1)}),this.listBtn.addEventListener("click",()=>this._toggleList()),this.listCloseBtn.addEventListener("click",()=>this._closeList()),this.playPauseBtn.addEventListener("click",()=>{const h=this._activeVideo;h&&(h.paused?h.play().catch(()=>{}):h.pause())}),this.scrubberEl.addEventListener("input",()=>{const h=this._activeVideo;!h||isNaN(h.duration)||(h.currentTime=parseFloat(this.scrubberEl.value)*h.duration)}),this.scrubberEl.addEventListener("pointerdown",h=>h.stopPropagation()),this.audioPlayPauseBtn.addEventListener("click",()=>{const h=this._activeAudio;h&&(h.paused?h.play().catch(()=>{}):h.pause())}),this.audioScrubberEl.addEventListener("input",()=>{const h=this._activeAudio;!h||isNaN(h.duration)||(h.currentTime=parseFloat(this.audioScrubberEl.value)*h.duration)}),this.audioScrubberEl.addEventListener("pointerdown",h=>h.stopPropagation()),this.descEl.addEventListener("pointerdown",h=>h.stopPropagation()),this._mobileHeader=document.getElementById("mobile-artwork-header"),this._mobileHeaderTitle=(a=this._mobileHeader)==null?void 0:a.querySelector(".mobile-artwork-header__title"),this._mobileHeaderArtist=(o=this._mobileHeader)==null?void 0:o.querySelector(".mobile-artwork-header__artist"),(c=(l=this._mobileHeader)==null?void 0:l.querySelector(".mobile-artwork-header__close"))==null||c.addEventListener("click",()=>{this.hide(),typeof e=="function"&&e()})}show({title:e="",artist:t="",description:n="",link:i=""}={}){if(i){const s=document.createElement("a");s.href=i,s.textContent=e,s.target="_blank",s.rel="noopener noreferrer",s.addEventListener("pointerdown",a=>a.stopPropagation()),this.titleEl.innerHTML="",this.titleEl.appendChild(s)}else this.titleEl.textContent=e;this.artistEl.textContent=t,this.descEl.textContent=n,this.artistEl.style.display=t?"":"none",this.el.classList.add("info-panel--visible"),this._mobileHeader&&window.innerWidth<640&&(this._mobileHeaderTitle.textContent=e??"",this._mobileHeaderArtist.textContent=t??"",this._mobileHeader.classList.add("mobile-artwork-header--visible")),this.descEl.scrollTop=0,requestAnimationFrame(()=>this._updateMask())}hide(){var e;this.el.classList.remove("info-panel--visible"),(e=this._mobileHeader)==null||e.classList.remove("mobile-artwork-header--visible"),this._closeList()}showVideoControls(e){this._activeVideo=e,this.videoEl.classList.add("info-panel__video--visible");const t=()=>{isNaN(e.duration)||(this.durationEl.textContent=this._formatTime(e.duration))};isNaN(e.duration)?e.addEventListener("loadedmetadata",t,{once:!0}):t(),this._startVideoLoop()}hideVideoControls(){this._stopVideoLoop(),this._activeVideo=null,this.videoEl.classList.remove("info-panel__video--visible"),this.scrubberEl.value=0,this.timeEl.textContent="0:00",this.durationEl.textContent="0:00"}showAudioControls(e,t=null){this._activeCues=null,this._activeCueIdx=-1,this._activeAudio=e,this.audioEl.classList.add("info-panel__audio--visible"),t&&this.setCues(t);const n=()=>{isNaN(e.duration)||(this.audioDurationEl.textContent=this._formatTime(e.duration))};isNaN(e.duration)?e.addEventListener("loadedmetadata",n,{once:!0}):n(),this._startAudioLoop()}hideAudioControls(){this._stopAudioLoop(),this._activeAudio=null,this._activeCues=null,this._activeCueIdx=-1,this.audioEl.classList.remove("info-panel__audio--visible"),this.audioScrubberEl.value=0,this.audioTimeEl.textContent="0:00",this.audioDurationEl.textContent="0:00"}setCues(e){this._activeCues=e,this._activeCueIdx=-1,this.descEl.innerHTML="",this.descEl.scrollTop=0,e.forEach(t=>{const n=document.createElement("span");n.className="info-panel__transcript-seg",n.textContent=t.text,this.descEl.appendChild(n)})}setRegistry(e){this._registry=e,this._buildList()}setActiveIndex(e){this.listItemsEl.querySelectorAll(".artwork-list__item").forEach((n,i)=>n.classList.toggle("artwork-list__item--active",i===e))}_buildList(){this.listItemsEl.innerHTML="",this._registry.forEach((e,t)=>{const n=document.createElement("button");if(n.className="artwork-list__item",n.textContent=e.info.title||`Artwork ${t+1}`,e.info.artist){const i=document.createElement("span");i.className="artwork-list__item-artist",i.textContent=e.info.artist,n.appendChild(i)}n.addEventListener("click",()=>{this._closeList(),typeof this._onJumpTo=="function"&&this._onJumpTo(t)}),this.listItemsEl.appendChild(n)})}_toggleList(){this.listEl.classList.toggle("artwork-list--visible")}_closeList(){this.listEl.classList.remove("artwork-list--visible")}_startVideoLoop(){this._stopVideoLoop();const e=()=>{this._tickVideo(),this._rafId=requestAnimationFrame(e)};this._rafId=requestAnimationFrame(e)}_stopVideoLoop(){this._rafId!==null&&cancelAnimationFrame(this._rafId),this._rafId=null}_startAudioLoop(){this._stopAudioLoop();const e=()=>{this._tickAudio(),this._audioRafId=requestAnimationFrame(e)};this._audioRafId=requestAnimationFrame(e)}_stopAudioLoop(){this._audioRafId!==null&&cancelAnimationFrame(this._audioRafId),this._audioRafId=null}_tickAudio(){const e=this._activeAudio;if(!(!e||isNaN(e.duration))&&(this.audioScrubberEl.value=e.currentTime/e.duration,this.audioTimeEl.textContent=this._formatTime(e.currentTime),this.audioPlayPauseBtn.innerHTML=e.paused?"&#9654;":"&#9646;&#9646;",this._activeCues)){const t=e.currentTime,n=this._activeCues.findIndex(i=>t>=i.start_time&&t<=i.end_time);if(n!==this._activeCueIdx){const i=this.descEl.querySelectorAll(".info-panel__transcript-seg");this._activeCueIdx>=0&&i[this._activeCueIdx]&&i[this._activeCueIdx].classList.remove("info-panel__transcript-seg--active"),n>=0&&i[n]&&(i[n].classList.add("info-panel__transcript-seg--active"),i[n].scrollIntoView({block:"nearest",behavior:"smooth"})),this._activeCueIdx=n}}}_tickVideo(){const e=this._activeVideo;!e||isNaN(e.duration)||(this.scrubberEl.value=e.currentTime/e.duration,this.timeEl.textContent=this._formatTime(e.currentTime),this.playPauseBtn.innerHTML=e.paused?"&#9654;":"&#9646;&#9646;")}_formatTime(e){const t=Math.floor(e/60),n=Math.floor(e%60).toString().padStart(2,"0");return`${t}:${n}`}_updateMask(){const e=this.descEl,t=e.scrollTop<=2,n=e.scrollTop+e.clientHeight>=e.scrollHeight-2,i=e.scrollHeight>e.clientHeight+4;let s="none";i&&(t?s="linear-gradient(to bottom, black 70%, transparent 100%)":n?s="linear-gradient(to bottom, transparent 0%, black 30%)":s="linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"),e.style.maskImage=s,e.style.webkitMaskImage=s}}const Dl=new C(0,1,0),Ei=(r,e)=>({...r,...e??{}});function Nl(r){const t=document.createElement("canvas");t.width=t.height=128;const n=t.getContext("2d");n.font="bold 96px sans-serif",n.fillStyle="#ffffff",n.textAlign="center",n.textBaseline="middle",n.fillText(r,128/2,128/2+4);const i=new ht({map:new Vi(t),transparent:!0,depthTest:!1,side:Nt});return new Xe(new Ut(.5,.5),i)}function $r(r,e){const t=r.indexOf(e);t!==-1&&r.splice(t,1)}function K0(r){const n=document.createElement("canvas");n.width=256,n.height=64,Vc(n,r);const i=new ht({map:new Vi(n),transparent:!0,depthTest:!1,side:Nt}),s=new Xe(new Ut(.9,.225),i);return s.userData.toggleCanvas=n,s}function Vc(r,e){const t=r.width,n=r.height,i=r.getContext("2d");i.clearRect(0,0,t,n),i.fillStyle=e?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.06)",i.beginPath(),i.roundRect(2,2,t-4,n-4,(n-4)/2),i.fill(),i.strokeStyle=e?"rgba(255,255,255,0.65)":"rgba(255,255,255,0.25)",i.lineWidth=1.5,i.stroke(),i.font="bold 26px sans-serif",i.fillStyle=e?"#ffffff":"rgba(255,255,255,0.4)",i.textAlign="center",i.textBaseline="middle",i.fillText(e?"AUTO SPIN  ●":"AUTO SPIN  ○",t/2,n/2+1)}class Ul{constructor({scene:e,models:t=[],position:n=[0,0,0],rotation:i=[0,0,0],radius:s=2.5,normalizeTo:a=null,artworkInfo:o={},debugOn:l=!1,materialOverride:c=null,showSpinToggle:h=!1}){this.scene=e,this._modelDefs=t,this._position=n,this._radius=s,this._normalizeTo=a,this.artworkInfo=o,this._debugOn=l,this._materialOverride=c,this._showSpinToggle=h;const u=Math.PI/180;this._baseAngle=i[1]*u,this.root=new Jt,this.root.position.set(...n),this.root.rotation.set(i[0]*u,i[1]*u,i[2]*u),e.add(this.root),this.hitbox=null,this.modelHitboxes=[],this.activeIndex=0,this._models=[],this._isFocused=!1,this._rotTween=null,this._currentAngle=this._baseAngle,this._targetAngle=this._baseAngle,this._clickables=null,this._camera=null,this._arrowPrev=null,this._arrowNext=null,this._arrowOffset=.8,this._spinEnabled=!0,this._spinSpeed=.5,this._spinToggle=null}async load(){var s,a,o,l;const e=this._modelDefs,t=e.length;if(!t)return;const n=await Promise.all(e.map(c=>rr(c.url)));for(let c=0;c<t;c++){const h=e[c],{scene:u,animations:d}=n[c];if(typeof this._normalizeTo=="number"&&this._normalizeToSize(u,this._normalizeTo),h.scale!=null){const g=typeof h.scale=="number"?h.scale:1,y=Array.isArray(h.scale)?h.scale:[g,g,g];u.scale.multiply(new C(...y))}this._materialOverride&&this._applyMaterialOverride(u);const p=Math.PI/180,_=2*Math.PI/t*c,v=(((s=h.rotation)==null?void 0:s[0])??0)*p,m=(((a=h.rotation)==null?void 0:a[1])??0)*p,f=(((o=h.rotation)==null?void 0:o[2])??0)*p;u.position.set(Math.sin(_)*this._radius,0,Math.cos(_)*this._radius),u.rotation.set(v,_+Math.PI+m,f);let S=null;const x=h.playAnimation;if(d!=null&&d.length&&x){if(S=new Ia(u),x==="all")for(const g of d)S.clipAction(g).play();else{const g=x==="first"?d[0]:d.find(y=>y.name===x)??d[0];S.clipAction(g).play()}S.update(0),S.timeScale=0}u.traverse(g=>{g.userData.experienceOwner=this}),this._models.push({root:u,mixer:S,artworkInfo:Ei(this.artworkInfo,h.artworkInfo)}),this.root.add(u),this.root.updateWorldMatrix(!0,!0);const T=new Rt().setFromObject(u),L=T.getCenter(new C),A=T.getSize(new C),b=this.root.worldToLocal(L.clone()),D=new Xe(new dt(Math.max(.4,A.x*1.15),Math.max(.4,A.y*1.15),Math.max(.4,A.z*1.15)),new ht({color:65535,wireframe:!0,visible:this._debugOn}));D.position.copy(b),D.userData.carouselModelIndex=c,D.userData.artworkInfo=Ei(this.artworkInfo,h.artworkInfo),D.userData.experienceOwner=this,this.root.add(D),this.modelHitboxes.push(D)}const i=this._radius*2+1.5;this.hitbox=new Xe(new dt(i,2.5,i),new ht({color:16746496,wireframe:!0,visible:this._debugOn})),this.hitbox.position.set(...this._position),this.hitbox.userData.artworkInfo=Ei(this.artworkInfo,(l=this._models[0])==null?void 0:l.artworkInfo),this.hitbox.userData.focusTarget=this.root,this.hitbox.userData.experienceOwner=this,this.scene.add(this.hitbox),this._arrowPrev=Nl("‹"),this._arrowNext=Nl("›"),this._arrowPrev.userData.carouselArrow="prev",this._arrowPrev.userData.experienceOwner=this,this._arrowNext.userData.carouselArrow="next",this._arrowNext.userData.experienceOwner=this,this._arrowPrev.visible=!1,this._arrowNext.visible=!1,this.scene.add(this._arrowPrev),this.scene.add(this._arrowNext),this._spinToggle=K0(this._spinEnabled),this._spinToggle.userData.carouselSpinToggle=!0,this._spinToggle.userData.experienceOwner=this,this._spinToggle.visible=!1,this.scene.add(this._spinToggle)}onFocus(e){this._isFocused=!0,this._camera=e,this.hitbox.visible=!1;const t=this._models[this.activeIndex];t!=null&&t.mixer&&(t.mixer.timeScale=1),this._arrowPrev&&(this._arrowPrev.visible=!0,this._arrowNext.visible=!0,this._spinToggle.visible=this._showSpinToggle,this._clickables&&(this._clickables.includes(this._arrowPrev)||this._clickables.push(this._arrowPrev),this._clickables.includes(this._arrowNext)||this._clickables.push(this._arrowNext),this._showSpinToggle&&!this._clickables.includes(this._spinToggle)&&this._clickables.push(this._spinToggle)),this._updateArrows())}onUnfocus(){var e;this._isFocused=!1,this._camera=null,this.hitbox.visible=!0;for(const t of this._models)t!=null&&t.mixer&&(t.mixer.timeScale=0);this.activeIndex=0,this._currentAngle=this._baseAngle,this._targetAngle=this._baseAngle,this.root.rotation.y=this._baseAngle,this._rotTween=null,this.hitbox.userData.focusTarget=this.root,this.hitbox.userData.artworkInfo=Ei(this.artworkInfo,(e=this._models[0])==null?void 0:e.artworkInfo),this._arrowPrev&&(this._arrowPrev.visible=!1,this._arrowNext.visible=!1,this._spinToggle.visible=!1,this._clickables&&($r(this._clickables,this._arrowPrev),$r(this._clickables,this._arrowNext),this._showSpinToggle&&$r(this._clickables,this._spinToggle)))}onMiss(){return!1}onDrag(e){const t=this._models[this.activeIndex];t&&t.root.rotateOnWorldAxis(Dl,e*.007)}onNav(e){const t=this._models.length;if(t<=1)return null;const n=this._models[this.activeIndex];n!=null&&n.mixer&&(n.mixer.timeScale=0),this.activeIndex=((this.activeIndex+e)%t+t)%t,this._rotateByDelta(e);const i=this._models[this.activeIndex];return i!=null&&i.mixer&&(i.mixer.timeScale=1),{consumed:!0,artworkInfo:(i==null?void 0:i.artworkInfo)??null}}onHit(e){const t=e.userData.carouselArrow;if(t==="prev")return this.onNav(-1);if(t==="next")return this.onNav(1);if(e.userData.carouselSpinToggle)return this._spinEnabled=!this._spinEnabled,Vc(this._spinToggle.userData.toggleCanvas,this._spinEnabled),this._spinToggle.material.map.needsUpdate=!0,{consumed:!0};const n=e.userData.carouselModelIndex;if(n!==void 0){if(n===this.activeIndex){const a=this._models[n];return{consumed:!0,artworkInfo:Ei(this.artworkInfo,a==null?void 0:a.artworkInfo)}}const i=this._models[this.activeIndex];i!=null&&i.mixer&&(i.mixer.timeScale=0),this.rotateTo(n),this.activeIndex=n;const s=this._models[n];return s!=null&&s.mixer&&(s.mixer.timeScale=1),{consumed:!0,artworkInfo:Ei(this.artworkInfo,s==null?void 0:s.artworkInfo)}}return!1}update(e){if(this._rotTween&&(this._rotTween.update(e),this._rotTween.done&&(this._rotTween=null)),this._isFocused){const t=this._models[this.activeIndex];if(t!=null&&t.mixer&&t.mixer.update(e),this._spinEnabled)for(const n of this._models)n.root.rotateOnWorldAxis(Dl,this._spinSpeed*e);this._updateArrows(),this._updateToggle()}}_updateArrows(){if(!this._camera||!this._arrowPrev||!this._models.length)return;const e=this._models[this.activeIndex];if(!e)return;const t=new C;e.root.getWorldPosition(t);const n=new C(1,0,0).applyQuaternion(this._camera.quaternion);this._arrowPrev.position.copy(t).addScaledVector(n,-this._arrowOffset),this._arrowNext.position.copy(t).addScaledVector(n,this._arrowOffset),this._arrowPrev.lookAt(this._camera.position),this._arrowNext.lookAt(this._camera.position)}_updateToggle(){if(!this._camera||!this._spinToggle||!this._models.length)return;const e=this._models[this.activeIndex];if(!e)return;const t=new C;e.root.getWorldPosition(t),this._spinToggle.position.set(t.x,t.y-.85,t.z),this._spinToggle.lookAt(this._camera.position)}_rotateByDelta(e,t=.65){const n=2*Math.PI/this._models.length,i=this._targetAngle-e*n;this._targetAngle=i,this._rotTween=Sn({from:this._currentAngle,to:i,duration:t,onUpdate:s=>{this._currentAngle=s,this.root.rotation.y=s}})}rotateTo(e,t=.65){const n=this._models.length,i=2*Math.PI/n;let s=((e-this.activeIndex)%n+n)%n;s>n/2&&(s-=n);const a=this._targetAngle-s*i;this._targetAngle=a,this._rotTween=Sn({from:this._currentAngle,to:a,duration:t,onUpdate:o=>{this._currentAngle=o,this.root.rotation.y=o}})}_normalizeToSize(e,t){const n=new Rt().setFromObject(e),i=n.getSize(new C),s=Math.max(i.x,i.y,i.z)||1,a=n.getCenter(new C);e.position.sub(a),e.scale.multiplyScalar(t/s)}_applyMaterialOverride(e){const t=this._materialOverride,n=new Qt({color:t.color??13158600,metalness:t.metalness??1,roughness:t.roughness??.15,envMapIntensity:t.envMapIntensity??1.5});e.traverse(i=>{i.isMesh&&(Array.isArray(i.material)?i.material=i.material.map(()=>n):i.material=n)})}}const Fl=r=>r*r*(3-2*r),Ol=r=>Math.max(0,Math.min(1,r)),Z0=new C(0,1,0),es=(r,e)=>({...r,...e??{}});class ts{constructor({scene:e,images:t=[],position:n=[0,0,0],rotation:i=[0,0,0],radius:s=null,panelWidth:a=2.5,panelHeight:o=2,artworkInfo:l={},revealMap:c=null,debugOn:h=!1}){this.scene=e,this._imageDefs=t,this._panelWidth=a,this._panelHeight=o,this.artworkInfo=l,this._debugOn=h,this._revealMap=c;const u=Math.PI/180;this._baseYDeg=i[1];const d=Math.max(1,t.length);this._radius=s??Math.max(2.5,a*d*1.3/(2*Math.PI));const p=i[1]*u,_=new C(Math.sin(p),0,Math.cos(p)),v=new C(...n).addScaledVector(_,-this._radius);this.root=new Jt,this.root.position.copy(v),this.root.rotation.set(i[0]*u,p,i[2]*u),e.add(this.root),this.ring=new Jt,this.root.add(this.ring),this.hitbox=null,this._panelHitboxes=[],this.modelHitboxes=[],this.arrowPrev=null,this.arrowNext=null,this.activeIndex=0,this._panels=[],this._isFocused=!1,this._rotTween=null,this._colorTween=null,this._currentAngle=0,this._targetAngle=0,this._revealTweens=[],this._clickables=null,this._textureLoader=new zi,this._exitFadeTweens=[],this._exitSpinTween=null,this._isExiting=!1}async load(){const e=this._imageDefs,t=e.length;if(!t)return this;const n=this._radius,i=this._panelWidth,s=this._panelHeight,a=i/s,o=2*Math.PI/t,l=this._revealMap;for(let u=0;u<t;u++){const d=e[u],p=o*u;let _,v;if(u===0){const f=this._textureLoader.load(d.url,S=>{const x=S.image;(x==null?void 0:x.naturalWidth)>0&&(v.uniforms.uContainScale.value=J0(x.naturalWidth/x.naturalHeight,a))});f.colorSpace=Ye,v=Oc({map:f,revealMap:l}),v.uniforms.uReveal.value=0,v.side=qt,_=new Xe(new Ut(i,s),v)}else{const f=this._textureLoader.load(d.url,S=>{const x=S.image;(x==null?void 0:x.naturalWidth)>0&&Q0(f,x.naturalWidth/x.naturalHeight,a)});f.colorSpace=Ye,f.wrapS=f.wrapT=At,v=new ht({map:f,transparent:!0,opacity:0,side:qt,depthWrite:!1,toneMapped:!1}),_=new Xe(new Ut(i,s),v),_.visible=!1}_.position.set(Math.sin(p)*n,0,Math.cos(p)*n),_.lookAt(0,0,0),this.ring.add(_),this._panels.push({mesh:_,material:v});const m=new Xe(new dt(i*1.15,s*1.15,.1),new ht({color:65535,wireframe:!0,visible:this._debugOn}));m.position.copy(_.position),m.quaternion.copy(_.quaternion),m.visible=!1,m.userData.artworkInfo=es(this.artworkInfo,d.artworkInfo),m.userData.experience=this,this.ring.add(m),this._panelHitboxes.push(m)}this.hitbox=new Xe(new dt(i*1.15,s*1.15,.3),new ht({color:16746496,wireframe:!0,visible:this._debugOn})),this.hitbox.position.set(0,0,n),this.hitbox.lookAt(new C(0,0,0)),this.hitbox.userData.artworkInfo=es(this.artworkInfo,e[0].artworkInfo),this.hitbox.userData.focusTarget=this.hitbox,this.hitbox.userData.experienceOwner=this,this.root.add(this.hitbox);for(const u of this._panelHitboxes)u.userData.focusTarget=this.hitbox;this._bakeFocusPose(),this.arrowPrev=kl("›"),this.arrowNext=kl("‹");const c=i/2+.55,h=n-.05;return this.arrowPrev.position.set(-c,0,h),this.arrowNext.position.set(c,0,h),this.arrowPrev.lookAt(new C(0,0,0)),this.arrowNext.lookAt(new C(0,0,0)),this.arrowPrev.visible=!1,this.arrowNext.visible=!1,this.arrowPrev.userData.experience=this,this.arrowNext.userData.experience=this,this.root.add(this.arrowPrev),this.root.add(this.arrowNext),this}onFocus(){if(this._isExiting&&this._cancelExit(),this._isFocused=!0,this.hitbox.visible=!1,this.arrowPrev.visible=!0,this.arrowNext.visible=!0,this._clickables){for(const n of this._panelHitboxes)this._clickables.includes(n)||this._clickables.push(n);this._clickables.includes(this.arrowPrev)||this._clickables.push(this.arrowPrev),this._clickables.includes(this.arrowNext)||this._clickables.push(this.arrowNext)}const e=this._panels[0].material,t=e.uniforms.uColorReveal.value;t<1.2&&(this._colorTween=Sn({from:t,to:1.2,duration:1.5,onUpdate:n=>{e.uniforms.uColorReveal.value=n}})),this._revealTweens=[];for(let n=1;n<this._panels.length;n++)this._revealTweens.push({mesh:this._panels[n].mesh,elapsed:-(n*.1),duration:.45})}onUnfocus(){if(this._isFocused=!1,this.arrowPrev.visible=!1,this.arrowNext.visible=!1,this._clickables)for(const s of[...this._panelHitboxes,this.arrowPrev,this.arrowNext]){const a=this._clickables.indexOf(s);a!==-1&&this._clickables.splice(a,1)}this._revealTweens=[],this._rotTween=null,this._isExiting=!0,this._exitFadeTweens=[];for(let s=1;s<this._panels.length;s++){const{mesh:a,material:o}=this._panels[s];if(!a.visible||o.opacity<=0){o.opacity=0,a.visible=!1;continue}this._exitFadeTweens.push({mesh:a,material:o,elapsed:0,duration:.4,startOpacity:o.opacity})}const e=2*Math.PI,t=Math.round(this._currentAngle/e)*e,n=Math.abs(t-this._currentAngle),i=Math.max(.45,n*.55);this._exitSpinTween=Sn({from:this._currentAngle,to:t,duration:i,onUpdate:s=>{this._currentAngle=s,this.ring.rotation.y=s},onDone:()=>this._finishExit()})}_finishExit(){this._isExiting=!1,this._exitSpinTween=null,this._exitFadeTweens=[];for(let e=1;e<this._panels.length;e++){const{mesh:t,material:n}=this._panels[e];n.opacity=0,t.visible=!1}this.activeIndex=0,this._currentAngle=0,this._targetAngle=0,this.ring.rotation.y=0,this.hitbox.userData.artworkInfo=es(this.artworkInfo,this._imageDefs[0].artworkInfo),this.hitbox.visible=!0}_cancelExit(){this._isExiting=!1,this._exitSpinTween=null,this._exitFadeTweens=[],this.hitbox.visible=!1}onMiss(){return!1}onNav(e){const t=this._panels.length;if(t<=1)return null;const n=((this.activeIndex+e)%t+t)%t;this._rotateByDelta(e),this.activeIndex=n;const i=es(this.artworkInfo,this._imageDefs[n].artworkInfo);return this.hitbox.userData.artworkInfo=i,{consumed:!0,artworkInfo:i}}onHit(e){if(e===this.arrowPrev)return this.onNav(1);if(e===this.arrowNext)return this.onNav(-1);const t=this._panelHitboxes.indexOf(e);if(t!==-1){this._rotateToIndex(t),this.activeIndex=t;const n=es(this.artworkInfo,this._imageDefs[t].artworkInfo);return this.hitbox.userData.artworkInfo=n,{consumed:!0,artworkInfo:n}}return!1}update(e){this._rotTween&&(this._rotTween.update(e),this._rotTween.done&&(this._rotTween=null)),this._colorTween&&(this._colorTween.update(e),this._colorTween.done&&(this._colorTween=null));for(let t=this._revealTweens.length-1;t>=0;t--){const n=this._revealTweens[t];if(n.elapsed+=e,n.elapsed<0)continue;n.mesh.visible||(n.mesh.visible=!0);const i=Fl(Ol(n.elapsed/n.duration));n.mesh.material.opacity=i,n.elapsed>=n.duration&&(n.mesh.material.opacity=1,this._revealTweens.splice(t,1))}for(let t=this._exitFadeTweens.length-1;t>=0;t--){const n=this._exitFadeTweens[t];n.elapsed+=e;const i=Fl(Ol(n.elapsed/n.duration));n.material.opacity=n.startOpacity*(1-i),n.elapsed>=n.duration&&(n.material.opacity=0,n.mesh.visible=!1,this._exitFadeTweens.splice(t,1))}if(this._exitSpinTween){const t=this._exitSpinTween;t.update(e),t.done&&(this._exitSpinTween=null)}}_bakeFocusPose(){this.root.updateWorldMatrix(!0,!1);const e=new C;this.root.getWorldPosition(e);const t=new rt;this.root.getWorldQuaternion(t);const n=new C(0,0,1).applyQuaternion(t),i=e.clone().addScaledVector(n,.3),s=e.clone().addScaledVector(n,this._radius),a=new Ue().lookAt(i,s,Z0),o=new rt().setFromRotationMatrix(a);this.hitbox.userData.focusPose={position:i,quaternion:o,duration:.9}}_rotateByDelta(e,t=.6){const n=2*Math.PI/this._panels.length,i=this._targetAngle-e*n;this._targetAngle=i,this._rotTween=Sn({from:this._currentAngle,to:i,duration:t,onUpdate:s=>{this._currentAngle=s,this.ring.rotation.y=s}})}_rotateToIndex(e,t=.6){const n=this._panels.length,i=2*Math.PI/n;let s=((e-this.activeIndex)%n+n)%n;s>n/2&&(s-=n);const a=this._targetAngle-s*i;this._targetAngle=a,this._rotTween=Sn({from:this._currentAngle,to:a,duration:t,onUpdate:o=>{this._currentAngle=o,this.ring.rotation.y=o}})}}function J0(r,e){return r>e?new Se(1,e/r):new Se(r/e,1)}function Q0(r,e,t){if(e>t){const n=t/e;r.repeat.set(n,1),r.offset.set((1-n)/2,0)}else{const n=e/t;r.repeat.set(1,n),r.offset.set(0,(1-n)/2)}r.needsUpdate=!0}function kl(r){const t=document.createElement("canvas");t.width=t.height=128;const n=t.getContext("2d");n.font="bold 96px sans-serif",n.fillStyle="#ffffff",n.textAlign="center",n.textBaseline="middle",n.fillText(r,128/2,128/2+4);const i=new ht({map:new Vi(t),transparent:!0,depthTest:!1,side:Nt});return new Xe(new Ut(.5,.5),i)}const Vs=(r,e)=>({...r,...e??{}});function ev(r){const t=document.createElement("canvas");t.width=t.height=128;const n=t.getContext("2d");return n.font="bold 96px sans-serif",n.fillStyle="#ffffff",n.textAlign="center",n.textBaseline="middle",n.fillText(r,128/2,128/2+4),new Vi(t)}class Kr{constructor({scene:e,models:t=[],artworkInfo:n={},entryPosition:i=null,entryHitboxSize:s=[3,2.5,3],arrowOffset:a=1.5,arrowHeight:o=0,arrowSize:l=.5,debugOn:c=!1}){this.scene=e,this._modelDefs=t,this.artworkInfo=n,this._entryPos=i,this._entrySize=s,this._arrowOffset=a,this._arrowHeight=o,this._arrowSize=l,this._debugOn=c,this.root=new Jt,e.add(this.root),this.hitbox=null,this._models=[],this.modelHitboxes=[],this._arrowPrev=null,this._arrowNext=null,this._clickables=null,this.activeIndex=0,this._isFocused=!1,this._camera=null}async load(){var l,c,h;const e=this._modelDefs;if(!e.length)return this;const t=Math.PI/180,n=await Promise.all(e.map(u=>rr(u.url)));for(let u=0;u<e.length;u++){const d=e[u],{scene:p,animations:_}=n[u];Array.isArray(d.scale)?p.scale.set(...d.scale):d.scale!=null&&p.scale.setScalar(d.scale),typeof d.normalizeTo=="number"&&this._normalizeToSize(p,d.normalizeTo);const v=d.position??[0,0,0],m=d.rotation??[0,0,0];p.position.set(...v),p.rotation.set(m[0]*t,m[1]*t,m[2]*t),p.userData.baseQuaternion=p.quaternion.clone(),p.userData.isModel=!0,this.scene.add(p),p.updateWorldMatrix(!0,!0);let f=null;const S=d.playAnimation;if(_!=null&&_.length&&S){if(f=new Ia(p),S==="all")for(const N of _)f.clipAction(N).play();else{const N=S==="first"?_[0]:_.find(B=>B.name===S)??_[0];f.clipAction(N).play()}f.update(0),f.timeScale=0}const x=new Rt().setFromObject(p),T=x.getCenter(new C),L=x.getSize(new C),[A,b,D]=d.hitboxSize??[Math.max(.3,L.x*1.25),Math.max(.3,L.y*1.25),Math.max(.3,L.z*1.25)],g=new Xe(new dt(A,b,D),new ht({color:43775,wireframe:!0,visible:this._debugOn}));g.position.copy(T),g.quaternion.copy(p.quaternion),g.userData.galleryModelIndex=u,g.userData.artworkInfo=Vs(this.artworkInfo,d.artworkInfo),g.userData.experienceOwner=this,g.userData.modelRoot=p,this.scene.add(g),this.modelHitboxes.push(g),p.traverse(N=>{N.userData.experienceOwner=this});const y=new jt;x.getBoundingSphere(y),this._models.push({root:p,hitbox:g,mixer:f,artworkInfo:Vs(this.artworkInfo,d.artworkInfo),center:T.clone(),halfRadius:y.radius})}const i=this._entryPos??((l=e[0])==null?void 0:l.position)??[0,0,0],[s,a,o]=this._entrySize;return this.hitbox=new Xe(new dt(s,a,o),new ht({color:16746496,wireframe:!0,visible:this._debugOn})),this.hitbox.position.set(...i),this.hitbox.userData.artworkInfo=Vs(this.artworkInfo,(c=this._models[0])==null?void 0:c.artworkInfo),this.hitbox.userData.focusTarget=((h=this._models[0])==null?void 0:h.hitbox)??this.root,this.hitbox.userData.experienceOwner=this,this.scene.add(this.hitbox),this._arrowPrev=this._buildArrow("prev"),this._arrowNext=this._buildArrow("next"),this._arrowPrev.visible=!1,this._arrowNext.visible=!1,this.scene.add(this._arrowPrev),this.scene.add(this._arrowNext),this}onFocus(e){this._isFocused=!0,this._camera=e,this.hitbox.visible=!1;const t=this._models[this.activeIndex];t!=null&&t.mixer&&(t.mixer.timeScale=1),this._arrowPrev.visible=!0,this._arrowNext.visible=!0,this._clickables&&(this._clickables.includes(this._arrowPrev)||this._clickables.push(this._arrowPrev),this._clickables.includes(this._arrowNext)||this._clickables.push(this._arrowNext)),this._updateArrows()}onUnfocus(){var e,t;this._isFocused=!1,this.hitbox.visible=!0;for(const n of this._models)n!=null&&n.mixer&&(n.mixer.timeScale=0);this._arrowPrev.visible=!1,this._arrowNext.visible=!1,this._clickables&&(this._removeFrom(this._clickables,this._arrowPrev),this._removeFrom(this._clickables,this._arrowNext)),this.activeIndex=0,this.hitbox.userData.focusTarget=((e=this._models[0])==null?void 0:e.hitbox)??this.root,this.hitbox.userData.artworkInfo=Vs(this.artworkInfo,(t=this._models[0])==null?void 0:t.artworkInfo)}onMiss(){return!1}onNav(e){return this._goTo(this.activeIndex+e)}onHit(e){const t=e.userData.galleryArrow;if(t==="prev")return this._goTo(this.activeIndex-1);if(t==="next")return this._goTo(this.activeIndex+1);const n=e.userData.galleryModelIndex;return n!==void 0?this._goTo(n):!1}onDrag(e){const t=this._models[this.activeIndex];t&&t.root.rotateY(e*.007)}update(e){if(!this._isFocused)return;const t=this._models[this.activeIndex];t!=null&&t.mixer&&t.mixer.update(e),this._updateArrows()}_goTo(e){const t=this._models.length;if(!t)return null;const n=this._models[this.activeIndex];n!=null&&n.mixer&&(n.mixer.timeScale=0),this.activeIndex=(e%t+t)%t;const i=this._models[this.activeIndex];return i!=null&&i.mixer&&(i.mixer.timeScale=1),{consumed:!0,focusTarget:i.hitbox,artworkInfo:i.artworkInfo}}_updateArrows(){if(!this._camera)return;const e=this._models[this.activeIndex];if(!e)return;const t=new C(1,0,0).applyQuaternion(this._camera.quaternion),n=e.halfRadius+this._arrowOffset,i=e.center.clone();i.y+=this._arrowHeight,this._arrowPrev.position.copy(i).addScaledVector(t,-n),this._arrowNext.position.copy(i).addScaledVector(t,n);const s=this._camera.position;this._arrowPrev.lookAt(s),this._arrowNext.lookAt(s)}_buildArrow(e){const t=e==="prev"?"‹":"›",n=new Xe(new Ut(this._arrowSize,this._arrowSize),new ht({map:ev(t),transparent:!0,depthTest:!1,side:Nt}));return n.userData.galleryArrow=e,n.userData.experienceOwner=this,n}_removeFrom(e,t){const n=e.indexOf(t);n!==-1&&e.splice(n,1)}_normalizeToSize(e,t){const n=new Rt().setFromObject(e),i=n.getSize(new C),s=Math.max(i.x,i.y,i.z)||1,a=n.getCenter(new C);e.position.sub(a),e.scale.multiplyScalar(t/s),e.updateMatrixWorld(!0)}}class tv{constructor({scene:e,camera:t,renderer:n,sizes:i,debugOn:s=!1,isMobile:a=!1}){var le,pe;this.scene=e,this.camera=t,this.renderer=n,this.sizes=i,this._debug=s,this.isMobile=a,this.controls=new B0({camera:this.camera,domElement:this.renderer.domElement,autoRotate:!0,autoRotateSpeed:-.05}),this.focus=new V0({camera:this.camera}),this._artworkRegistry=[],this._currentArtworkIndex=-1,this.infoPanel=new $0({onClose:()=>{var G,se;return(se=(G=this.screenManager).onMiss)==null?void 0:se.call(G)},onNav:G=>this._navigateArtwork(G),onJumpTo:G=>this._navigateToIndex(G)}),this._carouselPrevBtn=document.getElementById("carousel-prev"),this._carouselNextBtn=document.getElementById("carousel-next"),(le=this._carouselPrevBtn)==null||le.addEventListener("click",()=>this._handleCarouselNav(-1)),(pe=this._carouselNextBtn)==null||pe.addEventListener("click",()=>this._handleCarouselNav(1)),this._controlsSaved=null,this._focusState="idle",this._focusCooldown=0,this._focusedExperience=null,this._exitingExperience=null,this._focusedScreen=null,this._focusedHitbox=null,this._lastfocusedScreen=null,this._lastRevealedScreen=null,this._activeNarration=null,this.autoplayNarration=!0,this._tweens=[],this._currentLocation="lobby",this._pendingLocation=null,this._pendingFocusIndex=null,this.proximityReveal=new jg,this._loadingPromises=[],this._seenArtworkIndices=new Set,this._locationRevealZones={},this._completedLocations=new Set,this._envMeshes=[],this._envRay=new Ic,this._lastNDC=new Se,this._mouseRevealDirty=!1,this._lastMouseRevealPos=null,this._modelDrag=null,this._swipeStartX=0,this._swipeStartY=0,this.renderer.domElement.addEventListener("pointerdown",G=>{var se,he,O;if(this._lastNDC.set(G.clientX/this.sizes.width*2-1,-(G.clientY/this.sizes.height)*2+1),this._swipeStartX=G.clientX,this._swipeStartY=G.clientY,this._focusState==="focused")if((se=this._focusedExperience)!=null&&se.onDrag)this._modelDrag={lastX:G.clientX,modelRoot:null};else{const xe=(O=(he=this._focusedScreen)==null?void 0:he.userData)==null?void 0:O.modelRoot;xe&&(this._modelDrag={lastX:G.clientX,modelRoot:xe})}}),this.renderer.domElement.addEventListener("pointermove",G=>{var se;if(this._lastNDC.set(G.clientX/this.sizes.width*2-1,-(G.clientY/this.sizes.height)*2+1),this._mouseRevealDirty=!0,this._modelDrag){const he=G.clientX-this._modelDrag.lastX;(se=this._focusedExperience)!=null&&se.onDrag?this._focusedExperience.onDrag(he):this._modelDrag.modelRoot&&(this._modelDrag.modelRoot.rotateY(he*.007),this.renderer.shadowMap.needsUpdate=!0),this._modelDrag.lastX=G.clientX}}),this.renderer.domElement.addEventListener("pointerup",G=>{var se,he,O;if(this._modelDrag=null,this._focusState==="focused"){const xe=G.clientX-this._swipeStartX,_e=G.clientY-this._swipeStartY;if(Math.abs(xe)>=30&&Math.abs(xe)>Math.abs(_e)){const be=(he=(se=this._focusedScreen)==null?void 0:se.userData)==null?void 0:he.contentCarousel;if(be){xe<0?be.next():be.prev();return}if((O=this._focusedExperience)!=null&&O.onNav){const ce=this._focusedExperience.onNav(xe<0?1:-1);ce!=null&&ce.artworkInfo&&this.infoPanel.show(ce.artworkInfo)}}}},{passive:!0}),this.screenManager=new O0({scene:this.scene,camera:this.camera,renderer:this.renderer,domElement:this.renderer.domElement,makeTextPlane:k0,debugOn:this._debug,isMobile:this.isMobile}),this.screenManager.onHit=G=>{var he,O;if(this.locations.isMoving)return;if(this._focusedExperience){const xe=(O=(he=this._focusedExperience).onHit)==null?void 0:O.call(he,G);if(xe===!0)return;if(xe!=null&&xe.consumed){xe.focusTarget&&this.focus.focusOn({targetObject:xe.focusTarget,distance:"fit",duration:.6,padding:1}),xe.artworkInfo&&this.infoPanel.show(xe.artworkInfo);return}}const se=G.userData.focusTarget||G;if(this._focusState==="focused"&&this._focusedScreen===se){const xe=G.userData.video;xe&&(xe.paused?xe.play().catch(()=>{}):xe.pause());return}this._focusOnObj(G)},this.screenManager.onMiss=()=>{var O,xe,_e,be,ce;if(this._focusState==="idle"){this._doEnvTapReveal();return}if(this._focusCooldown>0||this.focus.isMoving||this._focusState==="idle")return;if(this._focusedExperience){const Pe=(xe=(O=this._focusedExperience).onMiss)==null?void 0:xe.call(O);if(Pe===!0||Pe!=null&&Pe.consumed){Pe!=null&&Pe.focusTarget&&this.focus.focusOn({targetObject:Pe.focusTarget,distance:"fit",duration:.6,padding:1.5}),Pe!=null&&Pe.artworkInfo?this.infoPanel.show(Pe.artworkInfo):this.infoPanel.hide();return}}const G=this._focusedExperience;this._restoreExperienceHitbox(G),G==null||G.onUnfocus(),this._focusedExperience=null,G!=null&&G._isExiting&&(this._exitingExperience=G),this._focusState="returning",this._focusCooldown=.2;const se=(be=(_e=this._focusedScreen)==null?void 0:_e.userData)==null?void 0:be.modelRoot;if((ce=se==null?void 0:se.userData)!=null&&ce.baseQuaternion){const Pe=se.quaternion.clone(),Ie=se.userData.baseQuaternion.clone();this._tweens.push(Sn({from:0,to:1,duration:.5,onUpdate:w=>se.quaternion.slerpQuaternions(Pe,Ie,w)}))}this.focus.returnHome(.7),this.screenManager.deactivateVideo(this._focusedScreen),this.screenManager.setActiveFluids(null),this._deactivateNarration(),this.infoPanel.hide(),this.infoPanel.hideVideoControls(),this.infoPanel.hideAudioControls(),this._setCarouselButtons(!1),this._animateReveal(this._focusedScreen,0,1,.3),this._animateReveal(this._lastRevealedScreen,0,1,.3);const he=this._resolveExperienceChildren(this._focusedHitbox,this._focusedScreen);if(he)for(const Pe of he)this._animateExperienceChild(Pe,!1);this._focusedScreen=null,this._focusedHitbox=null,this._lastRevealedScreen=null},this.locations=new Y0({camera:this.camera}),this.locations.setLocations({lobby:{camera:{pos:[0,.8,0],lookAt:[0,.8,-1]}},WestPavillion:{camera:{pos:[-34,.8,-22.4],lookAt:[-36,.8,-24]}},EagleBar:{camera:{pos:[1,23,12.8],lookAt:[1,23,12]}},winners:{camera:{pos:[0,.8,0],lookAt:[0,0,-1]}}}),this.locations.goTo("lobby",{duration:.01}),this.locations.setPathBidirectional("lobby","EagleBar",[{pos:[0,10,0],lookAt:[0,23,0]},{pos:[0,23,0],lookAt:[10,23,0]},{pos:[10,23,0],lookAt:[10,23,3.2]},{pos:[10,23,3.2],lookAt:[1,23,12.8]},{pos:[7,23,4],lookAt:[1,23,12.8]}],{duration:5,distanceWeighted:!0}),this.locations.setPathBidirectional("lobby","WestPavillion",[{pos:[3,.8,-8],lookAt:[-10,.8,-15]},{pos:[-10,.8,-15],lookAt:[-12,.8,-18]},{pos:[-12,.8,-18],lookAt:[-28,.8,-18]},{pos:[-28,.8,-18],lookAt:[-30,.8,-20]}],{duration:5,distanceWeighted:!0}),this.locations.setPathBidirectional("WestPavillion","EagleBar",[{pos:[-28,.8,-18],lookAt:[-15,.8,-15]},{pos:[-12,.8,-18],lookAt:[-28,.8,-18]},{pos:[-10,.8,-15],lookAt:[-12,.8,-18]},{pos:[3,.8,-8],lookAt:[-10,.8,-15]},{pos:[0,10,0],lookAt:[0,23,0]},{pos:[0,23,0],lookAt:[10,23,0]},{pos:[10,23,0],lookAt:[10,23,3.2]},{pos:[10,23,3.2],lookAt:[1,23,12.8]},{pos:[7,23,4],lookAt:[1,23,12.8]}],{duration:8,distanceWeighted:!0}),this.setLocationRevealZone("lobby",{center:[0,4,0],radius:25}),this.setLocationRevealZone("WestPavillion",{center:[-34,.8,-22.4],radius:18}),this.setLocationRevealZone("EagleBar",{center:[1,23,12.8],radius:18}),document.addEventListener("keydown",G=>{G.key==="ArrowLeft"&&this._navigateArtwork(-1),G.key==="ArrowRight"&&this._navigateArtwork(1)}),Yg(this.scene);const o=new Xe(new dt(30,1,30),new Qt({color:1081472,side:2}));o.position.set(0,-1.5,0),o.receiveShadow=!0;const l=Xg(this.proximityReveal,{color:8421504,side:2});o.material=l;const c=new Qt({color:8421504,side:2}),h=.5,u=6,d=30,p=[new dt(h,u,d*2),new dt(h,u,d*2),new dt(d*2,u,h),new dt(d*2,u,h)],_=[[-d-h/2,u/2-1.5,0],[d+h/2,u/2-1.5,0],[0,u/2-1.5,-d-h/2],[0,u/2-1.5,d+h/2]];for(let G=0;G<p.length;G++){const se=new Xe(p[G],c);se.position.set(..._[G]),se.receiveShadow=!0}const v=new Xe(new dt(1,1,1),new Qt({roughness:.4,metalness:.1}));v.position.set(0,0,-3),v.castShadow=!0,this.ball=v;const m=(G,se=8388608)=>rr(G).then(he=>{const O=he.scene;O.traverse(xe=>{if(xe.isMesh){if(xe.material.isMeshBasicMaterial){const _e=xe.material;xe.material=new Qt({map:_e.map,side:_e.side,roughness:1,metalness:0}),_e.dispose()}xe.material.envMapIntensity=1,xe.receiveShadow=!0,qg(xe.material,this.proximityReveal),this._envMeshes.push(xe)}}),O.scale.set(1,1,1),O.position.set(0,-4,16),this.scene.add(O)}).catch(console.error),f="/CRxUAL-Virtual-Exhibiton-2026/",S=m(f+"art/Building/Chancery Rosewood_LOBBY_BAKE_V4.glb"),x=m(f+"art/Building/Chancery Rosewood_LOBBY_FURNITURE_BAKE_V5.glb"),T=m(f+"art/Building/Chancery Rosewood_Pavilion_BAKE_V4.glb"),L=m(f+"art/Building/Chancery Rosewood_EagleBar_V1.glb"),A=m(f+"art/Building/Chancery Rosewood_Pavillion_FURNITURE_BAKE_V4.glb"),b=m(f+"art/Building/Chancery Rosewood_Bar_FURNITURE_BAKE_V4.glb"),D=m(f+"art/Building/Chancery Rosewood_Bar_OutsideFURNITURE_BAKE_V4.glb");m(f+"art/Building/Chancery Rosewood_Bar_bottles_BAKE_V4.glb"),this._loadingPromises.push(Promise.allSettled([S,x,T,L,A,b,D]).then(()=>{this.renderer.shadowMap.needsUpdate=!0})),q0({renderer:this.renderer,scene:this.scene,url:"/CRxUAL-Virtual-Exhibiton-2026/art/hdri/qwantani_dusk_2_puresky_4k Medium.jpeg",background:!0,envIntensity:1});const g="/CRxUAL-Virtual-Exhibiton-2026/";this._registerArtwork(this.screenManager.addScreen({url:`${g}art/birdcage_jichu zhang/IMG_1571-1.jpeg`,width:2,height:1.85,position:[0,1.6,-6],rotation:[0,0,0],clickable:!0,offsetClick:.1,clickableSize:[2,2],text:"",plinthVisible:!1,location:"lobby",artworkInfo:{title:"birdcage",artist:"Jichu Zhang",description:"My paintings are spaces of suspended narration, where the relationship between people and their surroundings is never fixed, but constantly shifting — between intimacy and distance, memory and control. Inspired by familial experiences, everyday interpersonal patterns, and the lingering structures of myth, I seek to construct visual environments that do not illustrate stories, but evoke atmospheres — spaces where something is felt before it is understood. Visually, my compositions follow drifting, current-like rhythms — inspired by the unseen movement of oceanic flows, as a way to mirror the subtle undercurrents of perception and emotional experience.",link:"https://ualshowcase.arts.ac.uk/@zhangjichu",narration:`${g}audio/birdcage_Narration.mp3`,narrationCues:`${g}audio/birdcage_Narration.json`},onClick:G=>{console.log("Clicked screen/podium",G)}}));const y=new ts({scene:this.scene,position:[-7.1,.7,1.55],rotation:[0,315,0],panelWidth:1.4,panelHeight:1.8,revealMap:this.screenManager._revealTex,debugOn:this._debug,artworkInfo:{title:"Unrendered",artist:"Marie-Lisette Cropp",description:"Unrendered explores how the female body is represented and reshaped through technology and Western cultural expectations. The project examines the tension between the physical and the digital, and how images shape our understanding of identity and beauty. Using photogrammetry, the body is scanned into digital form, fragmenting in the process and celebrating these glitches and distortions. By reworking these scans by hand and through darkroom printing, the work restores a raw, physical presence. Inspired by Rosi Braidotti's Posthuman theory, Unrendered views the body as part of a wider ecosystem, continuously shaped by machines, nature, and technology.",link:"https://ualshowcase.arts.ac.uk/@marielisette",narration:`${g}audio/Unrendered_Narration.mp3`,narrationCues:`${g}audio/Unrendered_Narration.json`},images:[{url:`${g}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-2-1.jpg.avif`},{url:`${g}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-3-2.jpg`},{url:`${g}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-3-3.jpg`},{url:`${g}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-4.jpg`},{url:`${g}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-5-4.jpg`},{url:`${g}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-5-5.jpg`},{url:`${g}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-6-2.jpg`}]});this._loadingPromises.push(y.load().then(()=>{y.hitbox.userData.location="lobby",this._registerExperience(y),y._clickables=this.screenManager.clickables}).catch(console.error));const N=this.screenManager.addScreen({url:"https://pub-866c71617b57495a9adcc2fe87aaff0e.r2.dev/film/Invocation%20of%20the%20Black%20flame_MB.mp4",poster:`${g}art/TheNoos-SanneWinderickx/IMG_4879-final-sRGB_Ratio-HQ-landscape-fill-1_1.jpg`,width:2.8,height:1.8,position:[-4.8,23,16],rotation:[0,110,0],clickable:!0,offsetClick:0,text:"Video Screen",location:"EagleBar",artworkInfo:{title:"The Noös-∞",artist:"Sanne Winderickx",description:"The Noös-∞ is a perceptual system and cosmology combining sonic prosthetics, kinaesthetic movement, and narrative design to shift how depression is sensed and understood. It is not a cure, but a method of transmutation—where melancholy is an altered state. At its core are a prosthetic limb and sonic wand, registering sound, gesture, and rhythm to generate live sensory feedback through slow synchrony with self and other.",link:"https://ualshowcase.arts.ac.uk/@kinaestheticalchemy"},plinthVisible:!1,onClick:G=>{console.log("Clicked screen/podium",G)}});this._registerArtwork(N),this._loadingPromises.push(this.screenManager.addModel({url:`${g}art/TheNoos-SanneWinderickx/TheNoos_yellowHand.glb`,position:[-4.3,22.3,18],rotation:[0,100,0],normalizeTo:.8,clickable:!1,text:"",textOffset:[0,-.1,.9],hitboxSize:[1.8,1.5,1.8],offsetClick:.2,plinthVisible:!0,plinthOffset:[0,-.5,0],plinthSize:[1,.5,1],location:"EagleBar"}).then(G=>{(N.userData.hitBox??N).userData.experienceChildren=[G]}).catch(console.error));const B=new ts({scene:this.scene,position:[7.1,.7,1.4],rotation:[0,45,0],panelWidth:1.4,panelHeight:1.8,revealMap:this.screenManager._revealTex,debugOn:this._debug,artworkInfo:{title:"Whimsy Through The Window",artist:"Sarah Abdi",description:"My final collection centres around whimsy from nostalgic childhood media. I chose this theme as I believe small forms of escapism is essential, especially when we live in such unstable times; from the rise of fascism to feeling the effects of climate change. Its important maintain a balance to avoid burnout and actually be able to help others. I created woven samples intended as curtains/drapes to block out the grey and dreary London landscape, made from waste and deadstock materials.",link:"https://ualshowcase.arts.ac.uk/@sazweaves",narration:`${g}audio/Whimsy_Narration.mp3`,narrationCues:`${g}audio/Whimsy_Narration.json`},images:[{url:`${g}art/WhimsyThroughTheWindow_SarahAbdi/20250530_193358.jpg`},{url:`${g}art/WhimsyThroughTheWindow_SarahAbdi/20250530_193601-1.jpg`},{url:`${g}art/WhimsyThroughTheWindow_SarahAbdi/20250530_193031-rotated.jpg`},{url:`${g}art/WhimsyThroughTheWindow_SarahAbdi/20250510_104607.jpg`}]});this._loadingPromises.push(B.load().then(()=>{B.hitbox.userData.location="lobby",this._registerExperience(B),B._clickables=this.screenManager.clickables}).catch(console.error)),this._loadingPromises.push(this.screenManager.addModel({url:"/CRxUAL-Virtual-Exhibiton-2026/art/Experimentn58-2PositioninSpace_MarieSaintYves/Eperiment58.glb",position:[0,.3,8.5],rotation:[0,-35,0],normalizeTo:2.2,clickable:!0,onClick:(G,se)=>console.log("Model clicked:",G),textOffset:[0,-.1,.9],hitboxSize:[1.8,1.5,1.8],offsetClick:.2,plinthVisible:!1,playAnimation:"first",location:"lobby",artworkInfo:{title:"Experiment n°58-2: Position in Space",artist:"Marie Saint-Yves",description:"An exploration of space, physical forces of the Earth and the theory of material agency. Binding air and helium with low materials (surival blankets, salvaged sack trolley, nylon thread), I aimed to challenge our perception of the World via a contrasting piece, engaging viewers' personal sensory experience while inviting them to take a step back from their daily lives. Interested in leaving work open to individual interpretations, I wonder: What's yours?",narration:`${g}audio/Exploration-n58_Narration.mp3`,narrationCues:`${g}audio/Exploration-n58_Narration.json`}}).then(G=>{this.statue=G,this._registerArtwork(G)}).catch(console.error)),this._registerArtwork(this.screenManager.addScreen({url:"https://pub-866c71617b57495a9adcc2fe87aaff0e.r2.dev/film/No%20Longer%20Us_MB.mp4",poster:`${g}art/NoLongerUs_JunShya/Jun-Shya-1-1.jpg`,width:2,height:2.25,position:[8.4,1.1,-1.5],rotation:[0,-90,0],clickable:!0,offsetClick:0,clickableSize:[2.2,2.2],location:"lobby",artworkInfo:{title:"No Longer Us",artist:"Jun Shya",description:"By putting a mask on, we begin to play different versions of ourselves. Intrigued by the process of unbalancing composition through distinct colours, crackled textures, and seemingly incongruous references, this series of paintings explores the theme of reality versus illusion in relation to the coexistence of present and past. By capturing the intimate gesture of push and pull in a ballet performance, each dancer becomes a version of another. It reflects the idea that a different version of you exists in the mind of everyone who knows you. Curious images emerge through a process of patient layering and excavation. Parts of the human body and face are either left blank or slightly concealed, yet we, as viewers, are still able to make sense of them.",link:"https://ualshowcase.arts.ac.uk/project/638926/cover",narration:`${g}audio/NoLongerUs_Narration.mp3`,narrationCues:`${g}audio/NoLongerUs_Narration.json`},plinthVisible:!1,onClick:G=>{console.log("Clicked screen/podium",G)}}));const R=new Ul({scene:this.scene,position:[-34.2,.5,-15.8],rotation:[0,180,0],radius:1,normalizeTo:1,debugOn:this._debug,artworkInfo:{title:"3D Works",artist:"Genevieve Carr",description:"Nailed transforms nail salon waste into a 3D printing filament, used to create sculptural nails inspired by botanical drawings. The project explores beauty, waste, and material reuse—reimagining synthetic leftovers as future design materials.",link:"https://ualshowcase.arts.ac.uk/@genevievefkcarr",narration:`${g}audio/Nailed_Narration.mp3`,narrationCues:`${g}audio/Nailed_Narration.json`},models:[{url:`${g}art/Nailed_Genevieve Carr/3D/5Hole_Decimate.glb`,playAnimation:"first",artworkInfo:{title:"5 Hole",artist:"Genevieve Carr"}},{url:`${g}art/Nailed_Genevieve Carr/3D/Bone_Decimate.glb`,playAnimation:"first",artworkInfo:{title:"3D Bone",artist:"Genevieve Carr"}},{url:`${g}art/Nailed_Genevieve Carr/3D/Hmmnotsure_Decimate.glb`,playAnimation:"all",artworkInfo:{title:"Hmm... Not Sure",artist:"Genevieve Carr"}},{url:`${g}art/Nailed_Genevieve Carr/3D/lotsofholes_Decimate.glb`,playAnimation:"all",artworkInfo:{title:"Lots of Holes",artist:"Genevieve Carr"}},{url:`${g}art/Nailed_Genevieve Carr/3D/PointBall_Decimate.glb`,playAnimation:"all",artworkInfo:{title:"Point Ball",artist:"Genevieve Carr"}},{url:`${g}art/Nailed_Genevieve Carr/3D/TroPhobia_Decimate.glb`,playAnimation:"all",artworkInfo:{title:"TroPhobia",artist:"Genevieve Carr"}}]});this._loadingPromises.push(R.load().then(()=>{R.hitbox.userData.location="WestPavillion",this._registerExperience(R),R._clickables=this.screenManager.clickables}).catch(console.error));const I=new ts({scene:this.scene,position:[-8.4,.8,-1.4],rotation:[0,-90,0],radius:3.5,panelWidth:2.2,panelHeight:1.8,revealMap:this.screenManager._revealTex,debugOn:this._debug,artworkInfo:{title:"Self-Finish",artist:"Beatrice El Asmar",description:"This series of self-portraits was created using slit scan technology, mostly known for its use for photo-finish in racing sports, thus reclaiming a patriarchal automation which judges, measures and commodifies linear speed and 'progress'. Subverting our expectations of how time and space occupy the photographic image, the work highlights how the supposedly linear progression of human rights, especially for cis and trans women, is being eroded to the extent that it is actually moving backwards. A fragmented portrait of one of the two female photo-finish operators in the UK, this work invites a different kind of embodied photographic seeing.",link:"https://ualshowcase.arts.ac.uk/project/682951/cover",narration:`${g}audio/Self-Finish_Narration.mp3`,narrationCues:`${g}audio/Self-Finish_Narration.json`},images:[{url:`${g}art/SelfFinish_BeatriceElAsmar/SF_02.jpg.avif`},{url:`${g}art/SelfFinish_BeatriceElAsmar/SF-01.jpg`},{url:`${g}art/SelfFinish_BeatriceElAsmar/SF_03.jpg`},{url:`${g}art/SelfFinish_BeatriceElAsmar/SF_04.jpg`},{url:`${g}art/SelfFinish_BeatriceElAsmar/SF_08.jpg`}]});this._loadingPromises.push(I.load().then(()=>{I.hitbox.userData.location="lobby",this._registerExperience(I),I._clickables=this.screenManager.clickables}).catch(console.error));const U=new Ul({scene:this.scene,position:[-28.2,.5,-17],rotation:[0,180,0],radius:1.5,normalizeTo:.6,debugOn:this._debug,materialOverride:{color:13158600,metalness:1,roughness:.15,envMapIntensity:1.5},artworkInfo:{title:"EMBODIED",artist:"Veepra Mishra",description:"It began with the slightest gesture: my mother hiding her cane behind her back every time a camera appeared, as if the object were never meant to speak for her. This project turns toward that silence and wonders how assistive devices might become sites of cultural expression rather than symbols of concealment. In the realm of assistive design and fashion, such moments reveal how deeply aesthetics and embodiment intertwine, particularly for disabled people of colour whose identities are shaped through layered histories of visibility and belonging. Guided by co-design conversations with two South Asian participants and informed by critical disabilities, material culture, and cultural symbolism, I developed usable prototypes that merge function with cultural resonance. These artefacts, rooted in traditions, memory, agency, and empowerment, ask what happens when assistive devices are culturally expressive artefacts that hold beauty, heritage, and emotional truth. The work demonstrates that when disabled people of colour shape the instruments that support them, assistive devices shift from clinical symbols into objects of affirmation and pride. The process illuminated both the challenges and possibilities of designing across distance, culture, and lived experience. It reveals how identity and functionality are inseparable. Ultimately, the project suggests that inclusive futures emerge when design listens closely, honours complexity, and treats assistive devices not as objects that should be hidden, but as sites of beauty, cultural identity, and empowerment.",link:"https://ualshowcase.arts.ac.uk/@veepramishra",narration:`${g}audio/Embodied_Narration.mp3`,narrationCues:`${g}audio/Embodied_Narration.json`},models:[{url:`${g}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-01.glb`,artworkInfo:{title:"Ear Study 01",artist:"Veepra Mishra"}},{url:`${g}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-02.glb`,artworkInfo:{title:"Ear Study 02",artist:"Veepra Mishra"}},{url:`${g}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-03.glb`,artworkInfo:{title:"Ear Study 03",artist:"Veepra Mishra"}},{url:`${g}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-04.glb`,artworkInfo:{title:"Ear Study 04",artist:"Veepra Mishra"}},{url:`${g}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-05.glb`,artworkInfo:{title:"Ear Study 05",artist:"Veepra Mishra"}},{url:`${g}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-06.glb`,artworkInfo:{title:"Ear Study 06",artist:"Veepra Mishra"}},{url:`${g}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-07.glb`,artworkInfo:{title:"Ear Study 07",artist:"Veepra Mishra"}},{url:`${g}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-08.glb`,artworkInfo:{title:"Ear Study 08",artist:"Veepra Mishra"}},{url:`${g}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-09.glb`,artworkInfo:{title:"Ear Study 09",artist:"Veepra Mishra"}}]});this._loadingPromises.push(U.load().then(()=>{U.hitbox.userData.location="WestPavillion",this._registerExperience(U),U._clickables=this.screenManager.clickables}).catch(console.error));const X=new ts({scene:this.scene,position:[-33.9,.9,-25.5],rotation:[0,180,0],panelWidth:1.5,panelHeight:2,revealMap:this.screenManager._revealTex,debugOn:this._debug,artworkInfo:{title:"Black Swan",artist:"Jieun Sung",description:"This project is about the black swan. Of all animals, I've always been particularly afraid of birds, but swans are the only ones that have ever helped me overcome that fear. So, I was intrigued to research them. I didn't even know that black swans existed before, and I was fascinated to discover this species of swan. The black swan, with its dark mood and colour, really appealed to me, so I decided to make it the focus of my project.",link:"https://ualshowcase.arts.ac.uk/project/645817/cover",narration:`${g}audio/BlackSwan_Narration.mp3`,narrationCues:`${g}audio/BlackSwan_Narration.json`},images:[{url:`${g}art/BlackSwan-JieunSung/IMG_5414-2.png.avif`},{url:`${g}art/BlackSwan-JieunSung/IMG_1886.jpg`},{url:`${g}art/BlackSwan-JieunSung/IMG_5433.jpg`},{url:`${g}art/BlackSwan-JieunSung/IMG_5435-1.jpg`}]});this._loadingPromises.push(X.load().then(()=>{X.hitbox.userData.location="WestPavillion",this._registerExperience(X),X._clickables=this.screenManager.clickables}).catch(console.error));const q=new ts({scene:this.scene,position:[-7.8,23,7],rotation:[0,-90,0],panelWidth:1.8,panelHeight:1.35,revealMap:this.screenManager._revealTex,debugOn:this._debug,artworkInfo:{title:"Dehumanized",artist:"Chi An Chou",description:"In this era of artificial intelligence, automation and highly mature technology, the definition of human is gradually disintegrating, and machines and technology are infiltrating and dominating our daily lives. Dehumanized is a conceptual exploration of a future world in which technology no longer centers on human nature, but instead gradually controls, holds power, and eventually replaces humanity. When digital systems take over judgment, aesthetics become algorithmically defined, and the body is transformed into a tool that prioritizes efficiency, emotions and individual consciousness begin to be seen as redundant residues. This project want to use visual language to present a imaginary future worldview: redesigned organisms, individuality erased, and a void beneath the human shell. Is Dehumanized a dystopian fantasy world, or is it a mirror held up to our present? In the wave of rapid innovation, what may ultimately be sacrificed is the very essence of what makes us human.",link:"https://ualshowcase.arts.ac.uk/@chiannj",narration:`${g}audio/Dehumanized_Narration.mp3`,narrationCues:`${g}audio/Dehumanized_Narration.json`},images:[{url:`${g}art/Dehumanized_ChiAnChou/IMG_7018-Large.jpeg.avif`},{url:`${g}art/Dehumanized_ChiAnChou/IMG_4790-Large.jpg`},{url:`${g}art/Dehumanized_ChiAnChou/IMG_4797-Large.jpg`},{url:`${g}art/Dehumanized_ChiAnChou/IMG_7023-Large.jpg`},{url:`${g}art/Dehumanized_ChiAnChou/IMG_7046-Large.jpg`},{url:`${g}art/Dehumanized_ChiAnChou/IMG_7074-Large.jpg`},{url:`${g}art/Dehumanized_ChiAnChou/IMG_7099-Large.jpg`},{url:`${g}art/Dehumanized_ChiAnChou/IMG_7271-Large.jpg`},{url:`${g}art/Dehumanized_ChiAnChou/cdf4401975effd4b5e3a229839cc6976-2-Large.jpg`},{url:`${g}art/Dehumanized_ChiAnChou/${encodeURIComponent("未命名的作品-7.jpg")}`}]});this._loadingPromises.push(q.load().then(()=>{q.hitbox.userData.location="EagleBar",this._registerExperience(q),q._clickables=this.screenManager.clickables}).catch(console.error)),this._registerArtwork(this.screenManager.addScreen({url:"https://pub-866c71617b57495a9adcc2fe87aaff0e.r2.dev/film/Pseudosynthesis.mp4",poster:`${g}art/Pseudosynthesis_LeonLin/Vertical_comp-1.png.avif`,width:5,height:2.25,position:[-26,.8,-23],rotation:[0,-90,0],clickable:!0,offsetClick:0,clickableSize:[5.2,2.45],text:"",plinthVisible:!1,location:"WestPavillion",artworkInfo:{title:"Pseudosynthesis",artist:"Leon Lin",description:"This project investigates whether AI-generated performers can authentically replicate human emotional expression in dance and performance. Through interviews with dancers and motion-capture experiments, it identifies three stages of human emotion (raw, mechanical, controlled) and argues that AI is limited to mimicry due to its lack of consciousness, embodiment, and lived experience. Drawing on Judith Butler's theories, it contrasts human performativity (fluid, culturally embedded) with AI's programmed rigidity. The work also explores queering digital avatars, critiques the commodification of bodies, and uses a 3D fashion film to visualize the human-machine divide.",link:"https://ualshowcase.arts.ac.uk/project/655404/cover"},onClick:G=>{console.log("Clicked screen/podium",G)}})),this._loadingPromises.push(this.screenManager.addModel({url:"/CRxUAL-Virtual-Exhibiton-2026/art/LetMeEatCake_SuzannaTeal/CakeTable_NoCake.glb",position:[-29,-1,-21],rotation:[0,-90,0],rotationOffset:90,normalizeTo:2.2,clickable:!1,text:"",textOffset:[0,-.7,.9],hitboxSize:[1.8,1.2,1.6],offsetClick:-1.5,plinthVisible:!1,plinthOffset:[0,-.8,0],playAnimation:"first",location:"WestPavillion"}).catch(console.error));const j=new Kr({scene:this.scene,debugOn:this._debug,artworkInfo:{title:"Let Me Eat Cake",artist:"Suzanna Teal",description:"Let Me Eat Cake is a multimedia installation that explores the relationship between food, memory, and identity. Through a combination of sculpture, video, and interactive elements, the work invites viewers to reflect on their own experiences with food and the stories they tell about it. The installation features a series of sculptural cakes that respond to viewer interaction, creating a dynamic and engaging experience that blurs the line between art and culinary tradition.",link:"https://ualshowcase.arts.ac.uk/project/616847/cover",narration:`${g}audio/LetMeEatCake_Narration.mp3`,narrationCues:`${g}audio/LetMeEatCake_Narration.json`},entryPosition:[-29,0,-21],entryHitboxSize:[2.4,2.4,1.4],arrowOffset:1,arrowHeight:0,arrowSize:.5,models:[{url:`${g}art/LetMeEatCake_SuzannaTeal/LetMeEatCake_01.glb`,position:[-29.4,-.04,-21.7],rotation:[0,30,0],normalizeTo:.5,artworkInfo:{title:"Let Me Eat Cake — I",artist:"Suzanna Teal",description:"Let Me Eat Cake is a multimedia installation that explores the relationship between food, memory, and identity. Through a combination of sculpture, video, and interactive elements, the work invites viewers to reflect on their own experiences with food and the stories they tell about it.",link:"https://ualshowcase.arts.ac.uk/project/616847/cover"}},{url:`${g}art/LetMeEatCake_SuzannaTeal/LetMeEatCake_02.glb`,position:[-28.7,-.04,-21.7],rotation:[0,10,0],normalizeTo:.5,artworkInfo:{title:"Let Me Eat Cake — II",artist:"Suzanna Teal",description:"Let Me Eat Cake is a multimedia installation that explores the relationship between food, memory, and identity. Through a combination of sculpture, video, and interactive elements, the work invites viewers to reflect on their own experiences with food and the stories they tell about it.",link:"https://ualshowcase.arts.ac.uk/project/616847/cover"}},{url:`${g}art/LetMeEatCake_SuzannaTeal/LetMeEatCake_03.glb`,position:[-28.7,-.04,-20.3],rotation:[0,-10,0],normalizeTo:.5,artworkInfo:{title:"Let Me Eat Cake — III",artist:"Suzanna Teal",description:"Let Me Eat Cake is a multimedia installation that explores the relationship between food, memory, and identity. Through a combination of sculpture, video, and interactive elements, the work invites viewers to reflect on their own experiences with food and the stories they tell about it.",link:"https://ualshowcase.arts.ac.uk/project/616847/cover"}},{url:`${g}art/LetMeEatCake_SuzannaTeal/LetMeEatCake_04.glb`,position:[-29.4,-.04,-20.3],rotation:[0,-30,0],normalizeTo:.5,artworkInfo:{title:"Let Me Eat Cake — IV",artist:"Suzanna Teal",description:"Let Me Eat Cake is a multimedia installation that explores the relationship between food, memory, and identity. Through a combination of sculpture, video, and interactive elements, the work invites viewers to reflect on their own experiences with food and the stories they tell about it.",link:"https://ualshowcase.arts.ac.uk/project/616847/cover"}}]});this._loadingPromises.push(j.load().then(()=>{j.hitbox.userData.location="WestPavillion",this._registerExperience(j),j._clickables=this.screenManager.clickables}).catch(console.error)),this._loadingPromises.push(this.screenManager.addModel({url:"/CRxUAL-Virtual-Exhibiton-2026/art/EmbodiedMemories_YoonJuChung/JU CHUNG_V2.glb",position:[-40.8,1,-25.2],rotation:[0,45,0],rotationOffset:0,normalizeTo:1.5,clickable:!0,onClick:(G,se)=>console.log("Model clicked:",G),text:"",textOffset:[0,-.7,.9],hitboxSize:[.6,1.4,.6],offsetClick:-0,plinthVisible:!0,plinthOffset:[0,-.8,0],playAnimation:"first",location:"WestPavillion",playAnimation:"all",artworkInfo:{title:"Embodied Memories",artist:"Yoon Ju Chung",description:"Embodied Memories explores Hangul, the Korean alphabet, as an embodied and relational language through modular wearable artefacts. Originating from experiences of non-verbal communication with the artist's hearing-impaired aunt, the project approaches gesture and movement as fundamental forms of language. Drawing on Hangul's geometric structure, linguistic principles are translated into a modular system that functions as words, sculptural forms, or wearable objects. Grounded in Korean emotional philosophies—Jeong (connection), Han (endurance), and Heung (vitality)—the work informs processes of alignment, tension, play, and repair. Rather than treating language as a fixed visual system, meaning emerges through bodily movement, touch, and reconfiguration. The final artefacts are constructed using Korean textiles such as Mosi (ramie) and Oksa (silk), combined with transparent acrylic structures, magnetic connections, and traditional techniques including Gamchimgil hand-stitching and Pusae (rice starch stiffening).  Language is not only spoken or written; it is sensed, worn, and remembered.",link:"https://ualshowcase.arts.ac.uk/@yoonjuchung",narration:`${g}audio/EmbodiedMemories_Narration.mp3`,narrationCues:`${g}audio/EmbodiedMemories_Narration.json`}}).then(G=>{this.statue=G,this._registerArtwork(G)}).catch(console.error)),this._registerArtwork(this.screenManager.addScreen({url:"https://pub-866c71617b57495a9adcc2fe87aaff0e.r2.dev/film/Synesthetic%20Skin_MB.mp4",poster:`${g}art/SynestheticSkin_JianingDing/Screenshot 2026-03-22 at 17.33.20.png`,width:3,height:1.5,position:[-39,1,-20.4],rotation:[0,180,0],clickable:!0,plinthVisible:!1,offsetClick:0,text:"",location:"WestPavillion",artworkInfo:{title:"Synesthetic Skin：A Posthuman Visual Narrative",artist:"Jianing Ding",description:"This project explores how the human body is shaped by socio-technical influences within the context of Future Human–Machine Intelligence, and investigates how we might use this “bodily structure” to form new relationships in the future. Through mediums such as virtual digital humans, visual narratives, and AR masks, the work creates a visual experimental space that invites viewers to reflect on their own position within the digital environment. Drawing on Doreen Massey’s (2005) theory of “space as process,” the project understands space as a dynamic field co-generated by body and technology. From this perspective, it begins with the fluidity between virtual and real, breaking down binary oppositions and presenting a state of symbiotic and continuous perception—guiding audiences to recognise that they too exist within a life network composed of data and code. Ultimately, the project constructs a visual experiment of human–machine symbiosis and posthuman perception.",link:"https://ualshowcase.arts.ac.uk/project/690407/cover"},onClick:G=>{console.log("Clicked screen/podium",G)}})),this._registerArtwork(this.screenManager.addScreen({url:`${g}art/Nailed_Genevieve Carr/nailed.webp`,width:1.5,height:2,position:[-33.4,1,-13.8],rotation:[0,210,0],clickable:!0,offsetClick:.5,clickableSize:[2.2,2.5],text:"",plinthVisible:!1,location:"WestPavillion",artworkInfo:{title:"Nailed",artist:"Genevieve Carr",description:'"Nailed" transforms nail salon waste into a 3D printing filament, used to create sculptural nails inspired by botanical drawings. The project explores beauty, waste, and material reuse—reimagining synthetic leftovers as future design materials.',narration:`${g}audio/Nailed_Narration.mp3`,narrationCues:`${g}audio/Nailed_Narration.json`},onClick:G=>{console.log("Clicked screen/podium",G)}}));const J=[],Z=this.screenManager.addScreen({url:`${g}art/FauxFlora_JustinaAlexandrof/Justina_Alexandroff_2-2.jpg`,width:1.5,height:2,position:[5.5,23,16.5],rotation:[0,-135,0],clickable:!1,offsetClick:.5,clickableSize:[2.2,2.5],text:"",plinthVisible:!1,location:"EagleBar"});J.push(Z),this._loadingPromises.push(this.screenManager.addModel({url:`${g}art/FauxFlora_JustinaAlexandrof/FauxFloraArrangement.glb`,position:[4.1,21.3,17],rotation:[0,-135,0],normalizeTo:2.5,clickable:!1,text:"",textOffset:[0,-.1,.9],hitboxSize:[1.8,1.5,1.8],offsetClick:.2,plinthVisible:!1,plinthOffset:[0,-.5,0],plinthSize:[1,1,1],location:"EagleBar"}).then(G=>{J.push(G)}).catch(console.error));const F=new Kr({scene:this.scene,debugOn:this._debug,artworkInfo:{title:"Faux Flora",artist:"Justina Alexandroff",description:"Urban air pollutants disrupt floral odors, altering the scent of flowers and making it difficult for pollinating insects to locate essential plants. Faux Flora is an artificial flower system designed to guide pollinators toward nearby flower-rich areas. This project is a collaboration with NICE Lab (based in Bangalore) and incorporates Aditi Mishra’s PhD research that an insect pollinator identifies a flower object when it has three traits in combination: radial symmetry, a sweet scent and a reflective surface. I have reimagined these traits through parametric 3D design and printing (for radial symmetry), chemical ecology (for the sweet scent) and nano-cellulose structural colour (for the reflective surface). Acting as visual and olfactory beacons with no nectar reward, insects quickly learn to forage in the surrounding environment. Through artificial chemistry and biomimicry, Faux Flora explores new relationships between species, technology, and cities.",link:"https://ualshowcase.arts.ac.uk/@justinaalexandroff",narration:`${g}audio/FauxFlora_Narration.mp3`,narrationCues:`${g}audio/FauxFlora_Narration.json`},entryPosition:[5,22.5,16],entryHitboxSize:[2,2,2],arrowOffset:.5,arrowHeight:0,arrowSize:.35,models:[{url:`${g}art/FauxFlora_JustinaAlexandrof/Barnacle_lowres.glb`,position:[5,22.5,16],rotation:[0,-135,0],normalizeTo:.8,artworkInfo:{title:"Faux Flora — Barnacle",artist:"Justina Alexandroff"}},{url:`${g}art/FauxFlora_JustinaAlexandrof/Floral_lowres.glb`,position:[3.2,22.5,14.5],rotation:[0,-135,0],normalizeTo:.8,artworkInfo:{title:"Faux Flora — Flora",artist:"Justina Alexandroff"}},{url:`${g}art/FauxFlora_JustinaAlexandrof/Coral_lowres.glb`,position:[6.8,22.5,14.5],rotation:[0,-135,0],normalizeTo:.8,artworkInfo:{title:"Faux Flora — Coral",artist:"Justina Alexandroff"}}]});this._loadingPromises.push(F.load().then(()=>{F.hitbox.userData.location="EagleBar",F.hitbox.userData.experienceChildren=J,this._registerExperience(F),F._clickables=this.screenManager.clickables}).catch(console.error)),this._registerArtwork(this.screenManager.addScreen({url:"https://pub-866c71617b57495a9adcc2fe87aaff0e.r2.dev/film/PYTKO%20-%20Lust%20Feels%20Like%20Bad%20Luck.mp4",poster:`${g}art/LustFeelsLikeBadLuck-JuliaPytko/Backwards-Artwork-1_1.jpg`,width:1.5,height:1.5,position:[7.8,23,7],rotation:[0,-90,0],clickable:!0,offsetClick:.5,clickableSize:[2.2,2.5],text:"",plinthVisible:!1,location:"EagleBar",artworkInfo:{title:"Lust Feels Like Bad Luck",artist:"Julia Pytko",description:"Lust Feels Like Bad Luck is an experimental, community-driven exploration of sound, identity, and interactivity. Centred on a four-track EP of experimental electronica, the project expands into a constellation of interconnected works including music videos, a text-based video game and a MetaHuman performance. Together, these elements form an evolving environment where sound, image, and participation flow into one another. The project approaches sound as a living language, a way of listening, reflecting, and connecting. Through collaboration and experimentation across digital and physical spaces, Lust Feels Like Bad Luck reimagines music as a shared process of attention and care, inviting audiences to engage not just as listeners but as participants in an unfolding ecology of experience.",link:"https://ualshowcase.arts.ac.uk/@juliapytko"},onClick:G=>{console.log("Clicked screen/podium",G)}}));const K=this.screenManager.addScreen({url:" https://pub-866c71617b57495a9adcc2fe87aaff0e.r2.dev/film/Be%20Not%20Afraid.mp4",poster:`${g}art/BeNotAfraid-RysiaAnnaKaczmar/9T0A5893_1.jpg`,width:1.8,height:1.2,position:[-5,23,12],rotation:[0,90,0],clickable:!0,offsetClick:0,clickableSize:[2.2,1],text:"",plinthVisible:!1,location:"EagleBar",exposure:1,artworkInfo:{title:"Be Not Afraid",artist:"Rysia Anna Kaczmar",description:"Be Not Afraid is a sculptural sound work inspired by biblically accurate angels and childhood comfort objects. Constructed from plush fabric and embedded with a speaker in place of an eye, the piece features six oversized wings in various states of motion. It explores the intersection of sacred imagery and emotional attachment, questioning how tenderness and terror can coexist within a single form. Sound pulses through the speaker to activate the work sonically and symbolically. Drawing from religious aesthetics while acknowledging the erosion of moral certainty in contemporary life, Be Not Afraid invites reflection on how belief, fear, and care shape the way we encounter the unknown.",link:"https://ualshowcase.arts.ac.uk/@lynxiewho"},onClick:G=>{console.log("Clicked screen/podium",G)}});this._registerArtwork(K),this._loadingPromises.push(this.screenManager.addModel({url:`${g}art/BeNotAfraid-RysiaAnnaKaczmar/BeNotAfraid_Artwork3D.glb`,position:[-4.5,22.4,11.2],rotation:[0,90,0],normalizeTo:.8,clickable:!1,text:"STATUE_01",textOffset:[0,-.5,.9],hitboxSize:[.6,1.4,.6],offsetClick:-0,plinthVisible:!1,playAnimation:"first",location:"EagleBar"}).then(G=>{this.statue=G,(K.userData.hitBox??K).userData.experienceChildren=[G]}).catch(console.error));const oe=new Kr({scene:this.scene,debugOn:this._debug,artworkInfo:{title:"Material Place",artist:"Neve Beill",description:"This project investigates a sense of place through materiality. Taking an exploratory approach, Neve Beill walked along areas of the River Thames and the coast of the Isle of Wight, collecting various wild clays and other natural materials to create two distinct collections of pots. A key focus of this project is finding innovative ways to use found materials while reducing waste. It replaces conventional commercial materials commonly used in the ceramics industry with a wide variety of waste materials, such as clay from construction sites, broken pieces of glass, and ash from various sources. Honouring her own cultural identity, growing up between London and the Isle of Wight, she draws on the historical significance of ceramics in these areas. The primary forms are inspired by Roman vessels discovered in both locations, while the range of finishes reflects the differing tactile qualities of each place.",narration:`${g}audio/MaterialPlaces_Narration.mp3`,narrationCues:`${g}audio/MaterialPlaces_Narration.json`},entryPosition:[0,.1,-4],entryHitboxSize:[4.5,1.5,2],arrowOffset:.2,arrowHeight:0,arrowSize:.35,models:[{url:`${g}art/MaterialPlace_NeveBeill/MaterialPlace_01.glb`,position:[-1.6,-.55,-4.6],rotation:[0,30,0],normalizeTo:.25,artworkInfo:{title:"Material Place — I",artist:"Neve Beill"}},{url:`${g}art/MaterialPlace_NeveBeill/MaterialPlace_02.glb`,position:[-.4,-.7,-4.5],rotation:[0,10,0],normalizeTo:.25,artworkInfo:{title:"Material Place — II",artist:"Neve Beill"}},{url:`${g}art/MaterialPlace_NeveBeill/MaterialPlace_03.glb`,position:[-.2,-.7,-4.9],rotation:[0,-10,0],normalizeTo:.25,artworkInfo:{title:"Material Place — III",artist:"Neve Beill"}},{url:`${g}art/MaterialPlace_NeveBeill/MaterialPlace_04.glb`,position:[.2,-.7,-4.9],rotation:[0,-20,0],normalizeTo:.25,artworkInfo:{title:"Material Place — IV",artist:"Neve Beill"}},{url:`${g}art/MaterialPlace_NeveBeill/MaterialPlace_05.glb`,position:[.4,-.7,-4.5],rotation:[0,-30,0],normalizeTo:.25,artworkInfo:{title:"Material Place — V",artist:"Neve Beill"}},{url:`${g}art/MaterialPlace_NeveBeill/MaterialPlace_06.glb`,position:[1.6,-.55,-4.6],rotation:[0,-40,0],normalizeTo:.25,artworkInfo:{title:"Material Place — VI",artist:"Neve Beill"}}]});this._loadingPromises.push(oe.load().then(()=>{oe.hitbox.userData.location="lobby",this._registerExperience(oe),oe._clickables=this.screenManager.clickables}).catch(console.error));const ie=this.screenManager.addScreen({url:"https://pub-866c71617b57495a9adcc2fe87aaff0e.r2.dev/film/Show_Video_ShuyangWang_MB.mp4",poster:`${g}art/Symbion/hero_img-3.jpg-2.avif`,width:1.8,height:1,position:[1.8,23,5],rotation:[0,-10,0],clickable:!0,offsetClick:0,clickableSize:[2.7,1.5],text:"",plinthVisible:!1,location:"EagleBar",artworkInfo:{title:"Symbion",artist:"Shuyang Wang",description:"Symbion is a conceptual model for human–embodied AI collaboration that centers on a novel human–AI relationship spectrum under which a biomimetic robotic hand operates. The spectrum spans five modes—Manual, Training, Collaboration, Guidance, and Automated—each reflecting a different balance of control and learning between human and AI. Within this framework, the robotic hand is designed to collaborate seamlessly with humans in existing ergonomic contexts while expressing movements in ways that are naturally intuitive and easy to interpret. Together, these elements create a unified environment for exploring how embodied AI and humans can learn from one another, share control, and work in synergy.",link:"https://ualshowcase.arts.ac.uk/@shuyangwang"},onClick:G=>{console.log("Clicked screen/podium",G)}});this._registerArtwork(ie),this._loadingPromises.push(this.screenManager.addModel({url:`${g}art/Symbion/symbionHand.glb`,position:[.8,22.6,5],rotation:[0,-90,0],normalizeTo:.8,clickable:!1,text:"",textOffset:[0,-.5,.9],hitboxSize:[.6,1.4,.6],offsetClick:-0,plinthVisible:!1,playAnimation:"first",location:"EagleBar"}).then(G=>{this.statue=G,(ie.userData.hitBox??ie).userData.experienceChildren=[G]}).catch(console.error));for(const G of this._artworkRegistry){const se=G.obj.userData.location;se&&se!==this._currentLocation&&(G.obj.visible=!1,(G.obj.userData.associatedMeshes??[]).forEach(he=>{he.visible=!1}))}}update(e){var a,o,l;this._focusCooldown=Math.max(0,this._focusCooldown-e);const t=this.locations.isMoving;this.locations.update(e);const n=this.locations.isMoving&&this._pendingLocation!==this.locations.activeId,i=t&&!this.locations.isMoving;if(n&&(this._pendingLocation=this.locations.activeId,this._setLocationVisibility(this._pendingLocation,!0)),i&&this._pendingLocation&&(this._currentLocation!==this._pendingLocation&&this._setLocationVisibility(this._currentLocation,!1),this._currentLocation=this._pendingLocation,this._pendingLocation=null),i&&this._pendingFocusIndex!==null){const c=this._pendingFocusIndex;this._pendingFocusIndex=null;const h=this._artworkRegistry[c];h&&h.obj.userData.location===this._currentLocation&&this._focusOnObj(h.obj)}i&&(this.camera.rotation.order="YXZ",this.controls.yawTotal=this.camera.rotation.y,this.controls.pitch=this.camera.rotation.x,this.controls.yawVel=0,this.controls.pitchVel=0),!this.locations.isMoving&&this._focusState==="idle"&&this.controls.update(e),this.focus.update(e),this._focusState==="focusing"&&!this.focus.isMoving&&(this._focusState="focused"),this._focusState==="returning"&&!this.focus.isMoving&&(this._focusState="idle",this._exitFocusMode());for(let c=this._tweens.length-1;c>=0;c--){const h=this._tweens[c];h.update(e),h.done&&this._tweens.splice(c,1)}this.screenManager.update(e);const s=((o=(a=this._focusedScreen)==null?void 0:a.userData)==null?void 0:o.modelRoot)??null;this.screenManager.updateMixers(e,s),(l=this._focusedExperience)==null||l.update(e),this._exitingExperience&&(this._exitingExperience.update(e),this._exitingExperience._isExiting||(this._exitingExperience=null)),this._tryMouseTrailReveal(),this.proximityReveal.update(this.camera.position)}async waitForReady(){await Promise.allSettled(this._loadingPromises);const e=[],t=[];this.scene.traverse(n=>{n.visible||(e.push(n),n.visible=!0),n.isMesh&&n.frustumCulled&&(t.push(n),n.frustumCulled=!1)}),await this.renderer.compileAsync(this.scene,this.camera),this.renderer.render(this.scene,this.camera);for(const n of e)n.visible=!1;for(const n of t)n.frustumCulled=!0}onResize(){}_isInFocusMode(){return this.focus.isFocused||this.focus.isMoving}_enterFocusMode(){this._controlsSaved||(this._controlsSaved={autoRotate:this.controls.autoRotate,dragToLook:this.controls.dragToLook},this.controls.resetDrag(),this.controls.dragToLook=!1,this.controls.autoRotate=!1)}_exitFocusMode(){this._controlsSaved&&(this.controls.dragToLook=this._controlsSaved.dragToLook,this.controls.autoRotate=this._controlsSaved.autoRotate,this.controls.resetDrag(),this._controlsSaved=null)}_focusOnObj(e){var d,p,_,v,m,f,S,x,T,L;if(this._focusCooldown>0||this.focus.isMoving)return;const t=e.userData.focusTarget||e,n=e.userData.revealTarget||e;this._focusState==="idle"&&((p=(d=this.focus).setHomeFromCurrent)==null||p.call(d)),this._enterFocusMode(),this._focusState="focusing",this._focusCooldown=.2,this._focusedScreen&&this._focusedScreen!==t&&(this._animateReveal(this._focusedScreen,0,1,.25),this._animateReveal(this._lastRevealedScreen,0,1,.25)),this._focusedScreen=t,this._focusedHitbox=e,this._lastRevealedScreen=n,this.screenManager.setActiveFluids(t);const i=new C;if(t.getWorldPosition(i),this.proximityReveal.addPermanentReveal(i),this._focusedScreen!==this._lastfocusedScreen){this._animateReveal(t,1,0,.4),this._animateReveal(n,1,0,.4),this._lastfocusedScreen=this._focusedScreen;const A=this._resolveExperienceChildren(e,t);if(A)for(const b of A)this._animateExperienceChild(b,!0)}const s=(_=n==null?void 0:n.userData)==null?void 0:_.revealMaterial,a=((m=(v=s==null?void 0:s.uniforms)==null?void 0:v.uColorReveal)==null?void 0:m.value)??0;if(a<1.2&&this._animateColorReveal(n,a,1.2,1.5),t.userData.focusPose){const{position:A,quaternion:b,duration:D=.9}=t.userData.focusPose;this.focus.moveTo({position:A,quaternion:b,duration:D})}else this.focus.focusOn({targetObject:t,distance:"fit",heightOffset:0,duration:.7,padding:1});const o=e.userData.artworkInfo;o&&this.infoPanel.show(o);const l=this.screenManager.activateVideo(e);if(l)this.infoPanel.showVideoControls(l),this.infoPanel.hideAudioControls(),this._deactivateNarration();else{this.infoPanel.hideVideoControls();const A=this._activateNarration(e);if(A){this.infoPanel.showAudioControls(A,e.userData.narrationCuesData??null);const b=(f=e.userData.artworkInfo)==null?void 0:f.narrationCues;b&&!e.userData.narrationCuesData&&fetch(b).then(D=>D.json()).then(D=>{var g;e.userData.narrationCuesData=D.segments??[],((g=this._activeNarration)==null?void 0:g.obj)===e&&this.infoPanel.setCues(e.userData.narrationCuesData)}).catch(D=>console.warn("[Narration] Could not load cues:",b,D))}else this.infoPanel.hideAudioControls()}const c=this._artworkRegistry.findIndex(A=>A.obj===e);if(c!==-1){this._currentArtworkIndex=c,this.infoPanel.setActiveIndex(c,this._artworkRegistry.length),this._seenArtworkIndices.add(c);const A=this._artworkRegistry[c].obj.userData.location;if(this._debug){const b=A?this._artworkRegistry.filter((g,y)=>g.obj.userData.location===A&&this._seenArtworkIndices.has(y)).length:0,D=A?this._artworkRegistry.filter(g=>g.obj.userData.location===A).length:0;console.log(`[LocationReveal] seen artwork #${c} "${this._artworkRegistry[c].info.title}" (location: "${A}" — ${b}/${D} seen)`)}A&&this._checkLocationCompletion(A)}const h=e.userData.experience??null;if(h!==this._focusedExperience){const A=this._focusedExperience;this._restoreExperienceHitbox(A),this._exitingExperience&&this._exitingExperience!==h&&((x=(S=this._exitingExperience)._cancelExit)==null||x.call(S),this._exitingExperience=null),A==null||A.onUnfocus(),this._focusedExperience=h,A!=null&&A._isExiting&&(this._exitingExperience=A),h==null||h.onFocus(this.camera,e),this._removeExperienceHitbox(h)}const u=!!((T=t==null?void 0:t.userData)!=null&&T.contentCarousel||(L=this._focusedExperience)!=null&&L.onNav);this._setCarouselButtons(u)}_handleCarouselNav(e){var n,i,s;const t=(i=(n=this._focusedScreen)==null?void 0:n.userData)==null?void 0:i.contentCarousel;if(t){e<0?t.prev():t.next();return}if((s=this._focusedExperience)!=null&&s.onNav){const a=this._focusedExperience.onNav(e);a!=null&&a.focusTarget&&this.focus.focusOn({targetObject:a.focusTarget,distance:"fit",duration:.6,padding:1}),a!=null&&a.artworkInfo&&this.infoPanel.show(a.artworkInfo)}}_setCarouselButtons(e){var t,n;(t=this._carouselPrevBtn)==null||t.classList.toggle("carousel-nav-btn--visible",e),(n=this._carouselNextBtn)==null||n.classList.toggle("carousel-nav-btn--visible",e)}_removeExperienceHitbox(e){if(!(e!=null&&e.hitbox))return;const t=this.screenManager.clickables.indexOf(e.hitbox);t!==-1&&this.screenManager.clickables.splice(t,1)}_restoreExperienceHitbox(e){e!=null&&e.hitbox&&(this.screenManager.clickables.includes(e.hitbox)||this.screenManager.clickables.push(e.hitbox))}_activateNarration(e){var i;this._deactivateNarration();const t=(i=e.userData.artworkInfo)==null?void 0:i.narration;if(!t)return null;e.userData.audioEl||(e.userData.audioEl=new Audio(t),e.userData.audioEl.preload="metadata");const n=e.userData.audioEl;return this._activeNarration={audio:n,obj:e},this.autoplayNarration&&n.play().catch(()=>{}),n}_deactivateNarration(){this._activeNarration&&(this._activeNarration.audio.pause(),this._activeNarration=null)}_setLocationVisibility(e,t){for(const n of this._artworkRegistry)n.obj.userData.location===e&&(!t&&n.obj===this._focusedScreen||(n.obj.visible=t,(n.obj.userData.associatedMeshes??[]).forEach(i=>{i.visible=t})))}_doEnvTapReveal(){if(!this._envMeshes.length)return;this._envRay.setFromCamera(this._lastNDC,this.camera);const e=this._envRay.intersectObjects(this._envMeshes,!1);e.length>0&&(this.proximityReveal.addTemporaryReveal(e[0].point),this._lastMouseRevealPos=e[0].point.clone())}_tryMouseTrailReveal(){if(!this._mouseRevealDirty||(this._mouseRevealDirty=!1,!this.proximityReveal.features.mouseTrail)||this._focusState!=="idle"||!this._envMeshes.length)return;this._envRay.setFromCamera(this._lastNDC,this.camera);const e=this._envRay.intersectObjects(this._envMeshes,!1);if(!e.length)return;const t=e[0].point;this._lastMouseRevealPos&&this._lastMouseRevealPos.distanceTo(t)<1.5||(this._lastMouseRevealPos=t.clone(),this.proximityReveal.addTemporaryReveal(t))}_registerArtwork(e){var s,a,o,l;const t=((s=e.userData)==null?void 0:s.hitBox)||((a=e.userData)==null?void 0:a.focusTarget)||e,n=((o=t.userData)==null?void 0:o.artworkInfo)||((l=e.userData)==null?void 0:l.artworkInfo);if(!n)return;if(t!==e&&(t.userData.location===void 0&&(t.userData.location=e.userData.location??null),t.userData.associatedMeshes||(t.userData.associatedMeshes=e.userData.associatedMeshes??[])),(t.userData.location===void 0||t.userData.location===null)&&(t.userData.location=this._currentLocation),this._artworkRegistry.push({info:n,obj:t}),this._debug){const c=this._artworkRegistry.length-1;console.log(`[LocationReveal] registered artwork #${c} "${n.title}" → location: "${t.userData.location}"`)}const i=t.userData.location;i&&i!==this._currentLocation&&(t.visible=!1,(t.userData.associatedMeshes??[]).forEach(c=>{c.visible=!1})),this.infoPanel.setRegistry(this._artworkRegistry)}_registerExperience(e){var t;if(e.hitbox.userData.experience=e,e.hitbox.userData.hitBox=e.hitbox,this.screenManager.clickables.push(e.hitbox),(t=e.modelHitboxes)!=null&&t.length)for(const n of e.modelHitboxes)n.userData.experience=e,this.screenManager.clickables.push(n);e.hitbox.userData.associatedMeshes=[...e.hitbox.userData.associatedMeshes??[],e.root,...e.modelHitboxes??[]],this._registerArtwork(e.hitbox)}setLocationRevealZone(e,{center:t,radius:n}){this._locationRevealZones[e]={center:t,radius:n}}_checkLocationCompletion(e){if(this._completedLocations.has(e))return;const t=this._locationRevealZones[e];if(!t){this._debug&&console.log(`[LocationReveal] no zone registered for "${e}" — call setLocationRevealZone() to enable completion reveal`);return}const n=this._artworkRegistry.map((o,l)=>({r:o,i:l})).filter(({r:o})=>o.obj.userData.location===e);if(n.length===0||!n.every(({i:o})=>this._seenArtworkIndices.has(o)))return;if(this._completedLocations.add(e),!t.center||!t.radius){this._debug&&console.warn(`[LocationReveal] zone "${e}" is missing center or radius`);return}this._debug&&console.log(`[LocationReveal] ✓ location "${e}" complete — flooding area at`,t.center,"r =",t.radius);const[i,s,a]=t.center;this.proximityReveal.addAreaReveal(i,s,a,t.radius)}_navigateArtwork(e){var s,a;if(this._focusedExperience){const o=(a=(s=this._focusedExperience).onNav)==null?void 0:a.call(s,e);if(o!=null&&o.consumed){o.focusTarget&&this.focus.focusOn({targetObject:o.focusTarget,duration:.5}),o.artworkInfo&&this.infoPanel.show(o.artworkInfo);return}}const t=this._artworkRegistry.map((o,l)=>({entry:o,i:l})).filter(({entry:o})=>{const l=o.obj.userData.location;return l===this._currentLocation||l===null}).map(({i:o})=>o);if(!t.length)return;const n=t.indexOf(this._currentArtworkIndex),i=n===-1?0:((n+e)%t.length+t.length)%t.length;this._navigateToIndex(t[i])}_navigateToIndex(e){const t=this._artworkRegistry[e];if(!t)return;const n=t.obj.userData.location;if(n&&n!==this._currentLocation){if(this._focusState!=="idle"){this.screenManager.deactivateVideo(this._focusedScreen),this._deactivateNarration(),this.infoPanel.hide(),this.infoPanel.hideVideoControls(),this.infoPanel.hideAudioControls(),this._animateReveal(this._focusedScreen,0,1,.15),this._animateReveal(this._lastRevealedScreen,0,1,.15);const s=this._resolveExperienceChildren(this._focusedHitbox,this._focusedScreen);if(s)for(const a of s)this._animateExperienceChild(a,!1);this._focusedScreen=null,this._focusedHitbox=null,this._lastRevealedScreen=null,this._exitFocusMode(),this._focusState="idle",this._setCarouselButtons(!1)}this.locations.goTo(n,{duration:3}),this._pendingFocusIndex=e;return}this._focusOnObj(t.obj)}goToLocation(e,t={}){if(this._focusState!=="idle"){this.screenManager.deactivateVideo(this._focusedScreen),this._deactivateNarration(),this.infoPanel.hide(),this.infoPanel.hideVideoControls(),this.infoPanel.hideAudioControls(),this._animateReveal(this._focusedScreen,0,1,.15),this._animateReveal(this._lastRevealedScreen,0,1,.15);const n=this._resolveExperienceChildren(this._focusedHitbox,this._focusedScreen);if(n)for(const i of n)this._animateExperienceChild(i,!1);this._focusedScreen=null,this._focusedHitbox=null,this._lastRevealedScreen=null,this._exitFocusMode(),this._focusState="idle",this._setCarouselButtons(!1),this.focus.isMoving=!1,this.focus.isFocused=!1,this.focus._hasHome=!1}this.locations.goTo(e,t)}_setReveal(e,t){var i;const n=(i=e==null?void 0:e.userData)==null?void 0:i.revealMaterial;n&&(n.uniforms.uReveal.value=t)}_animateReveal(e,t,n,i=.35){if(!e||e.userData.skipReveal)return;this._tweens=this._tweens.filter(a=>a.mesh!==e);const s=Sn({from:t,to:n,duration:i,onUpdate:a=>this._setReveal(e,a)});s.mesh=e,this._tweens.push(s)}_resolveExperienceChildren(e,t){var n,i;return(e==null?void 0:e.userData.experienceChildren)??((n=e==null?void 0:e.userData.revealTarget)==null?void 0:n.userData.experienceChildren)??((i=e==null?void 0:e.userData.modelRoot)==null?void 0:i.userData.experienceChildren)??(t==null?void 0:t.userData.experienceChildren)??null}_setColorReveal(e,t){var i,s;const n=(i=e==null?void 0:e.userData)==null?void 0:i.revealMaterial;(s=n==null?void 0:n.uniforms)!=null&&s.uColorReveal&&(n.uniforms.uColorReveal.value=t)}_animateColorReveal(e,t,n,i=1.2){if(!e)return;this._tweens=this._tweens.filter(a=>a.colorMesh!==e);const s=Sn({from:t,to:n,duration:i,onUpdate:a=>this._setColorReveal(e,a)});s.colorMesh=e,this._tweens.push(s)}_animateExperienceChild(e,t){var i,s,a;if(!t)return;const n=((i=e.userData)==null?void 0:i.screenMesh)??e;if((s=n.userData)!=null&&s.revealMaterial){const o=((a=n.userData.revealMaterial.uniforms.uColorReveal)==null?void 0:a.value)??0;this._animateColorReveal(n,o,1.2,1.5)}else n.visible=!0,(n.userData.associatedMeshes??[]).forEach(o=>{o.visible=!0})}}function Bl(r){return r>=1e3?`${(r/1e3).toFixed(1)}k`:`${r}`}class nv{constructor({mount:e}){this.mount=e,this.sizes=new Mg,this.time=new Sg,this.scene=new Sc,this.cameraRig=new yg(this.sizes),this.renderer=new gg({mount:this.mount,sizes:this.sizes}),this.sceneManager=new xg(this.scene),this.isMobile=/iphone|ipad|ipod|android/i.test(navigator.userAgent),this.world=new tv({scene:this.scene,camera:this.cameraRig.camera,renderer:this.renderer.gl,sizes:this.sizes,debugOn:!1,isMobile:this.isMobile}),this._fpsEl=null,this._fpsAccum=0,this._fpsFrames=0,this._fpsMaxDt=0,this._bind(),this._start(),this._initFPS(),document.readyState==="loading"?window.addEventListener("DOMContentLoaded",()=>this.bindUI()):this.bindUI()}_bind(){this.sizes.on("resize",()=>{var e,t;this.cameraRig.onResize(this.sizes),this.renderer.onResize(this.sizes),(t=(e=this.world).onResize)==null||t.call(e,this.sizes)}),this.time.on("tick",e=>{this.world.update(e),this.cameraRig.update(e),this.renderer.render(this.scene,this.cameraRig.camera),this._tickFPS(e)})}_start(){this.time.start()}destroy(){this.time.stop(),this.renderer.destroy(),this.sceneManager.disposeAll()}_initFPS(){var t;if(!((t=this.world.screenManager)!=null&&t.debugOn)){this._tickFPS=()=>{};return}const e=document.createElement("div");e.style.cssText="position:fixed;top:8px;left:8px;color:#0f0;background:rgba(0,0,0,0.55);font:bold 12px/1.5 monospace;padding:5px 8px;border-radius:4px;z-index:9999;pointer-events:none;white-space:pre",document.body.appendChild(e),this._fpsEl=e}_tickFPS(e){var t;if(this._fpsAccum+=e,this._fpsFrames+=1,e>this._fpsMaxDt&&(this._fpsMaxDt=e),this._fpsAccum>=.5){const n=Math.round(this._fpsFrames/this._fpsAccum),i=(this._fpsAccum/this._fpsFrames*1e3).toFixed(1),s=(this._fpsMaxDt*1e3).toFixed(1),a=this.renderer.gl.info,o=a.render.calls,l=Bl(a.render.triangles),c=a.memory.geometries,h=a.memory.textures,u=((t=a.programs)==null?void 0:t.length)??"–",d=[`${n} fps  ${i}ms avg  ▲${s}ms`,`Calls: ${o}  Tris: ${l}`,`Geo: ${c}  Tex: ${h}  Sh: ${u}`];if(performance.memory){const p=(performance.memory.usedJSHeapSize/1048576).toFixed(1),_=(performance.memory.jsHeapSizeLimit/1048576).toFixed(0);d.push(`Heap: ${p}MB / ${_}MB`)}this._fpsEl.textContent=d.join(`
`),this._fpsAccum=0,this._fpsFrames=0,this._fpsMaxDt=0}}triReport(){const e=[];this.scene.traverse(n=>{var l,c;if(!n.isMesh)return;const i=n.geometry;if(!i)return;const s=i.index?i.index.count/3:(((l=i.attributes.position)==null?void 0:l.count)??0)/3;let a=!0,o=n;for(;o;){if(!o.visible){a=!1;break}o=o.parent}e.push({name:n.name||"(unnamed)",parent:((c=n.parent)==null?void 0:c.name)||"–",tris:Math.round(s),rendered:a})}),e.sort((n,i)=>i.tris-n.tris);const t=e.reduce((n,i)=>n+i.tris,0);console.log(`Scene triangles: ${Bl(t)} across ${e.length} meshes (top 30 shown)`),console.table(e.slice(0,100))}bindUI(){const e=document.getElementById("menu");e&&e.querySelectorAll(".btn[data-loc]").forEach(t=>{t.addEventListener("click",n=>{var s;n.stopPropagation(),document.pointerLockElement&&((s=document.exitPointerLock)==null||s.call(document));const i=t.dataset.loc;this.world.goToLocation(i,{duration:3}),e.querySelectorAll(".btn").forEach(a=>a.classList.remove("active")),t.classList.add("active")})})}}const ei=new _g,iv=/\.(jpe?g|png|avif|webp|gif)(\?.*)?$/i,sv=/\/art\/(textures|hdri)\//i;Cc.onProgress=(r,e,t)=>{ei.setProgress(e/t),iv.test(r)&&!sv.test(r)&&ei.addImage(r)};requestAnimationFrame(()=>{const r=new nv({mount:document.querySelector("#app")});window.__APP__=r,r.world.controls.autoRotate=!1,r.world.waitForReady().then(()=>{ei.setReady()}),ei.onStart=()=>{var e;if(r.world.controls.autoRotate=!0,r.world.autoplayNarration=ei.autoplayNarration,!ei.extraInteractions){const t=(e=r.world.proximityReveal)==null?void 0:e.features;t&&(t.tapReveal=!1,t.edgeNoise=!1,t.goldRing=!1)}ei.hide()}});
