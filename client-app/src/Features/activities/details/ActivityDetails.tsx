import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { LoadingComponents } from "../../../App/Layout/LoadingComponents";
import { useStore } from "../../../App/stores/store";


export default observer (function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if(id) {
            loadActivity(id);
        }

    }, [id, loadActivity])

    if (loadingInitial || !activity) return <LoadingComponents />;
    return (
        <Card fluid>
            <Image src={`/Assets/categoryImages/${activity.category}.jpg`} />
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
                    <Button as={Link} to={`/mange/${activity.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to={'/activities'} color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>

    )
})