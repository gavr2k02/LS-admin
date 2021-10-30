import clone from 'just-clone';
import { filterDataById } from './filterDataById';

export function baseCardHandler<T extends { id: string; deleted?: boolean }>(value: T, data: T[], ids: string[]): T[] {
  const index = data?.findIndex((item) => item.id === value.id);

  if (index === -1) {
    if (value?.deleted) {
      return;
    }

    data.push(value);
    data.sort();
  } else {
    value?.deleted ? data.splice(index, 1) : data.splice(index, 1, value);
  }

  return clone(filterDataById(data, ids));
}
