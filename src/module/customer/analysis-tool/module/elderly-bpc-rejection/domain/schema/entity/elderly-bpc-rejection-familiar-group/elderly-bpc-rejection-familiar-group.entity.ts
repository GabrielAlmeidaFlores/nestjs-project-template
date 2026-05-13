import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { ElderlyBpcRejectionFamiliarGroupId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/value-object/elderly-bpc-rejection-familiar-group-id/elderly-bpc-rejection-familiar-group-id.value-object';

import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionFamiliarGroupEntityPropsInterface } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/elderly-bpc-rejection-familiar-group.entity.props.interface';
import type { ElderlyBpcRejectionFamiliarGroupIncomeTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/enum/elderly-bpc-rejection-familiar-group-income-type.enum';
import type { ElderlyBpcRejectionFamiliarGroupKinshipEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/enum/elderly-bpc-rejection-familiar-group-kinship.enum';

export class ElderlyBpcRejectionFamiliarGroupEntity extends BaseEntity<ElderlyBpcRejectionFamiliarGroupId> {
  public readonly fullName: string | null;
  public readonly birthDate: Date | null;
  public readonly kinship: ElderlyBpcRejectionFamiliarGroupKinshipEnum | null;
  public readonly livesInSameResidence: boolean | null;
  public readonly hasIncome: boolean | null;
  public readonly monthlyIncome: string | null;
  public readonly incomeType: ElderlyBpcRejectionFamiliarGroupIncomeTypeEnum | null;
  public readonly hasSupportingDocuments: boolean | null;
  public readonly elderlyBpcRejectionId: ElderlyBpcRejectionId;

  protected readonly _type = ElderlyBpcRejectionFamiliarGroupEntity.name;

  public constructor(
    props: ElderlyBpcRejectionFamiliarGroupEntityPropsInterface,
  ) {
    super(ElderlyBpcRejectionFamiliarGroupId, props);
    this.fullName = props.fullName ?? null;
    this.birthDate = props.birthDate ?? null;
    this.kinship = props.kinship ?? null;
    this.livesInSameResidence = props.livesInSameResidence ?? null;
    this.hasIncome = props.hasIncome ?? null;
    this.monthlyIncome = props.monthlyIncome ?? null;
    this.incomeType = props.incomeType ?? null;
    this.hasSupportingDocuments = props.hasSupportingDocuments ?? null;
    this.elderlyBpcRejectionId = props.elderlyBpcRejectionId;
  }
}
