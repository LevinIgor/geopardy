import createScenario from "~/func/createScenario";
import deleteScenario from "~/backend/deleteScenario";

export default {
  SET_SCENARIOS(state, scenarios) {
    state.scenarios = scenarios;
  },
  
  CREATE_SCENARIO(state, payload) {
    state.scenarios.push(createScenario(payload.rows, payload.cols));
  },
  DELETE_SCENARIO(state, index) {
    state.scenarios = state.scenarios.filter((item) => item.id !== index);
    deleteScenario(this.$fire, index);

  }
};
