import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateSpecialRetirementGrantTechnicalDiagnosisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public periodStartDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public periodEndDate?: Date;

  @RequestDtoBooleanProperty({ required: false })
  public recognized?: boolean;

  @RequestDtoStringProperty({ required: false })
  public justification?: string;

  @RequestDtoStringProperty({ required: false })
  public company?: string;

  @RequestDtoStringProperty({ required: false })
  public cnpj?: string;

  @RequestDtoStringProperty({ required: false })
  public role?: string;

  @RequestDtoStringProperty({ required: false })
  public supportingDocument?: string;

  @RequestDtoBooleanProperty({ required: false })
  public recordedInCnis?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public remunerationRecordedInCnis?: boolean;

  @RequestDtoStringProperty({ required: false })
  public hazardousAgents?: string;

  @RequestDtoStringProperty({ required: false })
  public informationSource?: string;

  @RequestDtoStringProperty({ required: false })
  public legalFramework?: string;

  @RequestDtoBooleanProperty({ required: false })
  public epiEficaz?: boolean;

  @RequestDtoStringProperty({ required: false })
  public observations?: string;

  protected override readonly _type =
    CreateSpecialRetirementGrantTechnicalDiagnosisRequestDto.name;
}
