# Components

The components are organized using Atomic Design. Each component is classified as either an `atom`, `molecule`, `organism`, or `page`. I skipped the `template` part of the pattern, as I felt going straight to `page` worked fine for this project.

The definitions below might not be exactly how they are universally defined, as they are closer to my take on things after doing some research. I try to stick to these as best I can, but some components are kind of fuzzy for one reason or another.

## Table of contents

-   [Atoms](#Atoms)
-   [Molecules](#Molecules)
-   [Organisms](#Organisms)
-   [Pages](#Pages)
-   [Logic](#Logic)

### Atoms

An Atom is the smallest possible component that cannot be broken down any smaller than its current state. It is not very useful on its own, and it is typically used within Molecules or Organisms to gain use.

### Molecules

A Molecule is a more complex component than an Atom, and it is made up of other Atoms and maybe _maybe_ other Molecules. On its own, it is more useful than an Atom, but it still may look as though it belongs to something bigger, rather than being a standalone component.

### Organisms

An Organism is a combination of Organisms, Molecules, and Atoms, making components that can stand on their own. These are fairly complex and look like a very distinct part of the interface, such as a full Navbar.

### Pages

A Page is what the user sees on the frontend. It is the combination of components and logic that makes each page in the application work. The complexity varies, because some pages are very basic, even more basic than an Organism. Instead of thinking of complexity to define a Page, think about whether the end user will navigate to a route displaying it.

### Logic

Atoms and Molecules should not have any business logic, outside of exceptional circumstances where it doesn't make sense to take it out. I think an example is the `Logout` component, which contains logout logic.

Organisms might have logic, but in general, the Page, which is essentially the highest order component, should contain the logic needed for submitting forms, fetching data, etc.
