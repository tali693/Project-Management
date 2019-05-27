/*8.	AddTask()
9.	EditTask()
*/

var cntTaskId;

var Tasks = (function () {

    //constructor
    var Task = function (name, description, status, priority, dueDate, category, assign, owner, files, id) {

        var taskId = id || cntTaskId || Task.getNextTaskId();// 7-8
        files = files.map(function (file) {
            return {
                filePath: file.filePath,
                fileContent: file.fileContent
            };
        });
        this.constructor.super.call(this, taskId, name, description, category, files, owner);

        this.status = status;
        this.dueDate = dueDate;
        this.assignTo = !isFinite(assign) ? Users.getIdUserByName(assign) : assign;

    };
        
    Task.prototype = {
    /*addNewBugRow: function (Task) {
    var table = $('#bugsList');
    table.ddTableFilter();
    table.append(row.compose({
    'numRow': Task.get_id(),
    'name': Task.bugName,
    'status': Task.bugStatus,
    'priority': Task.bugPriority,
    'dueDate': Task.bugDueDate
    }));
    },
    addBugToArray: function(Task)
    { bugsArr.push(this); }*/
};

Task.getNextTaskId = function () {
    cntTaskId = DAL.getNextTaskId();
    return cntTaskId++;
};

Task.removeTaskId = function () {
    cntTaskId--;
    DAL.removeTaskId();
};

//Task.addNewTask=function(task){
//    return DAL.saveTaskOnServer(task);
//};

Task.saveTask = function (task, isNew, form) {
    if (!isNew) {
        form.validate({
            ignore: ".ignore"
        });
    }

    if (!form.valid())
        return false;


    if (!isNew) {
        DAL.editTaskInArray(task, task.ProjectManagementTaskId);
    }
    else {
            DAL.addTaskToArray(task);
    }
    return DAL.saveTaskOnServer(task, form);
};

//DAL.saveTaskOnServer(task).done(function (response) {
//    //Tasks.editTaskObject(name, description, category, owner, files, table, num);
//    Tasks.editTaskObjectByTask(task);
//    EditRowForTask(name, description, status, dueDate, category, assign, owner, files, table, num);
//    colorObjectRowByDueDateAndStatus(task, table);
//});

Task.addTaskObject = function (name, description, status, dueDate, category, assign, owner, files, tasksTable) {
    var task1 = new Tasks(name, description, status, dueDate, category, assign, owner, files);
    //Tasks.addNewTaskRow1(task1, tasksTable);
    //Bugs.closeTable();
    DAL.addTaskToArray(task1);

    return task1;

};

//Task.editTaskObject = function (name, description, status, dueDate, category, assign, owner, files, tasksTable, num) {
//    var task1 = new Tasks(name, description, status, dueDate, category, assign, owner, files, tasksTable);
//    DAL.editTaskInArray(task1, num);
//};

//Task.editTaskObjectByTask = function (task) {
   
//    DAL.editTaskInArray(task, task.ProjectManagementTaskId);

//};





Task.addNewTaskRow1 = function (Task, table) {


};

Task.getTasksArray = function () {
    var arr = DAL.getTasksArray();
    return arr;
};

inherit(Task, US);

return Task;
})();
	
	