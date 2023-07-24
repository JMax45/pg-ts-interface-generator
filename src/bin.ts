#!/usr/bin/env node

import { Command } from 'commander';
import { appendFile, rm } from 'fs/promises';
import inquirer from 'inquirer';
import { Client, QueryResult } from 'pg';
import InterfaceGenerator from './InterfaceGenerator';
import mapDataType from './mapDataType';
import path from 'path';

const program = new Command();

program
  .name('pg-ts-interface-generator')
  .option('-c <char>', 'Connection string')
  .option('-o <char>', 'Output file')
  .option('-h <char>', 'Postgres host')
  .option('-U <char>', 'Postgres user')
  .option('-p <char>', 'Postgres port')
  .option('-d <char>', 'Postgres database name')
  .action(async (options) => {
    options.o = path.resolve(options.o);
    const client = new Client({
      connectionString: options.c,
      user: options.U,
      password: async () => {
        return (
          await inquirer.prompt([
            {
              name: 'password',
              message: 'Please enter the password of the database',
              type: 'password',
            },
          ])
        ).password;
      },
      host: options.h,
      port: parseInt(options.p),
      database: options.d,
    });
    try {
      await client.connect();
    } catch (err) {
      console.error('Connection failure', err);
      process.exit(0);
    }
    let res: QueryResult<any> | undefined = undefined;
    try {
      res = await client.query(
        `
        SELECT
            table_name,
            to_json(array_agg(column_name)) AS column_names,
            to_json(array_agg(data_type)) AS data_types
        FROM
            information_schema.columns
        WHERE
            table_catalog = current_database()
            AND table_schema = $1
        GROUP BY
            table_name;
        `,
        ['public']
      );
    } catch (err) {
      console.error('Failed to extract data from database', err);
    }
    if (!res) throw new Error('QueryResult undefined');

    try {
      await rm(options.o);
    } catch (err) {}

    for (const table of res.rows) {
      const generator = new InterfaceGenerator(table.table_name);
      for (let i = 0; i < table.column_names.length; i++) {
        generator.add(table.column_names[i], mapDataType(table.data_types[i]));
      }
      await appendFile(options.o, `${generator.export()}\n\n`);
    }

    await client.end();
    console.log(`The schema was successfully saved to '${options.o}'`);
  });

program.parse();
