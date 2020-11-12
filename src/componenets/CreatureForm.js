import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'
import cuid from 'cuid'

function CreatureForm({ data, setter, edit, hideForm, setHideForm }) {
    // first lets initlize the types array and map all the names ianto html elements also get a reference to the history
    // set up all the types we want for our list items
    const CREATURE_TYPES = ['Mammal', 'Reptile', 'Bird', 'Fish', 'Amphibian', 'Insect', 'Arachnid', 'Plant', 'Fungus']
    const types = CREATURE_TYPES.map((type, index) =>
        <option value={type} key={`type_${index}`}>{type.toUpperCase()}</option>
    )
    const history = useHistory()

    //if we have something in hideForm[2] (the object to edited) then lets set those values
    // as the forms values
    let formPlaceholder = {
        name: '',
        imageURL: '',
        infoURL: '',
        isPet: ''
    }
    if (hideForm[2]) {
        formPlaceholder = { ...formPlaceholder, ...hideForm[2] }
    }

    // now lets intilize any materilize functionality I need with a useEffect function with no dependancies
    useEffect(() => {
        M.AutoInit()
    }, [])



    // function to update the selected creature
    // callback function to update an element in the data and set it to the data
    function updateCreature(event, index) {
        event.preventDefault()

        // will eventually get this info from a form, for testing lets start with a static object
        const form = event.target
        const updatedCreature = {
            id: cuid(),
            name: form.name.value.trim(),
            type: form.type.value,
            imageURL: form.imageURL.value.trim(),
            infoURL: form.infoURL.value.trim(),
            isPet: (form.isPet.checked) ? true : false,
        }

        // get a reference to the array postion of the item in data from the attribute
        // data-target and then set the new item at the position using the spread operator
        // we will combine the old object with the new object and update any properties
        // in the new object
        data[index] = {
            ...data[index],
            ...updatedCreature
        }
        setter([...data])

        // since this is editing mode lets hide the form after we are done
        setHideForm(['hidden', null, null])
    }

    //handleSubmit event will take care of adding the specified object into the localStorage
    function handleSubmit(event) {
        // stop the normal functionality of a form submitting
        event.preventDefault()

        // if we are in editing mode lets get the index of the item we are editing and then
        // send the event 
        if (edit) {
            updateCreature(event, hideForm[1])
        } else {
            // get a reference to the form and map its values to a new object
            const form = event.target
            // must add validation to form values? materilize-css may already do this
            const newOrganism = {
                id: cuid(),
                name: form.name.value.trim(),
                type: form.type.value,
                imageURL: form.imageURL.value.trim(),
                infoURL: form.infoURL.value.trim(),
                isPet: (form.isPet.checked) ? true : false,
            }

            //using the setter function we can set the datasource and then navigate away using the useHistory
            setter([...data, newOrganism])
            history.push('/')
        }
    }

    return (
        <div className={`CreatureForm row ${hideForm[0]}`}>
            <form className="col s12" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-field col s12">
                        <input placeholder="Name" id="name" type="text" className="validate" defaultValue={formPlaceholder.name} required />
                        <label htmlFor="name" data-error="No name set">Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <select name="type" id="type">
                            {types}
                        </select>
                        <label htmlFor="type">Creature Type</label>
                    </div>
                    <div className="input-field col s6">
                        <label>
                            <input name="isPet" type="checkbox" id="isPet" className="filled-in" defaultValue="true" />
                            <span>Is this your pet?</span>
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="imageURL" type="url" className="validate" defaultValue={formPlaceholder.imageURL} />
                        <label htmlFor="imageURL">Picture Link</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="infoURL" type="url" className="validate" defaultValue={formPlaceholder.infoURL} />
                        <label htmlFor="infoURL">Info Link</label>
                    </div>
                </div>
                <div className="row">
                    <button className="btn waves-effect waves-light" type="submit">submit
                    <i className="material-icons right">send</i></button>
                </div>
            </form>
        </div>
    )
}

export default CreatureForm
