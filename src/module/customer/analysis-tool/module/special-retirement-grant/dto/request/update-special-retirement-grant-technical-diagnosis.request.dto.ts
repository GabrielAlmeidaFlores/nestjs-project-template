import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateSpecialRetirementGrantTechnicalDiagnosisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty()
  public periodStartDate: Date;

  @RequestDtoDateProperty()
  public periodEndDate: Date;

  @RequestDtoBooleanProperty()
  public recognized: boolean;

  @RequestDtoStringProperty()
  public justification: string;

  @RequestDtoStringProperty()
  public company: string;

  @RequestDtoStringProperty()
  public cnpj: string;

  @RequestDtoStringProperty()
  public role: string;

  @RequestDtoStringProperty()
  public supportingDocument: string;

  @RequestDtoBooleanProperty()
  public recordedInCnis: boolean;

  @RequestDtoBooleanProperty()
  public remunerationRecordedInCnis: boolean;

  @RequestDtoStringProperty()
  public hazardousAgents: string;

  @RequestDtoStringProperty()
  public informationSource: string;

  @RequestDtoStringProperty()
  public legalFramework: string;

  @RequestDtoBooleanProperty({ required: false })
  public epiEficaz?: boolean;

  @RequestDtoStringProperty({ required: false })
  public observations?: string;

  protected override readonly _type =
    UpdateSpecialRetirementGrantTechnicalDiagnosisRequestDto.name;
}
