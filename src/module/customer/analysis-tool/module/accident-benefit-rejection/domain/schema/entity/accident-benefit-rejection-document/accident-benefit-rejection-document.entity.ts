import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AccidentBenefitRejectionDocumentId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/value-object/accident-benefit-rejection-document-id.value-object';

import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import type { AccidentBenefitRejectionDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/accident-benefit-rejection-document.entity.props.interface';
import type { AccidentBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/enum/accident-benefit-rejection-document-type.enum';

export class AccidentBenefitRejectionDocumentEntity extends BaseEntity<AccidentBenefitRejectionDocumentId> {
  public readonly document: string | null;
  public readonly type: AccidentBenefitRejectionDocumentTypeEnum | null;
  public readonly accidentBenefitRejectionId: AccidentBenefitRejectionId | null;

  protected readonly _type = AccidentBenefitRejectionDocumentEntity.name;

  public constructor(
    props: AccidentBenefitRejectionDocumentEntityPropsInterface,
  ) {
    super(AccidentBenefitRejectionDocumentId, props);
    this.document = props.document ?? null;
    this.type = props.type ?? null;
    this.accidentBenefitRejectionId = props.accidentBenefitRejectionId ?? null;
  }
}
