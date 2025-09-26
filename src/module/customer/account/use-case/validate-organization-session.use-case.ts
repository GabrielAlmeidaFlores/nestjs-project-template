import { Inject, Injectable } from '@nestjs/common';

import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { ValidateOrganizationSessionRequestDto } from '@module/customer/account/dto/request/validate-organization-session.request.dto';
import { GetOrganizationResponseDto } from '@module/customer/account/dto/response/get-organization.response.dto';
import { InvalidOrganizationSessionError } from '@module/customer/account/error/invalid-organization-session.error';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { OrganizationSessionGateway } from '@module/customer/account/lib/organization-session/organization-session.gateway';
import { ValidateOrganizationSessionUseCaseGateway } from '@module/customer/account/use-case-gateway/validate-organization-session.use-case-gateway';

@Injectable()
export class ValidateOrganizationSessionUseCase
  implements ValidateOrganizationSessionUseCaseGateway
{
  protected readonly _type = ValidateOrganizationSessionUseCase.name;

  public constructor(
    @Inject(OrganizationSessionGateway)
    private readonly organizationSessionGateway: OrganizationSessionGateway,
    @Inject(OrganizationQueryRepositoryGateway)
    private readonly organizationQueryRepositoryGateway: OrganizationQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    dto: ValidateOrganizationSessionRequestDto,
  ): Promise<GetOrganizationResponseDto> {
    const session = this.organizationSessionGateway.getSessionDataFromJwt(
      dto.jwt,
    );

    if (session === null) {
      throw new InvalidOrganizationSessionError();
    }

    const organization =
      await this.organizationQueryRepositoryGateway.findOneByOrganizationId(
        session.organizationId,
      );

    if (organization === null) {
      throw new InvalidOrganizationSessionError();
    }

    const response = GetOrganizationResponseDto.build({
      organizationName: organization.name,
      organizationId: organization.id,
    });

    if (organization.organizationLogo !== null) {
      const logoUrl = await this.fileProcessorGateway.getOrganizationLogo(
        organization.organizationLogo,
      );

      response.organizationLogo = logoUrl.toString();
    }

    return response;
  }
}
