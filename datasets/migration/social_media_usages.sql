CREATE EXTERNAL TABLE IF NOT EXISTS `athena_s3_poc`.`social_media_usages` (
  `age` int,
  `gender` string,
  `time_spent` int,
  `platform` string,
  `interests` string,
  `country` string,
  `demographics` string,
  `prefession` string,
  `income` int,
  `indebt` boolean,
  `isHomeOwner` boolean,
  `owns_car` boolean
)
ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.OpenCSVSerde'
WITH SERDEPROPERTIES (
  'separatorChar' = ',',
  'quoteChar' = '`',
  'escapeChar' = '\\'
)
STORED AS INPUTFORMAT 'org.apache.hadoop.mapred.TextInputFormat' OUTPUTFORMAT 'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat'
LOCATION 's3://poc-athena-dataset-bucket/social_media_usages'
TBLPROPERTIES (
  'classification' = 'csv'
);