import { React } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o component Pokemon', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const image = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(pokemonName).toHaveTextContent(/Pikachu/i);
    expect(pokemonType).toHaveTextContent(/Electric/i);
    expect(pokemonWeight).toHaveTextContent(/average weight: 6.0 kg/i);
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const favoriteCheckbox = screen.getByRole('checkbox',
      { name: 'Pokémon favoritado?' });
    userEvent.click(favoriteCheckbox);

    expect(screen.getByAltText('Pikachu is marked as favorite'))
      .toHaveAttribute('src', '/star-icon.svg');
  });
});
