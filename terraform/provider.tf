provider "aws" {
  region     = "ap-south-1"
}

terraform {
  backend "s3" {
    bucket = "terraform-state-ramakri4u"
    key    = "app-ui/terraform.tfstate"
    region = "ap-south-1"
  }
}