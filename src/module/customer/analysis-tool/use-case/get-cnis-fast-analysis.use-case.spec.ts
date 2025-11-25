import { Test } from '@nestjs/testing';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import { GetCnisFastAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-inss-benefit/query/result/get-cnis-fast-analysis-inss-benefit.query.result';
import { GetCnisFastAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-legal-proceeding/query/result/get-cnis-fast-analysis-legal-proceeding.query.result';
import { GetCnisFastAnalysisResultQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/query/result/get-cnis-fast-analysis-result.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CnisFastAnalysisInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-inss-benefit/value-object/cnis-fast-analysis-inss-benefit-id/cnis-fast-analysis-inss-benefit-id.value-object';
import { CnisFastAnalysisLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-legal-proceeding/value-object/cnis-fast-analysis-legal-proceeding-id/cnis-fast-analysis-legal-proceeding-id.value-object';
import { CnisFastAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/value-object/cnis-fast-analysis-result-id/cnis-fast-analysis-result-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { GetCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/get-cnis-fast-analysis.response.dto';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GetCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/get-cnis-fast-analysis.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';

describe(GetCnisFastAnalysisUseCase.name, () => {
  let useCase: GetCnisFastAnalysisUseCase;

  const fileProcessorGateway: jest.Mocked<FileProcessorGateway> = {
    getFileSignedUrl: jest.fn(),
    getOriginalFileName: jest.fn(),
    uploadFile: jest.fn(),
    getFileBuffer: jest.fn(),
  };

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

  const buildCnisFastAnalysisQueryResult = (
    options: {
      withDocument?: boolean;
      withResult?: boolean;
      withProfilePictures?: boolean;
    } = {},
  ): GetCnisFastAnalysisWithRelationsQueryResult => {
    const responsible = (
      picPath: string | null,
    ): GetOrganizationMemberWithCustomerRelationQueryResult =>
      GetOrganizationMemberWithCustomerRelationQueryResult.build({
        id: new OrganizationMemberId(),
        owner: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        customer: GetCustomerQueryResult.build({
          id: new CustomerId(),
          name: 'Test Customer',
          profilePicture: picPath,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        }),
      });

    const client = GetAnalysisToolClientWithRelationsQueryResult.build({
      id: new AnalysisToolClientId(),
      name: 'Test Client',
      federalDocument: null,
      email: null,
      phoneNumber: null,
      birthDate: null,
      gender: null,
      clientType: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      analysisToolClientInssBenefit: [],
      analysisToolClientLegalProceeding: [],
      createdBy: responsible(null),
      updatedBy: responsible(null),
      inssPassword: null,
    });

    return GetCnisFastAnalysisWithRelationsQueryResult.build({
      id: new CnisFastAnalysisId(),
      cnisDocument: options.withDocument === true ? 'path/to/cnis.pdf' : null,
      status: AnalysisStatusEnum.COMPLETED,
      analysisToolClient: client,
      cnisFastAnalysisResult:
        options.withResult === true
          ? GetCnisFastAnalysisResultQueryResult.build({
              id: new CnisFastAnalysisResultId(),
              cnisCompleteAnalysis: 'Completa',
              cnisSimplifiedAnalysis: 'Simplificada',
              clientName: null,
              clientFederalDocument: null,
              clientBirthDate: null,
              clientLastAffiliationDate: null,
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: null,
            })
          : null,
      cnisFastAnalysisInssBenefit: [
        GetCnisFastAnalysisInssBenefitQueryResult.build({
          id: new CnisFastAnalysisInssBenefitId(),
          inssBenefitNumber: '123456',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        }),
      ],
      cnisFastAnalysisLegalProceeding: [
        GetCnisFastAnalysisLegalProceedingQueryResult.build({
          id: new CnisFastAnalysisLegalProceedingId(),
          legalProceedingNumber: '987654',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        }),
      ],
      createdBy: responsible(
        (options.withProfilePictures ?? false) ? 'path/creator.jpg' : null,
      ),
      updatedBy: responsible(
        (options.withProfilePictures ?? false) ? 'path/updater.jpg' : null,
      ),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetCnisFastAnalysisUseCase,
        { provide: FileProcessorGateway, useValue: fileProcessorGateway },
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: CnisFastAnalysisQueryRepositoryGateway,
          useValue: cnisFastAnalysisQueryRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(GetCnisFastAnalysisUseCase);
    jest.clearAllMocks();
  });

  it('should return complete CNIS analysis with all fields and signed URLs', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();
    const queryResult = buildCnisFastAnalysisQueryResult({
      withDocument: true,
      withResult: true,
      withProfilePictures: true,
    });

    const cnisSignedUrl = new URL('https://example.com/cnis.pdf');
    const cnisOriginalName = 'meu_cnis_original.pdf';
    const creatorPicSignedUrl = new URL('https://example.com/creator.jpg');
    const updaterPicSignedUrl = new URL('https://example.com/updater.jpg');
    const EXPECTED_SIGNED_URL_CALLS = 3;

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail.mockResolvedValueOnce(
      queryResult,
    );
    fileProcessorGateway.getFileSignedUrl
      .mockResolvedValueOnce(cnisSignedUrl)
      .mockResolvedValueOnce(creatorPicSignedUrl)
      .mockResolvedValueOnce(updaterPicSignedUrl);
    fileProcessorGateway.getOriginalFileName.mockResolvedValueOnce(
      cnisOriginalName,
    );

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      cnisFastAnalysisId,
    );

    expect(result).toBeInstanceOf(GetCnisFastAnalysisResponseDto);
    expect(
      cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail,
    ).toHaveBeenCalledWith(
      cnisFastAnalysisId,
      orgSessionData.organizationId,
      CnisFastAnalysisNotFoundError,
    );

    expect(result.inssBenefitNumber).toEqual(['123456']);
    expect(result.legalProceedingNumber).toEqual(['987654']);

    expect(fileProcessorGateway.getFileSignedUrl).toHaveBeenCalledTimes(
      EXPECTED_SIGNED_URL_CALLS,
    );
    expect(fileProcessorGateway.getOriginalFileName).toHaveBeenCalledTimes(1);
    expect(result.cnisDocument).toBe(cnisSignedUrl.toString());
    expect(result.cnisDocumentOriginalFileName).toBe(cnisOriginalName);
    expect(result.createdBy.profilePicture).toBe(
      creatorPicSignedUrl.toString(),
    );
    expect(result.updatedBy.profilePicture).toBe(
      updaterPicSignedUrl.toString(),
    );
  });

  it('should return analysis without file URLs when fields are null', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();
    const organizationMember = buildOrganizationMember();
    const queryResult = buildCnisFastAnalysisQueryResult({
      withDocument: false,
      withResult: false,
      withProfilePictures: false,
    });

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail.mockResolvedValueOnce(
      queryResult,
    );

    const result = await useCase.execute(
      sessionData,
      orgSessionData,
      cnisFastAnalysisId,
    );

    expect(result).toBeInstanceOf(GetCnisFastAnalysisResponseDto);
    expect(fileProcessorGateway.getFileSignedUrl).not.toHaveBeenCalled();
    expect(fileProcessorGateway.getOriginalFileName).not.toHaveBeenCalled();
    expect(result.cnisDocument).toBeUndefined();
    expect(result.cnisDocumentOriginalFileName).toBeUndefined();
    expect(result.createdBy.profilePicture).toBeUndefined();
    expect(result.updatedBy.profilePicture).toBeUndefined();
    expect(result.cnisFastAnalysisResult).toBeUndefined();
  });

  it('should throw OrganizationMemberNotFoundError when member is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const cnisFastAnalysisId = new CnisFastAnalysisId();

    organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, cnisFastAnalysisId),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });
});
