import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantPeriodStatusEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/enum/special-retirement-grant-period-status.enum';
import { SpecialRetirementGrantPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity.props.interface';
import { SpecialRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/value-object/special-retirement-grant-period-id/special-retirement-grant-period-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class SpecialRetirementGrantPeriodEntity extends BaseEntity<SpecialRetirementGrantPeriodId> {
  @Description('Sequencial do vínculo no CNIS.')
  public readonly sequencial?: number | null;

  @Description('Origem do vínculo (nome do empregador/vínculo).')
  public readonly employmentRelationshipSource?: string | null;

  @Description('Data de início do período.')
  public readonly startDate?: Date | null;

  @Description('Data de fim do período.')
  public readonly endDate?: Date | null;

  @Description('Categoria do vínculo.')
  public readonly category?: string | null;

  @Description('Status do período na linha do tempo integrada.')
  public readonly status?: SpecialRetirementGrantPeriodStatusEnum | null;

  @Description('Valor médio das remunerações/contribuições do vínculo.')
  public readonly averageContributionAmount?: DecimalValue | null;

  @Description('Indica se o período deve ser considerado.')
  public readonly shouldConsiderPeriod: boolean;

  @Description(
    'Indica se deve considerar a última remuneração como data de saída.',
  )
  public readonly shouldConsiderLastRemunerationAsExitDate: boolean;

  @Description('Chave do documento CNIS associado à geração do período.')
  public readonly cnisDocument?: string | null;

  @Description('Concessão de aposentadoria especial associada ao período.')
  public readonly specialRetirementGrant: SpecialRetirementGrantEntity;

  protected readonly _type = SpecialRetirementGrantPeriodEntity.name;

  public constructor(props: SpecialRetirementGrantPeriodEntityPropsInterface) {
    super(SpecialRetirementGrantPeriodId, props);
    this.sequencial = props.sequencial ?? null;
    this.employmentRelationshipSource =
      props.employmentRelationshipSource ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.category = props.category ?? null;
    this.status = props.status ?? null;
    this.averageContributionAmount =
      props.averageContributionAmount instanceof DecimalValue
        ? props.averageContributionAmount
        : (props.averageContributionAmount ?? null);
    this.shouldConsiderPeriod = props.shouldConsiderPeriod;
    this.shouldConsiderLastRemunerationAsExitDate =
      props.shouldConsiderLastRemunerationAsExitDate;
    this.cnisDocument = props.cnisDocument ?? null;
    this.specialRetirementGrant = props.specialRetirementGrant;
  }
}
