import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o component Pokedex', () => {
  it('Testa se a página contém o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const encounteredPokémons = screen.getByRole('heading',
      { name: 'Encountered pokémons' });
    expect(encounteredPokémons).toBeInTheDocument();
  });
  it('Testa se é exibido o próximo pokémon quando o botão "Próximo..." é clicado', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button',
      { name: 'Próximo pokémon' });
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);

    const pokemon = screen.getAllByTestId('pokemon-name');

    expect(pokemon !== 'Pikachu').toBeTruthy();
    expect(pokemon.length).toBe(1);
  });
  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const sete = 7;
    const buttons = screen.getAllByTestId('pokemon-type-button');

    expect(buttons.length).toBe(sete);
    expect(screen.getByRole('button',
      { name: 'All' })).toBeInTheDocument();

    expect(screen.getAllByRole('button',
      { name: 'Electric' })).toHaveLength(1);
    expect(screen.getAllByRole('button',
      { name: 'Fire' })).toHaveLength(1);
    expect(screen.getAllByRole('button',
      { name: 'Bug' })).toHaveLength(1);
    expect(screen.getAllByRole('button',
      { name: 'Poison' })).toHaveLength(1);
    expect(screen.getAllByRole('button',
      { name: 'Psychic' })).toHaveLength(1);
    expect(screen.getAllByRole('button',
      { name: 'Normal' })).toHaveLength(1);
    expect(screen.getAllByRole('button',
      { name: 'Dragon' })).toHaveLength(1);
  });
  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button',
      { name: 'Próximo pokémon' });

    userEvent.click(screen.getByRole('button',
      { name: /all/i }));
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(nextPokemon);
    });
  });
});
