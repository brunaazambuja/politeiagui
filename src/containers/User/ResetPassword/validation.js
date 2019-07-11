import * as Yup from "yup";

export const requestResetValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Required")
  });

export const resetValidationSchema = ({ minpasswordlength }) =>
  Yup.object().shape({
    newpassword: Yup.string()
      .min(minpasswordlength)
      .required("Required"),
    verify_password: Yup.string()
      .oneOf([Yup.ref("newpassword")], "Passwords must match")
      .required("Required")
  });

export const urlParamsValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    verificationtoken: Yup.string().required("Verification token is required")
  });