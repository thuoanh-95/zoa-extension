# ZOA CLI

With the Zalo OA Extension Command Line Interface (ZOA CLI 0.0.1-beta), you can:

- initialize, build, dev and deploy OA Extension.



### Before you begin ###

Install the latest version of  [Node.js](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/getting-started) (or another package manager of your choice).

You have registered an app on Zalo Developer (https://developers.zalo.me/)

Install ZOA CLI last version

    Yarn: yarn i -g zoa-cli 
    
    npm: npm i -g zoa-cli


``
Note: The current version only supports Vite and React for developing extensions.
``

<p>&nbsp;</p>

## Develop extension with ZOA CLI
Command line
  - zoa init: Init new project (required input Zalo App ID)
  - zoa login: Login to deploy source
  - zoa build: Build source by Vite.js
  - zoa deploy: Deploy source

Manage source deploy : https://developers.zalo.me/app/{appId}/extension/versions
