sap.ui.controller('masch.odata.src.Root', {

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
        var oXmlModel = new sap.ui.model.xml.XMLModel();
        oXmlModel.setData(oMetadata);

        oView.setModel(oXmlModel, 'metadata');
        oView.getModel().setProperty('/metadataAvailable', true);
        oView.byId('panelServiceConfig').setExpanded(false);
    },

    schemaSelected: function(oEvent) {
        var oItem = oEvent.getParameter('listItem');
        var oCtx = oItem.getBindingContext('metadata');
        console.log(oCtx);
        this.getView().byId('schemaInfo').setBindingContext(oCtx, 'metadata');
        this.getView().byId('schemaSelectorPanel').setExpanded(false);
    }
});
