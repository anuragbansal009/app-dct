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

* Set the default logo URL in 
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
        * JWT_SECRET: `secretkey`

* Create a database in MongoDB with the name of `hospital`

## Steps for Usage

1. Create an admin by filling these details and click on register button at the bottom of the page.
2. Login with admin with username and password, if admin forgot the password then click on forgot password to reset the password.
3. After clicking on the login button, admin can create a new doctor with the following details.
4. By clicking on login button the page will redirect to doctor login page.
5. Fill username and password to login or click on forgot password if you don’t remember your password.
6. This page will show when we click on forgot password button and if we click on login button then it will go back Doctor login page.
7. After we logged in with the doctor it will show this dashboard.
8. If we click on the services button in the Navbar then this modal will show up where we can add any service for any particular doctor.
9. The view tab contains all the services of that doctor and we can also delete or edit any particular service.
10. If we want to add other services like 'tea', 'coffee' etc. for any doctor then we can add it form here.
11. If we click on the icon that represents the labtest then this modal will show up in which we can add any labtest under any particular doctor.
12. The view tab contains all the Labtest of that doctor and we can also delete or edit any particular labtest.
13. For patient registration click on the first icon in the navbar, fill the following details and click on submit button.
14. After clicking on submit button, billing section will show up in which we can add service or a labtest with discount under that patient and click on the payment button to pay the amount.
15. If the patient paid less amount than the subtotal then it will show Pending status for the bill.
16. When we click on 'Pending', billing section will show up where we can see the previous due amount and if we pay the full due amount then the status will changed to 'Paid'.
17. Now the status is 'Paid' because the patient paid the whole amount.
18. If we click on the patient id on the dashboard then we can see all the details for that patient.
19. By clicking on patient vitals icon we can add vitals for that patient and if we hover on that icon after filling then it will show up like this.
20. We can also see past, present and future appointments by selecting the date from the calendar. We can also search any particular patient, doctor, pending, unpaid, paid appointments form the search box.
21. By clicking on 'refund' button on the dashboard this Refund section will show up where we can refund any service for that patient but only after filling the reason box.
22. The appointments section will show all the appointments for that patient.
23. Bill Summary will show all the details of bill for that particular patient and we can aslo print the bill by clicking on that print icon.
24. After clicking on print icon this section will show up in which we can print the bill by clicking on that print button.
25. We can also book temporary Appointments for any patient from the calendar which is present in the navbar. Click on the temporary patient button or click on the day or week view of the calendar and select the date and time to book an appointment.
26. Temporary appointment for the patient will look like this.
27. If we click on update icon and fill all the details for temporary patient then its state will change and then we can start billing for that patient.
28. This is what it will look like after filling the all the details for temporary patient which was 'Mr. Sanjay' and if we click on 'Unpaid' then we can create bill similarly we created for other patient.
