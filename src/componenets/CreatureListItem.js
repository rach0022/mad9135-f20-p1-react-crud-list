import React from 'react'
import defaultImage from '../static/images/testLeaf.svg'


function CreatureListItem({ data, setter, setHideForm }) {

    // callback function to delete an item in the data when teh user clicks a button
    function deleteCreature(event) {
        event.preventDefault()

        // get a reference to the index position of the data item from the button data-target attribute
        // and then splice the array once at its index location and set that as the new data
        const target = event.currentTarget.getAttribute('data-target')
        data.splice(target, 1)
        setter([...data])
    }

    // callback function to display the form when the user clicks a button and
    // send the value of id to the editing form
    function displayCreatureForm(event) {
        event.preventDefault()
        const index = event.currentTarget.getAttribute('data-target')
        setHideForm(['', index, data[index]])
    }

    // function to sort the creatures based on the following conditions
    // pets are displayed first (isPet must be set) and if both creatures are pets
    // we sort by name
    const sortCreatures = (a, b) => {
        if (a.isPet && !b.isPet) {
            return -1
        } else if (!a.isPet && b.isPet) {
            return 1
        }
        // if they are both pets (or not) the following code will first
        // using a switch we will compare the names (at uppercase) and sort them alphabetically
        let aName = a.name.toUpperCase()
        let bName = b.name.toUpperCase()
        if (aName > bName) {
            return 1
        } else if (bName > aName) {
            return -1
        }
        return 0 // they are equal
    }

    // sort the data based on my supplied sortCreatures function
    data.sort(sortCreatures)

    // now that we have the confirmed no errors and we have a catlog lets loop through
    // and map each creature to an CreatureList item
    const creatureElements = data.map((creature, index) => {

        // conditonal rendering for the collection item dpeending on properties set like
        // image url we wil display those properties
        const img = (creature.imageURL) ? `data:image/png;base64, ${creature.imageURL}` : defaultImage
        const infoLink = (creature.infoURL) ? (<a href={creature.infoURL} target="_blank" rel="noreferrer">Info Page</a>) : null
        const petBadge = (creature.isPet) ? (<span className="badge icon-purple"><i className="material-icons">star</i></span>) : null
        const petStatus = (creature.isPet) ? 'favourite' : null


        return (
            <li key={creature.id} className="collection-item avatar hoverable light-accent">
                <div className="avatar-container">
                    <img src={`${img}`} alt={`The ${creature.name}`} className={`circle ${petStatus}`} />
                    {petBadge}
                </div>
                <span className="title">{creature.name}</span>
                <div className="row">
                    <p>{creature.type}</p>
                    {infoLink}
                </div>

                <div className="secondary-content row">
                    <div className="btn-box">
                        <button className="btn col s6 edit-btn" data-target={index} onClick={displayCreatureForm}>
                            <i className="material-icons right">edit</i>Edit
                        </button>
                        <button className="btn col s6 del-btn" data-target={index} onClick={deleteCreature}>
                            <i className="material-icons right">delete</i>Delete
                        </button>
                    </div>
                </div>
            </li>
        )
    })

    // return all the creatureListElements
    return (
        <div>
            { creatureElements}
        </div>
    )
}

export default CreatureListItem
