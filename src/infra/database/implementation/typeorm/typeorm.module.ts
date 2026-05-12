import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeormIndex } from '@infra/database/implementation/typeorm/typeorm.index';
import { MapperModule } from '@lib/mapper/mapper.module';

@Module({
  imports: [
    MapperModule,
    TypeormIndex.dynamicModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => TypeormIndex.dataSourceConfig,
    }),
  ],
  providers: TypeormIndex.repositories,
  exports: [TypeormIndex.dynamicModule, ...TypeormIndex.repositories],
})
export class TypeormModule {
  protected readonly _type = TypeormModule.name;
}
