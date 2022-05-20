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
- Clone the repo: `git clone https://github.com/anuragbansal009/app-dct.git`

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
Import the data to MongoDB database named `graph` and create a collection called `realdata`.
Import the dataset given in `backend/MongoDB Data/Dataset.json`

### Instalation
To install the modules, run the following command in a terminal/console window:
```bash
> repositoryPath: $ npm install
```

### Basic usage


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

```
git checkout -b develop
```
Do Editing

```
git add .
git commit -m "Edited"
git pull origin master
git rebase master develop
git checkout master
git merge develop
git branch -d develop
git push origin master
```