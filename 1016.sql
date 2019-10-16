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

--
-- Table structure for table `course_progress`
--

DROP TABLE IF EXISTS `course_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_progress` (
  `status_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `video_id` bigint(20) NOT NULL,
  `course_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `video_time` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `video_duration` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `complete` bigint(10) unsigned NOT NULL DEFAULT '0',
  `registered` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`status_id`),
  KEY `user_id` (`user_id`),
  KEY `video_id` (`video_id`),
  KEY `course_title` (`course_title`),
  CONSTRAINT `course_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `course_progress_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `final_section` (`video_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_progress`
--

LOCK TABLES `course_progress` WRITE;
/*!40000 ALTER TABLE `course_progress` DISABLE KEYS */;
INSERT INTO `course_progress` VALUES (1,1,56,'Python 程式設計入門','0',NULL,0,1),(2,1,26,'Python 程式設計入門','422.82534','1023.187302',0,1),(3,1,27,'Python 程式設計入門','348.755845','1321.68',0,1),(4,1,28,'Python 程式設計入門','0',NULL,0,1),(5,1,51,'Python 程式設計入門','770.371692','1321.68',1,1),(6,1,29,'Python 程式設計入門','0',NULL,0,1),(7,1,52,'Python 程式設計入門','0',NULL,0,1),(8,1,54,'Python 程式設計入門','0',NULL,0,1),(9,1,55,'Python 程式設計入門','239.410654','858.86',0,1),(10,1,50,'Python 程式設計入門','0','1023.187302',0,1),(11,1,58,'Python 程式設計入門','0',NULL,0,1),(12,1,57,'Python 程式設計入門','0','928.612426',0,1),(13,1,59,'Python 程式設計入門','0',NULL,0,1),(14,1,61,'Python 程式設計入門','0',NULL,0,1),(15,1,62,'Python 程式設計入門','0',NULL,0,1),(16,1,63,'Python 程式設計入門','0',NULL,0,1),(17,1,60,'Python 程式設計入門','0',NULL,0,1),(18,17,26,'Python 程式設計入門','1023.187302','1023.187302',1,1),(19,17,27,'Python 程式設計入門','1313.584276','1321.68',1,1),(20,17,28,'Python 程式設計入門','0',NULL,0,1),(21,17,29,'Python 程式設計入門','0',NULL,0,1),(22,17,55,'Python 程式設計入門','0',NULL,0,1),(23,17,56,'Python 程式設計入門','0',NULL,0,1),(24,17,57,'Python 程式設計入門','0',NULL,0,1),(25,17,58,'Python 程式設計入門','0',NULL,0,1),(26,17,59,'Python 程式設計入門','0',NULL,0,1),(27,17,60,'Python 程式設計入門','0',NULL,0,1),(28,17,51,'Python 程式設計入門','1200.92038','1321.68',1,1),(29,17,50,'Python 程式設計入門','422.686473','1023.187302',0,1),(30,17,54,'Python 程式設計入門','0',NULL,0,1),(31,17,52,'Python 程式設計入門','0',NULL,0,1),(32,17,62,'Python 程式設計入門','0',NULL,0,1),(33,17,63,'Python 程式設計入門','0',NULL,0,1),(34,17,61,'Python 程式設計入門','0',NULL,0,1),(35,17,92,'NodeJS核心技術教程','1023.187302','1023.187302',1,1),(36,17,93,'NodeJS核心技術教程','1023.187302','1023.187302',1,1),(37,17,94,'NodeJS核心技術教程','1023.187302','1023.187302',1,1),(38,17,95,'NodeJS核心技術教程','1023.187302','1023.187302',1,1),(39,19,92,'NodeJS核心技術教程','1023.187302','1023.187302',1,1),(40,19,93,'NodeJS核心技術教程','1023.187302','1023.187302',1,1),(41,19,95,'NodeJS核心技術教程','1021.592634','1023.187302',1,1),(42,19,94,'NodeJS核心技術教程','1023.187302','1023.187302',1,1);
/*!40000 ALTER TABLE `course_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `final_section`
--

DROP TABLE IF EXISTS `final_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `final_section` (
  `video_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `course_id` bigint(20) DEFAULT NULL,
  `chapter_auto_id` bigint(20) DEFAULT NULL,
  `section_id` bigint(20) DEFAULT NULL,
  `section_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `section_intro` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `video` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`video_id`),
  KEY `chapter_auto_id` (`chapter_auto_id`),
  KEY `course_id` (`course_id`),
  KEY `section_id` (`section_id`),
  KEY `video_id` (`video_id`),
  CONSTRAINT `final_section_ibfk_1` FOREIGN KEY (`chapter_auto_id`) REFERENCES `new_chapter` (`chapter_auto_id`),
  CONSTRAINT `final_section_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `new_course` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `final_section`
--

LOCK TABLES `final_section` WRITE;
/*!40000 ALTER TABLE `final_section` DISABLE KEYS */;
INSERT INTO `final_section` VALUES (1,1,1,1,'Golang 的簡單介紹','1. Golang 的簡單介紹。\r\n2. 如何安裝 Golang 執行環境，實務操作。\r\n3. 選擇文字編輯器，實務操作 Visual Studio Code。\r\n4. 撰寫、建置、並且執行第一個 Go 程式。','class_video-1568775986165.mp4'),(2,1,2,2,'Golang 資料型態','1.1 整數 int\r\n1.2 浮點數 float64\r\n1.3 字串 string\r\n1.4 布林值 bool\r\n1.5 字符 rune\r\n','class_video-1568775986283.mp4'),(3,1,2,3,'Golang 變數','2.1 宣告變數與變數的資料型態\r\n2.2 指定變數中的資料\r\n2.3 使用變數代替資料做運算','class_video-1568775986418.mp4'),(4,1,3,4,'Golang 載入封包','1.1 import 封包名稱\r\n1.2 import \"fmt\"','class_video-1568775986514.mp4'),(5,1,3,5,'使用 fmt 封包做基本輸入','2.1 宣告變數\r\n2.2 fmt.Scanln(&變數名稱)\r\n2.3 取得變數對應的指標','class_video-1568775986596.mp4'),(6,1,3,6,'使用 fmt 封包做基本輸出','3.1 輸出換行 fmt.Println(資料)\r\n3.2 輸出不換行 fmt.Print(資料)','class_video-1568775986673.mp4'),(7,1,4,7,'運算符號的種類','1-1. 算數運算 +, -, *, /\r\n1-2. 指定運算 =, +=, -=, *=, /=\r\n1-3. 單元運算 ++, --\r\n1-4. 比較運算\r\n1-5. 邏輯運算 !, &&, ||','class_video-1568775986771.mp4'),(8,1,5,8,'Golang 流程控制','1.1 if 判斷式\r\n1.2 if ... else 判斷結構\r\n1.3 if ... else if ... else 多條件判斷結構\r\n','class_video-1568775986887.mp4'),(9,1,5,9,' Golang 練習範例','2.1 判斷式基本語法練習\r\n2.2 ATM 情境範例練習','class_video-1568775986959.mp4'),(26,15,22,1,'簡介、安裝、快速開始','建立 Python 3.5 以上版本的【開發環境】','class_video-1569217030806.mp4'),(27,15,23,2,'變數與資料型態','學會 Python 的【語法和邏輯】','class_video-1569217046208.mp4'),(28,15,24,6,'判斷式','學會 Python 的【基本程式架構】\r\n\r\n','class_video-1569217068913.mp4'),(29,15,25,9,'函式基礎','Python 程式架構設計','class_video-1569217068979.mp4'),(30,16,26,1,'加入 Bootstrap 及元件的組成概念','學會如何使用 Bootstrap 建立網頁及元件','class_video-1569250622897.mp4'),(31,16,26,2,'Bootstrap 建立第一個網頁','學會如何使用 Bootstrap 建立網頁及元件\r\n了','class_video-1569250635215.mp4'),(32,16,27,3,'Borders 邊框','學會如何使用 Bootstrap 建立網頁及元件\r\n','class_video-1569250649367.mp4'),(33,16,27,4,'Visibility 可見性','學會如何使用 Bootstrap 建立網頁及元件\r\n','class_video-1569250665422.mp4'),(34,16,28,5,'Sass 環境與運行的方法','了解 Bootstrap 的開發模式','class_video-1569250683912.mp4'),(50,15,23,3,'有序列表的基本運算','學會 Python 的【語法和邏輯】','class_video-1569767374881.mp4'),(51,15,23,4,'集合、字典的基本運算','學會 Python 的【語法和邏輯】','class_video-1569767699577.mp4'),(52,15,23,5,'數字、字串的基本運算','學會 Python 的【語法和邏輯】','class_video-1569763622633.mp4'),(54,15,24,7,'迴圈基礎','Python 基礎程式語法','class_video-1569776651840.mp4'),(55,15,24,8,'迴圈進階控制','Python 基礎程式語法','class_video-1569776668398.mp4'),(56,15,25,10,'函式參數詳解','Python 程式架構設計','class_video-1569776668528.mp4'),(57,15,25,11,'模組的載入與使用','封包的設計與使用','class_video-1569776668658.mp4'),(58,15,35,12,'文字檔案的讀取與儲存','檔案的讀取和儲存入門','class_video-1569777055489.mp4'),(59,15,35,13,'亂數與統計模組','檔案的讀取和儲存入門','class_video-1569777055620.mp4'),(60,15,35,14,'網路連線、公開資料串接','檔案的讀取和儲存入門','class_video-1569777055722.mp4'),(61,15,36,15,'網路爬蟲 Web Crawler - 基本篇','網路連線程式和爬蟲入門','class_video-1569777055803.mp4'),(62,15,36,16,'Flask 網站開發 - 基礎環境建置','Flask 網站開發入門','class_video-1569777055893.mp4'),(63,15,36,17,'Flask 網站開發 - Heroku 雲端主機','Flask 網站開發入門','class_video-1569777099866.mp4'),(64,21,37,1,'What You Need for this Course','Create all kinds of commercial websites, using WordPress, to sell to clients','class_video-1569779638164.mp4'),(65,21,37,2,'Tools - Domains, FTP, Image Editing, Invoices, and Taking Payments','Create all kinds of commercial websites, using WordPress, to sell to clients','class_video-1569809711543.mp4'),(66,21,38,3,'Website Hosting and Development Options','Set up server and hosting environments in the most economical and secure way','class_video-1569810360794.mp4'),(67,21,38,4,'Your First WordPress Website - using Local by Flywheel','Set up server and hosting environments in the most economical and secure way','class_video-1569810378003.mp4'),(68,21,38,5,'Local by Flywheel - Files and Database Structure','Set up server and hosting environments in the most economical and secure way','class_video-1569810378104.mp4'),(69,21,38,6,'Your Free SiteGround Hosting Account','Set up server and hosting environments in the most economical and secure way','class_video-1569810378178.mp4'),(70,22,39,1,'什麼是Linux？','知道什麼是Linux','class_video-1569811159537.mp4'),(71,22,39,2,'虛擬化以及VirtualBox','知道什麼是Linux','class_video-1569811172097.mp4'),(72,22,39,3,'安裝CentOS DeskTop','如何安裝Linux','class_video-1569811185844.mp4'),(73,22,40,4,'terminal和shell','Linux的基本操作','class_video-1569811199798.mp4'),(74,22,40,5,'文件和目錄的基本操作','文件和目錄操作','class_video-1569811432769.mp4'),(75,22,40,6,'Linux文件目錄結構介紹','文件和目錄操作','class_video-1569811432937.mp4'),(76,22,41,7,'cat/more/less 三個命令的區別','vi/vim的基本使用','class_video-1569811433049.mp4'),(77,22,41,8,'vi/vim的基本使用：文件瀏覽','vi/vim的基本使用','class_video-1569811455834.mp4'),(78,22,41,9,'vi/vim的基本使用：編輯保存','vi/vim的基本使用','class_video-1569811480458.mp4'),(79,22,41,10,'vi/vim的基本使用: 刪除撤銷複製粘貼','vi/vim的基本使用','class_video-1569811495865.mp4'),(80,22,42,11,'User和Group','用戶和權限','class_video-1569811737318.mp4'),(81,22,42,12,'關於User的基本操作演示','用戶和權限','class_video-1569811749757.mp4'),(82,22,42,13,'User的creating和deleting','用戶和權限','class_video-1569811769905.mp4'),(83,22,42,14,'Group的相關操作演示','用戶和權限','class_video-1569811787043.mp4'),(84,22,43,15,'Linux基本網絡連接的檢查和ping命令','SSH和SCP','class_video-1569811787161.mp4'),(85,22,43,16,'Linux系統軟件安裝簡介','網絡和軟件安裝','class_video-1569811787256.mp4'),(86,22,44,17,'SSH協議介紹','SSH和SCP','class_video-1569812030250.mp4'),(87,22,44,18,'SSH Public Key和Private Key','SSH和SCP','class_video-1569812043553.mp4'),(88,22,44,19,'SCP文件傳輸','SSH和SCP','class_video-1569812043662.mp4'),(89,22,45,20,'我們的第一個shell script','shell script basic基本','class_video-1569812043737.mp4'),(90,22,45,21,'變量variable的定義和基本操作','shell script basic基本','class_video-1569812073842.mp4'),(91,22,45,22,'if condition條件語句','shell script basic基本','class_video-1569812097273.mp4'),(92,23,46,1,'V8 引擎介紹','瞭解 Node 基礎底層原理，讓你不再霧裡看花','class_video-1569820768810.mp4'),(93,23,46,2,'Node.js 架構介紹','命令提示字元操作教學、使用 Node.js 開啟編譯核心、透過 Node.js 執行 JS 檔案、使用 VS Code 執行與除錯 Node.js','class_video-1569821287274.mp4'),(94,23,47,3,'什麼是 NPM？','掌握 NPM 模組架構，整合服務變得超容易','class_video-1569821300137.mp4'),(95,23,47,4,'安裝 npm 流程','NPM 版本號介紹、npm install 的妙用、npm install -save、--save-dev、-g 差異\r\n','class_video-1569821316783.mp4');
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
  `chapter_auto_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `chapter_id` bigint(20) DEFAULT NULL,
  `chapter_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`chapter_auto_id`),
  KEY `course_id` (`course_id`),
  KEY `chapter_auto_id` (`chapter_auto_id`),
  CONSTRAINT `new_chapter_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `new_course` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_chapter`
