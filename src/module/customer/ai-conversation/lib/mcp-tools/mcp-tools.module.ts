import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { McpAnalysisRecordHandler } from '@module/customer/ai-conversation/lib/mcp-tools/handler/mcp-analysis-record.handler';
import { McpClientHandler } from '@module/customer/ai-conversation/lib/mcp-tools/handler/mcp-client.handler';
import { McpLegalPleadingHandler } from '@module/customer/ai-conversation/lib/mcp-tools/handler/mcp-legal-pleading.handler';
import { InternalAnalysisToolsService } from '@module/customer/ai-conversation/lib/mcp-tools/internal-analysis-tools.service';
import { McpToolsGateway } from '@module/customer/ai-conversation/lib/mcp-tools/mcp-tools.gateway';

@Module({
  imports: [DatabaseModule],
  providers: [
    McpAnalysisRecordHandler,
    McpClientHandler,
    McpLegalPleadingHandler,
    {
      provide: McpToolsGateway,
      useClass: InternalAnalysisToolsService,
    },
  ],
  exports: [McpToolsGateway],
})
export class McpToolsModule {
  protected readonly _type = McpToolsModule.name;
}
