export default function timeToSeconds(time: string) {
    const [hms, ms] = time.split(",");
    const [h, m, s] = hms.split(":").map(Number);
    return h * 3600 + m * 60 + s + Number(ms) / 1000;
}