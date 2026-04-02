import { Inject, Injectable } from '@nestjs/common';

import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { GetSupportTicketDetailsResponseDto } from '@module/support/service-desk/dto/response/get-support-ticket-details.response.dto';
import { SupportTicketAttachmentDetailResponseDto } from '@module/support/service-desk/dto/response/support-ticket-attachment-detail.response.dto';
import { SupportTicketNotFoundError } from '@module/support/service-desk/error/support-ticket-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetCustomerSupportTicketDetailsUseCase {
  protected readonly _type = GetCustomerSupportTicketDetailsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
    private readonly bucketGateway: BucketGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    supportTicketId: SupportTicketId,
  ): Promise<GetSupportTicketDetailsResponseDto> {
    const member =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (member === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const supportTicket =
      await this.supportTicketQueryRepositoryGateway.findOneByIdAndOrganizationWithAttachments(
        supportTicketId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    if (supportTicket === null) {
      throw new SupportTicketNotFoundError();
    }

    const attachments = await Promise.all(
      (supportTicket.attachments ?? []).map(async (attachment) => {
        const [documentUrl, documentBuffer, documentName] = await Promise.all([
          this.bucketGateway.getSignedUrl(attachment.fileName),
          this.bucketGateway.getBuffer(attachment.fileName),
          this.bucketGateway.getOriginalFileName(attachment.fileName),
        ]);

        return SupportTicketAttachmentDetailResponseDto.build({
          documentName,
          documentSize: documentBuffer.byteLength,
          documentUrl: documentUrl.toString(),
        });
      }),
    );

    return GetSupportTicketDetailsResponseDto.build({
      id: supportTicket.id.toString(),
      ticketNumber: supportTicket.ticketNumber,
      supportType: supportTicket.supportType,
      status: supportTicket.status,
      openedAt: supportTicket.createdAt,
      analysisType: supportTicket.problem,
      requesterName: supportTicket.requesterName,
      requesterEmail: supportTicket.requesterEmail,
      subject: supportTicket.subject,
      problemDescription: supportTicket.description,
      attachments,
    });
  }
}
