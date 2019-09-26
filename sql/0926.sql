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
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,4,'影片聲音太小聽不太到',15,'8月 25, 2019'),(2,15,5,'大推老師用深入淺出的方式講解，而且會一步一步帶著大家練習，連我這個沒有程式基礎又不是理科頭腦的人都可以理解。而老師回覆問題的速度也很快，不用擔心等很久都得不到解答。小建議：如果每個章節可以有練習題就更好了！',15,'8月 25, 2019'),(3,15,5,'課堂上細心指導，透過老師的講解，拓寬了在python的視野，相當適合新手學習，課後問題老師都會立即回覆並且細心解惑，感謝老師!',1,'8月 25, 2019'),(4,1,5,'超棒的課程！',1,'8月 25, 2019'),(5,16,5,'超級棒的課程，終於對bootstrap有進一步的認識。以前上課因為時間不足被教導説官網上有說明自己回家看，但是身為小白的我根本完全看不懂！感謝老師這樣一步一步帶 ❤ ❤ ❤',1,'8月 25, 2019'),(6,15,5,'講解清楚，很棒！一聽就懂，也一邊實作，非常棒。',6,'8月 25, 2019'),(7,1,4,'An useful course to learn go',6,'8月 25, 2019');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `final_section`
--

DROP TABLE IF EXISTS `final_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `final_section` (
  `video_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `course_id` bigint(255) NOT NULL,
  `chapter_auto_id` bigint(255) NOT NULL,
  `section_id` bigint(255) NOT NULL,
  `section_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `section_intro` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `video` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`video_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `final_section`
--

