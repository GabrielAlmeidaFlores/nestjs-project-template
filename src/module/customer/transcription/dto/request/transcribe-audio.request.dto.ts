import { TranscriptionLanguageEnum } from '@module/customer/transcription/enum/transcription-language.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class TranscribeAudioRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.AUDIO_WAV],
  })
  public audio: FileModel;

  @RequestDtoEnumProperty(TranscriptionLanguageEnum)
  public language: TranscriptionLanguageEnum;

  protected override readonly _type = TranscribeAudioRequestDto.name;
}
