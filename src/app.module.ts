import { Module } from '@nestjs/common';

import { GeneralModule } from '@module/general/general.module';

@Module({
  imports: [GeneralModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  protected readonly _type = AppModule.name;
}
