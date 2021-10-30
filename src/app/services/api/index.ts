import { APIService } from './APIService';
import { AuthService } from './auth-service/AuthService';
import { FacultiesService } from './faculties-service/FacultiesService';
import { CoursesSerivce } from './courses-service/CoursesSerivce';
import { PresetsService } from './presets-service/PresetsSerivce';
import { GroupsService } from './groups-service/GroupsService';
import { TimetableDayService } from './timetable-day-service/TimetableDayService';

const authService = new AuthService();
const facultiesService = new FacultiesService();
const coursesService = new CoursesSerivce();
const presetsService = new PresetsService();
const groupsService = new GroupsService();
const timeTableSerive = new TimetableDayService();

export const api = new APIService(
  authService,
  facultiesService,
  coursesService,
  presetsService,
  groupsService,
  timeTableSerive,
);
