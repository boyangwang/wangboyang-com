#! /bin/bash

echo "foreverStartAll..."
mkdir /home/boyang/Projects/wangboyang.com-project/logs
echo "Doing fragen"
cd /home/boyang/Projects/wangboyang.com-project/fragen/src
forever start -a -l /home/boyang/Projects/wangboyang.com-project/logs/forever_fragen.log \
              -o /home/boyang/Projects/wangboyang.com-project/logs/fragen.log \
              -e /home/boyang/Projects/wangboyang.com-project/logs/error_fragen.log \
              --uid fragen \
              --pidFile /home/boyang/Projects/wangboyang.com-project/logs/fragen.pid \
              /home/boyang/Projects/wangboyang.com-project/fragen/src/app.js

echo "Doing courselooper"
cd /home/boyang/Projects/wangboyang.com-project/courselooper
forever start -a -l /home/boyang/Projects/wangboyang.com-project/logs/forever_courselooper.log \
              -o /home/boyang/Projects/wangboyang.com-project/logs/courselooper.log \
              -e /home/boyang/Projects/wangboyang.com-project/logs/error_courselooper.log \
              --uid courselooper \
              --pidFile /home/boyang/Projects/wangboyang.com-project/logs/courselooper.pid \
              /home/boyang/Projects/wangboyang.com-project/courselooper/app.js

echo "Doing retailer"
cd /home/boyang/Projects/wangboyang.com-project/Retailer/src
forever start -a -l /home/boyang/Projects/wangboyang.com-project/logs/retailer.log \
            -o /home/boyang/Projects/wangboyang.com-project/logs/retailer.log \
            -e /home/boyang/Projects/wangboyang.com-project/logs/retailer.log \
            --uid retailer \
            --pidFile /home/boyang/Projects/wangboyang.com-project/logs/retailer.pid \
            /home/boyang/Projects/wangboyang.com-project/retailer/src/app.js

forever list
echo "Done"
