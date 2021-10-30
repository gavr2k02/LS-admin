export enum Routes {
  HOME = '/home',
  SIGN_IN = '/signin',
  SIGN_UP = '/signup',
  TIMETABLE = '/timetable',
  FACULTIES = '/faculties',
  COURSES = '/faculty/:facultyId/courses',
  PRESETS = '/faculty/:facultyId/course/:courseId/presets',
  CARDS = '/faculty/:facultyId/course/:courseId/preset/:presetId',
}
