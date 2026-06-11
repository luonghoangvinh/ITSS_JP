declare module 'srt-parser-2' {
  export default class SrtParser2 {
    constructor();
    fromSrt(srt: string): Array<{id?: string; startTime: string; endTime: string; text: string}>;
    toSrt(subtitles: Array<{startTime: string; endTime: string; text: string}>): string;
  }
}
