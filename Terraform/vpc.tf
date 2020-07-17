# Internet VPC
resource "aws_vpc" "hta-vpc-main" {
  cidr_block           = "10.0.0.0/16"
  instance_tenancy     = "default"
  enable_dns_support   = "true"
  enable_dns_hostnames = "true"
  enable_classiclink   = "false"
  tags = {
    Name = "hta-vpc-main"
  }
}

# Public Subnets
resource "aws_subnet" "public-subnet-1" {
  vpc_id                  = aws_vpc.hta-vpc-main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = "true"
  availability_zone       = "us-east-1a"

  tags = {
    Name = "public-subnet-1"
  }
}

# Private Subnets
resource "aws_subnet" "private-subnet-1" {
  vpc_id                  = aws_vpc.hta-vpc-main.id
  cidr_block              = "10.0.2.0/24"
  map_public_ip_on_launch = "false"
  availability_zone       = "us-east-1b"

  tags = {
    Name = "private-subnet-1"
  }
}


# Internet GW
resource "aws_internet_gateway" "hta-igw" {
  vpc_id = aws_vpc.hta-vpc-main.id

  tags = {
    Name = "hta-igw"
  }
}

# route tables
resource "aws_route_table" "hta-route-table" {
  vpc_id = aws_vpc.hta-vpc-main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.hta-igw.id
  }

  tags = {
    Name = "hta-route-table"
  }
}

# route associations public
resource "aws_route_table_association" "main-public-1-a" {
  subnet_id      = aws_subnet.public-subnet-1.id
  route_table_id = aws_route_table.hta-route-table.id
}

