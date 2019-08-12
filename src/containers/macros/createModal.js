import _ from "lodash";
import produce from "immer";
import autoBind from "auto-bind";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { Form, Field } from "react-final-form";
import { MACRO_TYPES, CHARCOUNTERMAX } from "../../constants/macros";
import Froala from "../../components/froala";
import { stripValueObject } from "../../utils/object";
import createMacro from "../../actions/createMacro";
import selectInput from "../../components/selectInput/selectInput";
import renderField from "../../components/miscellaneous/renderField";
import selectCreatable from "../../components/selectInput/selectCreatable";
import mentionsTextInput from "../../components/autoSuggestion/mentionsTextInput";
import createMacroCategory from "../../actions/createMacroCategory";
import getMacroCategoriesLikeName from "../../actions/getMacroCategoriesLikeName";

const styles = {
  paddingBottom: 38
};

const styles2 = {
  paddingBottom: 48
};

const styles3 = {
  paddingBottom: 28
};

const styles4 = {
  paddingBottom: 44
};

class MacroCreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      macroCategoriesOptions: []
    };
    autoBind(this);
    this.macroCategorySearch = _.debounce(this.macroCategorySearch, 1000);
  }

  onOpenModal() {
    this.setState(
      produce(draft => {
        draft.open = true;
      })
    );
  }

  onCloseModal() {
    this.setState(
      produce(draft => {
        draft.open = false;
      })
    );
  }

  onSubmit(values) {
    let stripedValues = stripValueObject(values);
    const { createMacro } = this.props;
    createMacro(stripedValues).then(response => {
      if (response) {
        this.onCloseModal();
      }
    });
  }

  getInitialValues() {
    return {
      type: { label: "Email Macro", value: "email" }
    };
  }

  validate(values) {
    const errors = {};
    if (!values.name) {
      errors.name = "macro name is required!";
    }
    if (!values.subject || !values.subject.text.trim().length) {
      errors.subject = `${
        values.type.value === "sms" ? "message" : "subject"
      } is required`;
    }
    if (!values.macroCategoryId) {
      errors.macroCategoryId = "category is required!";
    }
    if (!values.body && values.type.value === "email") {
      errors.body = "email content is required!";
    }
    return errors;
  }

  handleDropdownChange(newValue, actionMeta, change) {
    if (
      actionMeta.action === "select-option" ||
      actionMeta.action === "remove-value"
    ) {
      change("macroCategoryId", newValue);
    } else if (actionMeta.action === "create-option") {
      const { createMacroCategory } = this.props;
      createMacroCategory({ name: newValue.value }).then(response => {
        change("macroCategoryId", {
          label: newValue.label,
          value: String(response.id)
        });
      });
    } else if (actionMeta.action === "clear") {
      change("macroCategoryId", null);
    }
  }

  macroCategorySearch(inputValue) {
    const { getMacroCategoriesLikeName } = this.props;
    getMacroCategoriesLikeName(inputValue).then(response => {
      this.setState(
        produce(draft => {
          draft.macroCategoriesOptions = response.map(data => ({
            value: String(data.id),
            label: data.name
          }));
        })
      );
    });
  }

  handleDropdownInputChange(input) {
    let inputValue = input.trim();

    if (inputValue.length > 2) {
      this.macroCategorySearch(inputValue);
    }
  }

  render() {
    const { open, macroCategoriesOptions } = this.state;
    const { deleteAllItems } = this.props;

    return (
      <div style={styles}>
        <button
          className="btn btn-primary float-right"
          onClick={this.onOpenModal}
          type="submit"
        >
          <i className="material-icons">&#xE147;</i> <span>Add New Macro</span>
        </button>
        <button
          className="btn btn-danger float-right"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you wish to delete all selected item(s)?"
              )
            )
              deleteAllItems();
          }}
          type="submit"
        >
          <i className="material-icons">&#xE15C;</i> <span>Delete</span>
        </button>
        <Modal
          //style={type.value === "email" && { width: 1250 }}
          open={open}
          onClose={this.onCloseModal}
          center
        >
          <div className="modal-wrapper">
            <div className="modal-header">
              <div className="w-row">
                <div className="w-col w-col-10">
                  <div className="modal-title">
                    Create new email or SMS macros.
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="underline-modal" />
              <div className="add-single-person-wrapper">
                <div className="form-block-5 w-form">
                  <Form
                    keepDirtyOnReinitialize
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    initialValues={this.getInitialValues()}
                    render={({
                      handleSubmit,
                      submitting,
                      invalid,
                      form: { change },
                      values: { type }
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-sm-12" style={styles2}>
                            {/*<label>Type</label>*/}
                            <Field
                              name="type"
                              options={MACRO_TYPES}
                              component={selectInput}
                            />
                          </div>
                          <div className="col-sm-12" style={styles3}>
                            <Field
                              name="name"
                              placeholder="Macro name"
                              type="text"
                              className="text-fields w-input"
                              component={renderField}
                            />
                          </div>
                          <div className="col-sm-12" style={styles4}>
                            <Field
                              name="macroCategoryId"
                              component={selectCreatable}
                              placeholder="Select or create a category"
                              options={macroCategoriesOptions}
                              onChange={(value, actionMeta) =>
                                this.handleDropdownChange(
                                  value,
                                  actionMeta,
                                  change
                                )
                              }
                              handleInputChange={this.handleDropdownInputChange}
                              searchable
                            />
                          </div>
                          {type.value === "email" && (
                            <div className="col-sm-6" style={styles}>
                              <Field
                                singleLine
                                isEmail
                                name="subject"
                                component={mentionsTextInput}
                                placeholder="Subject"
                              />
                            </div>
                          )}
                          {type.value === "sms" && (
                            <div className="col-sm-10" style={styles}>
                              <Field
                                name="subject"
                                isEmail={false}
                                component={mentionsTextInput}
                                maxTextLength={CHARCOUNTERMAX}
                                placeholder="Message"
                              />
                            </div>
                          )}
                          {type.value === "email" && (
                            <div className="col-sm-12" style={styles}>
                              <Field name="body" component={Froala} />
                            </div>
                          )}
                          <div className="col-sm-12">
                            <button
                              type="button"
                              className="btn btn-outline-danger float-left"
                              onClick={this.onCloseModal}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-outline-primary float-right"
                              disabled={invalid || submitting}
                            >
                              Create Macro
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

MacroCreateModal.propTypes = {
  createMacro: PropTypes.func.isRequired,
  deleteAllItems: PropTypes.func,
  createMacroCategory: PropTypes.func.isRequired,
  getMacroCategoriesLikeName: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    createMacro,
    createMacroCategory,
    getMacroCategoriesLikeName
  }
)(MacroCreateModal);
