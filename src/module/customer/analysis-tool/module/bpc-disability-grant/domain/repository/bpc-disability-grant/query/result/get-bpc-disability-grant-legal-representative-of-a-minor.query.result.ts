import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { BpcDisabilityGrantLegalRepresentativeOfAMinorKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/enum/bpc-disability-grant-legal-representative-of-a-minor-kinship.enum';
import type { BpcDisabilityGrantLegalRepresentativeOfAMinorId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/value-object/bpc-disability-grant-legal-representative-of-a-minor-id/bpc-disability-grant-legal-representative-of-a-minor-id.value-object';

export class GetBpcDisabilityGrantLegalRepresentativeOfAMinorQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityGrantLegalRepresentativeOfAMinorId;
  public readonly name: string | null;
  public readonly federalDocument: FederalDocument | null;
  public readonly birthDate: Date | null;
  public readonly minorUnderCustody: boolean | null;
  public readonly kinship: BpcDisabilityGrantLegalRepresentativeOfAMinorKinshipEnum | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityGrantLegalRepresentativeOfAMinorQueryResult.name;
}