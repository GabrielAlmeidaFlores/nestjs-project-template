import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TemporaryDisabilityBenefitsGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/query/temporary-disability-benefits-grant.query.repository.gateway';
import { TemporaryDisabilityBenefitsGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-period/command/temporary-disability-benefits-grant-period.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-period-document/command/temporary-disability-benefits-grant-period-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-previous-benefits/command/temporary-disability-benefits-grant-previous-benefits.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-previous-benefits-document/command/temporary-disability-benefits-grant-previous-benefits-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantPeriodEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/temporary-disability-benefits-grant-period.entity';
import { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/temporary-disability-benefits-grant-period-document.entity';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/value-object/temporary-disability-benefits-grant-period-document-id.value-object';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/temporary-disability-benefits-grant-previous-benefits.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/value-object/temporary-disability-benefits-grant-previous-benefits-id.value-object';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/temporary-disability-benefits-grant-previous-benefits-document.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/value-object/temporary-disability-benefits-grant-previous-benefits-document-id.value-object';
import { UpdateTemporaryDisabilityBenefitsGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/request/update-temporary-disability-benefits-grant-period.request.dto';
import { UpdateTemporaryDisabilityBenefitsGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/update-temporary-disability-benefits-grant-period.response.dto';
import { TemporaryDisabilityBenefitsGrantNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/error/temporary-disability-benefits-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateTemporaryDisabilityBenefitsGrantPeriodUseCase {
  protected readonly _type =
    UpdateTemporaryDisabilityBenefitsGrantPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantQueryRepositoryGateway: TemporaryDisabilityBenefitsGrantQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantPeriodCommandRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantPeriodCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantPeriodCommandRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsGrantPeriodDocumentCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsGrantPeriodDocumentCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantPeriodDocumentCommandRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsGrantPreviousBenefitsCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsGrantPreviousBenefitsCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantPreviousBenefitsCommandRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsGrantPreviousBenefitsDocumentCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    dto: UpdateTemporaryDisabilityBenefitsGrantPeriodRequestDto,
  ): Promise<UpdateTemporaryDisabilityBenefitsGrantPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.temporaryDisabilityBenefitsGrantQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsGrantIdOrFailWithRelations(
      temporaryDisabilityBenefitsGrantId,
      TemporaryDisabilityBenefitsGrantNotFoundError,
    );

    const transactions: TransactionType[] = [
      this.temporaryDisabilityBenefitsGrantPeriodCommandRepositoryGateway.deleteAllByTemporaryDisabilityBenefitsGrantId(
        temporaryDisabilityBenefitsGrantId,
      ),
    ];

    for (const periodDto of dto.periods) {
      const periodId = new TemporaryDisabilityBenefitsGrantPeriodId();

      transactions.push(
        this.temporaryDisabilityBenefitsGrantPeriodCommandRepositoryGateway.createTemporaryDisabilityBenefitsGrantPeriod(
          new TemporaryDisabilityBenefitsGrantPeriodEntity({
            id: periodId,
            startDate: periodDto.startDate,
            cidTenId: periodDto.cidTenId ?? null,
            description: periodDto.description ?? null,
            jobDerivatedDisability: periodDto.jobDerivatedDisability,
            disablingConditionDescription:
              periodDto.disablingConditionDescription ?? null,
            disabilityFromSevereDisease: periodDto.disabilityFromSevereDisease,
            severeDisease: periodDto.severeDisease ?? null,
            diseaseStartDate: periodDto.diseaseStartDate ?? null,
            needsConstantAssistanceFromAnotherPerson:
              periodDto.needsConstantAssistanceFromAnotherPerson,
            temporaryDisabilityBenefitsGrantId,
          }),
        ),
      );

      if (periodDto.documents && periodDto.documents.length > 0) {
        const documentTransactions = await Promise.all(
          periodDto.documents.map(async (documentDto) => {
            const buffer = documentDto.file.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const fileName =
              await this.fileProcessorGateway.uploadFile(fileModel);

            return this.temporaryDisabilityBenefitsGrantPeriodDocumentCommandRepositoryGateway.createTemporaryDisabilityBenefitsGrantPeriodDocument(
              new TemporaryDisabilityBenefitsGrantPeriodDocumentEntity({
                id: new TemporaryDisabilityBenefitsGrantPeriodDocumentId(),
                fileName,
                type: documentDto.type,
                temporaryDisabilityBenefitsGrantPeriodId: periodId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }

      if (periodDto.previousBenefits && periodDto.previousBenefits.length > 0) {
        for (const pbDto of periodDto.previousBenefits) {
          const previousBenefitsId =
            new TemporaryDisabilityBenefitsGrantPreviousBenefitsId();

          transactions.push(
            this.temporaryDisabilityBenefitsGrantPreviousBenefitsCommandRepositoryGateway.createTemporaryDisabilityBenefitsGrantPreviousBenefits(
              new TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity({
                id: previousBenefitsId,
                benefitNumber: pbDto.benefitNumber,
                temporaryDisabilityBenefitsGrantPeriodId: periodId,
              }),
            ),
          );

          if (pbDto.documents && pbDto.documents.length > 0) {
            const pbDocumentTransactions = await Promise.all(
              pbDto.documents.map(async (docDto) => {
                const buffer = docDto.file.base64.decodeToBuffer();

                const fileModel = FileModel.build({
                  buffer,
                  originalName: docDto.file.originalFileName,
                  size: buffer.length,
                  encoding: '7bit',
                });

                const fileName =
                  await this.fileProcessorGateway.uploadFile(fileModel);

                return this.temporaryDisabilityBenefitsGrantPreviousBenefitsDocumentCommandRepositoryGateway.createTemporaryDisabilityBenefitsGrantPreviousBenefitsDocument(
                  new TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity(
                    {
                      id: new TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId(),
                      fileName,
                      type: docDto.type,
                      temporaryDisabilityBenefitsGrantPreviousBenefitsId:
                        previousBenefitsId,
                    },
                  ),
                );
              }),
            );

            transactions.push(...pbDocumentTransactions);
          }
        }
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateTemporaryDisabilityBenefitsGrantPeriodResponseDto.build({
      temporaryDisabilityBenefitsGrantId,
    });
  }
}
