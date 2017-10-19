// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/accessorSupport/decorators ../../../core/Logger ./graphics/Graphics3DLayerViewCore ./support/LayerViewUpdatingPercentage ../../layers/LayerView ../../../Graphic ../../../geometry/Point ../../../geometry/Polygon ../../../geometry/Polyline ../../../renderers/support/renderingInfoUtils ../../../core/Collection ../../../core/HandleRegistry ../../../core/promiseUtils ../lib/glMatrix ./i3s/I3SUtil ./i3s/I3SBinaryReader ../support/PreallocArray ../support/projectionUtils ../support/aaBoundingBox".split(" "),
function(g,ga,P,p,h,Q,R,S,T,G,U,V,W,X,Y,Z,y,aa,C,ba,M,ca,t){function da(d,b){d.xmin-=b;d.ymin-=b;d.xmax+=b;d.ymax+=b;d.hasZ&&(d.zmin-=b,d.zmax+=b);d.hasM&&(d.mmin-=b,d.mmax+=b);return d}var ea=Q.getLogger("esri.layers.SceneService");g=function(d){function b(a){a=d.call(this)||this;a._isUpdating=!1;a._nodesAddedToStage={};a.loadedGraphics=new Y;a.supportsDraping=!0;a._overlayUpdating=null;a._controllerCreated=!1;a._handles=new Z;return a}P(b,d);b.prototype.initialize=function(){var a=this;C.checkSpatialReferences(this.layer,
this.view.spatialReference,this.view.viewingMode);this._handles.add([this.layer.watch("renderer",function(c,k){return a._rendererChange(c,k)}),this.layer.watch("objectIdFilter",function(){return a._objectIdFilterChange()})]);this._layerViewCore=new R({owner:this,layer:this.layer,spatialIndexRequired:!1,labelingEnabled:!0,frustumVisibilityEnabled:!1,elevationAlignmentEnabled:!0,verticalScaleEnabled:!0,updateSuspendResumeExtent:function(){return a._updateSuspendResumeExtent()},updateClippingExtent:function(c){return a._updateClippingExtent(c)},
elevationChanged:function(c,k,H){return a._elevationChanged(c,k,H)}});this.addResolvingPromise(this._layerViewCore.initialize());this.drawingOrder=this.view.getDrawingOrder(this.layer.uid);this._createController()};b.prototype.destroy=function(){this._layerViewCore&&(this._layerViewCore.destroy(),this._layerViewCore=null);this._controller&&(this._controller.destroy(),this._controller=null);this._nodesAddedToStage=this._intersectingGraphicIds=this._elevationUpdateNodes=null;this._nodeDebugVisualizer&&
(this._nodeDebugVisualizer.dispose(),this._nodeDebugVisualizer=null);this._handles&&(this._handles.destroy(),this._handles=null)};Object.defineProperty(b.prototype,"hasDraped",{get:function(){return this._layerViewCore.graphicsCore.hasDraped},enumerable:!0,configurable:!0});b.prototype.whenGraphicAttributes=function(a,c){var k=this;return C.whenGraphicAttributes(this.layer,[a],this._getObjectIdField(),c,function(){var c=k._findGraphicNodeAndIndex(a.uid);return{node:c.node,indices:[c.index]}}).then(function(a){return a[0]})};
b.prototype.getGraphicsFromStageObject=function(a,c){if(!this.loadedGraphics)return y.reject();var k=a.getMetadata().graphicId;a=this.loadedGraphics.find(function(a){return a.uid===k});c=this._getObjectIdField();return a&&a.attributes&&a.attributes[c]?y.resolve(a):y.reject()};b.prototype.whenGraphicBounds=function(a){return this._layerViewCore.graphicsCore.whenGraphicBounds(a)};b.prototype.canResume=function(){return this.inherited(arguments)&&(!this._controller||this._controller.rootNodeVisible)};
b.prototype.isUpdating=function(){return this._isUpdating?!0:!(!this._controller||!this._controller.updating)};b.prototype.getRenderingInfo=function(a){if((a=X.getRenderingInfo(a,{renderer:this.layer.renderer}))&&a.color){var c=a.color;c[0]/=255;c[1]/=255;c[2]/=255}return a};b.prototype.getSymbolUpdateType=function(){return this._layerViewCore.graphicsCore.getSymbolUpdateType()};b.prototype._findGraphicNodeAndIndex=function(a){for(var c=0,k=Object.keys(this._nodesAddedToStage);c<k.length;c++)for(var b=
k[c],e=this._nodesAddedToStage[b].bundles,f=0;f<e.length;f++)for(var q=e[f],d=0;d<q.length;d++)if(q[d].graphics.some(function(c){return c.uid===a}))return{node:this._controller.nodeIndex[b],nodeId:b,bundleNr:f,index:d};return null};b.prototype._elevationChanged=function(a,c,k){t[2]=-Infinity;t[3]=Infinity;var b=t.fromRect(fa,a);null==this._elevationUpdateNodes&&(this._elevationUpdateNodes=new M(10));a=this._elevationUpdateNodes;a.clear();this._controller&&this._controller.updateElevationChanged(b,
c,a);c=a.length;this._intersectingGraphicIds||(this._intersectingGraphicIds=new M(10));b=this._intersectingGraphicIds;b.clear();for(var e=0;e<c;e++){var f=this._nodesAddedToStage[a.data[e].id];if(null!=f)for(var f=f.bundles,d=0;d<f.length;d++)for(var N=f[d],g=0;g<N.length;g++)for(var O=N[g].graphics,h=0;h<O.length;h++)b.push(O[h].uid)}k(this._intersectingGraphicIds.data,this._intersectingGraphicIds.length)};b.prototype._evaluateUpdatingState=function(){var a;a=0+this._layerViewCore.elevationAlignment.numNodesUpdating();
a+=this._layerViewCore.graphicsCore.numNodesUpdating();var c;c=(c=(c=!this._controllerCreated)||this._overlayUpdating)||this._layerViewCore.graphicsCore.needsIdleUpdate();a=0<a||c;this._isUpdating!==a&&(this._isUpdating=a,this.notifyChange("updating"))};b.prototype._notifySuspendedChange=function(){};b.prototype._notifyDrapedDataChange=function(){this.notifyChange("hasDraped");this.emit("draped-data-change")};b.prototype._createController=function(){var a=this,c={addBundle:this._addBundle.bind(this),
isBundleAlreadyAddedToStage:function(c,b){return a._isBundleAlreadyAddedToStage(c,b)},isOverMemory:function(){return a._isOverMemory()},removeNodeData:function(c){return a._removeNodeData(c)},removeFeatures:function(c,b){return a._removeFeatures(c,b)},getAddedFeatures:function(c){return a._getAddedFeatures(c)},getAddedNodeIDs:function(){return a._getAddedNodeIDs()},areAllBundlesLoaded:function(c){return a._areAllBundlesLoaded(c)},wholeNodeSwitchEnabled:!0};this.layer.createGraphicsController({layerView:this,
layerViewRequiredFunctions:c,layerViewOptionalFunctions:{traversalOptions:{initDepthFirst:!1,neighborhood:!1,perLevelTraversal:!0,allowPartialOverlaps:!1,errorMetricPreference:["distanceRangeFromDefaultCamera","screenSpaceRelative"],elevationInfo:this.layer.elevationInfo},getAllAddedFeatures:function(){return a._getAllAddedFeatures()},_nodeDebugVisualizer:this._nodeDebugVisualizer,getLoadedAttributes:function(c){return a._getLoadedAttributes(c)},setAttributeData:function(c,b,d){return a._setAttributeData(c,
b,d)}}}).then(function(c){a._controller=c;c.watch("rootNodeVisible",function(){a.notifyChange("suspended")})}).always(function(){a._controllerCreated=!0;a.notifyChange("updating")})};b.prototype._getAllAddedFeatures=function(){var a={};this.loadedGraphics.forEach(function(c){a[c._nodeId]=c._features});return a};b.prototype._addBundle=function(a,c,b,d,e,f,q){f=this._controller.crsIndex;var k=[],H=this._getObjectIdField();null==this._nodesAddedToStage[a.id]&&(this._nodesAddedToStage[a.id]={bundles:[],
attributeData:b?b.attributeData:null,loadedAttributes:b?b.loadedAttributes:null});this._nodesAddedToStage[a.id].bundles[q]=k;if(null==c)null!=e&&e.done();else{var g;if(this.layer.objectIdFilter){var h=this.layer.objectIdFilter.ids,p="include"===this.layer.objectIdFilter.method;g=function(a){return 0<=h.indexOf(a)===p}}b=this.layer.fullExtent&&da(this.layer.fullExtent.clone(),.5);for(var t=[],y=0;y<c.length;y++)for(var B=c[y],I=B.featureDataPositions[0],D=0;D<B.geometries.length;D++){var z=[],m=B.features[D<
B.features.length?D:0],v=m?{}:null;if(m&&m.id){if(g&&!g(m.id))continue;v[H]=m.id}var r=B.geometries[D],u=r.params.type,n=m=void 0;if("ArrayBufferView"===r.type){n=r.params.vertexAttributes.position;if(null==n)continue;m=new ba.valueType2TypedArrayClassMap[n.valueType](d[a.geometryData[q].hrefConcat],n.byteOffset,n.count*n.valuesPerElement);n=n.valuesPerElement}else"Embedded"===r.type&&(m=r.params.vertexAttributes.position,n=3);var w=void 0;if("lines"===u){for(var r=[],l=0;l<m.length;l+=n)r.push([m[l]+
a.mbs[0],m[l+1]+a.mbs[1]]);u=new W(f);u.addPath(r);w=u;z.push(new G(w,null,v))}else if("points"===u)for(l=0;l<m.length;l+=n)w=new U({x:m[l]+I[0],y:m[l+1]+I[1],z:2<n?m[l+2]+I[2]:void 0,spatialReference:f}),b&&!b.contains(w)&&ea.error("Service Error: Point coordinates outside of layer extent"),z.push(new G(w,null,v));else if("polygon"===u){w=u=new V(f);u._outlineSegments=[];for(var J=0;J<r.params.rings.length;J++){for(var A=r.params.rings[J],E=A.start,C=[],K=[],x=[-1,-1],F=0;F<A.segments.length;F+=
2){var l=A.segments[F+0],L=A.segments[F+1];0===l||1===l?(-1===x[0]&&(x[0]=E-A.start),x[1]=E+L-A.start):-1!==x[0]&&(K.push(x),x=[-1,-1]);for(l=E*n;l<(E+L)*n;l+=n)C.push([m[l]+a.mbs[0],m[l+1]+a.mbs[1]]);E+=L}-1!==x[0]&&K.push(x);w._outlineSegments.push(K);u.addRing(C);null!=A.inner&&console.warn("inner rings not yet supported")}z.push(new G(w,null,v))}for(v=0;v<z.length;v++)z[v].layer=this.layer;t.push.apply(t,z);k.push({features:B.features,graphics:z})}this.loadedGraphics.addMany(t);a=this._nodesAddedToStage[a.id];
this._setBundleAttributes(a.bundles[q],a.loadedAttributes,a.attributeData);e.done()}};b.prototype._areAllBundlesLoaded=function(a){var c=this._nodesAddedToStage[a.id];if(null==c)return!1;for(var b=0;b<a.featureData.length;b++)if(null==c.bundles[b])return!1;return!0};b.prototype._isBundleAlreadyAddedToStage=function(a,c){return this._nodesAddedToStage[a.id]&&null!=this._nodesAddedToStage[a.id].bundles[c]};b.prototype._isOverMemory=function(){return!1};b.prototype._removeFeatures=function(a,c){var b=
this._nodesAddedToStage[a.id];if(null!=b){var b=b.bundles,d=[],e;for(e in b)for(var f=0;f<b[e].length;f++){var q=b[e][f],g=!1;if(null!=q){for(var h in q.features)if(-1!==c.indexOf(q.features[h].id)){g=!0;break}g&&(d.push.apply(d,q.graphics),delete b[e][f])}}this.loadedGraphics.removeMany(d);for(e=0;e<b.length;e++)for(f=0;f<b[e].length;f++)if(q=b[e][f],null!=q&&0<q.graphics.length)return;this._removeNodeData(a)}};b.prototype._removeNodeData=function(a){var c=this._nodesAddedToStage[a.id];if(null!=
c){var c=c.bundles,b=[],d;for(d in c)for(var e in c[d])b.push.apply(b,c[d][e].graphics);this.loadedGraphics.removeMany(b);delete this._nodesAddedToStage[a.id]}};b.prototype._getAddedFeatures=function(a){a=this._nodesAddedToStage[a];if(null==a)return null;a=a.bundles;var c=[],b;for(b in a)for(var d=0;d<a[b].length;d++)c=c.concat(a[b][d].features);return c};b.prototype._getAddedNodeIDs=function(){return Object.keys(this._nodesAddedToStage)};b.prototype._getLoadedAttributes=function(a){if(a=this._nodesAddedToStage[a.id])return a.loadedAttributes};
b.prototype._setAttributeData=function(a,b,d){if(a=this._nodesAddedToStage[a.id])a.loadedAttributes=b,a.attributeData=d,this._setNodeAttributes(a,b,d),this._layerViewCore.labeling.layerLabelsEnabled()&&this._layerViewCore.labeling.updateLabelingInfo()};b.prototype._setNodeAttributes=function(a,b,d){a=a.bundles;for(var c in a)this._setBundleAttributes(a[c],b,d)};b.prototype._setBundleAttributes=function(a,b,d){for(var c=0;c<a.length;c++)for(var e=a[c],f=0;f<e.graphics.length;++f){var g=e.graphics[f];
g.attributes||(g.attributes={});if(b)for(var h=0,k=b;h<k.length;h++){var p=k[h].name;d[p]&&(g.attributes[p]=d[p][c])}}};b.prototype._updateSuspendResumeExtent=function(){this.layer.fullExtent?(this._suspendResumeExtent||(this._suspendResumeExtent=aa.vec4d.create()),ca.extentToBoundingRect(this.layer.fullExtent,this._suspendResumeExtent,this.view.spatialReference)||(this._suspendResumeExtent=null)):this._suspendResumeExtent=null;return this._suspendResumeExtent};b.prototype._updateClippingExtent=function(a){this._controller&&
this._controller.updateClippingArea(a);return!1};b.prototype._getObjectIdField=function(){return this.layer.objectIdField||"OBJECTID"};b.prototype._rendererChange=function(a,b){var c=this,d=a?a.requiredFields:[],e=b?b.requiredFields:[];d.length===e.length&&d.every(function(a,b){return d[b]===e[b]})||Object.keys(this._nodesAddedToStage).forEach(function(a){c._removeNodeData({id:a})})};b.prototype._objectIdFilterChange=function(){var a=this;Object.keys(this._nodesAddedToStage).forEach(function(b){a._removeNodeData({id:b})});
this._controller&&this._controller.restartNodeLoading()};b.prototype.getStats=function(){var a=this.inherited(arguments)||{};a.nodecount=Object.keys(this._nodesAddedToStage).length;a.featurecount=this.loadedGraphics.length;return a};return b}(h.declared(T,S));p([h.property()],g.prototype,"loadedGraphics",void 0);p([h.property()],g.prototype,"layer",void 0);p([h.property()],g.prototype,"view",void 0);p([h.property()],g.prototype,"hasDraped",null);p([h.property()],g.prototype,"_controller",void 0);
p([h.property({dependsOn:["_controller.updating"]})],g.prototype,"updating",void 0);p([h.property({aliasOf:"_controller.updatingPercentage"})],g.prototype,"updatingPercentageValue",void 0);g=p([h.subclass("esri.views.3d.layers.SceneLayerGraphicsView3D")],g);var fa=t.create(t.POSITIVE_INFINITY);return g});