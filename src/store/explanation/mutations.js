import { SET_EXPLANATION, SET_SELECTED_PROCESS } from '../storeconstants'

export default {
  [SET_EXPLANATION](state, explanation) {
    state.explanation = explanation
  },
  [SET_SELECTED_PROCESS](state, selectedProcess) {
    state.selectedProcess = selectedProcess
  }
}
