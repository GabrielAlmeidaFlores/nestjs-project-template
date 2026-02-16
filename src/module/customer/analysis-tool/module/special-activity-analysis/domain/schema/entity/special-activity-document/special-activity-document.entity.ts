import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/special-activity-entity';
import { SpecialActivityDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-document/enum/special-activity-document-type.enum';
import { SpecialActivityDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-document/special-activity-document-entity.props.interface';
import { SpecialActivityDocumentId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-document/value-object/special-activity-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialActivityDocumentEntity extends BaseEntity<SpecialActivityDocumentId> {
  @Description('Caminho do documento no bucket')
  public readonly document: string;

  @Description('Tipo do documento (CTPS ou PPP)')
  public readonly type: SpecialActivityDocumentTypeEnum;

  @Description('Atividade especial relacionada')
  public readonly specialActivity: SpecialActivityEntity;

  protected readonly _type = SpecialActivityDocumentEntity.name;

  public constructor(props: SpecialActivityDocumentEntityPropsInterface) {
    super(SpecialActivityDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.specialActivity = props.specialActivity;
  }
}
