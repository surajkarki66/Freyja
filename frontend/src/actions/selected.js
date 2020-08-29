import { SELECTED } from './types';

export const selected = question => {
  return {
    type: SELECTED,
    payload: question,
  }
}