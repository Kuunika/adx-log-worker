# adx-log-worker
An ADX log worker is a worker that is used to log migration progress in other workers.

## Dependencies

- [NodeJS > v10.12](https://nodejs.org/en/download/ "node")

## Installation

### step 1: clone the project

Clone this repository into your local directory, Use the commands below:

```sh
# clone project to a computer
git clone https://github.com/Kuunika/adx-log-worker.git

# navigate to the project root directory
cd adx-log-worker
```

### step 2: dependencies installation

Install all the dependencies

```sh
# install dependencies
npm install
```

### step 4: environmental variables

Create a `.env` file with the contents of your .env.example file.

```sh
# copy the .env.example to .env file
cp .env.example .env
```

Modify the `.env` file and make sure it reflects the environment settings.

### step 5: start the work

```sh
# start the worker
npm start
```
