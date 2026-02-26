import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GeneralUrbanRetirementGrantEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity.props.interface';
import type { GeneralUrbanRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/general-urban-retirement-grant-result.entity';

export class GeneralUrbanRetirementGrantEntity extends BaseEntity<GeneralUrbanRetirementGrantId> {
  @Description(
    'Documento CNIS utilizado na análise de concessão de aposentadoria urbana.',
  )
  public readonly cnisDocument: string | null;

  @Description('Resultado da análise de concessão de aposentadoria urbana.')
  public readonly generalUrbanRetirementGrantResult: GeneralUrbanRetirementGrantResultEntity | null;

  protected readonly _type = GeneralUrbanRetirementGrantEntity.name;

  public constructor(props: GeneralUrbanRetirementGrantEntityPropsInterface) {
    super(GeneralUrbanRetirementGrantId, props);

    this.cnisDocument = props.cnisDocument ?? null;
    this.generalUrbanRetirementGrantResult =
      props.generalUrbanRetirementGrantResult ?? null;
  }
}
