import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/general-urban-retirement-grant-time-accelerator.entity';
import type { GeneralUrbanRetirementGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/value-object/general-urban-retirement-grant-time-accelerator-id.value-object';

export abstract class GeneralUrbanRetirementGrantTimeAcceleratorCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementGrantTimeAccelerator(
    props: GeneralUrbanRetirementGrantTimeAcceleratorEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementGrantTimeAccelerator(
    id: GeneralUrbanRetirementGrantTimeAcceleratorId,
    props: GeneralUrbanRetirementGrantTimeAcceleratorEntity,
  ): TransactionType;
}
