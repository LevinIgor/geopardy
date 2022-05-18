import  getRandomName  from "~/func/getRandomName";
import  getRandomImg  from "~/func/getRandomImg";

export default {

  SET_SELECT(state, scenario) {
    state.selectScenario = scenario;
  },

  SET_SCENARIOS(state, scenarios) {
    state.scenarios = scenarios;
  },

  SET_COMMAND_NAME(state, payload) {
    state.commands[payload.key].name = payload.name;
  },
  OPEN_VIEW(state, payload) {
    state.view = payload.view;
    state.animDirection = payload.animDirection;
  },

  ADD_COMMANDS(state, count) {
    var commands = [];
    for (let i = 0; i < count; i++) {
      commands.push({
        id:i,
        img: getRandomImg(),
        name: getRandomName(),
        score: 0,
      });
    }
    state.commands = commands;
  },

  SET_RANDOM_COMMAND_NAME(state, index) {
    state.commands[index].name = getRandomName()
  },
  SET_RANDOM_COMMAND_IMG(state, index) {

    state.commands[index].img = getRandomImg();
  },
};
