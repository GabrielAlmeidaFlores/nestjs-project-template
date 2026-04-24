import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitRejectionDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/value-object/temporary-incapacity-benefit-rejection-document-id.value-object';

import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { TemporaryIncapacityBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/enum/temporary-incapacity-benefit-rejection-document-type.enum';
import type { TemporaryIncapacityBenefitRejectionDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-document/temporary-incapacity-benefit-rejection-document.entity.props.interface';

export class TemporaryIncapacityBenefitRejectionDocumentEntity extends BaseEntity<TemporaryIncapacityBenefitRejectionDocumentId> {
  public readonly fileName: string;
  public readonly type: TemporaryIncapacityBenefitRejectionDocumentTypeEnum;
  public readonly temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId;

  protected readonly _type =
    TemporaryIncapacityBenefitRejectionDocumentEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitRejectionDocumentEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitRejectionDocumentId, props);
    this.fileName = props.fileName;
    this.type = props.type;
    this.temporaryIncapacityBenefitRejectionId =
      props.temporaryIncapacityBenefitRejectionId;
  }
}
