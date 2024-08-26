# 🧢 TT TypeScript Sample API 🧢

## Overall Idea and Explanations

This project was built to give a general idea of the concepts I've learnt with Node.js and TypeScript.

Although this project is quite simple — it only has an HTTPs route for health checking and an AWS SQS consumer — what matters most is the project architecture and scalability.

This project was implemented in less than one day, since I wanted to deliver it today (2024-08-26). That's why it lacks some REALLY important things (e.g. tests).

_In fact, I wanted to implement at least unit tests last night still, but it was 11PM already and my wife was almost sleeping (which means she'd be dead mad at me for keeping her awake 😅)._

## 🧢 TT GoLang Sample API

This project is **directly related** to the [TT GoLang Sample API](https://github.com/Andrew-2609/tt-go-sample-api), mainly because of the AWS SQS queue that they share.

These two projects have a `docker-compose.yml` file that runs the containers on a network called `tt-network`. It allows the communication between the projects, even though they have their own docker-compose files.

So, please know that you'll need the two projects up and running to be able to test the entirety of this application.

## 🥷 API

Like I said above, as an API this project has a single route, which is a health route that may be useful for a Kubernetes health check. However, the project has an architecture that allows the implementation of new routes pretty easily - in other words, it's pretty extensible.

### Routes

* `GET /health` - returns the application's health status

### Web Framework

Even though there's a single route, I wished to implement more of them, and this project allows this by the usage of [express](https://github.com/expressjs/express). It's the only Node.js web framework I've ever used, but I believe I could easily learn new ones if needed.

## 📨 Messaging

This project was designed to consume an [AWS SQS](https://aws.amazon.com/pt/sqs/) queue, by polling for messages, reading them and handling them. The messaging module is pretty extensible and has a logic that can be reutilized in a variety of SQS queues polling use cases.

## 🛠️ How to run the project

### Environment

After cloning this repository, you'll have to **create a `.env` file on the root directory** to put the local environment variables. You can get the values from `.env.example`. They should work as they are, but know that if you wanna change them, you'll have to adapt them wherever needed!

### Commands

After this, you can simply run the following commands to have the following outcomes:

* `yarn up` - will run the `docker-compose.yml` file and start the application on a container. The message consumer will be initialized, thus allowing other applications to produce messages to the application's queue

---

## 💡 Ideas that I didn't have the time to implement

### Tests with Jest + SonarQube

I really wanted to implement all kinds of tests for this project, since I have a vast experience in doing so. Unfortunately, I had to implement these two projects in less than two days, and since the other project is bigger and has more logic than this one, the time I had to invest in testing was given exclusively to it.

I also wanted to implement a conteinerized SonarQube for this API, but I had a hard time configuring this bloody thing locally many times, so I didn't have the patience nor the time to try to implement it during this weekend.

Just know that it was a nice goal to achieve, and that in a real world project there would be at least a `sonar-project.properties` file to enable SonarQube to capture coverage data during a pipeline, for example.

## Error Handling

I wanted to implemented a centralized error handling for this application, but the time wasn't enough to prioritize this. So you may notice that, once an error occurs, it'll simply go straight to the stdout with a big unhandled stack. At least, I implemented a custom error module to format errors a little.

### Message Reprocessing

In a real project, some problems can and will occur during the consumption of messages from a queue. I know how to implement a [Dead-Letter Queue](https://aws.amazon.com/pt/what-is/dead-letter-queue/), and I wanted to implement one for the AWS SQS queue that this project utilizes. Unfortunately, due to the short time I had, this couldn't be prioritized.

Basically, after trying to read a message a certain amount of times, this message would be sent to a place from which it could be analysed and retrieved again later for reprocessing. I also thought about doing this with DynamoDB, but the Dead-Letter Queue would make more sense in this scenario.

### Cloud Environment Variables

I wanted to use [AWS Secrets Manager](https://aws.amazon.com/pt/secrets-manager) on [localstack](https://github.com/localstack/localstack) to enable the environment variables loading simulating a Cloud environment. I've used localstack to simulate SQS queues, SNS topics, S3 buckets, DynamoDB tables, etc., but never to load secrets from a Secrets Manager, so it would take me some precious time to both learn it and implement it on the last weekend.

### Swagger + OpenAPI

I wanted to elaborate a proper documentation for this project, but I simply didn't have the time 😞.

## 📝 Ending Note

Thanks for reading so far. I implemented this project and the another one in less then two days (from 2024-08-24 to 2024-08-25), plus today to elaborate the documentations and make the final adjustments, so I hope you take that in consideration if you don't think this project is polished enough 🙏.

Plus, I didn't use any translation tool to elaborate this documentation, so you can get an idea of my **written English** ability just by reading this document (and this also justifies any mistakes I'm sure I made 😆).

Again, thank you very very much for analysing this project. I really really hope it make a difference in any selection process you're currently responsible for!