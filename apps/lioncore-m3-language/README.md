# Freon Implementation of LionWeb M3

# Table of Contents

## Overview

This app contains a Freon web editor for the M3 (meta-meta) language of the [LionWeb specification](http://lionweb.io/specification/).
It has the following functionality:

1. Projectional Web Editor for LionWeb languages.
2. Conversion from LionWeb language to Freon language.
3. Parser for LionWeb language, following the same syntax as used in the (web) editor.
4. Generation of diagrams of the LionWeb language.
5. Extensible commandline utility for parsing and processing the LionWeb language.
6. Store LionWeb language in LionWeb serialization format, useable by any other lionWeb tool.

Version 1.0.0 is aligned with version 2023.1 of the LionWeb specification.

This project contains the LionWeb M3 language as an M2 language.
The editor stores the language as JSON files in the `modelstore` folder in the LionWeb serialization format.
These files can be used by other LionWeb tools.

## Getting started

In the following the root of the project will be indicated with '~'.

*   Clone or copy branch `1.0.0`.
    
*   Next, install all necessary packages by running:
    ```bash
    npm install
    ```

*   Build the app:

```bash
    npm run build
```
This generates all Freon files needed for the projectional editor and generator.

*   Start the server (note that anything that is saved in the editor will be stored in `~/modelstore`):
    ```bash
    npm run server
    ```
	
* Open another terminal, and start the generated editor from it:
     ```bash
     npm run styles
     npm run dev
     ```

The last command opens your preferred browser (or you need to click on the URL) with the generated editor for the LionWeb M3 language
on usually [localhost:5173](http://localhost:5000/).

*   Try out the editor

If you are having trouble using the editor, have a look at the key-bindings under the *Help* menu.

Styling is done though a collection of css files in `style/`.
If you change any files here, run `npm run styles` to update the running app with the new style.

## Convert LionWeb Language to Freon

After the steps above, create a new language using the Freon editor, e.g. called `MyLanguage` and store this language.
This will result in a set of JSON files representing the language in LionWeb format in the folder `modelstore/MyLanguage`
.
Then do the following
```
node dist/freon/custom/commandline/FreonCommandLineRunner.js folder -f modelstore/MYFOLDER
```
Within the `MyLanguage` folder this creates a `generated_ast` folder with the Freon language definitions for `MyLanguage`.


