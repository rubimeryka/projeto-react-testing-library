import { React } from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa o component About', () => {
  it('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    // const linkAbout = screen.getByRole('link', { name: 'About' });
    // expect(linkAbout).toBeInTheDocument();
    // userEvent.click(linkAbout);

    const text1 = (/This application/i);
    const text2 = (/One can filter Pokémons by type/i);
    const textAboutPokedex = screen.getByText(text1 && text2);
    expect(textAboutPokedex).toBeInTheDocument();
  });
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(aboutPokedex).toBeInTheDocument();
  });
  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img', { name: 'Pokédex' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
