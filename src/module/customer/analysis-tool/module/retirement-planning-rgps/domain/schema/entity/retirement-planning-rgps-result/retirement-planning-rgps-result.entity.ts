import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRgpsResultEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity.props.interface';
import { RetirementPlanningRgpsResultId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-result/value-object/retirement-planning-rgps-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';

export class RetirementPlanningRgpsResultEntity extends BaseEntity<RetirementPlanningRgpsResultId> {
  @Description('Nome do cliente associado ao resultado da análise CNIS.')
  public readonly clientName: string | null;

  @Description(
    'Documento federal do cliente associado ao resultado da análise CNIS.',
  )
  public readonly clientFederalDocument: FederalDocument | null;

  @Description(
    'Data de nascimento do cliente associado ao resultado da análise CNIS.',
  )
  public readonly clientBirthDate: Date | null;

  @Description(
    'Data da última filiação do cliente associado ao resultado da análise CNIS.',
  )
  public readonly clientLastAffiliationDate: Date | null;

  @Description('Texto comparativo CNIS x CTPS.')
  public readonly compareCnisCtps: string | null;

  @Description('Resultado bruto do método compare CNIS x CTPS (JSON).')
  public readonly compareCnisCtpsRaw: string | null;

  @Description('Resultado da análise de planejamento de aposentadoria RGPS.')
  public readonly result: string | null;

  protected readonly _type = RetirementPlanningRgpsResultEntity.name;

  public constructor(props: RetirementPlanningRgpsResultEntityPropsInterface) {
    super(RetirementPlanningRgpsResultId, props);

    this.clientName = props.clientName ?? null;
    this.clientFederalDocument = props.clientFederalDocument ?? null;
    this.clientBirthDate = props.clientBirthDate ?? null;
    this.clientLastAffiliationDate = props.clientLastAffiliationDate ?? null;
    this.compareCnisCtps = props.compareCnisCtps ?? null;
    this.compareCnisCtpsRaw = props.compareCnisCtpsRaw ?? null;
    this.result = props.result ?? null;
  }
}
