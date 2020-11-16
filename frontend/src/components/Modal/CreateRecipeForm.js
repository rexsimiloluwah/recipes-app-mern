import React from 'react';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles


class CreateRecipeForm extends React.Component {

    state = {
        name : null,
        description : null,
        tribe : null,
        tags : null,
        content : null
    }

    onChange = (content) => {
        this.setState({
            content : content
        })
        // console.log('onChange', content)
    }

    
    render() {

        return (
            <Formik
                initialValues={{
                    name : '',
                    description : '',
                    tribe : '',
                    tags : ""
                }}

                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('Recipe Name is required'),
                    description: Yup.string()
                        .max(100, 'Max. length = 100 characters')
                        .required('Recipe description is required'),
                    tribe: Yup.string()
                        .required('Recipe tribe is required'),
                    tags: Yup.string()
                        .required('Tags are required, Seperate with commas.')
                })}
                onSubmit={fields => {
                    
                    fields["content"] = this.state.content
                    // console.log(fields)
                    this.props.onSubmit(fields)
                    
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">Recipe Name :-</label>
                            <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description :-</label>
                            <Field name="description" type="text" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                            <ErrorMessage name="description" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tribe">Tribe/ Nationality of Food :-</label>
                            <Field name="tribe" type="text" className={'form-control' + (errors.tribe && touched.tribe ? ' is-invalid' : '')} />
                            <ErrorMessage name="tribe" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tags">Recipe Tags :-</label>
                            <Field name="tags" type="text" className={'form-control' + (errors.tags && touched.tags ? ' is-invalid' : '')} />
                            <ErrorMessage name="tags" component="div" className="invalid-feedback" />
                        </div>
                       
                       <div className = "summernote">
                        <ReactSummernote
                                name = "content"
                                value="Default value"
                                options={{
                                height: 200,
                                dialogsInBody: true,
                                disableResizeEditor : true,
                                toolbar: [
                                    ['style', ['style']],
                                    ['font', ['bold', 'underline', 'clear']],
                                    ['fontname', ['fontname']],
                                    ['para', ['ul', 'ol', 'paragraph']],
                                    ['table', ['table']],
                                    ['insert', ['link', 'picture', 'video']],
                                    ['view', ['fullscreen', 'codeview']]
                                ]
                                }}

                            onChange={this.onChange}
                        />

                       </div>

                    <button type="submit" className="btn btn-success btn-block" >Create Recipe <i className = "bx bx-plus"></i></button>


                    </Form>
                )}
            />
        )
    }
}

export default CreateRecipeForm;