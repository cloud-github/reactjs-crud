import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import Moment from "react-moment";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import MacroCreateModal from "./createModal";
import MacroEditModal from "./editModal";
import Checkbox from "../../components/checkbox";
import { getMacroData } from "../../actions/fetchMacros";
import { getMacroCategoryName } from "../../actions/getMacroCategoryName";
import { deleteMacro } from "../../actions/deleteMacro";
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
      open: false,
      initialData: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.deleteAllItems = this.deleteAllItems.bind(this);
    this.onCloseEditModal = this.onCloseEditModal.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getMacroData());
  }

  onEditItem(id) {
    const { dispatch, data } = this.props;
    data.userData.forEach(data => {
      if (data.id === id) {
        dispatch(getMacroCategoryName(data.attributes.macro_category_id))
          .then(response => {
            if (response) {
              return response.name;
            }
          })
          .then(cat_name => {
            this.setState(
              prevState => {
                let initialData = Object.assign({}, prevState.initialData); // creating copy of state variable initialData
                initialData.id = data.id; // update the name property, assign a new value
                initialData.name = data.attributes.name;
                initialData.macro_type = data.attributes.macro_type;
                initialData.macro_category_id =
                  data.attributes.macro_category_id;
                initialData.macro_category_name = cat_name;
                initialData.subject = data.attributes.subject;
                initialData.body = data.attributes.body;
                return { initialData }; // return new object initialData object
              },
              () => {
                this.setState({
                  open: true
                });
              }
            );
          });
      }
    });
  }

  onCloseEditModal() {
    this.setState({
      open: false
    });
  }

  deleteItem(id) {
    const { dispatch } = this.props;
    dispatch(deleteMacro(id));
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
    const { checkedItems } = this.state;
    let tempIds = [];
    for (const entry of checkedItems.entries()) {
      if (entry[1] === true) {
        tempIds.push(entry[0]);
      }
    }
    dispatch(deleteMacro(tempIds));
  }

  render() {
    const {
      data: { isError, userData, isFetching }
    } = this.props;
    const { checkedItems, open, initialData } = this.state;

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
                    {/*<td>
                      {<FroalaEditorView model={listValue.attributes.body} />}
                    </td>*/}
                  </Fragment>
                )}
                {listValue.attributes.macro_type === "sms" && (
                  <Fragment>
                    <td> - - - </td>
                    {/*<td>{listValue.attributes.subject}</td>*/}
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
                    href={null}
                    className="edit"
                    onClick={() => {
                      this.onEditItem(listValue.id);
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
                    href={null}
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
                      {open && (
                        <MacroEditModal
                          open={open}
                          initialData={initialData}
                          onCloseEditModal={this.onCloseEditModal}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>
                        {/*<span className="custom-checkbox">
                          <input type="checkbox" id="selectAll" />
                          <label htmlFor="selectAll" />
                        </span>*/}
                      </th>
                      <th>Name</th>
                      <th>Macro type</th>
                      <th>Subject</th>
                      {/*<th>Body</th>*/}
                      <th>Created at</th>
                      <th>Updated at</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{macros}</tbody>
                </table>
                {/*<div className="clearfix">
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
                </div>*/}
              </div>
              <a href="https://github.com/cloud-github/reactjs-crud">
                Download entire Code!
              </a>
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
                        {/*<span className="custom-checkbox">
                          <input type="checkbox" id="selectAll" />
                          <label htmlFor="selectAll" />
                        </span>*/}
                      </th>
                      <th>Name</th>
                      <th>Macro type</th>
                      <th>Subject</th>
                      {/*<th>Body</th>*/}
                      <th>Created at</th>
                      <th>Updated at</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                </table>
                <h3>No data found</h3>
              </div>
              <a href="https://github.com/cloud-github/reactjs-crud">
                Download entire Code!
              </a>
            </div>
          ) : null}
        </section>
      </div>
    );
  }
}

Index.propTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  isError: PropTypes.bool,
  isFetching: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    data: state.macro_post
  };
};
export default connect(mapStateToProps)(Index);
