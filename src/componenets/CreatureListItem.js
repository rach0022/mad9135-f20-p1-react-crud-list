import React from 'react'
import defaultImage from '../images/testLeaf.svg'

function CreatureListItem({ data, setter }) {

    // callback function to update an element in the data and set it to the data
    function updateCreature(event) {
        event.preventDefault()

        // will eventually get this info from a form, for testing lets start with a static object
        const newCreature = {
            name: "Spotter",
            type: "Mammal",
            imageURL: "https://placedog.net/500",
            infoURL: "https://en.wikipedia.org/wiki/Dog"
        }

        // get a reference to the array postion of the item in data from the attribute
        // data-target and then set the new item at the position using the spread operator
        // we will combine the old object with the new object and update any properties
        // in the new object
        const target = event.currentTarget.getAttribute('data-target')
        data[target] = {
            ...data[target],
            ...newCreature
        }
        setter([...data])
    }

    // callback function to delete an item in the data when teh user clicks a button
    function deleteCreature(event) {
        event.preventDefault()

        // get a reference to the index position of the data item from the button data-target attribute
        // and then splice the array once at its index location and set that as the new data
        const target = event.currentTarget.getAttribute('data-target')
        data.splice(target, 1)
        setter([...data])
    }

    // now that we have the confirmed no errors and we have a catlog lets loop through
    // and map each creature to an CreatureList item
    const creatureElements = data.map((creature, index) => {

        // conditonal rendering for the collection item dpeending on properties set like
        // image url we wil display those properties
        const img = (creature.imageURL) ? creature.imageURL : defaultImage
        const infoLink = (creature.infoURL) ? (<a href={creature.infoURL}>Info Page</a>) : null


        return (
            <li key={creature.id} className="collection-item avatar hoverable">
                <img src={img} alt={`The ${creature.name}`} className="circle" />
                <span className="title">{creature.name}</span>
                <p> {creature.type} <br />
                    {infoLink}
                </p>
                <div className="secondary-content row">
                    <button className="waves-effect waves-light btn col s6" data-target={index} onClick={updateCreature}>
                        <i className="material-icons">edit</i>
                    </button>
                    <button className="waves-effect waves-light btn col s6" data-target={index} onClick={deleteCreature}>
                        <i className="material-icons">delete</i>
                    </button>
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
