import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/enum/per-capita-income-for-bpc-analysis-family-member-income-type.enum';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/enum/per-capita-income-for-bpc-analysis-family-member-kinship.enum';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberEntityPropsInterface } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.entity.props.interface';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/value-object/per-capita-income-for-bpc-analysis-family-member-id/per-capita-income-for-bpc-analysis-family-member-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class PerCapitaIncomeForBpcAnalysisFamilyMemberEntity extends BaseEntity<PerCapitaIncomeForBpcAnalysisFamilyMemberId> {
  @Description('Nome completo do membro da família.')
  public readonly fullName: string;

  @Description('Data de nascimento do membro da família.')
  public readonly birthDate: Date;

  @Description('Parentesco do membro da família.')
  public readonly kinship: PerCapitaIncomeForBpcAnalysisFamilyMemberKinshipEnum;

  @Description('Indica se o membro da família reside na mesma residência.')
  public readonly livesInSameResidence: boolean;

  @Description('Indica se o membro da família possui renda.')
  public readonly hasIncome: boolean;

  @Description('Valor da renda mensal do membro da família.')
  public readonly monthlyIncomeAmount: number | null;

  @Description('Tipo de renda do membro da família.')
  public readonly incomeType: PerCapitaIncomeForBpcAnalysisFamilyMemberIncomeTypeEnum | null;

  @Description('Análise de renda per capita para BPC associada.')
  public readonly perCapitaIncomeForBpcAnalysis: PerCapitaIncomeForBpcAnalysisEntity;

  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisFamilyMemberEntity.name;

  public constructor(
    props: PerCapitaIncomeForBpcAnalysisFamilyMemberEntityPropsInterface,
  ) {
    super(PerCapitaIncomeForBpcAnalysisFamilyMemberId, props);

    this.fullName = props.fullName;
    this.birthDate = props.birthDate;
    this.kinship = props.kinship;
    this.livesInSameResidence = props.livesInSameResidence;
    this.hasIncome = props.hasIncome;
    this.monthlyIncomeAmount = props.monthlyIncomeAmount ?? null;
    this.incomeType = props.incomeType ?? null;
    this.perCapitaIncomeForBpcAnalysis = props.perCapitaIncomeForBpcAnalysis;
  }
}
