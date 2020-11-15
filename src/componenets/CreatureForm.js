import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
import cuid from 'cuid'
import useFormInputState from '../hooks/useFormInputState'
import ImageFormInput from './ImageFormInput'

function CreatureForm({ data, setter, edit, hideForm, setHideForm }) {
    // first lets initlize the types array and map all the names ianto html elements also get a reference to the history
    // set up all the types we want for our list items
    const CREATURE_TYPES = ['Mammal', 'Reptile', 'Bird', 'Fish', 'Amphibian', 'Insect', 'Arachnid', 'Plant', 'Fungus']
    const types = CREATURE_TYPES.map((type, index) =>
        <option value={type} key={`type_${index}`}>{type.toUpperCase()}</option>
    )
    const history = useHistory()
    const colourClass = "dark-shade"

    // now lets setup the useFormInputState varaibles for this forms values of 
    // 'name', 'species', 'infoURL' and 'image', 'isPet' will be looked into
    const { value: name, setValue: setName, bind: bindName, reset: resetName } = useFormInputState('')
    const { value: species, setValue: setSpecies, bind: bindSpecies, reset: resetSpecies } = useFormInputState('')
    const { value: isPet, setValue: setIsPet, checkBind: checkIsPet, reset: resetIsPet } = useFormInputState(false)

    //because image is set from an uploaded file we need to pass down the binder and the setter to the ImageFormInput componenet
    const { value: image, setValue: setImage, bind: bindImage, reset: resetImage } = useFormInputState('')
    const { value: infoURL, setValue: setInfoURL, bind: bindInfoURL, reset: resetInfoURL } = useFormInputState('')

    // creating a function to call all the reset functions
    const resetValues = (...resetterList) => {
        // first make sure we have arguments, then for each item in the arguments
        // we will check if its a function and then run it
        if (resetterList.length > 0) {
            for (let item in resetterList) if (typeof item == "function") item()
        }
    }

    //if we have something in hideForm[2] (the object to edited) then lets set those values
    // as the forms values for default options when opening the editing form

    if (hideForm[2]) {
        // to stop infinite setting and looping we add a conditonal check
        // if the name we are setting is already the same as the one we are setting
        // then we will not reset the values because we know all the other values have been set
        // ***BUG*** because of the way I check name I cannot edit name in the editing form but other values are safe
        if (name === hideForm[2].name) {
            M.updateTextFields()

        } else {
            //first set the values as the old values
            setName(hideForm[2].name)
            setSpecies(hideForm[2].type)
            setIsPet(hideForm[2].isPet)
            setInfoURL(hideForm[2].infoURL)
            setHideForm([hideForm[0], hideForm[1], null])
            // need to find some way to change which value of the select is displayed without refs? or with?
        }

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
        // const form = event.target
        const updatedCreature = {
            id: cuid(),
            name: name.trim(),
            type: species,
            imageURL: (image) ? image : data[index].imageURL,
            infoURL: infoURL.trim(),
            isPet: isPet,
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
    const handleSubmit = event => {
        // stop the normal functionality of a form submitting
        event.preventDefault()

        // if we are in editing mode lets get the index of the item we are editing and then
        // send the event 
        if (edit) {
            updateCreature(event, hideForm[1])
        } else {
            // since we use the useFormInputState function we can just set those values in the form
            // after doing a little validation for proper values? materilize-css may already do this
            const newOrganism = {
                id: cuid(),
                name: name.trim(),
                type: species,
                imageURL: image,
                infoURL: infoURL.trim(),
                isPet: isPet,
            }

            //using the setter function we can set the datasource and then navigate away using the useHistory
            setter([...data, newOrganism])
            history.push('/')
        }
        resetValues(resetName, resetSpecies, resetIsPet, resetImage, resetInfoURL)
    }


    const handleFormOnChange = (event) => event.preventDefault()

    // using closures I can pass the callback function (in this case setHideform) into
    // the handleCancel callback function for the on clock event of the cancel button to
    // set the hide form value to hidden
    const handleCancel = (function (callback) {
        return ev => {
            if (callback) callback(['hidden', null, null])
        }
    })(setHideForm)

    return (
        <div className={`card-panel ${colourClass} col s12  ${hideForm[0]}`}>
            <div className={`CreatureForm ${colourClass}  row`}>
                <form className="col s12" onSubmit={handleSubmit} onChange={handleFormOnChange}>
                    <div className="col s10">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="name" type="text" className="validate" {...bindName} required />
                                <label htmlFor="name" data-error="No name set" className="active">Name</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input id="infoURL" type="url" className="validate" {...bindInfoURL} />
                                <label htmlFor="infoURL" className="active">Info Link</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="file-field input-field col s12">
                                <ImageFormInput setter={setImage} binder={bindImage} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s8">
                                <select name="type" id="type" {...bindSpecies}>
                                    {types}
                                </select>
                                <label htmlFor="type">Species</label>
                            </div>
                            <div className="input-field col s4">
                                <label>
                                    <input name="isPet" type="checkbox" id="isPet" className="filled-in" {...checkIsPet} />
                                    <span className="white-text">Favourite?</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col s2 right-align btnCol">
                        <div className="formButtons">
                            <div className="row">
                                <button className="btn waves-effect waves-light" type="submit">
                                    <i className="material-icons right">send</i>Send
                                </button>
                            </div>
                            <div className="row">
                                <Link to="/" onClick={handleCancel} className="btn waves-effect waves-light">
                                    <i className="material-icons right">cancel</i>Cancel
                                </Link>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreatureForm
