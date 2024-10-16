import React from "react";
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert } from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetcRegister } from "../../api";
import { useAuth } from "../../Component/AuthContext";

function Signup({ history }) {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetcRegister({
          email: values.email,
          password: values.password,
        });
        login(registerResponse);
        history.push("/profile");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  return (
    <div className="pages">
      <Box textAlign="center">
        <Heading>Signup</Heading>
      </Box>
      {formik.errors.general && (
        <Alert status="error">{formik.errors.general}</Alert>
      )}
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <label className="labels">E-mail</label>
          <Input
            className="inputs"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            isInvalid={formik.touched.email && formik.errors.email}
          />
        </FormControl>

        <FormControl mt="4">
          <label className="labels">Password</label>
          <Input
            className="inputs"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            isInvalid={formik.touched.password && formik.errors.password}
          />
        </FormControl>

        <FormControl mt="4">
          <label className="labels">Password Confirm</label>
          <Input
            className="inputs"
            name="passwordConfirm"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordConfirm}
            isInvalid={
              formik.touched.passwordConfirm && formik.errors.passwordConfirm
            }
          />
        </FormControl>

        <Button className="bttns" mt="4" width="full" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default Signup;
