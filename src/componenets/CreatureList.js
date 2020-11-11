import React from 'react'

// Creature list will contain a materilize-css collection that will
// hold a list of creatures generated from its props {catalog} which is a
// collection of creatures following a specific json standard
function CreatureList({ catalog, error }) {

    // if we dont have the catalog return an empty collection
    if (!catalog) return (
        <div className="CreatureList">
            <ul className="collection with-header">
                <li className="collection-header"><h4>Empty</h4></li>
            </ul>
        </div>
    )
    // if (error) return (<div className="error">{error.message}</div>)

    // now that we have the confirmed no errors and we have a catlog lets loop through
    // and map each creature to an CreatureList item
    const creatureElements = catalog.map(creature =>
        <li key={creature.id} className="collection-item avatar hoverable">
            <img src={creature.imageURL} alt={`The ${creature.name}`} className="circle" />
            <span className="title">{creature.name}</span>
            <p> {creature.type} <br />
                <a href={creature.infoURL}>Info Page</a>
            </p>
            <div className="secondary-content row">
                <button className="waves-effect waves-light btn col s6" data-target="creature.id"><i className="material-icons">edit</i></button>
                <button className="waves-effect waves-light btn col s6" data-target="creature.id"><i className="material-icons">delete</i></button>
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
