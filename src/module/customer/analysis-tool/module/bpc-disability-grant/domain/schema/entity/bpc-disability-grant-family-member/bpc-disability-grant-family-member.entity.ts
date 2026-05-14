import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityGrantFamilyMemberEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/bpc-disability-grant-family-member.entity.props.interface';
import { BpcDisabilityGrantFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/enum/bpc-disability-grant-family-member-income-type.enum';
import { BpcDisabilityGrantFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/enum/bpc-disability-grant-family-member-kinship.enum';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/value-object/bpc-disability-grant-family-member-id/bpc-disability-grant-family-member-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityGrantFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/bpc-disability-grant-family-member-document.entity';

export class BpcDisabilityGrantFamilyMemberEntity extends BaseEntity<BpcDisabilityGrantFamilyMemberId> {
  @Description('Nome completo do membro da famÃ­lia.')
  public readonly fullName: string;

  @Description('Data de nascimento do membro da famÃ­lia.')
  public readonly birthDate: Date;

  @Description('Parentesco do membro da famÃ­lia.')
  public readonly kinship: BpcDisabilityGrantFamilyMemberKinshipEnum;

  @Description('Indica se o membro da famÃ­lia reside na mesma residÃªncia.')
  public readonly livesInSameResidence: boolean;

  @Description('Indica se o membro da famÃ­lia possui renda.')
  public readonly hasIncome: boolean;

  @Description('Valor da renda mensal do membro da famÃ­lia.')
  public readonly monthlyIncomeAmount: number | null;

  @Description('Tipo de renda do membro da famÃ­lia.')
  public readonly incomeType: BpcDisabilityGrantFamilyMemberIncomeTypeEnum | null;

  @Description(
    'Indica se o membro da famÃ­lia possui comprovantes de despesas relevantes.',
  )
  public readonly hasExpenseProofs: boolean | null;

  @Description(
    'AnÃ¡lise de indeferimento de BPC PcD associada ao membro da famÃ­lia.',
  )
  public readonly BpcDisabilityGrantId: BpcDisabilityGrantId;

  @Description('Documentos do membro da famÃ­lia.')
  public readonly BpcDisabilityGrantFamilyMemberDocument: BpcDisabilityGrantFamilyMemberDocumentEntity[];

  protected readonly _type = BpcDisabilityGrantFamilyMemberEntity.name;

  public constructor(
    props: BpcDisabilityGrantFamilyMemberEntityPropsInterface,
  ) {
    super(BpcDisabilityGrantFamilyMemberId, props);

    this.fullName = props.fullName;
    this.birthDate = props.birthDate;
    this.kinship = props.kinship;
    this.livesInSameResidence = props.livesInSameResidence;
    this.hasIncome = props.hasIncome;
    this.monthlyIncomeAmount = props.monthlyIncomeAmount ?? null;
    this.incomeType = props.incomeType ?? null;
    this.hasExpenseProofs = props.hasExpenseProofs ?? null;
    this.BpcDisabilityGrantId = props.BpcDisabilityGrantId;
    this.BpcDisabilityGrantFamilyMemberDocument =
      props.BpcDisabilityGrantFamilyMemberDocument ?? [];
  }
}
