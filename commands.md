# Command Reference

## Install Dependencies

```
npm install
```

## Docker

### Login

```
docker login
```

### Build and tag Docker image

```
docker build -t <your-dockerhub-username>/ba-loan-calculator:latest .
```

### Push to Docker Hub

```
docker push <your-dockerhub-username>/ba-loan-calculator:latest
```

## Akka Serverless

### Login

```
akkasls auth login
```

### List projects

```
akkasls projects list
```

### Set the active project

```
akkasls config set project lightbend-training
```

### Deploy a service

```
akkasls svc deploy hello-world <your-dockerhub-username>/ba-loan-calculator:latest
```

### Verify the service is running

```
akkasls svc list

NAME          AGE  REPLICAS   STATUS   DESCRIPTION
hello-world   2m   1          Ready
```

### Get details of the service

```
akkasls svc get hello-world
```

### Expose the service

```
akkasls svc expose hello-world --enable-cors
```

### Unexpose the service

```
akkasls svc unexpose hello-world <your-service's-URL>
```

### Undeploy the service

```
akkasls svc undeploy hello-world
```

## Testing

### Running Unit/Integration Tests

```
npm test
```

### Test the Service (GRPC)

```bash
grpcurl -d '{"user_id":"testuser","loan": {"loan_id": "loan1","principal": 200000,"rate": 0.03,"months": 3600,"monthly_addl": 0}}' little-base-8984.us-east1.apps.akkaserverless.com:443 com.lightbend.loancalc.LoanService/CreateLoan
```

### Test Adding a Loan Locally (GRPC)

```bash
grpcurl -plaintext -d '{"user_id":"testuser","loan": {"loan_id": "loan1","principal": 200000,"rate": 0.03,"months": 3600,"monthly_addl": 0}}' localhost:9000 com.lightbend.loancalc.LoanService/CreateLoan
```

### Run the Client

```
node client.js <your-service's-URL> <someId> <someName>
```

## Running Locally

### Run the Service

```
docker run -it --rm --name loan-calculator -p 8080:8080 -v `pwd`/logs:/var/log bilbert/ba-loan-calculator:latest
```

### Run the Proxy

```
docker run -it --rm --name loan-calculator-proxy -p 9000:9000 --env USER_FUNCTION_HOST=host.docker.internal cloudstateio/cloudstate-proxy-dev-mode:latest
```