# BackSocialCosplay

### Cloning the repository

Clone this project into your working directory. We recommend always running the master branch as it was frequent contributions

```
$ git clone git@github.com:ProjectSocialCosplay/BackSocialCosplay.git
    Cloning into 'BackSocialCosplay'
    remote: Counting objects: 4794, done.
    remote: Total 4794 (delta 0), reused 0 (delta 0)
    Receiving objects: 100% (4794/4794), 1.59 MiB | 10.37 MiB/s, done.
    Resolving deltas: 100% (2314/2314), done.
    Checking connectivity... done.
```

### Run project with docker
You can change the config of the .env.developement file

```
$ docker-compose up --build
```

### Run test local
Before run test launch dev environnement
Include DB_TEST_HOST=localhost variable to npm run test

``
$ npm run test
``


### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
