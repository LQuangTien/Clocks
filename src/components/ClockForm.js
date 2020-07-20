import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";

ClockForm.propTypes = {
  options: PropTypes.array,
  onSubmitForm: PropTypes.func
};
ClockForm.defaultProps = {
  options: [],
  onSubmitForm: null
};

function ClockForm(props) {
  const { options, onSubmitForm } = props;

  const [value, setValue] = useState(() => {
    return options.length > 0 ? options[0].value : "";
  });

  //setValue when options change
  useEffect(() => {
    if (props.options.length) {
      setValue(props.options[0].value);
    }
  }, [props.options]);

  // submitForm
  const handleSubmitForm = e => {
    e.preventDefault();
    if (!onSubmitForm) return;

    const selectedCityIndex = options.findIndex(
      option => option.value === value
    );
    onSubmitForm(options[selectedCityIndex]);
  };

  // select onChange
  const handleOnChange = e => {
    setValue(e.target.value);
  };

  if (options.length) {
    return (
      <Form
        className="d-flex flex-column flex-md-row justify-content-center my-4"
        onSubmit={handleSubmitForm}
      >
        <FormGroup>
          <Input type="select" onChange={handleOnChange}>
            {options.map(option => (
              <option value={option.value} key={option.name}>
                {option.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Button className="ml-md-2 w-100" type="submit">
            Add
          </Button>
        </FormGroup>
      </Form>
    );
  } else {
    return (
      <Form className="d-flex flex-column flex-md-row justify-content-center my-4">
        <FormGroup>
          <Input type="select" disabled>
            <option selected>Out of clock</option>
          </Input>
        </FormGroup>
      </Form>
    );
  }
}

export default ClockForm;
