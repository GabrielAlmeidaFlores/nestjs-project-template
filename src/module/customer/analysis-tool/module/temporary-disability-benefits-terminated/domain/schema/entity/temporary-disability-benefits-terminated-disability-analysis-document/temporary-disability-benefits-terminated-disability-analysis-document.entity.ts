import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document/value-object/temporary-disability-benefits-terminated-disability-analysis-document-id.value-object';

import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document/enum/temporary-disability-benefits-terminated-disability-analysis-document-type.enum';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document/temporary-disability-benefits-terminated-disability-analysis-document.entity.props.interface';

export class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity extends BaseEntity<TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentId> {
  public readonly fileName: string;
  public readonly type: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeEnum;
  public readonly temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId;

  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntityPropsInterface,
  ) {
    super(
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentId,
      props,
    );
    this.fileName = props.fileName;
    this.type = props.type;
    this.temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId =
      props.temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId;
  }
}
