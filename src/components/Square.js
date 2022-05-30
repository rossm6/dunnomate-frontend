import SvgWrapper from "./SvgWrapper";

export default function Square(props) {
  return (
    <SvgWrapper {...props}>
      {(_props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="bi bi-square-fill"
          viewBox="0 0 16 16"
          {..._props}
        >
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
        </svg>
      )}
    </SvgWrapper>
  );
}