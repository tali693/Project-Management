
$(function () {

    initialBasicObjects();

    //login
    if (localStorage.getItem('user') != null) {
        if (localStorage.getItem('user'))
            $('#currentUser').html('Hi, ' + localStorage.getItem('user'));
    }
	
	function showPopupLogin() {
        $(".popupLogin").fadeIn(500);

        $(".login input[type='text']").focus();
        $(".login").keypress(function (e) {
            if (e.keyCode == 13)
                $(".login input[type='button']").click();
        });

        $(".login input[type='button']").click(function () {
            $('.login .loading').css('background', 'url(Media/images/loading.gif) center no-repeat');
            var valid = Login.login($(".login input[type='text']").val(), $(".login input[type='password']").val()).done(function(response) {

 	if (valid) {
                	if (localStorage.getItem('user') != null)
                    	$('#currentUser').html('Hi, ' + localStorage.getItem('user'));

              	 $('.login .loading').css('background', 'none');
                	$(".popupLogin").fadeOut(500);
            	}
            	else {
                	$(".login .errorMessage").css("visibility", "visible");
            	}

	});
           
        });
    }

	
	
    function initialBasicObjects() {
        var attCat = Categories.getCategoriesArray();
        var arrUser = Users.getUsersArray();

        $('.usersList').each(function (index, value) {
            fillDropDownByArray($(this), arrUser);
        });

        $('.categoryList').each(function (index, value) {
            fillDropDownByArray($(this), attCat);
        });
    };

    function showVideo() {
        $(".informationVideo").fadeIn(500);
    };

    if (!Login.isLogin()) {
        showPopupLogin();
    }

    $("#search").on('keyup', function (e) {
        filterBugs(e.target.value);
        filterDesigns(e.target.value);
        filterTasks(e.target.value)
    });

    $("header .logout").click(function () {
        Login.clearLocalStorage();
        showPopupLogin();
    });

    $("header .information").click(function () {
        closeAllPages();
        showVideo();
    });

    $("header .settings").click(function () {
        closeAllPages();
        $('#settings').show();
        var permission = Users.getUserPermissionByName(USER);
        if (permission == 'user') {
            $('.categoriesSettings').hide();
            $('.bugsSettings').hide();
            $('#addUser').hide();
        }
    });

    
    var part, checkedFields;
	
	$('#errorTaskName').hide();
	
    $(".mainMenu li").click(function () {

        var table = $('#designsList tbody');

        $('table').tablesorter();

        closeAllPages();

		part = $(this).attr('id');
		
        var cntColumns = $('#' + part + 'List th').length;
        checkedFields = [cntColumns];
        var i;
        for (i = 1; i <= cntColumns; i++) {
            checkedFields[i] = 1;
        }

        
        $(".mainMenu").children().removeClass("active");
        $("#" + part).addClass("active");
        $("." + part + "").show();

        switch (part) {
            case "designs":
                
                var table = $('#designsList tbody');
                table.find('tr').remove();

                Designs.getDesignsArray().forEach(function (d) {
                    AddRowForDesign(d, table);
                });
                
                break;
            case "tasks":

                var table = $('#tasksList tbody');
                table.find('tr').remove();

                Tasks.getTasksArray().forEach(function (t) {
                    AddRowForTask(t, table);//m
                });
                //})
                break;
            case "bugs":

                var table = $('#bugsList tbody');
                table.find('tr').remove();

                Bugs.getBugsArray().forEach(function (b) {
                    AddRowForBug(b, table);
                });

                break;
        }

        closeFilterPopup();
    });


    function fillDropDownByArray(selector, arr) {
        selector.find('.added').remove();

        for (var i = 0; i < arr.length; i++) {
            var opt = arr[i].name;
            var el = document.createElement("option");
            el.setAttribute("data-id", arr[i].id);
            el.setAttribute("class", "added");
            el.textContent = opt;
            el.value = opt;
            selector.append(el);
        }
    };


    $('.subMenu .dueDateFeedback').click(function () {
        if(part){
			if($('#' + part + 'List').hasClass('dueDateColors'))
				$('#' + part + 'List').removeClass('dueDateColors');
			else
				$('#' + part + 'List').addClass('dueDateColors');
        }
    });


    $('.subMenu .filter').click(function () {
        if (part && $('#filterFields').hasClass('not-active')) {
            var fields = '', i = 1, isChecked = '';
            $('#' + part + 'List thead th div').each(function () {
                if (checkedFields[i] == 1)
                    isChecked = 'checked';
                else
                    isChecked = '';
                i++;
                fields += '<input type="checkbox" value="' + $(this).html() + '" ' + isChecked + ' /><label>' + $(this).html() + '</label><br />';
            });
            $('#filterFields').removeClass('not-active');
            $('#filterFields').addClass('active');
            $('#filterFields form #btn_filter').before(fields);
            $('#filterFields').slideDown('fast');
        } else if (part && $('#filterFields').hasClass('active')) {
            closeFilterPopup();
        }
    });

    $('#filterFields #btn_filter').on('click', function () {
        // add style to filter fields
        var cntColumns = $('#' + part + 'List th').length;
        var styleFilter = '';

        for (i = 1; i <= cntColumns; i++) {
            styleFilter += '.hide' + i + ' td:nth-child(' + i + '), ';
            styleFilter += '.hide' + i + ' th:nth-child(' + i + '), ';

        }
        styleFilter = styleFilter.slice(0, -2);//remove last ', '
        styleFilter += '{display: none;}';
        $('style#filterTableStyle').html(styleFilter);

        // show only selected fields in table
        var i = 1;
        $('#filterFields form input[type=checkbox]').each(function () {
            $('#' + part + 'List').removeClass('hide' + i); // show all fields in table
            if (!$(this).is(':checked')) { // hide not checked fields in table
                $('#' + part + 'List').addClass('hide' + i);
                checkedFields[i] = 0;
            }
            else
                checkedFields[i] = 1;
            i++;
        });

        closeFilterPopup();
    });


    function clearFilterFieldsPopup(){
		$('#filterFields form').children().not('#btn_filter').each(function(){
			$(this).remove();
		});
	}

    function closeFilterPopup() {
        $('#filterFields').removeClass('active');
        $('#filterFields').addClass('not-active');
        $('#filterFields').slideUp('fast');
        removeFormFieldsExecptElement('#filterFields form', '#btn_filter');
    }

    $(".bugs").on('click', '.row', function () {
        $("div.bugs").hide();

        num = $(this).find('.bugNumber').html();
        name = $(this).find('.bugName').html();
        description = $(this).find('.bugDescription').html();
        status = $(this).find('.bugStatus').html();
        priority = $(this).find('.bugPriority').html();
        dueDate = $(this).find('.bugDueDate').html();
        category = $(this).find('.category').html();
        assign = $(this).find('.bugAssignTo').html();
        owner = $(this).find('.bugOwner').html();

        //owner = "";
        files = "";

        $("#bugNum").val(num);
        $("#bugName").val(name);
        $("#bugCategory").val(category);
        $("#bugDetails").val(description);
        $("#bugStatus").val(status);
        $("#bugPriority").val(priority);
        $("#bugDueDate").val(dueDate);
        $("#bugAssign").val(assign);
        $("#bugOwner").val(owner);
        
        $(".bug").show();
        Bugs.setCurrentBug(name, description, status, priority, dueDate, category, assign, owner, files);

    });


    $(".tasks").on('click', '.row', function () {
        $("div.tasks").hide();

        $("#taskNum").val($(this).find('.taskNumber').html());
        $("#taskName").val($(this).find('.taskName').html());
        $("#taskDescription").val($(this).find('.taskDescription').html());
        $("#taskStatus").val($(this).find('.taskStatus').html());
        $("#taskDueDate").val($(this).find('.taskDueDate').html());
        $("#taskCategory").val($(this).find('.category').html());
        $("#userName").val($(this).find('.userName').html());
        $("#taskAssignTo").val($(this).find('.taskAssignTo').html());
        $("#taskOwner").val($(this).find('.taskOwner').html());
        $(".fileName").val($(this).find('.taskFile').html());
        var aItems = $(this).find('.taskFile').find('a'); 
        for (var i = 0; i < aItems.length; i++) {
            if (aItems[i].getAttribute('data-blob') != "null" && aItems[i].getAttribute('data-blob') != null)
                fillImages(aItems[i].getAttribute('data-blob'), aItems[i].innerText);
            else
                fillImages(null, aItems[i].innerText);
        }

        $(".task").show();
    });


    $(".designs").on('click', '.row', function () {
        $("div.designs").hide();
        $("#designNum").val($(this).find('.designNumber').html());
        $("#designName").val($(this).find('.designName').html());
        $("#designDescription").val($(this).find('.designDescription').html());
        $("#designCategory").val($(this).find('.category').html());
        $("#userName").val($(this).find('.userName').html());
        $("#designOwner").val($(this).find('.designOwner').html());
        //$("#designFile").val($(this).find('.designFile').html());
        $(".fileName").val($(this).find('.designFile').html());
        var aItems = $(this).find('.designFile').find('a');
        for (var i = 0; i < aItems.length; i++) {
            if (aItems[i].getAttribute('data-blob') != "null" && aItems[i].getAttribute('data-blob') != null)
                fillImages(aItems[i].getAttribute('data-blob'), aItems[i].innerText);
            else
                fillImages(null, aItems[i].innerText);
        }
		
        $(".design").show();

    });



    //func


    //bugs
    $("#saveBug").click(function () {

        var num = $("#bugNum").val();

        var name = $("#bugName").val();
        var description = $("#bugDetails").val();
        var status = $("#bugStatus").val();
        var priority = $("#bugPriority").val();
        var dueDate = $("#bugDueDate").val();
        var category = $("#bugCategory").val();
        var owner = USER;
        var assign = $("#bugAssign").val();
        var fileText = $('#bugFile > span').text();
        var files = fileText ? [fileText] : [];
        var table = $('#bugsList tbody');

        var bug = new Bugs(name, description, status, priority, dueDate, category, assign, owner, files, num);
        var form = $('#bugForm');
        // no id than this is insert 
        var valid;
        if (num == '') {
            valid = Bugs.saveBug(bug, true, form);
            if (valid == false)
                return;
            AddRowForBug(bug, table);
        } else {
            bug.BugId = num;
            valid = Bugs.saveBug(bug, false, form);
            if (valid == false)
                return;
            EditRowForBug(bug, table);
        }

        $(".bug").hide();
        $("div.bugs").show();
        resetFields("#bugForm");
    });

    $("#closeBug").click(function () {
        $(".bug").hide();
        $("div.bugs").show();
        resetFields("#bugForm");
    });

    $('#newObject').hover(function () {
        if (part)
            $(this).prop('title', 'New ' + part.slice(0, -1));
    });

    $("#newObject").click(function () {
        $("div." + part).hide();
        $('.' + part.slice(0, -1)).show();
        $('#' + part.slice(0, -1)+'Owner').val(USER);
    });

    function fillImages(blobPath, filePath) {

        if (blobPath != null) {
            var end1 = filePath.split('.');
            var end = end1[end1.length - 1].toLowerCase();

            if (end == "jpeg" || end == "gif" || end == "jpg" || end == "png") {
                var fileWrapper = document.createElement("img");
                fileWrapper.setAttribute("src", blobPath);
                fileWrapper.setAttribute("class", "imgDisplay");
                fileWrapper.setAttribute("width", "150");
                $(".fileWrapper").append(fileWrapper).after(" ");
            }
        }
        fillLinks(filePath);
    }

    function fillLinks(filePath) {
        var fileWrapper = document.createElement("a");
        fileWrapper.href = filePath;
        fileWrapper.innerHTML = filePath;
        $(".fileWrapper").after(fileWrapper).after(" ");

    }

    $('[id*="File"]').change(function (event) {
        for (var i = 0; i < event.target.files.length; i++) {
            var blobPath = URL.createObjectURL(event.target.files[i]);
            fillImages(blobPath, event.target.files[i].name);
        }
    });

    $("#saveTask").click(function () {

        var num = $("#taskNum").val();

        var nameInput = $("#taskName");
        var name = nameInput.val();
        var description = $("#taskDescription").val();
        var status = $("#taskStatus").val();

        var dueDate = $("#taskDueDate").val();
        var category = $("#taskCategory").val();
        var owner = USER;
        var assign = $("#taskAssign").val();
        var fileText = $('#taskFile').val();
        var files = [];
        if (fileText) {
            if ($('#taskFile')[0].files.length > 1) {//save also the blob url in order to display in continuation            
                var prefix = fileText.split('\\')[0] + "\\" + fileText.split('\\')[1];
                for (var i = 0; i < $('#taskFile')[0].files.length; i++) {
                    var blob = $('.imgDisplay')[i].length == 0 ? "" : $('.imgDisplay')[0].getAttribute('src');
                    file = new Files(prefix + "\\" + $('#taskFile')[0].files[i].name, blob);
                    files.push(file);
                }
            }
            else {
                var blob = $('.imgDisplay').length == 0 ? "" : $('.imgDisplay')[0].getAttribute('src');
                file = new Files(fileText, blob);
                files.push(file);
            }
        }

        var table = $('#tasksList tbody');
        var task = new Tasks(name, description, status, null, dueDate, category, assign, owner, files, num);
        var valid;
        var form = $('#taskForm');
        // no id than this is insert 
        if (num == '') {
            valid = Tasks.saveTask(task, true, form);
            if (valid == false)
                return;
            AddRowForTask(task, table);
        } else {

            task.ProjectManagementTaskId = num;

            valid = Tasks.saveTask(task, false, form);
            if (valid == false)
                return;
            EditRowForTask(task, table);

        }

        $(".task").hide();

        $("div.tasks").show();
        resetFields("#taskForm");
    });

    $("#closeTask").click(function () {
        $(".task").hide();
        $("div.tasks").show();
        resetFields("#taskForm");
    });

    $("#saveDesign").click(function () {

        var num = $("#designNum").val();

        var name = $("#designName").val();
        var description = $("#designDescription").val();
        var category = $("#designCategory").val();
        var owner = USER;
        var fileText = $('#designFile').val();

        var files = [];
        if (fileText) {
            if ($('#designFile')[0].files.length > 1) {//save also the blob url in order to display in continuation            
                var prefix = fileText.split('\\')[0] + "\\" + fileText.split('\\')[1];
                for (var i = 0; i < $('#designFile')[0].files.length; i++) {
                    var blob = $('.imgDisplay')[i].length == 0 ? "" : $('.imgDisplay')[0].getAttribute('src');
                    file = new Files(prefix + "\\" + $('#designFile')[0].files[i].name, blob);
                    files.push(file);
                }
            }
            else {
                var blob = $('.imgDisplay').length == 0 ? "" : $('.imgDisplay')[0].getAttribute('src');
                file = new Files(fileText, blob);
                files.push(file);
            }
        }

        var table = $('#designsList tbody');

        var design = new Designs(name, description, category, owner, files);

        $(".design").hide();
        $("div.designs").show();
        resetFields("#designForm");
        var form = $("#designForm");
        var valid;

        // no id than this is insert 
        if (num == '') {
            valid = Designs.saveDesign(design, true, form);
            if (valid == false)
                return;
            AddRowForDesign(design, table);

        } else {
            design.DesignId = num;
            valid = Designs.saveDesign(design, false, form);
            if (valid == false)
                return;
            EditRowForDesign(design, table);
        }

    });

    $("#closeDesign").click(function () {
        $(".design").hide();
        $("div.designs").show();
        resetFields("#designForm");
    });



    //settings
    $('#settings #accordion').accordion({
        collapsible: true,
        heightStyle: "content"
    });

    $('#settings .ui-icon').addClass('sprite');

    $('#settings #addCategory').click(function () {
        slide($('#settings #addCategoryForm'));
		if($('#editCategory').css('display') == 'block')
            slide($('#settings #editCategory'));

    });

    $('#settings #addUser').click(function () {
        if ($('#userForm').css('display') == 'none')
            slide($('#settings #userForm'));

        resetFields('#settings #userForm');
         $('#permission').prop("readonly", false);

    });

    $('#settings #editUser').click(function () {
        if ($('#userForm').css('display') == 'none')
            slide($('#settings #userForm'));
        var user = Users.getUserByName(USER);
        var form = $('#settings');
        
            var firstName = form.find('#firstName');
            var lastName = form.find('#lastName');
            var appName = form.find('#appName');
            var password = form.find('#password');
            var permission = form.find('#permission');

            firstName.val(user.firstName);
            //firstName.prop("readonly", true);
            lastName.val(user.lastName);
            //lastName.prop("readonly", true);
            appName.val(user.name);
            //appName.prop("readonly", true);
            password.val(user.password);
            permission.val(user.permission);
            permission.prop("readonly", true);

        
    });

    $('#settings #saveUser').click(function () {

        var isNew;
        var user = Users.getUserByName(USER);
        var form = $('#settings');

        var firstName = form.find('#firstName').val();
        var lastName = form.find('#lastName').val();
        var appName = form.find('#appName').val();
        var password = form.find('#password').val();
        var permission = form.find('#permission').val();

        user = new Users(firstName, lastName, appName, password, permission);
        isNew = false;

        if (Users.getUserPermissionByName(USER) == 'admin') {
            if (appName != USER)
                isNew = true;
        }

        var form = $('#userForm');
        var valid;

        valid = Users.saveUser(user, isNew, form);
        if (valid != false) {
            if (isNew) {
                $('#messageUser').html('User ' + appName + ' was added succesfully!').fadeIn(1000);
                $('#messageUser').fadeOut(3000);
                resetFields('#settings #userForm');
            }
            else {
                $('#messageUser').html('User ' + appName + ' was changed succesfully!').fadeIn(1000);
                $('#messageUser').fadeOut(3000);
            }
            initialBasicObjects();
        }
    });

    $('#category').change(function () {

        categoryName = $(this).find(':selected').val();
        $('#categoryNewName').val(categoryName);
        slide($('#editCategory'));
        if($('#addCategoryForm').css('display') == 'block')
            slide($('#settings #addCategoryForm'));

    });


    $('.saveCategory').click(function () {

        if ($('#addedCategoryName').val() == "") {
            dataID = $('#category').find(':selected').data('id');
            name = $('#categoryNewName').val();
            isNew = false;
        }
        else {
            dataID = null;
            name = $('#addedCategoryName').val();
            isNew = true;
        }
        category = new Categories(dataID, name);
        Categories.saveCategory(category, isNew);
        
        $('#messageCategory').html('Category ' + name + ' was added succesfully!').fadeIn(1000);
        $('#messageCategory').fadeOut(3000);
        resetFields('#ui-id-4');
        initialBasicObjects();
    });

	$('#settings').click(function(){
	    //$('#messageUser, #messageCategory').css('display', 'none');
		removeFormFieldsExecptElement('#settings .bugsSettings + div form', '#saveBugsSettings');
		var bugsSettingsFields = '', isRequired, fieldName, dataId;
		$('#bugForm input:not([readonly],[type=button]), #bugForm select, #bugForm textarea').each(function(){
			if($(this).is(':required'))
				isRequired = 'checked';
			else
				isRequired = '';
			dataId = $(this).attr('id');
			fieldName = $("label[for='"+$(this).attr('id')+"']").html();
			if(fieldName)// regular fields - not dragging fields
				bugsSettingsFields += '<input type="checkbox" data-id="' + dataId + '" value="' + fieldName + '" ' + isRequired + ' /><label>'+ fieldName +'</label><br />';
		});
		$('#settings form #saveBugsSettings').before(bugsSettingsFields);
		
	});
			
	$('#settings #accordion .bugsSettings + div').click(function(e){
		e.stopPropagation();
	});
	
	$('#settings #saveBugsSettings').click(function(){
		$('#settings #accordion .bugsSettings + div form input[type=checkbox]').each(function(){
			if($(this).is(':checked')){ // hide not checked fields in table
				var inputId = $(this).attr('data-id');
				$('.bug #' + inputId).prop('required',true);
			}
		});
		
		$('#messageBugsSettings').html('Bugs settings were saved succesfully!').fadeIn(1000);
		$('#messageBugsSettings').fadeOut(3000);
	});
	
	//fields forms
	//set min date to today in dueDate fields
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	 if(dd < 10){
			dd = '0' + dd;
		} 
		if(mm < 10){
			mm = '0' + mm;
		} 

	today = yyyy + '-' + mm + '-' + dd;
	$('#taskDueDate, #bugDueDate').attr('min', today);
	
	
    //general functions
	function resetFields(form) {
		$(form).find('input[type=text], textarea, select, input[type=date], input[type=password], input[type=file], img[class=imgDisplay]').val('');
		$(form).find('img, a').remove();
		$('.error').css('display', 'none');
    }

	function closeAllPages() {
		part = '';
        $(".content .container").children().hide();
		$('.mainMenu li').removeClass('active');
        $('#videoWrapper').hide();
        $('#settings').hide();
		$('#exitVideo').click();
		$('#overlayVideo').css('display', 'block');
    }
	
    function slide(selector){
		if($(selector).hasClass('not-active')){
			$(selector).removeClass('not-active');
			$(selector).addClass('active');
			$(selector).slideDown('fast');
		}
		else{
			$(selector).removeClass('active');
			$(selector).addClass('not-active');
			$(selector).slideUp('fast');
		}
	}
	
	function removeFormFieldsExecptElement(form, element){
		$(form).children().not(element).each(function(){
			$(this).remove();
		});
	}
	
	
    //Compose template string
    String.prototype.compose = (function () {
        var re = /\{{(.+?)\}}/g;
        return function (o) {
            return this.replace(re, function (_, k) {
                return typeof o[k] != 'undefined' ? o[k] : '';
            });
        }
    }());

    var getColumnIndexByClass = function (table, columnClass) {

        var columns = $(table).find("th");
        var index;
        columns.each(function () {
            if ($(this).attr('class').indexOf(columnClass) >= 0) {
                index = columns.index(this);
                return;
            }
        });
        return index;
    };

    var colorObjectRowByDueDateAndStatus = function (obj, table, id) {

        if (!id)
            id = obj.get_id();

        var row = table.find("tr#" + id);
        row.removeClass("todayObject");
        row.removeClass("closeObject");
        row.removeClass("passedObject");
        row.removeClass("doneObject");

        //check if status is not done
        if (obj.status != "Close") {

            var duedate = obj.dueDate;

            var diffDays = US.getDateDifference(duedate, new Date());
            if (diffDays < 1 && diffDays >= -1)
                row.addClass("todayObject");
            else if (diffDays < 3 && diffDays > 0)
                row.addClass("closeObject");
            else if (diffDays < -1)
                row.addClass("passedObject");
        }
        else {
            row.addClass("doneObject");

        }
    };

  
    // Draw new row in table
    function AddRowForDesign(design, table) {

        design.CategoryName = Categories.getCategoryNameById(design.CategoryId);
        design.ownerName = Users.getNameUserById(design.owner);
        var files = "";

        if (design.files.length > 0) {
            design.files.forEach(function (file) {
                files += '<a data-blob=' + file.fileContent + '>' + file.filePath + '</a>';
            });
        }
        var row = '<tr id="{{numRow}}" class="row">' +
          '<td class="designNumber">{{numRow}}</td>' +
          '<td class="designName">{{name}}</td>' +
          '<td class="designDescription">{{description}}</td>' +
          '<td class="category">{{category}}</td>' +
          '<td class="owner">{{owner}}</td>' +
          '<td class="designFile">{{file}}</td>' +
          '</tr>';

        table.append(row.compose({
            'numRow': design.get_id(),
            'name': design.name || "",
            'description': design.description || "",
            'status': design.status || "",
            'dueDate': design.dueDate || "",
            'category': design.CategoryName || "",
            'owner': design.ownerName || "",
            'file': files
        }));
        colorObjectRowByDueDateAndStatus(design, table);

    }

    function EditRowForDesign(design, table) {

        var row = table.find("tr#" + design.DesignId);

        var designName = row.find('td.designName');
        var designDescription = row.find('td.designDescription');
        var designCategory = row.find('td.category');
        var designOwner = row.find('td.designOwner');
        var designFile = row.find('td.designFile');
        
        designName.text(design.name);
        designDescription.text(design.description);
        designCategory.text(Categories.getCategoryNameById(design.CategoryId));
        designOwner.text(design.owner);
        //designFile.text(design.files);
        if (design.files.length > 0) {

            design.files.forEach(function (file) {
                var a = document.createElement("a");
                a.textContent = file.filePath;
                a.value = file.filePath;
                a.setAttribute("data-blob", file.fileContent);
                designFile.after(a);
            });

        }
        colorObjectRowByDueDateAndStatus(design, table);

    }

    function AddRowForTask(task, table) {

        task.assignToName = Users.getNameUserById(task.assignTo);
        task.ownerName = Users.getNameUserById(task.owner);
        task.CategoryName = Categories.getCategoryNameById(task.CategoryId);
        var files = "";

        if (task.files.length > 0) {
            task.files.forEach(function (file) {
                files += '<a data-blob=' + file.fileContent + '>' + file.filePath + '</a>';
            });
        }
        var row = '<tr id="{{numRow}}" class="row">' +
          '<td class="taskNumber">{{numRow}}</td>' +
          '<td class="taskName">{{name}}</td>' +
          '<td class="taskDescription">{{description}}</td>' +
          '<td class="taskStatus" >{{status}}</td>' +
          '<td class="taskDueDate">{{dueDate}}</td>' +
          '<td class="category">{{category}}</td>' +
          '<td class="taskAssignTo">{{assignTo}}</td>' +
          '<td class="taskOwner">{{owner}}</td>' +
          '<td class="taskFile">{{file}}</td>' +
          '</tr>';


        table.append(row.compose({
            'numRow': task.get_id() || "",
            'name': task.name || "",
            'description': task.description || "",
            'status': task.status || "",
            'dueDate': task.dueDate || "",
            'category': task.CategoryName || "",
            'assignTo': task.assignToName || "",
            'owner': task.ownerName,
            'file': files
        }));

        colorObjectRowByDueDateAndStatus(task, table);

    }

    function EditRowForTask(task, table) {//name, description, status, dueDate, category, assign, owner, files, table, num) {

        var row = table.find("tr#" + task.get_id());//num//ProjectManagementTaskId

        var taskName = row.find('td.taskName');
        var taskDescription = row.find('td.taskDescription');
        var taskStatus = row.find('td.taskStatus');
        var taskDueDate = row.find('td.taskDueDate');
        var taskCategory = row.find('td.category');
        var taskFile = row.find('td.taskFile');
        var taskAssign = row.find('td.taskAssignTo');
        var taskOwner = row.find('td.owner');

        taskName.text(task.name);
        taskDescription.text(task.description);
        taskStatus.text(task.status);
        taskDueDate.text(task.dueDate);
        taskCategory.text(Categories.getCategoryNameById(task.CategoryId));
        //taskFile.text(task.files);
        taskAssign.text(Users.getNameUserById(task.assignTo));
        taskOwner.text(task.taskOwner);
        if (task.files.length > 0) {

            task.files.forEach(function (file) {
                var a = document.createElement("a");
                a.textContent = file.filePath;
                a.value = file.filePath;
                a.setAttribute("data-blob", file.fileContent);
                taskFile.after(a);
            });

        }
        colorObjectRowByDueDateAndStatus(task, table);
    }

    function AddRowForBug(bug, table) {

        bug.assignToName = Users.getNameUserById(bug.assignTo);
        bug.ownerName = Users.getNameUserById(bug.owner);
        bug.CategoryName = Categories.getCategoryNameById(bug.CategoryId);

        var row = '<tr id="{{numRow}}" class="row">' +
          '<td class="bugNumber">{{numRow}}</td>' +
          '<td class="bugName">{{name}}</td>' +
          '<td class="bugDescription">{{description}}</td>' +
          '<td class="bugStatus" >{{status}}</td>' +
          '<td class="bugPriority">{{priority}}</td>' +
          '<td class="bugDueDate">{{dueDate}}</td>' +
          '<td class="category">{{category}}</td>' +
          '<td class="designFile">{{file}}</td>' +
          '<td class="bugAssignTo">{{assignTo}}</td>' +
          '<td class="bugOwner">{{owner}}</td>' +
          '</tr>';

        table.append(row.compose({
            'numRow': bug.get_id(),
            'name': bug.name || "",
            'description': bug.description || "",
            'status': bug.status || "",
            'priority': bug.priority || "",
            'dueDate': bug.dueDate || "",
            'category': bug.CategoryName || "",
            'file': bug.file,
            'assignTo': bug.assignToName,
            'owner': bug.ownerName
        }));
        colorObjectRowByDueDateAndStatus(bug, table);
    }



    function EditRowForBug(bug, table) {//name, description, status, priority, dueDate, category, assign, owner, files, table, num) {
        
        var row = table.find("tr#" + bug.get_id());

        var bugName = row.find('td.bugName');
        var bugStatus = row.find('td.bugStatus');
        var bugDescription = row.find('td.bugDescription');
        var bugPriority = row.find('td.bugPriority');
        var bugDueDate = row.find('td.bugDueDate');
        var bugCategory = row.find('td.category');
        var bugFile = row.find('td.bugFile');
        var bugAssign = row.find('td.bugAssignTo');
        var bugOwner = row.find('td.owner');

        bugName.text(bug.name);
        bugDescription.text(bug.description);
        bugStatus.text(bug.status);
        bugPriority.text(bug.priority);
        bugDueDate.text(bug.dueDate);
        bugCategory.text(Categories.getCategoryNameById(bug.CategoryId));
        bugFile.text(bug.files);
        bugAssign.text(Users.getNameUserById(bug.assignTo));
        bugOwner.text(bug.owner);
        colorObjectRowByDueDateAndStatus(bug, table);

    }
});

jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function (arg) {
    return function (elem) {
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

function filterBugs(text) {
    $("#bugsList tr").slice(1).each(function (d) { // slice is to skip the first row which is the header
        var $tr = $(this);
        if ($tr.find("td.bugName:Contains('" + text + "'), td.bugDescription:Contains('" + text + "')").length > 0) {
            $tr.css('display', 'table-row');
        } else {
            $tr.css('display', 'none');
        }
    });
}

function filterTasks(text) {
    $("#tasksList tr").slice(1).each(function (d) { // slice is to skip the first row which is the header
        var $tr = $(this);

        if ($tr.find("td.taskName:Contains('" + text + "'), td.taskDescription:Contains('" + text + "')").length > 0) {
            $tr.css('display', 'table-row');
        } else {
            $tr.css('display', 'none');
        }
    });
}


function filterDesigns(text) {
    $("#designsList tr").slice(1).each(function (d) { // slice is to skip the first row which is the header
        var $tr = $(this);

        if ($tr.find("td.designName:Contains('" + text + "'), td.designDescription:Contains('" + text + "')").length > 0) {
            $tr.css('display', 'table-row');
        } else {
            $tr.css('display', 'none');
        }
    });
}

function allowDrop(e) {
    e.preventDefault();
}

function drop(e) {
    $('#bugFile > span').html(e.dataTransfer.files[0].name);
    e.preventDefault();
}