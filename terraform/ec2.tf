resource "tls_private_key" "pem" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "pem" {
  key_name   = "myKey"       # Create a "myKey" to AWS!!
  public_key = tls_private_key.pem.public_key_openssh

  provisioner "local-exec" { # Create a "myKey.pem" to your computer!!
    command = "echo '${tls_private_key.pem.private_key_pem}' > ./myKey.pem"
  }

  provisioner "local-exec" {
    command = "chmod 400 myKey.pem"
  }
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

//Create Security Group
resource "aws_security_group" "rules" {
  name        = "allow_react_ssh"
  description = "Allow React and SSH inbound traffic"
  revoke_rules_on_delete = "true"
  ingress {
    description = "React from VPC"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress{
    description = "SSH for VPC"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]

  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "security_group"
  }
}

resource "aws_instance" "appui" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  key_name = "myKey"
  security_groups = [ "${aws_security_group.rules.name}" ] 

  tags = {
    Name = "APP-UI"
  }
   provisioner "remote-exec" {
    connection {
    type     = "ssh"
    user     = "ubuntu"
    private_key = tls_private_key.pem.private_key_pem
    host     = aws_instance.appui.public_ip
   }
    inline = [
      "sudo apt-get remove docker docker-engine docker.io containerd runc", 
      "sudo apt-get update",
      "sudo apt-get install pt-transport-https ca-certificates curl gnupg lsb-release", 
      "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg",
      "echo 'deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable' | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null", 
      "sudo apt-get update",
      "sudo apt-get install docker-ce docker-ce-cli containerd.io",

      "sudo curl -L 'https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)' -o /usr/local/bin/docker-compose",
      "sudo chmod +x /usr/local/bin/docker-compose",
      "sudo docker run -dit -p 3000:3000 881289302514.dkr.ecr.ap-south-1.amazonaws.com/app-ui:latest"  
        
    ]
  }
}
