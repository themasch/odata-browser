sap.ui.controller('masch.odata.src.Root', {

    onInit: function() {
        this.oEventBus = sap.ui.getCore().getEventBus();

        this.oEventBus.subscribe('nav', 'selectEntity', this.entityDetails.bind(this))
    },


    entityDetails: function(group, channel, oParameters) {
        var oCtx = oParameters.context;
        console.log(oCtx);
        this.getView().byId('detailView').setBindingContext(oCtx, 'metadata');
    }



});
