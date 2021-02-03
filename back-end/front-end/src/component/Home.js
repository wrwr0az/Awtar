import React, { Component } from "react";
import Contact from "./Contact";

export default class Home extends Component {
  render() {
    return (
      <div className="Home" id="Home">
        <div className="big-image"></div>
        <div className="about">
          {/* <h5>About</h5> */}
          <div class="container">
            <div class="row right-to-left">
              <div class="col">
                <p>
                  تقدم ريادة الأملاك العقارية عدة خدمات مثل إدارة الأملاك
                  العقارية وتأجير الوحدات السكنية والتجارية، والتسويق العقاري
                  الحديث باستخدام أحدث الأساليب التقنية.
                </p>
              </div>
              <div class="col">
                <img src="https://roadmap2050.report/static/files/photo-building.jpg" />
              </div>
            </div>

            <div class="row left-to-right">
              <div class="col">
                <p>
                  تقدم ريادة الأملاك العقارية عدة خدمات مثل إدارة الأملاك
                  العقارية وتأجير الوحدات السكنية والتجارية، والتسويق العقاري
                  الحديث باستخدام أحدث الأساليب التقنية.
                </p>
              </div>
              <div class="col">
                <img src="https://www.sustainableplaces.eu/wp-content/uploads/2017/02/SmartBuilding.jpg" />
              </div>
            </div>

            <div class="row right-to-left">
              <div class="col">
                <p>
                  تقدم ريادة الأملاك العقارية عدة خدمات مثل إدارة الأملاك
                  العقارية وتأجير الوحدات السكنية والتجارية، والتسويق العقاري
                  الحديث باستخدام أحدث الأساليب التقنية.
                </p>
              </div>
              <div class="col">
                <img src="https://www.ubm-development.com/magazin/wp-content/uploads/2020/03/kl-main-building-d-Kopie.jpg" />
              </div>
            </div>

            <div class="row left-to-right">
              <div class="col">
                <p>
                  تقدم ريادة الأملاك العقارية عدة خدمات مثل إدارة الأملاك
                  العقارية وتأجير الوحدات السكنية والتجارية، والتسويق العقاري
                  الحديث باستخدام أحدث الأساليب التقنية.
                </p>
              </div>
              <div class="col">
                <img src="https://www.ccc.net/wp-content/uploads/2018/06/erwda-building-al-mamoura-new-office-building-overview-500_500.jpg" />
              </div>
            </div>
          </div>
        </div>

        <div id="contact-section">
          <Contact />
        </div>
      </div>
    );
  }
}
