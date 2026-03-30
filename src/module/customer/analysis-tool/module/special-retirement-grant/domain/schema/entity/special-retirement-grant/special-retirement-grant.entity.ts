import { SpecialRetirementGrantBenefitEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-benefit/special-retirement-grant-benefit.entity';
import { SpecialRetirementGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-legal-proceeding/special-retirement-grant-legal-proceeding.entity';

import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementGrantEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity.props.interface';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/special-retirement-grant-document.entity';
import { SpecialRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/special-retirement-grant-result.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialRetirementGrantEntity extends BaseEntity<SpecialRetirementGrantId> {
  @Description('Nome informado para identificação da análise.')
  public readonly name: string;

  @Description(
    'Indica se o cliente trabalhou com exposição a agentes nocivos ou em condições especiais.',
  )
  public readonly specialActivity: boolean;

  @Description('Documento CNIS utilizado na análise.')
  public readonly cnisDocument: string;

  @Description('Resultado da análise.')
  public readonly specialRetirementGrantResult: SpecialRetirementGrantResultEntity | null;

  @Description('Documentos anexados à análise (exceto CNIS).')
  public readonly specialRetirementGrantDocument: SpecialRetirementGrantDocumentEntity[];

  @Description('Benefícios INSS informados pelo cliente.')
  public readonly specialRetirementGrantBenefit: SpecialRetirementGrantBenefitEntity[];

  @Description('Processos informados pelo cliente.')
  public readonly specialRetirementGrantLegalProceeding: SpecialRetirementGrantLegalProceedingEntity[];

  protected readonly _type = SpecialRetirementGrantEntity.name;

  public constructor(props: SpecialRetirementGrantEntityPropsInterface) {
    super(SpecialRetirementGrantId, props);

    this.name = props.name;
    this.specialActivity = props.specialActivity;
    this.cnisDocument = props.cnisDocument;
    this.specialRetirementGrantResult =
      props.specialRetirementGrantResult ?? null;
    this.specialRetirementGrantDocument =
      props.specialRetirementGrantDocument ?? [];
    this.specialRetirementGrantBenefit =
      props.specialRetirementGrantBenefit ?? [];
    this.specialRetirementGrantLegalProceeding =
      props.specialRetirementGrantLegalProceeding ?? [];
  }
}
