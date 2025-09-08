import { ClassProvider, Module } from '@nestjs/common';

import { TypeormModule } from '@infra/database/implementation/typeorm/typeorm.module';
import { MapperModule } from '@lib/mapper/mapper.module';

const classProvider: ClassProvider[] = [];

const providerList = classProvider.flatMap((p) => [p, p.useClass]);
const exportList = classProvider.map((p) => p.provide);

@Module({
  imports: [MapperModule, TypeormModule],
  providers: providerList,
  exports: exportList,
})
export class DatabaseModule {
  protected readonly _type = DatabaseModule.name;
}
