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
gcloud auth application-default login # authenticate with GCP
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

- Using Postman, make a `GET` request at `<EXTERNAL-STATIC-IP>` for health check end-point
- Note, you may need to disable SSL certificate verification on Postman. See tutorial [here](https://docs.pingidentity.com/bundle/pingintelligence-44/page/hyz1564008974617.html#:~:text=Click%20the%20Wrench%20icon%20on,to%20disable%20SSL%20certificate%20verification.)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

If you find this project helpful, please give a :star: or even better buy me a coffee :coffee: :point_down: because I'm a caffeine addict :sweat_smile:

<a href="https://www.buymeacoffee.com/matlau" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## License

[MIT](https://choosealicense.com/licenses/mit/)
