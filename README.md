# SocialStats
Developed by: Rafael Castro Menjivar, Digvijaysinh Chauhan, Yash Palkhiwala, and Hari Ramachandran.

Rafael Alejandro Castro Menjivar
Global stats is a web application that combines statistical data about the countries in the world to
provide meaningful analysis and inferences. Three major data sources were used in this project:
1. World Bank open Data: This is a vast collection of development indicators for all the
countries, across several years. (Format: Excel)
2. World Religion Project: This is a dataset that detailed information about religious
adherence worldwide from 1945 to 2010. (Format: Converted to JSON)
3. UCDP Events Dataset: Henceforth referred to as the conflicts dataset, this provides
detailed data regarding internal conflicts within a nation, with details such as number of
deaths, the two parties involved in the conflict, start and end dates, etc. (Format: Excel)
The goal of our application is to gather data from different sources in order to analyze it. To
achieve this, we will display visualizations in order to show trends, and with it, try to find
correlations between the different datasets.

Our application is built on a modified version of the MEAN stack, with MySQL, Neo4j in
addition to Mongo as the databases, Express as the backend web framework, Angular as the
frontend framework, and Node as the backend runtime environment.
We decided to use NoSQL for our religion dataset because different countries do not follow
certain religions so there were several values that would be null for certain religions. Neo4j was
chosen because it would best represent various relationships between various religions and
sub-religions. We stored our conflicts and World Bank data on a MySQL relational database.
The data from these two datasets was fairly well structured and was easy to include.
Our user information was stored on a Mongo database. Both Neo4j and MySQL were hosted on
AWS, while the Mongo database was hosted on mLab.
For the server side, we have an api for each of our data sources: api_aws.js, api_religion.js and
api_world.js. And for the frontend, which was created using Angular CLI to generate the
appropriate modules, we have the main app module that contains multiple sub modules. Each sub
module represents a page for a dataset, and it contains a visualizer, a right side bar that displays
the different queries, and a component for each query. For instance for the religion dataset:
religions is the main religion page, religion-visualizer is the left hand side of the page, that works
as a placeholder that changes based on the query been displayed, and religion-queries contains
the different queries, as well as the right side panel that appears on the right hand side.
Then, some of our key node_modules include Chart.js, ng2-charts, MySQL, ng2-map. We also
used bootstrap to provide a clean and cohesive look across the entire application.
