#!/bin/bash

# cd-ing
here="`dirname \"$0\"`"
echo "cd-ing to $here"
cd "$here" || exit 1

# 1: stdout, 2 stderr
# so it means redirect any stderr to the same place redirecting stdout

# homebrew installing 
BREW_LOC=$(brew -v 2>&1)
if [[ ! BREW_LOC ]]; then
    echo "Install Brew"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "Update Brew"
    brew update
fi


NODE_V=$(node --version 2>&1)

if [[ ! $NODE_V ]]; then
    echo "installing nodejs..."
    brew install node
    NODE_V=$(node --version 2>&1)
fi

NV=${NODE_V:0:3}

if [[ $NV != "v16" ]]; then
    echo "nodejs v16 is not installed."
    source ~/.nvm/nvm.sh
    NVM_V=$(nvm --version)
    if [[ ! $NVM_V ]]; then
        echo "nvm is not installed. installing..."
        brew install nvm
    fi
    "Set the version of nodejs as 16.x.x"
    nvm install v16.15.1
fi

YARN_V=$(yarn -v 2>&1)

if [[ ! $YARN_V ]]; then
    "yarn is not installed. installing..."
    brew install yarn
fi

echo "yarn was installed!"
yarn && yarn start
