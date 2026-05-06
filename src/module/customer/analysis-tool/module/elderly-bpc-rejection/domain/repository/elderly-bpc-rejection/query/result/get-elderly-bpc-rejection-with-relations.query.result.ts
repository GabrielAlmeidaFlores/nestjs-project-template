import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { ElderlyBpcRejectionCategoryEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/enum/elderly-bpc-rejection-category.enum';
import type { ElderlyBpcRejectionMaritalStatusEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/enum/elderly-bpc-rejection-marital-status.enum';
import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionDocumentEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/elderly-bpc-rejection-document.entity';
import type { ElderlyBpcRejectionFamiliarGroupEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/elderly-bpc-rejection-familiar-group.entity';
import type { ElderlyBpcRejectionFamiliarGroupDocumentEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group-document/elderly-bpc-rejection-familiar-group-document.entity';
import type { ElderlyBpcRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-inss-benefit/elderly-bpc-rejection-inss-benefit.entity';
import type { ElderlyBpcRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-legal-proceeding/elderly-bpc-rejection-legal-proceeding.entity';
import type { ElderlyBpcRejectionResultEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/elderly-bpc-rejection-result.entity';

export class GetElderlyBpcRejectionWithRelationsQueryResult extends BaseBuildableObject {
  public readonly elderlyBpcRejectionId: ElderlyBpcRejectionId;
  public readonly analysisName: string | null;
  public readonly category: ElderlyBpcRejectionCategoryEnum | null;
  public readonly maritalStatus: ElderlyBpcRejectionMaritalStatusEnum | null;
  public readonly applicantLivesAlone: boolean | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly elderlyBpcRejectionResult: ElderlyBpcRejectionResultEntity | null;
  public readonly elderlyBpcRejectionDocument:
    | ElderlyBpcRejectionDocumentEntity[]
    | null;
  public readonly elderlyBpcRejectionInssBenefit:
    | ElderlyBpcRejectionInssBenefitEntity[]
    | null;
  public readonly elderlyBpcRejectionLegalProceeding:
    | ElderlyBpcRejectionLegalProceedingEntity[]
    | null;
  public readonly elderlyBpcRejectionFamiliarGroup:
    | ElderlyBpcRejectionFamiliarGroupEntity[]
    | null;
  public readonly elderlyBpcRejectionFamiliarGroupDocument:
    | ElderlyBpcRejectionFamiliarGroupDocumentEntity[]
    | null;

  protected override readonly _type =
    GetElderlyBpcRejectionWithRelationsQueryResult.name;
}
