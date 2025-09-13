# Whatsreal Mobile Angular

Ex: This project is a SPA built with Angular to show users and their phone plans with WhatsReal Mobile, focusing on modern UX and integration with a simulated backend via local JSON.

---

## Technologies

- **Angular 18** - Frontend framework
- **Angular Material 18** - UI Components
- **RxJS** – reactive programming  
- **TypeScript** – OO Programming language
- **SCSS/SASS** – Styling  
- **Jasmine & Karma** – Unit testing  
- **HttpClient** – Simulated REST API consumption  

---

## Features

- Display of user cards with basic information
- Plan status reflected with card color  
- Parts of the JSON with missing commas and other errors were found; these were dynamically fixed by the fixJson function in app/core/services. Also implemented automatic correction of duplicate IDs.  
- User detail modal on card click  
- Responsive layout with subtle hover animations  

---

## How to Run the Project

### Prerequisites

- Node.js >= 20.x  
- Angular CLI >= 18.x  

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/vitorchane/whatsreal_mobile_angular
   cd whatsreal_mobile_angular

2. Install project dependencies:
    ```bash
    npm install

3. Run the development server:
    ```bash
    ng serve

4. (Optional) Run tests:
    ```bash
    ng test

## How to Run the Project (Second Option)

### Prerequisites

- Docker 

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/vitorchane/whatsreal_mobile_angular
   cd whatsreal_mobile_angular

2. Build the Docker image:
    ```bash
    docker build -t my-angular-app .

3. Run the container:
    ```bash
    docker run -p 4200:80 my-angular-app