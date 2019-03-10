# U+_ Test Application
[DEMO](https://uplus-test.herokuapp.com)

## Contents
- [Development](#development)
- [CI/CD](#cicd)

## Development
### Install Dependencies
```
npm i
```
P.S Use NPM instead of yarn. Heroku supports only one lock file, which is not package-lock from NPM. Thank you for understanding.

### CORS
If you encounter a problem with CORS, you have several options to deal with it:
- Use Safari where it can be disabled (Developer - Disable Cross-Origin Restrictions)
- Open Chrome via Terminal for OSX. [More info and about Win](https://stackoverflow.com/a/42024918)
```
open -a Google\ Chrome --args --disable-web-security --user-data-dir
```

### Commands
- Run dev server `npm start`
- Run Unit tests `npm t`
- Run e2e tests in browser `npm run cypress`
- Run e2e in console `npm run e2e`

### File Structure
- cypress - Files for Testing with [Cypress.io](https://www.cypress.io)
- .circleci - Setting for Circle CI
- src - Source code of the App
  - components
    - common - Reusable Components
    - routes - Components for Router
    - ... - specific gourped components
  - ducks - Action Creators / Reducers and so on. Following [Redux Ducks](https://github.com/erikras/ducks-modular-redux)
  - redux - Setting Redux store
  - services - Services like API connection and helpers functions
  - App.js - Root Component
  - config.js - Setting for App
  - db.js - Dump of Data Base for testing
  - history.js - Setting Browser History for Router
  - index.js - Entry point
  - setupTests.js - Setting for [Jest](https://jestjs.io/)
  - style-theme.js - Global Theme for [Styled Components](https://www.styled-components.com/)

## CICD

Master branch is connected to the [PROD env](https://uplus-test.herokuapp.com) via Heroku. Circle CI is set for pull requests, which checks unit and e2e tests.
