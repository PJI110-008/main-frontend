
# Main application Frontend

The code in this repository is for the use on frontend of the main application, where the main users are able to request the target data and filter it dynamically.

## Installation

To install and run the project you will need NodeJs (I recommend using [NVM](https://github.com/nvm-sh/nvm) for installation if you have never used this before) (NVM for Windows [here](https://github.com/coreybutler/nvm-windows)).

```bash
nvm install 20.x
# this will install node 20.x -> latest node 20 version
```

Then you'll need to install all needed packages:

```bash
npm install
```

### Development

Then to run it locally you'll need to just use the development command:

```bash
npm run dev
```

It'll run on port 3000, so you can access it using your browser on the following url: http://localhost:3000

### Deployment

To build all the assets to deploy you use:

```bash
npm run build
```

And then to serve the application as production mode:

```bash
npm start
```