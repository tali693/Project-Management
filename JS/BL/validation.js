$(function () {
	
    var requiredMessage = function (field) {
        if (field.validity.valueMissing) {
            field.setCustomValidity('Required Field!');
        } else {
            field.setCustomValidity('');
        }
    };
    
    $('input[required]').each(function () {
		requiredMessage(this); 
	}).change(function () {
		requiredMessage(this); 
	});
	
    $('#designForm input').blur(function () {
        if ($(this).siblings('.errorMsg').length == 0) {
            var errorSpan = $('<span></span>').addClass('errorMsg').insertAfter($(this));
        }
        else {
            var errorSpan = $(this).siblings('.errorMsg');
        }
        if (this.willValidate && !this.validity.valid) {
            errorSpan.text(this.validationMessage);
        }
        else {
            errorSpan.remove();
        }
        
    });
});