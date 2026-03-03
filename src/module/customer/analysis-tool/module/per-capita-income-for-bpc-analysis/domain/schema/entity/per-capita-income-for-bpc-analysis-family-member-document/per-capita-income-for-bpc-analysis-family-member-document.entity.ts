import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/enum/per-capita-income-for-bpc-analysis-family-member-document-type.enum';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/per-capita-income-for-bpc-analysis-family-member-document.entity.props.interface';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/value-object/per-capita-income-for-bpc-analysis-family-member-document-id/per-capita-income-for-bpc-analysis-family-member-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity extends BaseEntity<PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentId> {
  @Description('Documento do membro da família.')
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeEnum;

  @Description('Membro da família associado ao documento.')
  public readonly perCapitaIncomeForBpcAnalysisFamilyMember: PerCapitaIncomeForBpcAnalysisFamilyMemberEntity;

  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity.name;

  public constructor(
    props: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntityPropsInterface,
  ) {
    super(PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.perCapitaIncomeForBpcAnalysisFamilyMember =
      props.perCapitaIncomeForBpcAnalysisFamilyMember;
  }
}
