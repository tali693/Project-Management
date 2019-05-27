
var cntBugId;
var currentBug;

var Bugs = (function () {

    //constructor
    var Bug = function (name, description, status, priority, dueDate, category, assign, owner, files, id) {

        var BugId = id || cntBugId || Bug.getNextBugId();
        if (files != "")
            files = files.map(function (file) {
                return {
                    filePath: file
                };
            });

        this.constructor.super.call(this, BugId, name, description, category, files || [], owner);

        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.assignTo = !isFinite(assign) ? Users.getIdUserByName(assign) : assign;//checks if the assign got here with name-converts it to id

    };

    Bug.getNextBugId = function () {
        cntBugId = DAL.getNextBugId();
        return cntBugId;
    };

    //Bug.removeBugId = function () {
    //    cntBugId--;
    //    DAL.removeBugId();
    //};

    //Bug.addBugObject = function (name, description, status, priority, dueDate, category, assign, owner, files, bugsTable) {
    //    var bug1 = new Bugs(name, description, status, priority, dueDate, category, assign, owner, files);
    //    // Bugs.addNewBugRow1(bug1, bugsTable);
    //    //Bugs.closeTable();
    //    DAL.addBugToArray(bug1);
    //    return bug1;

    //};

    //Bug.editBugObject = function (name, description, status, priority, dueDate, category, assisgn, owner, files, bugsTable) {
    //    var bug1 = new Bugs(name, description, status, priority, dueDate, category, assisgn, owner, files);


    //    DAL.editBugInArray(bug1);

    //};

    Bug.editBugObjectByBug = function (bug1) {
        DAL.editBugInArray(bug1, bug1.BugId);
    };

    Bug.setCurrentBug = function (name, description, status, priority, dueDate, category, assign, owner, files) {
        b = new Bug(name, description, status, priority, dueDate, category, assign, owner, files);//name, description, status, priority, dueDate, category, assign, owner, files, id
        currentBug = b;
    };

    Bug.setCurrentBugByBug = function (bug) {
        currentBug = bug;
    };

    Bug.getBugsArray = function () {
        var arr = DAL.getBugsArray();
        return arr;
    };

    Bug.saveBug = function (bug, isNew, form) {
        if (!isNew) {
            form.validate({
                ignore: ".ignore"
            });
        }
        if (!form.valid())
            return false;

        this.setCurrentBugByBug(bug);
        if (!isNew)
            this.editBugObjectByBug(bug);
        else 
                DAL.addBugToArray(bug);
        
        DAL.saveBugOnServer(bug, form);
    };

    inherit(Bug, US);

    return Bug;
})();

