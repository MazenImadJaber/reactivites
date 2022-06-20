import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { LoadingComponents } from "../../../App/Layout/LoadingComponents";
import { useStore } from "../../../App/stores/store";


export default function ActivityDetails() {
    const {activityStore} =useStore();
    const {selectedActivity:activity , openForm, cancelSelectedActivity: cancelselectActivity } = activityStore;
    if(!activity) return <LoadingComponents />;
    return (
        <Card fluid>
            <Image src={`/Assets/categoryImages/${activity.category}.jpg`}  />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span >{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={()=>{openForm(activity.id)}} color='blue' content='Edit' />
                    <Button onClick={cancelselectActivity} color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>

    )
}