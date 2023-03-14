import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import DefaultProvider from '../context/DefaultProvider';

describe('All tests from DoneRecipes', () => {
  it('', async () => {
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/done-recipes'] });

    await wait(2000);

    expect(screen.getByRole('heading', {
      name: /done recipes/i,
    })).toBeInTheDocument();
  }, 30000);

  it('Testa todos os botões presentes na página', async () => {
    // document.execCommand = jest.fn();
    renderWithRouter(<DefaultProvider><App /></DefaultProvider>, { initialEntries: ['/meals'] });

    await wait(4000);
    userEvent.click(screen.getByText(/big mac/i));
    await wait(4000);

    userEvent.click(screen.getByTestId('start-recipe-btn'));

    await wait(2000);

    for (let i = 0; i < 14; i += 1) {
      userEvent.click(screen.getByTestId(`${i}-ingredient-step`));
    }
    userEvent.click(screen.getByTestId('finish-recipe-btn'));

    await wait(4000);

    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    // userEvent.click(screen.getByTestId('0-horizontal-share-btn'));

    userEvent.click(screen.getByRole('button', {
      name: /all/i,
    }));

    userEvent.click(screen.getByRole('button', {
      name: /meals/i,
    }));

    userEvent.click(screen.getByRole('button', {
      name: /drinks/i,
    }));
  }, 30000);
});
