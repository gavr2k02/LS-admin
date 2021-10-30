import { IBaseCard } from 'models/interfaces/IBaseCard';
import { CardTypePopup } from '../enums/CardTypePopup';

export function getPatchOnTypeHeader(type: CardTypePopup, value: IBaseCard, facultyId?: string) {
  switch (type) {
    case CardTypePopup.FACULTY: {
      return `/faculties`;
    }
    case CardTypePopup.COURSE: {
      return `/faculty/${facultyId}/courses`;
    }
  }
}
