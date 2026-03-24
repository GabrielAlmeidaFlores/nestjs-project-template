import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CreditPackController } from '@module/admin/credit-pack/credit-pack.controller';
import { CreateCreditPackUseCase } from '@module/admin/credit-pack/use-case/create-credit-pack.use-case';
import { DeleteCreditPackUseCase } from '@module/admin/credit-pack/use-case/delete-credit-pack.use-case';
import { GetCreditPackUseCase } from '@module/admin/credit-pack/use-case/get-credit-pack.use-case';
import { ListCreditPacksUseCase } from '@module/admin/credit-pack/use-case/list-credit-packs.use-case';
import { UpdateCreditPackUseCase } from '@module/admin/credit-pack/use-case/update-credit-pack.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [CreditPackController],
  providers: [
    CreateCreditPackUseCase,
    UpdateCreditPackUseCase,
    DeleteCreditPackUseCase,
    GetCreditPackUseCase,
    ListCreditPacksUseCase,
  ],
})
export class CreditPackModule {
  protected readonly _type = CreditPackModule.name;
}
