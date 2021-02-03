import React, { Component } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { IoLogoTwitter } from "react-icons/io";

export default class Contact extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  }

  onEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  onSubjectChange = (e) => {
    this.setState({ subject: e.target.value });
  };

  onMsgtChange = (e) => {
    this.setState({ message: e.target.value });
  };

  render() {
    return (
      <div className="contact" id="contact-section">
        <div className="inside-contact">
          {/* <h5>Contact</h5> */}
          {/* <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
          </p> */}

          <div className="section">
            <div className="contact-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="section-title">
                    <h2 className="title">CONTACT US</h2>

                    <hr />
                    <form id="contact-form">
                      <div className="form-group">
                        <div className="row">
                          <input
                            placeholder="Name"
                            id="name"
                            type="text"
                            className="form-control"
                            required
                            value={this.state.name}
                            onChange={(e) => this.onNameChange(e)}
                          ></input>

                          <input
                            placeholder="Email"
                            id="email"
                            type="email"
                            className="form-control"
                            aria-describedby="emailHelp"
                            required
                            value={this.state.email}
                            onChange={(e) => this.onEmailChange(e)}
                          ></input>

                          <input
                            placeholder="Subject"
                            id="subject"
                            type="Text"
                            className="form-control"
                            required
                            value={this.state.subject}
                            onChange={(e) => this.onSubjectChange(e)}
                          ></input>

                          <input
                            placeholder="Message"
                            id="message"
                            className="form-control"
                            rows="1"
                            required
                            value={this.state.message}
                            onChange={(e) => this.onMsgtChange(e)}
                          ></input>
                        </div>
                      </div>
                      <hr />
                      <button type="submit" className="primary-btn submit">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-footer">
            <div className="contact-icons">
              <a
                href="https://api.whatsapp.com/send/?phone=9660544538584&text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%AD%D8%A7%D8%A8%20%D8%A7%D8%B9%D8%B1%D9%81%20%D8%B9%D9%86%20%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D9%88%D8%AC%D9%88%D8%AF%D8%A9%20%D8%B9%D9%86%D8%AF%D9%83%D9%85%20%D9%81%D9%8A%20%D8%AC%D8%AF%D8%A9"
                target="_blank"
              >
                {" "}
                <IoLogoWhatsapp className="icon" />
              </a>

              <a href="https://www.instagram.com/wrwr_az/" target="_blank">
                <AiFillInstagram className="icon" />
              </a>

              <a
                href="https://www.google.com/maps/@21.4737678,39.2194689,17.78z"
                target="_blank"
              >
                <MdLocationOn className="icon" />
              </a>

              <a href="mailto:almuflehy.abdulaziz@gmail.com" target="_blank">
                <MdEmail className="icon" />
              </a>

              <a href="https://twitter.com/wrwr_az" target="_blank">
                <IoLogoTwitter className="icon" />
              </a>
            </div>
            <div className="copyright-div">
              <p className="copyright">Copyright © 2021 Awtar</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
