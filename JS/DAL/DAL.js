//login
var USER;// = "admin";
var PASSWORD;// = "123456";

var DAL = (function () {

    var bugsArr = [], tasksArr = [], designsArr = [];
    var usersArr = [], categoryArr = [];//[{ 1: "Categ1" }, { 2: "Categ2" }, {3:"Categ3" }];//mi

    var bugId = 0, taskId = 0, designId = 0, catId = 0, userId = 0;

    
    //constructor
    var dal = function () {
        //this.constructor;
    };

    dal.login = function (user, password) {
        return $.ajax('http://databarn.azurewebsites.net/Projectmanagement/data/ProjectManagementUser/GetAll', {
            crossDomain: false,
            method: 'GET'
        });
    }

    dal.getUsersArray = function () {//m
        if (usersArr.length == 0)
            //return this.getUsersFromServer().done(function () {
            //    return usersArr;
            //})
            this.getUsersFromServer();

        //else
            return usersArr;
    };

    dal.getCategoryArray = function () {//m
        if (categoryArr.length == 0)
            // return this.getCategoriesFromServer().done(function () {
            //    return categoryArr;
            //})
            this.getCategoriesFromServer();
        //else
            return categoryArr;
    };

    dal.editCategoryInArray = function (category, num) {

        // get the correct item
        var num = num;
        var exisiting = categoryArr.filter(function (x) {
            return x.id == num;
        });

        $.extend(exisiting[0], category); // merge updated to existing
    }

    dal.editUserInArray = function (user, num) {

        // get the correct item
        var num = num;
        var exisiting = usersArr.filter(function (x) {
            return x.id == num;
        });

        $.extend(exisiting[0], user); // merge updated to existing
    };

    

    dal.getUserFromArray = function (userName) {

        // get the correct item
        var userName = userName;
        var exisiting = usersArr.filter(function (x) {
            return x.name == userName;
        });

        return exisiting[0];
    };

    dal.getNextUserId = function () {
        var b = this.getUsersArray();
        var arrLength = b.length;
        if (arrLength > 0)
            userId = b[arrLength - 1].id + 1;
        return userId;
    };
    
    dal.addCategoryToArray = function (category) {
        categoryArr.push(category);
    };

    dal.addUserToArray = function (user) {
        usersArr.push(user);
    };

    dal.getNextCategoryId = function () {
        var b = this.getCategoryArray();
        var arrLength = b.length;
        if (arrLength > 0)
           catId = b[arrLength - 1].id + 1;
        return catId;
    };


    //bugs
    dal.addBugToArray = function (bug) {
        bugsArr.push(bug);
    };

    dal.getBugsArray = function () {

        //var self = this;
        //if (bugsArr.length == 0) {
        //    var tt = new Promise(function (resolve, reject) {
        //        resolve(self.getBugsFromServer());
        //    }).then(function () {
        //        return bugsArr;
        //    })
        //}

        //if (bugsArr.length == 0) {
        //    this.getBugsFromServer().done(function () {
        //        return bugsArr;
        //    })
            //}

       // if (bugsArr.length == 0) {

       //     this.getBugsFromServer();

       // }
       //// else
        //     return bugsArr;
        var self = this;
        //var tt = new Promise(function (resolve, reject) {
        //    var arr;
        //    if (bugsArr.length == 0)
        //        resolve(self.getBugsFromServer());

        //    //return bugsArr;

        //}).then(function (bugsArr) {
        //    return bugsArr;
        //});
        //var a = tt;

        //var t = a;
        
        if (bugsArr.length == 0)
            this.getBugsFromServer()//.then(function (s) {
                //return self.bugsArr;
            //});
        //else
            return bugsArr;
    };
    
    dal.getNextBugId = function () {
        var b = this.getBugsArray();
        var arrLength = b.length;
        if (arrLength > 0)
            bugId = b[arrLength - 1].get_id() + 1;
        return bugId;
    };

    dal.removePrevBugId = function () {
        bugId--;
    }

    dal.getBugsTemp = function () {
        var b1 = {
            get_id: function () { return "11"; },

            'name': "bug10",
            'status': "Open",
            'priority': "High",
            'dueDate': "2016-05-01",
            'category': "cat10"
        }

        var b2 = {
            get_id: function () { return "10"; },
            'name': "aabug10",
            'status': "Fixed",
            'priority': "High",
            'dueDate': "30.3.2016",
            'category': "acat10"
        }
        return b1;
    }

    dal.editBugInArray = function (bug, num) {

        // get the correct item
        var num = num;
        var exisiting = bugsArr.filter(function (x) {
            return x.get_id() == num;
        });

        $.extend(exisiting[0], bug); // merge updated to existing
    }

    //tasks
    dal.addTaskToArray = function (task) {
        tasksArr.push(task);
    };

    dal.getTasksArray = function () {
        if (tasksArr == 0)
            this.getTasksFromServer();
        return tasksArr;
    };

    dal.getNextTaskId = function () {
        var t = this.getTasksArray();
        var arrLength = t.length;
        if(arrLength > 0)
            taskId = t[arrLength - 1].get_id() ;

        taskId++;
        return taskId;
    };

    dal.removePrevTaskId = function () {
        taskId--;
    }

    dal.getTasksTemp = function () {
        var t1 = {
            get_id: function () { return "11"; },

            'name': "task10",
            'description': "aaa adflsld fsdf",
            'status': "Close",
            'dueDate': "4.30.2016",
            'category': "cat10"
        }

        return t1;
    }

    dal.editTaskInArray = function (task, num) {

        // get the correct item
        var exisiting = tasksArr.filter(function (x) {
            return x.get_id() == num;
        });

        $.extend(exisiting[0], task); // merge updated to existing
    }

    dal.addDesignToArray = function (design) {
        designsArr.push(design);
    };

    dal.getDesignsArray = function () {
        if(designsArr == 0)
            this.getDesignsFromServer();

        return designsArr;
    };

    dal.getNextDesignId = function () {
        var d = this.getDesignsArray();
        var arrLength = d.length;
        if(arrLength > 0)
            designId = d[arrLength - 1].get_id();

        designId++;
        return designId;
    };

    dal.removePrevDesignId = function () {
        designId--;
    }

    dal.getDesignsTemp = function () {
        var d1 = {
            get_id: function () { return "11"; },

            'category': "cat10",
            'name': "abc",
            'description': "aaa",
            'file': ""
        }

        return d1;
    }

    dal.editDesignInArray = function (design, num) {

        // get the correct item
        var exisiting = designsArr.filter(function (x) {
            return x.get_id() == num;
        });

        $.extend(exisiting[0], design); // merge updated to existing
    }

    dal.getTasksFromServer = function () {

        // tasks
        // get all
        return $.ajax('http://databarn.azurewebsites.net/Projectmanagement/data/ProjectManagementTask/GetAll', {
            crossDomain: false,
            async: false,
            method: 'GET'
        }).done(function (response) {
            tasksArr = response.map(function (d) {
                var dueDateFix = fixDate(d.dueDate)
                return new Tasks(d.titleName, d.description, d.status, d.priority, dueDateFix, d.CategoryId,
                                 d.assignTo, d.owner, d.files, d.ProjectManagementTaskId)
            });
        }).fail(function (error) { });
    };

    dal.saveTaskOnServer = function (task) {
		return $.ajax('http://databarn.azurewebsites.net/Projectmanagement/data/ProjectManagementTask/Save', {
			crossDomain: false,
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(task)
		}).done(function (response) {
		}).fail(function (error) { });
    };

    dal.deleteTaskOnServer = function (taskId) {
        return $.get('http://databarn.azurewebsites.net/Projectmanagement/data/ProjectManagementTask/Delete?id=' + taskId, {
            crossDomain: false,
            method: 'GET'
        }).done(function (response) {
        }).fail(function (error) { });
    };

    dal.getDesignsFromServer = function () {

        return $.ajax('http://databarn.azurewebsites.net/Projectmanagement/data/Design/GetAll', {
            crossDomain: false,
            async: false,
            method: 'GET'
        }).done(function (response) {
            designsArr = response.map(function (d) {
                return new Designs(d.titleName, d.description, d.CategoryId, d.owner, d.files, d.DesignId)
            });
        }).fail(function (error) { });
    };

    dal.saveDesignOnServer = function (design) {

        return $.ajax('http://databarn.azurewebsites.net/Projectmanagement/data/Design/Save', {
            crossDomain: false,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(design)
        }).done(function (response) {
        }).fail(function (error) { });
    };

    dal.deleteDeisgnOnServer = function (designId) {

        return $.ajax('http://databarn.azurewebsites.net/Projectmanagement/data/Design/Delete?id=' + designId, {
            crossDomain: false,
            method: 'GET'
        }).done(function (response) {
        }).fail(function (error) { });
    };

    dal.getBugsFromServer = function (callback) {

        return $.ajax('http://databarn.azurewebsites.net/Projectmanagement/data/Bug/GetAll', {
            crossDomain: false,
            async: false,
            method: 'GET'
        }).done(function (response) {
            bugsArr = response.map(function (d) {
                var dueDateFix = fixDate(d.dueDate)
                return new Bugs(d.titleName, d.description, d.status, d.priority, dueDateFix, d.CategoryId,
                                 d.assignTo, d.owner, d.files, d.BugId)
            });
            //callback(true);
        }).fail(function (error) { });
    };

    dal.saveBugOnServer = function (bug, form) {

        //if (form.prop('validity').valid) {
            return $.ajax('http://databarn.azurewebsites.net/Projectmanagement/data/Bug/Save', {
                crossDomain: false,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(bug)
            }).done(function (response) {
            }).fail(function (error) { });
     // }
    };

    dal.deleteBugOnServer = function (bugId) {

        return $.ajax('http://databarn.azurewebsites.net/Projectmanagement/data/Bug/Delete?id=' + bugId, {
            crossDomain: false,
            method: 'GET'
        }).done(function (response) {
        }).fail(function (error) { });
    };

    dal.getCategoriesFromServer = function () {

        return $.ajax('http://databarn.azurewebsites.net/Projectmanagement/data/Category/GetAll', {
            crossDomain: false,
            async: false,
            method: 'GET'
        }).done(function (response) {
            categoryArr = response.map(function (c) {                
                return new Categories(c.CategoryId, c.categoryName);
            });
        }).fail(function (error) { });
    };


    dal.saveCategoryOnServer = function (category) {
        //category.CategoryId = category.id;
        category.categoryName = category.name;
        return $.ajax('http://databarn.azurewebsites.net/Projectmanagement/data/Category/Save', {
            crossDomain: false,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(category)
        }).done(function (response) {
        }).fail(function (error) { });
    };

    dal.deleteCategoryOnServer = function (categoryId) {

        return $.ajax('http://databarn.azurewebsites.net/Projectmanagement/data/Category/Delete?id=' + categoryId.toString(), {
            crossDomain: false,
            method: 'GET'
        }).done(function (response) {
        }).fail(function (error) { });
    };

    dal.getUsersFromServer = function () {

        return $.ajax('http://databarn.azurewebsites.net/Projectmanagement/data/ProjectManagementUser/GetAll', {
            crossDomain: false,
            async: false,
            method: 'GET'
        }).done(function (response) {
            usersArr = response.map(function (u) {
                return new Users(u.firstName, u.lastName, u.appName, u.password, u.permission, u.ProjectManagementUserId);
            });
        }).fail(function (error) { });
    };

    dal.saveUserOnServer = function (user) {
        //user.ProjectManagementUserId = user.id;
        user.appName = user.name;

        return $.ajax('http://databarn.azurewebsites.net/Projectmanagement/data/ProjectManagementUser/Save', {
            crossDomain: false,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(user)
        }).done(function (response) {
        }).fail(function (error) { });
    };

    dal.deleteUserOnServer = function (userId) {

        return $.ajax('http://databarn.azurewebsites.net/Projectmanagement/data/ProjectManagementUser/Delete?id=' + userId, {
            crossDomain: false,
            method: 'GET'
        }).done(function (response) {
        }).fail(function (error) { });
    };

    return dal;
})();

var fixDate = function (dateTime) {
    if (dateTime)
        return dateTime.split('T')[0];
    return dateTime;
};