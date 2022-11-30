# Nekkoh

A full stack web application for pet owners/lovers who want to share photos of their pets.

## Why I Built This

I enjoy sharing pictures of my pets and I love viewing pet-related profiles in socia media. What better way is there to learn and build a full stack CRUD app than to create something that accomplishes just that?

## Technologies Used
- React.js
- Webpack
- Bootstrap 5
- Node.js
- HTML5
- CSS3
- Dokku

## Live Demo

Try the application live at [https://nekkoh.com/](https://nekkoh.com/)

## Features

- User can view a gallery of pet photos
- User can post their own photo
- User can update the content of their own post
- User can delete their own post
- User can comment on a post
- User can delete their comment on a post

## Stretch Features

- User will be able to search for another user's posts
- User will be able to view their profiles
- User will be able to like posts

## Getting Started
1. Clone repository
```shell
git clone git@github.com:arcan9/nekkoh.git
cd nekkoh
```
2. Install all dependencies with NPM
```shell
npm install
```
3. Import the example database to PostgreSQL
```shell
npm run db:import
```
4. To examine the database
```shell
pgweb --db=nekkohApp
```
5. Start the project
```shell
npm run dev
```
Once started you can view the app by opening http://localhost:3000 in your browser.
