import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document/value-object/permanent-incapacity-benefit-terminated-insured-status-document-id.value-object';

import type { PermanentIncapacityBenefitTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/value-object/permanent-incapacity-benefit-terminated-insured-status-id.value-object';
import type { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document/enum/permanent-incapacity-benefit-terminated-insured-status-document-type.enum';
import type { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document/permanent-incapacity-benefit-terminated-insured-status-document.entity.props.interface';

export class PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity extends BaseEntity<PermanentIncapacityBenefitTerminatedInsuredStatusDocumentId> {
  public readonly fileName: string;
  public readonly type: PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeEnum;
  public readonly permanentIncapacityBenefitTerminatedInsuredStatusId: PermanentIncapacityBenefitTerminatedInsuredStatusId;

  protected readonly _type =
    PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity.name;

  public constructor(
    props: PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntityPropsInterface,
  ) {
    super(PermanentIncapacityBenefitTerminatedInsuredStatusDocumentId, props);
    this.fileName = props.fileName;
    this.type = props.type;
    this.permanentIncapacityBenefitTerminatedInsuredStatusId =
      props.permanentIncapacityBenefitTerminatedInsuredStatusId;
  }
}
