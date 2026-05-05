import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityTerminationDisabilityAssessmentDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment-document/bpc-disability-termination-disability-assessment-document.entity.props.interface';
import { BpcDisabilityTerminationDisabilityAssessmentDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment-document/value-object/bpc-disability-termination-disability-assessment-document-id/bpc-disability-termination-disability-assessment-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityTerminationDisabilityAssessmentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/bpc-disability-termination-disability-assessment.entity';

export class BpcDisabilityTerminationDisabilityAssessmentDocumentEntity extends BaseEntity<BpcDisabilityTerminationDisabilityAssessmentDocumentId> {
  @Description('Documento médico ou social da avaliação da deficiência.')
  public readonly document: string;

  @Description('Avaliação da deficiência associada ao documento.')
  public readonly bpcDisabilityTerminationDisabilityAssessment: BpcDisabilityTerminationDisabilityAssessmentEntity;

  protected readonly _type =
    BpcDisabilityTerminationDisabilityAssessmentDocumentEntity.name;

  public constructor(
    props: BpcDisabilityTerminationDisabilityAssessmentDocumentEntityPropsInterface,
  ) {
    super(BpcDisabilityTerminationDisabilityAssessmentDocumentId, props);

    this.document = props.document;
    this.bpcDisabilityTerminationDisabilityAssessment =
      props.bpcDisabilityTerminationDisabilityAssessment;
  }
}
