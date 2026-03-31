import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { SupportTicketCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/command/support-ticket.command.repository.gateway';
import { SupportTicketQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket/query/support-ticket.query.repository.gateway';
import { SupportTicketAttachmentCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-ticket-attachment/command/support-ticket-attachment.command.repository.gateway';
import { SupportTicketStatusEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import { SupportTicketEntity } from '@module/customer/service-desk/domain/schema/entity/support-ticket/support-ticket.entity';
import { SupportTicketAttachmentEntity } from '@module/customer/service-desk/domain/schema/entity/support-ticket-attachment/support-ticket-attachment.entity';
import { CreateSupportTicketRequestDto } from '@module/customer/service-desk/dto/request/create-support-ticket.request.dto';
import { CreateSupportTicketResponseDto } from '@module/customer/service-desk/dto/response/create-support-ticket.response.dto';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

interface RequesterDataInterface {
  name: string;
  email: string;
}

@Injectable()
export class CreateSupportTicketUseCase {
  protected readonly _type = CreateSupportTicketUseCase.name;

  private readonly ticketNumberLength: number;
  private readonly ticketNumberPadChar: string;

  public constructor(
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
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
  ) {
    this.ticketNumberLength = 8;
    this.ticketNumberPadChar = '0';
  }

  public async execute(
    sessionData: SessionDataModel,
    orgSession: OrganizationSessionDataModel,
    dto: CreateSupportTicketRequestDto,
  ): Promise<CreateSupportTicketResponseDto> {
    const [requesterData, ticketNumber, bucketKeys] = await Promise.all([
      this.fetchRequesterData(sessionData.authIdentityId),
      this.generateTicketNumber(orgSession),
      this.uploadAttachments(dto),
    ]);

    const ticket = new SupportTicketEntity({
      organizationId: orgSession.organizationId,
      requesterAuthIdentityId: new AuthIdentityId(
        sessionData.authIdentityId.toString(),
      ),
      requesterEmail: dto.requesterEmail,
      requesterName: requesterData.name,
      ticketNumber,
      supportType: dto.supportType,
      subject: dto.subject,
      problem: dto.problem,
      description: dto.description,
      status: SupportTicketStatusEnum.WAITING,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.supportTicketCommandRepositoryGateway.createSupportTicket(ticket),
    );

    await transaction.commit();

    await this.persistAttachments(ticket, dto, bucketKeys);

    return CreateSupportTicketResponseDto.build({
      supportTicketId: ticket.id,
      ticketNumber,
    });
  }

  private async fetchRequesterData(
    authIdentityId: AuthIdentityId,
  ): Promise<RequesterDataInterface> {
    const [authIdentity, customer] = await Promise.all([
      this.authIdentityQueryRepositoryGateway.findOneAuthIdentityById(
        authIdentityId,
      ),
      this.customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail(
        authIdentityId,
        CustomerNotFoundError,
      ),
    ]);

    return {
      name: customer.name,
      email: authIdentity?.email.toString() ?? '',
    };
  }

  private async generateTicketNumber(
    orgSession: OrganizationSessionDataModel,
  ): Promise<string> {
    const count =
      await this.supportTicketQueryRepositoryGateway.countAllSupportTicketsByOrganizationId(
        orgSession.organizationId,
      );

    return String(count + 1).padStart(
      this.ticketNumberLength,
      this.ticketNumberPadChar,
    );
  }

  private async uploadAttachments(
    dto: CreateSupportTicketRequestDto,
  ): Promise<string[]> {
    if (!dto.files || dto.files.length === 0) {
      return [];
    }

    return Promise.all(
      dto.files.map(async (fileDto) => {
        const buffer = fileDto.base64.decodeToBuffer();

        const fileModel = FileModel.build({
          buffer,
          originalName: fileDto.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });

        return this.bucketGateway.create(fileModel);
      }),
    );
  }

  private async persistAttachments(
    ticket: SupportTicketEntity,
    dto: CreateSupportTicketRequestDto,
    bucketKeys: string[],
  ): Promise<void> {
    if (!dto.files || dto.files.length === 0) {
      return;
    }

    const attachmentTransactions = dto.files.map((fileDto, index) => {
      const attachment = new SupportTicketAttachmentEntity({
        supportTicketId: ticket.id,
        bucketKey: bucketKeys[index] ?? '',
        originalFileName: fileDto.originalFileName,
      });

      return this.supportTicketAttachmentCommandRepositoryGateway.createSupportTicketAttachment(
        attachment,
      );
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      attachmentTransactions,
    );

    await transaction.commit();
  }
}
