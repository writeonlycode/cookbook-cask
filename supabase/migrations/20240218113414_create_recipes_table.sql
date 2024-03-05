create table
  recipes (
    id bigint generated always as identity primary key,
    name text not null,
    description text not null,
    duration interval not null
  );

create table
  units (
    id bigint generated always as identity primary key,
    name text not null
  );

create table
  ingredients (
    id bigint generated always as identity primary key,
    name text not null,
    weight integer not null,
    amount integer not null,
    unit_id bigint references units not null,
    recipe_id bigint references recipes not null
  );

create table
  instructions (
    id bigint generated always as identity primary key,
    text text not null,
    weight integer not null,
    recipe_id bigint references recipes not null
  );
