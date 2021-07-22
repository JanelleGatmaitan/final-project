# Sprout
Sprout is an application for home gardeners who want to keep track of the produce growing in the garden.

# Live link
https://vegetable-garden-tracker.herokuapp.com/

# Technologies Used
- React.js
- Node.js
- Express
- PostgreSQL
- HTML5
- CSS3

# Features
- User can create a vegetable patch 
- User can write notes about their vegetable patch. How much sunlight it gets, soil quality, etc x
- User can edit notes 
- User can search for vegetables 
- User can add vegetables to the vegetable patch 
- User can delete vegetables 
- User can view list of what has been added to their vegetable patch 
- User can view vegetables in detailed view 
- User can view gardening tips
- User can cross off items in a set of predetermined daily tasks 

# Getting Started
1. Clone the repo and navigate to the directory

```
git clone https://github.com/JanelleGatmaitan/sprout.git
cd sprout
```
2. Install all dependencies
```
npm install
```

3. Start your PostgreSQL server
 ```
sudo service postgresql start
```
4. Import existing database
```
npm run db:import
```
5. Compile project
```
npm run dev
```
6. Access the application by going to https://localhost:3000 in the browser
