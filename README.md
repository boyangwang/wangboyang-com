wangboyang.com
==============

## Setup

1. install php apache mysql stack
  ```
  sudo apt-get install apache2 php5 mysql-server php5-mysql libapache2-mod-php5 php5-mcrypt
  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

2. install git
  ```
  sudo apt-get install git
  ```

3. pull relevant repos
  ```
  cd /var/www/
  git clone https://github.com/boyangwang/wangboyang.com.git &&
  git clone https://github.com/boyangwang/Courselooper-Server.git &&
  git clone https://github.com/boyangwang/2013-mobile-group-5.git &&
  git clone https://github.com/boyangwang/laughing-avenger.git &&
  git clone https://github.com/boyangwang/Retailer
  ```

4. create symlink for apacheVirtualHost. Note .conf is required
  ```
  ln -s /wangboyang.com/apacheConfig.conf /etc/apache2/sitess-enabled/apacheConfig
  Edit apacheVirtualHost file accordingly to suit your need. Default to use /var/www/public_html
  Since virtual hosts are based on ServerName, go to the domain registrar and set DNS entry for wangboyang.com
  Enable mods
  sudo a2enmod rewrite proxy_http proxy
  ```

5. import db schema
  ```
  Enable php json extension for phpmyadmin: apt-get install php5-json
  Install php-mysql module: sudo apt-get install php5-mysql
  Import db
  mysql -u root -p < courselooper.sql
  (included in sql) Add user courselooper:mcu4hMfAyCrdfjHRL6dA with privileges on courselooper table
  Courselooper needs .htaccess rewrite to be working
  sudo apt-get install imagemagick for img processing in courselooper
  ```

6. crontab
  ```
  SHELL=/bin/bash
  PATH=/home/boyang/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
  @reboot /home/boyang/Projects/wangboyang.com-project/wangboyang.com/shellscripts/foreverStartAll.sh $>> /home/boyang/Projects/wangboyang.com-project/logs/reboot.log
  @reboot echo "$(date) REBOOTED" $>> /home/boyang/Projects/wangboyang.com-project/logs/reboot.log

  ```

## Retailer
1. clone code
2. install mongo
  ```
  sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

  echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

  sudo apt-get update

  sudo apt-get install -y mongodb-org
  ```

## HTTPS/SSL/TLS
1. get certs
  ```
  ~/certbot-auto certonly --standalone -d wangboyang.com -d www.wangboyang.com -d retailer.wangboyang.com -d courselooper.wangboyang.com -d taak.wangboyang.com -d blog.wangboyang.com -d misc.wangboyang.com -d phpmyadmin.wangboyang.com -d fragen.wangboyang.com -d viperjs.wangboyang.com
  ```

2. `a2enmod ssl`
3. apache conf, add
  ```
  <VirtualHost *:443>
        ServerName wangboyang.com
        ServerAlias www.wangboyang.com
        SSLEngine on
        SSLCertificateFile "/etc/letsencrypt/live/wangboyang.com-0002/fullchain.pem"
        SSLCertificateKeyFile "/etc/letsencrypt/live/wangboyang.com-0002/privkey.pem"
        ...[ORIGINAL DIRECTIVES BELOW]
  </VirtualHost>
  ```

4. crontab `0 12 * * * /root/certbot-auto renew --quiet --no-self-upgrade`

## New Setup
```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - &&
sudo apt-get install -y nodejs git nginx letsencrypt &&
npm install -g forever &&
cd /var/www/ &&
git clone https://github.com/boyangwang/wangboyang-com.git &&
rm /etc/nginx/sites-enabled/default &&
letsencrypt certonly --webroot -w /var/www/wangboyang-com/src/ -d wangboyang.com -d www.wangboyang.com &&
ln -s /var/www/wangboyang-com/src/nginx.conf /etc/nginx/sites-enabled/wangboyang-com.conf &&
service nginx restart
```
