function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}

String.prototype.renderTip = function (context) {
    return renderTip(this, context);
};

if(nospecialtip == false){
	var re = /x/;
	console.log(re);
	re.toString = function() {
		showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
		return '';
	};

	$(document).on('copy', function (){
		showMessage('你都复制了些什么呀？转载要记得加上出处哦！', 5000);
	});
}

$("#landlord,#live2d").mousedown(function(e) {
	if (3 == e.which)
	showMessage("秘密通道:<br><a href=\""+home_Path+"\">首页</a> <a href=\""+home_Path+"wp-admin/\">登录</a>",5000);
})

function initTips(){
    $.ajax({
        cache: true,
        url: `${message_Path}message.json.php`,
        dataType: "json",
        success: function (result){
            $.each(result.mouseover, function (index, tips){
                $(tips.selector).mouseover(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
            $.each(result.click, function (index, tips){
                $(tips.selector).click(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
        }
    });
}
initTips();

(function (){
	$('#landlord').bind("contextmenu", function() {return false;});
	$('#landlord').bind("selectstart", function() {return false;});
    var text;
    /*if(document.referrer !== ''){
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        if(`${home_Path}`.indexOf(referrer.hostname) > 0 ){return;}
        text = '嗨！来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友！';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'github') {
            text = '来自GitHub的大佬吗？<br>给大佬递茶。';
        }else if (domain == 'bing') {
            text = '用必应找到我的吗？<br>看来你是初次造访的客人呢。';
        }else if (domain == 'google') {
            text = '来自谷歌的客人？<br>你一定是一个技术宅吧！</span>';
        }
    }else {*/
        if (window.location.href == `${home_Path}`) { //主页URL判断，需要斜杠结尾
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = '今天也要爆肝吗？早点碎觉有益健康哦。';
            } else if (now > 5 && now <= 7) {
                text = '早上……好。真想回去再睡一会儿。';
            } else if (now > 7 && now <= 11) {
                text = '喂，上课时间看什么网站，好好听课去。';
            } else if (now > 11 && now <= 14) {
                text = '午餐时间！吃点什么好呢？';
            } else if (now > 14 && now <= 17) {
                text = '那边的特困生！你这表情就像是睡着了一样~';
            } else if (now > 17 && now <= 19) {
                text = '今晚吃什么永远是个难题……你有没有决定好晚上的菜单呢？';
            } else if (now > 19 && now <= 21) {
                text = '晚上了，不去玩会儿游戏放松一下吗？';
            } else if (now > 21 && now <= 23) {
                text = '已经这么晚了呀，早点休息吧，晚安~~';
            } else {
                text = '然而主人并没有好好设计我的对话功能。';
            }
		} else {
            text = '你正在阅读<br><span style="color:#0099cc;">「 ' + document.title.split(' – ')[0] + ' 」</span>';
        }
    //}
    showMessage(text, 12000);
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
			showMessage("要出门了吗？（我不觉得你能看到这句话）", 5000);
        } else {
			showMessage("欢迎回来，记得把门把手上的指纹擦干净哦。", 5000);
        }
    });
})();

if(nohitokoto == false){
	var getActed = false;
	window.hitokotoTimer = 0;
	var hitokotoInterval = false;

	$(document).mousemove(function(e){getActed = true;}).keydown(function(){getActed = true;});
	setInterval(function() { if (!getActed) ifActed(); else elseActed(); }, 1000);

	function ifActed() {
		if (!hitokotoInterval) {
			hitokotoInterval = true;
			hitokotoTimer = window.setInterval(showHitokoto(localkoto), 20000);
		}
	}

	function elseActed() {
		getActed = hitokotoInterval = false;
		window.clearInterval(hitokotoTimer);
	}
}

function showHitokoto(lk){
	if(lk) {
		$.getJSON(message_Path+'localkoto.json.php',function(result){
			showMessage(result.localkoto, 5000);
		});
	}
	else {
		$.getJSON('https://v1.hitokoto.cn/',function(result){
			showMessage(result.hitokoto, 5000);
		});
	}
}

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    //console.log('showMessage', text);
    $('.message').stop();
    $('.message').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout){
    $('.message').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.message').delay(timeout).fadeOut(200);
}

function positionWrap(){
	$('.h2wrap, .h3wrap').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
			if ($target.length) {
				var targetOffset = $target.offset().top;
				$('html,body').animate({
					scrollTop: targetOffset
				},
				800);
				return false;
			}
		}
	});
}

function initLive2d (){
	var theModel = new Array("夕立", "时雨");
	var modelIdx = 0;
	$('#landlord').append("<ul class=\"l2d-menu\"><li class=\"l2d-action\" id=\"change-button\">编成</li><li class=\"l2d-action\" id=\"hide-button\">隐藏</li></ul>");
	if(false == nocatalog) $('.l2d-menu').prepend("<li class=\"l2d-action\" id=\"catalog-button\">目录</li>");
	$('body').append("<div class=\"show-button\">召唤</div>");
    if ($('.l2d-menu').fadeOut(0)){
		$('#hide-button').on('click', () => {
			$('#landlord').css('display', 'none');
			$('.show-button').fadeIn(300);
		});
		$('#change-button').on('click', () => {
			modelIdx = (modelIdx + 1) % theModel.length;
			loadlive2d('live2d',message_Path+'model/'+theModel[modelIdx]+'/model.json');
			showMessage("秘书舰已切换成"+theModel[modelIdx],5000);
		});
		if(false == nocatalog){
			$('#catalog-button').on('click', () => {
				var tits = 0;
				var catalog;
				if ($('article h2').length || $('article h3').length) {
					catalog = "<p class=\"l2d-cat\">这里有文章的目录哦~</p><br>";
					$('article h2, article h3').each(function(){
						$(this).attr("id","title-" + tits);
						if(0 == $(this).filter('h2').val()) catalog += "<p class=\"l2d-h2cat\">&raquo;<a class=\"h2wrap\" href=\"#title-"+tits+"\">"+$(this).text()+"</a></p><br>";
						if(0 == $(this).filter('h3').val()) catalog += "<p class=\"l2d-h3cat\">&raquo;<a class=\"h3wrap\" href=\"#title-"+tits+"\">"+$(this).text()+"</a></p><br>";
						tits++;
					});
					setTimeout("positionWrap()",200);
				}
				else {
					catalog = "然而这里并没有目录。";
				}
				showMessage(catalog, 10000);
			});
		}
	}
    $('#landlord').hover(() => {
        $('.l2d-menu').fadeIn(600)
    }, () => {
        $('.l2d-menu').fadeOut(600)
    });
	$('.show-button').on('click', () => {
		$('#landlord').css('display', 'block');
		$('.show-button').fadeOut(300);
	})
}
initLive2d ();
