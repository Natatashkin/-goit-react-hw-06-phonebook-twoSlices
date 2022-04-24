import React from "react";
import IconButton from "../IconButton";
import PropTypes from "prop-types";
import { FaTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getItems, removeContact } from "redux/itemsSlice";
import { List, Item, Name, Number } from "./ContactList.styles";
import { getFilterValue } from "redux/filterSlice";
import { filterContacts } from "common/filterContacts";

const ContactList = () => {
  const dispatch = useDispatch();
  const items = useSelector(getItems);
  const filter = useSelector(getFilterValue);
  const filteredContacts = filterContacts(filter, items);

  return (
    <List>
      {filteredContacts.map((contact) => {
        const { id, name, number } = contact;
        return (
          <Item key={id}>
            <Name>{name}</Name>
            <Number>{number}</Number>
            <IconButton
              type="button"
              background="blue"
              aria-label="Button to delete contact"
              onClick={() => dispatch(removeContact({ id, name }))}
            >
              <FaTrashAlt />
            </IconButton>
          </Item>
        );
      })}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
