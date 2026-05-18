import { GeneralUrbanRetirementAnalysisBenefitTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/enum/general-urban-retirement-analysis-benefit-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class AnalyzeGeneralUrbanRetirementDocumentsJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(GeneralUrbanRetirementAnalysisBenefitTypeEnum, {
    required: true,
  })
  public benefitType: GeneralUrbanRetirementAnalysisBenefitTypeEnum;

  protected override readonly _type =
    AnalyzeGeneralUrbanRetirementDocumentsJsonRequestDto.name;
}

@RequestDto()
export class AnalyzeGeneralUrbanRetirementDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF],
    required: true,
    isArray: true,
  })
  public documentAnalysisFiles: FileModel[];

  @RequestDtoObjectProperty(
    () => AnalyzeGeneralUrbanRetirementDocumentsJsonRequestDto,
  )
  public json: AnalyzeGeneralUrbanRetirementDocumentsJsonRequestDto;

  protected override readonly _type =
    AnalyzeGeneralUrbanRetirementDocumentsRequestDto.name;
}
