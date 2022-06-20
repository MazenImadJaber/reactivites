import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { useStore } from "../../../App/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

export default observer ( function ActivityDashboard() {

    const { activityStore } = useStore();
    const {selectedActivity , editMode} = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <List>
                    <ActivityList/>
                </List>
            </Grid.Column>
            <GridColumn width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails/>
                }
                {editMode &&
                    <ActivityForm />
                }

            </GridColumn>
        </Grid>
    )
})