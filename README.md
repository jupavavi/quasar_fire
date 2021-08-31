# Quasar Fire

## How to run

### npm
```bash
# install dependencies
$ npm install

# server loaded at localhost:8080
$ npm run start
```

### yarn
```bash
# install dependencies
$ yarn

# server loaded at localhost:8080
$ yarn start
```

## Notes
Due environment limitations, this project was developed using [Codesanbox](https://codesandbox.io), and Online Code Editor and IDE.
Although this was tested on a local environment, you can visit https://codesandbox.io/s/github/jupavavi/quasar_fire/tree/main to run this project without installing locally.

### Structure
#### Slient
Client folder contains an small react app. This is a bit outside the requirements. Althought I have passion for graphical rendering. On the other hand, the triangularization algorithm was polished based on a prototype developed in this [sanbox](https://codesandbox.io/s/hidden-sun-b7dvv), which later was modified as the FE for this project.

Text input are expected to use "," as separator for words. This means that empty between commas is taken as a missed word.

**examples**
- ` , ,this, , ,message`
- ` ,is, ,message`
- ` , ,a, `

**tolerance**
Finding a point based on 3 other point and 3 distances means finding the point where the circles represented by each pair point/distance intersect. This might be tricky for user to input values that gives this point with enough decimal precision. Tolerance allows to decrease the decimal precision needed for distances inputs.

### Server

Server folder contains an small express app. The following are the routes in the app:

- `get /`: the root. The FE is rendered here
- `get /satellites`: service that returns the satellites data. This is used for the FE to render the current satellites.
```json
[
    {
        "name": "Kenobi",
        "position": [-500, -200],
    },
    {
        "name": "Skywalker",
        "position": [100, -100],
    },
    {
        "name": "Sato",
        "position": [500, 100],
    },
]
```
- `post /topsecret`: services that calculates the position and message.
    - expected body structure (tolerance is optional)
        ```json
        {
            "satellites": [
                {
                    "name": "kenobi",
                    "distance": 500,
                    "message": ["este", "", "", "mensaje", ""]
                },
                {
                    "name": "skywalker",
                    "distance": 150,
                    "message": ["", "es", "", "", "secreto"]
                },
                {
                    "name": "sato",
                    "distance": 546,
                    "message": ["este", "", "un", "", ""]
                }
            ],
            "tolerance": 1
        }
        ```
    - expected response structure
        ```json
        {
            "position": [
                -30.865,
                -27.30999999999999
            ],
            "message": "este es un mensaje secreto"
        }
        ```
    - Can return 404 error when it is unable to calculate the position and/or message. The error contains a description indicating the reason of failure.

- `post /topsecret_split/:id`: post the distance and message for a given satellite.
    - id param is the name of one the satelites stored in the BE.
    - expected body structure
    ```json
    {
        "distance": 500,
        "message": ["este", "", "", "mensaje", ""]
    }
    ```
    - Can return 404 error when the satellite id is not found.
    - Once the information is stored for a particular satelite, it is stored in the current session. Although it can be overwritten anytime. 
- `get /topsecret_split`
    - query param `tolerance` can be send with a numeric value. Reduces the numeric precision needed to calculate the position.
    - expected response structure
        ```json
        {
            "position": [
                -30.865,
                -27.30999999999999
            ],
            "message": "este es un mensaje secreto"
        }
        ```