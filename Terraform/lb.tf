resource "aws_lb" "hta-lb" {
  name               = "hta-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = ["${aws_security_group.hta_lb_sg.id}"]
  subnets            = ["${aws_subnet.public-subnet-1.id}","${aws_subnet.public-subnet-2.id}"]

  enable_deletion_protection = false

}

resource "aws_lb_listener" "hta_lb_listener" {
  load_balancer_arn = aws_lb.hta-lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type         = "forward"
    forward {
      target_group {
        arn = aws_lb_target_group.hta_lb_target_group_node.arn
      } 
      target_group {
        arn = aws_lb_target_group.hta_lb_target_group_http.arn
      } 
    }
  }
}

resource "aws_lb_target_group" "hta_lb_target_group_node" {
  name     = "hta-lb-target-group-node"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.hta-vpc-main.id
}
resource "aws_lb_target_group" "hta_lb_target_group_http" {
  name     = "hta-lb-target-group-http"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.hta-vpc-main.id
}

resource "aws_security_group" "hta_lb_sg" {
  vpc_id      = aws_vpc.hta-vpc-main.id
  name        = "hta_lb_sg"
  description = "lb security group"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

}

