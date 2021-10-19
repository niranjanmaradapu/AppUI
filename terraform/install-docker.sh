#!/bin/bash 

AWS_ACCESS_KEY_ID=$1
AWS_SECRET_ACCESS_KEY=$2

sudo apt-get remove docker docker-engine docker.io containerd runc -y

sudo apt-get update -y

sudo apt-get -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update -y

sudo apt-get -y install docker-ce docker-ce-cli containerd.io


## docker-compose install:

sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

# launch container 

sudo apt install awscli -y 

aws configure set default.region ap-south-1
#aws configure set aws_access_key_id   "$AWS_ACCESS_KEY_ID"
#aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY"

aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 881289302514.dkr.ecr.ap-south-1.amazonaws.com
docker pull 881289302514.dkr.ecr.ap-south-1.amazonaws.com/app-ui:latest
docker run -dit -p 3000:3000 881289302514.dkr.ecr.ap-south-1.amazonaws.com/app-ui:latest
