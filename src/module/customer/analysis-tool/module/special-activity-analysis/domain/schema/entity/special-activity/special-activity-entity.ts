import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialActivityEntityPropsInterface } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/special-activity-entity.props.interface';
import { SpecialActivityId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { SpecialActivityDocumentEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-document/special-activity-document.entity';
import { SpecialActivityInssBenefitEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-inss-benefit/special-activity-inss-benefit.entity';
import { SpecialActivityLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-legal-proceeding/special-activity-legal-proceeding.entity';
import { SpecialActivityResultEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-result/special-activity-result.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialActivityEntity extends BaseEntity<SpecialActivityId> {
  @Description('Resultado da análise de atividade especial')
  public specialActivityResult: SpecialActivityResultEntity | null;

  @Description('Documentos da atividade especial (CTPS e PPP)')
  public specialActivityDocuments: SpecialActivityDocumentEntity[] | null;

  @Description('Benefícios INSS relacionados')
  public specialActivityInssBenefit: SpecialActivityInssBenefitEntity[] | null;

  @Description('Processos judiciais relacionados')
  public specialActivityLegalProceeding:
    | SpecialActivityLegalProceedingEntity[]
    | null;

  protected readonly _type = SpecialActivityEntity.name;

  public constructor(props: SpecialActivityEntityPropsInterface) {
    super(SpecialActivityId, props);
    this.specialActivityResult = props.specialActivityResult ?? null;
    this.specialActivityDocuments = props.specialActivityDocuments ?? null;
    this.specialActivityInssBenefit = props.specialActivityInssBenefit ?? null;
    this.specialActivityLegalProceeding =
      props.specialActivityLegalProceeding ?? null;
  }
}
