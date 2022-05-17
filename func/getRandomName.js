import state from '../store/state'

export default function getRandomName() {
  var randomNames = state().randomNames;

  var max = randomNames.length;
  var rand = Math.floor(Math.random() * max);
  
  return randomNames[rand];
};
