import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcElderlyCessationDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/bpc-elderly-cessation-document.entity.props.interface';
import { BpcElderlyCessationDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/enum/bpc-elderly-cessation-document-type.enum';
import { BpcElderlyCessationDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/value-object/bpc-elderly-cessation-document-id/bpc-elderly-cessation-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';

export class BpcElderlyCessationDocumentEntity extends BaseEntity<BpcElderlyCessationDocumentId> {
  @Description('Documento associado à análise de BPC ao Idoso.')
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: BpcElderlyCessationDocumentTypeEnum;

  @Description('Análise de BPC ao Idoso associada ao documento.')
  public readonly bpcElderlyCessation: BpcElderlyCessationEntity;

  protected readonly _type = BpcElderlyCessationDocumentEntity.name;

  public constructor(props: BpcElderlyCessationDocumentEntityPropsInterface) {
    super(BpcElderlyCessationDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.bpcElderlyCessation = props.bpcElderlyCessation;
  }
}
