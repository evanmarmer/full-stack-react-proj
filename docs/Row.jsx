import { useState } from 'react'
import axios from 'axios'

export default function Row(props){
    
    let [isEditing, setIsEditing] = useState(false)
    const [currentValue, setCurrentValue] = useState(props.harvested)
    let [newData, setNewData] = useState({
        Species: props.species,
        harvested: props.harvested,
    })

    function handleEditClick(){
        setIsEditing(!isEditing)
    }

    function onChangeHandler(event) {
        setCurrentValue(event.target.value)
        setNewData({...props.newData, harvested:event.target.value})
    }

    function onSaveClick(){
        axios.put(`/edit-species/${currentValue}/${props.species}`)
        .then((response) => {
            props.setSpeciesData(response.data)
            console.log(response.data)
            setIsEditing(false)
        })
    }

    async function handleDeleteClick() {
        let response = await axios.delete(`/species/${props.species}`)
        props.setSpeciesData(response.data)
    }
    
    return (
        <>
            { isEditing 
                ? <tr>
                    <td>
                        <button onClick={onSaveClick}>Save</button>
                        
                    </td>
                    <td>
                        {props.species}
                    </td>
                    <td>
                        count 
                        <input type='number' value={currentValue} onChange={onChangeHandler}/>
                    </td>
                </tr>
                :<tr>
                    <td>
                        <button onClick={handleDeleteClick}>Delete</button>
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
