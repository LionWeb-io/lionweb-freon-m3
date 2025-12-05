# Freon Implementation of LionWeb M3

This repository contains a Freon web editor for the M3 (meta-meta) language of the [LionWeb specification](http://lionweb.io/specification/).
It has the following functionality:

1. Projectional Web Editor for LionWeb languages.
2. Conversion from LionWeb language to Freon language.
3. Parser for LionWeb language, following the same syntax as used in the (web) editor.
4. Generation of diagrams of the LionWeb language.
5. Extensible commandline utility for parsing and processing the LionWeb language.
6. Store LionWeb language in LionWeb serialization format, useable by any other lionWeb tool.

Version 0.7.2 is aligned with version 2023.1 of the LionWeb specification.

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
    npm run build
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

## Convert LionWeb Language to Freon

After the steps above, first put your Language JSON in a subfolder of `modelstore`, let's call this `MYFOLDER`.
Then do the following
```
node dist/freoncode/commandline/FreonCommandLineRunner.js folder -f modelstore/MYFOLDER
```
Within the MYFOLDER folder this creates a `generated_ast` folder with the Freon language definition.
