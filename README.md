# TypeScript Node Express Google Kubernetes Engine (GKE)

A reference project to build, and deploy a TypeScript Node Express service to Google Kubernetes Engine (GKE)

![cicd gke workflow](https://github.com/MatthewCYLau/node-express-typescript-k8-gke/actions/workflows/cicd-gke.yml/badge.svg)

## Pre-requisite

- Please ensure you have installed [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli), and [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
- Install Redis by follow official documentations [here](https://redis.io/topics/quickstart) and start Redis:

```bash
redis-server # then in a new terminal run redis-cli ping
```

## Development

- Create a `.env` file at project root directory, and populate with following:

```
JWT_KEY=<A-SECRET-JWT-TOKEN>
MONGO_DB_CONNECTION_STRING=<YOUR-MONGO-DB-CONNECTION-STRING>
```

- Then, run the following commands:

```bash
npm i # installs Node dependencies
npm run dev # app listening at http://localhost:8080
```

## Create GCP resources

```bash
cd deploy # change to deploy directory
terraform init # initialises Terraform
terraform apply # deploys GCP stack
terraform destroy # destroys GCP stack
```

## Deploy

- Encode the GCP service account key in base64 by running the following command. Then, create a Github action secret called `GCP_SERVICE_ACCOUNT_KEY`:

```bash
cat key.json | base64
```

- Run `scripts/apply-k8s.sh` to apply various Kubernetes configurations

- Merge into `master` branch to trigger Github Action workflow to deploy to GKE

## Usage

- Make a `GET` request at `<EXTERNAL-STATIC-IP>` for health check end-point

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
