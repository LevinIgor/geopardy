
import state from '../store/state'

export default function getRandomImg() {
  var imgs = state().randomImgs;
  let random = Math.floor(Math.random() * imgs.length);
  return imgs[random];
}
