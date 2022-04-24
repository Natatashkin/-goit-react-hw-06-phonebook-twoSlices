import React from "react";
import * as yup from "yup";
import { nanoid } from "nanoid";
import { Formik, Form, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addContact, getItems } from "redux/itemsSlice";
import { FormField, Input, Label, ErrorMessageStyle } from "./Form.styled";
import Button from "../Button";

const nameRegEx = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneRegEx =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(nameRegEx, "The name must contain only characters")
    .required(),
  number: yup
    .string()
    .matches(phoneRegEx, "Phone number is not valid")
    .min(7, "It's not looks like phone!")
    .max(13, "Must be minimum 7 maximum 13 digits ")
    .required(),
});

export const AppForm = () => {
  const dispatch = useDispatch();
  const items = useSelector(getItems);

  const checkUniqueName = (newName) => {
    const normalyzeName = newName.toLocaleLowerCase();
    return items.find(({ name }) => name.toLocaleLowerCase() === normalyzeName);
  };

  const numberFormatting = (number) => {
    const array = [...number];
    for (let i = 3; i < array.length - 1; i += 3) {
      array.splice(i, 0, "-");
    }

    return array.join("");
  };

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;
    const newName = checkUniqueName(name);
    if (newName) {
      toast.error(`Name ${name} is already in contacts`);
      return;
    }

    const formatedNumber = numberFormatting(number);
    const contact = {
      id: nanoid(),
      name,
      number: formatedNumber,
    };
    dispatch(addContact(contact));
    resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={{ name: "", number: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormField>
            <Label htmlFor="name">Contact Name</Label>
            <Input name="name" type="text" placeholder=" " />
            <ErrorMessage
              name="name"
              render={(msg) => <ErrorMessageStyle>{msg}</ErrorMessageStyle>}
            />
          </FormField>

          <FormField>
            <Label htmlFor="number">Contact Number</Label>
            <Input name="number" type="tel" placeholder=" " />
            <ErrorMessage
              name="number"
              render={(msg) => <ErrorMessageStyle>{msg}</ErrorMessageStyle>}
            />
          </FormField>

          <Button type={"submit"} title={"Add Contact"} />
        </Form>
      </Formik>
    </div>
  );
};

export default AppForm;
