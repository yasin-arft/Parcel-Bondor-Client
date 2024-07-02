# Parcel Bondor

[View live](https://parcel-bondor.web.app)
-
## Overview
Parcel Bondor is a parcel management web application designed to streamline the process of booking and delivering parcels. Users can register as either a user or a deliveryman. Users can book and manage parcels. After admins assign a deliveryman to parcels, the deliveryman can either deliver or cancel the parcel. This project aims to solve the problem of efficient parcel management and tracking.

## Main Features
- **Parcel Booking:** After login as an user, an user can easily book parcels by just filling a form with necessary information.
- **Status Tracking:** The user who booked the parcel, the deliveryman assigned with the parcel and admins can easily track status of a parcel.
- **Payment:** User can easily pay his/her bill with card payment system.

## Technologies used
- React, React Router
- Tailwind, Shadcn
- Node Js
- Express Js
- MongoDB Js
- Firebase(auth)
- Stripe Payment system
- React hook form, Tanstack query, Axios, etc.

## To run this project locally follow this steps

### 1: Clone the repository.
```
git clone https://github.com/yasin-arft/Parcel-Bondor-Client.git
```
- For server repository visit: https://github.com/yasin-arft/Parcel-Bondor-Server and setup the server

### 2: Install dependencies.
```
npm install
```
### 3: Set up variables
- Create a `.env` file in the root directory
- Set Up necessary variables

```
<!-- *Firebase SDKs* -->
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=

<!-- *ImageBB api* -->
VITE_image_hosting_key=

<!-- *Server url* -->
VITE_server_URL=

<!-- *Stripe publishable key* -->
VITE_payment_PK=
```

### 3: Run the project
```
npm run dev
```