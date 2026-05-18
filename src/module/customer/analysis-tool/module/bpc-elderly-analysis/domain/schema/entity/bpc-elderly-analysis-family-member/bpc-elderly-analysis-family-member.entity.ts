import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcElderlyAnalysisFamilyMemberEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/bpc-elderly-analysis-family-member.entity.props.interface';
import { BpcElderlyAnalysisFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/enum/bpc-elderly-analysis-family-member-income-type.enum';
import { BpcElderlyAnalysisFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/enum/bpc-elderly-analysis-family-member-kinship.enum';
import { BpcElderlyAnalysisFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/value-object/bpc-elderly-analysis-family-member-id/bpc-elderly-analysis-family-member-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';
import type { BpcElderlyAnalysisFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/bpc-elderly-analysis-family-member-document.entity';

export class BpcElderlyAnalysisFamilyMemberEntity extends BaseEntity<BpcElderlyAnalysisFamilyMemberId> {
  @Description('Nome completo do membro da família.')
  public readonly fullName: string;

  @Description('Data de nascimento do membro da família.')
  public readonly birthDate: Date;

  @Description('Parentesco do membro da família.')
  public readonly kinship: BpcElderlyAnalysisFamilyMemberKinshipEnum;

  @Description('Indica se o membro da família reside na mesma residência.')
  public readonly livesInSameResidence: boolean;

  @Description('Indica se o membro da família possui renda.')
  public readonly hasIncome: boolean;

  @Description('Valor da renda mensal do membro da família.')
  public readonly monthlyIncomeAmount: number | null;

  @Description('Tipo de renda do membro da família.')
  public readonly incomeType: BpcElderlyAnalysisFamilyMemberIncomeTypeEnum | null;

  @Description('Análise de BPC ao Idoso associada ao membro da família.')
  public readonly bpcElderlyAnalysis: BpcElderlyAnalysisEntity;

  @Description('Documentos do membro da família.')
  public readonly bpcElderlyAnalysisFamilyMemberDocument: BpcElderlyAnalysisFamilyMemberDocumentEntity[];

  protected readonly _type = BpcElderlyAnalysisFamilyMemberEntity.name;

  public constructor(
    props: BpcElderlyAnalysisFamilyMemberEntityPropsInterface,
  ) {
    super(BpcElderlyAnalysisFamilyMemberId, props);

    this.fullName = props.fullName;
    this.birthDate = props.birthDate;
    this.kinship = props.kinship;
    this.livesInSameResidence = props.livesInSameResidence;
    this.hasIncome = props.hasIncome;
    this.monthlyIncomeAmount = props.monthlyIncomeAmount ?? null;
    this.incomeType = props.incomeType ?? null;
    this.bpcElderlyAnalysis = props.bpcElderlyAnalysis;
    this.bpcElderlyAnalysisFamilyMemberDocument =
      props.bpcElderlyAnalysisFamilyMemberDocument ?? [];
  }
}
