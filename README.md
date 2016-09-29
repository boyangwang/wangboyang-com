wangboyang.com
==============

## Setup

1. install php apache mysql stack
  ```
  sudo apt-get install apache2 php5 mysql-server php5-mysql libapache2-mod-php5 php5-mcrypt
  curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

2. install git and setup hook
  ```
  sudo apt-get install git
  Add webhook on github
  Create ssh key: ssh-keygen -t rsa -C "your_email@example.com"
  Add to repo deploy keys
  ```

3. pull relevant repos, as www-data so that they are owned by www-data
  ```
  cd /var/www/
  makedir public_html
  chown -R -L www-data:www-data www
  sudo -i -u www-data -E
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

5. install and update node, npm and node modules
  ```
  sudo apt-get install node npm
  npm install -g n && npm install -g supervisor && npm install -g forever
  n stable
  npm update -g npm
  ```

6. import db schema
  ```
  Enable php json extension for phpmyadmin: apt-get install php5-json
  Install php-mysql module: sudo apt-get install php5-mysql
  Import db
  mysql -u root -p < courselooper.sql
  (included in sql) Add user courselooper:mcu4hMfAyCrdfjHRL6dA with privileges on courselooper table
  Courselooper needs .htaccess rewrite to be working
  sudo apt-get install imagemagick for img processing in courselooper
  ```

7. crontab
  ```
  SHELL=/bin/bash
  PATH=/home/boyang/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
  @reboot /home/boyang/Projects/wangboyang.com-project/wangboyang.com/shellscripts/foreverStartAll.sh $>> /home/boyang/Projects/wangboyang.com-project/logs/reboot.log
  @reboot echo "$(date) REBOOTED" $>> /home/boyang/Projects/wangboyang.com-project/logs/reboot.log

  ```

9. WCFUN
  ```
  Change db_host variable in WCFUN.php
  Create user WCFUN:password@'%', grant privileges
  NO that is not quite right! Remember % somehow doesn't work. Use localhost instead.
  Turn on remote access for MySQL, comment out in my.cnf:
  skip-networking
  bind-address = 127.0.0.1
  Open port 3306 if needed
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
1. `a2enmod ssl`
2. apache conf, add
  ```
  <VirtualHost *:443>
        ServerName wangboyang.com
        ServerAlias www.wangboyang.com
        SSLEngine on
        SSLCertificateFile "/etc/letsencrypt/live/wangboyang.com/fullchain.pem"
        SSLCertificateKeyFile "/etc/letsencrypt/live/wangboyang.com/privkey.pem"
        ...[ORIGINAL DIRECTIVES BELOW]
  </VirtualHost>
  ```

3. crontab `0 12 * * * /root/certbot-auto renew --quiet --no-self-upgrade`

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
