// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/extendsHelper ../../../lib/glMatrix ../../util ./PinchNavigationBase ./MomentumNavigationLocal".split(" "),function(n,f,r,a,p,t,u){var l;(function(a){a[a.Horizontal=0]="Horizontal";a[a.Vertical=1]="Vertical"})(l=f.PanMode||(f.PanMode={}));var v=20/180*Math.PI,q=a.vec3d.createFrom(0,0,1);n=function(f){function m(c,e){var b=f.call(this,c,e)||this;b.view=c;b._rotation={valueSmooth:new p.ExponentialFalloff(.05)};b._scaling={valueSmooth:new p.ExponentialFalloff(.05)};
b._planeHorizontal={normal:a.vec3d.create(),distance:0};b._planeVertical={normal:a.vec3d.create(),distance:0};b._beginCenterHorizontal=a.vec3d.create();b._beginCenterVertical=a.vec3d.create();b._tmpPoints=[];b._tmpPickPointScreen=a.vec2.create();b._tmpPickPointScene=a.vec3d.create();b._tmpBwd=a.vec3d.create();b._tmpUp=a.vec3d.create();b._tmpD=a.vec3d.create();b._tmpC3=a.vec3d.create();b._tmpC2=a.vec2.create();b._momentumNavigation=new u.MomentumNavigationLocal(b,e);return b}r(m,f);Object.defineProperty(m.prototype,
"momentum",{get:function(){return this._momentumNavigation},enumerable:!0,configurable:!0});m.prototype.onNavigationBegin=function(c){var e=this._helper,b=this._tmpPickPointScreen,g=this._tmpPickPointScene;this._rotation.valueSmooth.reset();this._scaling.valueSmooth.reset();a.vec2.set2(c.data.currentState.center.x,this.view.height-c.data.currentState.center.y,b);this._planeHorizontal.distance=0;a.vec3d.set(q,this._planeHorizontal.normal);e.picker.pickPointInScreen(b,g)||e.picker.pickFreePointInScreen(b,
g);b=this._tmpBwd;a.vec3d.negate(this.beginCamera.viewForward,b);var d=this._tmpUp;a.vec3d.set(q,d);var h=a.vec3d.dot(b,d);this._mode=Math.asin(0>h?-h:h)>=v?l.Horizontal:l.Vertical;this._planeHorizontal.distance=a.vec3d.dot(this._planeHorizontal.normal,g);0>a.vec3d.dot(this._planeHorizontal.normal,this.beginCamera.eye)-this._planeHorizontal.distance&&(a.vec3d.negate(this._planeHorizontal.normal),this._planeHorizontal.distance*=-1);this._mode===l.Vertical&&(a.vec3d.scale(d,h),a.vec3d.subtract(b,d,
this._planeVertical.normal),a.vec3d.normalize(this._planeVertical.normal),this._planeVertical.distance=a.vec3d.dot(this._planeVertical.normal,g),this.computePlanePoints(c,"currentEvent",this._planeVertical,this.beginCamera,this._tmpPoints),e.planar.computePointCenter(this._tmpPoints,this._beginCenterVertical));this.computePlanePoints(c,"currentEvent",this._planeHorizontal,this.beginCamera,this._tmpPoints);e.planar.computePointCenter(this._tmpPoints,this._beginCenterHorizontal)};m.prototype.onNavigationUpdate=
function(c,e){var b=this._helper,g=1<c.data.pointers.length,d=this._mode===l.Horizontal?this._planeHorizontal:this._planeVertical,h=this._mode===l.Horizontal?this._beginCenterHorizontal:this._beginCenterVertical;if(g){var f=c.data.startState.radius/c.data.currentState.radius,k=.001875*Math.min(Math.max(c.data.currentState.radius,40),120);this._scaling.valueSmooth.gain=k;this._scaling.valueSmooth.update(f);b.planar.applyZoom(d,this.view,e,h,this._scaling.valueSmooth.value);this.momentum.addScaleValue(this._scaling.valueSmooth.value,
d,h)}k=this._tmpC3;this.computePlanePoints(c,"currentEvent",d,e,this._tmpPoints);b.planar.computePointCenter(this._tmpPoints,k);d=this._tmpD;a.vec3d.subtract(k,h,d);a.vec3d.subtract(e.eye,d);a.vec3d.subtract(e.center,d);e.markViewDirty();f=this._tmpC2;a.vec2.set2(c.data.currentState.center.x,c.data.currentState.center.y,f);this.momentum.addPanValue(f,k,d);g&&(g=this._planeHorizontal.normal,a.vec3d.set(this._planeHorizontal.normal,g),k=c.data.currentState.angle,d=this._rotation.valueSmooth.value,f=
b.normalizeRotationDelta(k-d),k=.00125*Math.min(Math.max(c.data.currentState.radius,40),120),this._rotation.valueSmooth.gain=k,this._rotation.valueSmooth.update(d+f),c=this._rotation.valueSmooth.value,this.momentum.addRotationValue(h,g,c),b.applyRotation(e,h,g,c))};m.prototype.onNavigationEnd=function(a){};return m}(t.PinchNavigationBase);f.PinchNavigationLocal=n});