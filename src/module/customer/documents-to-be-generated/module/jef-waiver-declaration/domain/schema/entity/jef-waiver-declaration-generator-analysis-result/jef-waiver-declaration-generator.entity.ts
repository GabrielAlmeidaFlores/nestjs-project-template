import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { JefWaiverDeclarationGeneratorEntityPropsInterface } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/jef-waiver-declaration-generator.props.interface';
import { JefWaiverDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/value-object/jef-waiver-declaration-generator-id/jef-waiver-declaration-generator-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class JefWaiverDeclarationGeneratorEntity extends BaseEntity<JefWaiverDeclarationGeneratorId> {
  @Description(
    'Análise completa do gerador de declaração de renúncia ao excedente do JEF.',
  )
  public readonly jefWaiverDeclarationGeneratorCompleteAnalysis: string | null;

  protected readonly _type = JefWaiverDeclarationGeneratorEntity.name;

  public constructor(props: JefWaiverDeclarationGeneratorEntityPropsInterface) {
    super(JefWaiverDeclarationGeneratorId, props);
    this.jefWaiverDeclarationGeneratorCompleteAnalysis =
      props.jefWaiverDeclarationGeneratorCompleteAnalysis ?? null;
  }
}
