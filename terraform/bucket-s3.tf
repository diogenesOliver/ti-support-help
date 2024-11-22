resource "aws_s3_bucket" "bucket-logs" {
  bucket = "bucket-logs"
}

resource "aws_s3_bucket_versioning" "versioning-bucket-logs" {
  bucket = aws_s3_bucket.bucket-logs.id
  versioning_configuration{
    status = "Enabled"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "delete-logs-from-1y" {
  bucket = aws_s3_bucket.bucket-logs.id

  rule {
    id = "DeleteLogsFromOneYear"
    status = "Enabled"

    filter {
      prefix = "uploads/logs/"
    }

    expiration {
      days = 365
    }
  }
}