# Course at door

Course At Door is an education platform for teaching like Coursera.

## Table of Contents

- [Technologies](#Technologies)
- [Architecture](#Architecture)
- [Database Schema](#Database-Schema)
- [Main Features](#Main-Features)
- [Demonstration](#Features-Demo)
  
- [Contact](#Contact)

## Technologies

#### Backend
- Node.js / Express.js
- CI / CD (Jenkins)
- SSL Certificate (Let's Encrypt)

#### Front-End
- HTML
- CSS
- JavaScript
- AJAX

#### Database
 - MySQL
 - CRUD
 - Index, Primary key, Foreign key
 - Transaction

#### Cloud Service (AWS)
- EC2
- S3
- CloudFront

#### Networking
- HTTP & HTTPS
- Domain Name System(DNS)
- NGINX


#### Additional
- Unit Test: Jest
- Git / GitHub

## Architecture 

<p align="center">
 <img src="https://i.imgur.com/RoOu7y0.png" width="800">
</p>

- NGINX redirects 443 port requests from clients to corresponding ports
- Used AWS S3 to store course videos and course pictures
- Optimized videos loading time by AWS CloudFront
   
## Database Schema

<p align="center">
 <img src="https://i.imgur.com/FJ7Wszx.jpg" width="800">
</p>

## Main Features
- Course Search
    - Search course names
- Planning System
    - Users can create, view, edit their course
- Registration system
    - Register course
    - Archive user’s course video progress
- Recommending System
    - Recommend users the courses for junior

## Demonstration

### Home Page
In the home page, users can see all the courses, and find the specific courses through the search bar.
<p align="center">
 <img src="https://i.imgur.com/BPYGs4k.gif"
 width="800">
</p>


---

### Course Page

<p align="center">
 <img src="https://i.imgur.com/wVdddQb.png" width="800">
</p>

- Users can see the information of the course.
- Click the button 加入課程, then users can register the course.


---

### Profile Page

<p align="center">
 <img src="https://i.imgur.com/WX06OVy.png" width="800">
</p>

- Users can see all the courses that he registered.

<p align="center">
 <img src="https://i.imgur.com/sErW4cj.png" width="800">
</p>

- Users can give stars and write the comment after finishing the course.

---

### video page

<p align="center">
 <img src="https://i.imgur.com/KTvT9RD.png" width="800">
</p>


- 資料庫會記錄各個課程影片的進度，並於使用者再次登入頁面時顯示
- 左側課程大綱也會顯示各影片的進度


---

### User  Management

<p align="center">
 <img src="https://i.imgur.com/EBSrUHG.png" width="800">
</p>

- Users can create and edit course through profile
- Images and videos of courses are uploaded to AWS S3 and read through AWS CloudFront to optimise load speed

---

## Contact

#### Email:  yuhantsao9999@gmail.com
