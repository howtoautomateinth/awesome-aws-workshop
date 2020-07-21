resource "aws_autoscaling_group" "hta-asg" {
  name                      = "hta-asg"
  max_size                  = 5
  min_size                  = 2
  health_check_grace_period = 500
  health_check_type         = "ELB"
  desired_capacity          = 4
  force_delete              = true
  launch_configuration      = aws_launch_configuration.hta_launch_config.name
  vpc_zone_identifier       = ["${aws_subnet.public-subnet-1.id}", "${aws_subnet.public-subnet-2.id}"]
  target_group_arns = ["${aws_lb_target_group.hta_lb_target_group_node.arn}","${aws_lb_target_group.hta_lb_target_group_http.arn}"]
  tag {
    key                 = "resource_types"
    value               = "asg"
    propagate_at_launch = false
  }
}

resource "aws_launch_configuration" "hta_launch_config" {
  name          = "web_config"
  image_id      = var.AMIS[var.AWS_REGION]
  instance_type = "t2.micro"
  security_groups = ["${aws_security_group.hta-sg.id}"]
}
