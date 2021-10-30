export function filterDataById<T extends { id: string }>(values: T[], ids: string[]): T[] {
  return values.filter((item) => ids.includes(item.id));
}
