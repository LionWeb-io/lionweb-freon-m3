# LionWeb Delta Language

This app implements tyhe LionWeb Delta Language (not specified in the LionWeb standard).
It has the following functionality:

1. Projectional Web Editor for the LionWeb Delta Language.
2. Commandline utility for generating TypeScript code from the Delta Language
   - All TypeScript types for all Delta messages and their properties.
   - TypeScript definition files for all Delta messages and their properties to be used by the TypeScript LionWeb Validator

In addition, Freon delivers the following functionality out of the box:

1. Store Delta Language in LionWeb serialization format, useable by any other lionWeb tools.
2. Parser and Unparser for Delta Language, following the same syntax as used in the (web) editor.
3. Generation of (UML) diagrams of the Delta Language.

Version 1.0.0 is aligned with version 2026.1 of the LionWeb specification.

## Build the Delta Language Editor and Generator

In the following the root of the repository (above the `apps` folder) will be indicated with '~'.

### Install all necessary packages
```bash
npm install
```

### Run Freon Generator
Run the Freon generator and see the generated files appearing in the `src/freon` folder.

```bash
npm run generate
```

### Start the local model server
Open a second terminal in the root of thios repository (thus above the `apps` folder) and start the server: 
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
needs to be run again if you change the styling.

The second command opens your preferred browser with the generated editor for the language
on typically  http://localhost:5174 (http://localhost:5173).
Sometimes you need to clock omn the URL to open the browser window.

### Try out the editor

Open the model named `delta`, this is the current definition of the delta messages and the serialization format.

## Specifying the Delta model and Generating TypeScript code

The first step is to open the web editor and make the changes to the Delta Language as required.
Ensure you save the changed model by pressing the store button.

Go to a terminal (or open one) in the root of this app: `~/apps/lionweb-delta-language`
and enter the command:
```bash
npm run generate-delta-ts
```
This generates thye TypeScript code in the folder `delta-gen`.
You can now review this code, and if correct use the following command to copy the generated files
to the `lionweb-typescript` and the `lionweb-server` projects:
```bash
npm run install-deltas
```
This command assumes that you have the `lionweb-typescript` and the `lionweb-server` repositories cloned
next to the current repository.

As a last step you need to build the `lionweb-typescript` and the `lionweb-server` projects and
push the changes.

## The Delta Language
The language structure follows the structure in the specification almost one-to-one.
See the [full language as a diagram](src/freon/diagrams/complete-view.md).

The main specific concepts are:

### MessageGroup
A _MessageGroup_ is a partition defining a group of messages that have semantics and a number of properties in common.
The spec defines the following messagegroups: [Command](https://lionweb.io/specification/delta/delta-api.html#commands), [Request (also called Query)](https://lionweb.io/specification/delta/delta-api.html#queries), [Event](https://lionweb.io/specification/delta/delta-api.html#events) and Response (defined in the spec as part of the Request/Query).

In addition the `lionweb-server` defines several additional messagegroups:

- **AdminRequest**: custom messages for creating, deleting a repository, etc.
- **AdminResponse**: responses to _AdminRequest_ messages.
- **Monitor**: custom messages to connect a monitor client to monitor _all_ messages being exchanged.

A _MessageGroup_ has a set of properties, which are part of each message in the MessageGroup.
One of these properties is the [tagged union](https://mariusschulz.com/blog/tagged-union-types-in-typescript) property.
The value of this property for a given _Message_ is always the name of the _Message_.

A _MessageGroup_ also contains a list of _Message_'s, where each message has a number of properties.

Each _type_ of each property must be defined explictly in a _Types_ partition.

### Types

A Types partition defines a number of types, which can be used in the messages.
There are two kind of Types:

- **Primitive Type**: A primitive type, is mapped directly to a TypeScript type
- **Object Type**: An _Object Type_ is a typoe that has properties itself. Each property either has a _Primitive Type_ or an _Object Type_.

## TypeScript Code Generated

From the delta model there are two different TypeScript structures generated.

- The first is a TypeScript type definition for each _Message_ and each _Type_ in the delta model.
  This also includes a type guard to check whether a _Message_ is in a specific _MessageGroup_.
- The second is a JSON like TypeScript object that defines the exact structure of each _Message_ and _Type_. 
  This is used by the TypeScript validator to validate the correctness of each delta in TypeScript.

The code for the hgenerator can be found in the class [ConvertProtocol2TypescriptAction.ts](src/custom/ConvertProtocol2TypescriptAction.ts)

**TODO**

Note that the TypeScript type definitions are copied to the `lionweb-server` project, while there are
equivalent interface definitions in the `lionweb-typescript` project.
These two need to be reconciled to end up with one definition.
