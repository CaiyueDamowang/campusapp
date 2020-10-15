const Event = require("./event");

let listener
const installWatcher = (app) => {
  listener = new Event(app);

  return {
    listener,
    commit,
    watch: useWatch
  };
}

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




module.exports = {
  useWatch,
  installWatcher,
}
