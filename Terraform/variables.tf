variable "AWS_REGION" {
  default = "us-east-1"
}

variable "AWS_ACCESS_KEY" {
}

variable "AWS_SECRET_KEY" {
}

variable "PATH_TO_PRIVATE_KEY" {
  default = "cfn-key.ppk"
}

variable "AMIS" {
  type = map(string)
  default = {
    us-east-1 = "ami-01d025118d8e760db"
  }
}