import StandardCard from "./StandardCard";
import Section from "./Section";

export default function General({ bg, Header, BodyCopy, Chart, Buttons }) {
  return (
    <StandardCard bg={bg}>
      {!!Header && <Section.Header>{Header}</Section.Header>}
      {!!BodyCopy && <Section.BodyCopy>{BodyCopy}</Section.BodyCopy>}
      {!!Chart && <Section.Chart mt="auto">{Chart}</Section.Chart>}
      {!!Buttons && <Section.Button>{Buttons}</Section.Button>}
    </StandardCard>
  );
}