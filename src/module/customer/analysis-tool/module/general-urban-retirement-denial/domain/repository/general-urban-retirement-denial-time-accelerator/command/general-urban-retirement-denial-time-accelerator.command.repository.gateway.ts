import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementDenialTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/general-urban-retirement-denial-time-accelerator.entity';
import type { GeneralUrbanRetirementDenialTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/value-object/general-urban-retirement-denial-time-accelerator-id/general-urban-retirement-denial-time-accelerator-id.value-object';

export abstract class GeneralUrbanRetirementDenialTimeAcceleratorCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementDenialTimeAccelerator(
    props: GeneralUrbanRetirementDenialTimeAcceleratorEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementDenialTimeAccelerator(
    id: GeneralUrbanRetirementDenialTimeAcceleratorId,
    props: GeneralUrbanRetirementDenialTimeAcceleratorEntity,
  ): TransactionType;
}
