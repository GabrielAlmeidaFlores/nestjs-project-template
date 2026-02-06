import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import type { SpecialActivityDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-document/enum/special-activity-document-type.enum';
import type { SpecialActivityDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-document/value-object/special-activity-document-id.value-object';

export interface SpecialActivityDocumentEntityPropsInterface extends BaseEntityPropsInterface<SpecialActivityDocumentId> {
  document: string;
  type: SpecialActivityDocumentTypeEnum;
  specialActivity: SpecialActivityEntity;
}
