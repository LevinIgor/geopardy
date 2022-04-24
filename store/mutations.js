export default {
  // This mutation is used to set the state of the store
  SHOW_QUESTION(state) {
    state.activeScene = "question";
  },
  SHOW_TABLE(state) {
    state.activeScene = "table";
  },
  SHOW_ANSWER(state) {
    state.activeScene = "answer";
  },
  SET_QUESTION(state, question) {
    state.question = question;
  },
  SET_COMMANDS(state, commands) {
    state.commands = commands;
  },
  SET_ZERO_VALUE(state, index) {
    state.table[index.key].body.splice(index.key2, 1, {
      score: 0,
      isActive: false,
    });
  },
  CORRECT(state, payload) {
    state.commands[payload.key].score =
      state.commands[payload.key].score + payload.value;
  },
  INCORRECT(state, payload) {
    state.commands[payload.key].score =
      state.commands[payload.key].score - payload.value;
  },
};
