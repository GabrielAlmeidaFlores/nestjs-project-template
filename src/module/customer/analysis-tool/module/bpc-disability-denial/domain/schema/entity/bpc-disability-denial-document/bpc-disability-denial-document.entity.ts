import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityDenialDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/bpc-disability-denial-document.entity.props.interface';
import { BpcDisabilityDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/enum/bpc-disability-denial-document-type.enum';
import { BpcDisabilityDenialDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/value-object/bpc-disability-denial-document-id/bpc-disability-denial-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityDenialEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity';

export class BpcDisabilityDenialDocumentEntity extends BaseEntity<BpcDisabilityDenialDocumentId> {
  @Description('Documento associado à análise de BPC ao Idoso.')
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: BpcDisabilityDenialDocumentTypeEnum;

  @Description('Análise de BPC ao Idoso associada ao documento.')
  public readonly bpcDisabilityDenial: BpcDisabilityDenialEntity;

  protected readonly _type = BpcDisabilityDenialDocumentEntity.name;

  public constructor(props: BpcDisabilityDenialDocumentEntityPropsInterface) {
    super(BpcDisabilityDenialDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.bpcDisabilityDenial = props.bpcDisabilityDenial;
  }
}
