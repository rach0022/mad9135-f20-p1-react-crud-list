import React from 'react'
import CreatureListItem from './CreatureListItem.js'

// Creature list will contain a materilize-css collection that will
// hold a list of creatures generated from its props {data} which is a
// collection of creatures following a specific json standard
function CreatureList({ data, setter }) {

    // if we dont have the data return an empty collection
    if (!data || data.length === 0) return (
        <div className="CreatureList">
            <ul className="collection with-header">
                <li className="collection-header"><h4>Empty</h4></li>
            </ul>
        </div>
    )

    // now return the full collection with the creatureElements
    return (
        <div className="CreatureList">
            <ul className="collection with-header">
                <li className="collection-header">Creature List</li>
                <CreatureListItem data={data} setter={setter} />
            </ul>
        </div>
    )
}

export default CreatureList
