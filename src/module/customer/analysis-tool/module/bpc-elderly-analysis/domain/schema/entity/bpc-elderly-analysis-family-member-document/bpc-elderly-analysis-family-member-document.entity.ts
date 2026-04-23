import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcElderlyAnalysisFamilyMemberDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/bpc-elderly-analysis-family-member-document.entity.props.interface';
import { BpcElderlyAnalysisFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/enum/bpc-elderly-analysis-family-member-document-type.enum';
import { BpcElderlyAnalysisFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/value-object/bpc-elderly-analysis-family-member-document-id/bpc-elderly-analysis-family-member-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcElderlyAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/bpc-elderly-analysis-family-member.entity';

export class BpcElderlyAnalysisFamilyMemberDocumentEntity extends BaseEntity<BpcElderlyAnalysisFamilyMemberDocumentId> {
  @Description('Documento do membro da família.')
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: BpcElderlyAnalysisFamilyMemberDocumentTypeEnum;

  @Description('Membro da família associado ao documento.')
  public readonly bpcElderlyAnalysisFamilyMember: BpcElderlyAnalysisFamilyMemberEntity;

  protected readonly _type = BpcElderlyAnalysisFamilyMemberDocumentEntity.name;

  public constructor(
    props: BpcElderlyAnalysisFamilyMemberDocumentEntityPropsInterface,
  ) {
    super(BpcElderlyAnalysisFamilyMemberDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.bpcElderlyAnalysisFamilyMember = props.bpcElderlyAnalysisFamilyMember;
  }
}
