import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityTerminationFamilyMemberEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/bpc-disability-termination-family-member.entity.props.interface';
import { BpcDisabilityTerminationFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/enum/bpc-disability-termination-family-member-income-type.enum';
import { BpcDisabilityTerminationFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/enum/bpc-disability-termination-family-member-kinship.enum';
import { BpcDisabilityTerminationFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/value-object/bpc-disability-termination-family-member-id/bpc-disability-termination-family-member-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityTerminationEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity';
import type { BpcDisabilityTerminationFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/bpc-disability-termination-family-member-document.entity';

export class BpcDisabilityTerminationFamilyMemberEntity extends BaseEntity<BpcDisabilityTerminationFamilyMemberId> {
  @Description('Nome completo do membro da família.')
  public readonly fullName: string;

  @Description('Data de nascimento do membro da família.')
  public readonly birthDate: Date;

  @Description('Parentesco do membro da família.')
  public readonly kinship: BpcDisabilityTerminationFamilyMemberKinshipEnum;

  @Description('Indica se o membro da família reside na mesma residência.')
  public readonly livesInSameResidence: boolean;

  @Description('Indica se o membro da família possui renda.')
  public readonly hasIncome: boolean;

  @Description('Valor da renda mensal do membro da família.')
  public readonly monthlyIncomeAmount: number | null;

  @Description('Tipo de renda do membro da família.')
  public readonly incomeType: BpcDisabilityTerminationFamilyMemberIncomeTypeEnum | null;

  @Description(
    'Indica se o membro da família possui comprovantes de despesas relevantes.',
  )
  public readonly hasExpenseProofs: boolean | null;

  @Description('Análise de BPC PcD cessado associada ao membro da família.')
  public readonly bpcDisabilityTermination: BpcDisabilityTerminationEntity;

  @Description('Documentos do membro da família.')
  public readonly bpcDisabilityTerminationFamilyMemberDocument: BpcDisabilityTerminationFamilyMemberDocumentEntity[];

  protected readonly _type = BpcDisabilityTerminationFamilyMemberEntity.name;

  public constructor(
    props: BpcDisabilityTerminationFamilyMemberEntityPropsInterface,
  ) {
    super(BpcDisabilityTerminationFamilyMemberId, props);

    this.fullName = props.fullName;
    this.birthDate = props.birthDate;
    this.kinship = props.kinship;
    this.livesInSameResidence = props.livesInSameResidence;
    this.hasIncome = props.hasIncome;
    this.monthlyIncomeAmount = props.monthlyIncomeAmount ?? null;
    this.incomeType = props.incomeType ?? null;
    this.hasExpenseProofs = props.hasExpenseProofs ?? null;
    this.bpcDisabilityTermination = props.bpcDisabilityTermination;
    this.bpcDisabilityTerminationFamilyMemberDocument =
      props.bpcDisabilityTerminationFamilyMemberDocument ?? [];
  }
}