--

LOCK TABLES `new_chapter` WRITE;
/*!40000 ALTER TABLE `new_chapter` DISABLE KEYS */;
INSERT INTO `new_chapter` VALUES (1,1,1,'Golang 簡介、安裝、與快速開始'),(1,2,2,'Golang 資料、資料型態與變數'),(1,3,3,'Golang 基本輸入與輸出 - 使用 fmt 內建封包 '),(1,4,4,'Golang 基本運算符號'),(1,5,5,'Golang 流程控制 - if 判斷式'),(15,22,1,'Windows 開發環境設置'),(15,23,2,'資料與運算'),(15,24,3,'流程控制'),(15,25,4,'函式、模組與封包'),(16,26,1,'快速上手 Bootstrap'),(16,27,2,'Bootstrap 通用類別 (Utilities)'),(16,28,3,'Bootstrap 與 Sass'),(15,35,5,'基礎應用主題'),(15,36,6,'進階應用主題'),(21,37,1,'Chapter 1 - About this Course'),(21,38,2,'Chapter 2 - Prepare Hosting, Servers, and Install WordPress'),(22,39,1,'第一天：Linux的介紹和安裝'),(22,40,2,'第二天：Linux Shell和基本命令介紹'),(22,41,3,'第三天：在Linux Shell下讀寫文件'),(22,42,4,'第四天：用戶和權限管理'),(22,43,5,'第五天：網絡配置和軟件安裝'),(22,44,6,'第六天：SSH連接和SCP傳輸文件'),(22,45,7,'第七天：Shell編程基礎'),(23,46,1,'V8、Node.js介紹'),(23,47,2,' NPM');
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
  PRIMARY KEY (`course_id`,`course_title`),
  KEY `course_title` (`course_title`),
  KEY `for_who` (`for_who`),
  KEY `course_teacher_id` (`course_teacher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_course`
--

LOCK TABLES `new_course` WRITE;
/*!40000 ALTER TABLE `new_course` DISABLE KEYS */;
INSERT INTO `new_course` VALUES (1,'Golang 入門教學課程','彭彭','全面介紹了 Go 語言的特點、安裝部署環境、語言語法、併發流程以及在多個實戰中的應用，並介紹如何整合 CI/CD 服務','程式設計','沒有基礎希望嘗試學習程式語言的人\r\n想要從入門開始學習 golang 的人','main_image-1569775858777.png','','2',4.3,3,3),(15,'Python 程式設計入門','六角學院','彭彭老師與你一起進入 Python 的世界：採用最新 Python 3.5 以上版本，學會基礎語法和程式架構，使用 Python 做檔案處理，亂數統計，並完成網路連線程式！','程式設計','任何對 Python 程式開發有興趣的朋友，無須程式設計基礎','main_image-1569217030800.png','彭彭老師：\r\n\r\n台灣大學訓練班十年教學經驗。\r\n\r\n在三創育成中心擔任 Python 課程講師。\r\n\r\n在蝦皮 Shopee 擔任 Python 企業內訓講師。\r\n\r\n曾任 Modern Web、JSDC 等研討會講師。\r\n\r\n實際開發 Piconion 影像處理大型應用程式。\r\n\r\n豐富的教學、帶領初學者經驗。\r\n\r\n','7',5.0,3,3),(16,'精通 Bootstrap 4 -質感網站輕鬆不求人','六角學院','此課程不在是念過所有元件的基礎課程，課程中會透過簡報、動畫不斷的強化同學對於網頁設計、Bootstrap 的運用觀念，並且在課程的進行中會透過許多的案例加深對於元件的使用概念，讓學習框架不再只是依循著文件內容而已。','網頁開發','想要快速建立網頁的同學\r\n對於 Bootstrap 有興趣的同學\r\n想要更精進 CSS 的同學','main_image-1569250622865.png','六角學院助教\r\n六角學院 是一所線上程式開發學習單位，目前已累積超過 15,000 名學員，讓更多人藉由線上學習在職涯規劃上有更多的選擇是我們的使命是，如果您贊同我們的理念，歡迎加入六角。','7',5.0,1,1),(21,'The Complete WordPress Website Business Course','Rob Percival','Master WordPress with this Complete WordPress Course, without learning how to code and without any programming!','網頁設計','Those familiar with WordPress, who need a deeper understanding of how all the parts fit together, should take this course.','main_image-1569812716454.png','Hi! I am Rob. I have a degree in Mathematics from Cambridge University and you might call me a bit of coding geek.','17',4.0,1,1),(22,'零基礎七天入門Linux','Peng Xiao（肖鵬）','每天1小時，堅持7天，讓您輕鬆自如的使用Linux','作業系統','想快速入門和使用Linux','main_image-1569812302764.png','網名“麥兜搞IT“，慕課精英講師，Network DevOps Engineer，前Cisco資深網絡開發工程師','6',5.0,1,1),(23,'NodeJS核心技術教程','chen Yang','內容涵蓋Node.js 簡介、下載、安裝、模塊化、CommonJS、NPM、以及Buffer、fs等模塊的基本使用','程式語言','具有HTML、CSS和Javascript基礎知識的絕對初學者，希望升級到專業的Web開發和構建Web應用程序\r\n','main_image-1569821287272.png','具有多年項目開發和教育培訓經驗，曾先後任職於致遠協創、用友科技等知名企業，歷任項目經理、架構師等，精通JavaEE、Android、 C++、C#等開發語言，主持並參與Android SDK開發，熟練掌握JavaEE技術及架構體系、SpringMVC、Spring、 Mybatis、Redis、Struts2、Hibernate等框架','18',5.0,0,1);
/*!40000 ALTER TABLE `new_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`user_id`),
  KEY `access_token` (`access_token`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'native','yuhan@yuhan','yuhan','a05ca5eca5ced92ebabb62923ba408388c975ac47e4a8d690a3a4c27b4660794','1571204526794','介紹我自己','https://yuhanweb.com','','',NULL),(2,'native','ppp','彭彭','b7d1ab04e7d16e7fcefecb89a1d1aec11c60b60c42bcd9fef8d560a007eac0bc','1569770998380','文藝型開發者，夢想是做出人們想用的產品和辦一所心目中理想的學校。A Starter, Software Engineer & Maker. JavaScript, Python & Arduino/Android lover. :)','','peng','yuhan',NULL),(3,'native','test@test','Simon Wang','274f7a86b5169905599423a11c135a311191639d144de0949c33dbdc1d0a2388','1571032321897','','http://yuhanweb.com','yuhan','',NULL),(4,'native','test123@test123','test123','207d310af9e2f0a7f830ed69730ce2f7f7175a94ece74920662833853b2359e5','1569336273587',NULL,NULL,NULL,NULL,NULL),(5,'native','123@123','123','fb84ebccb58a498afeb703cefe77b736e9221f4f6fcd594b6e05309256a223b9','1569835756157',NULL,NULL,NULL,NULL,NULL),(6,'native','999@999','Peng Xiao（肖鵬）','660a432cda120647f624b4a1952974030dff1f8b4b54e4bc110d9fece8c9ac50','1569810876058','網名“麥兜搞IT“，慕課精英講師，Network DevOps Engineer，前Cisco資深網絡開發工程師','','','yuhan',NULL),(7,'native','demo@demo','六角學院','ff17f813f2fe85c17656c0f8c7f82f5c8914eeea597f02780f38a22aac314839','1569830046093','六角學院 是一所線上程式開發學習單位，目前已累積超過 15,000 名學員，讓更多人藉由線上學習在職涯規劃上有更多的選擇是我們的使命是，如果您贊同我們的理念，歡迎加入六角。','https://www.hexschool.com/','hexschool/','',NULL),(8,'native','lll@lll','lll','605e8528f67ca61a93d4320d38e62637425fda0dc01e69911afc7ec70f57ff9a','1569335985563',NULL,NULL,NULL,NULL,NULL),(9,'native','ttt@ttt','ttt','49af8a0a7f5149c84ef025eeb8d337a6cb8cc7112552da66f1ecfb6b296b7aae','1569334665656',NULL,NULL,NULL,NULL,NULL),(10,'native','hhh@hhh','hhh','f4db2c7b6fb9e2c78ff7f4f34b54958ed62885ae3151bdd6e5271e58f8b64d34','1569374371896',NULL,NULL,NULL,NULL,NULL),(11,'native','ooo@ooo','ooo','659063e6f01c493e1f47469a95fce5984a83276e47b393746a04e9b981db735a','1569375398151',NULL,NULL,NULL,NULL,NULL),(12,'native','mmm@mmm','mmm','00676e08e88b0c4b1903d43de13e581d782d1f30ef9a0b6e8428deadfb665bf0','1570381913003',NULL,NULL,NULL,NULL,NULL),(13,'native','uuu@uuu','uuu','4974dc7a8d9569275b4fe239748b9eb3417f17607dc9402730ba166e042aeaad','1569380405807',NULL,NULL,NULL,NULL,NULL),(14,'native','aaa@aaa','aaa','947f29d7e320b4439a5338793c16908256f88a8d1cab5711964d01685898d71d','1569380967020',NULL,NULL,NULL,NULL,NULL),(15,'native','rrr@rrr','Mihai','ad7307f7a70d0a8d5b7ddc377d279520b4bca96f446e733db7a409591e11c49b','1569471719662','hello','','','',NULL),(16,'native','ya@ya','ya','8f35d4917118b997832de04d67d0433624ccfb337cdee84cf345a8a7cba99a43','1569763379276',NULL,NULL,NULL,NULL,NULL),(17,'native','www@www','Rob Percival','7eb715d5f718b424de0732dbeea661a53733e432faa2c616b117b07033204ccb','1570974356741',' I have a degree in Mathematics from Cambridge University and you might call me a bit of coding geek.','Rob Percival@Rob Percival','Rob Percival','Rob Percival',NULL),(18,'native','c@c','chen Yang','0fa42d749bc3a0eeb550a0846fd7cde9a6a2b34bf511e5d7cea8561e6aeb0b1b','1569819893887','擅長開發系統、網頁應用，喜歡研究新技術、以及解決問題，覺得寫程式是一門藝術，夢想是在世界各地寫程式，體驗當不同文化的工程師。相信能夠透過寫程式而幫助到人，是一件值得投入以及偉大的事','','','',NULL),(19,'native','ppp@ppp','papaya','7c882c4b9f87b828de434bf803fee10a9ac2d8836bd5d77a0507a2fa0e282c4e','1571121120037','','','','',NULL),(20,'native','nana@nana','nana','be3576596749d3c036f080b4dabaccb350385282d5d435611cef186796546223','1570382363433',NULL,NULL,NULL,NULL,NULL),(21,'native','vc@vc','vcvc','f98047afa06837046867e9679787e88286387a85d0d4cb62ce6bac34122d9b72','1570381943264',NULL,NULL,NULL,NULL,NULL),(24,'native','haha@haah','haha','ab90f10e066283eaabed8a101a2d2b6af27dec025df57a6f9401556a9288bbb7','1570551327300',NULL,NULL,NULL,NULL,NULL),(25,'native','pppp@pppp','pppp','dd66895b5ff0549a677b290772e3bfc2d01f733591892903b09105c489fc53bf','1570552275793',NULL,NULL,NULL,NULL,NULL),(26,'native','olol@olol','olol','103625044c4a2c8abafd710d0f68e8f87e970503d506d103700e121e22a353aa','1570608653658',NULL,NULL,NULL,NULL,NULL),(27,'facebook','vcd990401@yahoo.com.tw','嘈嘈嘈','a35486bb7da469bb3699a9ae29b6b4da5bbeeeaeb3dc7c134c87a8ae6ded8cf1','1571029763043','','','','','https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2458346514251174&height=160&width=160&ext=1573617747&hash=AeQvdF2vsvMA6glU');
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

-- Dump completed on 2019-10-16 13:46:47
