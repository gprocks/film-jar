export abstract class Helper {
  public static formatTime(time: number) {
    const hrs = Math.floor(time / 60);
    const mins = (time % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}`;
  }
}