LOCK TABLES `final_section` WRITE;
/*!40000 ALTER TABLE `final_section` DISABLE KEYS */;
INSERT INTO `final_section` VALUES (1,1,1,1,'Golang 的簡單介紹','1. Golang 的簡單介紹。\r\n2. 如何安裝 Golang 執行環境，實務操作。\r\n3. 選擇文字編輯器，實務操作 Visual Studio Code。\r\n4. 撰寫、建置、並且執行第一個 Go 程式。','class_video-1568775986165.mp4'),(2,1,2,2,'Golang 資料型態','1.1 整數 int\r\n1.2 浮點數 float64\r\n1.3 字串 string\r\n1.4 布林值 bool\r\n1.5 字符 rune\r\n','class_video-1568775986283.mp4'),(3,1,2,3,'Golang 變數','2.1 宣告變數與變數的資料型態\r\n2.2 指定變數中的資料\r\n2.3 使用變數代替資料做運算','class_video-1568775986418.mp4'),(4,1,3,4,'Golang 載入封包','1.1 import 封包名稱\r\n1.2 import \"fmt\"','class_video-1568775986514.mp4'),(5,1,3,5,'使用 fmt 封包做基本輸入','2.1 宣告變數\r\n2.2 fmt.Scanln(&變數名稱)\r\n2.3 取得變數對應的指標','class_video-1568775986596.mp4'),(6,1,3,6,'使用 fmt 封包做基本輸出','3.1 輸出換行 fmt.Println(資料)\r\n3.2 輸出不換行 fmt.Print(資料)','class_video-1568775986673.mp4'),(7,1,4,7,'運算符號的種類','1-1. 算數運算 +, -, *, /\r\n1-2. 指定運算 =, +=, -=, *=, /=\r\n1-3. 單元運算 ++, --\r\n1-4. 比較運算\r\n1-5. 邏輯運算 !, &&, ||','class_video-1568775986771.mp4'),(8,1,5,8,'Golang 流程控制','1.1 if 判斷式\r\n1.2 if ... else 判斷結構\r\n1.3 if ... else if ... else 多條件判斷結構\r\n','class_video-1568775986887.mp4'),(9,1,5,9,' Golang 練習範例','2.1 判斷式基本語法練習\r\n2.2 ATM 情境範例練習','class_video-1568775986959.mp4'),(26,15,22,1,'簡介、安裝、快速開始','建立 Python 3.5 以上版本的【開發環境】','class_video-1569217030806.mp4'),(27,15,23,2,'變數與資料型態','學會 Python 的【語法和邏輯】','class_video-1569217046208.mp4'),(28,15,24,3,'判斷式','學會 Python 的【基本程式架構】\r\n\r\n','class_video-1569217068913.mp4'),(29,15,25,4,'函式基礎','使用 Python 來【存取檔案】','class_video-1569217068979.mp4'),(30,16,26,1,'加入 Bootstrap 及元件的組成概念','學會如何使用 Bootstrap 建立網頁及元件','class_video-1569250622897.mp4'),(31,16,26,2,'Bootstrap 建立第一個網頁','學會如何使用 Bootstrap 建立網頁及元件\r\n了','class_video-1569250635215.mp4'),(32,16,27,3,'Borders 邊框','學會如何使用 Bootstrap 建立網頁及元件\r\n','class_video-1569250649367.mp4'),(33,16,27,4,'Visibility 可見性','學會如何使用 Bootstrap 建立網頁及元件\r\n','class_video-1569250665422.mp4'),(34,16,28,5,'Sass 環境與運行的方法','了解 Bootstrap 的開發模式','class_video-1569250683912.mp4');
/*!40000 ALTER TABLE `final_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `new_chapter`
--

DROP TABLE IF EXISTS `new_chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `new_chapter` (
  `course_id` bigint(20) NOT NULL,
  `chapter_auto_id` bigint(255) NOT NULL AUTO_INCREMENT,
  `chapter_id` bigint(255) NOT NULL,
  `chapter_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`chapter_auto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_chapter`
--

LOCK TABLES `new_chapter` WRITE;
/*!40000 ALTER TABLE `new_chapter` DISABLE KEYS */;
INSERT INTO `new_chapter` VALUES (1,1,1,'Golang 簡介、安裝、與快速開始'),(1,2,2,'Golang 資料、資料型態與變數'),(1,3,3,'Golang 基本輸入與輸出 - 使用 fmt 內建封包 '),(1,4,4,'Golang 基本運算符號'),(1,5,5,'Golang 流程控制 - if 判斷式'),(15,22,1,'Windows 開發環境設置'),(15,23,2,'資料與運算'),(15,24,3,'流程控制'),(15,25,4,'函式、模組與封包'),(16,26,1,'快速上手 Bootstrap'),(16,27,2,'Bootstrap 通用類別 (Utilities)'),(16,28,3,'Bootstrap 與 Sass');
/*!40000 ALTER TABLE `new_chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `new_course`
--

DROP TABLE IF EXISTS `new_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `new_course` (
  `course_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `course_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `course_teacher` varchar(255) DEFAULT NULL,
  `course_intro` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `course_field` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `for_who` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `main_image` varchar(255) CHARACTER SET latin1 NOT NULL,
  `course_teacher_intro` varchar(20000) DEFAULT NULL,
  `course_teacher_id` varchar(255) DEFAULT NULL,
  `average_star` decimal(14,1) DEFAULT NULL,
  `comment_number` bigint(20) DEFAULT NULL,
  `star_number` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`course_id`,`course_title`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_course`
--

LOCK TABLES `new_course` WRITE;
/*!40000 ALTER TABLE `new_course` DISABLE KEYS */;
INSERT INTO `new_course` VALUES (1,'Golang 入門教學課程','彭彭','全面介紹了 Go 語言的特點、安裝部署環境、語言語法、併發流程以及在多個實戰中的應用，並介紹如何整合 CI/CD 服務','程式設計','沒有基礎希望嘗試學習程式語言的人\r\n想要從入門開始學習 golang 的人','main_image-1568775986161.png','','2',4.3,3,3),(15,'Python 程式設計入門','六角學院','彭彭老師與你一起進入 Python 的世界：採用最新 Python 3.5 以上版本，學會基礎語法和程式架構，使用 Python 做檔案處理，亂數統計，並完成網路連線程式！','程式設計','任何對 Python 程式開發有興趣的朋友，無須程式設計基礎','main_image-1569217030800.png','彭彭老師：\r\n\r\n台灣大學訓練班十年教學經驗。\r\n\r\n在三創育成中心擔任 Python 課程講師。\r\n\r\n在蝦皮 Shopee 擔任 Python 企業內訓講師。\r\n\r\n曾任 Modern Web、JSDC 等研討會講師。\r\n\r\n實際開發 Piconion 影像處理大型應用程式。\r\n\r\n豐富的教學、帶領初學者經驗。\r\n\r\n','7',5.0,3,3),(16,'精通 Bootstrap 4 -質感網站輕鬆不求人','六角學院','此課程不在是念過所有元件的基礎課程，課程中會透過簡報、動畫不斷的強化同學對於網頁設計、Bootstrap 的運用觀念，並且在課程的進行中會透過許多的案例加深對於元件的使用概念，讓學習框架不再只是依循著文件內容而已。','網頁開發','想要快速建立網頁的同學\r\n對於 Bootstrap 有興趣的同學\r\n想要更精進 CSS 的同學','main_image-1569250622865.png','六角學院助教\r\n六角學院 是一所線上程式開發學習單位，目前已累積超過 15,000 名學員，讓更多人藉由線上學習在職涯規劃上有更多的選擇是我們的使命是，如果您贊同我們的理念，歡迎加入六角。','7',5.0,1,1);
/*!40000 ALTER TABLE `new_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `user_id` bigint(20) NOT NULL,
  `video_id` bigint(255) NOT NULL,
  `course_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `video_time` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `complete` bigint(10) unsigned NOT NULL DEFAULT '0',
  `registered` tinyint(4) NOT NULL DEFAULT '1',
  `video_duration` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`,`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,1,'Golang 入門教學課程','1023.187302',1,1,NULL),(1,2,'Golang 入門教學課程','1321.68',1,1,NULL),(1,3,'Golang 入門教學課程','1321.68',1,1,NULL),(1,4,'Golang 入門教學課程','928.612426',1,1,NULL),(1,5,'Golang 入門教學課程','928.612426',1,1,NULL),(1,6,'Golang 入門教學課程','928.612426',1,1,NULL),(1,7,'Golang 入門教學課程','1431.859',1,1,NULL),(1,8,'Golang 入門教學課程','858.86',1,1,NULL),(1,9,'Golang 入門教學課程','799.056338',0,1,NULL),(1,26,'Python 程式設計入門','1023.187302',1,1,NULL),(1,27,'Python 程式設計入門','0',0,1,NULL),(1,28,'Python 程式設計入門','0',0,1,NULL),(1,29,'Python 程式設計入門','0',0,1,NULL),(1,30,'精通 Bootstrap 4 -質感網站輕鬆不求人','1023.187302',1,1,NULL),(1,31,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(1,32,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(1,33,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(1,34,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(2,1,'Golang 入門教學課程','1023.187302',1,1,NULL),(2,2,'Golang 入門教學課程','0',0,1,NULL),(2,3,'Golang 入門教學課程','0',0,1,NULL),(2,4,'Golang 入門教學課程','0',0,1,NULL),(2,5,'Golang 入門教學課程','0',0,1,NULL),(2,6,'Golang 入門教學課程','0',0,1,NULL),(2,7,'Golang 入門教學課程','0',0,1,NULL),(2,8,'Golang 入門教學課程','0',0,1,NULL),(2,9,'Golang 入門教學課程','0',0,1,NULL),(2,26,'Python 程式設計入門','1023.187302',1,1,NULL),(2,27,'Python 程式設計入門','0',0,1,NULL),(2,28,'Python 程式設計入門','0',0,1,NULL),(2,29,'Python 程式設計入門','0',0,1,NULL),(3,1,'Golang 入門教學課程','1023.187302',1,1,NULL),(3,2,'Golang 入門教學課程','1321.68',1,1,NULL),(3,3,'Golang 入門教學課程','1321.68',1,1,NULL),(3,4,'Golang 入門教學課程','928.612426',1,1,NULL),(3,5,'Golang 入門教學課程','928.612426',1,1,NULL),(3,6,'Golang 入門教學課程','928.612426',1,1,NULL),(3,7,'Golang 入門教學課程','1431.859',1,1,NULL),(3,8,'Golang 入門教學課程','858.86',1,1,NULL),(3,9,'Golang 入門教學課程','848.294163',0,1,NULL),(3,26,'Python 程式設計入門','1023.187302',1,1,NULL),(3,27,'Python 程式設計入門','0',0,1,NULL),(3,28,'Python 程式設計入門','0',0,1,NULL),(3,29,'Python 程式設計入門','0',0,1,NULL),(3,30,'精通 Bootstrap 4 -質感網站輕鬆不求人','1023.187302',1,1,NULL),(3,31,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(3,32,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(3,33,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(3,34,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(4,1,'Golang 入門教學課程','1023.187302',1,1,NULL),(4,2,'Golang 入門教學課程','0',0,1,NULL),(4,3,'Golang 入門教學課程','0',0,1,NULL),(4,4,'Golang 入門教學課程','0',0,1,NULL),(4,5,'Golang 入門教學課程','0',0,1,NULL),(4,6,'Golang 入門教學課程','0',0,1,NULL),(4,7,'Golang 入門教學課程','0',0,1,NULL),(4,8,'Golang 入門教學課程','0',0,1,NULL),(4,9,'Golang 入門教學課程','0',0,1,NULL),(4,26,'Python 程式設計入門','1023.187302',1,1,NULL),(4,27,'Python 程式設計入門','0',0,1,NULL),(4,28,'Python 程式設計入門','0',0,1,NULL),(4,29,'Python 程式設計入門','0',0,1,NULL),(4,30,'精通 Bootstrap 4 -質感網站輕鬆不求人','1023.187302',1,1,NULL),(4,31,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(4,32,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(4,33,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(4,34,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(5,1,'Golang 入門教學課程','1023.187302',1,1,NULL),(5,2,'Golang 入門教學課程','1321.68',1,1,NULL),(5,3,'Golang 入門教學課程','1321.68',1,1,NULL),(5,4,'Golang 入門教學課程','928.612426',1,1,NULL),(5,5,'Golang 入門教學課程','928.612426',1,1,NULL),(5,6,'Golang 入門教學課程','928.612426',1,1,NULL),(5,7,'Golang 入門教學課程','1431.859',1,1,NULL),(5,8,'Golang 入門教學課程','824.566',0,1,NULL),(5,9,'Golang 入門教學課程','858.86',1,1,NULL),(5,26,'Python 程式設計入門','1023.187302',1,1,NULL),(5,27,'Python 程式設計入門','0',0,1,NULL),(5,28,'Python 程式設計入門','0',0,1,NULL),(5,29,'Python 程式設計入門','0',0,1,NULL),(5,30,'精通 Bootstrap 4 -質感網站輕鬆不求人','1023.187302',1,1,NULL),(5,31,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(5,32,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(5,33,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(5,34,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(6,1,'Golang 入門教學課程','1023.187302',1,1,'1023.187302'),(6,2,'Golang 入門教學課程','204.471112',0,1,'1321.68'),(6,3,'Golang 入門教學課程','0',0,1,'1321.68'),(6,4,'Golang 入門教學課程','0',0,1,'928.612426'),(6,5,'Golang 入門教學課程','70.939158',0,1,'928.612426'),(6,6,'Golang 入門教學課程','0',0,1,'928.612426'),(6,7,'Golang 入門教學課程','0',0,1,NULL),(6,8,'Golang 入門教學課程','0',0,1,NULL),(6,9,'Golang 入門教學課程','858.86',1,1,NULL),(6,26,'Python 程式設計入門','1023.187302',1,1,'1023.187302'),(6,27,'Python 程式設計入門','386.431894',0,1,'1321.68'),(6,28,'Python 程式設計入門','629.24949',0,1,'858.86'),(6,29,'Python 程式設計入門','1431.859',1,1,'1431.859'),(6,30,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,'1023.187302'),(6,31,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(6,32,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(6,33,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(6,34,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(7,1,'Golang 入門教學課程','1019.201283',0,1,NULL),(7,2,'Golang 入門教學課程','1321.48638',0,1,NULL),(7,3,'Golang 入門教學課程','1321.68',1,1,NULL),(7,4,'Golang 入門教學課程','927.037775',0,1,NULL),(7,5,'Golang 入門教學課程','928.612426',1,1,NULL),(7,6,'Golang 入門教學課程','928.612426',1,1,NULL),(7,7,'Golang 入門教學課程','1431.859',1,1,NULL),(7,8,'Golang 入門教學課程','858.86',1,1,NULL),(7,9,'Golang 入門教學課程','0',0,1,NULL),(7,26,'Python 程式設計入門','0',0,1,NULL),(7,27,'Python 程式設計入門','1321.68',1,1,NULL),(7,28,'Python 程式設計入門','0',0,1,NULL),(7,29,'Python 程式設計入門','880.037784',0,1,NULL),(7,30,'精通 Bootstrap 4 -質感網站輕鬆不求人','1023.187302',1,1,NULL),(7,31,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(7,32,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(7,33,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(7,34,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(8,1,'Golang 入門教學課程','1023.187302',1,1,NULL),(8,2,'Golang 入門教學課程','0',0,1,NULL),(8,3,'Golang 入門教學課程','0',0,1,NULL),(8,4,'Golang 入門教學課程','0',0,1,NULL),(8,5,'Golang 入門教學課程','0',0,1,NULL),(8,6,'Golang 入門教學課程','0',0,1,NULL),(8,7,'Golang 入門教學課程','0',0,1,NULL),(8,8,'Golang 入門教學課程','0',0,1,NULL),(8,9,'Golang 入門教學課程','0',0,1,NULL),(8,26,'Python 程式設計入門','1023.187302',1,1,NULL),(8,27,'Python 程式設計入門','0',0,1,NULL),(8,28,'Python 程式設計入門','0',0,1,NULL),(8,29,'Python 程式設計入門','0',0,1,NULL),(8,30,'精通 Bootstrap 4 -質感網站輕鬆不求人','1023.187302',1,1,NULL),(8,31,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(8,32,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(8,33,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(8,34,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(9,26,'Python 程式設計入門','1023.187302',1,1,NULL),(9,27,'Python 程式設計入門','0',0,1,NULL),(9,28,'Python 程式設計入門','0',0,1,NULL),(9,29,'Python 程式設計入門','0',0,1,NULL),(9,30,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(9,31,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(9,32,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(9,33,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(9,34,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(10,1,'Golang 入門教學課程','1023.187302',1,1,NULL),(10,2,'Golang 入門教學課程','0',0,1,NULL),(10,3,'Golang 入門教學課程','0',0,1,NULL),(10,4,'Golang 入門教學課程','0',0,1,NULL),(10,5,'Golang 入門教學課程','0',0,1,NULL),(10,6,'Golang 入門教學課程','0',0,1,NULL),(10,7,'Golang 入門教學課程','0',0,1,NULL),(10,8,'Golang 入門教學課程','0',0,1,NULL),(10,9,'Golang 入門教學課程','0',0,1,NULL),(10,26,'Python 程式設計入門','1023.187302',1,1,NULL),(10,27,'Python 程式設計入門','0',0,1,NULL),(10,28,'Python 程式設計入門','0',0,1,NULL),(10,29,'Python 程式設計入門','0',0,1,NULL),(10,30,'精通 Bootstrap 4 -質感網站輕鬆不求人','1023.187302',1,1,NULL),(10,31,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(10,32,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(10,33,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(10,34,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(11,1,'Golang 入門教學課程','1023.187302',1,1,NULL),(11,2,'Golang 入門教學課程','0',0,1,NULL),(11,3,'Golang 入門教學課程','0',0,1,NULL),(11,4,'Golang 入門教學課程','0',0,1,NULL),(11,5,'Golang 入門教學課程','0',0,1,NULL),(11,6,'Golang 入門教學課程','0',0,1,NULL),(11,7,'Golang 入門教學課程','0',0,1,NULL),(11,8,'Golang 入門教學課程','0',0,1,NULL),(11,9,'Golang 入門教學課程','0',0,1,NULL),(11,26,'Python 程式設計入門','1023.187302',1,1,NULL),(11,27,'Python 程式設計入門','0',0,1,NULL),(11,28,'Python 程式設計入門','0',0,1,NULL),(11,29,'Python 程式設計入門','0',0,1,NULL),(11,30,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(11,31,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(11,32,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(11,33,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(11,34,'精通 Bootstrap 4 -質感網站輕鬆不求人','0',0,1,NULL),(15,1,'Golang 入門教學課程','1023.187302',1,1,'1023.187302'),(15,2,'Golang 入門教學課程','0',0,1,NULL),(15,3,'Golang 入門教學課程','0',0,1,NULL),(15,4,'Golang 入門教學課程','0',0,1,NULL),(15,5,'Golang 入門教學課程','0',0,1,NULL),(15,6,'Golang 入門教學課程','0',0,1,NULL),(15,7,'Golang 入門教學課程','0',0,1,NULL),(15,8,'Golang 入門教學課程','0',0,1,NULL),(15,9,'Golang 入門教學課程','0',0,1,NULL),(15,26,'Python 程式設計入門','1023.187302',1,1,'1023.187302'),(15,27,'Python 程式設計入門','0',0,1,NULL),(15,28,'Python 程式設計入門','0',0,1,NULL),(15,29,'Python 程式設計入門','0',0,1,NULL);
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` bigint(255) unsigned NOT NULL AUTO_INCREMENT,
  `provider` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `access_token` varchar(255) NOT NULL,
  `access_expired` varchar(255) NOT NULL,
  `about_me` varchar(10000) DEFAULT NULL,
  `PersonalWebsite` varchar(255) DEFAULT NULL,
  `facebookProfile` varchar(255) DEFAULT NULL,
  `youtubeProfile` varchar(255) DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'native','yuhan@yuhan','yuhan','ee436953d1e93813de4e9d554f1b62cacaeae1492e8fec80fb82248b197e4f08','1569471573750','介紹我自己哦','https://yuhanweb.com','','',NULL),(2,'native','ppp','彭彭','fa3d981ece3681dc2a0117e3fef3e1d89ab134f9160539a7fc4e37e10d21876b','1569471946908','文藝型開發者，夢想是做出人們想用的產品和辦一所心目中理想的學校。A Starter, Software Engineer & Maker. JavaScript, Python & Arduino/Android lover. :)','','peng','yuhan',NULL),(3,'native','test@test','yuhantest','020326c70cd2062bb2da845729e4990b5a62484e5ba810359de8534288a15d35','1569373760467','','http://yuhanweb.com','yuhan','',NULL),(4,'native','test123@test123','test123','207d310af9e2f0a7f830ed69730ce2f7f7175a94ece74920662833853b2359e5','1569336273587',NULL,NULL,NULL,NULL,NULL),(5,'native','123@123','123','2038c6c41eb35a8689d491ade92534c93f8795b0afefe422c2a238a8f73f190e','1569374677520',NULL,NULL,NULL,NULL,NULL),(6,'native','999@999','Peng Xiao（肖鵬）','f3609a3e0928a86329b4b1a89f1c7e504c07f378c1b632af6381acb43f42736c','1569393973742','網名“麥兜搞IT“，慕課精英講師，Network DevOps Engineer，前Cisco資深網絡開發工程師','','','yuhan',NULL),(7,'native','demo@demo','六角學院','7460e767d94b811d0dae93ea0099c491f9da1af64c2440f4c300fc2135fb259d','1569374690622','六角學院 是一所線上程式開發學習單位，目前已累積超過 15,000 名學員，讓更多人藉由線上學習在職涯規劃上有更多的選擇是我們的使命是，如果您贊同我們的理念，歡迎加入六角。','https://www.hexschool.com/','hexschool/','',NULL),(8,'native','lll@lll','lll','605e8528f67ca61a93d4320d38e62637425fda0dc01e69911afc7ec70f57ff9a','1569335985563',NULL,NULL,NULL,NULL,NULL),(9,'native','ttt@ttt','ttt','49af8a0a7f5149c84ef025eeb8d337a6cb8cc7112552da66f1ecfb6b296b7aae','1569334665656',NULL,NULL,NULL,NULL,NULL),(10,'native','hhh@hhh','hhh','f4db2c7b6fb9e2c78ff7f4f34b54958ed62885ae3151bdd6e5271e58f8b64d34','1569374371896',NULL,NULL,NULL,NULL,NULL),(11,'native','ooo@ooo','ooo','659063e6f01c493e1f47469a95fce5984a83276e47b393746a04e9b981db735a','1569375398151',NULL,NULL,NULL,NULL,NULL),(12,'native','mmm@mmm','mmm','a8d4d4ee248580ad1a362b8fc3a0eae191cd2fcf8044d9f76b9cf0ad976335c2','1569376357388',NULL,NULL,NULL,NULL,NULL),(13,'native','uuu@uuu','uuu','4974dc7a8d9569275b4fe239748b9eb3417f17607dc9402730ba166e042aeaad','1569380405807',NULL,NULL,NULL,NULL,NULL),(14,'native','aaa@aaa','aaa','947f29d7e320b4439a5338793c16908256f88a8d1cab5711964d01685898d71d','1569380967020',NULL,NULL,NULL,NULL,NULL),(15,'native','rrr@rrr','Mihai','ad7307f7a70d0a8d5b7ddc377d279520b4bca96f446e733db7a409591e11c49b','1569471719662','hello','','','',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-26 12:38:21
