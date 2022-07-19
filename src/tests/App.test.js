import { React } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente App.', () => {
  it('Testa os links do topo da aplicação', () => {
    renderWithRouter(<App />);

    const homeText = screen.getByText('Home');
    const aboutText = screen.getByText('About');
    const favoriteText = screen.getByText('Favorite Pokémons');
    expect(homeText).toBeInTheDocument();
    expect(aboutText).toBeInTheDocument();
    expect(favoriteText).toBeInTheDocument();
  });

  it('Testa se o link "Home" redireciona para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByText('Home');
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se o link "About" redireciona para a página "About"', () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByText('About');
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa se o link "Favorite Pokémons" redireciona para Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const favorites = screen.getByText('Favorite Pokémons');
    userEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se uma URL desconhecida redireciona para Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/página-inexistente');

    const notFound = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });
    expect(notFound).toBeInTheDocument();
  });
});
