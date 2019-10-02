# Championship manager Front End Project

## Installation

### Ubuntu 16.04

#### Yarn 

Update apt repository and install yarn

```sh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
```

If using NVM, you can skip Node.js installation with below command:

```sh
sudo apt install --no-install-recommends yarn
```

Verify

```sh 
yarn --version
```

#### Node.js and npm

Update apt repository and install Node.js (included npm)

```sh 
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt install nodejs
```


Verify

```sh 
nodejs --version
npm --version
```

## Run project

```sh
yarn
yarn build
```
