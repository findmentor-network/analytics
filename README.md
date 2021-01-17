# Analytics for developers, open-source projects & more

![mockup](./mockup.png)

- We **do not need fancy** dashboards,
- We need actual analytics for developers & open-source projects.


# Example usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example usage</title>
</head>
<body>
    <script>
        /*
            You can host an analytx server on your servers / heroku / aws or gcloud.
            Insert your servers base url below.
        */
        window.BASE_URL = 'https://beta.analytx.dev' // your analytx server
        /*
            Send a event.
            The event can be anything you want
        */
        send({type: 'click', event:'jobApply'})
        /*
            
        */
        send({type: 'seen', event:'jobPage'})
        // count().then(data => data.count).then(console.log)
        // total().then(data => data.count).then(console.log)
    </script>
    <script src='https://analytx.dev/analytx.js'></script>
</body>
</html>
```


# Deploy to your servers


*Deploy to heroku (TO-DO)*


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