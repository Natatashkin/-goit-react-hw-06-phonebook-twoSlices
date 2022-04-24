import PropTypes from "prop-types";
import { AppSyles, AppTitle } from "./App.styled";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import AppForm from "./Form";
import Section from "./Section";
import Filter from "./Filter";
import ContactList from "./ContactList";
import { getItems } from "../redux/itemsSlice";

const App = ({ title }) => {
  const items = useSelector(getItems);

  return (
    <AppSyles>
      <AppTitle>{title}</AppTitle>
      <Section>
        <AppForm />
      </Section>

      <Section title="Contacts">
        {items.length > 0 ? (
          <>
            <Filter />
            <ContactList />
          </>
        ) : (
          <p>You haven't any contacts yet!</p>
        )}
      </Section>
      <Toaster />
    </AppSyles>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
