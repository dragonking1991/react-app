import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./Form.scss";
import InputText from "./FormFormik/InputText";
import CheckBox from "./FormFormik/CheckBox";
import SelectOptions from "./FormFormik/SelectOptions";

const initFields = {
  firstName: "",
  lastName: "",
  email: "",
  acceptedTerms: false, // added for our checkbox
  jobType: "" // added for our select
}

const schema = Yup.object().shape({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email addresss`")
    .required("Required"),
  acceptedTerms: Yup.boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
  jobType: Yup.string()
    .oneOf(
      ["designer", "development", "product", "other"],
      "Invalid Job Type"
    )
    .required("Required")
});

export default function SignupForm() {
  return (
    <Formik
      initialValues={initFields}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        await new Promise(r => setTimeout(r, 500));
        console.log(setSubmitting);
        setSubmitting(false);
        console.log('setSubmitting', values);
      }}
    >
      <Form>
        <InputText
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Jane"
          className="w-full"
        />
        <InputText
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Doe"
        />
        <InputText
          label="Email Address"
          name="email"
          type="email"
          placeholder="jane@formik.com"
        />
        <SelectOptions label="Job Type" name="jobType">
          <option value="">Select a job type</option>
          <option value="designer">Designer</option>
          <option value="development">Developer</option>
          <option value="product">Product Manager</option>
          <option value="other">Other</option>
        </SelectOptions>
        <CheckBox name="acceptedTerms">
          I accept the terms and conditions
        </CheckBox>

        <button type="submit" className="text-white border-none bg-yellow-500">Submit</button>
      </Form>
    </Formik>
  );
};
