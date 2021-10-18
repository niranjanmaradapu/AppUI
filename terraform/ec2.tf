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
    command = "chmod 400 terraform/myKey.pem"
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

  provisioner "file" {
    connection {
    type     = "ssh"
    user     = "ubuntu"
    private_key = tls_private_key.pem.private_key_pem
    host     = aws_instance.appui.public_ip
   }
    source      = "install-docker.sh"
    destination = "install-docker.sh"
  }
   provisioner "remote-exec" {
    connection {
    type     = "ssh"
    user     = "ubuntu"
    private_key = tls_private_key.pem.private_key_pem
    host     = aws_instance.appui.public_ip
   }
    inline = [
      "sudo chmod +x install-docker.sh",
      "sudo ./install-docker.sh ${ env.access-key-id }  ${ env.secret-access-key }",
    ]
  }
}
