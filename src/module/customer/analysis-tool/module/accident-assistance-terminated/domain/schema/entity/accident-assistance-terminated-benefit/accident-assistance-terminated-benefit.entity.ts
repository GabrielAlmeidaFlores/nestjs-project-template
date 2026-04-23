import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';
import { AccidentAssistanceTerminatedBenefitId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-benefit/value-object/accident-assistance-terminated-benefit-id/accident-assistance-terminated-benefit-id.value-object';

import type { AccidentAssistanceTerminatedBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-benefit/accident-assistance-terminated-benefit.entity.props.interface';

export class AccidentAssistanceTerminatedBenefitEntity extends BaseEntity<AccidentAssistanceTerminatedBenefitId> {
  @Description('Número do benefício INSS.')
  public readonly inssBenefitNumber: string;

  @Description('Data de início do benefício (DIB).')
  public readonly dib: Date | null;

  @Description('Data de cessação do benefício (DCB).')
  public readonly dcb: Date | null;

  protected readonly _type = AccidentAssistanceTerminatedBenefitEntity.name;

  public constructor(
    props: AccidentAssistanceTerminatedBenefitEntityPropsInterface,
  ) {
    super(AccidentAssistanceTerminatedBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.dib = props.dib ?? null;
    this.dcb = props.dcb ?? null;
  }
}
