import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-document/value-object/retirement-permanent-disability-revision-disability-analysis-document-id.value-object';

import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/enum/retirement-permanent-disability-revision-disability-analysis-document-type.enum';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/value-object/retirement-permanent-disability-revision-disability-analysis-id.value-object';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-document/retirement-permanent-disability-revision-disability-analysis-document.entity.props.interface';

export class RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity extends BaseEntity<RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentId> {
  public readonly retirementPermanentDisabilityRevisionDisabilityAnalysisId: RetirementPermanentDisabilityRevisionDisabilityAnalysisId;
  public readonly fileName: string;
  public readonly type: RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeEnum;

  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntityPropsInterface,
  ) {
    super(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentId,
      props,
    );

    this.retirementPermanentDisabilityRevisionDisabilityAnalysisId =
      props.retirementPermanentDisabilityRevisionDisabilityAnalysisId;
    this.fileName = props.fileName;
    this.type = props.type;
  }
}
