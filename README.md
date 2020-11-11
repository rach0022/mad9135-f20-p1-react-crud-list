# React CRUD

> Building on what you have practised in earlier assignments, create a two-page React App that allows CRUD operations on a list of things. You can choose the topic for your list.

## Requirements:

- [ ] Each item in the list needs a unique id property, and at least two other relevant properties.
- [ ] The list must be stored in the state belonging to the top level <App /> component.
- [ ] The application state should be cached to localStorage, and retrieved on a browser refresh.
- [ ] In addition to the <App /> component, you will need at least the following components:

  <AppHeader />
  <NewItemView />
  <ListView />
  <ListItem />

- [ ] The properties of each list item should be editable.
- [ ] Each list item should have an option to remove it from the list.
- [ ] Use React Router to navigate between the List View and the New Item View.

## To Do:

- [ ] Add update and delete functionality
- [ ] Render collection-items conditionally for the CreatureList (do not show avatar if non set, disable info link if null)
- [ ] Add form validation for the Create/ Update form
- [ ] (OPTIONAL) create useCreatureFormInputState hook to easily read form values from the create/ update form

## Bugs:

- [ ] Checkbox Input from Materilize-CSS will not display
