import { React } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const url = '/pokemons/25';

describe('Testa o componente PokemonDetails', () => {
  it('Testa se as informações detalhadas do pokémon selecionado são mostradas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const pokemonDetails = screen.getByRole('heading', { name: /Pikachu Details/i });
    const summary = screen.getByRole('heading', { name: /summary/i }, { level: 2 });
    const moreDetails = screen.queryByText(/more details/);
    const paragraph = screen.getByText(/This intelligent Pokémon roasts hard berries/i);

    expect(pokemonDetails).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(moreDetails).toBeNull();
    expect(paragraph).toBeInTheDocument();
  });
  it('Testa se existe uma seção com mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const mapsTitle = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i }, { level: 2 });
    const pikachuLocation = screen.getAllByRole('img', { name: /pikachu location/i });
    const location1 = screen.getByText('Kanto Viridian Forest');
    const location2 = screen.getByText('Kanto Power Plant');

    expect(mapsTitle).toBeInTheDocument();
    expect(pikachuLocation).toHaveLength(2);
    expect(pikachuLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachuLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(pikachuLocation[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(location1 && location2).toBeInTheDocument();
  });
  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    const checkboxLabel = screen.getByText(/pokémon favoritado\?/i);

    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked();
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).not.toBeChecked();
    expect(checkboxLabel).toBeInTheDocument();
  });
});
