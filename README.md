# Teamtailor Joblist Assignment 🚀
*by Per Rawdin*

This is a repository for the Teamtailor developer assignment completed by Per Rawdin.  
An application presenting a job list using the [Teamtailor API](https://docs.teamtailor.com/#teamtailor-api). Built with React and Fetch API.  
The application is deployed to production and available at [https://rawdin.se/teamtailor](https://rawdin.se/teamtailor).  
For code that is interacting with the API, please see the *Important files* section below.


## 🌍 Production URL
- [https://rawdin.se/teamtailor](https://rawdin.se/teamtailor)

## 🔧 Features 
- List job ads available
- Filter job ads by location 
- View job ads with additional details
- Add job ads to favourites (session only)

## 🚀 Technologies used
- React
- JavaScript
- Fetch API
- SemanticUI

## ✍️ Coding style

- Standard
- JSdoc

## 📄 Important files
```/src/components/Joblist/Joblist.js``` *Joblist component.*  Fetches and lists job ads from API. Sets required pagination URLs from the RESTful HAL links provided.  View specific ad with additional information in a modal.

```/src/components/LocationFilter/LocationFilter.js``` *LocationFilter component.*  
Fetch all locations available for filtering job ads. Uses the ```locations``` API route. Traverses through all pages available for location resources. Set filter state through the application when selected.
