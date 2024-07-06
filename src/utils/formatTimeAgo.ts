export default function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const passedSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const SECONDS_IN_MINUTE = 60;
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_DAY = 86400;

  const passedMinutes = Math.floor(passedSeconds / SECONDS_IN_MINUTE);
  const passedHours = Math.floor(passedSeconds / SECONDS_IN_HOUR);
  const passedDays = Math.floor(passedSeconds / SECONDS_IN_DAY);

  switch (true) {
    case passedSeconds < SECONDS_IN_MINUTE:
      return `${passedSeconds}초 전`;
    case passedSeconds < SECONDS_IN_HOUR:
      return `${passedMinutes}분 전`;
    case passedSeconds < SECONDS_IN_DAY:
      return `${passedHours}시간 전`;
    default:
      return `${passedDays}일 전`;
  }
}
