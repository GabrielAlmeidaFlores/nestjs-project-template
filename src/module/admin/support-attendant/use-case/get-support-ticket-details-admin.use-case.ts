import { Inject, Injectable } from '@nestjs/common';

import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { GetSupportTicketDetailsResponseDto } from '@module/support/service-desk/dto/response/get-support-ticket-details.response.dto';
import { SupportTicketAttachmentDetailResponseDto } from '@module/support/service-desk/dto/response/support-ticket-attachment-detail.response.dto';
import { SupportTicketNotFoundError } from '@module/support/service-desk/error/support-ticket-not-found.error';

@Injectable()
export class GetSupportTicketDetailsAdminUseCase {
  protected readonly _type = GetSupportTicketDetailsAdminUseCase.name;

  public constructor(
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
    private readonly bucketGateway: BucketGateway,
  ) {}

  public async execute(
    supportTicketId: SupportTicketId,
  ): Promise<GetSupportTicketDetailsResponseDto> {
    const supportTicket =
      await this.supportTicketQueryRepositoryGateway.findOneByIdWithAttachments(
        supportTicketId,
      );

    if (!supportTicket) {
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
