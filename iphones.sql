use nodejs_api;

CREATE TABLE iphones (
  id int(11) NOT NULL AUTO_INCREMENT,
  ten varchar(255) DEFAULT NULL,
  price decimal(10,0) DEFAULT NULL,
  color varchar(255) DEFAULT NULL,
  hinh varchar(255) DEFAULT NULL,
  chip varchar(255) DEFAULT NULL,
  ram varchar(255) DEFAULT NULL,
  dungluong varchar(255) DEFAULT NULL,
  sau varchar(255) DEFAULT NULL,
  truoc varchar(255) DEFAULT NULL,
  pin varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO iphones VALUES ("1","Iphone 15 Pro Max","34190000","Blue","iphone-15-pro-max.jpg","Chip Apple A17 Pro 6 nhân","RAM: 8 GB","Dung lượng: 256 GB","Camera sau: Chính 48 MP & Phụ 12 MP, 12 MP","Camera trước: 12 MP","Pin 4422 mAh, Sạc 20 W");
INSERT INTO iphones VALUES ("2","Iphone 15 Pro","27990000","Blue","iphone-15-pro.jpg","Chip Apple A17 Pro 6 nhân",
    "RAM: 8 GB","Dung lượng: 128 GB","Camera sau: Chính 48 MP & Phụ 12 MP, 12 MP",
    "Camera trước: 12 MP","Pin 3274 mAh, Sạc 20 W");
INSERT INTO iphones VALUES ("3","Iphone 15","22490000","Blue","iphone-15.jpg","Chip Apple A16 Bionic",
    "RAM: 6 GB","Dung lượng: 128 GB","Camera sau: Chính 48 MP & Phụ 12 MP, 12 MP",
    "Camera trước: 12 MP","Pin 3349 mAh, Sạc 20 W");

SELECT * FROM iphones;
SELECT id , ten, price ,color ,hinh, chip ,ram ,dungluong ,sau, truoc, pin FROM iphones;

alter user 'root'@'localhost' identified with mysql_native_password by 'root123';