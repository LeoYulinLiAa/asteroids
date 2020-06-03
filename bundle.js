!function(t){var o={};function e(n){if(o[n])return o[n].exports;var i=o[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=t,e.c=o,e.d=function(t,o,n){e.o(t,o)||Object.defineProperty(t,o,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,o){if(1&o&&(t=e(t)),8&o)return t;if(4&o&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&o&&"string"!=typeof t)for(var i in t)e.d(n,i,function(o){return t[o]}.bind(null,i));return n},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},e.p="",e(e.s=4)}([function(t,o,e){e(1);function n({pos:t,vel:o,radius:e,color:n}){this.pos=t,this.vel=o,this.radius=e,this.color=n}n.prototype.draw=function(t){const[o,e]=this.pos;t.fillStyle=this.color,t.beginPath(),t.arc(o,e,this.radius,0,2*Math.PI),t.fill()},n.prototype.move=function(t){const[o,e]=this.pos,[n,i]=this.vel;this.pos=t([o+n,e+i])},n.prototype.isWrappable=!0,t.exports=n},function(t,o,e){const n=e(6),i=e(7),s=(e(0),e(3)),r=function(){this.movingObjects=new Set;for(let t=0;t<r.NUM_ASTEROIDS;t++){const t=this.randomPostion(),o=new n({pos:t});this.add(o)}const t=this.randomPostion();this.ship=new i({pos:t},this),this.bullets=new Set};r.prototype.add=function(t){t instanceof n?this.movingObjects.add(t):t instanceof s&&this.bullets.add(t)},r.prototype.remove=function(t){t instanceof n?this.movingObjects.delete(t):t instanceof s&&this.bullets.delete(t)},r.prototype.randomPostion=function(){return[Math.random()*r.DIM_X,Math.random()*r.DIM_Y]},r.prototype.draw=function(t){t.clearRect(0,0,r.DIM_X,r.DIM_Y),this.allObjects().forEach(o=>o.draw(t))},r.prototype.moveObjects=function(){this.allObjects().forEach(t=>{t.isWrappable?t.move(this.wrap):t.move(o=>(this.isOutOfBounds(o)&&this.remove(t),o))})},r.prototype.wrap=function([t,o]){return[(t+r.DIM_X)%r.DIM_X,(o+r.DIM_Y)%r.DIM_Y]},r.prototype.checkCollisions=function(){this.movingObjects.forEach(t=>{this.ship.isCollidedWith(t)&&(this.relocate(this.ship),this.ship.reset())}),this.bullets.forEach(t=>{this.movingObjects.forEach(o=>{t.isCollidedWith(o)&&(this.remove(o),this.remove(t))})})},r.prototype.step=function(){this.moveObjects(),this.checkCollisions()},r.prototype.relocate=function(t){t.pos=this.randomPostion()},r.prototype.allObjects=function(){return[...this.movingObjects,this.ship,...this.bullets]},r.prototype.isOutOfBounds=function(t){const[o,e]=t;return o>r.DIM_X||o<0||e>r.DIM_Y||e<0},r.DIM_X=768,r.DIM_Y=512,r.NUM_ASTEROIDS=10,t.exports=r},function(t,o){const e={inherits(t,o){const e=function(){};e.prototype=o.prototype,t.prototype=new e,t.prototype.constructor=t},randomVec(t){const o=2*Math.PI*Math.random();return e.scale([Math.sin(o),Math.cos(o)],t)},scale:(t,o)=>[t[0]*o,t[1]*o]};t.exports=e},function(t,o,e){const n=e(0),i=e(2),s=function({pos:t,vel:o}){n.call(this,{pos:t,vel:o,radius:s.RADIUS,color:s.COLOR}),this.isWrappable=!1};s.RADIUS=2,s.COLOR="white",i.inherits(s,n),s.prototype.isCollidedWith=function(t){const[o,e]=this.pos,[n,i]=t.pos;return Math.sqrt((o-n)**2+(e-i)**2)<this.radius+t.radius},t.exports=s},function(t,o,e){"use strict";e.r(o);e(8);const n=e(5);document.addEventListener("DOMContentLoaded",(function(){(new n).start()}))},function(t,o,e){const n=e(1),i=function(){const t=document.getElementById("app-container");this.game=new n;const o=document.createElement("canvas"),e=o.getContext("2d");this.dimension={width:n.DIM_X,height:n.DIM_Y};const i=window.devicePixelRatio;o.width=n.DIM_X*i,o.height=n.DIM_Y*i,o.id="main-canvas",e.scale(i,i),o.tabIndex=1,o.autofocus=!0,t.appendChild(o),this.context=e,this.canvas=o};i.prototype.start=function(){this.bindKeyHandlers(),setInterval(()=>{this.game.step(),this.game.draw(this.context)},20)},i.prototype.bindKeyHandlers=function(){key("W",()=>{this.game.ship.power([0,-1])}),key("S",()=>{this.game.ship.power([0,1])}),key("A",()=>{this.game.ship.power([-1,0])}),key("D",()=>{this.game.ship.power([1,0])}),key("space",()=>{this.game.ship.fireBullet()})},t.exports=i},function(t,o,e){const n=e(2),i=e(0),s=function({pos:t}){i.call(this,{pos:t,vel:n.randomVec(6*Math.random()+1),color:s.COLOR,radius:s.RADIUS})};s.COLOR="#666666",s.RADIUS=20,n.inherits(s,i),t.exports=s},function(t,o,e){const n=e(2),i=e(0),s=(e(1),e(3)),r=function({pos:t},o){i.call(this,{pos:t,radius:r.RADIUS,color:r.COLOR,vel:[0,0]}),this.game=o};r.RADIUS=15,r.COLOR="#31a5d9",n.inherits(r,i),r.prototype.reset=function(){this.vel=[0,0]},r.prototype.isCollidedWith=function(t){const[o,e]=this.pos,[n,i]=t.pos;return Math.sqrt((o-n)**2+(e-i)**2)<this.radius+t.radius},r.prototype.power=function(t){const[o,e]=this.vel,[n,i]=t;this.vel=[o+n,e+i]},r.prototype.fireBullet=function(){const t=this.pos,[o,e]=this.vel;if(0===o&&0===e)return;const n=new s({pos:t,vel:[5*o,5*e]});this.game.add(n)},t.exports=r},function(t,o,e){}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmluZ19vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9idWxsZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lX3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FzdGVyb2lkLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGlwLmpzIl0sIm5hbWVzIjpbImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwibW9kdWxlIiwiaSIsImwiLCJtb2R1bGVzIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiTW92aW5nT2JqZWN0IiwicG9zIiwidmVsIiwicmFkaXVzIiwiY29sb3IiLCJ0aGlzIiwiZHJhdyIsImNvbnRleHQiLCJ4IiwieSIsImZpbGxTdHlsZSIsImJlZ2luUGF0aCIsImFyYyIsIk1hdGgiLCJQSSIsImZpbGwiLCJtb3ZlIiwicG9zQ2FsbEJhY2siLCJkeCIsImR5IiwiaXNXcmFwcGFibGUiLCJBc3Rlcm9pZCIsIlNoaXAiLCJCdWxsZXQiLCJHYW1lIiwibW92aW5nT2JqZWN0cyIsIlNldCIsIk5VTV9BU1RFUk9JRFMiLCJyYW5kb21Qb3N0aW9uIiwiYXN0ZXJvaWQiLCJhZGQiLCJzaGlwIiwiYnVsbGV0cyIsInJlbW92ZSIsImRlbGV0ZSIsInJhbmRvbSIsIkRJTV9YIiwiRElNX1kiLCJjbGVhclJlY3QiLCJhbGxPYmplY3RzIiwiZm9yRWFjaCIsIm1vdmVPYmplY3RzIiwid3JhcCIsImlzT3V0T2ZCb3VuZHMiLCJjaGVja0NvbGxpc2lvbnMiLCJpc0NvbGxpZGVkV2l0aCIsInJlbG9jYXRlIiwicmVzZXQiLCJiIiwic3RlcCIsIlV0aWwiLCJDaGlsZENsYXNzIiwiUGFyZW50Q2xhc3MiLCJTdXJyb2dhdGUiLCJjb25zdHJ1Y3RvciIsImxlbmd0aCIsImRlZyIsInNjYWxlIiwic2luIiwiY29zIiwidmVjIiwiUkFESVVTIiwiQ09MT1IiLCJpbmhlcml0cyIsIm90aGVyT2JqZWN0IiwieDEiLCJ5MSIsIngyIiwieTIiLCJzcXJ0IiwiR2FtZVZpZXciLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGFydCIsImFwcENvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwiZ2FtZSIsImNhbnZhcyIsImNyZWF0ZUVsZW1lbnQiLCJnZXRDb250ZXh0IiwiZGltZW5zaW9uIiwid2lkdGgiLCJoZWlnaHQiLCJkcHIiLCJ3aW5kb3ciLCJkZXZpY2VQaXhlbFJhdGlvIiwiaWQiLCJ0YWJJbmRleCIsImF1dG9mb2N1cyIsImFwcGVuZENoaWxkIiwiYmluZEtleUhhbmRsZXJzIiwic2V0SW50ZXJ2YWwiLCJwb3dlciIsImZpcmVCdWxsZXQiLCJyYW5kb21WZWMiLCJpbXB1bHNlIiwiaXgiLCJpeSIsImJ1bGxldCJdLCJtYXBwaW5ncyI6ImFBQ0UsSUFBSUEsRUFBbUIsR0FHdkIsU0FBU0MsRUFBb0JDLEdBRzVCLEdBQUdGLEVBQWlCRSxHQUNuQixPQUFPRixFQUFpQkUsR0FBVUMsUUFHbkMsSUFBSUMsRUFBU0osRUFBaUJFLEdBQVksQ0FDekNHLEVBQUdILEVBQ0hJLEdBQUcsRUFDSEgsUUFBUyxJQVVWLE9BTkFJLEVBQVFMLEdBQVVNLEtBQUtKLEVBQU9ELFFBQVNDLEVBQVFBLEVBQU9E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QUFPNUQsSUFBSyxDQUFDLEVBQUUsS0FDOUVHLEtBQUt1RSxLQUFPQSxHQUdoQnRELEVBQUt1QyxPQUFTLEdBQ2R2QyxFQUFLd0MsTUFBUSxVQUNiWixFQUFLYSxTQUFTekMsRUFBTXRCLEdBRXBCc0IsRUFBSzFCLFVBQVVtRCxNQUFRLFdBQ3JCMUMsS0FBS0gsSUFBTSxDQUFDLEVBQUcsSUFPakJvQixFQUFLMUIsVUFBVWlELGVBQWlCLFNBQVNtQixHQUV2QyxNQUFPQyxFQUFJQyxHQUFNN0QsS0FBS0osS0FDZmtFLEVBQUlDLEdBQU1KLEVBQVkvRCxJQUM3QixPQUFPWSxLQUFLd0QsTUFBTUosRUFBS0UsSUFBTyxHQUFLRCxFQUFLRSxJQUFPLEdBQUsvRCxLQUFLRixPQUFTNkQsRUFBWTdELFFBR2hGbUIsRUFBSzFCLFVBQVVnRyxNQUFRLFNBQVNHLEdBQzlCLE1BQU83RSxFQUFJQyxHQUFNZCxLQUFLSCxLQUNmOEYsRUFBSUMsR0FBTUYsRUFDakIxRixLQUFLSCxJQUFNLENBQUNnQixFQUFLOEUsRUFBSTdFLEVBQUs4RSxJQUc1QjNFLEVBQUsxQixVQUFVaUcsV0FBYSxXQUUxQixNQUFNNUYsRUFBTUksS0FBS0osS0FDVmlCLEVBQUlDLEdBQU1kLEtBQUtILElBQ3RCLEdBQVcsSUFBUGdCLEdBQW1CLElBQVBDLEVBQVUsT0FDMUIsTUFDTStFLEVBQVMsSUFBSTNFLEVBQU8sQ0FBQ3RCLE1BQUtDLElBRHBCLENBQU0sRUFBTGdCLEVBQWEsRUFBTEMsS0FHckJkLEtBQUt1RSxLQUFLOUMsSUFBSW9FLElBSWhCbkksRUFBT0QsUUFBVXdELEciLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuIiwiY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vZ2FtZScpO1xuXG4vKipcbiAqIFxuICogQHBhcmFtIHt7cG9zOiBbbnVtYmVyLCBudW1iZXJdLCB2ZWw6IFtudW1iZXIsIG51bWJlcl0sIHJhZGl1czogbnVtYmVyLCBjb2xvcjogc3RyaW5nfX0gcGFyYW0wIG9wdGlvbiBvYmplY3RcbiAqIEBwYXJhbSB7R2FtZX0gZ2FtZVxuICovXG5mdW5jdGlvbiBNb3ZpbmdPYmplY3Qoe3BvcywgdmVsLCByYWRpdXMsIGNvbG9yfSkge1xuICB0aGlzLnBvcyA9IHBvcztcbiAgdGhpcy52ZWwgPSB2ZWw7XG4gIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICB0aGlzLmNvbG9yID0gY29sb3I7XG59XG5cbi8qKlxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcbiAqL1xuXG5Nb3ZpbmdPYmplY3QucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gIGNvbnN0IFt4LCB5XSA9IHRoaXMucG9zO1xuICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gIGNvbnRleHQuYXJjKFxuICAgIHgsIHksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSVxuICApO1xuICBjb250ZXh0LmZpbGwoKTtcbn07XG5cbk1vdmluZ09iamVjdC5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uKHBvc0NhbGxCYWNrKSB7XG4gIGNvbnN0IFt4LCB5XSA9IHRoaXMucG9zO1xuICBjb25zdCBbZHgsIGR5XSA9IHRoaXMudmVsO1xuICB0aGlzLnBvcyA9IHBvc0NhbGxCYWNrKFt4ICsgZHgsIHkgKyBkeV0pO1xufTtcblxuTW92aW5nT2JqZWN0LnByb3RvdHlwZS5pc1dyYXBwYWJsZSA9IHRydWU7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vdmluZ09iamVjdDsiLCJjb25zdCBBc3Rlcm9pZCA9IHJlcXVpcmUoXCIuL2FzdGVyb2lkLmpzXCIpO1xuY29uc3QgU2hpcCA9IHJlcXVpcmUoXCIuL3NoaXBcIik7XG5jb25zdCBNb3ZpbmdPYmplY3QgPSByZXF1aXJlKFwiLi9tb3Zpbmdfb2JqZWN0XCIpO1xuY29uc3QgQnVsbGV0ID0gcmVxdWlyZSgnLi9idWxsZXQnKTtcblxuY29uc3QgR2FtZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5tb3ZpbmdPYmplY3RzID0gbmV3IFNldCgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IEdhbWUuTlVNX0FTVEVST0lEUzsgaSsrKSB7XG4gICAgY29uc3QgcG9zID0gdGhpcy5yYW5kb21Qb3N0aW9uKCk7XG4gICAgY29uc3QgYXN0ZXJvaWQgPSBuZXcgQXN0ZXJvaWQoeyBwb3MgfSk7XG4gICAgdGhpcy5hZGQoYXN0ZXJvaWQpO1xuICB9XG4gIGNvbnN0IHBvcyA9IHRoaXMucmFuZG9tUG9zdGlvbigpO1xuICB0aGlzLnNoaXAgPSBuZXcgU2hpcCh7IHBvcyB9LCB0aGlzKTtcbiAgdGhpcy5idWxsZXRzID0gbmV3IFNldCgpO1xufVxuXG5HYW1lLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgaW5zdGFuY2VvZiBBc3Rlcm9pZCkge1xuICAgIHRoaXMubW92aW5nT2JqZWN0cy5hZGQob2JqZWN0KTtcbiAgfSBlbHNlIGlmIChvYmplY3QgaW5zdGFuY2VvZiBCdWxsZXQpIHtcbiAgICB0aGlzLmJ1bGxldHMuYWRkKG9iamVjdCk7XG4gIH1cbn1cblxuR2FtZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICBpZiAob2JqZWN0IGluc3RhbmNlb2YgQXN0ZXJvaWQpIHtcbiAgICB0aGlzLm1vdmluZ09iamVjdHMuZGVsZXRlKG9iamVjdCk7XG4gIH0gZWxzZSBpZiAob2JqZWN0IGluc3RhbmNlb2YgQnVsbGV0KSB7XG4gICAgdGhpcy5idWxsZXRzLmRlbGV0ZShvYmplY3QpO1xuICB9XG59XG5cblxuR2FtZS5wcm90b3R5cGUucmFuZG9tUG9zdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFsoTWF0aC5yYW5kb20oKSAqIEdhbWUuRElNX1gpLCAoTWF0aC5yYW5kb20oKSAqIEdhbWUuRElNX1kpXTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxuICovXG5HYW1lLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgR2FtZS5ESU1fWCwgR2FtZS5ESU1fWSk7XG4gIHRoaXMuYWxsT2JqZWN0cygpLmZvckVhY2gobyA9PiBvLmRyYXcoY29udGV4dCkpO1xufVxuXG5HYW1lLnByb3RvdHlwZS5tb3ZlT2JqZWN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5hbGxPYmplY3RzKCkuZm9yRWFjaChvID0+IHtcbiAgICBpZiAoby5pc1dyYXBwYWJsZSkge1xuICAgICAgby5tb3ZlKHRoaXMud3JhcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG8ubW92ZShwb3MgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKHBvcykpIHRoaXMucmVtb3ZlKG8pO1xuICAgICAgICByZXR1cm4gcG9zO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1tudW1iZXIsIG51bWJlcl19XG4gKiBAcmV0dXJucyB7W251bWJlciwgbnVtYmVyXX1cbiAqL1xuR2FtZS5wcm90b3R5cGUud3JhcCA9IGZ1bmN0aW9uIChbeCwgeV0pIHtcbiAgcmV0dXJuIFsoeCArIEdhbWUuRElNX1gpICUgR2FtZS5ESU1fWCwgKHkgKyBHYW1lLkRJTV9ZKSAlIEdhbWUuRElNX1ldO1xufVxuXG5HYW1lLnByb3RvdHlwZS5jaGVja0NvbGxpc2lvbnMgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubW92aW5nT2JqZWN0cy5mb3JFYWNoKG8gPT4ge1xuICAgIGlmICh0aGlzLnNoaXAuaXNDb2xsaWRlZFdpdGgobykpIHtcbiAgICAgIHRoaXMucmVsb2NhdGUodGhpcy5zaGlwKTtcbiAgICAgIHRoaXMuc2hpcC5yZXNldCgpO1xuICAgIH1cbiAgfSlcbiAgdGhpcy5idWxsZXRzLmZvckVhY2goYiA9PiB7XG4gICAgdGhpcy5tb3ZpbmdPYmplY3RzLmZvckVhY2gobyA9PiB7XG4gICAgICBpZiAoYi5pc0NvbGxpZGVkV2l0aChvKSkge1xuICAgICAgICB0aGlzLnJlbW92ZShvKTtcbiAgICAgICAgdGhpcy5yZW1vdmUoYik7XG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cblxuR2FtZS5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5tb3ZlT2JqZWN0cygpO1xuICB0aGlzLmNoZWNrQ29sbGlzaW9ucygpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7TW92aW5nT2JqZWN0fSBvYmplY3RcbiAqL1xuR2FtZS5wcm90b3R5cGUucmVsb2NhdGUgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gIG9iamVjdC5wb3MgPSB0aGlzLnJhbmRvbVBvc3Rpb24oKTtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7QXJyYXk8TW92aW5nT2JqZWN0Pn1cbiAqL1xuR2FtZS5wcm90b3R5cGUuYWxsT2JqZWN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFsuLi50aGlzLm1vdmluZ09iamVjdHMsIHRoaXMuc2hpcCwgLi4udGhpcy5idWxsZXRzXTtcbn1cblxuR2FtZS5wcm90b3R5cGUuaXNPdXRPZkJvdW5kcyA9IGZ1bmN0aW9uKHBvcykge1xuICBjb25zdCBbeCwgeV0gPSBwb3M7XG4gIHJldHVybiB4ID4gR2FtZS5ESU1fWCB8fCB4IDwgMCB8fCB5ID4gR2FtZS5ESU1fWSB8fCB5IDwgMDtcbn1cblxuR2FtZS5ESU1fWCA9IDc2ODtcbkdhbWUuRElNX1kgPSA1MTI7XG5HYW1lLk5VTV9BU1RFUk9JRFMgPSAxMDtcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsImNvbnN0IFV0aWwgPSB7XG4gIGluaGVyaXRzKENoaWxkQ2xhc3MsIFBhcmVudENsYXNzKSB7XG4gICAgY29uc3QgU3Vycm9nYXRlID0gZnVuY3Rpb24oKSB7fTtcbiAgICBTdXJyb2dhdGUucHJvdG90eXBlID0gUGFyZW50Q2xhc3MucHJvdG90eXBlO1xuICAgIENoaWxkQ2xhc3MucHJvdG90eXBlID0gbmV3IFN1cnJvZ2F0ZSgpO1xuICAgIENoaWxkQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ2hpbGRDbGFzcztcbiAgfSxcbiAgcmFuZG9tVmVjKGxlbmd0aCkge1xuICAgIGNvbnN0IGRlZyA9IDIgKiBNYXRoLlBJICogTWF0aC5yYW5kb20oKTtcbiAgICByZXR1cm4gVXRpbC5zY2FsZShbTWF0aC5zaW4oZGVnKSwgTWF0aC5jb3MoZGVnKV0sIGxlbmd0aCk7XG4gIH0sXG4gIC8vIFNjYWxlIHRoZSBsZW5ndGggb2YgYSB2ZWN0b3IgYnkgdGhlIGdpdmVuIGFtb3VudC5cbiAgc2NhbGUodmVjLCBtKSB7XG4gICAgcmV0dXJuIFt2ZWNbMF0gKiBtLCB2ZWNbMV0gKiBtXTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBVdGlsOyIsImNvbnN0IE1vdmluZ09iamVjdCA9IHJlcXVpcmUoJy4vbW92aW5nX29iamVjdCcpO1xuY29uc3QgVXRpbCA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuXG5jb25zdCBCdWxsZXQgPSBmdW5jdGlvbih7cG9zLCB2ZWx9KSB7XG4gIE1vdmluZ09iamVjdC5jYWxsKHRoaXMsIHtwb3MsIHZlbCwgcmFkaXVzOiBCdWxsZXQuUkFESVVTLCBjb2xvcjogQnVsbGV0LkNPTE9SfSk7XG4gIHRoaXMuaXNXcmFwcGFibGUgPSBmYWxzZTtcbn1cblxuQnVsbGV0LlJBRElVUyA9IDI7XG5CdWxsZXQuQ09MT1IgPSBcIndoaXRlXCI7XG5cblV0aWwuaW5oZXJpdHMoQnVsbGV0LCBNb3ZpbmdPYmplY3QpO1xuXG5CdWxsZXQucHJvdG90eXBlLmlzQ29sbGlkZWRXaXRoID0gZnVuY3Rpb24ob3RoZXJPYmplY3QpIHtcbiAgY29uc3QgW3gxLCB5MV0gPSB0aGlzLnBvcztcbiAgY29uc3QgW3gyLCB5Ml0gPSBvdGhlck9iamVjdC5wb3M7XG4gIHJldHVybiBNYXRoLnNxcnQoKHgxIC0geDIpICoqIDIgKyAoeTEgLSB5MikgKiogMikgPCB0aGlzLnJhZGl1cyArIG90aGVyT2JqZWN0LnJhZGl1cztcbn1cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gQnVsbGV0OyIsImNvbnN0IEdhbWVWaWV3ID0gcmVxdWlyZShcIi4vZ2FtZV92aWV3XCIpO1xuaW1wb3J0ICcuLi9jc3Mvc3R5bGUuc2Nzcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZVZpZXcoKTtcbiAgICBnYW1lLnN0YXJ0KCk7XG59KVxuXG4iLCJjb25zdCBHYW1lID0gcmVxdWlyZShcIi4vZ2FtZVwiKTtcblxuY29uc3QgR2FtZVZpZXcgPSBmdW5jdGlvbigpIHtcblxuICBjb25zdCBhcHBDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcC1jb250YWluZXJcIik7XG5cbiAgdGhpcy5nYW1lID0gbmV3IEdhbWUoKTtcblxuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgdGhpcy5kaW1lbnNpb24gPSB7IHdpZHRoOiBHYW1lLkRJTV9YLCBoZWlnaHQ6IEdhbWUuRElNX1kgfVxuICBjb25zdCBkcHIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgY2FudmFzLndpZHRoID0gR2FtZS5ESU1fWCAqIGRwcjtcbiAgY2FudmFzLmhlaWdodCA9IEdhbWUuRElNX1kgKiBkcHI7XG4gIGNhbnZhcy5pZCA9IFwibWFpbi1jYW52YXNcIjtcbiAgY29udGV4dC5zY2FsZShkcHIsIGRwcik7XG4gIGNhbnZhcy50YWJJbmRleCA9IDE7XG4gIGNhbnZhcy5hdXRvZm9jdXMgPSB0cnVlO1xuICBhcHBDb250YWluZXIuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcblxufVxuXG5HYW1lVmlldy5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5iaW5kS2V5SGFuZGxlcnMoKTtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIHRoaXMuZ2FtZS5zdGVwKCk7XG4gICAgdGhpcy5nYW1lLmRyYXcodGhpcy5jb250ZXh0KTtcbiAgfSwgMjApO1xufVxuXG5HYW1lVmlldy5wcm90b3R5cGUuYmluZEtleUhhbmRsZXJzID0gZnVuY3Rpb24oKSB7XG4gIGtleSgnVycsICgpID0+IHtcbiAgICB0aGlzLmdhbWUuc2hpcC5wb3dlcihbMCwgLTFdKTtcbiAgfSlcbiAga2V5KCdTJywgKCkgPT4ge1xuICAgIHRoaXMuZ2FtZS5zaGlwLnBvd2VyKFswLCAxXSk7XG4gIH0pXG4gIGtleSgnQScsICgpID0+IHtcbiAgICB0aGlzLmdhbWUuc2hpcC5wb3dlcihbLTEsIDBdKTtcbiAgfSlcbiAga2V5KCdEJywgKCkgPT4ge1xuICAgIHRoaXMuZ2FtZS5zaGlwLnBvd2VyKFsxLCAwXSk7XG4gIH0pXG4gIGtleShcInNwYWNlXCIsICgpID0+IHtcbiAgICAgIHRoaXMuZ2FtZS5zaGlwLmZpcmVCdWxsZXQoKTtcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lVmlldzsiLCJjb25zdCBVdGlsID0gcmVxdWlyZSgnLi91dGlscycpXG5jb25zdCBNb3ZpbmdPYmplY3QgPSByZXF1aXJlKCcuL21vdmluZ19vYmplY3QnKTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHt7cG9zOiBbbnVtYmVyLCBudW1iZXJdfX0gcGFyYW0wIG9wdGlvbnNcbiAqL1xuY29uc3QgQXN0ZXJvaWQgPSBmdW5jdGlvbiAoeyBwb3MgfSkge1xuICBNb3ZpbmdPYmplY3QuY2FsbCh0aGlzLCB7XG4gICAgcG9zLFxuICAgIHZlbDogVXRpbC5yYW5kb21WZWMoTWF0aC5yYW5kb20oKSAqIDYgKyAxKSxcbiAgICBjb2xvcjogQXN0ZXJvaWQuQ09MT1IsXG4gICAgcmFkaXVzOiBBc3Rlcm9pZC5SQURJVVNcbiAgfSlcbn07XG5cbkFzdGVyb2lkLkNPTE9SID0gXCIjNjY2NjY2XCI7XG5Bc3Rlcm9pZC5SQURJVVMgPSAyMDtcblxuVXRpbC5pbmhlcml0cyhBc3Rlcm9pZCwgTW92aW5nT2JqZWN0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBc3Rlcm9pZDsiLCJjb25zdCBVdGlsID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5jb25zdCBNb3ZpbmdPYmplY3QgPSByZXF1aXJlKFwiLi9tb3Zpbmdfb2JqZWN0XCIpO1xuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vZ2FtZScpO1xuY29uc3QgQnVsbGV0ID0gcmVxdWlyZSgnLi9idWxsZXQnKTtcblxuLyoqXG4gKiBcbiAqIEBwYXJhbSB7e3BvczogW251bWJlciwgbnVtYmVyXX19IHBhcmFtMCBvcHRpb25zXG4gKiBAcGFyYW0ge0dhbWV9IGdhbWUgXG4gKi9cbmNvbnN0IFNoaXAgPSBmdW5jdGlvbih7cG9zfSwgZ2FtZSkge1xuICAgIE1vdmluZ09iamVjdC5jYWxsKHRoaXMsIHtwb3MsIHJhZGl1czogU2hpcC5SQURJVVMsIGNvbG9yOiBTaGlwLkNPTE9SLCB2ZWw6IFswLDBdfSk7XG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcbn1cblxuU2hpcC5SQURJVVMgPSAxNTtcblNoaXAuQ09MT1IgPSBcIiMzMWE1ZDlcIjtcblV0aWwuaW5oZXJpdHMoU2hpcCwgTW92aW5nT2JqZWN0KVxuXG5TaGlwLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnZlbCA9IFswLCAwXTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge01vdmluZ09iamVjdH0gb3RoZXJPYmplY3RcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5TaGlwLnByb3RvdHlwZS5pc0NvbGxpZGVkV2l0aCA9IGZ1bmN0aW9uKG90aGVyT2JqZWN0KSB7XG5cbiAgY29uc3QgW3gxLCB5MV0gPSB0aGlzLnBvcztcbiAgY29uc3QgW3gyLCB5Ml0gPSBvdGhlck9iamVjdC5wb3M7XG4gIHJldHVybiBNYXRoLnNxcnQoKHgxIC0geDIpICoqIDIgKyAoeTEgLSB5MikgKiogMikgPCB0aGlzLnJhZGl1cyArIG90aGVyT2JqZWN0LnJhZGl1cztcbn07XG5cblNoaXAucHJvdG90eXBlLnBvd2VyID0gZnVuY3Rpb24oaW1wdWxzZSkge1xuICBjb25zdCBbZHgsIGR5XSA9IHRoaXMudmVsO1xuICBjb25zdCBbaXgsIGl5XSA9IGltcHVsc2U7XG4gIHRoaXMudmVsID0gW2R4ICsgaXgsIGR5ICsgaXldO1xufVxuXG5TaGlwLnByb3RvdHlwZS5maXJlQnVsbGV0ID0gZnVuY3Rpb24oKSB7XG5cbiAgY29uc3QgcG9zID0gdGhpcy5wb3M7XG4gIGNvbnN0IFtkeCwgZHldID0gdGhpcy52ZWw7XG4gIGlmIChkeCA9PT0gMCAmJiBkeSA9PT0gMCkgcmV0dXJuO1xuICBjb25zdCB2ZWwgPSBbZHggKiA1LCBkeSAqIDVdO1xuICBjb25zdCBidWxsZXQgPSBuZXcgQnVsbGV0KHtwb3MsIHZlbH0pO1xuICBcbiAgdGhpcy5nYW1lLmFkZChidWxsZXQpO1xuICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwOyJdLCJzb3VyY2VSb290IjoiIn0=