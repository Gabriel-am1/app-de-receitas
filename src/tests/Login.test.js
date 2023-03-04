import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import DefaultProvider from '../context/DefaultProvider';

describe('testing the login screen', () => {
  it('tests whether there is e-mail text on the screen', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>);

    expect(screen.getByText(/email:/i)).toBeInTheDocument();
  });
  it('tests whether there is senha text on the screen', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>);

    expect(screen.getByText(/senha:/i)).toBeInTheDocument();
  });
  it('tests if it has an input field for email', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>);

    expect(screen.getByRole('textbox', { name: /email:/i })).toBeInTheDocument();
  });
  it('tests if it has an input field for password', () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>);

    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });
  it('tests if the button is disabled, and if it is enabled when the fields are filled in correctly', () => {
    const { history } = renderWithRouter(<DefaultProvider><App /></DefaultProvider>);
    const mailOfTest = 'testonildo@tester.com';
    const passOfTest = 'strongP@ssword';
    expect(screen.getByRole('button', { name: /enter/i })).toBeDisabled();

    userEvent.type(screen.getByRole('textbox', { name: /email:/i }), mailOfTest);
    userEvent.type(screen.getByTestId('password-input'), passOfTest);
    expect(screen.getByRole('button', { name: /enter/i })).toBeEnabled();

    userEvent.click(screen.getByRole('button', { name: /enter/i }));
    expect(history.location.pathname).toBe('/meals');
  });
});
