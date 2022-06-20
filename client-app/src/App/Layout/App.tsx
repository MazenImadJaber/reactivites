import React, {  useEffect } from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivitiesDashboard';
import { LoadingComponents } from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
function App() {
  const {activityStore} =useStore();

  useEffect(()=>{
    activityStore.loadActivities();
  },[activityStore]);


  if(activityStore.loadingInitial) return <LoadingComponents content='Fetching Activities...'/>
  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard  />
      </Container>
    </>
  );
}

export default observer(App);
