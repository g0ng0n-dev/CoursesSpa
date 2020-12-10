import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";

export function loadAuthorsSuccess(courses){
    return { type: types.LOAD_COURSES_SUCCESS, courses: courses}
}

export function loadAuthors(){
    return function (dispatch){
        return authorApi.getAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            throw error;
        })
    }
}