import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementReviewEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity.props.interface';
import type { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';

export class GeneralUrbanRetirementReviewEntity extends BaseEntity<GeneralUrbanRetirementReviewId> {
  @Description(
    'Documento CNIS utilizado na análise de revisão de aposentadoria urbana.',
  )
  public readonly cnisDocument: string | null;

  @Description('Documento da carta de concessão do benefício a revisar.')
  public readonly benefitAwardLetterDocument: string | null;

  @Description('Nome da análise.')
  public readonly analysisName: string | null;

  @Description('Categoria principal do cliente no fluxo revisional.')
  public readonly category: string | null;

  @Description('Senha do Meu INSS informada pelo cliente.')
  public readonly myInssPassword: string | null;

  @Description('Resultado da análise de revisão de aposentadoria urbana.')
  public readonly generalUrbanRetirementReviewResult: GeneralUrbanRetirementReviewResultEntity | null;

  protected readonly _type = GeneralUrbanRetirementReviewEntity.name;

  public constructor(props: GeneralUrbanRetirementReviewEntityPropsInterface) {
    super(GeneralUrbanRetirementReviewId, props);

    this.cnisDocument = props.cnisDocument ?? null;
    this.benefitAwardLetterDocument = props.benefitAwardLetterDocument ?? null;
    this.analysisName = props.analysisName ?? null;
    this.category = props.category ?? null;
    this.myInssPassword = props.myInssPassword ?? null;
    this.generalUrbanRetirementReviewResult =
      props.generalUrbanRetirementReviewResult ?? null;
  }
}
