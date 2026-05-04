import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityTerminationDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/bpc-disability-termination-document.entity.props.interface';
import { BpcDisabilityTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/enum/bpc-disability-termination-document-type.enum';
import { BpcDisabilityTerminationDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/value-object/bpc-disability-termination-document-id/bpc-disability-termination-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcDisabilityTerminationEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity';

export class BpcDisabilityTerminationDocumentEntity extends BaseEntity<BpcDisabilityTerminationDocumentId> {
  @Description('Documento associado à análise de BPC PcD cessado.')
  public readonly document: string;

  @Description('Nome do documento.')
  public readonly name: string;

  @Description('Tipo de documento.')
  public readonly type: BpcDisabilityTerminationDocumentTypeEnum;

  @Description('Análise de BPC PcD cessado associada ao documento.')
  public readonly bpcDisabilityTermination: BpcDisabilityTerminationEntity;

  protected readonly _type = BpcDisabilityTerminationDocumentEntity.name;

  public constructor(
    props: BpcDisabilityTerminationDocumentEntityPropsInterface,
  ) {
    super(BpcDisabilityTerminationDocumentId, props);

    this.document = props.document;
    this.name = props.name;
    this.type = props.type;
    this.bpcDisabilityTermination = props.bpcDisabilityTermination;
  }
}
