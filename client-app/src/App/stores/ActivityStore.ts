import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../Models/activity"

export default class ActivityStore {
    activityRegistry= new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }
    get ActivitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b)=>
         a.date!.getTime()-b.date!.getTime());
    }

    get groupedActivities(){
        return Object.entries(
            this.ActivitiesByDate.reduce((activites,activity)=>{
                //const data = activity.date?.toISOString().split('T')[0];
                const date = format(activity.date!,'dd MMM yyyy');

                activites[date]=activites[date] ? [...activites[date],activity] : [activity];
                return activites;

        },{} as {[key: string]:Activity[]})
        )
    }
    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();

            activities.forEach(activity => {
                this.setActivity(activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if(activity){
            this.selectedActivity = activity;
            return activity;
        }else {
            this.setLoadingInitial(true);
            try{
            activity = await agent.Activities.details(id);
        
            runInAction(()=>{
                activity!.date = new Date(activity!.date!);
                this.selectedActivity = activity;
              
            })
            this.setActivity(activity);
            this.setLoadingInitial(false);
            return activity;

            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private getActivity =(id: string) =>{
        return this.activityRegistry.get(id)
    }
    private setActivity = (activity : Activity)=> {
      
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity)
        
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false
            })
        } catch (error) { 
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
         }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false
            })
        } catch (error) { 
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
         }
    }
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id)
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false
            })
        } catch (error) { 
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
         }

    }
}