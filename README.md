![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white) 
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

# App - DCT

## Quick Start

- [Download the latest release](https://github.com/anuragbansal009/app-dct)
- Clone the private repo: `git clone https://github.com/anuragbansal009/app-dct.git`

#### <i>Prerequisites</i>
Before you begin, make sure your development environment includes `Node.js®` and an `npm` package manager.

###### Node.js
Angular 13 requires `Node.js` version `^12.20`, `^14.15` or `^16.10`.

- To check your version, run `node -v` in a terminal/console window.
- To get `Node.js`, go to [nodejs.org](https://nodejs.org/).

###### MongoDB
Angular 13 requires `MongoDB` version `^3.6`.

- To get `MongoDB`, go to [mongodb.com](https://mongodb.com/).

###### Nodemon
This requires Nodemon for local development for hosting NodeJS server.
Install Nodemon globally using a terminal/console window.
```bash
$ npm i nodemon
```

###### Angular CLI
Install the Angular CLI globally using a terminal/console window.
```bash
$ npm install -g @angular/cli
```

### Importing Data
Import the data(if any) to MongoDB database named `hospital`.

### Instalation
To install the modules, run the following command in a terminal/console window:
```bash
> repositoryPath: $ npm install
```

### Basic usage
To start using the web app on local computer:
```bash
> repositoryPath: $ npm start
# local NodeJS Server with hot reload at port 5000
# dev server with hot reload at http://localhost:4200
```

Navigate to [http://localhost:4200](http://localhost:4200). The app will automatically reload if you change any of the source files.

### Build

Run `build` to build the project. The build artifacts will be stored in the `dist/` directory.

```bash
# build for production with minification
$ npm run build
```
## Commands for pushing to GitHub
```
git init
git remote add origin https://github.com/anuragbansal009/app-dct.git
git add .
git commit -m "Commit Name"
git branch -M master
git push -u origin master
```

## Updating Repository with collaborators

```bash
git checkout -b development_branch_name

# Do Editing

git add .
git commit -m "Edited"
git pull origin master
git rebase master development_branch_name
git checkout master
git merge development_branch_name
git branch -d development_branch_name
git push origin master
```

## Description
The frontend components can be viewed by going to the following path `repositoryPath\client\src\app`. Each component has a different folder which are linked to the `repositoryPath\client\src\appapp.module.ts` file. Routing is enabled in the web app, which can be changed using the `repositoryPath\client\src\appapp-routing.module.ts`.

Angular Material Library along with CoreUI Library and Bootstrap are used in the web app, which are imported in the `repositoryPath\client\src\styles.css` file. Several other libraries are also used and imported which can be seen using the `repositoryPath\client\package.json` file.

Angular Material packages are all imported and exported in the `repositoryPath\client\src\material.module.ts` file, which can be imported in an module file using the command:
```bash
import { MaterialModule } from '-Relative Path-';
```

CoreUI packages are all imported and exported in the `repositoryPath\client\src\coreui.module.ts` file, which can be imported in an module file using the command:
```bash
import { CoreUIModule } from '-Relative Path-';
```

Bootstrap for CSS is imported inside the `repositoryPath\client\src\styles.css` file, which then helps in using different bootstrap classes for better CSS usage.

The frontdesk homepage will be `doctor-dashboard` component. 

The HTML code inside the component.html file can be read easily, if one knows the basic bootstrap classes and the functions for those HTML code(if any) can be found in the component.ts file for the component. If using any outside reference in the HTML, it should be imported into the component.module file. Any component scoped CSS should be definied in the component.css file.

Backend models can be found in the file `repositoryPath\server\models`.

Backend middleware can be found in the file `repositoryPath\server\middleware`.

Backend routing can be found in the file `repositoryPath\server\routes`.

Backend routes are of 7 different types which can be used to view all the API present in the node server. The collections present are:
* Admin
* Bill
* Doctor
* Labtest
* OtherServices
* Patient
* Services

The different libraries used in the backend node server are given in the `repositoryPath\server\package.json` file.

## Setup
* Install the Pre-Requisites and complete the installation using 
    ```bash
    > repositoryPath: $ npm install
    ```

* Set the recaptcha sitekey key in 
    * `repositoryPath\client\environment\environment.ts`
    * `repositoryPath\client\environment\environment.dev.ts`

* Set the account email-id and password to send the confirmation emails in 
    * `repositoryPath\server\.env`
        * USER: `email-id`
        * PASSWORD: `password`
        
* Set the MongoURI to the required one in
    * `repositoryPath\server\.env`
        * MONGOURI: `Mongo DB URI`
    * `repositoryPath\server\db\db.js`
        * Line 3 (const mongoURI): `Mongo DB URI`

* Set secret key in
    * `repositoryPath\server\.env`
        * JWT_SECRET: secretkey

* Create a database in MongoDB with the name of `hospital`

## Steps for Usage
