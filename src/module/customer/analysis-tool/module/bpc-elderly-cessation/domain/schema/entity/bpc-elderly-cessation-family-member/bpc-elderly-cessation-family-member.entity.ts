import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcElderlyCessationFamilyMemberEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/bpc-elderly-cessation-family-member.entity.props.interface';
import { BpcElderlyCessationFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/enum/bpc-elderly-cessation-family-member-income-type.enum';
import { BpcElderlyCessationFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/enum/bpc-elderly-cessation-family-member-kinship.enum';
import { BpcElderlyCessationFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/value-object/bpc-elderly-cessation-family-member-id/bpc-elderly-cessation-family-member-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';
import type { BpcElderlyCessationFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/bpc-elderly-cessation-family-member-document.entity';

export class BpcElderlyCessationFamilyMemberEntity extends BaseEntity<BpcElderlyCessationFamilyMemberId> {
  @Description('Nome completo do membro da família.')
  public readonly fullName: string;

  @Description('Data de nascimento do membro da família.')
  public readonly birthDate: Date;

  @Description('Parentesco do membro da família.')
  public readonly kinship: BpcElderlyCessationFamilyMemberKinshipEnum;

  @Description('Indica se o membro da família reside na mesma residência.')
  public readonly livesInSameResidence: boolean;

  @Description('Indica se o membro da família possui renda.')
  public readonly hasIncome: boolean;

  @Description('Valor da renda mensal do membro da família.')
  public readonly monthlyIncomeAmount: number | null;

  @Description('Tipo de renda do membro da família.')
  public readonly incomeType: BpcElderlyCessationFamilyMemberIncomeTypeEnum | null;

  @Description(
    'Indica se o membro da família possui comprovantes de despesas relevantes.',
  )
  public readonly hasExpenseProofs: boolean | null;

  @Description(
    'Análise de cessação de BPC ao Idoso associada ao membro da família.',
  )
  public readonly bpcElderlyCessation: BpcElderlyCessationEntity;

  @Description('Documentos do membro da família.')
  public readonly bpcElderlyCessationFamilyMemberDocument: BpcElderlyCessationFamilyMemberDocumentEntity[];

  protected readonly _type = BpcElderlyCessationFamilyMemberEntity.name;

  public constructor(
    props: BpcElderlyCessationFamilyMemberEntityPropsInterface,
  ) {
    super(BpcElderlyCessationFamilyMemberId, props);

    this.fullName = props.fullName;
    this.birthDate = props.birthDate;
    this.kinship = props.kinship;
    this.livesInSameResidence = props.livesInSameResidence;
    this.hasIncome = props.hasIncome;
    this.monthlyIncomeAmount = props.monthlyIncomeAmount ?? null;
    this.incomeType = props.incomeType ?? null;
    this.hasExpenseProofs = props.hasExpenseProofs ?? null;
    this.bpcElderlyCessation = props.bpcElderlyCessation;
    this.bpcElderlyCessationFamilyMemberDocument =
      props.bpcElderlyCessationFamilyMemberDocument ?? [];
  }
}
