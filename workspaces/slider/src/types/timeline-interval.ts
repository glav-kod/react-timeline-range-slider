import TimeOnly from "./time-only";

export default class TimelineInterval {
  public readonly start: TimeOnly;
  public readonly end: TimeOnly;

  private constructor(start: TimeOnly, end: TimeOnly) {
    this.start = start;
    this.end = end;
  }

  public static FromString(start: string, end: string): TimelineInterval {
    const startTimeOnly = TimeOnly.FromString(start);
    const endTimeOnly = TimeOnly.FromString(end);

    return new TimelineInterval(startTimeOnly, endTimeOnly);
  }

  public static FromArray(values: ReadonlyArray<number>): TimelineInterval {
    const startTimeOnly = TimeOnly.FromSeconds(values[0]);
    const endTimeOnly = TimeOnly.FromSeconds(values[1]);

    return new TimelineInterval(startTimeOnly, endTimeOnly);
  }
}