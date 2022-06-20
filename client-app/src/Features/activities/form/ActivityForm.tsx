import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/Models/activity";
interface Probs {
    
    selectedActivity: Activity | undefined;
    closeForm: () => void;
    CreateOrEditActivity: (activity: Activity)=>void;
    submitting: boolean;


}
export default function ActivityForm({selectedActivity,closeForm,CreateOrEditActivity,submitting}: Probs)
{
    const intialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }
    const [activity, setActivity]=useState(intialState);
    function handleSubmit(){
        CreateOrEditActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity,[name]: value})

    }
    return(
        <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
            <Form.TextArea placeholder='Description'value={activity.description} name='description' onChange={handleInputChange} />
            <Form.Input placeholder='Catagory' value={activity.category} name='category' onChange={handleInputChange}/>
            <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
            <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
            <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
            <Button loading={submitting} floated='right' possitive type ='submit' content='submit' color='green'/>
            <Button onClick={closeForm} floated='right'  type ='button' content='cancel'/>
 
        </Form>
        </Segment>
    )
}