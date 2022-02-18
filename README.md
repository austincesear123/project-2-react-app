# Project Overview

## Project Links

- [https://github.com/austincesear123/project-2-react-app](https://github.com/austincesear123/project-2-react-app)
- [deployment link will go here]()

## Project Description

This app will serve as a "to-do" list but for albums to listen to. Using the discogs api a user will be able to search by artist, album, and/or genre. Then add an album to their list and mark it as "listened-to". They'll then be able to display either the "to-listen-to" or "listened-to" list.

## API

Discogs API:
https://api.discogs.com/database/search?artist=the+beatles&release_title=revolver&token={key}

```
{
    {...},
    "results": {
        "country": "US",
        "year": "1966",
        "label": [
            "Capitol Records",
            "Capitol Records",
            "Capitol Records, Inc.",
            "Columbia Records Pressing Plant, Terre Haute",
            "Customatrix"
            ],
        "genre": [
            "Rock",
            "Pop"
            ],
        "style": [
            "Pop Rock",
            "Psychedelic Rock"
            ],
        "id": 5146711,
        "master_id": 45284,
        "master_url": "https://api.discogs.com/masters/45284",
        "uri": "/release/5146711-The-Beatles-Revolver",
        "title": "The Beatles - Revolver",
        "thumb": "https://i.discogs.com/-wqT7s9EfxFuocy2TyBgrB3RqgLPs-Qgn9K8p6sMJDM/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTUx/NDY3MTEtMTM5MTQ3/OTg1MS0xNjExLmpw/ZWc.jpeg",
        "cover_image": "https://i.discogs.com/9teRB74mHlWa_fDhLJsP8gzhB29ziVFkKH1jLI6rirQ/rs:fit/g:sm/q:90/h:595/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTUx/NDY3MTEtMTM5MTQ3/OTg1MS0xNjExLmpw/ZWc.jpeg",
        "resource_url": "https://api.discogs.com/releases/5146711",
    }
}
```

## Wireframes

- [Mobile Wireframe](https://res.cloudinary.com/djqfsbgaf/image/upload/v1644615595/sei%20project-2-react-app/Mobile_Wireframe_vwhxg1.png)
- [Tablet Wireframe](https://res.cloudinary.com/djqfsbgaf/image/upload/v1644615595/sei%20project-2-react-app/Tablet_Wireframe_wa8fc3.png)
- [Desktop Wireframe](https://res.cloudinary.com/djqfsbgaf/image/upload/v1644615595/sei%20project-2-react-app/Desktop_Wireframe_dpnjbt.png)
- [React Architecture](https://res.cloudinary.com/djqfsbgaf/image/upload/v1644618445/sei%20project-2-react-app/D0b97c0f5936abc116a88e7117a7c8fe9_heopqs.png)

### MVP/PostMVP - 5min

#### MVP

- Dynamic search requests by artist, album, and/or genre
- Display appropriate data properly from search
- Add album data to 't-l-t' list
- Display album data on 't-l-t' list
- Mark an album as 'listened-to' and add it to 'l-t' list
- Display album data on 'l-t' list
- navbar and routes

#### PostMVP

- Add a "Friends" page that allows you to view what albums your friends have listened to and add it to your list
- Display on your lists which albums your friends have listened to
- Add a "Top Artists/Albums" page that displays which you've listened to the most, like a leaderboard
- Styling

## Components

##### Component Descriptions

| Component      |                           Description                           |
| -------------- | :-------------------------------------------------------------: |
| App            |            Will contain most of the data and states             |
| Nav            |                Navbar that links to other pages                 |
| Dashboard/Home | Will display small samples of the other pages and links to them |
| Search/Explore |                   Search and display results                    |
| T-L-T List     |                     Display T-L-T/L-T lists                     |

##### MVP Time Frame

| Component    | Priority | Estimated Time | Actual Time |
| ------------ | :------: | :------------: | :---------: |
| Search Form  |    H     |      3hrs      |             |
| Display Data |    H     |      6hrs      |             |
| Mark as L-T  |    H     |      3hrs      |             |
| Navbar       |    H     |      1hrs      |             |
| Total        |          |     13hrs      |             |

##### PostMVP Time Frame

| Component            | Priority | Estimated Time | Actual Time |
| -------------------- | :------: | :------------: | :---------: |
| Friends Page         |    H     |      4hrs      |             |
| Top Leaderboard Page |    M     |      4hrs      |             |
| Styling              |    L     |      6hrs      |             |
| Total                |          |     14hrs      |             |

## Additional Libraries

Bootstrap

## Sources

- Ran into an error, googled it, and found the same one had been posted on stackoverflow. Ended up being super helpful for the rest of the project and wish I had known I could do that sooner: [link](https://stackoverflow.com/a/70009224)

- This article was helpful in learning how to implement "text-overflow: ellipsis;" after a certain number of lines: [link](https://nikitahl.com/pure-css-truncate-text#2-truncating-text)

## Code Snippet

This function will run anytime the "Listened-To List" changes. It will check the genre of the most recent album you listened to, then search for other albums with that genre, and sets that data to a state to be displayed on the Dashboard page in the Explore card

```js
  useEffect(() => {
    if (ltList.length > 0) {
      const style = ltList[0].style[0];
      const url = `https://api.discogs.com/database/search?style=${style}&per_page=5&token=${discogsToken}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setDataForDashboardExplore(data.results))
        .catch((error) => console.log(error));
    }
  }, [ltList]);
```
