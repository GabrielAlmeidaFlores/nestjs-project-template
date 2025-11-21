import { StreamableFile } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { GetCnisFastAnalysisResultQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/query/result/get-cnis-fast-analysis-result.query.result';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CnisFastAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/value-object/cnis-fast-analysis-result-id/cnis-fast-analysis-result-id.value-object';
import { CnisFastAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-does-not-contain-complete-analysis.error';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { DownloadCnisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-cnis-complete-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';

describe(DownloadCnisCompleteAnalysisUseCase.name, () => {
  let useCase: DownloadCnisCompleteAnalysisUseCase;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerIdAndAuthIdentityId: jest.fn(),
      findOneByOrganizationMemberId: jest.fn(),
      findOneByCustomerIdAndOrganizationId: jest.fn(),
      findOneByCustomerIdAndOrganizationIdWithRelations: jest.fn(),
    };

  const cnisFastAnalysisQueryRepositoryGateway: jest.Mocked<CnisFastAnalysisQueryRepositoryGateway> =
    {
      findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail:
        jest.fn(),
      listByOrganizationId: jest.fn(),
    };

  const exportDocumentGateway: jest.Mocked<ExportDocumentGateway> = {
    downloadFileAsStreamable: jest.fn(),
    convertHtmlToMarkdown: jest.fn(),
    convertMarkdownToHtml: jest.fn(),
    downloadFile: jest.fn(),
  };

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

  const buildOrganizationMember = (): GetOrganizationMemberQueryResult =>
    ({
      id: new OrganizationMemberId(),
    }) as unknown as GetOrganizationMemberQueryResult;

  const buildCnisFastAnalysisResult = (
    analysis: string | null,
  ): GetCnisFastAnalysisResultQueryResult =>
    GetCnisFastAnalysisResultQueryResult.build({
      id: new CnisFastAnalysisResultId(),
      cnisCompleteAnalysis: analysis,
      clientName: null,
      clientFederalDocument: null,
      clientBirthDate: null,
      clientLastAffiliationDate: null,
      cnisSimplifiedAnalysis: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

  const buildCnisFastAnalysisQueryResult = (
    options: {
      withResult?: boolean;
      withCompleteAnalysis?: boolean;
    } = {},
  ): GetCnisFastAnalysisWithRelationsQueryResult => {
    const resultMock =
      options.withResult === true
        ? buildCnisFastAnalysisResult(
            options.withCompleteAnalysis === true ? 'Texto da análise' : null,
          )
        : null;

    return {
      id: new CnisFastAnalysisId(),
      cnisFastAnalysisResult: resultMock,
    } as unknown as GetCnisFastAnalysisWithRelationsQueryResult;
  };

  const buildStreamableFile = (): StreamableFile =>
    new StreamableFile(Buffer.from('fake-file-data'));

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DownloadCnisCompleteAnalysisUseCase,
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisQueryRepositoryGateway,
          useValue: cnisFastAnalysisQueryRepositoryGateway,
        },
        {
          provide: ExportDocumentGateway,
          useValue: exportDocumentGateway,
        },
      ],
    }).compile();

    useCase = module.get(DownloadCnisCompleteAnalysisUseCase);
    jest.clearAllMocks();
  });

  it('should download complete analysis in PDF successfully', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const format = ExportDocumentFormatEnum.PDF;
    const member = buildOrganizationMember();
    const analysisResult = buildCnisFastAnalysisQueryResult({
      withResult: true,
      withCompleteAnalysis: true,
    });
    const streamableFile = buildStreamableFile();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail.mockResolvedValueOnce(
      analysisResult,
    );
    exportDocumentGateway.downloadFileAsStreamable.mockResolvedValueOnce(
      streamableFile,
    );

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      cnisFastAnalysisId,
      format,
    );

    expect(result).toBe(streamableFile);
    expect(exportDocumentGateway.downloadFileAsStreamable).toHaveBeenCalledWith(
      analysisResult.cnisFastAnalysisResult?.cnisCompleteAnalysis,
      ExportDocumentFormatEnum.PDF,
      'analise_completa_rapida_cnis',
    );
  });

  it('should throw OrganizationMemberNotFoundError when member is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(
        sessionData,
        orgSessionData,
        cnisFastAnalysisId,
        ExportDocumentFormatEnum.DOCX,
      ),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('should throw CnisFastAnalysisNotFoundError when analysis is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const member = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail.mockRejectedValueOnce(
      new CnisFastAnalysisNotFoundError(),
    );

    await expect(
      useCase.execute(
        sessionData,
        orgSessionData,
        cnisFastAnalysisId,
        ExportDocumentFormatEnum.PDF,
      ),
    ).rejects.toBeInstanceOf(CnisFastAnalysisNotFoundError);
  });

  it('should throw CnisFastAnalysisNotFoundError when analysis result (cnisFastAnalysisResult) is null', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const member = buildOrganizationMember();
    const analysisResult = buildCnisFastAnalysisQueryResult({
      withResult: false,
    });

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail.mockResolvedValueOnce(
      analysisResult,
    );

    await expect(
      useCase.execute(
        sessionData,
        orgSessionData,
        cnisFastAnalysisId,
        ExportDocumentFormatEnum.PDF,
      ),
    ).rejects.toBeInstanceOf(CnisFastAnalysisNotFoundError);
  });

  it('should throw CnisFastAnalysisDoesNotContainCompleteAnalysisError when complete analysis is null', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const member = buildOrganizationMember();
    const analysisResult = buildCnisFastAnalysisQueryResult({
      withResult: true,
      withCompleteAnalysis: false,
    });

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail.mockResolvedValueOnce(
      analysisResult,
    );

    await expect(
      useCase.execute(
        sessionData,
        orgSessionData,
        cnisFastAnalysisId,
        ExportDocumentFormatEnum.PDF,
      ),
    ).rejects.toBeInstanceOf(
      CnisFastAnalysisDoesNotContainCompleteAnalysisError,
    );
  });
});
