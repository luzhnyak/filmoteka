import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Loader } from './Loader';

it('renders the upgraded spinner with an accessible loading label', () => {
  render(<Loader />);
  expect(screen.getByLabelText('three-dots-loading')).toBeInTheDocument();
});
