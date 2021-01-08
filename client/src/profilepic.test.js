import React from 'react';
import ProfilePic from "./profilepic";
import { render, fireEvent } from "@testing-library/react";

test('When no url is passed, /default.jpn is used as src', () => {
    //'container' is the same as 'document' from the week 2
    //it is our entry into the DOM
    const { container } = render(<ProfilePic />);

    // console.log(
    //     "container.querySelector('img'): ", 
    //     container.querySelector('img')
    // );

    expect(
        container.querySelector("img").src.endsWith("/default-img.png")
    ).toBe(true);
});

test('When url is passed as a prop, that url is set as the value of the source attribute', () => {
    const { container } = render(
        <ProfilePic image="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png" />
    );

    // console.log(
    //     'container.querySelector("img").src',
    //     container.querySelector("img").src
    // );

    expect(container.querySelector("img").src).toBe(
        "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"
    );
});

test('When first and last props are passed, first and last are signer as the value of alt attribute', () => {
    const { container } = render(<ProfilePic first='Magali' last='Silva'/>);

    // console.log('container.querySelector("alt").alt', container.querySelector("alt").alt);
    expect(container.querySelector("img").alt).toBe("Magali Silva");
    
});

test('onClick prop runs when the img is clicked', () => {
    const mockOnClick = jest.fn();
    const { container } = render(<ProfilePic toggleUploader={mockOnClick} />);
    
    //click on img in our test
    fireEvent.click(container.querySelector('img'));

    //confirm the click handler was triggered just once
    expect(mockOnClick.mock.calls.length).toBe(1);

});