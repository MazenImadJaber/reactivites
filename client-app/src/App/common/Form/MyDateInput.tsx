import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";
import DatePicker,{ReactDatePickerProps} from 'react-datepicker'

export default function MyDataInput(props: Partial<ReactDatePickerProps>)
{
    const [feild,meta,helpers] =useField(props.name!)

    return(
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker 
            {...feild}
            {...props}
            selected={(feild.value && new Date(feild.value)) || null}
            onChange={value => helpers.setValue(value)}

            />
            {meta.touched && meta.error ?(
                <Label basic color='red'> {meta.error}</Label>
            ):null }
        </Form.Field>
    )
}