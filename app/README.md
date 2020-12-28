# Exceptional Magic Outliner Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the Typescript template.

## Folder Structure

### `.storybook`

The `.storybook` directory contains the confirguation for Storybook, which is used to test components in isolation.

### `src`

The `src` directory contains all of the actual frontend code.

#### `components`

The `components` directory contains the React components that are rendered on the different pages. It is organized using the Atomic Design pattern. More information on the different components can be found [in the readme](./src/components/README.md).

#### `constants`

The `constants` directory contains constant values that are not intended to change. An example would be the choices a user can make when selecting the type of their Magic System. That array of Strings would be a constant.

#### `graphql`

The `graphql` directory contains GraphQL queries and mutations that are used with the Apollo Client. These queries are used with Apollo's `useQuery` and `useMutation` hooks and their variants.

#### `services`

The `services` directory contains any code that is unrelated to the actual rendering of the component and focuses more on business logic. This includes a lot with authentiation and authorization. More information can be found [here](../README.md#Security).

#### `types`

The `types` directory contains interfaces used throughout the application to type certain things, such as form fields and other objects that come up.

## Tools and Technologies

### Apollo Client

Since the backend is written with a GraphQL API, the frontend uses the Apollo Client to communicate with it and do a lot of the heavy lifting. The `apollo-link-token-referesh` library is used to make refreshing the jwt token a lot easier.

### Formik

For all forms, Formik is used make using forms much easier and easily validate them. It integrates well with Material-UI's `TextField` component, and in this application, it is also used with the rich text editor.

### Jest and react-testing-library

Testing is done using Jest and react-testing-library. More tests need to be added, but some components have at least a start.

### Material-UI

The `Material-UI` library is used throughout the application as the standard for design, and it makes developing a lot easier, having so many useful components out of the box

### Storybook

The `storybook` library is used for building maintainable components more quickly. It is very useful for testing without needing to render the entire project.

### TinyMCE

TinyMCE powers the rich text editor used throughout the application. I tried using DraftJS, but it seemed like using a ready-made component would be the smarter choice, as the quality of the editor wasn't as much of a priority as just having one.
