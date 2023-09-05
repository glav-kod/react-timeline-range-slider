function secondsToHHmm(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const hoursString = String(hours).padStart(2, "0");
  const minutesString = String(minutes).padStart(2, "0");

  return `${hoursString}:${minutesString}`;
}

function timeStringToSeconds(timeString: string): number {
  const [hours, minutes] = timeString.split(":").map(Number);

  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error(`Value is in invalid format: ${timeString}`);
  }

  return hours * 3600 + minutes * 60;
}

export default class TimeOnly {
  public readonly timeString: string;
  public readonly seconds: number;

  private constructor(value: string, seconds: number) {
    this.timeString = value;
    this.seconds = seconds;
  }

  public static FromSeconds(seconds: number): TimeOnly {
    const timeString = secondsToHHmm(seconds);

    return new TimeOnly(timeString, seconds);
  }

  public static FromString(timeString: string): TimeOnly {
    const seconds = timeStringToSeconds(timeString);

    return new TimeOnly(timeString, seconds);
  }

  public toString() {
    return this.timeString;
  }

  public toJSON() {
    return this.timeString;
  }
}