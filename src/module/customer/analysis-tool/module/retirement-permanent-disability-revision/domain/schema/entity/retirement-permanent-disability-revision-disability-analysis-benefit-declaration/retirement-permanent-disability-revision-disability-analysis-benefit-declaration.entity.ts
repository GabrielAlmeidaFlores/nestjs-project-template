import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-declaration/value-object/retirement-permanent-disability-revision-disability-analysis-benefit-declaration-id.value-object';

import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit/value-object/retirement-permanent-disability-revision-disability-analysis-benefit-id.value-object';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-declaration/retirement-permanent-disability-revision-disability-analysis-benefit-declaration.entity.props.interface';

export class RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntity extends BaseEntity<RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationId> {
  public readonly retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId;
  public readonly fileName: string;

  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntityPropsInterface,
  ) {
    super(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationId,
      props,
    );

    this.retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId =
      props.retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId;
    this.fileName = props.fileName;
  }
}
