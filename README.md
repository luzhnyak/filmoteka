# Filmoteka

Welcome to Movie catalog! This is a sample project showcasing a Movie catalog application.

## Live Demo

Check out the live demo:
[Filmoteka](https://luzhnyak.github.io/filmoteka/)

## Technologies Used

`JavaScript` `React` `Axios` `HTML/CSS`
`React router dom`

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   `git clone https://github.com/luzhnyak/filmoteka.git`

2. Navigate to the project directory:

   `cd filmoteka`

3. Install dependencies:

   Use Node.js 24 (see `.nvmrc`), then run `npm ci`.

   Copy `.env.example` to `.env` and fill in your TMDB and Firebase settings.
   Existing `REACT_APP_*` names are supported by Vite and GitHub Actions.
   These values are included in the browser bundle; use client configuration
   values, not server credentials.

4. Start the development server:

   `npm run start`

5. Open http://localhost:5173/filmoteka/ to view the application.

The app uses React 19, Redux Toolkit 2, React Router 7 and Vite.
Run `npm test` for regression tests, `npm run lint:js` for lint checks,
and `npm run build` for the production bundle. `npm run preview` serves
the production build locally. ESLint 10 checks JavaScript, JSX and React hooks.

Firebase currently pins an older gRPC dependency. The scoped override in
`package.json` uses the patched gRPC 1.14 release. The production dependency
audit is clean; the full audit still reports a moderate minimatch advisory
in ESLint's development dependencies. Remove the override when Firebase
ships a patched dependency range.

## Deployment

The project is deployed using GitHub Pages. The deployment process involves
building the React application and configuring GitHub Pages to serve the built
assets from the gh-pages branch.

To deploy the application to GitHub Pages:

1. Make sure you have set up your GitHub repository with the correct settings
   for GitHub Pages deployment.

2. Run the following command to build the application:

   `npm run build`

3. Once the build process is complete, commit and push the changes to your
   GitHub repository.

4. The workflow runs on pushes to `main`, checks the app and deploys `build/`
   to `gh-pages`. Configure GitHub Pages to serve that branch and provide the
   `REACT_APP_*` repository secrets listed in `.env.example`. The application
   will be accessible at `https://<username>.github.io/filmoteka/`.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for
improvements, please open an issue or submit a pull request.
