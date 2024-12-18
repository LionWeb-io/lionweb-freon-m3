# Freon implementation of LionWeb M3

This repository contains a Freon web editor for the M3 (meta-meta) language of the [LionWeb specification](http://lionweb.io/specification/).

Version 0.6.0 is aligned with version 2023.1 of the LionWeb specification.

This project contains the LionWeb M3 language as an M2 language.
The editor stores the language as JSON files in `modelstore`
in the LionWeb serialization format.
These files can be used by other LionWeb tools.

## Getting started

In the following the root of the project will be indicated with '~'.

*   Clone or copy branch `0.7.0-beta2`.
    
*   Next, install all necessary packages by running:
    ```bash
    npm install
    ```

*   Run the generator and see the generated files appearing in the folder where you
    decided to store the generated code:

```bash
    npm run generate
```

*   Start the server (note that anything that is saved in the editor will be stored in `~/modelstore`):
    ```bash
    npm run server
    ```
	
* Open another terminal, and start the generated editor from it:
     ```bash
     npm run prepare-app
     npm run dev
     ```

The last command opens your preferred browser (or you need to click on the URL) with the generated editor for the LionWeb M3 language
on [localhost:5000](http://localhost:5000/).

*   Try out the editor

If you are having trouble using the editor, have a look at the key-bindings under the *Help* menu.

Styling is done though a collection of css files in `style/`.
If you change any files here, run `npm run prepare-app` to update the running app with the new style.
