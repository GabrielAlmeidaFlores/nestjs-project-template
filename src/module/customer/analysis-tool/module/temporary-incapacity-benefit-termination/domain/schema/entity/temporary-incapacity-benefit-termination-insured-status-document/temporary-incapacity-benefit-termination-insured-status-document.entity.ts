import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status-document/value-object/temporary-incapacity-benefit-termination-insured-status-document-id.value-object';

import type { TemporaryIncapacityBenefitTerminationInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/value-object/temporary-incapacity-benefit-termination-insured-status-id.value-object';
import type { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status-document/enum/temporary-incapacity-benefit-termination-insured-status-document-type.enum';
import type { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status-document/temporary-incapacity-benefit-termination-insured-status-document.entity.props.interface';

export class TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity extends BaseEntity<TemporaryIncapacityBenefitTerminationInsuredStatusDocumentId> {
  public readonly fileName: string;
  public readonly type: TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeEnum;
  public readonly temporaryIncapacityBenefitTerminationInsuredStatusId: TemporaryIncapacityBenefitTerminationInsuredStatusId;

  protected readonly _type =
    TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitTerminationInsuredStatusDocumentId, props);
    this.fileName = props.fileName;
    this.type = props.type;
    this.temporaryIncapacityBenefitTerminationInsuredStatusId =
      props.temporaryIncapacityBenefitTerminationInsuredStatusId;
  }
}
