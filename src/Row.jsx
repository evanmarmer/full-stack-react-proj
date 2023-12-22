import { useState } from 'react'

export default function Row(props){
    
    let [isEditing, setIsEditing] = useState(false)
    // let [newData, setNewData] = useState({
    //     Species: props.species,
    //     Harvest: props.harvest,
    // })

    function handleEditClick(){
        setIsEditing(!isEditing)
    }

    return (
        <>
            { isEditing 
                ? <tr>
                    <td>
                        'blah'
                    </td>
                </tr>
                :<tr>
                    <td>
                        <button>Delete</button>
                    </td>
                    <td>
                        <button onClick={handleEditClick}>Edit</button>
                    </td>
                    <td>{props.species}</td>
                    <td>Count {props.harvested}</td>
                </tr>
             }  
        </>
    )
}
