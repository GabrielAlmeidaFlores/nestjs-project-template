import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-result/command/legal-pleading-result.repository.gateway';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingResultId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/value-object/legal-pleading-result-id/legal-pleading-result-id.value-object';
import { UpdateLegalPleadingCompleteAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/update-legal-pleading-complete-analysis.request.dto';
import { UpdateLegalPleadingCompleteAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/update-legal-pleading-complete-analysis.response.dto';
import { LegalPleadingDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/error/legal-pleading-does-not-contain-complete-analysis.error';
import { LegalPleadingNotFoundError } from '@module/customer/analysis-tool/error/legal-pleading-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { UpdateLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-legal-pleading-complete-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetLegalPleadingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading-with-relations.query.result';

describe(UpdateLegalPleadingCompleteAnalysisUseCase.name, () => {
  let useCase: UpdateLegalPleadingCompleteAnalysisUseCase;

  const legalPleadingQueryRepositoryGateway: jest.Mocked<LegalPleadingQueryRepositoryGateway> =
    {
      findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail:
        jest.fn(),
    } as unknown as jest.Mocked<LegalPleadingQueryRepositoryGateway>;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerIdAndAuthIdentityId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const exportDocumentGateway: jest.Mocked<ExportDocumentGateway> = {
    convertHtmlToMarkdown: jest.fn(),
    convertMarkdownToHtml: jest.fn(),
  } as unknown as jest.Mocked<ExportDocumentGateway>;

  const legalPleadingResultCommandRepositoryGateway: jest.Mocked<LegalPleadingResultCommandRepositoryGateway> =
    {
      updateLegalPleadingResult: jest.fn(),
    } as unknown as jest.Mocked<LegalPleadingResultCommandRepositoryGateway>;

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

  const buildSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const buildOrganizationSessionData = (): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      organizationId: new OrganizationId(),
    });

  const buildDto = (): UpdateLegalPleadingCompleteAnalysisRequestDto =>
    UpdateLegalPleadingCompleteAnalysisRequestDto.build({
      legalPleadingCompleteAnalysis: '<p>Updated analysis HTML</p>',
    });

  const buildOrganizationMemberQueryResult =
    (): GetOrganizationMemberQueryResult =>
      GetOrganizationMemberQueryResult.build({
        id: new OrganizationMemberId(),
        owner: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });

  const buildLegalPleadingQueryResult =
    (): GetLegalPleadingWithRelationsQueryResult =>
      ({
        id: new LegalPleadingId(),
        legalPleadingResult: {
          id: new LegalPleadingResultId(),
          legalPleadingCompleteAnalysis: '# Original markdown analysis',
        },
      }) as GetLegalPleadingWithRelationsQueryResult;

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateLegalPleadingCompleteAnalysisUseCase,
        {
          provide: LegalPleadingQueryRepositoryGateway,
          useValue: legalPleadingQueryRepositoryGateway,
        },
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: ExportDocumentGateway,
          useValue: exportDocumentGateway,
        },
        {
          provide: LegalPleadingResultCommandRepositoryGateway,
          useValue: legalPleadingResultCommandRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(UpdateLegalPleadingCompleteAnalysisUseCase);
    jest.clearAllMocks();
  });

  it('should successfully update legal pleading complete analysis', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const dto = buildDto();
    const organizationMember = buildOrganizationMemberQueryResult();
    const legalPleadingQueryResult = buildLegalPleadingQueryResult();
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );

    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail.mockResolvedValueOnce(
      legalPleadingQueryResult,
    );

    exportDocumentGateway.convertHtmlToMarkdown.mockReturnValueOnce(
      '# Updated markdown',
    );
    exportDocumentGateway.convertMarkdownToHtml.mockResolvedValueOnce(
      '<h1>Updated markdown</h1>',
    );

    const updateWork: TransactionType = async () => Promise.resolve();
    legalPleadingResultCommandRepositoryGateway.updateLegalPleadingResult.mockReturnValueOnce(
      updateWork,
    );

    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    const result = await useCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
      dto,
    );

    expect(result).toBeInstanceOf(
      UpdateLegalPleadingCompleteAnalysisResponseDto,
    );
    expect(result.legalPleadingCompleteAnalysis).toBe(
      '<h1>Updated markdown</h1>',
    );

    expect(
      organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId,
    ).toHaveBeenCalledWith(
      sessionData.authIdentityId,
      organizationSessionData.organizationId,
    );

    expect(
      legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail,
    ).toHaveBeenCalledWith(
      legalPleadingId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      LegalPleadingNotFoundError,
    );

    expect(exportDocumentGateway.convertHtmlToMarkdown).toHaveBeenCalledWith(
      dto.legalPleadingCompleteAnalysis,
    );
    expect(exportDocumentGateway.convertMarkdownToHtml).toHaveBeenCalledWith(
      '# Updated markdown',
    );

    expect(
      legalPleadingResultCommandRepositoryGateway.updateLegalPleadingResult,
    ).toHaveBeenCalledTimes(1);

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledWith(
      updateWork,
    );
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('should throw OrganizationMemberNotFoundError when member is not found', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const dto = buildDto();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(
        sessionData,
        organizationSessionData,
        legalPleadingId,
        dto,
      ),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);

    expect(
      legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail,
    ).not.toHaveBeenCalled();
  });

  it('should throw LegalPleadingDoesNotContainCompleteAnalysisError when analysis is null', async () => {
    const sessionData = buildSessionData();
    const organizationSessionData = buildOrganizationSessionData();
    const legalPleadingId = new LegalPleadingId();
    const dto = buildDto();
    const organizationMember = buildOrganizationMemberQueryResult();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );

    const legalPleadingWithoutAnalysis: GetLegalPleadingWithRelationsQueryResult =
      {
        id: new LegalPleadingId(),
        legalPleadingResult: {
          id: new LegalPleadingResultId(),
          legalPleadingCompleteAnalysis: null,
        },
      } as GetLegalPleadingWithRelationsQueryResult;

    legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail.mockResolvedValueOnce(
      legalPleadingWithoutAnalysis,
    );

    await expect(
      useCase.execute(
        sessionData,
        organizationSessionData,
        legalPleadingId,
        dto,
      ),
    ).rejects.toBeInstanceOf(LegalPleadingDoesNotContainCompleteAnalysisError);

    expect(exportDocumentGateway.convertHtmlToMarkdown).not.toHaveBeenCalled();
  });
});
