import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RetirementPermanentDisabilityRevisionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/retirement-permanent-disability-revision.query.repository.gateway';
import { RetirementPermanentDisabilityRevisionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-document/command/retirement-permanent-disability-revision-document.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/enum/retirement-permanent-disability-revision-document-type.enum';
import { RetirementPermanentDisabilityRevisionDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/retirement-permanent-disability-revision-document.entity';
import { UploadRetirementPermanentDisabilityRevisionDocumentsRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/upload-retirement-permanent-disability-revision-document.request.dto';
import { UploadRetirementPermanentDisabilityRevisionDocumentsResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/upload-retirement-permanent-disability-revision-document.response.dto';
import { RetirementPermanentDisabilityRevisionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/error/retirement-permanent-disability-revision-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UploadRetirementPermanentDisabilityRevisionDocumentsUseCase {
  protected readonly _type =
    UploadRetirementPermanentDisabilityRevisionDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionQueryRepositoryGateway: RetirementPermanentDisabilityRevisionQueryRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionDocumentCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRevisionDocumentCommandRepositoryGateway: RetirementPermanentDisabilityRevisionDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    dto: UploadRetirementPermanentDisabilityRevisionDocumentsRequestDto,
  ): Promise<UploadRetirementPermanentDisabilityRevisionDocumentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.retirementPermanentDisabilityRevisionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRevisionIdOrFailWithRelations(
      retirementPermanentDisabilityRevisionId,
      RetirementPermanentDisabilityRevisionNotFoundError,
    );

    const [cnisFilename, benefitConcessionLetterFilenames] = await Promise.all([
      this.uploadFile(dto.cnis),
      Promise.all(
        dto.benefitConcessionLetter.map((letter) => this.uploadFile(letter)),
      ),
    ]);

    const transactions: TransactionType[] = [];

    transactions.push(
      this.retirementPermanentDisabilityRevisionDocumentCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionDocument(
        new RetirementPermanentDisabilityRevisionDocumentEntity({
          retirementPermanentDisabilityRevision:
            retirementPermanentDisabilityRevisionId,
          type: RetirementPermanentDisabilityRevisionDocumentTypeEnum.CNIS,
          document: cnisFilename,
        }),
      ),
    );

    for (const filename of benefitConcessionLetterFilenames) {
      transactions.push(
        this.retirementPermanentDisabilityRevisionDocumentCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionDocument(
          new RetirementPermanentDisabilityRevisionDocumentEntity({
            retirementPermanentDisabilityRevision:
              retirementPermanentDisabilityRevisionId,
            type: RetirementPermanentDisabilityRevisionDocumentTypeEnum.BENEFIT_CONCESSION_LETTER,
            document: filename,
          }),
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UploadRetirementPermanentDisabilityRevisionDocumentsResponseDto.build(
      {
        retirementPermanentDisabilityRevisionId,
      },
    );
  }

  private async uploadFile(file: Base64FileRequestDto): Promise<string> {
    const buffer = file.base64.decodeToBuffer();

    return this.fileProcessorGateway.uploadFile(
      FileModel.build({
        buffer,
        originalName: file.originalFileName,
        size: buffer.length,
        encoding: '7bit',
      }),
    );
  }
}
