import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';

function ManageCoursePage ({
                               courses,
                               authors,
                               ...props
}) {
    const [ course, setCourse ] = useState({...props.course});
    const [ errors, setErrors ] = useState({});

    useEffect( () => {
        if (courses.length === 0){
            courseActions.loadCourses().catch(error => {
                alert("Loading courses failed " + error);
            })
        }
        if (authors.length === 0) {
            authorActions.loadAuthors().catch(error => {
                alert("Loading Authors failed " + error);
            })
        }
    },[]);

   function handleChange(event){
        const { name, value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === 'authorId' ? parseInt(value, 10): value
        }))
    }

    function handleSave(event){
        event.preventDefault();
        courseActions.saveCourse(course);
    }

    return (
            <CourseForm
                course={course}
                onChange={handleChange}
                onSave={handleSave}
                errors={errors}
                authors={authors} />
        );
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired
};

function mapStateToProps(state){
    return {
        course: newCourse,
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