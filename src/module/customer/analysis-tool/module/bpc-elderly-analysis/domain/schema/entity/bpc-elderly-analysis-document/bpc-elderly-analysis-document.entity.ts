import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcElderlyAnalysisDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/bpc-elderly-analysis-document.entity.props.interface';
import { BpcElderlyAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/enum/bpc-elderly-analysis-document-type.enum';
import { BpcElderlyAnalysisDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/value-object/bpc-elderly-analysis-document-id/bpc-elderly-analysis-document-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';

export class BpcElderlyAnalysisDocumentEntity extends BaseEntity<BpcElderlyAnalysisDocumentId> {
  @Description('Documento associado à análise de BPC ao Idoso.')
  public readonly document: string;

  @Description('Tipo de documento.')
  public readonly type: BpcElderlyAnalysisDocumentTypeEnum;

  @Description('Análise de BPC ao Idoso associada ao documento.')
  public readonly bpcElderlyAnalysis: BpcElderlyAnalysisEntity;

  protected readonly _type = BpcElderlyAnalysisDocumentEntity.name;

  public constructor(props: BpcElderlyAnalysisDocumentEntityPropsInterface) {
    super(BpcElderlyAnalysisDocumentId, props);

    this.document = props.document;
    this.type = props.type;
    this.bpcElderlyAnalysis = props.bpcElderlyAnalysis;
  }
}
