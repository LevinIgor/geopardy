export default {
  // This mutation is used to set the state of the store
  SHOW_QUESTION(state){
    state.activeWindows.table = false;
    
  },
  SHOW_TABLE(state){
    state.activeWindows.table = true;
    
  },
  SET_QUESTION(state, question){
    state.question = question;
  }
};
