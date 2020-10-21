# EmployeeTracker

### A solution for managing a company's employees using node, inquirer, and MySQL.

![Employee-Tracker](assets/finishedproduct.png)

## Table of Contents
* [Technologies Used](#Technologies_Used)
* [Getting Started](#Getting_Started)
<!-- * [Deployed Site](#Deployed) -->
* [Features](#Features)
* [Usage](#Usage)
* [Author](#Author)
* [Credits](#Credits)
* [License](#License)

## Technologies_Used
* Javascript (100%) 
* [node.js](https://www.npmjs.com/)
* [mysql](https://www.mysqltutorial.org/)

## Getting_Started

Once you have downloaded all the files (or done a git pull) from my repo there are a few steps you need to follow to set it up properly:
* Ppen up the code in mysql and visual studio code, make sure to save your msql code as the correct database name and password
* Run the database and make sure it is all set up with the seeded code
* In visual studio code, in a fresh integrated terminal (opened by right clicking the server.js and selecting it in the drop down) first run npm install and hit enter
* Once install is done, type in node server.js followed by enter to begin

To move throughout the menues use the arrow keys on your terminal and be sure to hit enter after you make your selection. If you run into trouble, or a completed action does not seem to have an end point and bring you back to the main set of questions - please select cltr (cmnd) + c and then re enter node server.js in the terminal, your action likely was not saved and you put something in that didn't work.

<!-- * Javascript (100%) 
* [node.js](https://www.npmjs.com/)
* [mysql](https://www.mysqltutorial.org/) -->
<!-- ## Deployed Site
[Employee-Tracker](https://warm-caverns-86071.herokuapp.com/) -->

## Features 


### __1. A mysql database__
    In order to store and read files using a database manager I had to integrate mysql code into my javascript.  I also needed to build an actual database to handle the data I was passing through (because json files aren't always so efficient.) 
![mysql-database](assets/codesnippet01.png)
    In order to call the database I used a series of calls in various places that corresponded to the peices of code I wanted to use, then I would ask the user what they wanted to do with it, it seems a little counterintuitive but we needed the data to help make an informed choice.
![database-calls](assets/codesnippet02.png)
### __2. The ability to add/delete/view employee/roles/departments__
    What is the point of a database if you cannot edit it efficiently? I feel like the I used this exemplafied the CRUD method- create the data, read the data (to the user), give the user the option to _update_ and then _delete_.

### __5. Other__

 __For later builds__

_Have validation steps with each question_

Though it's not required for this assignment it would be very very helpful to make sure a user doesn't input something that blank out the system with no obvious explanation as to why

_Have a view employee by manager section_

Because being able to edit the employe by manager should also lead to a view step. Crud and all that

_Have it work not in a terminal but in a web browser_

Because a web browser is a lot easier for most people to use.

  
## Usage
### This is meant for a manager to keep track of the roles, salaries and departments of anyone in their business 

## Author 
Rachael Kelm-Southworth

* [linkedin] (https://www.linkedin.com/in/rachael-kelm-southworth-87a3831b3) 

* [github] (https://github.com/RKSouth/)

 ## Credits

I would like to thank Kerwin, Manuel, Roger, Jerome and all my classmates for helping me understand this subject matter and anyone that contributed to make the base code.

## License
[MIT](https://choosealicense.com/licenses/mit/)




