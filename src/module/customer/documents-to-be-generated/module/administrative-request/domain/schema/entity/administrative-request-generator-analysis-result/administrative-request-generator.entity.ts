import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AdministrativeRequestGeneratorEntityPropsInterface } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/administrative-request-generator.props.interface';
import { AdministrativeRequestGeneratorId } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/value-object/administrative-request-generator-id/administrative-request-generator-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class AdministrativeRequestGeneratorEntity extends BaseEntity<AdministrativeRequestGeneratorId> {
  @Description('Análise completa do gerador de requerimento administrativo.')
  public readonly administrativeRequestGeneratorCompleteAnalysis: string | null;

  @Description('Análise simplificada do gerador de requerimento administrativo.')
  public readonly administrativeRequestGeneratorSimplifiedAnalysis: string | null;

  protected readonly _type =
    AdministrativeRequestGeneratorEntity.name;

  public constructor(
    props: AdministrativeRequestGeneratorEntityPropsInterface,
  ) {
    super(AdministrativeRequestGeneratorId, props);

    this.administrativeRequestGeneratorCompleteAnalysis =
      props.administrativeRequestGeneratorCompleteAnalysis ?? null;
    this.administrativeRequestGeneratorSimplifiedAnalysis =
      props.administrativeRequestGeneratorSimplifiedAnalysis ?? null;
  }
}
