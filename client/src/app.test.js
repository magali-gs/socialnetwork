import React from "react";
import App from "./app";
import { render, waitForElement } from "@testing-library/react";
import axios from "./axios";

//this creates my fake axios 
jest.mock("./axios");

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

test("app eventually renders the div", async () => {
    const { container } = render(<App />);

    // tell test to sit and wait for div to appear in DOM
    await waitForElement(() => container.querySelector("div"));

    console.log("container.innerHTML 2: ", container.innerHTML);

    // check that something has been rendered in DOM
    // here I'm checking for the children of div
    // but there are a million different ways to do this check :)
    expect(container.querySelector("div").children.length).toBe(2);
});