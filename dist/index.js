"use strict";var u=function(e,r){return function(){return r||e((r={exports:{}}).exports,r),r.exports}};var l=u(function(G,p){
var R=require("path").resolve,W=require('@stdlib/fs-read-wasm/dist').sync,A=W(R(__dirname,"..","src","main.wasm"));p.exports=A
});var v=u(function(H,m){
var O=require('@stdlib/assert-is-wasm-memory/dist'),y=require('@stdlib/utils-define-nonenumerable-read-only-property/dist'),S=require('@stdlib/utils-inherit/dist'),q=require('@stdlib/wasm-module-wrapper/dist'),g=require('@stdlib/error-tools-fmtprodmsg/dist'),j=l();function n(e){if(!(this instanceof n))return new n(e);if(!O(e))throw new TypeError(g('nullH0',e));return q.call(this,j,e,{env:{memory:e}}),this}S(n,q);y(n.prototype,"main",function(r,i,t){return this._instance.exports.c_dnrm2(r,i,t)});y(n.prototype,"ndarray",function(r,i,t,o){return this._instance.exports.c_dnrm2_ndarray(r,i,t,o)});m.exports=n
});var w=u(function(I,h){
var f=require('@stdlib/utils-define-nonenumerable-read-only-property/dist'),z=require('@stdlib/utils-inherit/dist'),B=require('@stdlib/strided-base-stride2offset/dist'),E=require('@stdlib/wasm-memory/dist'),T=require('@stdlib/wasm-base-arrays2ptrs/dist'),V=require('@stdlib/wasm-base-strided2object/dist'),d=v();function a(){return this instanceof a?(d.call(this,new E({initial:0})),this):new a}z(a,d);f(a.prototype,"main",function(r,i,t){return this.ndarray(r,i,t,B(r,t))});f(a.prototype,"ndarray",function(r,i,t,o){var c,s;return c=T(this,[V(r,i,t,o)]),s=c[0],d.prototype.ndarray.call(this,r,s.ptr,s.stride,s.offset)});h.exports=a
});var _=u(function(J,x){
var k=w(),M=new k;M.initializeSync();x.exports=M
});var C=require('@stdlib/utils-define-nonenumerable-read-only-property/dist'),b=_(),D=v();C(b,"Module",D);module.exports=b;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
