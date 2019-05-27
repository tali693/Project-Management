var cntDesignId = 0;

var Designs = (function () {

    //constructor
    var Design = function (name, description, category, owner, files, id) {

        var designId = id || cntDesignId || Design.getNextDesignId();
        files = files.map(function (file) {
            return {
                filePath: file.filePath,
                fileContent: file.fileContent
            };
        });
        this.constructor.super.call(this, designId, name, description, category, files, owner);
    };

    Design.getNextDesignId = function () {
        cntDesignId = DAL.getNextDesignId();
        return cntDesignId;
    };

    Design.removeDesignId = function () {
        cntDesignId--;
        DAL.removeDesignId();
    };

    Design.addDesignObject = function (name, description, category, owner, files, designsTable) {
        var design1 = new Designs(name, description, category, owner, files);
        //Designs.addNewDesignRow1(design1, designsTable);
        return DAL.addDesignToArray(design1);
    };

    Design.editDesignObject = function (name, description, category, owner, files, designsTable, num) {
        var design1 = new Designs(name, description, category, owner, files, designsTable);
        DAL.editDesignInArray(design1, num);
    };

    Design.editDesignObjectByDesign = function (design) {
        DAL.editDesignInArray(design, design.DesignId);
    };

    Design.getDesignsArray = function () {
        var arr = DAL.getDesignsArray();
        return arr;
    };
    
    Design.saveDesign = function (design, isNew, form) {
        if (!isNew) {
            form.validate({
                ignore: ".ignore"
            });
        }

        if (!form.valid())
            return false;

        DAL.saveDesignOnServer(design);
        if(!isNew)
            this.editDesignObjectByDesign(design);
        else
            DAL.addDesignToArray(design);
    }

    inherit(Design, US);

    return Design;
})();