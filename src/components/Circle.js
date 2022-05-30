import SvgWrapper from "./SvgWrapper";

export default function Circle(props) {
  return (
    <SvgWrapper {...props}>
      {(_props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="bi bi-circle-fill"
          viewBox="0 0 16 16"
          {..._props}
        >
          <circle cx="8" cy="8" r="7" />
        </svg>
      )}
    </SvgWrapper>
  );
}