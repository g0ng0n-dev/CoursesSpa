import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import {newCourse} from '../../../tools/mockData';
import Spinner from "../common/Spinner";
import { toast } from 'react-toastify';

function ManageCoursePage({
                              courses,
                              authors,
                              history,
                              ...props
                          }) {
    const [course, setCourse] = useState({...props.course});
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (courses.length === 0) {
            courseActions.loadCourses().catch(error => {
                alert("Loading courses failed " + error);
            })
        } else {
            setCourse({...props.course })
        }
        if (authors.length === 0) {
            authorActions.loadAuthors().catch(error => {
                alert("Loading Authors failed " + error);
            })
        }
    }, [props.course]);

    function handleChange(event) {
        const {name, value} = event.target;
        setSaving(true)
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === 'authorId' ? parseInt(value, 10) : value
        }))
    }

    function formIsValid(){
        const { title, authorId, category } = course ;
        const error = {};

        if (!title) errors.title = "Title is required.";
        if (!authorId) errors.author = "Autor is required";
        if (!category) errors.category = "Category is Required";

        setErrors(errors);
        // Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        courseActions.saveCourse(course).then(() => {
            toast.success("Course saved.");
            history.push("/courses");
        }).catch(error => {
            setSaving(false);
            setErrors({ onSave: error.message})
        })
    }

    return (
        authors.length === 0 || courses.length === 0 ? (<Spinner />) :
        <CourseForm
            course={course}
            onChange={handleChange}
            onSave={handleSave}
            errors={errors}
            authors={authors}
            saving={saving}
        />
    );
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired
};

export function getCourseBySlug(courses, slug){
    return courses.find(course => course.slug === slug )|| null;
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course = slug && state.course.length > 0
        ? getCourseBySlug(state.courses, slug)
        : newCourse;

    return {
        course: course,
        courses: state.courses,
        authors: state.authors,
    };
}

const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors,
    saveCourse: courseActions.saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);