// Namespace 
//var US = US || {};

//US = {

function inherit(cls, superCls) {
    // We use an intermediary empty constructor to create an
    // inheritance chain, because using the super class' constructor
    // might have side effects.
    var construct = function () { };
    construct.prototype = superCls.prototype;
    cls.prototype = new construct;
    cls.prototype.constructor = cls;
    cls.super = superCls;
}

var US = (function () {

    var create = function (proto) {
        function ctor() { }
        ctor.prototype = proto;
        return new ctor();
    };

    var set_id = function (id1) { id = id1 };

    var UserStory = function (id, name, description, category, files, owner) {

        var id = id;
        
        //this.set_id = this.

        this.get_id = function () { return id; };
        this.name = name;
        this.titleName = name; //m DUPLICATE DUE TO SERVER CLASS AND THE WILL TO AVOID BUGS
        this.description = description;
        this.CategoryId = !isFinite(category) ? Categories.getCategoryIdByName(category) : category;
        this.files = files;
        this.owner = $.isNumeric(owner) ? owner : Users.getIdUserByName(USER);
        //this.dateCreate = new Date();
    };

      //UserStory.prototype = {
    //    announce: function () {
    //        alert('Hi ' + this.id + '!');
    //    }
    //};

    UserStory.drawTable = function (type) {
        //read from settings the hidden columns and send to hideCol...
        //hideColumnBySettings();
        if (type == "Bug") {
            //colorRowByDone(4);
            //colorRowByDueDateAndStatus(5, 3);
        }
        else if (type == "Task") {
            //colorRowByDone(7);
            //colorRowByDueDateAndStatus(5);
        }
    };

    UserStory.getDateDifference = function (date1, date2) {

        if (date1 != null) {
            var parts = date1.split('-');
            var dateConvert = new Date(parts[0], parts[1] - 1, parts[2]);
            //var today = new Date();

            var timeDiff = dateConvert.getTime() - date2.getTime();
            var diffDays = timeDiff / (1000 * 3600 * 24);
            return diffDays;
        }

        return 100;

    };

    //var colorRowByDueDateAndStatus = function (duedateColumn, statusColumn) {
    //    $('tr').find('td:nth-child(' + duedateColumn).each(function () {

    //        //check if status is not done
    //        var status = $(this).parent().find('td:nth-child(' + statusColumn).text();
    //        if (status != "Close") {

    //            var duedate = $(this).text();
    //            //if dueddate==NaN
    //            //duedate=+two weeks
    //            var parts = duedate.split('.');
    //            var dueDateCon = new Date(parts[2], parts[0] - 1, parts[1]);
    //            var today = new Date();

    //            var timeDiff = Math.abs(dueDateCon.getTime() - today.getTime());
    //            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    //            if (diffDays == 0)
    //                $(this).parent().addClass("todayObject");
    //            else if (diffDays < 3 && diffDays > 0)
    //                $(this).parent().addClass("closeObject");
    //            else if (diffDays < 0)
    //                $(this).parent().addClass("passedObject");
    //        }
    //        else {
    //            $(this).parent().addClass("doneObject");

    //        }
    //    });
    //};


    var hideColumnBySettings = function (column) {

        $('td:nth-child(' + column + '),th:nth-child( ' + column + ')').hide();
    };



    /*var colorRowByDone = function (statusColumn) {
        $('tr').find('td:nth-child(' + statusColumn).each(function () {
            var status = $(this).text();
            if (status == "Done") { }
            //var today = new Date();
            //if (duedate == today)
            $(this).parent().removeClass("passedObject");
            $(this).parent().addClass("doneObject");
        });
    };*/

    return UserStory;
})();
//},

//Compose template string
String.prototype.compose = (function () {
    var re = /\{{(.+?)\}}/g;
    return function (o) {
        return this.replace(re, function (_, k) {
            return typeof o[k] != 'undefined' ? o[k] : '';
        });
    }
}());



