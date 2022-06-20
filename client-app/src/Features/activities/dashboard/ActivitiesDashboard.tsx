import React from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { Activity } from "../../../App/Models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
interface Probs {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelselectActivity: () => void;
    editMode: boolean
    openForm: (id: string) => void;
    closeForm: () => void;
    CreateOrEditActivity: (activity: Activity)=>void;
    DeleteActivity:(id: string) => void;
    submitting: boolean


}
export default function ActivityDashboard({ activities, selectedActivity,
    selectActivity, cancelselectActivity,
    editMode, openForm, closeForm ,CreateOrEditActivity,DeleteActivity, submitting}: Probs) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <List>
                    <ActivityList
                        activities={activities}
                        selectActivity={selectActivity}
                        DeleteActivity={DeleteActivity}
                        submitting={submitting}
                    />
                </List>

            </Grid.Column>
            <GridColumn width='6'>
                {selectedActivity && !editMode &&

                    <ActivityDetails
                        activity={selectedActivity}
                        cancelselectActivity={cancelselectActivity}
                        openForm={openForm}
                    />

                }
                {editMode &&
                    <ActivityForm
                        selectedActivity={selectedActivity}
                        closeForm={closeForm}
                        CreateOrEditActivity={CreateOrEditActivity}
                        submitting={submitting}
                    />
                }

            </GridColumn>
        </Grid>
    )
}