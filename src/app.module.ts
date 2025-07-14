import { Module } from '@nestjs/common';

import { GenericModule } from '@module/generic/generic.module';

@Module({
  imports: [GenericModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  protected readonly _type = AppModule.name;
}
