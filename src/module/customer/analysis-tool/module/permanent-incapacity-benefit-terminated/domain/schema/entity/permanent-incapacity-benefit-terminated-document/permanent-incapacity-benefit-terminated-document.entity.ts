import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PermanentIncapacityBenefitTerminatedDocumentId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/value-object/permanent-incapacity-benefit-terminated-document-id.value-object';

import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/enum/permanent-incapacity-benefit-terminated-document-type.enum';
import type { PermanentIncapacityBenefitTerminatedDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/permanent-incapacity-benefit-terminated-document.entity.props.interface';

export class PermanentIncapacityBenefitTerminatedDocumentEntity extends BaseEntity<PermanentIncapacityBenefitTerminatedDocumentId> {
  public readonly fileName: string;
  public readonly type: PermanentIncapacityBenefitTerminatedDocumentTypeEnum;
  public readonly permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId;

  protected readonly _type =
    PermanentIncapacityBenefitTerminatedDocumentEntity.name;

  public constructor(
    props: PermanentIncapacityBenefitTerminatedDocumentEntityPropsInterface,
  ) {
    super(PermanentIncapacityBenefitTerminatedDocumentId, props);
    this.fileName = props.fileName;
    this.type = props.type;
    this.permanentIncapacityBenefitTerminatedId =
      props.permanentIncapacityBenefitTerminatedId;
  }
}
