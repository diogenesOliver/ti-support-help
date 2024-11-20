resource "aws_s3_bucket" "bucket-logs" {
  bucket = "bucket-logs"
}

resource "aws_s3_bucket_versioning" "versioning-bucket-logs" {
  bucket = aws_s3_bucket.bucket-logs.id
  versioning_configuration{
    status = "Enabled"
  }
}