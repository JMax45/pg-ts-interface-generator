# pg-ts-interface-generator

[![npm](https://img.shields.io/npm/v/pg-ts-interface-generator?logo=npm)](https://www.npmjs.com/package/pg-ts-interface-generator)

pg-ts-interface-generator is a command-line tool built with Node.js that can generate TypeScript interfaces from a PostgreSQL database.

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
  email_string: string;
  is_verified: boolean;
}
```

You can also specify host, user, port and dbname instead of specifying a connection string:

```shell
pg-ts-interface-generator -h localhost -U user -p 5432 -d dbname -o schema.ts
```

## License

This project is licensed under the [MIT License](LICENSE).
