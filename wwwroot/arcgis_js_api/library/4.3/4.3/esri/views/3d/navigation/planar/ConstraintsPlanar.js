// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define("../mixins/ConstraintsMixin ../../support/mathUtils ../../support/earthUtils ../../support/RenderCoordsHelper ../../constraints/SceneViewTiltConstraint ../../lib/glMatrix ../../webgl-engine/lib/Util ../../../../geometry/support/scaleUtils".split(" "),function(f,h,q,w,r,t,x,y){var e=t.vec3d,u=t.vec4d,v=u.create(),k=e.create(),l=e.create();return f.createSubclass({declaredClass:"esri.views.3d.navigation.planar.ConstraintsPlanar",defaultConstraints:{tilt:new f.Tilt({min:function(){return h.deg2rad(r.MAX_DEFAULT)},
max:h.makePiecewiseLinearFunction([[4E3,h.deg2rad(r.MIN_DEFAULT)],[1E4,h.deg2rad(88)],[6E6,h.deg2rad(88)]])}),altitude:new f.Altitude({min:function(b){return b._autoAltitudeConstraints.min},max:function(b){return b._autoAltitudeConstraints.max}}),collision:new f.Collision},_updateAutoAltitudeConstraints:function(b){var a=Math.max(b.xmax-b.xmin,b.ymax-b.ymin);b.hasZ&&(a=Math.max(a,b.zmax-b.zmin));a=3*a/Math.atan((this._targetCameraBeforeElevationUpdate||this.targetCamera)._fov/2);b=y.getUnitValueForSR(b.spatialReference);
this._autoAltitudeConstraints.min=0;this._autoAltitudeConstraints.max=a*b},limitAltitude:function(b,a,c,e){return this.constraints.altitude.apply(this,b)},limitTiltByAltitudeConstraints:function(b,a,c,e){return b},distanceToSilhouette:function(b,a,c,p,d){d||(d={maxFarNearRatio:0,distance:0});d.maxFarNearRatio=this.maxFarNearRatio;var n=w.Planar.prototype.getAltitude(b.eye),m=n*=c;p=n-p;var g=this.elevationProvider?this.elevationProvider.getElevationBounds():null;g&&(n=0<=p?m-c*g[0]:c*g[1]-m);m=Math.max(a.xmax-
a.xmin,a.ymax-a.ymin,8*Math.max(a.xmax-a.xmin,a.ymax-a.ymin));e.subtract(b.center,b.eye,l);k[0]=0<l[0]?a.xmax:a.xmin;k[1]=0<l[1]?a.ymax:a.ymin;k[2]=0<l[2]?m/2:-m/2;e.subtract(k,b.eye);e.normalize(l);b=1.1*e.dot(k,l)*c;g=n+q.earthRadius;g=Math.sqrt(g*g-q.earthRadius*q.earthRadius);a=Math.max(a.xmax-a.xmin,a.ymax-a.ymin);var f=1E-4*a*c;c=h.clamp((n-f)/(.001*a*c-f),0,1);d.distance=h.lerp(g,b,c*c*c);d.maxFarNearRatio=2E4;d.distance*=Math.max(Math.log(Math.abs(p)),1);d.distance=Math.min(d.distance,Math.max(34064E4,
m));return d},intersectManifold:function(b,a,c,f){var d=this.renderCoordsHelper.worldUp;u.set4(d[0],d[1],d[2],c,v);return!x.rayPlane(b,a,v,f)||0>e.dot(e.subtract(f,b,k),a)?!1:!0},getFallbackCenterAlongViewDirection:function(b,a,c){e.set(a,c)}})});