import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { getAboutMeData } from "../actions/fetchAboutme";
import Navbar from "./common/navbar";

const override = css`
  display: block;
  margin-left: 45%;
  margin-top: 20%;
  border-color: red;
`;
class About extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAboutMeData());
  }

  render() {
    const {
      data: { isError, userData, isFetching }
    } = this.props;
    if (isError) {
      return (
        <div>
          <Navbar menu="aboutme" />
          <h3 className="error-message">Oops! {userData}</h3>
        </div>
      );
    }
    const items = [];
    if (Object.keys(userData).length > 0) {
      const {
        acf: { language_tags }
      } = userData[0];
      language_tags.forEach((item, i) =>
        items.push(
          <li key={i}>
            <span>{item.label}</span>
          </li>
        )
      );
    }
    return (
      <div>
        <Navbar menu="aboutme" />
        <section className="mh-about" id="mh-about">
          <ClipLoader
            css={override}
            sizeUnit="px"
            size={50}
            color="#0bceaf"
            loading={isFetching}
          />
          {Object.keys(userData).length > 0 ? (
            <div className="container">
              <div className="row section-separator xs-column-reverse vertical-middle-content home-padding">
                <div className="col-sm-12 col-md-6">
                  <div
                    className="mh-about-img shadow-2 wow fadeInUp"
                    data-wow-duration="0.8s"
                    data-wow-delay="0.4s"
                  >
                    <img
                      src={userData[0].acf.photo.sizes.medium_large}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="mh-about-inner">
                    <h2
                      className="wow fadeInUp"
                      data-wow-duration="0.8s"
                      data-wow-delay="0.1s"
                    >
                      About Me
                    </h2>
                    <FroalaEditorView model={userData[0].content.rendered} />
                    <div
                      className="mh-about-tag wow fadeInUp"
                      data-wow-duration="0.8s"
                      data-wow-delay="0.3s"
                    >
                      <ul>{items}</ul>
                    </div>
                    <a
                      className="btn btn-fill wow fadeInUp"
                      href={userData[0].acf.cv_upload}
                      download
                      target="_blank"
                    >
                      {" "}
                      Download CV <i className="fa fa-download" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    );
  }
}

About.propTypes = {
  data: PropTypes.object,
  userData: PropTypes.object,
  isError: PropTypes.bool,
  isFetching: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    data: state.aboutme_post
  };
};
export default connect(mapStateToProps)(About);
