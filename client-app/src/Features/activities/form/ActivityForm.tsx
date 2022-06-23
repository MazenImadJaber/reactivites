import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { LoadingComponents } from "../../../App/Layout/LoadingComponents";
import { useStore } from "../../../App/stores/store";
import { v4 as uuid } from 'uuid'
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import MyTextInput from "../../../App/common/Form/MyTextInput";
import MyTextArea from "../../../App/common/Form/MyTextArea";
import MySelectInput from "../../../App/common/Form/MySelectInput";
import { categoryOptions } from "../../../App/common/options/categoryOptions";
import MyDateInput from "../../../App/common/Form/MyDateInput";
import { Activity } from "../../../App/Models/activity";



export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loadingInitial, loading, loadActivity } = activityStore;
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: null,
        description: '',
        category: '',
        city: '',
        venue: ''
    });
    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        date: Yup.string().required('Date is required!').nullable(),
        category: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required()
    })
    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!))
        }

    }, [id, loadActivity]);



    function handleFormSubmit(activity: Activity){
     if ( activity.id.length === 0 ){
        let newActivity ={
            ...activity,
            id : uuid()
        };
        createActivity(newActivity).then(()=>{
            history.push(`/activities/${newActivity.id}`)

        })
     }else{
        updateActivity(activity).then(()=>{
            history.push(`/activities/${activity.id}`)

        })
     }
    }

    if (loadingInitial) return <LoadingComponents content="Loading Activity..." />
    return (
        <Segment clearing>
            <Header content='activity deatails' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit , isValid,isSubmitting,dirty}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder="Title"/>
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Catagory' name='category' />
                        <MyDateInput 
                        placeholderText='Date' 
                        name='date' 
                        showTimeSelect
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='location deatails' sub color='teal' />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} floated='right' possitive="true" type='submit' content='submit' color='green' />
                        <Button as={Link} to={'/activities'} floated='right' type='button' content='cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})