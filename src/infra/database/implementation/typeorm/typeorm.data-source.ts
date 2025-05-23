import { DataSource } from 'typeorm';

import { TypeormIndex } from '@infra/database/implementation/typeorm/typeorm.index';

export const typeormDataSource = new DataSource(TypeormIndex.dataSourceConfig);
