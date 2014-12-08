sap.ui.controller('masch.odata.src.Navigation', {

    onInit: function() {

    },

    connectToService: function() {
        var oAppModel = this.getView().getModel();

        var sUrl = oAppModel.getProperty('/serviceUrl');

        if(oAppModel.getProperty('/useCorsAnywhere')) {
            sUrl = 'https://cors-anywhere.herokuapp.com/' + sUrl;
        }

        oAppModel.setProperty('/metadataAvailable', false);
        jQuery.ajax({
            method: 'GET',
            url: sUrl + '/$metadata',
            xhrFields: {
                withCredentials: oAppModel.getProperty('/withCredentials')
            }
        }).done(this.gotServiceMetadata.bind(this))
    },

    gotServiceMetadata: function(oMetadata) {
        var oView = this.getView();
        var oXmlModel = oView.getModel('metadata');
        oXmlModel.setData(oMetadata);

       // oView.setModel(oXmlModel, 'metadata');
        oView.getModel().setProperty('/metadataAvailable', true);
        oView.byId('panelServiceConfig').setExpanded(false);
    },

    schemaSelected: function(oEvent) {
        var oItem = oEvent.getParameter('listItem');
        var oCtx = oItem.getBindingContext('metadata');
        this.getView().byId('schemaInfo').setBindingContext(oCtx, 'metadata');
        this.getView().byId('schemaSelectorPanel').setExpanded(false);
    },

    showEntityDetails: function(oEvent) {
        var oItem = oEvent.getParameter('listItem');
        var oEventBus = sap.ui.getCore().getEventBus();

        oEventBus.publish('nav', 'selectEntity', {
            context: oItem.getBindingContext('metadata')
        });
    }
});
