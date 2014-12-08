sap.ui.controller('masch.odata.src.Detail', {

    onInit: function() {

    },

    formatType: function(sTypeName) {
        return sTypeName.replace(/^Edm\./, '');
    },

    isNullable: function(data) {
        return data === 'false' ? 'not null' : '';
    }
});
