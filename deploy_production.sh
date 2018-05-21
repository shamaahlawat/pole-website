echo -e "\n\n\n******* Make sure you changed server url in func/vars.php and env to prod in .htaccess *****\n\n\n\n\n"
lessc css/style.less css/style.css
grunt
rm ../pole_website.zip
cd ..
zip -r pole_website.zip pole-website
scp pole_website.zip ubuntu@poletalks.com:~/
ssh ubuntu@poletalks.com

#run ./deployWebsite.sh on productio server home directory after ssh login to deploy the website
