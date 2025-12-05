# Class diagram for file LionWebMessage
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
    class Type {
        <<interface>>
        + identifier name
    }
    
        ObjectType *-- "0..*" PropertyDef : properties

        PropertyDef --> "1" Type : type

        PrimitiveType ..|> Type
ObjectType ..|> Type

```
