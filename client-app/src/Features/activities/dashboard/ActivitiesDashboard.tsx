import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { LoadingComponents } from "../../../App/Layout/LoadingComponents";
import { useStore } from "../../../App/stores/store";
import ActivityFilters from "./ActivityFilter";
import ActivityList from "./ActivityList";

export default observer ( function ActivityDashboard() {

    const { activityStore } = useStore();
    const {loadActivities, activityRegistry} = activityStore;
   

    useEffect(()=>{
     if(activityRegistry.size <= 1 ) loadActivities();
    },[activityRegistry.size,loadActivities]);
  
  
    if(activityStore.loadingInitial) return <LoadingComponents content='Fetching Activities...'/>

    return (
        <Grid>
            <Grid.Column width='10'>
                <List>
                    <ActivityList/>
                </List>
            </Grid.Column>
            <GridColumn width='6'>
               <ActivityFilters />

            </GridColumn>
        </Grid>
    )
})