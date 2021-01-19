import React from "react";
import BioEditor from "../bioEditor";
import { render, fireEvent, waitForElement, waitFor} from "@testing-library/react";
import axios from "../axios";

//test 1
test("When no bio is passed to it, an 'Add' button is rendered", () => {
    const { container } = render(
        <BioEditor />
    );

    expect(container.querySelector(".highlight")).toBeTruthy();
});

//test 2
test("When a bio is passed to it, an 'Edit' and 'Delete' button is rendered", () => {
    const { container } = render(<BioEditor bio="bio" />);

    expect(container.querySelector(".edit")).toBeTruthy();
    expect(container.querySelector(".delete")).toBeTruthy();
});

//test 3
test("Clicking the 'Edit Bio' button causes a textarea and a 'Save' button to be rendered.", () => {
    const { container } = render(<BioEditor bio="bio" />);

    fireEvent.click(container.querySelector(".edit"));

    expect(container.querySelector("textarea")).toBeTruthy();
    expect(container.querySelector("button").innerHTML).toBe("Save");
});

//test 4
jest.mock("./axios");

test("Clicking the 'Save' button causes an ajax request.", async () => {
    const mockSubmitBio = axios.post.mockResolvedValue({});
    const { container } = render(
        <BioEditor bio="bio" />
    );
    fireEvent.click(container.querySelector(".edit"));
    fireEvent.click(container.querySelector("button"));
    await waitFor(() => {
        expect(mockSubmitBio.mock.calls.length).toBe(1);
    });
});

//test 5
test("When the mock request is successful, the function that was passed as a prop to the component gets called", async () => {
    const mockSetBio = jest.fn();
    axios.post.mockResolvedValue({
        data: {
            bio: 'new bio',
        },
    });

    const { container } = render(<BioEditor bio="bio" setBio={mockSetBio} />);

    fireEvent.click(container.querySelector(".edit"));
    fireEvent.click(container.querySelector("button"));
    await waitFor(() => {
        expect(mockSetBio.mock.calls.length).toBe(1);
    });
});