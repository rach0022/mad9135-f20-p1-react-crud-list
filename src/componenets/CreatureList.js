import React from 'react'

// Creature list will contain a materilize-css collection that will
// hold a list of creatures generated from its props {catalog} which is a
// collection of creatures following a specific json standard
function CreatureList({ catalog, setter }) {

    // function to update an element in the catalog and set it to the catalog
    function updateCreature(event) {
        event.preventDefault()

        // will eventually get this info from a form, for testing lets start with a static object
        const newCreature = {
            name: "Spotter",
            type: "Mammal",
            imageURL: "https://placedog.net/500",
            infoURL: "https://en.wikipedia.org/wiki/Dog"
        }

        // get a reference to the array postion of the item in catalog from the attribute
        // data-target and then set the new item at the position using the spread operator
        // we will combine the old object with the new object and update any properties
        // in the new object
        const target = event.currentTarget.getAttribute('data-target')
        catalog[target] = {
            ...catalog[target],
            ...newCreature
        }
        setter([...catalog])
    }
    // callback function to delete an item in the catalog when teh user clicks a button
    function deleteCreature(event) {
        event.preventDefault()

        // get a reference to the index position of the catalog item from the button data-target attribute
        // and then splice the array once at its index location and set that as the new catalog
        const target = event.currentTarget.getAttribute('data-target')
        catalog.splice(target, 1)
        setter([...catalog])
    }

    // if we dont have the catalog return an empty collection
    if (!catalog || catalog.length === 0) return (
        <div className="CreatureList">
            <ul className="collection with-header">
                <li className="collection-header"><h4>Empty</h4></li>
            </ul>
        </div>
    )
    // if (error) return (<div className="error">{error.message}</div>)

    // now that we have the confirmed no errors and we have a catlog lets loop through
    // and map each creature to an CreatureList item
    const creatureElements = catalog.map((creature, index) =>
        <li key={creature.id} className="collection-item avatar hoverable">
            <img src={creature.imageURL} alt={`The ${creature.name}`} className="circle" />
            <span className="title">{creature.name}</span>
            <p> {creature.type} <br />
                <a href={creature.infoURL} target="_blank">Info Page</a>
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

    // now return the full collection with the creatureElements
    return (
        <div className="CreatureList">
            <ul className="collection with-header">
                <li className="collection-header">Creature List</li>
                {creatureElements}
            </ul>
        </div>
    )
}

export default CreatureList
