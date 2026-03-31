import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { SupportAccountNotFoundError } from '@module/support/account/error/support-account-not-found.error';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { GetSupportTicketDetailsResponseDto } from '@module/support/service-desk/dto/response/get-support-ticket-details.response.dto';
import { SupportTicketAttachmentDetailResponseDto } from '@module/support/service-desk/dto/response/support-ticket-attachment-detail.response.dto';
import { SupportTicketNotFoundError } from '@module/support/service-desk/error/support-ticket-not-found.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetSupportTicketDetailsUseCase {
  protected readonly _type = GetSupportTicketDetailsUseCase.name;

  public constructor(
    @InjectRepository(SupportAttendantTypeormEntity)
    private readonly supportAttendantRepository: Repository<SupportAttendantTypeormEntity>,
    @InjectRepository(SupportTicketTypeormEntity)
    private readonly supportTicketRepository: Repository<SupportTicketTypeormEntity>,
    private readonly bucketGateway: BucketGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    supportTicketId: SupportTicketId,
  ): Promise<GetSupportTicketDetailsResponseDto> {
    const supportAttendant = await this.supportAttendantRepository.findOne({
      where: {
        authIdentity: {
          id: sessionData.authIdentityId.toString(),
        },
      },
    });

    if (!supportAttendant) {
      throw new SupportAccountNotFoundError();
    }

    const supportTicket = await this.supportTicketRepository.findOne({
      where: {
        id: supportTicketId.toString(),
        supportType: supportAttendant.supportType,
      },
      relations: {
        attachments: true,
      },
    });

    if (!supportTicket) {
      throw new SupportTicketNotFoundError();
    }

    const attachments = await Promise.all(
      (supportTicket.attachments ?? []).map(async (attachment) => {
        const [documentUrl, documentBuffer] = await Promise.all([
          this.bucketGateway.getSignedUrl(attachment.bucketKey),
          this.bucketGateway.getBuffer(attachment.bucketKey),
        ]);

        return SupportTicketAttachmentDetailResponseDto.build({
          documentName: attachment.originalFileName,
          documentSize: documentBuffer.byteLength,
          documentUrl: documentUrl.toString(),
        });
      }),
    );

    return GetSupportTicketDetailsResponseDto.build({
      ticketNumber: supportTicket.ticketNumber,
      supportType: supportTicket.supportType,
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
