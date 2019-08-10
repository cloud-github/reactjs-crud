import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import Moment from "react-moment";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import MacroCreateModal from "./createModal";
import Checkbox from "../../components/checkbox";
import { getMacroData } from "../../actions/fetchMacros";
import { deleteMacro } from "../../actions/deleteMacro";
import hero_img from "../../assets/images/hero.png";
import Navbar from "../common/navbar";

const override = css`
  display: block;
  margin-left: 45%;
  margin-top: 20%;
  border-color: red;
`;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: new Map(),
      showEditModal: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.deleteAllItems = this.deleteAllItems.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getMacroData());
  }

  deleteItem(id) {
    const { dispatch } = this.props;
    dispatch(deleteMacro(id));
  }

  editItem() {
    console.log("item edit");
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked)
    }));
  }

  deleteAllItems() {
    const { dispatch } = this.props;
    let tempIds = [];
    for (const entry of this.state.checkedItems.entries()) {
      if (entry[1] === true) {
        tempIds.push(entry[0]);
      }
    }
    dispatch(deleteMacro(tempIds));
  }

  render() {
    console.log("macros: props: ", this.props.data);
    const {
      data: { isError, userData, isFetching }
    } = this.props;
    const { checkedItems } = this.state;

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
      userData.length > 0
        ? (macros = userData.map(listValue => {
            return (
              <tr key={listValue.id}>
                <td>
                  <span className="custom-checkbox">
                    <Checkbox
                      name={listValue.id}
                      className="checkbox1"
                      checked={checkedItems.get(listValue.id)}
                      onChange={this.handleChange}
                    />
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
                    href="#"
                    className="edit"
                    onClick={() => {
                      this.editItem(listValue.id);
                    }}
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
                    href="#"
                    className="delete"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this item?"
                        )
                      )
                        this.deleteItem(listValue.id);
                    }}
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
          {userData.length > 0 ? (
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
                      <MacroCreateModal deleteAllItems={this.deleteAllItems} />
                    </div>
                  </div>
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>
                        <span className="custom-checkbox">
                          <input type="checkbox" id="selectAll" />
                          <label htmlFor="selectAll" />
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
          {userData.length === 0 ? (
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
                          <label htmlFor="selectAll" />
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
                </table>
                <h3>No data found</h3>
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
