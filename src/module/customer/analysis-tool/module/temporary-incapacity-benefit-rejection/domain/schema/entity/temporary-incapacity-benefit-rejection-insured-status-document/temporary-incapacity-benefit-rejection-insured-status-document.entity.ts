import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document/value-object/temporary-incapacity-benefit-rejection-insured-status-document-id.value-object';

import type { TemporaryIncapacityBenefitRejectionInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status/value-object/temporary-incapacity-benefit-rejection-insured-status-id.value-object';
import type { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document/enum/temporary-incapacity-benefit-rejection-insured-status-document-type.enum';
import type { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document/temporary-incapacity-benefit-rejection-insured-status-document.entity.props.interface';

export class TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity extends BaseEntity<TemporaryIncapacityBenefitRejectionInsuredStatusDocumentId> {
  public readonly fileName: string;
  public readonly type: TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeEnum;
  public readonly temporaryIncapacityBenefitRejectionInsuredStatusId: TemporaryIncapacityBenefitRejectionInsuredStatusId;

  protected readonly _type =
    TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitRejectionInsuredStatusDocumentId, props);
    this.fileName = props.fileName;
    this.type = props.type;
    this.temporaryIncapacityBenefitRejectionInsuredStatusId =
      props.temporaryIncapacityBenefitRejectionInsuredStatusId;
  }
}
