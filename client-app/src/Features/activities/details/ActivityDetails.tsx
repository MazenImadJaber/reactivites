import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../App/Models/activity";

interface Probs {
    activity: Activity;
    cancelselectActivity:() => void;
    openForm: (id: string) => void;
}
export default function ActivityDetails({ activity, cancelselectActivity ,openForm}: Probs) {
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