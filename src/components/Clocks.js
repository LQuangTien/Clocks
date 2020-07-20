import PropTypes from "prop-types";
import React from "react";
import AnalogClock, { Themes } from "react-analog-clock";
import Clock from "react-live-clock";

import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row
} from "reactstrap";
import "./Clocks.css";

Clocks.propTypes = {
  cities: PropTypes.array,
  onClockClick: PropTypes.func
};
Clocks.defaultProps = {
  cities: [],
  onClockClick: null
};

function Clocks(props) {
  const { cities, onClockClick } = props;
  const clockClick = city => {
    if (onClockClick) {
      onClockClick(city);
    }
  };
  return (
    <Container>
      <Row>
        {cities.map((city, index) => (
          <Col xs="12" md="6" lg="3" key={city.value}>
            <Card className="clock text-center my-2 border-0">
              <div className="d-flex justify-content-center mt-3">
                <AnalogClock
                  width={200}
                  gmtOffset={city.gmt}
                  theme={Themes.light}
                />
              </div>
              <CardBody className="mt-3">
                <div className="clockContent">
                  <CardTitle className="h6">{city.name}</CardTitle>
                  <CardSubtitle>
                    <Clock
                      className="h1 text-info"
                      format={"HH:mm:ss"}
                      ticking={true}
                      timezone={city.timezone}
                    />
                  </CardSubtitle>
                </div>
                <div className="clockButton">
                  <Button
                    className="font-weight-bold w-100 "
                    outline
                    color="danger"
                    onClick={() => clockClick(city)}
                  >
                    Delete
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Clocks;
