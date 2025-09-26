import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { FileModel } from '@shared/system/model/generic/file.model';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@RequestDto()
export class UpdateCustomerProfilePictureRequestDto extends BaseBuildableObject {
  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.IMAGE_JPEG, MimeTypeEnum.IMAGE_PNG],
  })
  public profilePicture: FileModel;

  protected override readonly _type =
    UpdateCustomerProfilePictureRequestDto.name;
}
