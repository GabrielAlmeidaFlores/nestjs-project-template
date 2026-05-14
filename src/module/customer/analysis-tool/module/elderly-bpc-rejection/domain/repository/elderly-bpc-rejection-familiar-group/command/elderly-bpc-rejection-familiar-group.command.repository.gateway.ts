import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionFamiliarGroupEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/elderly-bpc-rejection-familiar-group.entity';

export abstract class ElderlyBpcRejectionFamiliarGroupCommandRepositoryGateway {
  public abstract createElderlyBpcRejectionFamiliarGroup(
    props: ElderlyBpcRejectionFamiliarGroupEntity,
  ): TransactionType;

  public abstract deleteElderlyBpcRejectionFamiliarGroupsByElderlyBpcRejectionId(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): TransactionType;
}
