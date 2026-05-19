import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PowerOfAttorneyGeneratorEntityPropsInterface } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/power-of-attorney-generator.props.interface';
import { PowerOfAttorneyGeneratorId } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/value-object/power-of-attorney-generator-id/power-of-attorney-generator-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class PowerOfAttorneyGeneratorEntity extends BaseEntity<PowerOfAttorneyGeneratorId> {
  @Description('Análise completa do gerador de procuração.')
  public readonly powerOfAttorneyGeneratorCompleteAnalysis: string | null;

  protected readonly _type = PowerOfAttorneyGeneratorEntity.name;

  public constructor(props: PowerOfAttorneyGeneratorEntityPropsInterface) {
    super(PowerOfAttorneyGeneratorId, props);
    this.powerOfAttorneyGeneratorCompleteAnalysis =
      props.powerOfAttorneyGeneratorCompleteAnalysis ?? null;
  }
}
