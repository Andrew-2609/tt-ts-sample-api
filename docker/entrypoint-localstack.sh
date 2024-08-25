#!/bin/sh

ENDPOINT=http://localstack:4566
REGION=sa-east-1

aws configure set aws_access_key_id test
aws configure set aws_secret_access_key test
aws configure set region $REGION

# Create SQS Employees FIFO SQS Queue
aws sqs create-queue \
--queue-name hr-employees.fifo \
--attributes '
  {
   "ReceiveMessageWaitTimeSeconds": "20", 
   "VisibilityTimeout": "30", 
   "FifoQueue": "true", 
   "ContentBasedDeduplication": "false" 
  }' \
--endpoint-url $ENDPOINT \
--region $REGION