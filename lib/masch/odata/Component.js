sap.ui.define(['sap/ui/core/UIComponent'], function(UIComponent) {
    "use strict";

    var Component = UIComponent.extend('masch.odata.Component', {
        metadata: {
            name: 'OData Service Browser',
            version: '0.0.0',
            includes: [ ],
            dependencies: {
                libs: [ 'sap.m' ]
            },
            rootView: 'masch.odata.src.Root'
        },

        init: function() {
            UIComponent.prototype.init.apply(this, arguments);

            var oAppModel = new sap.ui.model.json.JSONModel();
            this.setModel(oAppModel);
            oAppModel.setData({
                serviceUrl: '',
                useCorsAnywhere: false,
                metadataAvailable: false
            })
        }
    });


    return Component;
}, true);
