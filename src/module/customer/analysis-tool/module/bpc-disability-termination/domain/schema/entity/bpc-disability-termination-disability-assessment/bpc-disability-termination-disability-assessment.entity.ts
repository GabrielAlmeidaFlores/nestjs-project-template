import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityTerminationDisabilityAssessmentEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/bpc-disability-termination-disability-assessment.entity.props.interface';
import { BpcDisabilityTerminationDisabilityAssessmentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/value-object/bpc-disability-termination-disability-assessment-id/bpc-disability-termination-disability-assessment-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityTerminationDisabilityAssessmentDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment-document/bpc-disability-termination-disability-assessment-document.entity';

export class BpcDisabilityTerminationDisabilityAssessmentEntity extends BaseEntity<BpcDisabilityTerminationDisabilityAssessmentId> {
  @Description('Data estimada do início da deficiência.')
  public readonly estimatedDisabilityStartDate: Date | null;

  @Description('Requerente frequenta escola ou curso técnico.')
  public readonly attendsSchoolOrTechnicalCourse: boolean | null;

  @Description('Requerente realiza atividade laboral.')
  public readonly performsLaborActivity: boolean | null;

  @Description('Requerente necessita de ajuda de terceiros.')
  public readonly needsThirdPartyHelp: boolean | null;

  @Description('Requerente possui acesso a serviços básicos.')
  public readonly hasAccessToBasicServices: boolean | null;

  @Description('Outras barreiras ou dificuldades do requerente.')
  public readonly otherBarriersDescription: string | null;

  @Description('Documentos médicos e sociais da avaliação da deficiência.')
  public readonly bpcDisabilityTerminationDisabilityAssessmentDocument: BpcDisabilityTerminationDisabilityAssessmentDocumentEntity[];

  protected readonly _type =
    BpcDisabilityTerminationDisabilityAssessmentEntity.name;

  public constructor(
    props: BpcDisabilityTerminationDisabilityAssessmentEntityPropsInterface,
  ) {
    super(BpcDisabilityTerminationDisabilityAssessmentId, props);

    this.estimatedDisabilityStartDate =
      props.estimatedDisabilityStartDate ?? null;
    this.attendsSchoolOrTechnicalCourse =
      props.attendsSchoolOrTechnicalCourse ?? null;
    this.performsLaborActivity = props.performsLaborActivity ?? null;
    this.needsThirdPartyHelp = props.needsThirdPartyHelp ?? null;
    this.hasAccessToBasicServices = props.hasAccessToBasicServices ?? null;
    this.otherBarriersDescription = props.otherBarriersDescription ?? null;
    this.bpcDisabilityTerminationDisabilityAssessmentDocument =
      props.bpcDisabilityTerminationDisabilityAssessmentDocument ?? [];
  }
}
