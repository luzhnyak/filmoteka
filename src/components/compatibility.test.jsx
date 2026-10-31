import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import FormAuth from './FormAuth/FormAuth';
import { Card } from './Card/Card';
import { addMovie, loadMovies, watchlistReducer } from 'redux/watchlistSlice';

function renderRoute(email, element) {
  const store = configureStore({
    reducer: { user: () => ({ email }) },
  });
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={element} />
          <Route path="/login" element={<p>Sign in</p>} />
          <Route path="/" element={<p>Home</p>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe('React, Router and Redux compatibility', () => {
  it('redirects anonymous users to login', async () => {
    renderRoute(null, <PrivateRoute component={<p>Watchlist</p>} />);
    expect(await screen.findByText('Sign in')).toBeInTheDocument();
  });

  it('renders private content for authenticated users', () => {
    renderRoute('viewer@example.com', <PrivateRoute component={<p>Watchlist</p>} />);
    expect(screen.getByText('Watchlist')).toBeInTheDocument();
  });

  it('redirects authenticated users away from restricted pages', async () => {
    renderRoute('viewer@example.com', <RestrictedRoute component={<p>Register</p>} />);
    expect(await screen.findByText('Home')).toBeInTheDocument();
  });

  it('keeps movie links within the GitHub Pages base path', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter basename="/filmoteka" initialEntries={['/filmoteka/']}>
        <Routes>
          <Route path="/" element={<Card movie={{ id: 42, title: 'Example' }} />} />
          <Route path="/movies/:movieId" element={<p>Movie details</p>} />
        </Routes>
      </MemoryRouter>
    );
    const link = screen.getAllByRole('link', { name: 'Example' })[1];
    expect(link).toHaveAttribute('href', '/filmoteka/movies/42');
    await user.click(link);
    expect(screen.getByText('Movie details')).toBeInTheDocument();
  });

  it('submits registration form values', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<FormAuth isRegister title="Register" onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText('Name'), 'Viewer');
    await user.type(screen.getByLabelText('Email address'), 'viewer@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Register' }));
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Viewer', email: 'viewer@example.com', password: 'password123',
    });
  });

  it('loads saved watchlist data and accepts additions with Redux Toolkit 2', () => {
    const store = configureStore({ reducer: watchlistReducer });
    store.dispatch(loadMovies([{ id: 1, title: 'Saved movie' }]));
    store.dispatch(addMovie({ id: 2, title: 'New movie' }));
    expect(store.getState().movies.map(movie => movie.id)).toEqual([1, 2]);
  });
});
