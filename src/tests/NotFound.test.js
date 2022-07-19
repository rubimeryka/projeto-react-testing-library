import { React } from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa o component NotFound', () => {
  it('Testa se a página contém um heading h2 com o texto "Page requested..."', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });
    expect(notFoundText).toBeInTheDocument();
  });
  it('Testa se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
