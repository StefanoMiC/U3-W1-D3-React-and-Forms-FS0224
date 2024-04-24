import { Component } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

class ReservationList extends Component {
  state = {
    reservations: []
  };

  fetchReservations = () => {
    fetch("https://striveschool-api.herokuapp.com/api/reservation")
      .then(response => response.json())
      .then(reservations => this.setState({ reservations }));
  };

  componentDidMount() {
    console.log("componentDidMount()");
    // questo invece è il posto giusto per fare una fetch e salvarne i dati
    // perché il componentDidMount avviene una volta sola, al montaggio del componente.
    this.fetchReservations();
  }

  render() {
    // this.setState({ test: true });
    // un setState NON VA MAI FATTO! all'interno del render
    // non possiamo quindi fare una fetch nel render, perché una fetch implica sicuramente un cambio di stato, per salvare i dati.
    // e il cambio di stato si fa con setState che chiamerebbe render() all'infinito

    console.log("render()");
    return (
      <Container>
        <h2 className="display-5 text-center mt-4">Prenotazioni</h2>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <ListGroup>
              {/* {this.state.reservations.length > 0 &&<ListGroup.Item>{this.state.reservations[0].name}</ListGroup.Item>} */}

              {this.state.reservations.map((reserv, i) => (
                <ListGroup.Item key={`reserv-${i}`}>{reserv.name}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReservationList;
