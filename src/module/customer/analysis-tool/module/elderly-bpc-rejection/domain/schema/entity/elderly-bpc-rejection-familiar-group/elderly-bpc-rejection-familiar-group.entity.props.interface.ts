import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionFamiliarGroupIncomeTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/enum/elderly-bpc-rejection-familiar-group-income-type.enum';
import type { ElderlyBpcRejectionFamiliarGroupKinshipEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/enum/elderly-bpc-rejection-familiar-group-kinship.enum';
import type { ElderlyBpcRejectionFamiliarGroupId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/value-object/elderly-bpc-rejection-familiar-group-id/elderly-bpc-rejection-familiar-group-id.value-object';

export interface ElderlyBpcRejectionFamiliarGroupEntityPropsInterface extends BaseEntityPropsInterface<ElderlyBpcRejectionFamiliarGroupId> {
  fullName?: string | null;
  birthDate?: Date | null;
  kinship?: ElderlyBpcRejectionFamiliarGroupKinshipEnum | null;
  livesInSameResidence?: boolean | null;
  hasIncome?: boolean | null;
  monthlyIncome?: string | null;
  incomeType?: ElderlyBpcRejectionFamiliarGroupIncomeTypeEnum | null;
  hasSupportingDocuments?: boolean | null;
  elderlyBpcRejectionId: ElderlyBpcRejectionId;
}
