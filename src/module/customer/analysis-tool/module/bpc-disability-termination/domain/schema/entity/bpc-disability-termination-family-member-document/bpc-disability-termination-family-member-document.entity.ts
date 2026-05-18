import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityTerminationFamilyMemberDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/bpc-disability-termination-family-member-document.entity.props.interface';
import { BpcDisabilityTerminationFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/enum/bpc-disability-termination-family-member-document-type.enum';
import { BpcDisabilityTerminationFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/value-object/bpc-disability-termination-family-member-document-id/bpc-disability-termination-family-member-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityTerminationFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/bpc-disability-termination-family-member.entity';

export class BpcDisabilityTerminationFamilyMemberDocumentEntity extends BaseEntity<BpcDisabilityTerminationFamilyMemberDocumentId> {
  @Description('Documento do membro da família.')
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: BpcDisabilityTerminationFamilyMemberDocumentTypeEnum;

  @Description('Membro da família associado ao documento.')
  public readonly bpcDisabilityTerminationFamilyMember: BpcDisabilityTerminationFamilyMemberEntity;

  protected readonly _type =
    BpcDisabilityTerminationFamilyMemberDocumentEntity.name;

  public constructor(
    props: BpcDisabilityTerminationFamilyMemberDocumentEntityPropsInterface,
  ) {
    super(BpcDisabilityTerminationFamilyMemberDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.bpcDisabilityTerminationFamilyMember =
      props.bpcDisabilityTerminationFamilyMember;
  }
}
