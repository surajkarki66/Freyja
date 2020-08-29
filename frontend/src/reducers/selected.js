import { SELECTED } from '../actions/types';

const initalState = {};

export default function (state = initalState, action) {
  switch (action.type) {
    case SELECTED:
      return action.payload;
    default:
      return state;
  }
}