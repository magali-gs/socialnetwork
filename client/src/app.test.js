import React from "react";
import App from "./app";
import { render, waitForElement } from "@testing-library/react";
import axios from "./axios";

//this creates my fake axios 
jest.mock('./axios');

//this creates a fake response from axios
//mockResolvedValue comes from jest
axios.get.mockResolvedValue({
    data: {
        id: 1,
        first: 'Magali',
        last: 'Silva',
        url: 'www.google.com'
    }
});

test('App eventually renders the div', async () => {
    const { container } = render(<App />);

    console.log('container.innerHTML', container.innerHTML);
    
    //tell test to sit and wait for the div to appear in DOM
    await waitForElement(() => {
        container.querySelector("div");
    });

    console.log("container.innerHTML", container.innerHTML);

    expect(container.querySelector('div').children.length).toBe(1);
});