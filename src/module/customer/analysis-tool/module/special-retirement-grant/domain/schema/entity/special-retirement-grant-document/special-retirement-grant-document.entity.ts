import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/enum/special-retirement-grant-document-type.enum';
import { SpecialRetirementGrantDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/special-retirement-grant-document.entity.props.interface';
import { SpecialRetirementGrantDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/value-object/special-retirement-grant-document-id/special-retirement-grant-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialRetirementGrantDocumentEntity extends BaseEntity<SpecialRetirementGrantDocumentId> {
  @Description('Documento anexado ao fluxo.')
  public readonly document: string;

  @Description('Tipo do documento.')
  public readonly type: SpecialRetirementGrantDocumentTypeEnum;

  protected readonly _type = SpecialRetirementGrantDocumentEntity.name;

  public constructor(
    props: SpecialRetirementGrantDocumentEntityPropsInterface,
  ) {
    super(SpecialRetirementGrantDocumentId, props);
    this.document = props.document;
    this.type = props.type;
  }
}
