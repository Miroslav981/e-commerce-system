import { Options } from '@mikro-orm/core';
import { Product, BaseEntity, User } from './src/entities';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const config: Options = {
  type: 'sqlite',
  dbName: 'e-commerce.db',
  entities: [Product, User, BaseEntity],
  highlighter: new SqlHighlighter(),
  debug: true,
  seeder: {
    path: './src/seeders', // path to the folder with seeders
    pathTs: undefined, // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
};

export default config;