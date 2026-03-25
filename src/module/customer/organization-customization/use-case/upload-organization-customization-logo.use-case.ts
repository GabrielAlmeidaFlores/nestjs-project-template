import { Inject, Injectable } from '@nestjs/common';

import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { UploadOrganizationCustomizationLogoRequestDto } from '@module/customer/organization-customization/dto/request/upload-organization-customization-logo.request.dto';
import { UploadOrganizationCustomizationLogoResponseDto } from '@module/customer/organization-customization/dto/response/upload-organization-customization-logo.response.dto';

@Injectable()
export class UploadOrganizationCustomizationLogoUseCase {
  protected readonly _type = UploadOrganizationCustomizationLogoUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    dto: UploadOrganizationCustomizationLogoRequestDto,
    existingLogoLocation?: string,
  ): Promise<UploadOrganizationCustomizationLogoResponseDto> {
    const organizationLogoLocation =
      await this.fileProcessorGateway.uploadOrganizationLogo(
        dto.organizationLogo,
        existingLogoLocation,
      );

    return UploadOrganizationCustomizationLogoResponseDto.build({
      organizationLogo: organizationLogoLocation,
    });
  }
}
