import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Videos from './Videos';

vi.mock('redux/api', () => ({
  useFetchMovieVideosByIdQuery: () => ({
    data: { results: [{ key: 'trailer-id' }] },
    isLoading: false,
  }),
}));
vi.mock('react-player', () => ({
  default: ({ src }) => <video aria-label="Trailer" src={src} />,
}));

describe('movie trailers', () => {
  it('passes the YouTube source through the ReactPlayer v3 API', () => {
    render(
      <MemoryRouter initialEntries={['/movies/42/videos']}>
        <Routes>
          <Route path="/movies/:movieId/videos" element={<Videos />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Trailer')).toHaveAttribute(
      'src',
      'https://www.youtube.com/watch?v=trailer-id'
    );
  });
});
