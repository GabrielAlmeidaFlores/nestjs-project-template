import { TranscriptionLanguageEnum } from '@module/customer/transcription/enum/transcription-language.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class TranscribeAudioJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(TranscriptionLanguageEnum)
  public language: TranscriptionLanguageEnum;

  protected override readonly _type = TranscribeAudioJsonRequestDto.name;
}

@RequestDto()
export class TranscribeAudioRequestDto extends BaseBuildableDtoObject {
  @RequestDtoFileProperty({
    allowedMimeType: [
      MimeTypeEnum.AUDIO_MPEG,
      MimeTypeEnum.AUDIO_WAV,
      MimeTypeEnum.AUDIO_X_WAV,
      MimeTypeEnum.AUDIO_WAVE,
      MimeTypeEnum.AUDIO_VND_WAVE,
      MimeTypeEnum.VIDEO_WEBM,
    ],
  })
  public audio: FileModel;

  @RequestDtoObjectProperty(() => TranscribeAudioJsonRequestDto)
  public json: TranscribeAudioJsonRequestDto;

  protected override readonly _type = TranscribeAudioRequestDto.name;
}
