import { GET_EXPLANATION, GET_SELECTED_PROCESS } from '../storeconstants'

export default {
  [GET_EXPLANATION](state) {
    return state.explanation
  },
  [GET_SELECTED_PROCESS](state) {
    return state.selectedProcess
  }
}
