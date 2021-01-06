# Analytics for developers, open-source projects & more

![mockup](./mockup.png)

- We **do not need fancy** dashboards,
- We need actual analytics for developers & open-source projects.


# Install

```bash
git clone git@github.com:cagataycali/analytics.git
npm install # yarn
MONGO_URI='YOUR_MONGO_DB_URL' npm start # yarn start (for backend.) starts @ localhost:5000
```

In seperated terminal:

```bash
cd demo;
python -m SimpleHTTPServer 8000
open http://localhost:8000 # the alert will be popup.
```

# Running with docker

```bash
docker build -t analytics .
```

```bash
docker run --rm -i -t -e MONGO_URI='YOUR_MONGO_DB_URL' -e PORT='80' -p 5000:80 analytics
```

# Runnig with docker compose

App will be available at :5000.
```bash
docker-compose pull && docker-compose up --abort-on-container-exit
```
