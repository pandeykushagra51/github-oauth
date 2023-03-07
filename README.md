
## Description

This project is created using **NestJs and Typescript** and **hosted on aws ec2** instance, more details is given at the end of project [demo](http://54.250.248.9:3000/login)

# Follow the below steps to run the project in local(because of github redirect uri configuration)

Please note that the project can only run on http://127.0.0.1:3000 as github redirect uri always try to redirect you to this host only

## Clone the git repositry by copying and pasting below command in terminal

```bash
git clone https://github.com/pandeykushagra51/github-oauth.git
```
## Move to directory containing project

```bash
cd github-oauth
```
## Install dependency

```bash
npm install
```
## Running the project

```bash
npm run start
```

## Routes for varioous pages in application
- **/login** -- this page is used to go go to authorization page
- **/user**  -- this page is used to enter the name of repo and create the repo 

if user want to create repo with different account then he/she can simply logout from /user page and then clicking the link to signin as different user

## To get the live demo [Click here](http://54.250.248.9:3000/login)
- Error code 500 means some srever error is there, i.e. this might be from github refused to connect or no invalid name in text box
- Error code 422 means the repository with this name already exist

## Please not that I didn't find any reason to use SQLite or any persitent stoarge as per project requirement

## Feel free to reach out to me at any time if you find any error

- email - [Kushagra Pandey](pandeykushagra51@gmail.com)
- Phone - 8252103987

