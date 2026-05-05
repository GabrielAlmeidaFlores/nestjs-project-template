import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialRetirementRejectionDocumentId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-document/value-object/special-retirement-rejection-document-id.value-object';

import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-document/special-retirement-rejection-document.entity.props.interface';

export class SpecialRetirementRejectionDocumentEntity extends BaseEntity<SpecialRetirementRejectionDocumentId> {
  public readonly fileName: string | null;
  public readonly type: string | null;
  public readonly specialRetirementRejectionId: SpecialRetirementRejectionId | null;

  protected readonly _type = SpecialRetirementRejectionDocumentEntity.name;

  public constructor(
    props: SpecialRetirementRejectionDocumentEntityPropsInterface,
  ) {
    super(SpecialRetirementRejectionDocumentId, props);
    this.fileName = props.fileName ?? null;
    this.type = props.type ?? null;
    this.specialRetirementRejectionId =
      props.specialRetirementRejectionId ?? null;
  }
}
