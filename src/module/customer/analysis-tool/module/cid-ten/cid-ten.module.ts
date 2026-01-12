import { Module } from '@nestjs/common';

import { CidTenController } from '@module/customer/analysis-tool/module/cid-ten/cid-ten.controller';
import { ListCidTenUseCase } from '@module/customer/analysis-tool/module/cid-ten/use-case/list-cid-ten.use-case';

@Module({
  controllers: [CidTenController],
  providers: [ListCidTenUseCase],
})
export class CidTenModule {
  protected readonly _type = CidTenModule.name;
}
