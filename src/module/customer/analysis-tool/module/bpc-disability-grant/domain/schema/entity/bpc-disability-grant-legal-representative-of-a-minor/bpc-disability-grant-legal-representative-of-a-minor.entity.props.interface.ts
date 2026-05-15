import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import type { BpcDisabilityGrantLegalRepresentativeOfAMinorKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/enum/bpc-disability-grant-legal-representative-of-a-minor-kinship.enum';
import type { BpcDisabilityGrantLegalRepresentativeOfAMinorId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/value-object/bpc-disability-grant-legal-representative-of-a-minor-id/bpc-disability-grant-legal-representative-of-a-minor-id.value-object';

export interface BpcDisabilityGrantLegalRepresentativeOfAMinorEntityPropsInterface
  extends BaseEntityPropsInterface<BpcDisabilityGrantLegalRepresentativeOfAMinorId> {
  name?: string | null;
  federalDocument?: FederalDocument | null;
  birthDate?: Date | null;
  minorUnderCustody?: boolean | null;
  kinship?: BpcDisabilityGrantLegalRepresentativeOfAMinorKinshipEnum | null;
  BpcDisabilityGrantId: BpcDisabilityGrantId;
}