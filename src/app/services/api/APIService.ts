import { IAuthService } from './auth-service/IAuthService';
import { IFacultiesService } from './faculties-service/IFacultiesService';
import { ICoursesService } from './courses-service/ICoursesService';
import { IPresetsService } from './presets-service/IPresetsService';
import { IGroupsService } from './groups-service/IGroupsService';
import { ITimetableDayService } from './timetable-day-service/ITimetableDayService';

export class APIService {
  private readonly _authService: IAuthService;
  private readonly _facultiesService: IFacultiesService;
  private readonly _coursesService: ICoursesService;
  private readonly _presetsService: IPresetsService;
  private readonly _groupsService: IGroupsService;
  private readonly _timeTableService: ITimetableDayService;

  constructor(
    authService: IAuthService,
    facultiesService: IFacultiesService,
    coursesService: ICoursesService,
    presetsService: IPresetsService,
    groupsService: IGroupsService,
    timeTableService: ITimetableDayService,
  ) {
    this._authService = authService;
    this._facultiesService = facultiesService;
    this._coursesService = coursesService;
    this._presetsService = presetsService;
    this._groupsService = groupsService;
    this._timeTableService = timeTableService;
  }

  public get authService(): IAuthService {
    return this._authService;
  }

  public get facultiesService(): IFacultiesService {
    return this._facultiesService;
  }

  public get coursesService(): ICoursesService {
    return this._coursesService;
  }

  public get presetsService(): IPresetsService {
    return this._presetsService;
  }

  public get groupsService(): IGroupsService {
    return this._groupsService;
  }

  public get timeTableService(): ITimetableDayService {
    return this._timeTableService;
  }
}
