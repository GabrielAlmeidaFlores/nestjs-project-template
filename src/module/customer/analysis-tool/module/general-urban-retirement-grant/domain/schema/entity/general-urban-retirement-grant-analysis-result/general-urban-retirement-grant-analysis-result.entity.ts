import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/enum/analysis-type.enum';
import { GeneralUrbanRetirementGrantAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/general-urban-retirement-grant-analysis-result.entity.props.interface';
import { GeneralUrbanRetirementGrantAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/value-object/general-urban-retirement-grant-analysis-result-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';

export class GeneralUrbanRetirementGrantAnalysisResultEntity extends BaseEntity<GeneralUrbanRetirementGrantAnalysisResultId> {
  @Description('Concessão de aposentadoria urbana associada ao resultado de análise.')
  public readonly generalUrbanRetirementGrant: GeneralUrbanRetirementGrantEntity;

  @Description('Tipo de análise realizada.')
  public readonly analysisType: AnalysisTypeEnum | null;

  @Description('Resposta da análise.')
  public readonly response: string;

  protected readonly _type =
    GeneralUrbanRetirementGrantAnalysisResultEntity.name;

  public constructor(
    props: GeneralUrbanRetirementGrantAnalysisResultEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementGrantAnalysisResultId, props);

    this.generalUrbanRetirementGrant = props.generalUrbanRetirementGrant;
    this.analysisType = props.analysisType ?? null;
    this.response = props.response;
  }
}
