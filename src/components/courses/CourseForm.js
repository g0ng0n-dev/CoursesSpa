import React from 'react';
import PropTypes from 'prop-types';
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const CourseForm = ({
    course,
    authors,
    onSave,
    onChange,
    saving=false,
    errors={}
}) => {
    return (
        <form onSubmit={onSave}>
            <h2>{course.id ? "Edit" : "Add"} Course</h2>
            {errors.onSave & (
                <div className="alert alert-danger" role="aler">
                    {errors.onSave}
                </div>
            )}
            <TextInput
                label="Title"
                onChange={onChange}
                name="title"
                value={course.title}
                error={errors.title}
            />

            <SelectInput
                label="Author"
                name="authorId"
                value={course.authorId || ""}
                defaultOption="Select Author"
                options={authors.map(author => ({
                    value: author.id,
                    text: author.name
                }))}
                onChange={onChange}
                errors={errors.author}
            />

            <TextInput
                label="Category"
                onChange={onChange}
                name="category"
                value={course.category}
                error={errors.category}
            />
            <button type="submit" disabled={saving} className="btn btn-primary">
                { saving ? "Saving..." : "Save"}
            </button>
        </form>
    )
}

CourseForm.propTypes = {
    authors: PropTypes.array.isRequired,
    course: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default CourseForm;