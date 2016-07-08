/*! 基于分离规则的复杂表单计算方法
*/
(function($) {
	$.calculate = function(form, rule) {
		if (!rule) return;
		form = $(form);

		// 序列化对象 - 本质是个表单name值存储器，作用是：动态表单中即使某些元素删除，也能无需额外配置，正常使用
		var oSerialize = form.data("serialize") || {};

		var oCal = {}, isNum = function(value) {
			// value可能是NaN
			return 	typeof value == "number" && (value || value === 0);
		};

		// 序列化对象所有的值重置
		$.each(oSerialize, function(name) {
			oSerialize[name] = 0;
		});
		// 序列化对象的重新赋值以及存储
		form.find(":input").each(function() {
			var val, name = this.name, type = this.type;
			if (name) {
				val = $(this).val();
				// 单选框与复选框组name值一致，特殊处理
				if (/radio|checkbox/.test(type)) {
					if (oSerialize[name]) return;
					if (this.checked && !this.disabled) {
						oSerialize[name] = val * 1 || val;
					} else {
						// 禁用或没有选中，值为0
						oSerialize[name] = 0;
					}
				} else {

					// 下面这些情况val值需要当作0处理
					// 1. 没有值
					// 2. disabled禁用
					if (!val || this.disabled) {
						val = 0;
					}
					oSerialize[name] = val * 1 || val;
				}
			}
		});
		// 存储
		form.data("serialize", oSerialize);
		// 合并
		oCal = $.extend({}, oSerialize);

		// 第一次遍历，主要作用是赋值
		$.each(rule, function(id, fun) {
			var value = $.isFunction(fun)? fun.call(oCal): fun;
			if (!isNum(value)) value = 0;
			oCal[id] = value;
		});

		// 第二次遍历，最终计算、DOM元素显示计算值
		// 两次遍历可以实现规则无序，以及双重计算效果（直接计算以及利用之前的计算结果）
		// 两次遍历都是针对的数据，因此，性能损耗可以忽略不计
		$.each(rule, function(id, fun) {
			var eleResult = /^\W|\[|\:/.test(id)? $(id) : $("#" + id), value = oCal[id] || ($.isFunction(fun)? fun.call(oCal): fun) || 0;
			// 再次取值 - 主要针对前一次没有取值成功的键
			if (isNum(value) && eleResult.length) {
				!oCal[id] && (oCal[id] = value);
				value = String(Math.round(value * 100) / 100).replace(/\.00/, "");
				eleResult.each(function() {
					if (/^input$/i.test(this.tagName)) {
						$(this).val(value);
					} else {
						$(this).html(value);
					}
				});
			}
		});
	};
})(jQuery);
