import { theme } from "../core/theme";

export default function SvgWrapper({ children, fill, ...rest }) {
  const _fill = theme.colors[fill] || fill;

  const props = {
    ...rest,
    fill: _fill,
  };

  return children(props);
}