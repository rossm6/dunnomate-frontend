import useDataLoader from "./useDataLoader";

export default function useBellCurve(url, options) {
  const [data] = useDataLoader(url, options);
  const points = data?.points;

  const scores = points?.map((point) => +point.score);
  const percentages = points?.map((point) => +point.percentage);

  return [data, [scores, percentages]];
}