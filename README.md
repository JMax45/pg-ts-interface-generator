# pg-ts-interface-generator

[![npm](https://img.shields.io/npm/v/pg-ts-interface-generator?logo=npm)](https://www.npmjs.com/package/pg-ts-interface-generator)

pg-ts-interface-generator is a command-line tool built with Node.js that can generate TypeScript interfaces from a PostgreSQL database. It provides an easy way to extract table information and generate corresponding TypeScript interfaces for use in your TypeScript projects.

**Note: This tool is intended to be a simple solution, there are better alternatives available for generating TypeScript interfaces from PostgreSQL databases. Consider using other more mature and feature-rich libraries if your requirements are more complex.**

## Installation

To install pg-ts-interface-generator, use npm:

```shell
npm install -g pg-ts-interface-generator
```

## Usage

```shell
pg-ts-interface-generator -c postgres://user:password@host:5432/dbname -o schema.ts
```

Output example:

```typescript
interface data_types_table {
  column_uuid: string;
  column_date: Date;
  column_boolean: boolean;
}

interface users {
  user_id: string;
  email: string;
  is_verified: boolean;
}
```

You can also specify the host, user, port, and dbname individually instead of specifying a connection string:

```shell
pg-ts-interface-generator -h localhost -U user -p 5432 -d dbname -o schema.ts
```

## Table and Column Comments Support

pg-ts-interface-generator supports extracting comments on tables and columns from the PostgreSQL database. If you have added comments to your tables and columns using the `COMMENT ON TABLE`/`COMMENT ON COLUMN` command in PostgreSQL, these comments will be reflected in the generated TypeScript interfaces.

For example, if you have the following comment on the `user_id` column of the `users` table:

```sql
COMMENT ON COLUMN users.user_id IS 'UUID v4 user id';
```

The generated TypeScript interface will include the comment as a JSDoc comment:

```typescript
interface users {
  /** UUID v4 user id */
  user_id: string;
  email: string;
  is_verified: boolean;
}
```

This allows you to add meaningful descriptions and documentation to your interfaces based on the comments you've already added in the database schema.

## License

This project is licensed under the [MIT License](LICENSE).
