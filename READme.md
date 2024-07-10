

#  Suspicious Activity Reporter (SAR) 
Demo Link - https://www.loom.com/share/68d10402a41649ea93fbe478ce1d8460?sid=aba2b1c7-f696-44af-b634-735ab8190d26

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Frontend Setup (Next.js)](#frontend-setup-nextjs)
-   [Backend Setup (Flask)](#backend-setup-flask)
-   [Running the Application](#running-the-application)
-   [Running the Tests](#running-the-tests)
-   [File Structure](#file-structure)

## Introduction

This is a full-stack web application built using Flask for the backend and Next.js for the frontend. It provides a comprehensive example of how to set up and run a modern web application with these technologies.

## Features

-   RESTful API with Flask
-   Responsive frontend with Next.js
-   CRUD operations
-   Containerization
-   Searching, Sorting, Pagination and Error handling

## Technologies Used

-   **Backend**: Flask, SQLAlchemy
-   **Frontend**: Next.js, axios
-   **Database**: PostgreSQL 
-   **Testing**:  POSTMAN
-   **Containerization**: Docker

## Prerequisites

-   Python 3.9+
-   Node.js 18+
-   npm (Node Package Manager)
-   Postgres
-   Docker

## Installation

- ### Clone the repository

	`git clone https://github.com/TejasCodersDen/Tejas-Anchain-Fullstack-Challenge-forked.git`

- ### Open the repo in VS Code

- ###  Download PostgreSQL from: 		https://www.postgresql.org/download/

- ### Download docker from : 	https://www.docker.com/products/docker-desktop/


## Frontend Setup (Next.js)

1.  **Navigate to the frontend directory**:

    `cd frontend` 
    
2.  **Install frontend dependencies**:

    `npm install` 

    
3.  **Start the Next.js development server**:
    
    `npm run dev` 
    
    The frontend should now be running on `http://localhost:3000`.
    
4.  **You can also build your frontend(optional)**:
    
    `npm run build` 
    


## Backend Setup (Flask)

    
1.  **Install backend dependencies**
    
    `docker-compose build sar` 
        
2.  **Run the Flask server**:
    
    `docker-compose up sar` 
    
    The backend server should now be running on `http://localhost:5001`.
    
## Running the Application

To run the application, you need to have both the backend and frontend servers running concurrently.

1.  **Start the backend server**:
    
    `cd backend` 
    `docker-compose up sar` 
    
2.  **Start the frontend server**:
    
    `cd frontend` 
    `npm run dev` 
    
## Running the Tests

To execute test cases, follow the below steps:

1.  **Build the test cases**:
  
    `docker-compose build tests` 

2.  **Run the tests**

	`docker-compose up tests`
## File Structure


    ├── backend    				# Flask backend
    │   ├── migrations/     	# Database migrations
    │   └── tests/				# Test files
    │   ├── Dockerfile  		# Run app in Docker
    │   ├── Dockerfile.test  	# Run tests in Docker
    │   ├── app.py              # Flask application entry point
    │   ├── config.py 			# SQLAlchemy configuration
    │   ├── docker-compose.yml  # Docker configuration
    │   ├── models.py    		# Database models
    │   ├── schemas.py    		# Pydantic validation
    │   ├── requirements.txt    # Python dependencies
    │   ├── v1.py    			# API Versioning
	|   └── ...
    │              
    ├── frontend                # Nextjs frontend
    │   ├── components/         # Custom components
    │   ├── interfaces/         
    │   ├── pages/            
        │   ├── index.tsx       # Homepage
	│   ├── public/             # Static files
	│   ├── services/           
	│   ├── styles/             # CSS
	│   ├── package.json        # Node dependencies
	│   └── ...
	├── docs                	
	│   ├── APIDocumentation.md # API Doc
    └── README.md               # Project documentation
