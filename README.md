# ZOA CLI

With the Zalo OA Extension Command Line Interface (ZOA CLI 0.0.1-beta), you can:

- Initialize, build, develop, and deploy the OA Extension.



### Before you begin ###

Install the latest version of  [Node.js](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/getting-started) (or another package manager of your choice).

You have registered an app on Zalo Developer (https://developers.zalo.me/)

Install the latest version of ZOA CLI:

    yarn: yarn global add zoa-cli 
    
    npm: npm i -g zoa-cli


``
Note: The current version only supports Vite and React for developing extension.
``

<p>&nbsp;</p>

## Develop extension with ZOA CLI
Command Line:
  - zoa init: Initialize a new project (requires Zalo App ID input)
  - zoa login: Log in to deploy source
  - zoa build: Build source using Vite.js
  - zoa deploy: Deploy source

Manage source deploy: https://developers.zalo.me/app/{appId}/extension/versions
