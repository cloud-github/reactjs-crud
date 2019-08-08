import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import Moment from "react-moment";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import MacroCreateModal from "./createModal";
import { getMacroData } from "../../actions/fetchMacros";
import hero_img from "../../assets/images/hero.png";
import Navbar from "../common/navbar";

const override = css`
  display: block;
  margin-left: 45%;
  margin-top: 20%;
  border-color: red;
`;
class Index extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getMacroData());
  }
  render() {
    console.log("props: ", this.props.data);
    const {
      data: { isError, userData, isFetching }
    } = this.props;
    let macros = [];
    if (isError) {
      return (
        <div>
          <Navbar menu="home" />
          <h3 className="error-message">Oops! {userData}</h3>
        </div>
      );
    }
    {
      Object.keys(userData).length > 0
        ? (macros = userData.data.map((listValue, index) => {
            return (
              <tr key={index}>
                <td>
                  <span className="custom-checkbox">
                    <input
                      type="checkbox"
                      id="checkbox1"
                      name="options[]"
                      value="1"
                    />
                    <label htmlFor="checkbox1"></label>
                  </span>
                </td>
                <td>{listValue.attributes.name}</td>
                <td>{listValue.attributes.macro_type}</td>

                {listValue.attributes.macro_type === "email" && (
                  <Fragment>
                    <td>{listValue.attributes.subject}</td>
                    <td>
                      {<FroalaEditorView model={listValue.attributes.body} />}
                    </td>
                  </Fragment>
                )}
                {listValue.attributes.macro_type === "sms" && (
                  <Fragment>
                    <td> - - - </td>
                    <td>{listValue.attributes.subject}</td>
                  </Fragment>
                )}
                <td>
                  {<Moment fromNow>{listValue.attributes.created_at}</Moment>}
                </td>
                <td>
                  {<Moment fromNow>{listValue.attributes.updated_at}</Moment>}
                </td>
                <td>
                  <a
                    href="#editEmployeeModal"
                    className="edit"
                    data-toggle="modal"
                  >
                    <i
                      className="material-icons"
                      data-toggle="tooltip"
                      title="Edit"
                    >
                      &#xE254;
                    </i>
                  </a>
                  <a
                    href="#deleteEmployeeModal"
                    className="delete"
                    data-toggle="modal"
                  >
                    <i
                      className="material-icons"
                      data-toggle="tooltip"
                      title="Delete"
                    >
                      &#xE872;
                    </i>
                  </a>
                </td>
              </tr>
            );
          }))
        : null;
    }

    return (
      <div>
        <section className="mh-home image-bg home-2-img" id="mh-home">
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={50}
            color={"#0bceaf"}
            loading={isFetching}
          />
          {Object.keys(userData).length > 0 ? (
            <div className="container">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-sm-6">
                      <h2>
                        Manage <b>Macros</b>
                      </h2>
                    </div>
                    <div className="col-sm-6">
                      <MacroCreateModal />
                    </div>
                  </div>
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>
                        <span className="custom-checkbox">
                          <input type="checkbox" id="selectAll" />
                          <label htmlFor="selectAll"></label>
                        </span>
                      </th>
                      <th>Name</th>
                      <th>Macro type</th>
                      <th>Subject</th>
                      <th>Body</th>
                      <th>Created at</th>
                      <th>Updated at</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{macros}</tbody>
                </table>
                <div className="clearfix">
                  <div className="hint-text">
                    Showing <b>5</b> out of <b>25</b> entries
                  </div>
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a href="#">Previous</a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        2
                      </a>
                    </li>
                    <li className="page-item active">
                      <a href="#" className="page-link">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        4
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        5
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    );
  }
}

Index.propTypes = {
  data: PropTypes.object,
  isError: PropTypes.bool,
  isFetching: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    data: state.macro_post
  };
};
export default connect(mapStateToProps)(Index);
