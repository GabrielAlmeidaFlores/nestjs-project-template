import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcElderlyCessationFamilyMemberDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/bpc-elderly-cessation-family-member-document.entity.props.interface';
import { BpcElderlyCessationFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/enum/bpc-elderly-cessation-family-member-document-type.enum';
import { BpcElderlyCessationFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/value-object/bpc-elderly-cessation-family-member-document-id/bpc-elderly-cessation-family-member-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcElderlyCessationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/bpc-elderly-cessation-family-member.entity';

export class BpcElderlyCessationFamilyMemberDocumentEntity extends BaseEntity<BpcElderlyCessationFamilyMemberDocumentId> {
  @Description('Documento do membro da família.')
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: BpcElderlyCessationFamilyMemberDocumentTypeEnum;

  @Description('Membro da família associado ao documento.')
  public readonly bpcElderlyCessationFamilyMember: BpcElderlyCessationFamilyMemberEntity;

  protected readonly _type = BpcElderlyCessationFamilyMemberDocumentEntity.name;

  public constructor(
    props: BpcElderlyCessationFamilyMemberDocumentEntityPropsInterface,
  ) {
    super(BpcElderlyCessationFamilyMemberDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.bpcElderlyCessationFamilyMember =
      props.bpcElderlyCessationFamilyMember;
  }
}
