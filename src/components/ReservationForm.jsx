import { Component } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

// proprietà che il server si aspetta di ricevere per ogni prenotazione inviata:

// name <-- string
// phone <-- string
// numberOfPeople <-- string/number
// smoking <-- boolean
// dateTime <-- date/string
// specialRequests <-- string

class ReservationForm extends Component {
  // i nostri metodi custom andrebbero creati con arrow function per beneficiare del comportamento automatico di reperire il this dal contesto esterno
  // quindi in questo modo non avremo problemi a riferirci a this anche dentro ai nostri metodi.
  // l'alternativa è quella di fare il bind nel costruttore, cosa non più necessaria!

  state = {
    reservation: {
      name: "",
      phone: "",
      numberOfPeople: "1",
      smoking: false,
      dateTime: "",
      specialRequests: ""
    },
    alert: false,
    error: false
  };

  handleSubmit = e => {
    // in React è ancora più importante evitare il refresh della pagina!
    e.preventDefault();

    console.log("INVIO DEL FORM EFFETTUATO");

    fetch("https://striveschool-api.herokuapp.com/api/reservation", {
      method: "POST",
      body: JSON.stringify(this.state.reservation),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          this.setState({
            reservation: {
              name: "",
              phone: "",
              numberOfPeople: "1",
              smoking: false,
              dateTime: "",
              specialRequests: ""
            },
            alert: true
          });

          setTimeout(() => this.setState({ alert: false }), 2000);
        } else {
          throw new Error("Problemi nell'invio dei dati");
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true, errorMsg: err.message });
      });
  };

  handleFieldChange = (propertyName, propertyValue) => {
    this.setState({ reservation: { ...this.state.reservation, [propertyName]: propertyValue } });
  };

  render() {
    return (
      <Container>
        <h2 className="display-5 text-center mt-4">Prenota un tavolo da noi</h2>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Alert
              variant="success"
              show={this.state.alert}
              onClose={() => this.setState({ alert: false })}
              dismissible
            >
              Prenotazione effettuata!
            </Alert>

            <Alert variant="danger" show={this.state.error} onClose={() => this.setState({ error: false })} dismissible>
              Errore nell'invio dei dati: <strong>{this.state.errorMsg}</strong>
            </Alert>

            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="FormName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci nome prenotazioni"
                  onChange={
                    // e => this.setState({ reservation: { ...this.state.reservation, name: e.target.value } })
                    e => this.handleFieldChange("name", e.target.value)
                  }
                  value={this.state.reservation.name}
                  required
                />
                {this.state.reservation.name.toLocaleLowerCase().includes("astolfo") && (
                  <Form.Text className="text-danger">Ma che brutto nome! Metti quello di un tuo amico...</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="FormPhone">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="+393*****"
                  onChange={e => this.handleFieldChange("phone", e.target.value)}
                  value={this.state.reservation.phone}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="FormNumOfPeople">
                <Form.Label>Numero di coperti</Form.Label>
                <Form.Select
                  aria-label="Number of seats"
                  onChange={e => this.handleFieldChange("numberOfPeople", e.target.value)}
                  value={this.state.reservation.numberOfPeople}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="FormDate">
                <Form.Label>Data e ora</Form.Label>
                <Form.Control
                  type="datetime-local"
                  onChange={e => this.handleFieldChange("dateTime", e.target.value)}
                  value={this.state.reservation.dateTime}
                  min={new Date().toISOString().split(".")[0].slice(0, -3)}
                  max="2024-04-28T19:59"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="FormSpecialReq">
                <Form.Label>Richieste particolari</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Facci sapere se hai esigenze particolari"
                  onChange={e => this.handleFieldChange("specialRequests", e.target.value)}
                  value={this.state.reservation.specialRequests}
                />
              </Form.Group>
              <Form.Group controlId="FormSmoking">
                <Form.Check
                  type="checkbox"
                  label="Fumatori"
                  onChange={e => this.handleFieldChange("smoking", e.target.checked)}
                  checked={this.state.reservation.smoking}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="d-block mx-auto mt-4">
                Invia Prenotazione
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReservationForm;
