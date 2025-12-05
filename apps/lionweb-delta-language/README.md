# Freon Create Template

An empty template for a project using <a href="https://www.freon4dsl.dev">Freon</a>.
This template is used by `create-freon`.

To create a Freon project based on this template use

```bash
npm create freon --latest
```

The template project provides a shell for the generated editor that enables the user to work with multiple models and model units.

For an explanation of the content of the project see
<a href="https://www.freon4dsl.dev/Documentation/Overview/Getting_Started#project-structure-4" target="_blank">
Project Structure</a>.

## Getting started

In the following the root of the project will be indicated with '~'.

### Install all necessary packages
```bash
npm install
```
  The `npm create freon` command already performs this action, so you only need to do this again when you change the dependencies in the `package.json`. file.

### Run Freon Generator
Run the generator and see the generated files appearing in the folder where you
decided to store the generated code:

```bash
    npm run generate
```
The `npm create freon` command already performs this action, so you only need to do this again when you change anything in the `defs` folder.

### Start the server
Open a second terminal and start the server: 
```bash
npm run server
```
Note that anything that is saved in the editor will be stored in `~/modelstore`

### Start the Web Editor
Open another (bash) terminal, and start the generated editor from it:
```bash
npm run styles
npm run dev
```
The first (styles) command only needs to be done once, and only
needs to be run again if you change the stylingß.

The last command opens your preferred browser with the generated editor for the language
on typically  http://localhost:5174 (http://localhost:5174).

### Try out the editor

If you are having trouble using the editor, have a look at the key-bindings under the *Help* menu.

If you change the theme, run `npm run styles` to update the running app with the new style.
