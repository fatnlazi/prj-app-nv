import * as action from '../../redux/action';

export function pushCart(dispatch) {
  dispatch(action.pushCart());
}

export function popCart(dispatch) {
  dispatch(action.popCart());
}
