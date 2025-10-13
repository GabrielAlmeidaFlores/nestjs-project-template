import { Injectable } from '@nestjs/common';

import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';

@Injectable()
export class LoremIpsumService implements GenerativeIaGateway {
  protected readonly _type = LoremIpsumService.name;

  public async generateFlashResponseFromPromptAndFiles(
    _: string,
    __: Buffer[],
  ): Promise<string | null> {
    return new Promise((resolve) => {
      resolve(`
# Project Title

### A brief subtitle that describes the project's main purpose.

This is the main body of the README. This section should provide a more detailed overview of the project. Explain the problem it solves, the main features, and the technologies used. You can also include information about the project's status, its goals, and any key differentiators.

For example, you might want to add sections for:
* **Installation:** How to get the project set up and running.
* **Usage:** How to use the project after installation.
* **Contributing:** Guidelines for how others can contribute.
* **License:** Information about the project's license.`);
    });
  }

  public async generateHighQualityResponseFromPromptAndFiles(
    _: string,
    __: Buffer[],
  ): Promise<string | null> {
    return new Promise((resolve) => {
      resolve(
        `
# Project Title

### A brief subtitle that describes the project's main purpose.

This is the main body of the README. This section should provide a more detailed overview of the project. Explain the problem it solves, the main features, and the technologies used. You can also include information about the project's status, its goals, and any key differentiators.

For example, you might want to add sections for:
* **Installation:** How to get the project set up and running.
* **Usage:** How to use the project after installation.
* **Contributing:** Guidelines for how others can contribute.
* **License:** Information about the project's license.`,
      );
    });
  }
}
