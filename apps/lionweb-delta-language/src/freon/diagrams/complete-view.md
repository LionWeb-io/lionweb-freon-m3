# Class diagram for language Protocol
```mermaid
    %%{init: {'theme': 'forest'} }%%
    classDiagram
    direction TD
    %% other possibilites: LR RL DT TB (same as TD)
    class PropertyDef {
        
        + identifier name
		+ boolean mayBeNull
		+ boolean isList
		+ boolean isOptional
    }
    class PrimitiveType {
        
        + string primitiveType
		+ string validator
    }
    class ObjectType {
        
        
    }
    class Types {
        <<modelunit>>
        + identifier name
    }
    class MessageGroup {
        <<modelunit>>
        + string taggedUnionProperty
    }
    class Type {
        <<interface>>
        + identifier name
    }
    Types *-- "0..*" PrimitiveType : primitiveTypes

		Types *-- "0..*" ObjectType : objectTypes
MessageGroup *-- "0..*" ObjectType : messages

		MessageGroup *-- "0..*" PropertyDef : sharedProperties

        
    
        ObjectType *-- "0..*" PropertyDef : properties

        PropertyDef --> "1" Type : type

        PrimitiveType ..|> Type
ObjectType ..|> Type

```
