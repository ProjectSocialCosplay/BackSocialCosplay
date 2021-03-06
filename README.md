# Cosplay (Back-end)

We therefore decided to go on a mobile application of "Multi-use social network intended for the community of Cosplayers" which brings together several services including:

- Sharing of content, photos, videos of cosplays (DIY sharing).
- Private sale of accessories or costumes.
- Sharing of upcoming events, information point.

It's an NodeJS API in relation with an React-Native application. https://github.com/ProjectSocialCosplay/Front


### Status of the projet

Cosplay is a project under development, for the moment, for V1, only the social network part is available, it is possible to create an account, share content, follow your friends.

Following the health measures, we decided to put the sharing of events on hold, because groups of more than 10 people are still prohibited, however this part has been coded and could be implemented later.

Finally, we have not yet had time to start the private sales from person to person, but this subject has been carefully considered and will be implemented later.


### Cloning the repository

Clone this project into your working directory. We recommend always running the master branch as it was frequent contributions.

    $ git clone https://github.com/ProjectSocialCosplay/BackSocialCosplay.git
    Cloning into 'BackSocialCosplay'
    remote: Enumerating objects: 1123, done.
    remote: Counting objects: 100% (1123/1123), done.
    remote: Compressing objects: 100% (690/690), done.
    remote: Total 1123 (delta 719), reused 774 (delta 403), pack-reused 0
    Receiving objects: 100% (1123/1123), 562.67 Kio | 3.88 Mio/s, done.
    Resolving deltas: 100% (719/719), done.


### Start project with Docker

    $ docker-compose up --build
    mongo-express is up-to-date
    dbsocial is up-to-date
    Recreating Back-SocialCosplay ... done
    Attaching to mongo-express, dbsocial, Back-SocialCosplay...


### Run tests with Jest
    npm run test

### Check requests with GraphQL

    http://localhost:7000/graphql


### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


### License

[MIT](LICENSE)


### Code of conduct

[Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

### Authors

[Cem Buyuk](https://github.com/BuyukCem)

[Linda Dogan](https://github.com/Cerenda5)

[Adrien George](https://github.com/AdrienGeoorge)

[Delphine Lepront](https://github.com/delphinelepront)