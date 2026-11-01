import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Videos from './Videos';

vi.mock('redux/api', () => ({
  useFetchMovieVideosByIdQuery: () => ({
    data: {
      results: [
        { key: 'trailer-id' },
        { key: 'second-trailer' },
        { key: 'third-trailer' },
      ],
    },
    isLoading: false,
  }),
}));
vi.mock('react-player', () => ({
  default: ({ src, playing, onPlay, onPause }) => (
    <video
      aria-label="Trailer"
      src={src}
      data-playing={playing ?? false}
      onPlay={onPlay}
      onPause={onPause}
    />
  ),
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
    expect(screen.getAllByLabelText('Trailer')[0]).toHaveAttribute(
      'src',
      'https://www.youtube.com/watch?v=trailer-id'
    );
  });

  it('keeps only the most recently started trailer playing', () => {
    render(
      <MemoryRouter initialEntries={['/movies/42/videos']}>
        <Routes>
          <Route path="/movies/:movieId/videos" element={<Videos />} />
        </Routes>
      </MemoryRouter>
    );
    const [first, second, third] = screen.getAllByLabelText('Trailer');

    for (const player of [first, second, third]) {
      expect(player).toHaveAttribute('data-playing', 'false');
    }

    fireEvent.play(first);
    expect(first).toHaveAttribute('data-playing', 'true');

    fireEvent.play(second);
    expect(first).toHaveAttribute('data-playing', 'false');
    expect(second).toHaveAttribute('data-playing', 'true');
    expect(third).toHaveAttribute('data-playing', 'false');

    // The previous player's delayed pause must not stop the new one.
    fireEvent.pause(first);
    expect(second).toHaveAttribute('data-playing', 'true');

    fireEvent.pause(second);
    expect(second).toHaveAttribute('data-playing', 'false');

    fireEvent.play(first);
    expect(first).toHaveAttribute('data-playing', 'true');
    expect(second).toHaveAttribute('data-playing', 'false');
  });
});
