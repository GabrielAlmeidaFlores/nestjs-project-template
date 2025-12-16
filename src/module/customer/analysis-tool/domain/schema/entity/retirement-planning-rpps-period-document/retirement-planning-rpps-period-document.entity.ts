import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRppsPeriodDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/value-object/retirement-planning-rpps-period-document-id.value-object';
import { RetirementPlanningRppsPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/retirement-planning-rpps-period-special-time.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import type { RetirementPlanningRppsPeriodDisabilityEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/retirement-planning-rpps-period-disability.entity';
import type { RetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/enum/retirement-planning-document-type.enum';
import type { RetirementPlanningRppsPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/retirement-planning-rpps-period-document.entity.props.interface';

export class RetirementPlanningRppsPeriodDocumentEntity extends BaseEntity<RetirementPlanningRppsPeriodDocumentId> {
  @Description('Documento do período RPPS')
  public readonly document: string;
  @Description('Tipo do documento do período RPPS')
  public readonly documentType: RetirementPlanningDocumentTypeEnum;
  @Description('Tempo especial associado ao documento')
  public readonly retirementPlanningRppsPeriodSpecialTime: RetirementPlanningRppsPeriodSpecialTimeEntity | null;
  @Description('Deficiência associada ao documento')
  public readonly retirementPlanningRppsPeriodDisability: RetirementPlanningRppsPeriodDisabilityEntity | null;
  @Description('Planejamento de aposentadoria RPPS associado ao documento')
  public readonly retirementPlanningRpps: RetirementPlanningRppsEntity | null;

  protected readonly _type = RetirementPlanningRppsPeriodDocumentEntity.name;
  public constructor(
    props: RetirementPlanningRppsPeriodDocumentEntityPropsInterface,
  ) {
    super(RetirementPlanningRppsPeriodDocumentId, props);
    this.document = props.document;
    this.documentType = props.documentType;
    this.retirementPlanningRppsPeriodSpecialTime =
      props.retirementPlanningRppsPeriodSpecialTime ?? null;
    this.retirementPlanningRppsPeriodDisability =
      props.retirementPlanningRppsPeriodDisability ?? null;
    this.retirementPlanningRpps = props.retirementPlanningRpps ?? null;
  }
}
