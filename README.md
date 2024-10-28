# Commodle

Commodle is a bathroom-finder application designed for people going on trips or just needing to find bathrooms for their personal needs.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Developers](#developers)

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/commodle.git
    ```
2. Navigate to the project directory:
    ```sh
    cd commodle
    ```
3. Install the dependencies:
    ```sh
    npm install
    @mapbox/mapbox-gl-geocoder,
    @mapbox/search-js-react,
    @react-google-maps/api,
    @testing-library/jest-dom,
    @testing-library/react,
    @testing-library/user-event,
    @vis.gl/react-google-maps,
    axios,
    firebase,
    mapbox-gl,
    react,
    react-dom,
    react-icons,
    react-map-gl,
    react-router-dom,
    react-scripts,
    react-simple-star-rating,
    react-toastify,
    reactjs-popup,
    reactstrap,
    web-vitals
    ```
4. Install SqlAlchemy:
    ```sh
    pip install sqlalchemy
    ```
5. Start the development server:
    ```sh
    npm start
    ```

6. Install uvicorn for FastAPI app
    ```sh
    pip install uvicorn
    ```

7. Start FastAPI app
    ```sh
    uvicorn src.main:app --reload
    ```

## Usage

Once the server is running, open your browser and navigate to `http://localhost:3000/` to use the application.
Alternatively, you may access various deployments through vercel, which should be linked under the github About!

## Features
- **Home Page**: Displays a searchable map with custom bathroom markers.
- **Review Page**: View reviews of various bathrooms.
- **Favorites Page**: Mark and view your favorite bathrooms.
- **About Page**: Learn more about the developers behind Commodle.
- **Leave Review**: Authenticated users can leave reviews for bathrooms by clicking a marker on the Home Page.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```sh
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

## Developers

- Kaleigh Powell
- Zachary Dulaney
- Colby Willman
- Jacob Yee
