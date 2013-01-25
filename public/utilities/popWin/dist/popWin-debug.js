/**********************************************************************************************
 * 名称: 弹出层管理工具 - 统一控制层级,遮罩
 * 
 * API:
 * 		$.popManager.clean() 清除所有的弹出层包含块
 * 		p = $.popManager.init() 初始化一个弹出层包含块
 * 		p.front() 将此层放到最前面
 * 		p.mask() 使用遮罩
 * 		p.mask(false) 去除遮罩
 * 		p.remove() 删除此层
 * 
 * 		p.div 最外层元素的jquery对象
 * 		p.div.appendTo('body') 将层放到dom树中
 */
define("#popWin/0.0.1/popManager-debug", [ "$-debug" ], function(require, exports) {
    var $ = require("$-debug");
    var EMPTY_$ = $(""), base_z_index = 1e3, html_string = '<div id="html" class="popManager"></div>', ifr_string = '<iframe style="position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;filter:alpha(opacity=0);" frameborder="no" scrolling="no"></iframe>', mask_string = '<div id="mask" style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000;filter:alpha(opacity=20);"></div>', ie6 = /*@cc_on!@*/ !1 && /msie 6.0/i.test(navigator.userAgent) && !/msie 7.0/i.test(navigator.userAgent), m = {}, _uid = 0, uid = function() {
        return ++_uid + base_z_index;
    };
    m.divs = EMPTY_$;
    //初始化一个弹出层包含块
    m.init = function() {
        return new init().front();
    };
    //清除所有的弹出层包含块
    m.clean = function() {
        m.divs.remove();
        m.divs = EMPTY_$;
        _uid = 0;
        return this;
    };
    function init() {
        this.div = $(html_string);
        if (ie6) {
            this.div.append(ifr_string);
        }
        this.mask();
        m.divs = m.divs.add(this.div);
    }
    $.extend(init.prototype, {
        //放到最前
        front: function() {
            this.div.css("z-index", uid());
            return this;
        },
        remove: function() {
            this.div.remove();
            return this;
        },
        mask: function(use) {
            if (use == false) {
                if ($.browser.msie) {
                    this.div.children("div:first").remove();
                } else {
                    this.div.css("background-color", "");
                }
                this.__mask = 0;
            } else {
                if (this.__mask) {} else if ($.browser.msie) {
                    this.div.prepend(mask_string);
                    this.__mask = 1;
                } else {
                    this.div.css("background-color", "rgba(0, 0, 0, 0.2)");
                    this.__mask = 1;
                }
            }
            return this;
        },
        loading: function(str) {
            if (str == false) {
                this.div.removeClass("loading");
            } else {
                this.div.addClass("loading");
            }
            return this;
        }
    });
    $.extend({
        popManager: m
    });
});

/**********************************************************************************************
 * 名称: 弹出窗口
 * 
 * API:
 * 		$.popWin.clean() 清除所有的弹出层
 * 
 *		arguments: follow default:false
 * 		var p = $.popWin.init(options) 初始化一个弹出层
 * 			options.title	标题 ("")
 * 			options.follow	是否随窗口移动 （false）
 * 		p.front() 将此层放到最前面
 * 		p.mask() 使用遮罩
 * 		p.mask(false) 去除遮罩
 * 		p.remove() 删除此层
 * 
 * 		p.div 最外层元素的jquery对象
 * 		p.show() 显示弹出窗口
 * 		p.hide() 隐藏弹出窗口
 *		
 */
define("#popWin/0.0.1/popWin-debug", [ "./popManager-debug", "$-debug" ], function(require, exports) {
    var $ = require("$-debug");
    require("./popManager-debug");
    var ie6 = /*@cc_on!@*/ !1 && /msie 6.0/i.test(navigator.userAgent) && !/msie 7.0/i.test(navigator.userAgent);
    var EMPTY_$ = $(""), html_string = '<div class="win1-wrap"><div class="win1-title-wrap"><span class="win1-title">title</span><a class="win1-close" href="#"></a></div><div class="win1-content-wrap"><div class="win1-content"></div></div></div>', popWin = {};
    var defaults = {
        follow: false,
        title: "",
        width: 500,
        height: "auto",
        closeable: true,
        hideCloseBtn: false,
        // Event
        // closeCallback:if return === false, don't close the pop window
        closeCallback: null
    };
    popWin.divs = EMPTY_$;
    popWin.init = function(options) {
        return new init(options);
    };
    popWin.clean = function() {
        $.popManager.clean();
    };
    function init(options) {
        var self = this, div = $(html_string);
        options = $.extend({}, defaults, options);
        //保存到全局
        popWin.divs = popWin.divs.add(div);
        //设置属性
        self.div = div;
        self.close = div.find("a.win1-close");
        self.title = div.find("span.win1-title");
        self.content = div.find("div.win1-content");
        self.close_able = options.closeable;
        self.follow = options.follow;
        self.manager = $.popManager.init();
        self.div.appendTo("body");
        self.manager.div.appendTo("body");
        self.div.css("z-index", self.manager.div.css("z-index") + 1);
        self.div.width(options.width);
        self.content.height(options.height);
        self.title.text(options.title);
        self.closeCallback = options.closeCallback;
        if (self.follow && !ie6) self.div.css("position", "fixed");
        if (options.hideCloseBtn) self.close.hide();
        div.data("popWin", self);
        //设置关闭按钮
        self.close.click(function(e) {
            self.hide();
            e.preventDefault();
        });
        // //设置关闭按钮
        // self.div.click(function(e){
        // 	if($(e.target).is('.win1-btn-cancle')){
        // 		self.hide();
        // 	}
        // });
        //设置不能拖动的地方
        self.content.add(self.close).mousedown(function(e) {
            e.stopPropagation();
        });
    }
    $.extend(init.prototype, {
        front: function() {
            this.manager.front();
            return this;
        },
        mask: function(use) {
            this.manager.mask(use);
            return this;
        },
        loading: function(str) {
            if (str == false) {
                this.div.show();
                this.manager.loading(str);
            } else {
                this.div.hide();
                this.manager.loading(str);
            }
            return this;
        },
        show: function() {
            this.div.show();
            this.manager.div.show();
            this.div.css({
                //top: (document.documentElement.clientHeight-this.div.height())/3+$(document).scrollTop()
                top: (document.documentElement.clientHeight - this.div.height()) / 3 + (this.follow && !ie6 ? 0 : $(document).scrollTop()),
                left: (document.documentElement.clientWidth - this.div.width()) / 2
            });
            this.div.find("input:visible,textarea:visible").eq(0).focus();
            return this;
        },
        hide: function(empty) {
            if (this.close_able) {
                if (this.closeCallback && this.closeCallback() === false) {
                    return;
                }
                this.div.hide();
                this.manager.div.hide();
                if (empty) this.content.empty();
            }
            return this;
        },
        remove: function() {
            this.div.remove();
            this.manager.div.remove();
            return this;
        }
    });
    $.extend({
        popWin: popWin
    });
});