# ZOA CLI

With the  Zalo OA Extension command line interface (ZOA CLI 0.0.1-beta), you can:

- initialize, build, dev, and deploy OA Extensions.



### Before you begin ###

Install the latest version of  [Node.js](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/getting-started) (or another package manager of your choice).

You has registered a app on zalo developer (https://developers.zalo.me/)

Install ZOA CLI last version
    <p>&nbsp;</p>
    - Yarn : yarn i -g zoa-cli 
    <p>&nbsp;</p>
    - npm : npm i -g zoa-cli


``
Note : Current version only support vite and react for develop extension.
``

<p>&nbsp;</p>

## Develop extension with ZOA CLI
Command line
  - zoa init: Init new project (required input Zalo AppId)
  - zoa login: Login to deploy source
  - zoa build: Build source by vitejs
  - zoa deploy: Deploy source

Manage source deploy : https://developers.zalo.me/app/{appId}/extension/versions
