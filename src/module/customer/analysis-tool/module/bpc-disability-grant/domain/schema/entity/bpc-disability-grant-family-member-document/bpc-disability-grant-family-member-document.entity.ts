import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityGrantFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/value-object/bpc-disability-grant-family-member-id/bpc-disability-grant-family-member-id.value-object';
import { BpcDisabilityGrantFamilyMemberDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/bpc-disability-grant-family-member-document.entity.props.interface';
import { BpcDisabilityGrantFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/enum/bpc-disability-grant-family-member-document-type.enum';
import { BpcDisabilityGrantFamilyMemberDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/value-object/bpc-disability-grant-family-member-document-id/bpc-disability-grant-family-member-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class BpcDisabilityGrantFamilyMemberDocumentEntity extends BaseEntity<BpcDisabilityGrantFamilyMemberDocumentId> {
  @Description('Documento do membro da famÃ­lia.')
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: BpcDisabilityGrantFamilyMemberDocumentTypeEnum;

  @Description('Membro da famÃ­lia associado ao documento.')
  public readonly BpcDisabilityGrantFamilyMemberId: BpcDisabilityGrantFamilyMemberId;

  protected readonly _type = BpcDisabilityGrantFamilyMemberDocumentEntity.name;

  public constructor(
    props: BpcDisabilityGrantFamilyMemberDocumentEntityPropsInterface,
  ) {
    super(BpcDisabilityGrantFamilyMemberDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.BpcDisabilityGrantFamilyMemberId =
      props.BpcDisabilityGrantFamilyMemberId;
  }
}
