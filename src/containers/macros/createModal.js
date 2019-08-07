import _ from "lodash";
import produce from "immer";
import autoBind from "auto-bind";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { Form, Field } from "react-final-form";
import {
  MACRO_TYPES,
  CHARCOUNTERMAX,
  FILE_FIELD_NAME
} from "../../constants/macros";
import Froala from "../../components/froala";
import { stripValueObject } from "../../utils/object";
import createMacro from "../../actions/macros/createMacro";
import renderDropzoneInput from "../../components/fileImport";
import selectInput from "../../components/selectInput/selectInput";
import renderField from "../../components/miscellaneous/renderField";
import selectCreatable from "../../components/selectInput/selectCreatable";
import mentionsTextInput from "../../components/autoSuggestion/mentionsTextInput";
import createMacroCategory from "../../actions/macroCategories/createMacroCategory";
import getMergeVariablesLikeName from "../../actions/mergeVariables/getMergeVariablesLikeName";
import getMacroCategoriesLikeName from "../../actions/macroCategories/getMacroCategoriesLikeName";

const styles = {
  paddingBottom: 38
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
    this.mergeVariableSearch = _.debounce(this.mergeVariableSearch, 1000);
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
    if (values.files) {
      stripedValues.files = values.files;
    }
    const { createMacro } = this.props;
    createMacro(stripedValues).then(response => {
      if (response) {
        const { addToMacros } = this.props;
        addToMacros(response, true);
        this.onCloseModal();
      }
    });
  }

  getInitialValues() {
    return {
      type: { label: "Email Macro", value: "email" }
    };
  }

  mergeVariableSearch(value, callback) {
    const { getMergeVariablesLikeName } = this.props;
    getMergeVariablesLikeName(value).then(response => {
      if (response) {
        callback(
          response.data.map(variable => ({
            id: String(variable.id),
            display: variable.data_key
          }))
        );
      }
    });
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
    const { getMergeVariablesLikeName } = this.props;

    return (
      <div style={styles}>
        <button
          className="btn btn-primary"
          onClick={this.onOpenModal}
          type="submit"
        >
          Create Macro
        </button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="modal-wrapper">
            <div className="modal-header">
              <div className="w-row">
                <div className="w-col w-col-10">
                  <div className="modal-title">
                    Create new email or SMS macros. Keep it private or share
                    with your team members
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
                          <div className="col-sm-12" style={styles}>
                            <label>Type</label>
                            <Field
                              name="type"
                              options={MACRO_TYPES}
                              component={selectInput}
                            />
                          </div>

                          <div className="col-sm-12" style={styles}>
                            <Field
                              name="name"
                              placeholder="Name Ex. Follow-up template"
                              type="text"
                              className="text-fields w-input"
                              component={renderField}
                            />
                          </div>

                          <div className="col-sm-12" style={styles}>
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
                            <div className="col-sm-5" style={styles}>
                              <Field
                                singleLine
                                name="subject"
                                component={mentionsTextInput}
                                placeholder="Merge tag using '@'"
                                mergeVariablesSearch={this.mergeVariableSearch}
                              />
                            </div>
                          )}

                          {type.value === "sms" && (
                            <div className="col-sm-5" style={styles}>
                              <Field
                                name="subject"
                                component={mentionsTextInput}
                                maxTextLength={CHARCOUNTERMAX}
                                placeholder="Merge tag using '@'"
                                mergeVariablesSearch={this.mergeVariableSearch}
                              />
                            </div>
                          )}

                          {type.value === "email" && (
                            <div className="col-sm-12">
                              <Field
                                name="body"
                                getMergeVariablesLikeName={
                                  getMergeVariablesLikeName
                                }
                                component={Froala}
                              />
                            </div>
                          )}

                          <div className="col-sm-12" style={styles}>
                            <label htmlFor={FILE_FIELD_NAME}>
                              Upload image
                            </label>
                            <Field
                              multiple
                              accept="image/*"
                              maxSize={500000} // 500 kb
                              name={FILE_FIELD_NAME}
                              component={renderDropzoneInput}
                            />
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={this.onCloseModal}
                              >
                                Cancel
                              </button>
                            </div>
                            <div className="col-md-6">
                              <button
                                type="submit"
                                className="btn btn-outline-primary"
                                disabled={invalid || submitting}
                              >
                                Create Macro
                              </button>
                            </div>
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
  addToMacros: PropTypes.func.isRequired,
  createMacroCategory: PropTypes.func.isRequired,
  getMacroCategoriesLikeName: PropTypes.func.isRequired,
  getMergeVariablesLikeName: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    createMacro,
    createMacroCategory,
    getMergeVariablesLikeName,
    getMacroCategoriesLikeName
  }
)(MacroCreateModal);
