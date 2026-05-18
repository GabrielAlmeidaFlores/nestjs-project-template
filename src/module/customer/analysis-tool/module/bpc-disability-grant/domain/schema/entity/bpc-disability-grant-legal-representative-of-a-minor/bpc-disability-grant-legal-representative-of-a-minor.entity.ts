import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BpcDisabilityGrantLegalRepresentativeOfAMinorId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/value-object/bpc-disability-grant-legal-representative-of-a-minor-id/bpc-disability-grant-legal-representative-of-a-minor-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import type { BpcDisabilityGrantLegalRepresentativeOfAMinorEntityPropsInterface } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/bpc-disability-grant-legal-representative-of-a-minor.entity.props.interface';
import type { BpcDisabilityGrantLegalRepresentativeOfAMinorKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/enum/bpc-disability-grant-legal-representative-of-a-minor-kinship.enum';

export class BpcDisabilityGrantLegalRepresentativeOfAMinorEntity extends BaseEntity<BpcDisabilityGrantLegalRepresentativeOfAMinorId> {
  @Description('Nome do representante legal do menor.')
  public readonly name: string | null;

  @Description('Documento federal do representante legal do menor.')
  public readonly federalDocument: FederalDocument | null;

  @Description('Data de nascimento do representante legal do menor.')
  public readonly birthDate: Date | null;

  @Description('Indica se o menor está sob guarda do representante legal.')
  public readonly minorUnderCustody: boolean | null;

  @Description('Parentesco do representante legal do menor com o requerente.')
  public readonly kinship: BpcDisabilityGrantLegalRepresentativeOfAMinorKinshipEnum | null;

  @Description('ID da análise de BPC PcD vinculada ao representante legal.')
  public readonly BpcDisabilityGrantId: BpcDisabilityGrantId;

  protected readonly _type =
    BpcDisabilityGrantLegalRepresentativeOfAMinorEntity.name;

  public constructor(
    props: BpcDisabilityGrantLegalRepresentativeOfAMinorEntityPropsInterface,
  ) {
    super(BpcDisabilityGrantLegalRepresentativeOfAMinorId, props);

    this.name = props.name ?? null;
    this.federalDocument = props.federalDocument ?? null;
    this.birthDate = props.birthDate ?? null;
    this.minorUnderCustody = props.minorUnderCustody ?? null;
    this.kinship = props.kinship ?? null;
    this.BpcDisabilityGrantId = props.BpcDisabilityGrantId;
  }
}
