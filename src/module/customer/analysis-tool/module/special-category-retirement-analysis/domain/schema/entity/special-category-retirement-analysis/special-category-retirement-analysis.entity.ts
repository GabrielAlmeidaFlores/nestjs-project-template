import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { InvalidPublicServiceStateAbbreviationError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/invalid-public-service-state-abbreviation.error';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { RetirementAnalysisObjectiveTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/enum/retirement-analysis-objective-type.enum';
import type { SpecialCategoryRetirementAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/special-category-retirement-analysis.entity.props.interface';

export class SpecialCategoryRetirementAnalysisEntity extends BaseEntity<SpecialCategoryRetirementAnalysisId> {
  @Description('ID do cliente da ferramenta de análise vinculado à análise.')
  public readonly analysisToolClientId: AnalysisToolClientId;

  @Description(
    'Nome personalizado definido pelo usuário para identificar a análise.',
  )
  public readonly analysisCustomName: string | null;

  @Description(
    'Tipo de objetivo da análise de aposentadoria por categoria especial.',
  )
  public readonly retirementAnalysisObjectiveType: RetirementAnalysisObjectiveTypeEnum | null;

  @Description('Nome do órgão público federal vinculado ao período de serviço.')
  public readonly publicServiceFederativeEntityName: string | null;

  @Description('Sigla do estado onde o serviço público foi prestado.')
  public readonly publicServiceStateAbbreviation: string | null;

  @Description('Indica se o segurado confirmou exposição a agentes nocivos.')
  public readonly hasConfirmedExposureToHarmfulAgents: boolean;

  protected readonly _type = SpecialCategoryRetirementAnalysisEntity.name;

  public constructor(
    props: SpecialCategoryRetirementAnalysisEntityPropsInterface,
  ) {
    if (typeof props.publicServiceStateAbbreviation === 'string') {
      SpecialCategoryRetirementAnalysisEntity.validatePublicServiceStateAbbreviation(
        props.publicServiceStateAbbreviation,
      );
    }

    super(SpecialCategoryRetirementAnalysisId, props);
    this.analysisToolClientId = props.analysisToolClientId;
    this.analysisCustomName = props.analysisCustomName ?? null;
    this.retirementAnalysisObjectiveType =
      props.retirementAnalysisObjectiveType ?? null;
    this.publicServiceFederativeEntityName =
      props.publicServiceFederativeEntityName ?? null;
    this.publicServiceStateAbbreviation =
      props.publicServiceStateAbbreviation ?? null;
    this.hasConfirmedExposureToHarmfulAgents =
      props.hasConfirmedExposureToHarmfulAgents;
  }

  public static validatePublicServiceStateAbbreviation(
    abbreviation: string,
  ): void {
    const maxLength = 2;

    const hasMaximumLength = abbreviation.length <= maxLength;

    this.validateAllOrThrow(
      [hasMaximumLength],
      () => new InvalidPublicServiceStateAbbreviationError(),
    );
  }
}
