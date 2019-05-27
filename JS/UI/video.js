$(function () {
	
	var media = $('#video')[0], seconds = '';
	
    $('#playVideo').click(function () {
        if (!media.paused) {
            media.pause();
			$(this).css('background-position', '0 -851px');
            clearInterval(report);
        } else {
            media.play();
			$('#overlayVideo').fadeOut(500);
            $(this).css('background-position', '0 -884px');
			report = setInterval(reportProgress, 100);
        }
    });
	
    media.onpause = function () {
        media.currentTime = 0;
        reportProgress();
        $(this).css('background-position', '0 -851px');
		clearInterval(report);
    };
    
	$('#mute').click(function () {
        if (media.muted) {
            media.muted = false;
			$(this).css('background-position', '0 -950px');
        }
        else {
            media.muted = true;
			$(this).css('background-position', '0 -917px');
        }
    });
    
	$('#volume').change(function () {
        media.volume = this.value;
    });
    
	$('#full').click(function () {
        $('#videoWrapper')[0].webkitRequestFullScreen();
    });
    
	var reportProgress = function () {
        var currentTime = media.currentTime;
        var totalLen = media.duration;
        var progressWidth = getComputedStyle($('#progress')[0]).width;
        progressWidth = progressWidth.substring(0, progressWidth.lastIndexOf('px'));
        var visualWidth = currentTime / totalLen * progressWidth - 2;
        $('#played').css('width', visualWidth + 'px');
    };

	($('#video')).on('timeupdate', function() {
		if(media.currentTime < 10)
			seconds = '0';
		else{
			seconds = '';
			if(media.currentTime == media.duration){
				$('#playVideo').css('background-position', '0 -851px');
			}
		}
        $('#videoTimePass').text('00:' + seconds + Math.round(media.currentTime));
    });
    
    $('#progress').click(function (e) {
        var progElem = $('#progress');
        var clickLocation = e.pageX - (progElem[0].offsetLeft + progElem.offsetParent().offset().left);
        var progressWidth = getComputedStyle(progElem[0]).width;
        progressWidth = progressWidth.substring(0, progressWidth.lastIndexOf('px'));
        var time = clickLocation / progressWidth * media.duration;
        media.currentTime = time;
        reportProgress();
    });

    $('#exitVideo').click(function () {
        $('#videoWrapper').hide();
        media.pause();
        $('#playVideo').css('background-position', '0 -851px');
		media.currentTime = 0;
        reportProgress();
    });

    ($('#video')).on('durationchange', function () {
        $('#videoDuration').text('/ 00:' + Math.round(media.duration));
    });

})