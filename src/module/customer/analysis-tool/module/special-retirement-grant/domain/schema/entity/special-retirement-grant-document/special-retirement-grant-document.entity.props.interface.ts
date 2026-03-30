import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/enum/special-retirement-grant-document-type.enum';
import type { SpecialRetirementGrantDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/value-object/special-retirement-grant-document-id/special-retirement-grant-document-id.value-object';

export interface SpecialRetirementGrantDocumentEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementGrantDocumentId> {
  document: string;
  type: SpecialRetirementGrantDocumentTypeEnum;
}
