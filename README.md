# React CRUD

> Building on what you have practised in earlier assignments, create a two-page React App that allows CRUD operations on a list of things. You can choose the topic for your list.
> Topic, a pocket compendium for the user where they can record the local wildlife, flora and fauna to eventually develop their own personal Nature Journal

## Requirements:

- [x] Each item in the list needs a unique id property, and at least two other relevant properties.
- [x] The list must be stored in the state belonging to the top level (App) component.
- [x] The application state should be cached to localStorage, and retrieved on a browser refresh.
- [x] In addition to the (App) component, you will need at least the following components:

  (AppHeader)
  (NewItemView)
  (ListView)
  (ListItem)

- [x] The properties of each list item should be editable.
- [x] Each list item should have an option to remove it from the list.
- [x] Use React Router to navigate between the List View and the New Item View.

## To Do:

- [x] Add update and delete functionality
- [x] split up the CreatureList into a ListView and a ListItem component
- [x] add the selected creature's values when editing to the form as initial values | maybe switch to a useState or a custom hook?
- [ ] Render collection-items conditionally for the CreatureList (do not show avatar if non set, disable info link if null)
- [ ] Add form validation for the Create/ Update form
- [ ] (OPTIONAL) create useCreatureFormInputState hook to easily read form values from the create/ update form
- [ ] create (or find) icons for the types (working list: ['Mammal', 'Reptile', 'Bird', 'Fish', 'Amphibian', 'Insect', 'Arachnid', 'Plant', 'Fungus'])
- [x] create x-icon for website icon something nature themed
- [ ] decide on colour scheme, something nature themed
- [x] decide on font from either google fonts or elsewhere | Exo 2 and Hepta Slab
- [ ] change to plant or animal focused app, maybe not both if both then rename to Compendium, Beast & Herbiary, GaiaKeeper, NatureJournalr??? ? herbiary or beastiary (will also be branch names)?
- [ ] fix up the styling on all forms, collections, collection items, etc

## Look into:

- [ ] can we somehow get users to upload photos to the website local storage
- [ ] add a location field? users can give access to their current location and input that field?

## Bugs:

- [x] Checkbox Input from Materilize-CSS will not display
- [ ] materlize-css overrides any font families I set, look into this
- [x] look into the proper form values being set | using the setter functions I can set the proper values
- [x] species does not get reset when submitting the edit form?
- [x] checkbox cannot use the same useFormInput state, make changes so it can
- [x] setImage function cannot be used inside the onLoad event callback function, find out why (will crash when loading an image) | use a closure to get reference to the variable? | nope closures didnt work jsut turned into a react class component instead so I could bind the context of this (beign the class object containing the setter function) to the callback function for the onload event
- [x] image in base64 string wont display? using the 'data:image/png;base64' prefix? | I forgot the comma : 'data:image/png;base64, {binaryText}'
- [ ] select will not show the old option but the value set is the right option, need to figure out how to set the displayed value
- [ ] why do fonts not work locally but do work on netlify?
- [x] cannot edit the name value because of how I set my value? Do I just say to users that we cannot change the name after setting? | use setForm to set the third entry to null
- [x] image will get wiped out if not set when editing | check if there is an image value and if there isnt set it to the old one

## Branches:

- IDEA-01 : Switch from imageURL input to a photo upload to base64 encoded string. Also create a custom hook, or just use a hook for the form values on change to pass around the base64 string
- STYLE-01 : Branch to start styling the assignment on without breaking the main
- STYLE-02 : Because I forgot netlify and the cancel button for the form, I will merge STYLE-01 onto main
