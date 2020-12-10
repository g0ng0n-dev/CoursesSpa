import React from 'react';
import CourseForm from "./Header";
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Header from "./Header";

// NOte how this shalllow render you seach for the react component tag
it("contains 3 navLinks via shalllow", () => {
    const numLinks = shallow(<Header />).find("NavLink").length;
    expect(numLinks).toEqual(3);
})

// Note how with mount you search for the final rendered HTML since it generates th efinal DOM.
// we Also need to pull in React Router's memoryRouter for testing since the Header expects to have React Router's prop passed in
it("contains 3 anchors via mount", () => {
    const numAnchors = mount(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    ).find("a").length;

    expect(numAnchors).toEqual(3);
})