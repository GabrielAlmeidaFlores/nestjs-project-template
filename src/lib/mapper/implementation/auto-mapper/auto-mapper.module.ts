import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

import { AutoMapperService } from '@lib/mapper/implementation/auto-mapper/auto-mapper.service';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [AutoMapperService],
  exports: [AutoMapperService],
})
export class AutoMapperModule {
  protected readonly _type = AutoMapperModule.name;
}
