var Module = function() {
  this.init();
};

// 初始化
Module.prototype.init = function() {
  this.fetchData(function() {
    // do something
  });
};

// 绑定事件
Module.prototype.bindEvent = function() {
  // ...
};

// 获取数据
Module.prototype.fetchData = function(cb) {
  var self = this;
  ajax({}).then(function(data) {
    self.renderData(data);
  }).catch(function() {
    self._fetchDataFailed();
  }).fin(function() {
    cb && cb();
  });
};

// 渲染数据
Module.prototype.renderData = function(data) {
  data = this._resolveData(data);
  // ...
  this.bindEvent();
};

// 处理数据
Module.prototype._resolveData = function() {
  // ...
};

// 加载失败
Module.prototype._fetchDataFailed = function() {
  // ...
};
