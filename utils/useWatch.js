const Event = require("./event");

const useWatch = (key, callback) => {
  if (!lisener) {
    throw new Error('please install watcheer')
  }
  lisener.addEventLisener(key, callback)
};

const commit = (key, value) => {
  if (!lisener) {
    throw new Error('please install watcheer')
  }

  listener.state[key] = value
  lisener.emit(key)
}

let listener
const installWatcher = (app) => {
  listener = new Event(app);

  return {
    listener,
    commit,
    watch: useWatch
  };
}



module.exports = {
  useWatch,
  installWatcher,
}
