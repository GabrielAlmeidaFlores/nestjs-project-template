import { Inject, Injectable } from '@nestjs/common';

import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { GetSupportTicketDetailAttachmentQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-detail-attachment.query.result';
import { GetSupportTicketDetailMessageQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-detail-message.query.result';
import { GetSupportTicketDetailQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-detail.query.result';
import { SupportTicketQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { GetSupportTicketDetailAttachmentResponseDto } from '@module/customer/service-desk/dto/response/get-support-ticket-detail-attachment.response.dto';
import { GetSupportTicketDetailMessageResponseDto } from '@module/customer/service-desk/dto/response/get-support-ticket-detail-message.response.dto';
import { GetSupportTicketDetailResponseDto } from '@module/customer/service-desk/dto/response/get-support-ticket-detail.response.dto';
import { SupportTicketAccessDeniedError } from '@module/customer/service-desk/error/support-ticket-access-denied.error';
import { SupportTicketNotFoundError } from '@module/customer/service-desk/error/support-ticket-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetSupportTicketDetailUseCase {
  protected readonly _type = GetSupportTicketDetailUseCase.name;

  public constructor(
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
    @Inject(BucketGateway)
    private readonly bucketGateway: BucketGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    orgSession: OrganizationSessionDataModel | null,
    supportTicketId: SupportTicketId,
  ): Promise<GetSupportTicketDetailResponseDto> {
    const ticket =
      await this.supportTicketQueryRepositoryGateway.findOneSupportTicketById(
        supportTicketId,
      );

    if (!ticket) {
      throw new SupportTicketNotFoundError();
    }

    this.assertAccess(ticket, sessionData, orgSession);

    const attachments = await this.buildAttachmentResponses(ticket.attachments);
    const messages = this.buildMessageResponses(ticket.messages);

    return GetSupportTicketDetailResponseDto.build({
      supportTicketId: ticket.id,
      ticketNumber: ticket.ticketNumber,
      requesterEmail: ticket.requesterEmail,
      requesterName: ticket.requesterName,
      subject: ticket.subject,
      problem: ticket.problem,
      description: ticket.description,
      supportType: ticket.supportType,
      status: ticket.status,
      ...(ticket.assignedAttendantName !== null && {
        assignedAttendantName: ticket.assignedAttendantName,
      }),
      attachments,
      messages,
      createdAt: ticket.createdAt,
    });
  }

  private assertAccess(
    ticket: GetSupportTicketDetailQueryResult,
    sessionData: SessionDataModel,
    orgSession: OrganizationSessionDataModel | null,
  ): void {
    if (orgSession === null) {
      return;
    }

    const sameOrg =
      ticket.organizationId.toString() === orgSession.organizationId.toString();

    if (!sameOrg) {
      throw new SupportTicketAccessDeniedError();
    }

    if (
      !orgSession.owner &&
      ticket.requesterAuthIdentityId.toString() !==
        sessionData.authIdentityId.toString()
    ) {
      throw new SupportTicketAccessDeniedError();
    }
  }

  private async buildAttachmentResponses(
    attachments: GetSupportTicketDetailAttachmentQueryResult[],
  ): Promise<GetSupportTicketDetailAttachmentResponseDto[]> {
    return Promise.all(
      attachments.map(async (attachment) => {
        const signedUrl = await this.bucketGateway.getSignedUrl(
          attachment.bucketKey,
        );

        return GetSupportTicketDetailAttachmentResponseDto.build({
          supportTicketAttachmentId: attachment.id,
          originalFileName: attachment.originalFileName,
          signedUrl: signedUrl.toString(),
        });
      }),
    );
  }

  private buildMessageResponses(
    messages: GetSupportTicketDetailMessageQueryResult[],
  ): GetSupportTicketDetailMessageResponseDto[] {
    return messages.map((message) =>
      GetSupportTicketDetailMessageResponseDto.build({
        supportTicketMessageId: message.id,
        senderName: message.senderName,
        senderType: message.senderType,
        content: message.content,
        createdAt: message.createdAt,
      }),
    );
  }
}
