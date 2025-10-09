
Yes, we have docker announcements now and anyone in the community can request any docker to watch for. The project we are using for this is **FeedCord**. FeedCord used "appsettings.json file for its configuration. all the code is available in our official github repository. Direct link [here](https://github.com/homelabindia/webapps/blob/main/feedcord/appsettings.json).

---

## Request any docker container addition

There are 2 ways you can do this.

1. #### **DIY Route**

     Just fork the repo and submit the changes to the appsettings.json file in the below format according to [FeedCord documentation](https://github.com/Qolors/FeedCord). The rss feed we are supporting for now are just rss feeds of github repositories of Docker Containers. The RSS feed added needs to be in a proper format. Look at the [Notes](#notes) section below for a guide on getting the proper rss link for any github repository.

     Each url is entered by line seperating by comma. It should look like this in the appsettings.json file:
    ```

    "RssUrls": [
           "https://examplesrssfeed1.com/rss",
           "https://examplesrssfeed2.com/rss",
           "https://examplesrssfeed3.com/rss",
         ]

    ```
    Submit a PR and just imform one of the Admins or Mods in the discord server about your request. We will review it and approve it as soon as possible.

2. #### **The not DIY Route**
   
     Just ask one of the Admin/Mods in the discord server in #help channel with title **Request to add a docker container notification**

---

## Notes {#notes}

###How to get RSS feed link for any github repository?

The General Pattern:

```
https://github.com/<username>/<repository>/releases.atom
```

Explanation of the Components:

1. ```https://github.com/```: This is the base URL for GitHub.
2. ```<username>```: Replace this with the GitHub username of the repository owner. For example, "immich-app" for the Immich repository.
3. ```<repository>```: Replace this with the name of the repository. For example, "immich" for the Immich repository.
4. ```/releases.atom```: This is the crucial part that specifies you want the Atom feed for the releases section of the repository.

