import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitTerminationDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/value-object/temporary-incapacity-benefit-termination-document-id.value-object';

import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/enum/temporary-incapacity-benefit-termination-document-type.enum';
import type { TemporaryIncapacityBenefitTerminationDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/temporary-incapacity-benefit-termination-document.entity.props.interface';

export class TemporaryIncapacityBenefitTerminationDocumentEntity extends BaseEntity<TemporaryIncapacityBenefitTerminationDocumentId> {
  public readonly fileName: string;
  public readonly type: TemporaryIncapacityBenefitTerminationDocumentTypeEnum;
  public readonly temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId;

  protected readonly _type =
    TemporaryIncapacityBenefitTerminationDocumentEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitTerminationDocumentEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitTerminationDocumentId, props);
    this.fileName = props.fileName;
    this.type = props.type;
    this.temporaryIncapacityBenefitTerminationId =
      props.temporaryIncapacityBenefitTerminationId;
  }
}
