import styled from "styled-components";
import Box from "./Box";

const Header = styled(Box)({});
Header.defaultProps = {
    mb: 4
};

const BodyCopy = styled(Box)({});
BodyCopy.defaultProps = {
    mb: 6
};

const Chart = styled(Box)({});
Chart.defaultProps = {
    mb: 4
};

const Button = styled(Box)({});

export default Object.assign({}, {
    Header,
    BodyCopy,
    Chart,
    Button
});