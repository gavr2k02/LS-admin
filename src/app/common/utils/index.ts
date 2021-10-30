export function toDateString(value: Date): string {
  if (typeof value !== 'string') {
    return `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}`;
  } else {
    const date = new Date(value);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }
}

export function dateStringToDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-');
  return new Date(Number.parseInt(year), Number.parseInt(month), Number.parseInt(day));
}
