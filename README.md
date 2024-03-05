# Database Schema

## Recipes Table

---
| Field | Type | Description |
---
| id          | bigint | Primary key                                                   |
| name        | text   | The name of the recipe                                        |
| description | text   | A short description of the recipe                             |
| duration    | int    | The amount of time it takes to prepare the recipe             |
| user_id     | bigint | The id of the author of the recipe, refers to the users table |


##  Ingredients Table

Each ingredient belongs to a specific recipe. There will be some duplication in
the ingredients throughout the database. But this makes it easier to include
some specific data about an ingredient in a particular recipe, like a
customized picture.

---
| Field | Type | Description |
---
| id        | bigint | Primary key                                                              |
| name      | text   | The name of the ingredient                                               |
| weight    | int    | The order in which the ingredient appears of the instruction of a recipe |
| amount    | int    | The text of the instruction of a recipe                                  |
| unit      | int    | The text of the instruction of a recipe                                  |
| recipe_id | bigint | The id of the recipe, refers to the recipes table                        |


##  Units Table

The units table is general and isn't editable to regular users.

---
| Field | Type | Description |
---
| id   | bigint | Primary key          |
| name | text   | The name of the unit |


##  Instructions Table

Each instruction belongs to a specific recipe. This makes sense and it also
makes it easier to include some specific data about an ingredient in a
particular recipe, like a customized picture.

---
| Field | Type | Description |
---
| id        | bigint | Primary key                                       |
| text      | text   | The text of the instruction of a recipe           |
| weight    | int    | The text of the instruction of a recipe           |
| recipe_id | bigint | The id of the recipe, refers to the recipes table |

