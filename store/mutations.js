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
  CHANGE_SELECT(state, scenario) {
    state.selectScenario = scenario;
  },
  SET_SCENARIOS(state, scenarios) {
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
  },
  UPDATE_COMMAND(state, payload) {
    state.commands[payload.key].name = payload.name;
  },
  OPEN_VIEW(state,view) {
    state.view = view;
  },
  ADD_COMMANDS(state, count) {
    var commands = [];
    var max = state.commandNames.length;
      for (let i = 0; i < count; i++) {
        var rand = Math.floor(Math.random() * max);
       commands.push({
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmChM1Ra6xJMtkYLBMPgllFPyCg63L2yanjw&usqp=CAU",
          name: state.commandNames[rand],
          score: 0,
        });
      }
    state.commands = commands;
  },
  GET_RANDOM_NAME(state){
    var max = state.commandNames.length;    
  }

};
