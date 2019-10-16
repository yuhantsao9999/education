-- MySQL dump 10.13  Distrib 5.7.27, for osx10.14 (x86_64)
--
-- Host: localhost    Database: education
-- ------------------------------------------------------
-- Server version	5.7.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `comment_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `course_id` bigint(10) NOT NULL,
  `star` int(10) unsigned NOT NULL,
  `comment` varchar(10000) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `comment_date` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `new_course` (`course_id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,4,'影片聲音太小聽不太到',15,'8月 25, 2019'),(2,15,5,'大推老師用深入淺出的方式講解，而且會一步一步帶著大家練習，連我這個沒有程式基礎又不是理科頭腦的人都可以理解。而老師回覆問題的速度也很快，不用擔心等很久都得不到解答。小建議：如果每個章節可以有練習題就更好了！',15,'8月 25, 2019'),(3,15,5,'課堂上細心指導，透過老師的講解，拓寬了在python的視野，相當適合新手學習，課後問題老師都會立即回覆並且細心解惑，感謝老師!',1,'8月 25, 2019'),(4,1,5,'超棒的課程！',1,'8月 25, 2019'),(5,16,5,'超級棒的課程，終於對bootstrap有進一步的認識。以前上課因為時間不足被教導説官網上有說明自己回家看，但是身為小白的我根本完全看不懂！感謝老師這樣一步一步帶 ❤ ❤ ❤',1,'8月 25, 2019'),(6,15,5,'講解清楚，很棒！一聽就懂，也一邊實作，非常棒。',6,'8月 25, 2019'),(7,1,4,'An useful course to learn go',6,'8月 25, 2019'),(8,22,5,'由於工作上會用到LINUX, 之前並沒有完整的概念,甚至有些恐懼(較習慣windows), 上完這課程後有了完整的概念之後,有些以前build code時只會照著SOP下的每一道指令,也都知道為什麼要這樣做了. 也學會去修改shell script了, 現在LINUX用起來踏實許多,也完全不再恐懼它了. 感謝老師.',3,'8月 30, 2019'),(9,21,4,'It was more than what I expected. And gave me great insight that I previously lacked on wordpress. I now fell ready to tackle greater opportunities regarding wok on wordPress. If my english seems a little choppy, I am Brazilian. English is not my first language.',3,'8月 30, 2019'),(10,23,5,'',19,'10月 15, 2019');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-16 14:09:14
