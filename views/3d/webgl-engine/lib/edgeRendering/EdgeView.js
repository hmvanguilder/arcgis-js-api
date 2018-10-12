// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.9/esri/copyright.txt for details.

define(["require","exports","../../../../../core/tsSupport/assignHelper","../../../../../core/tsSupport/awaiterHelper","../../../../../core/tsSupport/generatorHelper","../../../../../core/arrayUtils","../../../../../core/promiseUtils","../../../../../core/requireUtils","../../../../../core/workers","../../../lib/gl-matrix","../../../support/mathUtils","../../../support/buffer/BufferView","../../../support/buffer/bufferViewUtil","../../../support/buffer/typedArrayUtil","../localOriginHelper","../LocalOriginManager","../PreinterleavedGeometryData","../RegularGridLocalOriginFactory","../TextureBackedBuffer/BufferManager","./bufferLayouts","./edgeBufferWriters","./EdgeProcessingWorker","./EdgeRenderer","./strokes","./util","../../../../webgl/BufferObject","../../../../webgl/VertexArrayObject","module"],function(e,t,r,n,i,o,s,a,d,c,u,l,f,p,h,g,m,v,b,y,E,x,O,R,w,T,M,B){Object.defineProperty(t,"__esModule",{value:!0});var I=function(){function t(e,t,r){this.rctx=e,this.programRepository=t,this.callbacks=r,this.profilingCallback=null,this.perObjectData=new Map,this.renderers=new Map,this.localOrigins=new g.LocalOriginManager(new v(1e4)),this.numberOfRenderedEdges=0,this.gpuMemoryUsage=0,this.worker=new x,this.workerThread=null,this.destroyed=!1,this.tmpModelPosition=c.vec3d.create(),this.tmpCameraPosition=c.vec3d.create(),this.componentColorManager=new b.BufferManager(this.rctx,2)}return t.prototype.initialize=function(){var t=this;d.open(a.getAbsMid("./EdgeProcessingWorker",e,B),{client:this}).then(function(e){t.destroyed?e.close():t.workerThread=e});for(var r=y.VertexLayout.createBuffer(4),n=0;n<4;n++)r.sideness.set(n,0,0===n||3===n?0:1),r.sideness.set(n,1,0===n||1===n?0:1);this.verticesBufferObject=T.createVertex(this.rctx,35044,r.buffer)},t.prototype.destroy=function(){this.destroyed||(this.workerThread&&(this.workerThread.close(),this.workerThread=null),this.verticesBufferObject&&(this.verticesBufferObject.dispose(),this.verticesBufferObject=null),this.destroyed=!0)},t.prototype.getGpuMemoryUsage=function(){return this.gpuMemoryUsage},Object.defineProperty(t.prototype,"numberOfRenderedPrimitives",{get:function(){return this.numberOfRenderedEdges},enumerable:!0,configurable:!0}),t.prototype.shouldRender=function(){return this.renderers.size>0},t.prototype.addObject=function(e,t,r){return n(this,void 0,void 0,function(){var n,o,a,d,c,u,l;return i(this,function(i){switch(i.label){case 0:if(this.hasObject(e))return[2];if(n=new Array,a={loaded:s.create(function(e){return o=e}),renderables:[]},this.perObjectData.set(e,a),r&&r.mergeGeometries&&e.geometries.length>1&&this.canMergeGeometries(e))n.push(this.addObjectMergedGeometries(e,a,t));else for(d=0;d<e.geometries.length;d++)c=e.geometries[d],u=e.geometryRecords[d],l=u.materials[0],l.supportsEdges&&(c.data instanceof m?n.push(this.addGeometryPreinterleaved(e,a,c,c.data,u,t)):n.push(this.addGeometryNonPreinterleaved(e,a,c,c.data,u,t[0])));return[4,s.all(n)];case 1:return i.sent(),this.callbacks.setNeedsRender(),o(),[2]}})})},t.prototype.hasObject=function(e){return this.perObjectData.has(e)},t.prototype.updateAllComponentOpacities=function(e,t){return n(this,void 0,void 0,function(){var r,n;return i(this,function(i){switch(i.label){case 0:return r=this.perObjectData.get(e),r?[4,r.loaded]:[2];case 1:return i.sent(),n=t instanceof Array?function(e){return t[e]}:function(e){return t},r.renderables.forEach(function(e){for(var t=e.components.meta.length,r=0;r<t;r++){var i=n(r),o=e.components.meta[r],s=o.index;o.material.opacity=i,e.components.buffer.textureBuffer.setDataElement(s,1,3,255*i)}e.allTransparent=w.determineAllTransparent(e.components.meta)}),this.callbacks.setNeedsRender(),[2]}})})},t.prototype.updateAllComponentMaterials=function(e,t){return n(this,void 0,void 0,function(){var r,n=this;return i(this,function(i){switch(i.label){case 0:return r=this.perObjectData.get(e),r?[4,r.loaded]:[2];case 1:return i.sent(),r.renderables.forEach(function(e){var r=t[0],i=w.determineRequiresUberRenderer(t),o=O.EdgeRenderer.getKey(i,r.type,r.slicePlaneEnabled);if(o!==e.rendererKey){var s=n.renderers.get(e.rendererKey),a=n.aquireRenderer(i,r);s.removeRenderable(e),s.refCount.decrement(),e.rendererKey=o,a.addRenderable(e)}for(var d=0;d<t.length;d++)e.components.meta[d].material=t[d];n.updateComponentBuffer(e.components),e.allTransparent=w.determineAllTransparent(e.components.meta)}),this.callbacks.setNeedsRender(),[2]}})})},t.prototype.updateObjectVisibility=function(e,t){return n(this,void 0,void 0,function(){var r;return i(this,function(n){switch(n.label){case 0:return r=this.perObjectData.get(e),r?[4,r.loaded]:[2];case 1:return n.sent(),r.renderables.forEach(function(e){e.visible=t}),this.callbacks.setNeedsRender(),[2]}})})},t.prototype.removeObject=function(e){var t=this,r=this.perObjectData.get(e);r&&(this.perObjectData.delete(e),r.loaded.then(function(){r.renderables.forEach(function(e){t.removeRenderable(e)}),t.callbacks.setNeedsRender()}))},t.prototype.removeAll=function(){var e=this;this.perObjectData.forEach(function(t,r){e.removeObject(r)})},t.prototype.createSolidEdgeMaterial=function(e){return r({},C,e,{type:"solid"})},t.prototype.createSketchEdgeMaterial=function(e){return r({},k,e,{type:"sketch"})},t.prototype.render=function(e){var t=this;this.localOrigins.updateViewMatrices(e.view),this.renderers.forEach(function(e){0===e.refCount.value&&(t.renderers.delete(e.key),e.dispose())}),this.componentColorManager.garbageCollect(),this.componentColorManager.updateTextures();var r=e.view,n=0,i=0;this.renderers.forEach(function(e){e.forEachRenderable(function(e){n+=e.statistics.averageEdgeLength,i++})});var o=n/i,s={distanceFalloffFactor:40*o,minimumEdgeLength:w.estimateLengthAtDistance(e.viewport[3],e.fovY,1,3.5)},a=this.rctx.capabilities.blendMinMax;a?(this.rctx.setDepthWriteEnabled(!1),this.rctx.setBlendingEnabled(!0),this.rctx.setBlendEquationSeparate(32774,a.MAX),this.rctx.setBlendFunctionSeparate(1,0,1,1)):(this.rctx.setDepthWriteEnabled(!0),this.rctx.setBlendingEnabled(!1)),this.rctx.setDepthTestEnabled(!0),this.rctx.setDepthFunction(515),this.updateObjectCameraDistances(e),this.numberOfRenderedEdges=0,this.renderers.forEach(function(r){t.renderRegularEdges(r,e,s),t.renderSilhouetteEdges(r,e,s)}),this.rctx.setDepthWriteEnabled(!0),this.rctx.setDepthFunction(513),this.rctx.setBlendEquationSeparate(32774,32774),this.rctx.setBlendFunctionSeparate(1,0,1,1),e.view=r},t.prototype.computeModelTransformWithLocalOrigin=function(e,t,r){if(e.getCombinedStaticTransformation(t,r),t.origin)this.localOrigins.register(t.origin);else{var n=c.vec3d.set3(r[12],r[13],r[14],this.tmpModelPosition);t.origin=this.localOrigins.aquire(n)}return h.applyToModelMatrix(t.origin.vec3,r),r},t.prototype.updateComponentBuffer=function(e){for(var t=e.meta,r=e.buffer,n=0;n<t.length;n++){var i=t[n].material,o=t[n].index,s=u.clamp(Math.round(i.size*O.LINE_WIDTH_FRACTION_FACTOR),0,255),a=u.clamp(i.extensionLength,-O.EXTENSION_LENGTH_OFFSET,255-O.EXTENSION_LENGTH_OFFSET)+O.EXTENSION_LENGTH_OFFSET,d="solid"===i.type?0:1,c=255*i.opacity,l=i.color,f=255*l[0],p=255*l[1],h=255*l[2],g=255*l[3];r.textureBuffer.setData(o,0,f,p,h,g),r.textureBuffer.setData(o,1,s,a,d,c)}},t.prototype.createComponentBuffers=function(e){for(var t=[],r=this.componentColorManager.getBuffer(e.length),n=0;n<e.length;n++){var i=e[n],o=r.aquireIndex();t.push({index:o,material:i})}var s={meta:t,buffer:r};return this.updateComponentBuffer(s),s},t.prototype.extractEdges=function(e,t,r,n){return this.worker.process({data:t,originalIndices:n,writerSettings:e,skipDeduplicate:r},this.workerThread)},t.prototype.createEdgeResources=function(e){var t={};if(e.regular.lodInfo.lengths.length>0){var r=new M(this.rctx,y.EdgeShaderAttributeLocations,{vertices:y.glVertexLayout,instances:E.RegularEdgeBufferWriter.glLayout},{vertices:this.verticesBufferObject,instances:T.createVertex(this.rctx,35044,e.regular.instancesData.buffer)});t.regular={vao:r,lod:e.regular.lodInfo}}if(e.silhouette.lodInfo.lengths.length>0){var r=new M(this.rctx,y.EdgeShaderAttributeLocations,{vertices:y.glVertexLayout,instances:E.SilhouetteEdgeBufferWriter.glLayout},{vertices:this.verticesBufferObject,instances:T.createVertex(this.rctx,35044,e.silhouette.instancesData.buffer)});t.silhouette={vao:r,lod:e.silhouette.lodInfo}}return t},t.prototype.disposeEdgeResources=function(e){e.regular&&(e.regular.vao.vertexBuffers.instances.dispose(),e.regular.vao.dispose(!1),e.regular.vao=null),e.silhouette&&(e.silhouette.vao.vertexBuffers.instances.dispose(),e.silhouette.vao.dispose(!1),e.silhouette.vao=null)},t.prototype.addGeometryNonPreinterleaved=function(e,t,r,o,s,a){return n(this,void 0,void 0,function(){var r,n,d,u;return i(this,function(i){switch(i.label){case 0:return r=o.getAttribute("position"),n=this.computeModelTransformWithLocalOrigin(e,s,c.mat4d.create()),d=s.origin,u={position:r,indices:o.getIndices("position"),modelTransform:n,origin:d},[4,this.addNonPreinterleaved(e,t,u,a)];case 1:return i.sent(),[2]}})})},t.prototype.addNonPreinterleaved=function(e,t,r,o){return n(this,void 0,void 0,function(){var e,n,s,a,d,c,u,l,f,p,h,g,m,v,b;return i(this,function(i){switch(i.label){case 0:for(e=this.aquireRenderer(!1,o),n=r.modelTransform,s=r.origin,a=r.indices,d=r.position,c=d.data.length/d.strideIdx,u=y.EdgeInputBufferLayout.createBuffer(c),l=0;l<c;l++)u.position.set(l,0,d.data[d.offsetIdx+l*d.strideIdx+0]),u.position.set(l,1,d.data[d.offsetIdx+l*d.strideIdx+1]),u.position.set(l,2,d.data[d.offsetIdx+l*d.strideIdx+2]);return f=this.createComponentBuffers([o]),w.fillComponenBufferIndices(f.meta,[0,u.componentIndex.count],u.componentIndex),[4,this.extractEdges(e.writerSettings,u,!1,a)];case 1:return p=i.sent(),h=this.createEdgeResources(p),g=h.regular,m=h.silhouette,v=(g?g.vao.size:0)+(m?m.vao.size:0),b={regular:g,silhouette:m,transform:{modelMatrix:n,origin:s},statistics:{gpuMemoryUsage:v,averageEdgeLength:p.averageEdgeLength},components:f,visible:!0,allTransparent:w.determineAllTransparent(f.meta),distanceToCamera:0,rendererKey:e.key},t.renderables.push(b),e.addRenderable(b),this.gpuMemoryUsage+=v,[2]}})})},t.prototype.addGeometryPreinterleaved=function(e,t,r,o,s,a){return n(this,void 0,void 0,function(){var r,n,d,u,h,g,m,v,b,E,x,O,R,T,M,B,I;return i(this,function(i){switch(i.label){case 0:return(r=o.getAttribute("position"))&&p.isFloat32Array(r.data)?(n=a[0],d=w.determineRequiresUberRenderer(a),u=this.aquireRenderer(d,n),h=this.computeModelTransformWithLocalOrigin(e,s,c.mat4d.create()),g=s.origin,m=o.getIndices("position"),v=new l.BufferViewVec3f(r.data.buffer,4*r.offsetIdx,4*r.strideIdx),b=y.EdgeInputBufferLayout.createBuffer(v.count),f.unrolledCopyVec3(b.position,v),E=this.createComponentBuffers(a),w.fillComponenBufferIndices(E.meta,o.componentOffsets,b.componentIndex,m),x=o.hasPositionData,[4,this.extractEdges(u.writerSettings,b,x,m)]):(console.warn("Geometry has no float32 `position` attribute, skipping it."),[2]);case 1:return O=i.sent(),R=this.createEdgeResources(O),T=R.regular,M=R.silhouette,B=(T?T.vao.size:0)+(M?M.vao.size:0),I={regular:T,silhouette:M,transform:{modelMatrix:h,origin:g},statistics:{gpuMemoryUsage:B,averageEdgeLength:O.averageEdgeLength},components:E,visible:!e.isHidden(s),allTransparent:w.determineAllTransparent(E.meta),distanceToCamera:0,rendererKey:u.key},t.renderables.push(I),u.addRenderable(I),this.gpuMemoryUsage+=B,[2]}})})},t.prototype.canMergeGeometries=function(e){for(var t=null,r=null,n=0;n<e.geometries.length;n++){var i=e.geometries[n],s=e.geometryRecords[n];if(s.materials[0].supportsEdges){if(i.data instanceof m)return!1;if(t){if(!o.equals(t,s.transformation))return!1}else t=s.transformation;if(!r&&s.origin)r=s;else if(r&&s.origin&&r.origin.id!==s.origin.id)return!1}}return!0},t.prototype.addObjectMergedGeometries=function(e,t,r){return n(this,void 0,void 0,function(){var n,o,s,a,d,u,l,f,h,g,m,v,d,u,b,f,y,h,E,x,O,R,w,T,d,M;return i(this,function(i){switch(i.label){case 0:for(n=new Map,o=0,s=null,a=null,d=0;d<e.geometries.length;d++)u=e.geometries[d],l=e.geometryRecords[d],f=l.materials[0],f.supportsEdges&&(!a&&l.origin&&(a=l),h=u.data.getIndices("position"),o+=h?h.length:0,(h&&null==s||s===Uint16Array)&&(s=p.isUint16Array(h)?Uint16Array:Uint32Array));for(g=o?new s(o):null,m=[],v=0,d=0;d<e.geometries.length;d++)if(u=e.geometries[d],b=e.geometryRecords[d],f=b.materials[0],f.supportsEdges){if(y=u.data.getAttribute("position"),h=u.data.getIndices("position"),null==(E=n.get(y.data))){for(E=m.length/3,x=y.offsetIdx;x<y.data.length;x+=y.strideIdx)m.push(y.data[x+0]),m.push(y.data[x+1]),m.push(y.data[x+2]);n.set(y.data,E)}if(h)for(O=0;O<h.length;O++)g[v++]=E+h[O]}for(R=a||e.geometryRecords[0],w=this.computeModelTransformWithLocalOrigin(e,R,c.mat4d.create()),T=R.origin,d=0;d<e.geometryRecords.length;d++)e.geometryRecords[d].origin=T;return M={position:{data:m,offsetIdx:0,strideIdx:3},indices:g,modelTransform:w,origin:T},[4,this.addNonPreinterleaved(e,t,M,r[0])];case 1:return i.sent(),[2]}})})},t.prototype.aquireRenderer=function(e,t){var r=O.EdgeRenderer.getKey(e,t.type,t.slicePlaneEnabled),n=this.renderers.get(r);return this.strokesTexture||(this.strokesTexture=R.generateStrokesTexture(this.rctx)),n||(n=new O.EdgeRenderer(this.rctx,this.programRepository,{type:t.type,slicePlaneEnabled:t.slicePlaneEnabled,strokesTexture:this.strokesTexture,uber:e}),this.renderers.set(r,n)),n.refCount.increment(),n},t.prototype.removeRenderable=function(e){var t=this.renderers.get(e.rendererKey);t.removeRenderable(e),t.refCount.decrement(),this.disposeEdgeResources(e),this.localOrigins.release(e.transform.origin),this.gpuMemoryUsage-=e.statistics.gpuMemoryUsage;for(var r=0,n=e.components.meta;r<n.length;r++){var i=n[r];e.components.buffer.releaseIndex(i.index)}},t.prototype.updateObjectCameraDistances=function(e){var t=this,r=e.viewInvTransp;c.vec3d.set3(r[3],r[7],r[11],this.tmpCameraPosition),this.perObjectData.forEach(function(e,r){var n=c.vec3d.dist(r.getCenter(),t.tmpCameraPosition);e.renderables.forEach(function(e){return e.distanceToCamera=n})})},t.prototype.renderRegularEdges=function(e,t,r){var n=this;e.bindRegularEdges(t,r),e.forEachRenderable(function(i){if(i.visible&&i.regular&&!i.allTransparent){var o=w.computeEdgeCount(i.regular.lod.lengths,i.distanceToCamera,r);t.view=n.localOrigins.getViewMatrix(i.transform.origin),e.renderRegularEdges(i,t,o),n.numberOfRenderedEdges+=o}})},t.prototype.renderSilhouetteEdges=function(e,t,r){var n=this;e.bindSilhouetteEdges(t,r),e.forEachRenderable(function(i){if(i.visible&&i.silhouette&&!i.allTransparent){var o=w.computeEdgeCount(i.silhouette.lod.lengths,i.distanceToCamera,r);t.view=n.localOrigins.getViewMatrix(i.transform.origin),e.renderSilhouetteEdges(i,t,o),n.numberOfRenderedEdges+=o}})},t}();t.EdgeView=I;var C={color:c.vec4d.createFrom(0,0,0,.2),size:1,extensionLength:0,opacity:1,slicePlaneEnabled:!1},k={color:c.vec4d.createFrom(0,0,0,.2),size:1,extensionLength:0,opacity:1,slicePlaneEnabled:!1}});