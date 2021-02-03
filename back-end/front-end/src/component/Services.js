import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// import firebase from "firebase/app";

// // Add the Firebase services that you want to use
// import "firebase/auth";
// import "firebase/firestore";
import { insertOneMessage } from "../api";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";

export default class Services extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      mobile: "",
      location: "",
      text: "",
      notification: false,
      show: false,
      error_name: "",
      error_number: "",
      error_location: "",
      error_text: "",
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
    // console.log(e.target.value);
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
    // console.log(e.target.value);
  };

  handleMobileChange = (e) => {
    this.setState({ mobile: e.target.value });
    // console.log(e.target.value);
  };

  handelLocationChange = (e) => {
    this.setState({ location: e.target.value });
    // console.log(e.target.value);
  };

  handleMessageChange = (e) => {
    this.setState({ text: e.target.value });
    // console.log(e.target.value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.text);
    // console.log(this.state.notification);
    this.setState({ notification: true });
    console.log(this.state.notification);

    console.log(
      "Name:",
      this.state.name,
      "\nEmail:",
      this.state.email,
      "\nMobile:",
      this.state.mobile,
      "\nLocation:",
      this.state.location,
      "\nText:",
      this.state.text
    );

    if (
      this.state.name != "" &&
      this.state.mobile.length === 10 &&
      this.state.text != ""
    ) {
      this.insertToDB();
      swal("Good job!", "Message Sent", "success").then((ok) => {
        if (ok) {
          this.setState({
            name: "",
            email: "",
            mobile: "",
            location: "",
            text: "",
            notification: false,
            show: false,
            error_name: "",
            error_number: "",
            error_location: "",
            error_text: "",
          });
        }
      });
    } else {
      let error_name = "";
      if (this.state.name === "") {
        console.log("name error");
        error_name += "The insert name is wrong\n";
      }
      console.log(this.state.mobile.length);
      if (this.state.mobile.length != 10) {
        console.log("mobile error");
        error_name += "The insert number is wrong\n";
      }
      if (this.state.location == "" || this.state.location == "Choose...") {
        console.log("location error");
        error_name += "The choosing location is wrong\n";
      }
      if (this.state.text === "") {
        console.log("text error");
        error_name += `Please write your message`;
      }
      this.setState({
        show: true,
        error_name,
      });
    }
  };

  handleNotification = (e) => {
    // console.log(this.state.notification);
    this.setState({ notification: false });
    // console.log(this.State.notification);
  };

  insertToDB = () => {
    console.log("The Message will be insert");
    let body = {
      name: this.state.name,
      email: this.state.email,
      mobileNumber: this.state.mobile,
      location: this.state.location,
      message: this.state.text,
    };
    // console.log(body);

    // insert to database by calling post method in fron-end
    insertOneMessage(body);
  };

  AlertDismissibleExample = () => {
    return (
      <Alert
        variant="danger"
        onClose={() => this.setState({ ...this.state, show: false })}
        dismissible
      >
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <pre>{this.state.error_name}</pre>
      </Alert>
    );
  };

  /*
  AlertDismissibleExample = () => {
    return (
      <Alert
        variant="danger"
        onClose={() => this.setState({ ...this.state, show: false })}
        dismissible
      >
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
    );
  };
*/

  render() {
    // var firebase = require("firebase/app");
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    // const firebaseConfig = {
    //   apiKey: "AIzaSyBFjrbf67sRZgnDR3nFwnbaTXWohWN96VE",
    //   authDomain: "awtar-a5059.firebaseapp.com",
    //   projectId: "awtar-a5059",
    //   storageBucket: "awtar-a5059.appspot.com",
    //   messagingSenderId: "919307705441",
    //   appId: "1:919307705441:web:9b17d79e0b18c5bf025e20",
    //   measurementId: "G-KNYFS6TJM2",
    // };
    // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);

    // const successMessage = (
    //   <Alert key={0} variant={"success"}>
    //     This is a success alert—check it out!{" "}
    //     <button
    //       className="message-button"
    //       onClick={(e) => this.handleNotification(e)}
    //     >
    //       X
    //     </button>
    //   </Alert>
    // );

    return (
      <div className="service-header">
        {this.state.show ? <this.AlertDismissibleExample /> : null}

        <div className="services-div">
          <Form className="Form">
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                id="name"
                type="text"
                placeholder="Enter your first name"
                onChange={(e) => this.handleNameChange(e)}
                value={this.state.name}
                required
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your number"
                onChange={(e) => this.handleMobileChange(e)}
                value={this.state.mobile}
                required
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => this.handleEmailChange(e)}
                value={this.state.email}
              />
            </Form.Group>
            <Form.Group controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                onChange={(e) => this.handelLocationChange(e)}
                value={this.state.location}
                required
              >
                <option>Choose...</option>
                <option>1 الزهرة</option>
                <option>2 الزهرة</option>
                <option>3 الزهرة</option>
                <option>4 الزهرة</option>
                <option>5 الزهرة</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                onChange={(e) => this.handleMessageChange(e)}
                value={this.state.text}
                required
              />
            </Form.Group>
            <Button
              className="send-button"
              variant="primary"
              type="submit"
              onClick={(e) => this.handleSubmit(e)}
            >
              Send
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
