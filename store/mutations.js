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
  SET_SCENARIO(state, scenario) {
    state.selectScenario = scenario;
  },
  SET_SCENARIOS(state, scenarios) {
    scenarios.length > 0
      ? (state.selectScenario = scenarios[0])
      : (state.selectScenario = null);
    state.scenarios = scenarios;
  },
  SET_ZERO_VALUE(state, index) {
    state.selectScenario.table[index.key].body.splice(index.key2, 1, {
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
  DELETE_SCENARIO(state) {
    state.scenarios = state.scenarios.filter((sc) => {
      return sc.id != state.selectScenario.id;
    });
    state.scenarios.length > 0
      ? (state.selectScenario = state.scenarios[0])
      : (state.selectScenario = null);
  },
};
