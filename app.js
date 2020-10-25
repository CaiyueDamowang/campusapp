import { extendComponent, extendPage } from "./utils/extendPage";
import usePromisify from "./utils/usePromisify";
import { useStore } from "./utils/useWatch";
const promisify = usePromisify.promisify

App({
  onLaunch: function () {
    const initialState = {}
    const plugins = [usePromisify, useStore(initialState)]
    Page = extendPage(plugins)
    Component = extendComponent(plugins)
  },
  globalData: {
    userInfo: null
  }
})