import { IBaseCard } from 'models/interfaces/IBaseCard';
import { IPreset } from 'models/interfaces/IPreset';
import { CardTypePopup } from '../enums/CardTypePopup';

export function getPatchOnType(type: CardTypePopup, value: IBaseCard, facultyId?: string) {
  switch (type) {
    case CardTypePopup.FACULTY: {
      return `/faculty/${value.id}/courses`;
    }
    case CardTypePopup.COURSE: {
      return `/faculty/${facultyId}/course/${value.id}/presets/`;
    }
    case CardTypePopup.PRESET: {
      return `/faculty/${facultyId}/course/${(value as IPreset).courseId}/preset/${value.id}`;
    }
  }
}
