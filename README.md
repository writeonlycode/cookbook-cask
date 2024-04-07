# Cookbook Cask

Cookbook Cask is a community-driven platform designed for culinary enthusiasts
to anonymously share and discover recipes. 

To see a live demo of Cookbook Cask, please visit the address below:

https://cookbook-cask.vercel.app/

Please note that this is a demo website and not an official website. If you
have any questions or feedback, please feel free to contact us!

## Project Overview

### Technologies Used

- **Next.js**: A React framework for building server-side rendered and static web applications.
- **Supabase**: An open-source Firebase alternative for building real-time, collaborative applications.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **react-beautiful-dnd**: A library for building drag-and-drop interfaces in React.
- **radix-ui/shadow-ui**: A library of low-level UI components for building accessible and composable interfaces.
- **Moment.js**: A library for parsing, validating, manipulating, and displaying dates and times in JavaScript.

## Database Tables Summary

The project has 3 tables: `recipes` to store the recipes, `ingredients` to
store the ingredients for each recipe, and `instructions` to store the
instructions for each recipe.

### Recipes

- **id**: Unique identifier for each recipe.
- **name**: The name of the recipe.
- **description**: A brief description of the recipe.
- **duration**: The duration of the recipe (e.g., cooking time).

### Instructions

- **id**: Unique identifier for each instruction.
- **text**: The instruction text.
- **weight**: The order or priority of the instruction.
- **recipe_id**: The ID of the recipe to which the instruction belongs.

### Ingredients

- **id**: Unique identifier for each ingredient.
- **name**: The name of the ingredient.
- **weight**: The quantity or weight of the ingredient.
- **recipe_id**: The ID of the recipe to which the ingredient belongs.

## Database Functions

The project has 2 database functions: a `create_recipe` function that wraps the
creation of a new row in the `recipes` table and the creation of new rows in
the `ingredients` and `insctructions` tables; and a `update_recipe` function,
that wraps the update of a row in the `recipes` table and the corresponding
update, creation or removal of the appropriate rows in the `ingredients` and
`instructions` tables.

## Database Functions Summary

### create_recipe

**Arguments:**

- `recipe_name`: Text - The name of the recipe.
- `recipe_description`: Text - A brief description of the recipe.
- `recipe_duration`: Interval - The duration of the recipe.
- `recipe_ingredients`: JSON Array - An array of JSON objects containing ingredient details.
- `recipe_instructions`: JSON Array - An array of JSON objects containing instruction details.

**Definition:**

- Inserts a new recipe into the database along with its ingredients and instructions.
- Returns a JSON object containing the ID of the newly created recipe.

### update_recipe

**Arguments:**

- `recipe_id`: Integer - The ID of the recipe to be updated.
- `recipe_name`: Text - The updated name of the recipe.
- `recipe_description`: Text - The updated description of the recipe.
- `recipe_duration`: Interval - The updated duration of the recipe.
- `recipe_ingredients`: JSON - JSON data representing updated ingredient details.
- `recipe_instructions`: JSON - JSON data representing updated instruction details.

**Definition:**

- Updates an existing recipe in the database with the provided details.
- Handles updating, inserting, and deleting ingredients and instructions based on the provided JSON data.
- Returns a JSON object containing the ID of the updated recipe.

### License

This project is licensed under the [MIT License](LICENSE).
