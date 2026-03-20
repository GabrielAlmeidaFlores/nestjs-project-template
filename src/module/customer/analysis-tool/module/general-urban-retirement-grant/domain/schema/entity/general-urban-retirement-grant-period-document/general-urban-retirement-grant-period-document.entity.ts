import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementGrantPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period-document/general-urban-retirement-grant-period-document.entity.props.interface';
import { GeneralUrbanRetirementGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period-document/value-object/general-urban-retirement-grant-period-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';

export class GeneralUrbanRetirementGrantPeriodDocumentEntity extends BaseEntity<GeneralUrbanRetirementGrantPeriodDocumentId> {
  @Description('Conteúdo do documento associado ao período de concessão.')
  public readonly document: string;

  @Description('Período da concessão relacionado ao documento.')
  public readonly generalUrbanRetirementGrantPeriod: GeneralUrbanRetirementGrantPeriodEntity | null;

  protected readonly _type =
    GeneralUrbanRetirementGrantPeriodDocumentEntity.name;

  public constructor(
    props: GeneralUrbanRetirementGrantPeriodDocumentEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementGrantPeriodDocumentId, props);

    this.document = props.document;
    this.generalUrbanRetirementGrantPeriod =
      props.generalUrbanRetirementGrantPeriod ?? null;
  }
}
