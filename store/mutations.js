import { getRandomName } from "~/func/getRandomName";
import { getRandomImg } from "~/func/getRandomImg";

export default {
  UPDATE_COMMAND(state, payload) {
    state.commands[payload.key].name = payload.name;
  },

  SET_SELECT(state, scenario) {
    state.selectScenario = scenario;
  },

  SET_SCENARIOS(state, scenarios) {
    state.scenarios = scenarios;
  },

  OPEN_VIEW(state, view) {
    state.view = view;
  },

  ADD_COMMANDS(state, count) {
    var commands = [];
    for (let i = 0; i < count; i++) {
      commands.push({
        img: "../static/icons/editor.png",
        name: getRandomName(),
        score: 0,
      });
    }
    state.commands = commands;
  },

  SET_ANIM_DIRECTION(state, direction) {
    state.animDirection = direction;
  },
  CHANGE_COMMAND_IMG(state, index) {
    state.img = getRandomImg()[0];
  },
};
