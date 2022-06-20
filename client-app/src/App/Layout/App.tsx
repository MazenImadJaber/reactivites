import React, {  useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../Models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivitiesDashboard';
import {v4 as uuid} from 'uuid'
import agent from '../api/agent';
import { LoadingComponents } from './LoadingComponents';
function App() {

  const [activities , setActivities] = useState<Activity[]>([]);
  const [selectedActivity , setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode , setEditMode] = useState(false);
  const [laoding , setLoading] = useState(true);
  const [submitting , setSubmitting] = useState(false);
  
  


  useEffect(()=>{
   agent.Activities.list()
   .then(res =>{
    let activites: Activity[] =[];
    res.forEach(activity =>{
      activity.date=activity.date.split('T')[0];
      activites.push(activity);
    })
    
      setActivities(activites);
      setLoading(false);
    })
  },[]);

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x=> x.id === id))
  }

  function handleCancelSelectActivity()
  {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id? :string)
  {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClosed()
  {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    setSubmitting(true);
    if(activity.id ){
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(x=>x.id !== activity.id),activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)

      })
    }else{
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities,activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)
      })
    } 

  }

  function handleDeleteActivity(id:string){
    setSubmitting(true)
    agent.Activities.delete(id).then(()=>{
    setActivities([...activities.filter(x=>x.id !== id)])
    setSubmitting(false)
    })
  }
  if(laoding) return <LoadingComponents content='Fetching Activities...'/>
  
  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
        activities ={activities}
        selectedActivity={selectedActivity}
        selectActivity ={handleSelectActivity}
        cancelselectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClosed}
        CreateOrEditActivity={handleCreateOrEditActivity}
        DeleteActivity={handleDeleteActivity}
        submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
