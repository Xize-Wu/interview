import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText,  getByPlaceholderText, getAllByTestId, getByAltText,queryByText } from "@testing-library/react";
import Axios from "axios";
import Application from "components/Application";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});


it('shows the save error when failing to save an appointment', async () => {
  Axios.put.mockRejectedValueOnce(new Error('Error'));

  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, 'Archie Cohen'));
  
  const appointments = getAllByTestId(container, 'appointment');
  const appointment = appointments[0];
  
  fireEvent.click(getByAltText(appointment, 'Add'));
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: 'Lydia Miller-Jones' },
  });
  
  fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
  fireEvent.click(getByText(appointment, 'Save'));

  await waitForElement(() => getByText(appointment, 'Error'));
  
  expect(getByText(appointment, 'Could not save appointment.')).toBeInTheDocument();
});

it('shows the delete error when failing to delete an existing appointment', async () => {
  Axios.delete.mockRejectedValueOnce(new Error('error'));

  const { container } = render(<Application />);
  
  await waitForElement(() => getByText(container, 'Archie Cohen'));
  
  const appointment = getAllByTestId(container, 'appointment').find(
    (appointment) => queryByText(appointment, 'Archie Cohen')
  );
  
  fireEvent.click(getByAltText(appointment, 'Delete'));
  fireEvent.click(getByText(appointment, 'Confirm'));

  await waitForElement(() => getByText(appointment, 'Error'));
  
  expect(getByText(appointment, 'Could not delete appointment.')).toBeInTheDocument();
});
