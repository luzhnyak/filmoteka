import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { expect, it } from 'vitest';
import { App } from './App';
import { api } from 'redux/api';
import { watchlistReducer } from 'redux/watchlistSlice';

function renderApp(path) {
  const store = configureStore({
    reducer: {
      user: () => ({ id: null, email: null }),
      watchlist: watchlistReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
  });
  render(
    <Provider store={store}>
      <MemoryRouter basename="/filmoteka" initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
}

it('renders movie search when opening its URL directly', async () => {
  renderApp('/filmoteka/movies');
  expect(await screen.findByRole('searchbox')).toBeInTheDocument();
});

it('mounts the app and navigates between login, registration and movie search', async () => {
  const user = userEvent.setup();
  renderApp('/filmoteka/login');
  expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  await user.click(screen.getByRole('link', { name: 'Register' }));
  expect(screen.getByLabelText('Name')).toBeInTheDocument();
  await user.click(screen.getByRole('link', { name: 'Movies' }));
  expect(await screen.findByRole('searchbox')).toBeInTheDocument();
});
