import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementReviewPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period-document/general-urban-retirement-review-period-document.entity.props.interface';
import { GeneralUrbanRetirementReviewPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period-document/value-object/general-urban-retirement-review-period-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';

export class GeneralUrbanRetirementReviewPeriodDocumentEntity extends BaseEntity<GeneralUrbanRetirementReviewPeriodDocumentId> {
  @Description('Conteúdo do documento associado ao período de concessão.')
  public readonly document: string;

  @Description('Período da concessão relacionado ao documento.')
  public readonly generalUrbanRetirementReviewPeriod: GeneralUrbanRetirementReviewPeriodEntity | null;

  protected readonly _type =
    GeneralUrbanRetirementReviewPeriodDocumentEntity.name;

  public constructor(
    props: GeneralUrbanRetirementReviewPeriodDocumentEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementReviewPeriodDocumentId, props);

    this.document = props.document;
    this.generalUrbanRetirementReviewPeriod =
      props.generalUrbanRetirementReviewPeriod ?? null;
  }
}
