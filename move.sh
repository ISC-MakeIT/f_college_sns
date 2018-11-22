cp public/javascripts/app.js ../api/public/javascripts/app.js
cp public/stylesheets/bundle.css ../api/public/stylesheets/bundle.css

cd ../api
git add -A
git commit -m 'deploy for update'
git push
