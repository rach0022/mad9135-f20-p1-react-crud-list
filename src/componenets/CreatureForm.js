import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'
import cuid from 'cuid'
import useFormInputState from '../hooks/useFormInputState'

function CreatureForm({ data, setter, edit, hideForm, setHideForm }) {
    // first lets initlize the types array and map all the names ianto html elements also get a reference to the history
    // set up all the types we want for our list items
    const CREATURE_TYPES = ['Mammal', 'Reptile', 'Bird', 'Fish', 'Amphibian', 'Insect', 'Arachnid', 'Plant', 'Fungus']
    const FILE_TYPES = 'image/jpeg image/jpg image/png image/bmp'
    const types = CREATURE_TYPES.map((type, index) =>
        <option value={type} key={`type_${index}`}>{type.toUpperCase()}</option>
    )
    const history = useHistory()

    // now lets setup the useFormInputState varaibles for this forms values of 
    // 'name', 'species', 'infoURL' and 'image', 'isPet' will be looked into
    const { value: name, setValue: setName, bind: bindName, reset: resetName } = useFormInputState('')
    const { value: species, setValue: setSpecies, bind: bindSpecies, reset: resetSpecies } = useFormInputState('')
    const { value: isPet, setValue: setIsPet, checkBind: checkIsPet, reset: resetIsPet } = useFormInputState(false)
    const { value: image, setValue: imageSetter, bind: bindImage, reset: resetImage } = useFormInputState('')
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
        if (name === hideForm[2].name) {

        } else {
            setName(hideForm[2].name)
            setSpecies(hideForm[2].type)
            setIsPet(hideForm[2].isPet)
            setInfoURL(hideForm[2].infoURL)
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
            imageURL: image,
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

    //callback function to handle when a file is uploaded to the file input,
    // will be used to convert the image into a base64 encoded string before saving
    // in the database 'localstorage'
    // based on this article: https://medium.com/@blturner3527/storing-images-in-your-database-with-base64-react-682f5f3921c2
    function handleFormOnChange(event) {
        event.preventDefault()

        // after confirming the file exists in event.currentTarget.files[0] (since only one file at a time)
        // using a FileReader object: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        // I can asynchronously read the contents of a file, in this case an image and readAsBinaryString
        // after listening for the load event with FileReader.onLoad
        const form = event.target
        const file = (form.files) ? form.files[0] : null

        if (file) {
            const fileReader = new FileReader()
            // fileReader.addEventListener('load', ({ target }) => imageSetter(`data:image/png;base64${btoa(target.result)}`))
            fileReader.onload = setBase64EncodedString.bind(this)
            fileReader.readAsBinaryString(file)
            console.log(fileReader)
        }

    }

    // callback function for the successful reading of a file
    // will get the binary string from the currentTarget.result
    // and will use the binary to ascii function to convert it
    // to something we can store in the database, using an arrow function
    const setBase64EncodedString = ({ target }) => imageSetter(`data:image/png;base64${btoa(target.result)}`)
    // we can bind this to the fileReader onLoad function to change its context to the
    // fileReader
    // const successfulFileLoad = event => {
    //     let binaryString = event.target.result
    //     console.log(event)
    //     // using the images setter to set the binary string with the file header
    //     // of a png image 
    //     imageSetter(`data:image/png;base64${btoa(binaryString)}`)
    //     console.log(btoa(binaryString))
    // }

    return (
        <div className={`CreatureForm row ${hideForm[0]}`}>
            <form className="col s12" onSubmit={handleSubmit} onChange={handleFormOnChange}>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="name" type="text" className="validate" {...bindName} required />
                        <label htmlFor="name" data-error="No name set">Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <select name="type" id="type" {...bindSpecies}>
                            {types}
                        </select>
                        <label htmlFor="type">Species</label>
                    </div>
                    <div className="input-field col s6">
                        <label>
                            <input name="isPet" type="checkbox" id="isPet" className="filled-in" {...checkIsPet} />
                            <span>Is this your pet?</span>
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="file-field input-field col s12">
                        <div className="btn">
                            <span>Photo</span>
                            <input type="file" name="imageFile" accept={FILE_TYPES} {...bindImage} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" name="imagePath" type="text" />
                        </div>
                        {/* <input id="image" type="file" accept={FILE_TYPES} className="validate" defaultValue={formPlaceholder.imageURL} />
                        <label htmlFor="image">Picture</label> */}
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="infoURL" type="url" className="validate" {...bindInfoURL} />
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
