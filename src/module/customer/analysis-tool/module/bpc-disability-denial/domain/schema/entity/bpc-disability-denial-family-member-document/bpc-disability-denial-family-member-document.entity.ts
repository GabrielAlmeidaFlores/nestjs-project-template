import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityDenialFamilyMemberDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/bpc-disability-denial-family-member-document.entity.props.interface';
import { BpcDisabilityDenialFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/enum/bpc-disability-denial-family-member-document-type.enum';
import { BpcDisabilityDenialFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/value-object/bpc-disability-denial-family-member-document-id/bpc-disability-denial-family-member-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityDenialFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/bpc-disability-denial-family-member.entity';

export class BpcDisabilityDenialFamilyMemberDocumentEntity extends BaseEntity<BpcDisabilityDenialFamilyMemberDocumentId> {
  @Description('Documento do membro da família.')
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: BpcDisabilityDenialFamilyMemberDocumentTypeEnum;

  @Description('Membro da família associado ao documento.')
  public readonly bpcDisabilityDenialFamilyMember: BpcDisabilityDenialFamilyMemberEntity;

  protected readonly _type = BpcDisabilityDenialFamilyMemberDocumentEntity.name;

  public constructor(
    props: BpcDisabilityDenialFamilyMemberDocumentEntityPropsInterface,
  ) {
    super(BpcDisabilityDenialFamilyMemberDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.bpcDisabilityDenialFamilyMember =
      props.bpcDisabilityDenialFamilyMember;
  }
}
