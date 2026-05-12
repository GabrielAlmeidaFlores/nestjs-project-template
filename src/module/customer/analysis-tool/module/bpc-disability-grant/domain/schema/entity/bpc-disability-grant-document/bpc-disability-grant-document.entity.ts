import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityGrantDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/bpc-disability-grant-document.entity.props.interface';
import { BpcDisabilityGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/enum/bpc-disability-grant-document-type.enum';
import { BpcDisabilityGrantDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/value-object/bpc-disability-grant-document-id/bpc-disability-grant-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityGrantEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/bpc-disability-grant.entity';

export class BpcDisabilityGrantDocumentEntity extends BaseEntity<BpcDisabilityGrantDocumentId> {
  @Description('Documento associado Ã  anÃ¡lise de BPC ao Idoso.')
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: BpcDisabilityGrantDocumentTypeEnum;

  @Description('AnÃ¡lise de BPC ao Idoso associada ao documento.')
  public readonly BpcDisabilityGrant: BpcDisabilityGrantEntity;

  protected readonly _type = BpcDisabilityGrantDocumentEntity.name;

  public constructor(props: BpcDisabilityGrantDocumentEntityPropsInterface) {
    super(BpcDisabilityGrantDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.BpcDisabilityGrant = props.BpcDisabilityGrant;
  }
}
