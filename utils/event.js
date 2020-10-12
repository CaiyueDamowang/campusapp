// 发布订阅模式
// 规定以下事件用于管理全局状态

class Event {
  constructor(app) {
    this.state = {}
    this.events = {};
    
    if (!app.globalData) {
      app.globalData = {}
    }
    this.context = app.globalData;
  }

  addEventLisener (key, callback) {
    const events = this.events;
    if (!events[key]) {
      events[key] = [];
    };

    events[key].push(callback);
  }

  removeEventLisener (key, callback) {
    const events = this.events;
    if (!events[key].length) { return; };

    events[key] = events.filter(fn => fn !== callback);
  }

  once (key, callback) {
    const events = this.events;
    if (!events[key]) {
      events[key] = [];
    };

    const _callback = (payload) => {
      events[key] = events[key].filter(fn => fn !== callback);
      callback(payload);
    };

    events[key].push(_callback);
  }

  regesitEvents(key) {
    this.events[key] = []
  }

  emit(key) {
    const event = this.events[key]
    event.forEach(fn => {
      fn(this.state[key])
    })
  }
};

module.exports = Event