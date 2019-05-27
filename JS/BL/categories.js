
var cntCategotyID;


var Categories = (function () {

    //constructor
    var Category = function (id, name) {

        this.name = name;
        this.id = id || cntCategotyID || Category.getNexCategoryId();
    };

    Category.getNexCategoryId = function () {
        cntCategotyID = DAL.getNextCategoryId();
        return cntCategotyID;
    };
    
    Category.addCategoryObject = function (name, id) {
        var cat = new Categories(id, name);
        DAL.addCategoryToArray(cat);
        return cat;

    };

    Category.getCategoryIdByName = function (name) {
        return getCategoryByName(name);
    };

    Category.getCategoryNameById = function (id) {
        return getCategoryById(id);
    };

    Category.getCategoriesArray = function (id) {
        var arr = DAL.getCategoryArray();
        return arr;
    };

    Category.saveCategory = function (category, isNew) {        
        if (!isNew) {
            category.CategoryId = category.id;
            this.editCategoryObject(category);
        }
        else
            DAL.addCategoryToArray(category);
        DAL.saveCategoryOnServer(category);
    };


    Category.editCategoryObject = function (category) {
        DAL.editCategoryInArray(category, category.id);
    };
       
    return Category;
})();


var getCategoryByName = function (name) {
    if (name != null) {
        var cat1 = DAL.getCategoryArray().filter(function (cat) {
            return cat.name == name;
        })[0];
        if(cat1 != null)
            return cat1.id.toString();
    }
};

var getCategoryById = function (id) {
    if (id != null) {
        var cat1 = DAL.getCategoryArray().filter(function (cat) {
            return cat.id == id;
        })[0];
        if (cat1 != undefined)
            return cat1.name;
    }
};


