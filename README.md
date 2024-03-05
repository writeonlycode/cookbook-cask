# Cookbook Cask

Cookbook Cask is a community-driven platform designed for culinary enthusiasts
to anonymously share and discover recipes. 


## Database Schema

The project has 3 tables: `recipes` to store the recipes, `ingredients` to
store the ingredients for each recipe, and `instructions` to store the
instructions for each recipe.


### Recipes Table

---
| Field | Type | Description |
---
| id          | bigint | Primary key                                                   |
| name        | text   | The name of the recipe                                        |
| description | text   | A short description of the recipe                             |
| duration    | int    | The amount of time it takes to prepare the recipe             |
| user_id     | bigint | The id of the author of the recipe, refers to the users table |


###  Ingredients Table

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
| recipe_id | bigint | The id of the recipe, refers to the recipes table                        |


###  Instructions Table

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


## Database Functions

The project has 2 database functions: a `create_recipe` function that wraps the
creation of a new row in the `recipes` table and the creation of new rows in
the `ingredients` and `insctructions` tables; and a `update_recipe` function,
that wraps the update of a row in the `recipes` table and the corresponding
update, creation or removal of the appropriate rows in the `ingredients` and
`instructions` tables.


### Create Recipe Function

```sql
```


### Update Recipe Function

```sql
```
