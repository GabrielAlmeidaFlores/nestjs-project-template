import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AccidentAssistanceTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/accident-assistance-terminated.query.repository.gateway';
import { AccidentAssistanceTerminatedPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-period/command/accident-assistance-terminated-period.command.repository.gateway';
import { AccidentAssistanceTerminatedPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-period-document/command/accident-assistance-terminated-period-document.command.repository.gateway';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedPeriodEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/accident-assistance-terminated-period.entity';
import { AccidentAssistanceTerminatedPeriodDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period-document/accident-assistance-terminated-period-document.entity';
import { AccidentAssistanceTerminatedPeriodDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period-document/value-object/accident-assistance-terminated-period-document-id/accident-assistance-terminated-period-document-id.value-object';
import { CreateAccidentAssistanceTerminatedPeriodRequestDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/request/create-accident-assistance-terminated-period.request.dto';
import { CreateAccidentAssistanceTerminatedPeriodResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/create-accident-assistance-terminated-period.response.dto';
import { AccidentAssistanceTerminatedNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/accident-assistance-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateAccidentAssistanceTerminatedPeriodUseCase {
  protected readonly _type =
    CreateAccidentAssistanceTerminatedPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedQueryRepositoryGateway)
    private readonly accidentAssistanceTerminatedQueryRepositoryGateway: AccidentAssistanceTerminatedQueryRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedPeriodCommandRepositoryGateway)
    private readonly accidentAssistanceTerminatedPeriodCommandRepositoryGateway: AccidentAssistanceTerminatedPeriodCommandRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedPeriodDocumentCommandRepositoryGateway)
    private readonly accidentAssistanceTerminatedPeriodDocumentCommandRepositoryGateway: AccidentAssistanceTerminatedPeriodDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    dto: CreateAccidentAssistanceTerminatedPeriodRequestDto,
  ): Promise<CreateAccidentAssistanceTerminatedPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.accidentAssistanceTerminatedQueryRepositoryGateway.findOneAccidentAssistanceTerminatedByIdOrFail(
      accidentAssistanceTerminatedId,
      AccidentAssistanceTerminatedNotFoundError,
    );

    const period = new AccidentAssistanceTerminatedPeriodEntity({
      sequencial: dto.sequencial,
      periodName: dto.periodName,
      periodStart: dto.periodStart,
      ...(dto.periodEnd !== undefined && { periodEnd: dto.periodEnd }),
      category: dto.category,
      isPendency: dto.isPendency,
      competenceBelowTheMinimum: dto.competenceBelowTheMinimum,
      ...(dto.contributionAverage !== undefined && {
        contributionAverage: dto.contributionAverage,
      }),
      typeOfContribution: dto.typeOfContribution,
      status: dto.status,
    });

    const transactions: TransactionType[] = [];
    const createPeriodTransaction =
      this.accidentAssistanceTerminatedPeriodCommandRepositoryGateway.createAccidentAssistanceTerminatedPeriod(
        accidentAssistanceTerminatedId,
        period,
      );

    transactions.push(createPeriodTransaction);

    if (dto.documents && dto.documents.length > 0) {
      const documentTransactions = await Promise.all(
        dto.documents.map(async (documentDto) => {
          const buffer = documentDto.file.base64.decodeToBuffer();

          const fileModel = FileModel.build({
            buffer,
            originalName: documentDto.file.originalFileName,
            size: buffer.length,
            encoding: '7bit',
          });

          const documentUrl =
            await this.fileProcessorGateway.uploadFile(fileModel);

          return this.accidentAssistanceTerminatedPeriodDocumentCommandRepositoryGateway.createAccidentAssistanceTerminatedPeriodDocument(
            new AccidentAssistanceTerminatedPeriodDocumentEntity({
              id: new AccidentAssistanceTerminatedPeriodDocumentId(),
              document: documentUrl,
              accidentAssistanceTerminatedPeriodId: period.id,
            }),
          );
        }),
      );

      transactions.push(...documentTransactions);
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return CreateAccidentAssistanceTerminatedPeriodResponseDto.build({
      accidentAssistanceTerminatedPeriodId: period.id,
    });
  }
}
