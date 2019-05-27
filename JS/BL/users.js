var cntUserID;

var Users = (function () {//m

    //constructor
    var User = function (firstName, lastName, appName, password, permission, id) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.name = appName;
        this.password = password;
        this.permission = permission;
        this.id = id || cntUserID || User.getNextUserId();
    };


    User.getNextUserId = function () {
        cntUserID = DAL.getNextUserId();
        return cntUserID;
    };
    
    User.addUserObject = function (firstName, lastName, password, permission, id) {
        var user1 = new Users(firstName, lastName, password, permission, id);
        DAL.addUserToArray(user1);
        return user1;

    };

    User.getIdUserByName = function (name) {
        return getUserByName(name);
    };

    User.getNameUserById = function (id) {
        return getUserById(id);
    };

    User.getUsersArray = function (id) {
        var arr = DAL.getUsersArray();
        return arr;
    };


    User.saveUser = function (user, isNew, form) {
        if (form.valid()) {
            if (!isNew) {
                user.id = User.getUserByName(user.name).id;
                user.ProjectManagementUserId = user.id;
                this.editUserObject(user);
            }
            else {
                DAL.addUserToArray(user);
            }
            user.appName = user.name;
            DAL.saveUserOnServer(user);
        }
        else
            return false;
    };


    User.editUserObject = function (user) {
        DAL.editUserInArray(user, user.id);
    };


    User.getUserPermissionByName = function (userName) {
        var uName = DAL.getUserFromArray(userName);
        return uName.permission;

    };


    User.getUserByName = function (userName) {
        var uName = DAL.getUserFromArray(userName);
        return uName;

    };



    //User.saveUser = function (user, isNew) {
    //    DAL.saveUserOnServer(user);
    //    if (!isNew)
    //        this.editUserObject(user);
    //};


    User.editUserObject = function (user) {
        DAL.editUserInArray(user, user.id);
    };
       
    return User;
})();

var  getUserByName = function (name) {
    if (name != null) {
        var user1 = DAL.getUsersArray().filter(function (user) {
            return user.name == name;
        })[0];
        if (user1 != undefined)
            return user1.id.toString();
    }
};

var getUserById = function (id) {
    if (id != null) {
        var user1 = DAL.getUsersArray().filter(function (item) {
            return item.id == id;
        })[0];
        if(user1 != undefined)
            return user1.name;
    }
};