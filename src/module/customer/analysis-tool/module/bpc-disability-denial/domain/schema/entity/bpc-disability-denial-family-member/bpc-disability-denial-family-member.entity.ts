import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityDenialFamilyMemberEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/bpc-disability-denial-family-member.entity.props.interface';
import { BpcDisabilityDenialFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/enum/bpc-disability-denial-family-member-income-type.enum';
import { BpcDisabilityDenialFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/enum/bpc-disability-denial-family-member-kinship.enum';
import { BpcDisabilityDenialFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/value-object/bpc-disability-denial-family-member-id/bpc-disability-denial-family-member-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityDenialEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity';
import type { BpcDisabilityDenialFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/bpc-disability-denial-family-member-document.entity';

export class BpcDisabilityDenialFamilyMemberEntity extends BaseEntity<BpcDisabilityDenialFamilyMemberId> {
  @Description('Nome completo do membro da família.')
  public readonly fullName: string;

  @Description('Data de nascimento do membro da família.')
  public readonly birthDate: Date;

  @Description('Parentesco do membro da família.')
  public readonly kinship: BpcDisabilityDenialFamilyMemberKinshipEnum;

  @Description('Indica se o membro da família reside na mesma residência.')
  public readonly livesInSameResidence: boolean;

  @Description('Indica se o membro da família possui renda.')
  public readonly hasIncome: boolean;

  @Description('Valor da renda mensal do membro da família.')
  public readonly monthlyIncomeAmount: number | null;

  @Description('Tipo de renda do membro da família.')
  public readonly incomeType: BpcDisabilityDenialFamilyMemberIncomeTypeEnum | null;

  @Description(
    'Indica se o membro da família possui comprovantes de despesas relevantes.',
  )
  public readonly hasExpenseProofs: boolean | null;

  @Description(
    'Análise de indeferimento de BPC PcD associada ao membro da família.',
  )
  public readonly bpcDisabilityDenial: BpcDisabilityDenialEntity;

  @Description('Documentos do membro da família.')
  public readonly bpcDisabilityDenialFamilyMemberDocument: BpcDisabilityDenialFamilyMemberDocumentEntity[];

  protected readonly _type = BpcDisabilityDenialFamilyMemberEntity.name;

  public constructor(
    props: BpcDisabilityDenialFamilyMemberEntityPropsInterface,
  ) {
    super(BpcDisabilityDenialFamilyMemberId, props);

    this.fullName = props.fullName;
    this.birthDate = props.birthDate;
    this.kinship = props.kinship;
    this.livesInSameResidence = props.livesInSameResidence;
    this.hasIncome = props.hasIncome;
    this.monthlyIncomeAmount = props.monthlyIncomeAmount ?? null;
    this.incomeType = props.incomeType ?? null;
    this.hasExpenseProofs = props.hasExpenseProofs ?? null;
    this.bpcDisabilityDenial = props.bpcDisabilityDenial;
    this.bpcDisabilityDenialFamilyMemberDocument =
      props.bpcDisabilityDenialFamilyMemberDocument ?? [];
  }
}
