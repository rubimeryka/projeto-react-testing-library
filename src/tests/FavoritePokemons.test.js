import { React } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente FavoritePokemons', () => {
  it('Testa se a mensagem aparece na tela caso não haja pokémon favorito', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);

    const noFavoriteText = screen.getByText(/no favorite pokemon found/i);

    expect(history.location.pathname).toBe('/favorites');
    expect(noFavoriteText).toBeInTheDocument();
  });
  it('Testa se são exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const favoriteCheckbox = screen.getByRole('checkbox',
      { name: 'Pokémon favoritado?' });
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked();

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);

    expect(history.location.pathname).toBe('/favorites');
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
