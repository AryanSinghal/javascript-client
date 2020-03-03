export function getRandomNumber(max) {
  return (Math.floor(Math.random()) * (max - 1));
}
export function getNextRoundRobin(total, current) {
  return ((current + 1) % total);
}
