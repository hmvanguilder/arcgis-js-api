// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/3.18/esri/copyright.txt for details.

define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/config","dojo/_base/Deferred","dojo/_base/lang","dojo/has","dojo/dom-attr","dojo/keys","dijit/registry","dijit/Dialog","./kernel","./lang","./domUtils","./Credential","./IdentityManagerBase","dojo/i18n!./nls/jsapi","dojo/query","dijit/form/Button","dijit/form/Form","dijit/form/ValidationTextBox"],function(e,t,r,i,n,s,o,d,a,l,c,_,u,g,b,p){var v=t([b],{declaredClass:"esri.IdentityManager",_eventMap:{"dialog-cancel":["info"]},constructor:function(e){n.mixin(this,e),this.registerConnectEvents()},_dialogContent:"<div data-dojo-type='dijit.form.Form' data-dojo-props='\"class\":\"esriIdForm\"'><div class='dijitDialogPaneContentArea'><div style='padding-bottom: 5px; word-wrap: break-word;'>${info}</div><div style='margin: 0px; padding: 0px; height: 10px;'></div><div class='esriErrorMsg' style='display: none; color: white; background-color: #D46464; text-align: center; padding-top: 3px; padding-bottom: 3px;'>${invalidUser}</div><div style='margin: 0px; padding: 0px; height: 10px;'></div><table style='width: 100%;'><tr><td><label>${lblUser}</label><br/>"+'<input data-dojo-type=\'dijit.form.ValidationTextBox\' data-dojo-props=\'type:"text", "class":"esriIdUser", required:true, trim:true, style:"width: 100%;", autocapitalize:"none", autocorrect:"off", spellcheck:false\' /></td></tr><tr><td><label>${lblPwd}</label><br/><input data-dojo-type=\'dijit.form.ValidationTextBox\' data-dojo-props=\'type:"password", "class":"esriIdPwd", required:true, style:"width: 100%;"\' /></td></tr></table></div><div class=\'dijitDialogPaneActionBar\'><button data-dojo-type=\'dijit.form.Button\' data-dojo-props=\'type:"button", "class":"esriIdSubmit"\'>${lblOk}</button><button data-dojo-type=\'dijit.form.Button\' data-dojo-props=\'type:"button", "class":"esriIdCancel"\'>${lblCancel}</button></div></div>',onDialogCreate:function(){},onDialogCancel:function(){},signIn:function(e,t,n){this._nls||(this._nls=p.identity),this._loginDialog||(this._loginDialog=this.dialog=this._createLoginDialog(),this.onDialogCreate());var s=this._loginDialog,d=n&&n.error,a=n&&n.token,l=new i(function(){s.onCancel()});if(s.open){var c=new Error("BUSY");return c.code="IdentityManager.1",c.log=r.isDebug,l.errback(c),l}return u.hide(s.errMsg_),d&&403==d.code&&a&&(o.set(s.errMsg_,"innerHTML",this._nls.forbidden),u.show(s.errMsg_)),s.dfd_=l,s.serverInfo_=t,s.resUrl_=e,s.admin_=n&&n.isAdmin,o.set(s.resLink_,{title:e,innerHTML:"("+(this.getResourceName(e)||this._nls.lblItem)+")"}),o.set(s.serverLink_,{title:t.server,innerHTML:(-1!==t.server.toLowerCase().indexOf("arcgis.com")?"ArcGIS Online":t.server)+" "}),s.txtPwd_.set("value",""),s.show(),l},_createLoginDialog:function(){var t=this._nls,i=_.substitute(t,this._dialogContent);i=_.substitute({resource:"<span class='resLink' style='word-wrap: break-word;'></span>",server:"<span class='serverLink' style='word-wrap: break-word;'></span>"},i);var n=new l({title:t.title,content:i,"class":"esriSignInDialog",style:"width: 18em;",esriIdMgr_:this,keypressed_:function(e){e.charOrCode===d.ENTER&&this.execute_()},execute_:function(){var e=this.txtUser_.get("value"),r=this.txtPwd_.get("value"),i=this.dfd_,n=this;if(this.form_.validate()&&e&&r){this.btnSubmit_.set("label",t.lblSigning);var s=c.id.findCredential(n.resUrl_,e),d=function(r){n.btnSubmit_.set("label",t.lblOk),n.btnSubmit_.set("disabled",!1),u.hide(n.errMsg_),n.hide(),l._DialogLevelManager.hide(n);var o=n.serverInfo_;n.dfd_=n.serverInfo_=n.generateDfd_=n.resUrl_=null;var d,a,c,b=s;r&&(d=r.token,a=_.isDefined(r.expires)?Number(r.expires):null,c=!!r.ssl,b?(b.userId=e,b.token=d,b.expires=a,b.validity=r.validity,b.ssl=c,b.creationTime=(new Date).getTime()):b=new g({userId:e,server:o.server,token:d,expires:a,ssl:c,isAdmin:n.admin_,validity:r.validity})),i.callback(b)};if(s&&!s._enqueued)return void d();n.btnSubmit_.set("disabled",!0),n.generateDfd_=c.id.generateToken(this.serverInfo_,{username:e,password:r},{isAdmin:this.admin_}).addCallback(d).addErrback(function(e){n.btnSubmit_.set("disabled",!1),n.generateDfd_=null,n.btnSubmit_.set("label",t.lblOk),o.set(n.errMsg_,"innerHTML",e&&e.code?t.invalidUser:t.noAuthService),u.show(n.errMsg_)})}},cancel_:function(){n.generateDfd_&&n.generateDfd_.cancel();var e=n.dfd_,t=n.resUrl_,i=n.serverInfo_;n.btnSubmit_.set("disabled",!1),n.dfd_=n.serverInfo_=n.generateDfd_=n.resUrl_=null,u.hide(n.errMsg_),l._DialogLevelManager.hide(n),n.esriIdMgr_.onDialogCancel({resourceUrl:t,serverInfo:i});var s=new Error("ABORTED");s.code="IdentityManager.2",s.log=r.isDebug,e.errback(s)}}),s=n.domNode;return n.form_=a.byNode(e.query(".esriIdForm",s)[0]),n.txtUser_=a.byNode(e.query(".esriIdUser",s)[0]),n.txtPwd_=a.byNode(e.query(".esriIdPwd",s)[0]),n.btnSubmit_=a.byNode(e.query(".esriIdSubmit",s)[0]),n.btnCancel_=a.byNode(e.query(".esriIdCancel",s)[0]),n.resLink_=e.query(".resLink",s)[0],n.serverLink_=e.query(".serverLink",s)[0],n.errMsg_=e.query(".esriErrorMsg",s)[0],n.connect(n.txtUser_,"onKeyPress",n.keypressed_),n.connect(n.txtPwd_,"onKeyPress",n.keypressed_),n.connect(n.btnSubmit_,"onClick",n.execute_),n.connect(n.btnCancel_,"onClick",n.onCancel),n.connect(n,"onCancel",n.cancel_),n}});return s("extend-esri")&&(c.IdentityManagerDialog=c.IdentityManager=v),v});