# DevTinder

- Create a Vite+React application
- Remove unnecessary code and create a Hello Wrold App
- Install Tailwind css
- Install desiUi and add navbar component from daisyUi in the app.jsx
- create a NavBar.jsx separate react component
- install react router
- Create browser router -> Routes -> Route=/ -> Body -> Route children
- Create an Outlet in your body component
- Create a footer
- Create a login page
- Install axios
- CORS - install cors at backend -> add middleware to with configurations : origin, credentials
- whenever youre making api call so pass axios => {withCredentials: true}
- Install react-redux + @reduxjs/toolkit -> configureStore -> Provider -> CreateSlice -> add reducer
- Add redux devtools in chrome extension
- login and see if data is coming from store
- navbar should update after login
- refactor code to have constants for base url + add components folder
- you should not be access other routes without login
- if token is not present, redirect them to /
- logout
- profile page
- build the user crad on the feed page
- Edit profile feature and show toast on save of profile
- feature for seeing all connections in new page
- feature for seeing all connectionRequests in new page
- Feature to accept/Reject requests
- send/ignore the User card
- signup
- E2E testing

# Deployment

- Signup on AWS.
- Launch an instance
- chmod 400 "devTinder-secret.pem"
- ssh -i "devTinder-secret.pem" ubuntu@ec2-3-111-52-78.ap-south-1.compute.amazonaws.com
- install node exact version matching the local machine
- git clone
  Frontend deployment
  - npm install -> dependencies install
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - copy code from dist folder (Build files) to var/www/html/
  - sudo scp -r dist/\* /var/www/html
  - Enable port :80 of your instance

  Backedn deployment
  - npm install -> dependencies install
  - Allowed EC2 instance IP on mongo -> whitelisting IP
  - installed pm2 -> npm install pm2 -g
  - pm2 start npm -- start
  - pm2 logs
  - pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>
  - pm2 start npm --name "devTinder-backend" -- start
  - config ngnix => sudo nano /etc/nginx/sites-available/default
  - restart ngnix => sudo systemctl restart nginx
  - modify the baseUrl in the frontend to /api

Frontend - http://3.111.52.78/
backend - http://3.111.52.78:7777

domain name = devtinder.com => 3.111.52.78

Frontend - devtinder.com
backend - devtinder.com:7777 => devtinder.com/api

ngnix config:

server_name 3.111.52.78;

location /api/ {
proxy_pass http://127.0.0.1:7777/;
proxy_http_version 1.1;

        # Preserve original request info
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support (if needed)
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
