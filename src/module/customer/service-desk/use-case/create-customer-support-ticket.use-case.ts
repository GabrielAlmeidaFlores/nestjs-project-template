import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { CreateCustomerSupportTicketRequestDto } from '@module/customer/service-desk/dto/request/create-customer-support-ticket.request.dto';
import { CreateCustomerSupportTicketResponseDto } from '@module/customer/service-desk/dto/response/create-customer-support-ticket.response.dto';
import { SupportTicketCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/command/support-ticket.command.repository.gateway';
import { SupportTicketQueryRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportTicketAttachmentCommandRepositoryGateway } from '@module/support/service-desk/domain/repository/support-ticket-attachment/command/support-ticket-attachment.command.repository.gateway';
import { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { SupportTicketEntity } from '@module/support/service-desk/domain/schema/entity/support-ticket/support-ticket.entity';
import { SupportTicketNumber } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-number/support-ticket-number.value-object';
import { SupportTicketAttachmentEntity } from '@module/support/service-desk/domain/schema/entity/support-ticket-attachment/support-ticket-attachment.entity';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateCustomerSupportTicketUseCase {
  protected readonly _type = CreateCustomerSupportTicketUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SupportTicketQueryRepositoryGateway)
    private readonly supportTicketQueryRepositoryGateway: SupportTicketQueryRepositoryGateway,
    @Inject(SupportTicketCommandRepositoryGateway)
    private readonly supportTicketCommandRepositoryGateway: SupportTicketCommandRepositoryGateway,
    @Inject(SupportTicketAttachmentCommandRepositoryGateway)
    private readonly supportTicketAttachmentCommandRepositoryGateway: SupportTicketAttachmentCommandRepositoryGateway,
    @Inject(BucketGateway)
    private readonly bucketGateway: BucketGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateCustomerSupportTicketRequestDto,
  ): Promise<CreateCustomerSupportTicketResponseDto> {
    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const member =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (member === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const lastTicketNumber =
      await this.supportTicketQueryRepositoryGateway.findLastTicketNumberByOrganizationId(
        organizationSessionData.organizationId,
      );
    const nextTicketNumber = SupportTicketNumber.next(lastTicketNumber);
    const supportTicket = new SupportTicketEntity({
      organizationId: organizationSessionData.organizationId,
      requesterAuthIdentityId: sessionData.authIdentityId,
      requesterEmail: dto.requesterEmail,
      requesterName: customer.name,
      ticketNumber: nextTicketNumber,
      supportType: dto.supportType,
      subject: dto.subject,
      problem: dto.problem,
      description: dto.description,
      status: SupportTicketStatusEnum.AWAITING_RESPONSE,
    });

    const attachments = dto.attachments ?? [];
    const supportTicketAttachments = await Promise.all(
      attachments.map(async (attachment) => {
        const buffer = attachment.base64.decodeToBuffer();
        const file = FileModel.build({
          buffer,
          originalName: attachment.originalFileName,
          size: buffer.byteLength,
          encoding: 'base64',
        });

        const bucketKey = await this.bucketGateway.create(file);
        return new SupportTicketAttachmentEntity({
          supportTicketId: supportTicket.id,
          bucketKey,
          originalFileName: attachment.originalFileName,
        });
      }),
    );

    const transactionEvents = [
      this.supportTicketCommandRepositoryGateway.createTransaction(
        supportTicket,
      ),
    ];

    if (supportTicketAttachments.length > 0) {
      transactionEvents.push(
        this.supportTicketAttachmentCommandRepositoryGateway.createManyTransaction(
          supportTicketAttachments,
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactionEvents);
    await transaction.commit();

    return CreateCustomerSupportTicketResponseDto.build({
      id: supportTicket.id.toString(),
      ticketNumber: supportTicket.ticketNumber.toString(),
      status: supportTicket.status,
      openedAt: supportTicket.createdAt,
    });
  }
}
