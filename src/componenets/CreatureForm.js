import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'
import cuid from 'cuid'

function CreatureForm({ data, setter }) {
    // first lets initlize the types array and map all the names ianto html elements also get a reference to the history
    const types = ['Mammal', 'Reptile', 'Bird', 'Fish', 'Amphibian', 'Insect', 'Arachnid', 'Plant', 'Fungus'].map((type, index) =>
        <option value={type} key={`type_${index}`}>{type.toUpperCase()}</option>
    )
    const history = useHistory()

    // now lets intilize any materilize functionality I need with a useEffect function with no dependancies
    useEffect(() => {
        M.AutoInit()
    }, [])

    //handleSubmit event will take care of adding the specified object into the localStorage
    function handleSubmit(event) {
        // stop the normal functionality of a form submitting
        event.preventDefault()

        // get a reference to the form and map its values to a new object
        const form = event.target
        // must add validation to form values? materilize-css may already do this
        const newOrganism = {
            id: cuid(),
            name: form.name.value.trim(),
            type: form.type.value,
            imageURL: form.imageURL.value.trim(),
            infoURL: form.infoURL.value.trim(),
            isPet: (form.isPet.value) ? true : false,
        }

        //using the setter function we can set the datasource and then navigate away using the useHistory
        setter([...data, newOrganism])
        history.push('/')
    }

    return (
        <div className="CreatureForm row">
            <form className="col s12" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-field col s12">
                        <input placeholder="Name" id="name" type="text" className="validate" />
                        <label htmlFor="name">Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input name="isPet" type="checkbox" id="isPet" className="filled-in" />
                        <label htmlFor="isPet">Is this your pet?</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <select name="type" id="type">
                            {types}
                        </select>
                        <label htmlFor="type">Creature Type</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="imageURL" type="url" className="validate" />
                        <label htmlFor="imageURL">Picture Link</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="infoURL" type="url" className="validate" />
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
