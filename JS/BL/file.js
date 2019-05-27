var cntFileID;

var Files = (function () {//m

    //constructor
    var File = function (filePath, fileContent, id) {

        
        this.id = id || cntFileID;
        this.filePath = filePath;
        this.fileContentt = fileContent;
    };

    File.initialFiles = function () {
        DAL.getFilesArray();
        cntFileID = DAL.getNextFileId();
    }

    //User.getNextFileId = function () {
    //    cntUserID = DAL.getNextUserId();
    //    return cntUserID;
    //};
    
    //User.addFileObject = function (firstName, lastName, password, permission, id) {
    //    var user1 = new Users(firstName, lastName, password, permission, id);
    //    DAL.addUserToArray(user1);
    //    return user1;

    //};

    

    //User.saveFile = function (file, isNew) {
    //    if (!isNew) {
    //        user.ProjectManagementUserId = user.id;
    //        this.editUserObject(user);
    //    }
    //    else {
    //        DAL.addUserToArray(user);
    //    }
    //    user.appName = user.name;
    //    DAL.saveUserOnServer(user);
    //};

       
    return File;
})();

