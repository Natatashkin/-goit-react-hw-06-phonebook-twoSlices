export const filterContacts = (filter, contacts) => {
  const normalizedFilter = filter.toLocaleLowerCase();
  return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};
